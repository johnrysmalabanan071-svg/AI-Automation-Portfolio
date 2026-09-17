"use client";

/**
 * Drop-in animated background for a Next.js App Router project.
 *
 * Basic integration:
 *
 *   <main className="relative isolate min-h-screen overflow-hidden bg-slate-950">
 *     <AIGridBackground position="fixed" className="-z-10" />
 *     <div className="relative z-10">Your foreground content</div>
 *   </main>
 *
 * The canvas owns no React state, so animation frames do not trigger renders.
 * It also ignores pointer events and observes interaction through passive window
 * listeners, which keeps foreground links, controls, and scrolling responsive.
 */

import { type CSSProperties, useEffect, useRef } from "react";

export type AIGridBackgroundProps = {
  /** Extra classes for the root layer. */
  className?: string;
  /** Inline styles for the root layer. */
  style?: CSSProperties;
  /** Use "fixed" site-wide or "absolute" inside a positioned section. */
  position?: "absolute" | "fixed";
  /** Opaque background color painted below the animation. */
  backgroundColor?: string;
  /** Base wireframe color. Accepts any valid CSS canvas color. */
  gridColor?: string;
  /** Primary glow and active-circuit color. */
  accentColor?: string;
  /** Secondary glow color used by crossing data paths. */
  secondaryColor?: string;
  /** Animation multiplier. Recommended range: 0.35–2. */
  speed?: number;
  /** Cursor influence radius in CSS pixels. */
  interactionRadius?: number;
  /** Grid-cell size in CSS pixels. Smaller values create a denser grid. */
  gridSize?: number;
  /** Overall visual opacity. Recommended range: 0–1. */
  opacity?: number;
  /** Device-pixel-ratio cap. Lower this to reduce GPU/CPU load. */
  maxDpr?: number;
  /** Disable pointer/touch response while keeping the ambient animation. */
  interactive?: boolean;
  /** Called when the user clicks/taps; useful for layering custom effects. */
  onActivate?: (point: { x: number; y: number }) => void;
};

type Point = { x: number; y: number };
type Trace = {
  points: Point[];
  color: "primary" | "secondary";
  phase: number;
  speed: number;
};

const TAU = Math.PI * 2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Tiny deterministic PRNG so each resize creates a stable-looking circuit map. */
function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCircuitTraces(
  width: number,
  height: number,
  step: number,
): Trace[] {
  const random = mulberry32(Math.round(width * 13 + height * 17 + step));
  const columns = Math.ceil(width / step);
  const rows = Math.ceil(height / step);
  const count = clamp(Math.round((width * height) / 58_000), 12, 34);
  const traces: Trace[] = [];

  for (let index = 0; index < count; index += 1) {
    let column = Math.floor(random() * columns);
    let row = Math.floor(random() * rows);
    const points: Point[] = [{ x: column * step, y: row * step }];
    const segments = 3 + Math.floor(random() * 6);
    let horizontal = random() > 0.5;

    for (let segment = 0; segment < segments; segment += 1) {
      const direction = random() > 0.5 ? 1 : -1;
      const distance = 1 + Math.floor(random() * 4);

      if (horizontal) {
        column = clamp(column + direction * distance, 0, columns);
      } else {
        row = clamp(row + direction * distance, 0, rows);
      }

      points.push({ x: column * step, y: row * step });
      horizontal = !horizontal;
    }

    traces.push({
      points,
      color: random() > 0.33 ? "primary" : "secondary",
      phase: random(),
      speed: 0.04 + random() * 0.08,
    });
  }

  return traces;
}

function pointAlongPath(points: Point[], progress: number): Point {
  if (points.length < 2) return points[0] ?? { x: 0, y: 0 };

  const lengths: number[] = [];
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const length = Math.hypot(current.x - previous.x, current.y - previous.y);
    lengths.push(length);
    total += length;
  }

  let target = (((progress % 1) + 1) % 1) * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index]) {
      const start = points[index];
      const end = points[index + 1];
      const local = lengths[index] === 0 ? 0 : target / lengths[index];
      return {
        x: start.x + (end.x - start.x) * local,
        y: start.y + (end.y - start.y) * local,
      };
    }
    target -= lengths[index];
  }

  return points[points.length - 1];
}

export default function AIGridBackground({
  className = "",
  style,
  position = "absolute",
  backgroundColor = "#050816",
  gridColor = "#23509a",
  accentColor = "#22d3ee",
  secondaryColor = "#8b5cf6",
  speed = 1,
  interactionRadius = 190,
  gridSize = 46,
  opacity = 1,
  maxDpr = 2,
  interactive = true,
  onActivate,
}: AIGridBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({
    x: -10_000,
    y: -10_000,
    targetX: -10_000,
    targetY: -10_000,
    active: false,
    energy: 0,
  });
  const activationRef = useRef(onActivate);

  useEffect(() => {
    activationRef.current = onActivate;
  }, [onActivate]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!root || !canvas || !context) return;

    const safeGridSize = clamp(gridSize, 24, 96);
    const safeRadius = clamp(interactionRadius, 60, 420);
    const safeSpeed = clamp(speed, 0.05, 4);
    const safeOpacity = clamp(opacity, 0, 1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 1;
    let height = 1;
    let dpr = 1;
    let traces: Trace[] = [];
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let paused = document.hidden;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, clamp(maxDpr, 1, 3));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = makeCircuitTraces(width, height, safeGridSize);

      // Resizing clears the bitmap; reduced-motion mode still needs a redraw.
      if (reducedMotion.matches) {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(render);
      }
    };

    const warp = (x: number, y: number, time: number): Point => {
      const pointer = pointerRef.current;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const proximity = pointer.active
        ? Math.pow(Math.max(0, 1 - distance / safeRadius), 2)
        : 0;
      const waveX = Math.sin(y * 0.018 + time * 0.00055) * 5;
      const waveY = Math.cos(x * 0.015 - time * 0.00042) * 4;
      const push = proximity * 20;

      return {
        x: x + waveX + (distance > 0 ? (dx / distance) * push : 0),
        y: y + waveY + (distance > 0 ? (dy / distance) * push : 0),
      };
    };

    const drawGrid = (time: number, step: number, layerOffset: number) => {
      const overscan = step * 2;
      const pointer = pointerRef.current;
      const startX = -overscan + layerOffset;
      const startY = -overscan + layerOffset;

      // Batch the full grid into one stroke to keep draw calls low.
      context.beginPath();
      for (let x = startX; x <= width + overscan; x += step) {
        for (let y = startY; y <= height + overscan; y += step / 3) {
          const point = warp(x, y, time);
          if (y === startY) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
      }
      for (let y = startY; y <= height + overscan; y += step) {
        for (let x = startX; x <= width + overscan; x += step / 3) {
          const point = warp(x, y, time);
          if (x === startX) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
      }
      context.strokeStyle = gridColor;
      context.lineWidth = layerOffset === 0 ? 0.8 : 0.45;
      context.globalAlpha = safeOpacity * (layerOffset === 0 ? 0.34 : 0.16);
      context.stroke();

      // Highlight nearby intersections without walking every screen pixel.
      if (!pointer.active) return;
      const minColumn = Math.floor((pointer.x - safeRadius) / step) - 1;
      const maxColumn = Math.ceil((pointer.x + safeRadius) / step) + 1;
      const minRow = Math.floor((pointer.y - safeRadius) / step) - 1;
      const maxRow = Math.ceil((pointer.y + safeRadius) / step) + 1;

      context.fillStyle = accentColor;
      context.shadowColor = accentColor;
      context.shadowBlur = 12;
      for (let column = minColumn; column <= maxColumn; column += 1) {
        for (let row = minRow; row <= maxRow; row += 1) {
          const baseX = column * step + layerOffset;
          const baseY = row * step + layerOffset;
          const distance = Math.hypot(baseX - pointer.x, baseY - pointer.y);
          const strength = Math.max(0, 1 - distance / safeRadius);
          if (strength <= 0) continue;

          const point = warp(baseX, baseY, time);
          context.globalAlpha = safeOpacity * strength * 0.9;
          context.beginPath();
          context.arc(point.x, point.y, 1.2 + strength * 2.8, 0, TAU);
          context.fill();
        }
      }
      context.shadowBlur = 0;
    };

    const drawTraces = (time: number) => {
      const pointer = pointerRef.current;

      for (const trace of traces) {
        const color = trace.color === "primary" ? accentColor : secondaryColor;
        let nearPointer = 0;

        context.beginPath();
        trace.points.forEach((point, index) => {
          const warped = warp(point.x, point.y, time);
          if (index === 0) context.moveTo(warped.x, warped.y);
          else context.lineTo(warped.x, warped.y);

          if (pointer.active) {
            const proximity = Math.max(
              0,
              1 -
                Math.hypot(point.x - pointer.x, point.y - pointer.y) /
                  safeRadius,
            );
            nearPointer = Math.max(nearPointer, proximity);
          }
        });
        context.strokeStyle = color;
        context.lineWidth = 1.15 + nearPointer * 1.7;
        context.globalAlpha = safeOpacity * (0.28 + nearPointer * 0.58);
        context.shadowColor = color;
        context.shadowBlur = 5 + nearPointer * 13;
        context.stroke();

        const packet = pointAlongPath(
          trace.points,
          trace.phase + elapsed * trace.speed * safeSpeed,
        );
        const warpedPacket = warp(packet.x, packet.y, time);
        context.fillStyle = color;
        context.globalAlpha = safeOpacity * 0.95;
        context.shadowBlur = 18;
        context.beginPath();
        context.arc(warpedPacket.x, warpedPacket.y, 2.2 + nearPointer, 0, TAU);
        context.fill();
      }

      context.shadowBlur = 0;
    };

    const drawScanAndPointerGlow = (time: number) => {
      const pointer = pointerRef.current;
      const scanY = ((time * 0.035 * safeSpeed) % (height + 220)) - 110;
      const scanGradient = context.createLinearGradient(
        0,
        scanY - 90,
        0,
        scanY + 90,
      );
      scanGradient.addColorStop(0, "rgba(0,0,0,0)");
      scanGradient.addColorStop(0.5, accentColor);
      scanGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = scanGradient;
      context.globalAlpha = safeOpacity * 0.07;
      context.fillRect(0, scanY - 90, width, 180);

      if (pointer.energy <= 0.002) return;
      const glow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        safeRadius,
      );
      glow.addColorStop(0, accentColor);
      glow.addColorStop(0.28, secondaryColor);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.globalAlpha = safeOpacity * pointer.energy * 0.12;
      context.fillRect(
        pointer.x - safeRadius,
        pointer.y - safeRadius,
        safeRadius * 2,
        safeRadius * 2,
      );
    };

    const drawVignette = () => {
      const vignette = context.createRadialGradient(
        width * 0.5,
        height * 0.44,
        Math.min(width, height) * 0.12,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.74,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.68)");
      context.globalAlpha = 1;
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const render = (now: number) => {
      const delta = Math.min(40, now - lastTime);
      lastTime = now;
      elapsed += delta / 1000;

      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      pointer.energy += ((pointer.active ? 1 : 0) - pointer.energy) * 0.08;

      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      drawGrid(now * safeSpeed, safeGridSize * 2, safeGridSize * 0.48);
      drawGrid(now * safeSpeed, safeGridSize, 0);
      drawTraces(now * safeSpeed);
      drawScanAndPointerGlow(now);

      context.globalCompositeOperation = "source-over";
      drawVignette();
      context.globalAlpha = 1;

      if (!reducedMotion.matches && !paused) {
        frameId = requestAnimationFrame(render);
      }
    };

    const getLocalPoint = (clientX: number, clientY: number) => {
      const bounds = root.getBoundingClientRect();
      return { x: clientX - bounds.left, y: clientY - bounds.top };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      const point = getLocalPoint(event.clientX, event.clientY);
      const inside =
        point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height;
      const pointer = pointerRef.current;
      pointer.targetX = point.x;
      pointer.targetY = point.y;
      if (pointer.x < -1_000) {
        pointer.x = point.x;
        pointer.y = point.y;
      }
      pointer.active = inside;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!interactive) return;
      const point = getLocalPoint(event.clientX, event.clientY);
      const inside =
        point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height;
      if (!inside) return;

      const pointer = pointerRef.current;
      pointer.targetX = point.x;
      pointer.targetY = point.y;
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.active = true;
      pointer.energy = 1.8;
      activationRef.current?.(point);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointerRef.current.active = false;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused && !reducedMotion.matches) {
        cancelAnimationFrame(frameId);
        lastTime = performance.now();
        frameId = requestAnimationFrame(render);
      }
    };

    const onMotionPreferenceChange = () => {
      cancelAnimationFrame(frameId);
      lastTime = performance.now();
      frameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    resize();
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [
    accentColor,
    backgroundColor,
    gridColor,
    gridSize,
    interactionRadius,
    interactive,
    maxDpr,
    opacity,
    secondaryColor,
    speed,
  ]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={className}
      style={{
        position,
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(5,8,22,.08) 0%, rgba(5,8,22,.25) 58%, rgba(5,8,22,.72) 100%)",
        }}
      />
    </div>
  );
}
