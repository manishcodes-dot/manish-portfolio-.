import React, { useState } from 'react';
import { Terminal, ArrowDown, Copy, Check, ExternalLink, Sparkles, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting - delicate and subtle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[260px] bg-sky-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Availability Banner */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs font-mono mb-6 backdrop-blur-sm shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="tracking-tight">{PERSONAL_INFO.availability}</span>
        </div>

        {/* Monospace intro prompt */}
        <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">guest@manish.io:~$</span>
          <span>cat profile.json | jq .title</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.14] mb-6">
          Full-Stack Web Developer crafting{' '}
          <span className="text-zinc-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 underline decoration-zinc-200 dark:decoration-zinc-800 underline-offset-8">
            resilient systems
          </span>{' '}
          & sub-second interfaces.
        </h1>

        {/* Bio Paragraph */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-8 font-normal">
          {PERSONAL_INFO.bio}
        </p>

        {/* Interactive CLI command bar */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="flex items-center gap-3 px-3.5 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-300 shadow-xs">
            <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <span className="text-zinc-400 dark:text-zinc-500 select-none">$</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">{PERSONAL_INFO.cliCommand}</span>
            <button
              onClick={handleCopyCli}
              className="ml-2 px-2 py-1 rounded bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-transparent transition-colors flex items-center gap-1 text-[11px] shadow-2xs"
              title="Copy CLI command"
              id="hero-copy-cli-btn"
            >
              {copiedCli ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#projects"
              id="hero-view-projects-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 font-medium text-xs font-mono transition-all shadow-sm"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenTerminal}
              id="hero-open-terminal-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-mono transition-colors shadow-2xs"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Interactive CLI</span>
            </button>

            <a
              href="#contact"
              id="hero-contact-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 text-xs font-mono transition-colors"
            >
              <span>Contact Me</span>
              <span className="text-zinc-400 dark:text-zinc-600">→</span>
            </a>
          </div>
        </div>

        {/* Minimal Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/60 shadow-xs flex flex-col"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-950 dark:text-zinc-100 tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
