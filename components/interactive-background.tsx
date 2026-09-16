'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; dx: number; dy: number };

/** Decorative circuit mesh. Tune spacing, radius and displacement below. */
export function InteractiveBackground({ theme }: { theme: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const spacing = 64;
    const radius = 240;
    const dark = theme === 'dark';
    const ink = dark ? '91, 153, 185' : '54, 107, 145';
    let width = 0;
    let height = 0;
    let columns = 0;
    let points: Point[] = [];
    let frame = 0;
    let lastTime = 0;
    let active = false;
    let strength = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let glowX = 0;
    let glowY = 0;
    let disposed = false;

    const draw = (time: number) => {
      frame = 0;
      if (disposed || document.hidden) return;
      const step = Math.min((time - lastTime) / 16.67 || 1, 3);
      lastTime = time;
      const easing = 1 - Math.pow(0.84, step);
      const enabled = pointer.matches && !motion.matches;
      const targetStrength = active && enabled ? 1 : 0;
      strength += (targetStrength - strength) * easing;
      glowX += (mouseX - glowX) * easing;
      glowY += (mouseY - glowY) * easing;
      let moving = Math.abs(strength - targetStrength) > 0.001;
      if (active && (Math.abs(glowX - mouseX) + Math.abs(glowY - mouseY)) > 0.1) moving = true;

      ctx.clearRect(0, 0, width, height);
      if (strength > 0.002) {
        const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius * 1.25);
        glow.addColorStop(0, `rgba(34, 211, 238, ${strength * (dark ? 0.10 : 0.06)})`);
        glow.addColorStop(0.45, `rgba(59, 130, 246, ${strength * 0.04})`);
        glow.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const point of points) {
        const x = point.x - mouseX;
        const y = point.y - mouseY;
        const distance = Math.hypot(x, y);
        const influence = enabled && active ? Math.pow(Math.max(0, 1 - distance / radius), 2) : 0;
        // A gentle outward bend with a slight orbit gives this grid its own character.
        const offsetX = ((x - y * 0.3) / Math.max(distance, 1)) * influence * 42;
        const offsetY = ((y + x * 0.3) / Math.max(distance, 1)) * influence * 42;
        point.dx += (offsetX - point.dx) * easing;
        point.dy += (offsetY - point.dy) * easing;
        if (Math.abs(offsetX - point.dx) + Math.abs(offsetY - point.dy) > 0.025) moving = true;
      }

      ctx.lineWidth = 0.7;
      ctx.strokeStyle = `rgba(${ink}, ${dark ? 0.16 : 0.13})`;
      ctx.beginPath();
      points.forEach((point, i) => {
        const right = (i + 1) % columns !== 0 ? points[i + 1] : undefined;
        const below = points[i + columns];
        for (const next of [right, below]) {
          if (!next) continue;
          ctx.moveTo(point.x + point.dx, point.y + point.dy);
          ctx.lineTo(next.x + next.dx, next.y + next.dy);
        }
      });
      ctx.stroke();

      points.forEach((point, i) => {
        const x = point.x + point.dx;
        const y = point.y + point.dy;
        const lit = Math.max(0, 1 - Math.hypot(x - glowX, y - glowY) / radius) * strength;
        ctx.fillStyle = lit > 0.02
          ? `rgba(${dark ? '103, 232, 249' : '2, 132, 199'}, ${0.25 + lit * 0.6})`
          : `rgba(${ink}, ${dark ? 0.3 : 0.24})`;
        ctx.beginPath();
        ctx.arc(x, y, 1 + lit * 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (i % 5 === 0 && lit > 0.12) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${lit * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(x, y - 5); ctx.lineTo(x + 5, y);
          ctx.lineTo(x, y + 5); ctx.lineTo(x - 5, y);
          ctx.closePath(); ctx.stroke();
        }
      });
      canvas.dataset.ready = 'true';
      // Render on demand; no continuous animation loop when the cursor settles.
      if (moving && enabled) frame = window.requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame && !document.hidden && !disposed) {
        lastTime = performance.now();
        frame = window.requestAnimationFrame(draw);
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      points = Array.from({ length: columns * rows }, (_, i) => ({
        x: (i % columns) * spacing - 24,
        y: Math.floor(i / columns) * spacing - 24,
        dx: 0, dy: 0,
      }));
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || motion.matches || !pointer.matches) return;
      mouseX = event.clientX; mouseY = event.clientY;
      if (!active) { glowX = mouseX; glowY = mouseY; }
      active = true;
      schedule();
    };
    const leave = () => { active = false; schedule(); };
    const preferenceChanged = () => {
      active = false; strength = 0;
      points.forEach((point) => { point.dx = 0; point.dy = 0; });
      schedule();
    };
    const visibilityChanged = () => {
      if (document.hidden) { window.cancelAnimationFrame(frame); frame = 0; active = false; }
      else schedule();
    };

    resize();
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibilityChanged);
    motion.addEventListener('change', preferenceChanged);
    pointer.addEventListener('change', preferenceChanged);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibilityChanged);
      motion.removeEventListener('change', preferenceChanged);
      pointer.removeEventListener('change', preferenceChanged);
    };
  }, [theme]);

  return <div className="interactive-background" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
