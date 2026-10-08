import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberTicker } from './ui/number-ticker';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleFinish = () => {
    setTimeout(() => {
      setLoadingComplete(true);
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      {!loadingComplete && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 bg-[#fbfbfb] text-zinc-900 flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none border-b border-zinc-200"
        >
          {/* Preloader Background Image (contant bg.png) with Exact Hero Page Fade Effect */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
            <img
              src="/assets/img/contant bg.png"
              alt="Preloader background"
              className="w-full h-full object-cover object-center scale-105 transition-opacity duration-300"
              style={{ opacity: 0.80 }}
            />
            {/* Subtle gradient overlay to smoothly fade image into the background (same as hero) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/30 via-transparent to-[#fbfbfb]/90 pointer-events-none" />
          </div>

          {/* Subtle geometric dot grid background overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 z-10"
            style={{
              backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />

          {/* RIGHT-DOWN CORNER NUMBER TICKER (Pure Minimal counter) */}
          <div className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 z-50 flex items-baseline gap-1">
            <NumberTicker
              value={100}
              delay={0.1}
              onComplete={handleFinish}
              className="text-7xl sm:text-9xl font-black tracking-tighter whitespace-pre-wrap text-zinc-950 font-mono leading-none select-none drop-shadow-md"
            />
            <span className="text-3xl sm:text-5xl font-extrabold text-zinc-400 font-mono">
              %
            </span>
          </div>

          {/* Minimal Loading Line across bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-200 z-20">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              className="h-full bg-zinc-950"
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
