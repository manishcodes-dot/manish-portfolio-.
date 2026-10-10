import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import ContributionSkyline, { ContributionDay } from './ui/contribution-skyline';
import { Project } from '../types';

interface CleanPortfolioProps {
  onSelectProject?: (project: Project) => void;
}

// "Things I do" items matching the exact text & minimal layout of the Aceternity template
const THINGS_I_DO_ITEMS = [
  {
    title: 'Websites & SaaS Applications',
    description: 'Design + Dev studio for fast web platforms, SaaS apps, and scalable web products.',
    link: '#projects',
    isExternal: false,
  },
  {
    title: 'Cross-Platform Mobile Apps',
    description: 'Building native-feel iOS & Android apps with Flutter, React Native, and offline syncing.',
    link: '#projects',
    isExternal: false,
  },
  {
    title: 'Backend Infrastructure & APIs',
    description: 'Architecting REST & GraphQL microservices, PostgreSQL databases, and Docker pipelines.',
    link: '#skills',
    isExternal: false,
  },
  {
    title: 'SEO & Web Performance',
    description: 'Core Web Vitals tuning, technical SEO indexing, organic rankings, and web accessibility.',
    link: '#contact',
    isExternal: false,
  },
];

// Companies & Work Experience
const COMPANIES_I_WORKED_WITH = [
  {
    name: 'Fishtail Tech',
    role: 'Full-Stack Software Engineer',
    description: 'Engineered web applications, API microservices, and cross-platform mobile systems.',
    period: '2024 - Present',
  },
  {
    name: 'Informatics',
    role: 'Web & Systems Developer',
    description: 'Built high-performance web platforms, database schemas, and client management tools.',
    period: '2022 - 2024',
  },
  {
    name: 'Open Source & Freelance Studio',
    role: 'Independent Developer',
    description: 'Delivering end-to-end full-stack software and developer tools for global clients.',
    period: '2020 - Present',
  },
];

export const CleanPortfolio: React.FC<CleanPortfolioProps> = ({ onSelectProject }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [githubData, setGithubData] = useState<ContributionDay[] | undefined>(undefined);
  const [skylineView, setSkylineView] = useState<'2d' | '3d'>('2d');

  // Fetch live GitHub contribution data for 'manishcodes-dot'
  useEffect(() => {
    fetch('https://github-contributions.vercel.app/api/v1/manishcodes-dot')
      .then((res) => res.json())
      .then((res) => {
        if (res && Array.isArray(res.contributions)) {
          const formatted: ContributionDay[] = res.contributions.map((item: { date: string; count: number }) => ({
            date: item.date,
            count: item.count || 0,
          }));
          setGithubData(formatted);
        }
      })
      .catch((err) => console.error('Failed to fetch live GitHub contributions:', err));
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white font-sans antialiased min-h-screen">
      {/* Centered Single Column Master Container (Aceternity Minimalist Architecture) */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-14">

        {/* =========================================================================
            1. HERO & HEADER SECTION (Aceternity Minimalist Header)
           ========================================================================= */}
        <header id="hero" className="space-y-6">
          {/* Header Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-model-plastic">
              Manish Shrestha
            </h1>

            {/* Navigation & Social Shortcuts Row (Directly after name) */}
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600 font-medium mt-3 mb-4">
              <a href="#hero" className="hover:text-zinc-950 transition-colors">
                Home
              </a>
              <span className="text-zinc-300">•</span>
              <a href="#services" className="hover:text-zinc-950 transition-colors">
                Things I do
              </a>
              <span className="text-zinc-300">•</span>
              <a href="#projects" className="hover:text-zinc-950 transition-colors">
                Projects
              </a>
              <span className="text-zinc-300">•</span>
              <a href="#experience" className="hover:text-zinc-950 transition-colors">
                Experience
              </a>
              <span className="text-zinc-300">•</span>
              <a href="#contact" className="hover:text-zinc-950 transition-colors">
                Contact
              </a>
              <span className="text-zinc-300">•</span>
              {PERSONAL_INFO.github && (
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors inline-flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              )}
            </nav>

            {/* Bio Paragraphs */}
            <div className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed space-y-3">
              <p>
                I'm a software engineer at heart, tinkering with AI and code almost 90% of the time. I'm mostly active on{' '}
                <a
                  href="https://x.com/mannupaaji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-950 font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 transition-colors"
                >
                  X / Twitter
                </a>{' '}
                where I share everything.
              </p>
              <p>
                When I'm not coding, I usually talk about Design Engineering, AI Tools and Front-end design taste at my{' '}
                <a
                  href="https://www.youtube.com/@manuarora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-950 font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 transition-colors"
                >
                  YouTube Channel.
                </a>
              </p>
              <p>
                I've been building my own component library{' '}
                <a
                  href="https://ui.aceternity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-950 font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 transition-colors"
                >
                  Aceternity UI
                </a>{' '}
                for the past 4 years. It has got around 3M page views and 200k unique visitors a month. My favourite thing is to update this library everyday with new components and features.
              </p>
            </div>
          </div>

        {/* Top-Right Corner Badge: Fixed size Live Availability Status */}
        <a
          href="#contact"
          className="fixed top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2.5 font-mono text-[11px] text-zinc-700 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 hover:border-emerald-500/60 shadow-xs hover:shadow-emerald-500/15 transition-all duration-300 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-emerald-500/40 z-50 shrink-0 whitespace-nowrap"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="group-hover:text-emerald-950 transition-colors font-medium">Available for Projects</span>
        </a>
        </header>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-zinc-200/80" />

        {/* =========================================================================
            2. THINGS I DO SECTION (Exact Aceternity Minimalist Row Layout)
           ========================================================================= */}
        <section id="services" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Things I do
          </h2>

          <div className="space-y-1">
            {THINGS_I_DO_ITEMS.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="block group p-3.5 sm:p-4 -mx-3 sm:-mx-4 rounded-xl hover:bg-zinc-100/70 transition-colors duration-200 cursor-pointer border border-transparent hover:border-zinc-200/60"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 group-hover:text-zinc-900 transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-sm text-zinc-600 font-normal leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-zinc-200/80" />

        {/* =========================================================================
            3. COMPANIES I'VE WORKED WITH (Experience Section)
           ========================================================================= */}
        <section id="experience" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Companies I've worked with
          </h2>

          <div className="space-y-4">
            {COMPANIES_I_WORKED_WITH.map((company, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 -mx-3 sm:-mx-4 rounded-xl hover:bg-zinc-100/70 transition-colors border border-transparent hover:border-zinc-200/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                    {company.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {company.period}
                  </span>
                </div>
                <div className="text-xs font-medium text-zinc-700 mt-0.5">
                  {company.role}
                </div>
                <p className="text-sm text-zinc-600 font-normal leading-relaxed mt-1">
                  {company.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-zinc-200/80" />

        {/* =========================================================================
            4. FEATURED PROJECTS SECTION (Aceternity Minimalist Works)
           ========================================================================= */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
              Featured Projects
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              // SELECTED WORKS
            </span>
          </div>

          <div className="space-y-3">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject && onSelectProject(project)}
                className="group p-4 -mx-3 sm:-mx-4 rounded-xl hover:bg-zinc-100/70 border border-transparent hover:border-zinc-200/60 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 group-hover:text-zinc-900 transition-colors tracking-tight flex items-center gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                  {project.tagline || project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 text-[11px] font-mono text-zinc-600 border border-zinc-200/60 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-zinc-200/80" />

        {/* =========================================================================
            5. GITHUB ACTIVITY SECTION
           ========================================================================= */}
        <section id="activity" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Open Source Activity
          </h2>
          <div className="p-2 sm:p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 overflow-hidden">
            <ContributionSkyline
              data={githubData}
              palette="github"
              view={skylineView}
              onViewChange={setSkylineView}
              title={null}
              footer={null}
              showStats={false}
              showLegend={false}
              heightScale={0.55}
              className="border-0 p-0 bg-transparent shadow-none"
            />
          </div>
        </section>

        {/* Hairline Divider */}
        <div className="w-full h-px bg-zinc-200/80" />

        {/* =========================================================================
            6. WORK WITH ME / CONTACT SECTION
           ========================================================================= */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Work with me
          </h2>

          <div className="space-y-3">
            {/* Consultation / Direct Contact */}
            <div className="p-4 -mx-3 sm:-mx-4 rounded-xl hover:bg-zinc-100/70 border border-transparent hover:border-zinc-200/60 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                  Direct Email
                </h3>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-xs font-mono font-medium text-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-sm text-zinc-700 hover:text-zinc-950 font-medium hover:underline block mt-1"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-xs text-zinc-500 mt-1 font-normal">
                Available for full-stack engineering, system architecture, mobile apps, and high-impact contracts.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FOOTER
           ========================================================================= */}
        <footer className="pt-8 border-t border-zinc-200/80 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Built by <span className="font-semibold text-zinc-800">Manish Shrestha</span>. Inspired by Aceternity UI Minimalist Template.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
};
