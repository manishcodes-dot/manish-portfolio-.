"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface InkRevealProps {
  /** If true, revealed areas remain permanently revealed and do not fade back out */
  permanent?: boolean;
  /** RGB color of the mask overlay, e.g. [252, 250, 248] */
  maskColor?: [number, number, number];
  /** Optional background image URL to draw as mask layer instead of solid color */
  bgImage?: string;
  /** Radius of each ink stamp in px */
  brushSize?: number;
  /** How long each stamp lives before fading (ms) */
  lifetime?: number;
  /** Initial radius before the stamp expands */
  rStart?: number;
  /** Random variation factor for stamp radius (0–1) */
  rVary?: number;
  /** Min pixel distance between stamps along a stroke */
  stampStep?: number;
  /** Max stamps alive at once (oldest are pruned) */
  maxStamps?: number;
  /** Number of segments on the wobble circle (higher = smoother) */
  segments?: number;
  /** Wobble amplitude weights [primary, secondary, tertiary] */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor (0–1, relative to stamp radius) */
  gradientInnerRadius?: number;
  /** Gradient opacity stops [center, mid, edge] */
  gradientStops?: [number, number, number];
  /** Extra CSS class for the canvas element */
  className?: string;
  /** Extra inline styles for the canvas element */
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

export function InkReveal({
  permanent = false,
  maskColor = [252, 250, 248],
  bgImage,
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 14,
  maxStamps = 90,
  segments = 20,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  const mc = maskColor;

  const updateOffscreenBuffer = useCallback(
    (w: number, h: number, dpr: number) => {
      if (!offscreenRef.current) {
        offscreenRef.current = document.createElement("canvas");
      }
      const offscreen = offscreenRef.current;
      offscreen.width = Math.round(w * dpr);
      offscreen.height = Math.round(h * dpr);

      const ctx = offscreen.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const img = bgImgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let renderW = w;
        let renderH = h;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          renderH = w / imgRatio;
          offsetY = (h - renderH) / 2;
        } else {
          renderW = h * imgRatio;
          offsetX = (w - renderW) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      } else {
        ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
        ctx.fillRect(0, 0, w, h);
      }
    },
    [mc]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h, dpr };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    updateOffscreenBuffer(w, h, dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (offscreenRef.current) {
      ctx.drawImage(offscreenRef.current, 0, 0);
    }
  }, [updateOffscreenBuffer]);

  useEffect(() => {
    if (bgImage) {
      const img = new Image();
      img.src = bgImage;
      img.onload = () => {
        bgImgRef.current = img;
        resize();
      };
    } else {
      bgImgRef.current = null;
    }
  }, [bgImage, resize]);

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(
        x, y, r * gradientInnerRadius,
        x, y, r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      const stepAngle = (Math.PI * 2) / segments;
      for (let i = 0; i <= segments; i++) {
        const a = i * stepAngle;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const drawStampDirectly = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rmax = brushSize * (1 - rVary + Math.random() * rVary);
      const seed = Math.random() * Math.PI * 2;

      ctx.globalCompositeOperation = "destination-out";
      carveInk(ctx, x, y, rmax, seed, 1.0);
    },
    [brushSize, rVary, carveInk]
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (permanent) {
        if (!last) {
          drawStampDirectly(x, y);
        } else {
          const dx = x - last.x;
          const dy = y - last.y;
          const dist = Math.hypot(dx, dy);
          const steps = Math.max(1, Math.ceil(dist / stampStep));
          for (let i = 1; i <= steps; i++) {
            drawStampDirectly(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
          }
        }
      } else {
        if (!last) {
          addStamp(x, y);
        } else {
          const dx = x - last.x;
          const dy = y - last.y;
          const dist = Math.hypot(dx, dy);
          const steps = Math.max(1, Math.ceil(dist / stampStep));
          for (let i = 1; i <= steps; i++) {
            addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
          }
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, drawStampDirectly, permanent, stampStep]
  );

  const loop = useCallback(() => {
    if (permanent) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { dpr } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    if (offscreenRef.current) {
      ctx.drawImage(offscreenRef.current, 0, 0);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, [carveInk, lifetime, permanent, rStart]);

  const startLoop = useCallback(() => {
    if (permanent) return;
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop, permanent]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        stampAlong(x, y);
        if (!permanent) {
          startLoop();
        }
      }
    };

    const handleMouseLeave = () => {
      lastPosRef.current = null;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resize, stampAlong, startLoop, permanent]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default InkReveal;
