'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  phase: number;
};

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const touchQuery = window.matchMedia('(pointer: coarse)');

    let width = 0;
    let height = 0;
    let frame = 0;
    let nodes: Node[] = [];
    let pointer = { x: -1000, y: -1000 };
    let lastDraw = 0;

    const isStatic = () => motionQuery.matches || touchQuery.matches;

    function resize() {
      if (!canvas) return;

      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(
        65,
        Math.max(18, Math.floor((width * height) / 20000))
      );

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        phase: Math.random() * Math.PI * 2,
      }));

      draw(performance.now());
    }

    function draw(now: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const time = isStatic() ? 0 : now / 1000;
      const connectionDistance = 155;

      const positions = nodes.map((node) => {
        let x = node.x + Math.sin(time * 0.18 + node.phase) * 10;
        let y = node.y + Math.cos(time * 0.15 + node.phase) * 10;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (!isStatic() && distance > 0 && distance < 150) {
          const force = (1 - distance / 150) * 18;
          x += (dx / distance) * force;
          y += (dy / distance) * force;
        }

        return { x, y };
      });

      for (let i = 0; i < positions.length; i++) {
        const a = positions[i];

        for (let j = i + 1; j < positions.length; j++) {
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance > connectionDistance) continue;

          const midpointX = (a.x + b.x) / 2;
          const midpointY = (a.y + b.y) / 2;
          const nearCursor =
            !isStatic() &&
            Math.hypot(
              midpointX - pointer.x,
              midpointY - pointer.y
            ) < 180;

          const opacity = (1 - distance / connectionDistance) *
            (nearCursor ? 0.65 : 0.16);

          ctx.strokeStyle = nearCursor
            ? `rgba(52, 211, 153, ${opacity})`
            : `rgba(163, 163, 163, ${opacity})`;

          ctx.lineWidth = nearCursor ? 1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // A few connections carry a moving "data" pulse.
          if (!isStatic() && (i + j) % 11 === 0) {
            const progress = (time * 0.16 + i * 0.13) % 1;
            const fade = Math.sin(progress * Math.PI);

            ctx.fillStyle = `rgba(110, 231, 183, ${fade * 0.65})`;
            ctx.beginPath();
            ctx.arc(
              a.x + (b.x - a.x) * progress,
              a.y + (b.y - a.y) * progress,
              1.8,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }

        const highlighted =
          !isStatic() &&
          Math.hypot(a.x - pointer.x, a.y - pointer.y) < 150;

        ctx.fillStyle = highlighted
          ? 'rgba(110, 231, 183, 0.85)'
          : 'rgba(163, 163, 163, 0.4)';

        ctx.beginPath();
        ctx.arc(a.x, a.y, highlighted ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate(now: number) {
      // Limit drawing to roughly 30 FPS.
      if (now - lastDraw >= 33) {
        draw(now);
        lastDraw = now;
      }

      frame = requestAnimationFrame(animate);
    }

    function restart() {
      cancelAnimationFrame(frame);
      pointer = { x: -1000, y: -1000 };
      draw(performance.now());

      if (!isStatic() && !document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
    }

    function clearPointer() {
      pointer = { x: -1000, y: -1000 };
    }

    resize();
    restart();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('blur', clearPointer);
    document.documentElement.addEventListener('pointerleave', clearPointer);
    document.addEventListener('visibilitychange', restart);
    motionQuery.addEventListener('change', restart);
    touchQuery.addEventListener('change', restart);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('blur', clearPointer);
      document.documentElement.removeEventListener('pointerleave', clearPointer);
      document.removeEventListener('visibilitychange', restart);
      motionQuery.removeEventListener('change', restart);
      touchQuery.removeEventListener('change', restart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
