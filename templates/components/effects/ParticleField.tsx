"use client";

/**
 * ParticleField — Lightweight canvas-based particle effect for backgrounds.
 * Three variants: drift (float randomly), rise (upward like sparks), burst (explode from centre).
 * Canvas doesn't universally support OKLCH — provide `fallbackColor` as rgba/hex for fillStyle.
 *
 * Usage:
 *   <div className="relative h-96">
 *     <ParticleField color="oklch(0.8 0.1 200)" fallbackColor="rgba(180,220,255,0.6)" variant="rise" />
 *     <div className="relative z-10">Content on top</div>
 *   </div>
 */

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

interface ParticleFieldProps {
  color: string;
  fallbackColor?: string;
  count?: number;
  speed?: number;
  size?: number;
  variant?: "drift" | "rise" | "burst";
  className?: string;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number;
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, fill: string) {
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fill();
}

export default function ParticleField({
  color: _color,
  fallbackColor = "rgba(255, 255, 255, 0.6)",
  count = 30,
  speed = 0.5,
  size = 2,
  variant = "drift",
  className = "",
}: ParticleFieldProps) {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const inited = useRef(false);

  const initParticles = useCallback((w: number, h: number): Particle[] => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const base = speed * (0.3 + Math.random() * 0.7);
      let vx: number, vy: number, x: number, y: number;

      if (variant === "rise") {
        x = Math.random() * w; y = h + Math.random() * 20;
        vx = (Math.random() - 0.5) * base * 0.4;
        vy = -base * (0.5 + Math.random() * 0.5);
      } else if (variant === "burst") {
        x = w / 2; y = h / 2;
        vx = Math.cos(angle) * base * 2; vy = Math.sin(angle) * base * 2;
      } else {
        x = Math.random() * w; y = Math.random() * h;
        vx = (Math.random() - 0.5) * base; vy = (Math.random() - 0.5) * base;
      }
      return { x, y, vx, vy, radius: size * (0.5 + Math.random() * 0.8), opacity: 0.3 + Math.random() * 0.7 };
    });
  }, [count, speed, size, variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (!inited.current) {
        particlesRef.current = initParticles(canvas.width, canvas.height);
        inited.current = true;
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    // Reduced motion: render static particles once
    if (prefersReduced) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) drawParticle(ctx, p, fallbackColor);
      ctx.globalAlpha = 1;
      return () => observer.disconnect();
    }

    const animate = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of particlesRef.current) {
        p.x += p.vx; p.y += p.vy;
        if (variant === "drift") {
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        } else if (variant === "rise") {
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        } else if (variant === "burst") {
          const dx = p.x - w / 2, dy = p.y - h / 2;
          const maxDist = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);
          p.opacity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / maxDist);
        }
        drawParticle(ctx, p, fallbackColor);
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(animRef.current); observer.disconnect(); };
  }, [prefersReduced, fallbackColor, variant, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
