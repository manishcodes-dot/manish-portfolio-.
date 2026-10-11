import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Briefcase, Check, ChevronRight, Copy, FolderGit2, Globe, History, Home, Mail, Sparkles, X } from 'lucide-react';
import { Dock, DockIcon, Icons } from './ui/dock';
import { Project } from '../types';
import ContributionSkyline from './ui/contribution-skyline';
import { MANISH_GITHUB_CONTRIBUTIONS } from '../data/githubContributions';

interface CleanPortfolioProps {
  onSelectProject?: (project: Project) => void;
}

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Custom Designer'];

// "Things I do" services matching reference image
const THINGS_I_DO_ITEMS = [
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'High-performance websites and modern web applications crafted with responsive interactions, robust architecture, and clean code.',
    image: '/assets/img/webdev-mockup.jpg',
  },
  {
    id: 'uiux',
    title: 'UI and UX Design',
    description: 'Designing intuitive and scalable interfaces for web dashboards, mobile applications, and design systems.',
    image: '/assets/img/uiux-mockup.jpg',
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Cross-platform and native mobile apps built with fluid touch gestures, smooth animations, and high performance.',
    image: '/assets/img/mobile-mockup.jpg',
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Search engine optimization, semantic structured markup, technical performance audits, and organic search visibility.',
    image: '/assets/img/seo-mockup.jpg',
  },
];

// Work Experience matching Dillion Verma / Magic UI reference site layout
const WORK_EXPERIENCE = [
  {
    name: 'Fishtail Infosolutions',
    role: 'SEO Analyst & Copywriter',
    period: 'Mar 2023 - Present',
    description: 'Analyzing search engine performance, executing technical SEO audits, keyword research, and crafting engaging content strategy to maximize organic search visibility and user conversion.',
    logo: '/assets/img/fishtail-logo.png',
    initials: 'FI',
    technologies: ['SEO', 'JavaScript', 'HTML5', 'CSS3', 'Python'],
  },
];

// Tech stack SVG icon mapping (from Devicon / thesvg.org CDN)
const TECH_ICONS: Record<string, string> = {
  'Dart': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  'NGINX': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  'SEO': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
};

// Education matching reference site
const EDUCATION_ITEMS = [
  {
    name: 'Informatics College Pokhara',
    degree: 'Bachelor of Information Technology (BIT)',
    period: '2021 - 2024',
    initials: 'ICP',
    logo: '/assets/img/informatics-logo.svg',
    link: 'https://icp.edu.np/',
  },
];

// Skills from reference image (Languages, Frontend, Backend & DBs, Tools & Infra)
const SKILLS = [
  'Dart',
  'JavaScript',
  'Python',
  'Flutter',
  'React',
  'Next.js',
  'Redux',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'SQLite',
  'Redis',
  'Firebase',
  'Docker',
  'Git',
  'Linux',
  'Nginx',
];

// Projects matching user netlify links ("Projects I done")
const REFERENCE_PROJECTS = [
  {
    id: 'crema-co',
    title: 'Crema & Co.',
    description: 'A premium web experience for artisanal coffee roasters featuring interactive customization wizards and floating controls.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    iframeUrl: 'https://test12418.netlify.app/',
    technologies: ['React', 'TailwindCSS', 'TypeScript'],
    link: 'https://test12418.netlify.app/',
  },
  {
    id: 'gokyo-bistro',
    title: 'Gokyo Bistro',
    description: 'Premier dining experience and online booking platform for Gokyo Bistro in Jhamsikhel with live availability checking.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    iframeUrl: 'https://cheery-pegasus-71d26c.netlify.app/',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://cheery-pegasus-71d26c.netlify.app/',
  },
];

const CONTACT_EMAIL = 'dillion@verma.io';
const GITHUB_URL = 'https://github.com/dillionverma';

const ProjectCursorFollower: React.FC<{
  pos: { x: number; y: number } | null;
}> = ({ pos }) => {
  if (!pos || typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999999,
        transition: 'transform 0.04s ease-out',
      }}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-medium tracking-wide shadow-2xl border border-zinc-700/80 backdrop-blur-md select-none animate-in fade-in zoom-in-75 duration-100"
    >
      <span>Visit</span>
      <ArrowUpRight className="size-3.5 text-zinc-300 stroke-[2]" />
    </div>,
    document.body
  );
};

export const CleanPortfolio: React.FC<CleanPortfolioProps> = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [roleIndex, setRoleIndex] = useState(0);
  const [expandedWorkIdx, setExpandedWorkIdx] = useState<number | null>(null);
  const [skylineView, setSkylineView] = useState<'2d' | '3d'>('2d');
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [nameAnimationKey, setNameAnimationKey] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [projectCursorPos, setProjectCursorPos] = useState<{ x: number; y: number } | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    if (!projectCursorPos) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setProjectCursorPos({ x: e.clientX, y: e.clientY });
          return;
        }
      }
      setProjectCursorPos(null);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [projectCursorPos !== null]);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hide dock whenever user is actively scrolling (UP or DOWN)
      setIsDockVisible(false);

      // Reveal dock 80ms after scrolling movement stops completely
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsDockVisible(true);
      }, 80);

      // Active section spy
      const sections = ['hero', 'about', 'services', 'projects', 'contributions', 'work', 'education', 'skills', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white font-sans antialiased min-h-screen">
      {/* Centered Container matching Reference Design */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-28 sm:pb-36 space-y-12">

        {/* =========================================================================
            1. HERO HEADER SECTION (Exact Screenshot Design)
           ========================================================================= */}
        <header id="hero" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
            <img
              src="/assets/img/my img.webp"
              alt="Manish Rana"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-sm border border-zinc-200/90 shrink-0"
            />
            <h1
              key={nameAnimationKey}
              onClick={() => setNameAnimationKey((k) => k + 1)}
              title="Click to replay handwriting animation"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 tegaki-kyoto cursor-pointer select-none inline-block"
            >
              Hi, I'm Manish Rana
            </h1>
            <span className="inline-flex items-center px-3.5 py-1 rounded-xl border border-zinc-300/80 bg-white text-zinc-700 text-xs sm:text-sm font-medium shadow-xs overflow-hidden h-7 sm:h-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="inline-block whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-[650px]">
            I'm a Developer exploring web, mobile, design, and SEO while building application, creating digital experiences, and growing toward mastery in each skills.
          </p>

          {/* Availability Status Badge */}
          <a
            href="#contact"
            className="fixed top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2.5 font-mono text-[11px] text-zinc-700 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-xl border border-zinc-300/80 hover:border-zinc-400 shadow-xs transition-all duration-300 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-emerald-500/40 z-50 shrink-0 whitespace-nowrap"
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="group-hover:text-emerald-950 transition-colors font-medium">Available for Projects</span>
          </a>
        </header>

        {/* =========================================================================
            2. ABOUT SECTION
           ========================================================================= */}
        <section id="about" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
            About
          </h2>
          <div className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed space-y-3">
            <p>
              During my BIT journey, I developed a strong interest in technology, from coding and cybersecurity to designing and building real-world projects. Starting in my early semesters, I explored different skills and gradually began learning more deeply in later semesters. Today, I'm developing my skills in web development, mobile applications, UI/UX design, and SEO, with a goal of turning ideas into meaningful digital experiences and continuously growing as a developer.
            </p>
          </div>
        </section>

        {/* =========================================================================
            THINGS I DO SECTION (Matching Reference Image Design)
           ========================================================================= */}
        <section id="services" className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Things I do
          </h2>

          <div
            className="space-y-0 divide-y divide-zinc-200/90 border-t border-b border-zinc-200/90"
            onMouseLeave={() => setHoveredService(null)}
          >
            {THINGS_I_DO_ITEMS.map((item, idx) => {
              const isHovered = hoveredService === idx;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative flex items-start justify-between py-4 sm:py-5 cursor-pointer transition-colors"
                >
                  <div className="relative z-10 max-w-[52%] sm:max-w-[290px] md:max-w-[320px] pr-2">
                    <h4 className="text-base sm:text-lg font-light tracking-normal text-zinc-800 group-hover:text-zinc-950 transition-colors">
                      {item.title}
                    </h4>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -3 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -3 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed pt-1 overflow-hidden"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <ArrowUpRight className="size-5 sm:size-6 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 shrink-0 stroke-[1.5] mt-0.5 relative z-10" />

                  {/* Floating tilted mockup preview on hover - Positioned safely away from text */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 6 }}
                        exit={{ opacity: 0, scale: 0.92, rotate: 2 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-8 sm:right-12 md:right-16 -top-10 sm:-top-14 w-36 sm:w-48 md:w-56 aspect-4/3 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white pointer-events-none z-20"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            PROJECTS SECTION (Projects I done)
           ========================================================================= */}
        <section
          id="projects"
          className="space-y-5"
          onMouseEnter={(e) => setProjectCursorPos({ x: e.clientX, y: e.clientY })}
          onMouseMove={(e) => setProjectCursorPos({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setProjectCursorPos(null)}
        >
          <ProjectCursorFollower pos={projectCursorPos} />

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
            Projects I done
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {REFERENCE_PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.link || '#'}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(e) => setProjectCursorPos({ x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setProjectCursorPos({ x: e.clientX, y: e.clientY })}
                className="group flex flex-col cursor-pointer"
              >
                {/* Banner / Live Website Preview Container (Borderless & Full-Bleed) */}
                <div className="relative w-full aspect-16/10 rounded-2xl bg-zinc-100 overflow-hidden shadow-xs flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                  {project.iframeUrl ? (
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none rounded-2xl bg-white">
                      <iframe
                        src={project.iframeUrl}
                        title={project.title}
                        className="w-[350%] h-[350%] origin-top-left scale-[0.285714] border-0 pointer-events-none select-none"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}
                </div>

                {/* Title Below Card */}
                <h3 className="text-base sm:text-lg font-semibold text-zinc-950 tracking-tight mt-3 group-hover:text-zinc-800 transition-colors">
                  {project.title}
                </h3>

                {/* Description Below Title */}
                <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed mt-1">
                  {project.description}
                </p>

                {/* Tech SVG Icon Row with Smooth Right-Side Expansion */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {project.technologies.map((tech, tIdx) => {
                    const iconUrl = TECH_ICONS[tech];
                    return (
                      <div
                        key={tIdx}
                        className="group/tech inline-flex items-center h-7 w-7 hover:w-auto px-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/90 hover:bg-white hover:border-zinc-300 shadow-2xs transition-all duration-300 ease-in-out overflow-hidden cursor-pointer select-none shrink-0"
                      >
                        <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                          {iconUrl ? (
                            <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain shrink-0" />
                          ) : (
                            <span className="text-[9px] font-bold text-zinc-700 shrink-0">{tech.slice(0, 2)}</span>
                          )}
                        </div>
                        <span className="max-w-0 opacity-0 group-hover/tech:max-w-[140px] group-hover/tech:opacity-100 group-hover/tech:ml-1.5 text-[11px] font-mono font-medium text-zinc-700 whitespace-nowrap transition-all duration-300 ease-in-out pr-1 shrink-0">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================================
            GITHUB CONTRIBUTION HEATMAP & 3D SKYLINE SECTION (Hover for 3D)
           ========================================================================= */}
        <section id="contributions" className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            GitHub Contributions
          </h2>
          <div
            onMouseEnter={() => setSkylineView('3d')}
            onMouseLeave={() => setSkylineView('2d')}
            className="w-full transition-all duration-300"
          >
            <ContributionSkyline
              data={MANISH_GITHUB_CONTRIBUTIONS}
              view={skylineView}
              onViewChange={(v) => setSkylineView(v)}
            />
          </div>
        </section>

        {/* =========================================================================
            3. WORK EXPERIENCE SECTION (Exact Screenshot Design)
           ========================================================================= */}
        <section id="work" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Work Experience
          </h2>

          <div className="space-y-3">
            {WORK_EXPERIENCE.map((company, idx) => {
              const isExpanded = expandedWorkIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedWorkIdx(isExpanded ? null : idx)}
                  className="group flex flex-col p-2.5 sm:p-3 -mx-2 sm:-mx-3 rounded-2xl hover:bg-zinc-100/70 transition-all duration-200 cursor-pointer space-y-2 select-none"
                >
                  {/* Main Row: Circle Logo on Left, Company & Role + Chevron in Middle, Date on Far Right */}
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Circle Logo Badge (bg-zinc-950 so white transparent logo pops with high contrast) */}
                      <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center p-1.5 shrink-0 shadow-2xs group-hover:border-zinc-700 transition-colors overflow-hidden">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="font-bold text-xs font-mono text-zinc-100">{company.initials}</span>
                        )}
                      </div>

                      {/* Company Name with Chevron & Role */}
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight font-model-plastic leading-snug">
                            {company.name}
                          </h3>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-all duration-200 ${isExpanded
                                ? '-rotate-90 text-zinc-800 opacity-100'
                                : 'rotate-0 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                              }`}
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-500 font-normal leading-tight">
                          {company.role}
                        </p>
                      </div>
                    </div>

                    {/* Far Right Date Period */}
                    <span className="text-xs sm:text-sm text-zinc-400 font-normal shrink-0 ml-4 tabular-nums">
                      {company.period}
                    </span>
                  </div>

                  {/* Revealed Description & Tech Stack Badges when Expanded */}
                  {isExpanded && (
                    <div className="pl-[61px] space-y-2.5 pt-1 transition-all duration-200">
                      <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                        {company.description}
                      </p>
                      {company.technologies && company.technologies.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {company.technologies.map((tech, techIdx) => {
                            const iconUrl = TECH_ICONS[tech];
                            return (
                              <div
                                key={techIdx}
                                className="group/tech inline-flex items-center h-7 w-7 hover:w-auto px-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/90 hover:bg-white hover:border-zinc-300 shadow-2xs transition-all duration-300 ease-in-out overflow-hidden cursor-pointer select-none shrink-0"
                              >
                                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                  {iconUrl ? (
                                    <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain shrink-0" />
                                  ) : (
                                    <span className="text-[9px] font-bold text-zinc-700 shrink-0">{tech.slice(0, 2)}</span>
                                  )}
                                </div>
                                <span className="max-w-0 opacity-0 group-hover/tech:max-w-[140px] group-hover/tech:opacity-100 group-hover/tech:ml-1.5 text-[11px] font-mono font-medium text-zinc-700 whitespace-nowrap transition-all duration-300 ease-in-out pr-1 shrink-0">
                                  {tech}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            4. EDUCATION SECTION
           ========================================================================= */}
        <section id="education" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Education
          </h2>

          <div className="space-y-2">
            {EDUCATION_ITEMS.map((edu, idx) => (
              <a
                key={idx}
                href={edu.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3.5 p-3.5 sm:p-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-zinc-100/70 transition-all duration-200 border border-transparent hover:border-zinc-200/60 cursor-pointer select-none"
              >
                <div className="w-12 h-12 rounded-full border border-zinc-200/90 bg-white flex items-center justify-center p-1.5 shrink-0 shadow-2xs group-hover:border-zinc-300 transition-colors mt-0.5 overflow-hidden">
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={edu.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="font-bold text-xs font-mono text-zinc-800">{edu.initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight font-model-plastic">
                        {edu.name}
                      </h3>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 tabular-nums shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-medium text-zinc-600 mt-0.5">
                    {edu.degree}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. SKILLS SECTION (Matching Reference Screenshot Design)
           ========================================================================= */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-model-plastic">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
            {SKILLS.map((skill) => {
              const iconUrl = TECH_ICONS[skill];
              return (
                <div
                  key={skill}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white text-xs sm:text-sm font-bold text-zinc-900 border border-zinc-200/90 shadow-2xs flex items-center gap-1.5 sm:gap-2 hover:border-zinc-300 hover:shadow-xs transition-all duration-200 cursor-default select-none shrink-0"
                >
                  {iconUrl ? (
                    <img src={iconUrl} alt={skill} className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0" />
                  ) : null}
                  <span>{skill}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            7. CONTACT SECTION
           ========================================================================= */}
        <section id="contact" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
            Work with me
          </h2>

          <div className="space-y-3">
            <div className="p-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-zinc-100/70 border border-transparent hover:border-zinc-200/60 transition-colors">
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-zinc-700 hover:text-zinc-950 font-medium hover:underline block mt-1 font-mono"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-zinc-500 mt-1 font-normal">
                Available for full-stack engineering, system architecture, SaaS building, and high-impact contracts.
              </p>
            </div>
          </div>
        </section>



      </main>

      {/* Fixed Floating Bottom macOS-style Dock Navbar (Hides on Scroll Down, Reveals Instantly on Scroll Up / Pause) */}
      <aside
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] transition-all duration-200 ease-out ${isDockVisible
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-16 opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <Dock direction="middle" className="border border-zinc-200/90 bg-white/95 shadow-xl shadow-zinc-200/50 backdrop-blur-xl">
          <DockIcon label="Home" href="#hero" isActive={activeSection === 'hero'}>
            <Home className="size-5 text-current" />
          </DockIcon>
          <DockIcon label="Contact" href="#contact" isActive={activeSection === 'contact'}>
            <Mail className="size-5 text-current" />
          </DockIcon>

          {/* Separator Divider */}
          <div className="mx-0.5 sm:mx-1 h-6 w-px bg-zinc-200/90" />

          <DockIcon label="GitHub" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Icons.gitHub className="size-5 text-current" />
          </DockIcon>
          <DockIcon label="Gmail" href={`mailto:${CONTACT_EMAIL}`}>
            <Icons.gmail className="size-5" />
          </DockIcon>
          <DockIcon label="WhatsApp" href="https://wa.me/" target="_blank" rel="noreferrer">
            <Icons.whatsapp className="size-5 text-current" />
          </DockIcon>
        </Dock>
      </aside>
    </div>
  );
};
