import React, { useEffect, useRef } from 'react';

interface VideoTextAnimationProps {
  className?: string;
}

export const VideoTextAnimation: React.FC<VideoTextAnimationProps> = ({ className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId: number;

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
          const data = frame.data;

          // Process each pixel: convert off-white video background to true alpha transparency
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate luminance/brightness
            const brightness = (r + g + b) / 3;

            if (brightness > 215) {
              // Completely transparent for off-white background
              data[i + 3] = 0;
            } else if (brightness > 160) {
              // Smooth anti-aliased edge feathering
              const alphaRatio = (215 - brightness) / 55;
              data[i + 3] = Math.max(0, Math.min(255, Math.floor(alphaRatio * 255)));
            }
          }

          ctx.putImageData(frame, 0, 0);
        }
      }

      animId = requestAnimationFrame(renderFrame);
    };

    const handlePlay = () => {
      renderFrame();
    };

    const handleEnded = () => {
      // Render final frame once when video ends
      renderFrame();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    // Reset video time to 0 and start playing on load
    video.currentTime = 0;
    video.play().catch((err) => {
      console.warn('Video autoplay blocked or pending interaction:', err);
    });

    renderFrame();

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <video
        ref={videoRef}
        src="/assets/videos/manish text animation.mp4"
        autoPlay
        muted
        playsInline
        className="hidden"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className={className || "h-[clamp(80px,16vw,150px)] w-auto object-contain max-w-full"}
      />
    </div>
  );
};
