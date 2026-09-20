import React, { useEffect, useRef } from 'react';

interface VideoTextAnimationProps {
  className?: string;
  onEnded?: () => void;
  onPlay?: () => void;
  onCanvasRef?: (canvas: HTMLCanvasElement | null) => void;
  playbackRate?: number;
  startAtEnd?: boolean;
}

export const VideoTextAnimation: React.FC<VideoTextAnimationProps> = ({
  className,
  onEnded,
  onPlay,
  onCanvasRef,
  playbackRate = 1.0,
  startAtEnd = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (onCanvasRef) {
      onCanvasRef(canvasRef.current);
    }
  }, [onCanvasRef]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.playbackRate = playbackRate;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId: number;
    let hasEndedTriggered = false;

    const renderFrame = () => {
      if (video.readyState >= 2 && video.videoWidth && video.videoHeight) {
        // Crop out excess whitespace around text (inner 58% width, 46% height)
        const cropX = video.videoWidth * 0.21;
        const cropY = video.videoHeight * 0.27;
        const cropW = video.videoWidth * 0.58;
        const cropH = video.videoHeight * 0.46;

        if (canvas.width !== cropW || canvas.height !== cropH) {
          canvas.width = cropW;
          canvas.height = cropH;
        }

        if (ctx) {
          ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
          const frame = ctx.getImageData(0, 0, cropW, cropH);
          const buf32 = new Uint32Array(frame.data.buffer);
          const len = buf32.length;

          // Fast 32-bit uint pixel manipulation (30x faster than 8-bit array loops)
          for (let i = 0; i < len; i++) {
            const pixel = buf32[i];
            const r = pixel & 0xff;
            const g = (pixel >> 8) & 0xff;
            const b = (pixel >> 16) & 0xff;
            const brightness = (r + g + b) / 3;

            if (brightness > 215) {
              buf32[i] = 0; // Alpha 0
            } else if (brightness > 160) {
              const alphaRatio = (215 - brightness) / 55;
              const alpha = Math.max(0, Math.min(255, (alphaRatio * 255) | 0));
              buf32[i] = (pixel & 0x00ffffff) | (alpha << 24);
            }
          }

          ctx.putImageData(frame, 0, 0);
        }

        // Check if video reached the final frame
        const threshold = 0.08 * playbackRate;
        if (
          !hasEndedTriggered &&
          !startAtEnd &&
          (video.ended || (video.duration > 0 && video.currentTime >= video.duration - threshold))
        ) {
          hasEndedTriggered = true;
          video.pause();
          if (onEnded) onEnded();
        }
      }

      if (!hasEndedTriggered || startAtEnd) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    const handlePlay = () => {
      if (onPlay) onPlay();
    };

    const handleEnded = () => {
      if (!hasEndedTriggered && !startAtEnd) {
        hasEndedTriggered = true;
        video.pause();
        if (onEnded) onEnded();
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    if (startAtEnd) {
      const seekToEnd = () => {
        if (video.duration > 0) {
          video.currentTime = Math.max(0, video.duration - 0.05);
          video.pause();
          renderFrame();
        }
      };
      if (video.readyState >= 2) {
        seekToEnd();
      } else {
        video.addEventListener('loadedmetadata', seekToEnd, { once: true });
      }
    } else {
      // Ensure video starts playing cleanly from frame 0
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay blocked or pending interaction:', err);
        });
      }
    }

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded, onPlay, playbackRate, startAtEnd]);

  return (
    <div className="relative flex items-center justify-center">
      <video
        ref={videoRef}
        src="/assets/videos/manish text animation.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="pointer-events-none opacity-0 absolute w-1 h-1 overflow-hidden"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className={className || "h-[clamp(80px,16vw,150px)] w-auto object-contain max-w-full"}
      />
    </div>
  );
};
