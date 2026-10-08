import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-200/80 dark:border-zinc-900 bg-zinc-50 dark:bg-[#080a0d] text-zinc-600 dark:text-zinc-400 font-mono text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          {/* Left: Brand info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200 font-semibold">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{PERSONAL_INFO.name} // {PERSONAL_INFO.handle}</span>
            </div>
            <p className="text-[11px] text-zinc-500 text-center md:text-left font-kyoto">
              Crafted with TypeScript, React 19 &amp; Tailwind CSS. Zero bloat.
            </p>
          </div>

          {/* Center: System Telemetry */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: ALL_SYSTEMS_OPERATIONAL</span>
            </div>
            <div className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</div>
            <div>
              <span>BLR TIME: {time || '12:00:00'} IST</span>
            </div>
            <div className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</div>
            <div className="text-zinc-400 dark:text-zinc-500">
              BUILD: v2.4.2 (rev 440f68)
            </div>
          </div>

          {/* Right: Scroll to top */}
          <div>
            <button
              onClick={scrollToTop}
              id="scroll-to-top-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors shadow-2xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Open source under MIT.
          </div>

          <div className="flex items-center gap-4">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
