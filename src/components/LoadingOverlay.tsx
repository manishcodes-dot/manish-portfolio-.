import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { VideoTextAnimation } from './VideoTextAnimation';

// Centralized timing configuration for the loading sequence
const TIMING = {
  // Intro: speed up handwriting playback for a fast & responsive start
  INTRO_PLAYBACK_RATE: 1.4,
  // Hold: brief intentional pause on the final frame & red dot (ms)
  DOT_HOLD_DURATION: 350,
  // Reveal: gradual, cinematic circle expansion duration (seconds)
  CIRCLE_EXPANSION_DURATION: 2.2,
  // Fallback: safety timeout to prevent stuck loading screens (ms)
  SAFETY_TIMEOUT: 7500
};

interface LoadingOverlayProps {
  onComplete: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onComplete }) => {
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const activeOriginRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const radiusMotion = useMotionValue(0);
  const hasEndedRef = useRef(false);

  // Direct DOM style mutation — bypasses React state re-rendering completely for 60-120 FPS zero-lag mask animation
  useEffect(() => {
    const unsubscribe = radiusMotion.on('change', (radius) => {
      if (overlayRef.current) {
        const x = activeOriginRef.current.x;
        const y = activeOriginRef.current.y;
        const maskStr = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 98%, black 100%)`;
        overlayRef.current.style.maskImage = maskStr;
        overlayRef.current.style.webkitMaskImage = maskStr;
      }
    });
    return () => unsubscribe();
  }, [radiusMotion]);

  const startReveal = useCallback((originX: number, originY: number) => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    activeOriginRef.current = { x: originX, y: originY };

    // Calculate maximum distance to screen corner from dot origin
    const maxDistance = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    ) + 150;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      setIsDone(true);
      return;
    }

    // Event-driven sequence: short intentional hold on red dot before controlled reveal
    setTimeout(() => {
      // Smooth, deliberate circular expansion across 1.8s for a fluid cinematic feel
      animate(radiusMotion, maxDistance, {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Balanced fluid easing curve
        onComplete: () => {
          setIsDone(true);
          onComplete();
        }
      });
    }, TIMING.DOT_HOLD_DURATION);
  }, [onComplete, radiusMotion]);

  const handleVideoEnded = useCallback(() => {
    if (hasEndedRef.current) return;

    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;

    if (canvasEl) {
      const rect = canvasEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        // Red dot is at 63.86% X, 33.40% Y of the cropped canvas bounds
        originX = rect.left + rect.width * 0.6386;
        originY = rect.top + rect.height * 0.3340;
      }
    }

    startReveal(originX, originY);
  }, [canvasEl, startReveal]);

  // Fallback safety timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasEndedRef.current) {
        handleVideoEnded();
      }
    }, TIMING.SAFETY_TIMEOUT);

    return () => clearTimeout(timer);
  }, [handleVideoEnded]);

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbfbfb] select-none pointer-events-auto overflow-hidden"
      style={{
        maskImage: `radial-gradient(circle 0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px, transparent 98%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle 0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px, transparent 98%, black 100%)`
      }}
    >
      {/* Loading Overlay: Video animation only */}
      <div className="relative flex items-center justify-center">
        <VideoTextAnimation
          className="h-[clamp(110px,21vw,210px)] w-auto object-contain max-w-full"
          playbackRate={TIMING.INTRO_PLAYBACK_RATE}
          onEnded={handleVideoEnded}
          onCanvasRef={setCanvasEl}
        />
      </div>
    </div>
  );
};
