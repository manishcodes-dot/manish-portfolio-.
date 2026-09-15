import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? theme === 'light'
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-xs'
            : 'bg-[#0c0e12]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Identity / Wordmark */}
        <a
          href="#hero-spec"
          className="group flex items-center gap-2.5 font-sans text-sm tracking-tight text-inherit focus:outline-none"
          id="nav-logo"
        >
          <span className="font-script text-2xl text-zinc-950 dark:text-white leading-none pt-1 group-hover:text-sky-600 transition-colors">
            Manish
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            Brand Spec
          </span>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Copy Email Button */}
          <button
            id="quick-copy-email-btn"
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors shadow-2xs"
            title="Copy email address"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>{copiedEmail ? 'Copied Email' : PERSONAL_INFO.email}</span>
          </button>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>

          {/* Contact Direct Mailto */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            id="nav-contact-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <span>Say Hello</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
