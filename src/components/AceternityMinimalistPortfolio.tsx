'use client';

import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Calendar,
  Globe,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from '../data/portfolioData';
import { Project } from '../types';
import { ParallaxComponent } from './ui/parallax-scrolling';
import ContributionSkyline from './ui/contribution-skyline';
import { MANISH_GITHUB_CONTRIBUTIONS } from '../data/githubContributions';

// Dotted Divider SVG matching Aceternity Minimalist Template

const DottedDivider = () => (
  <div aria-hidden="true" className="w-full shrink-0 my-8 sm:my-10">
    <svg className="pointer-events-none text-zinc-400 dark:text-zinc-600 relative w-full opacity-40 h-[4px]" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id="dotted-line-pat" width="6" height="4" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotted-line-pat)" />
    </svg>
  </div>
);

const DottedLink = ({ href, children, target = "_blank" }: { href: string; children: React.ReactNode; target?: string }) => (
  <a href={href} target={target} rel="noopener noreferrer" className="group text-zinc-900 dark:text-zinc-100 font-medium relative inline-block hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
    <span className="relative inline-block pb-[0.05rem]">
      {children}
      <svg className="pointer-events-none absolute bottom-0 left-0 w-full text-zinc-400 dark:text-zinc-500 h-[4px] opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <pattern id="dotted-link-pattern" width="6" height="4" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted-link-pattern)" />
      </svg>
    </span>
  </a>
);

interface AceternityPortfolioProps {
  onSelectProject?: (project: Project) => void;
}

export const AceternityMinimalistPortfolio: React.FC<AceternityPortfolioProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'frontend' | 'devtools'>('all');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSendSuccess(false), 4000);
    }, 700);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeTab === 'all') return true;
    return proj.category === activeTab;
  });

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">

      {/* =========================================================================
          1. ACETERNITY MINIMALIST HEADER & NAVBAR
         ========================================================================= */}
      <nav className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 pt-6 md:pt-10">
        {/* Top 3D Perspective Avatar & Name */}
        <div className="flex items-center gap-3">
          <div className="perspective-distant">
            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 shadow-md border border-zinc-200 dark:border-zinc-700 transition-transform duration-300 hover:scale-105">
              <img
                src="/assets/img/manish-person.jpg"
                alt="Manish Rana"
                className="aspect-square size-10 rounded-md object-cover shadow-xs"
              />
            </div>
          </div>
          <div>
            <h1 className="text-zinc-900 dark:text-zinc-100 text-xl font-semibold tracking-tight md:text-2xl flex items-center gap-2 font-amiko">
              {PERSONAL_INFO.name}
              <span className="text-zinc-400 font-normal text-sm">aka</span>
              <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 italic">manishcodes-dot</span>
            </h1>
          </div>
        </div>

        {/* Navigation Tabs with Dotted Underlines */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <a href="#about" className="text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 transition-colors">Home</a>
          <a href="#projects" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</a>
          <a href="#tech" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Tech Stack</a>
          <a href="#experience" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Experience</a>
          <a href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main Centered Column (max-w-2xl) */}
      <main id="about" className="mx-auto max-w-2xl px-4 pt-6 pb-16">

        {/* =========================================================================
            2. CONVERSATIONAL BIO / HERO NARRATIVE
           ========================================================================= */}
        <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
          <p>
            I&apos;m a senior software engineer at heart, specializing in building high-performance distributed systems, modern React architectures, and sub-100ms developer tools. Active on{' '}
            <DottedLink href={PERSONAL_INFO.github}>GitHub (@manishcodes-dot)</DottedLink>{' '}
            where I share open source code and experiments.
          </p>
          <p>
            When I&apos;m not writing code, I usually research state synchronization engines, edge computing, design systems, and frontend performance optimizations.
          </p>
          <p>
            I&apos;ve built production web applications serving thousands of users with 99+ Lighthouse scores and deterministic offline-first synchronization.
          </p>
        </div>

        <DottedDivider />

        {/* =========================================================================
            3. "THINGS I DO" FEATURED SERVICES & PRODUCTS
           ========================================================================= */}
        <section id="services" className="scroll-mt-10">
          <h2 className="text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase tracking-wider mb-5 font-semibold">
            Things I do
          </h2>

          <div className="mt-4 flex flex-col gap-5 md:gap-4">
            {[
              {
                title: 'Full-Stack Web Engineering',
                description: 'High-performance React 19, Next.js, and TypeScript web applications.',
                gradient: 'bg-gradient-to-b from-blue-400 to-blue-600 ring-offset-blue-500',
                icon: Code2,
                href: '#projects',
              },
              {
                title: 'Distributed State & Edge Sync',
                description: 'Real-time WebSocket sync, Redis Pub/Sub, and CRDT state engines.',
                gradient: 'bg-gradient-to-b from-orange-400 to-orange-600 ring-offset-orange-500',
                icon: Terminal,
                href: '#projects',
              },
              {
                title: 'UI/UX & Accessible Design Systems',
                description: 'Sub-100ms Core Web Vitals, Tailwind CSS v4, and modern micro-interactions.',
                gradient: 'bg-gradient-to-b from-emerald-400 to-emerald-600 ring-offset-emerald-500',
                icon: Layers,
                href: '#projects',
              },
              {
                title: 'API & Microservices Architecture',
                description: 'Scalable Node.js, Express, PostgreSQL, and IndexedDB offline-first layers.',
                gradient: 'bg-gradient-to-b from-purple-400 to-purple-600 ring-offset-purple-500',
                icon: Cpu,
                href: '#projects',
              },
              {
                title: 'Open Source DevTools',
                description: 'Building developer tools and utilities with 1.4k+ GitHub stars.',
                gradient: 'bg-gradient-to-b from-rose-400 to-rose-600 ring-offset-rose-500',
                icon: Sparkles,
                href: PERSONAL_INFO.github,
              },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors"
                >
                  <div className={`relative flex aspect-square size-8 items-center justify-center rounded-sm ${item.gradient} align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset shrink-0`}>
                    <ItemIcon className="size-4 text-white drop-shadow-xl drop-shadow-black/40" />
                  </div>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <DottedDivider />

        {/* =========================================================================
            4. "COMPANIES & TECH STACK I WORK WITH" GRID
           ========================================================================= */}
        <section id="tech" className="scroll-mt-10">
          <h2 className="text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase tracking-wider mb-6 font-semibold">
            Tech Stack &amp; Tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS.slice(0, 6).map((skill, idx) => {
              const bgColors = [
                'from-cyan-500 to-blue-600 ring-blue-500',
                'from-indigo-500 to-purple-600 ring-indigo-500',
                'from-emerald-500 to-green-600 ring-emerald-500',
                'from-amber-500 to-orange-600 ring-amber-500',
                'from-rose-500 to-pink-600 ring-rose-500',
                'from-violet-500 to-fuchsia-600 ring-violet-500',
              ];
              const badgeStyle = bgColors[idx % bgColors.length];

              return (
                <div key={skill.name} className="flex items-center gap-3 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className={`relative flex aspect-square size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-b ${badgeStyle} shadow-sm ring-1 ring-white/20 ring-offset-1 text-white`}>
                    <Cpu className="size-4 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">{skill.name}</p>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{skill.level}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <DottedDivider />

        {/* =========================================================================
            5. "WORK WITH ME" ACTION HUB
           ========================================================================= */}
        <section id="contact" className="scroll-mt-10">
          <h2 className="text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase tracking-wider mb-6 font-semibold">
            Work With Me
          </h2>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Mail className="size-4" />
                </div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">Send Email Inquiry</p>
              </div>
              <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Github className="size-4" />
                </div>
                <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">GitHub Open Source</p>
              </div>
              <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </a>
          </div>

          {/* Inline Quick Message Form */}
          <form onSubmit={handleFormSubmit} className="mt-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Send a quick message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Your Message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white resize-none"
            />
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSending ? 'Sending...' : sendSuccess ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </section>

        <DottedDivider />

        {/* =========================================================================
            6. OPEN SOURCE ACTIVITY & CONTRIBUTION SKYLINE
           ========================================================================= */}
        <section className="scroll-mt-10">
          <h2 className="text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase tracking-wider mb-4 font-semibold">
            GitHub Contribution Activity
          </h2>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
            <ContributionSkyline data={MANISH_GITHUB_CONTRIBUTIONS} />
          </div>
        </section>

        <DottedDivider />

        {/* Footer info */}
        <footer className="my-8 text-center text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React &amp; Tailwind CSS.</p>
        </footer>

      </main>

      {/* =========================================================================
          7. PARALLAX SHOWCASE & SCROLL REVEAL (Interactive Banner)
         ========================================================================= */}
      <div className="w-full mt-12">
        <ParallaxComponent />
      </div>

    </div>
  );
};
