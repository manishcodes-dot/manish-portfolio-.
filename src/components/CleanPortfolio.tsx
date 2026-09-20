import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Smartphone,
  Globe,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Workflow,
  Compass,
  CheckCircle2,
  Send
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from '../data/portfolioData';
import { Project } from '../types';
import { GrigolettiServicesSection } from './GrigolettiServicesSection';
import { GrigolettiProjectsSection } from './GrigolettiProjectsSection';
import { TechStackShowcase } from './TechStackShowcase';
import { WorkExperienceSection } from './WorkExperienceSection';
import { VideoTextAnimation } from './VideoTextAnimation';
import InkReveal from '@/components/ui/ink-reveal';

// Helper Tooltip SVG Icons provided by user
const TooltipGithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#ffffff" />
  </svg>
);

const TooltipLinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" />
  </svg>
);

const TooltipGmailIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill="url(#tooltip-gmail-a)" d="M146 44h38v110c0 6.627-5.373 12-12 12h-20a6 6 0 0 1-6-6z" />
    <path fill="#fc413d" d="M46 44H8v110c0 6.627 5.373 12 12 12h20a6 6 0 0 0 6-6z" />
    <path fill="url(#tooltip-gmail-b)" d="M39.226 30.456c-8.033-6.752-20.018-5.714-26.77 2.319-6.752 8.032-5.714 20.017 2.319 26.77l76.078 63.949a8 8 0 0 0 10.295 0l76.078-63.95c8.032-6.752 9.07-18.737 2.318-26.77-6.752-8.032-18.737-9.07-26.769-2.318L96 78.18z" />
    <defs>
      <linearGradient id="tooltip-gmail-a" x1="165" x2="165" y1="44" y2="166" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60d673" />
        <stop offset=".17" stopColor="#42c868" />
        <stop offset=".39" stopColor="#0ebc5f" />
        <stop offset=".62" stopColor="#00a9bb" />
        <stop offset=".86" stopColor="#3c90ff" />
        <stop offset="1" stopColor="#3186ff" />
      </linearGradient>
      <linearGradient id="tooltip-gmail-b" x1="8" x2="184" y1="46.13" y2="46.13" gradientUnits="userSpaceOnUse">
        <stop offset=".08" stopColor="#ff63a0" />
        <stop offset=".3" stopColor="#fc413d" />
        <stop offset=".5" stopColor="#fc413d" />
        <stop offset=".65" stopColor="#fc413d" />
        <stop offset=".72" stopColor="#fc5c30" />
        <stop offset=".86" stopColor="#feb10c" />
        <stop offset=".91" stopColor="#fec700" />
        <stop offset=".96" stopColor="#ffdb0f" />
      </linearGradient>
    </defs>
  </svg>
);

interface CleanPortfolioProps {
  onSelectProject?: (project: Project) => void;
}

export const CleanPortfolio: React.FC<CleanPortfolioProps> = ({ onSelectProject }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'fullstack' | 'frontend' | 'devtools'>('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState<'all' | 'languages' | 'frontend' | 'backend' | 'database' | 'devops'>('all');

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
    if (activeProjectFilter === 'all') return true;
    return proj.category === activeProjectFilter;
  });

  const filteredSkills = SKILLS.filter((skill) => {
    if (activeSkillCategory === 'all') return true;
    return skill.category === activeSkillCategory;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* =========================================================================
          1. HERO SECTION (Untouched - EXACTLY preserved as created)
         ========================================================================= */}
      <section id="hero" className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">

        {/* Layer 0: Revealed Background Image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <img
            src="/assets/img/hero bg.png"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Layer 1: Interactive Ink Reveal Mask Canvas (Same as Contact Section) */}
        <InkReveal
          maskColor={[255, 255, 255]}
          brushSize={140}
          lifetime={900}
          className="z-10"
        />

        {/* Subtle geometric dot grid background overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-10"
          style={{
            backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Top-Left Corner Badge: Location / Year */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-500 select-none z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>PORTFOLIO // 2026</span>
        </div>

        {/* Top-Right Corner Badge: Live Availability Status */}
        <a
          href="#contact"
          className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2.5 font-mono text-[11px] text-zinc-700 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 hover:border-emerald-500/60 shadow-xs hover:shadow-emerald-500/15 transition-all duration-300 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-emerald-500/40 z-10"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="group-hover:text-emerald-950 transition-colors font-medium">Available for Projects</span>
        </a>

        {/* Bottom-Left Corner: Quick Links */}
        <div className="absolute bottom-8 left-6 sm:left-10 hidden md:flex items-center gap-4 font-mono text-xs text-zinc-500 z-10">
          <a href="#services" className="hover:text-zinc-950 transition-colors">
            Services
          </a>
          <span className="text-zinc-300">•</span>
          <a href="#skills" className="hover:text-zinc-950 transition-colors">
            Skills
          </a>
          <span className="text-zinc-300">•</span>
          <a href="#projects" className="hover:text-zinc-950 transition-colors">
            Works ↓
          </a>
          <span className="text-zinc-300">•</span>
          <a href="#contact" className="hover:text-zinc-950 transition-colors">
            Contact
          </a>
        </div>

        {/* Bottom-Right Corner: Social Shortcuts with Interactive Hover Tooltips */}
        <div className="absolute bottom-8 right-6 sm:right-10 hidden md:flex items-center gap-4 font-mono text-xs text-zinc-500 z-10">
          {PERSONAL_INFO.github && (
            <div className="relative group inline-flex items-center">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 transition-colors py-1 px-0.5"
              >
                GH
              </a>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 backdrop-blur-xs text-white shadow-lg border border-zinc-800/80 flex items-center gap-2 opacity-0 pointer-events-none scale-95 translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50 whitespace-nowrap">
                <TooltipGithubIcon className="w-4 h-4 shrink-0" />
                <span className="font-sans text-[11px] font-semibold text-zinc-100">GitHub</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-900/95" />
              </div>
            </div>
          )}
          {PERSONAL_INFO.linkedin && (
            <div className="relative group inline-flex items-center">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 transition-colors py-1 px-0.5"
              >
                LI
              </a>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 backdrop-blur-xs text-white shadow-lg border border-zinc-800/80 flex items-center gap-2 opacity-0 pointer-events-none scale-95 translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50 whitespace-nowrap">
                <TooltipLinkedinIcon className="w-4 h-4 shrink-0" />
                <span className="font-sans text-[11px] font-semibold text-zinc-100">LinkedIn</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-900/95" />
              </div>
            </div>
          )}
          <div className="relative group inline-flex items-center">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-zinc-950 transition-colors py-1 px-0.5"
            >
              EM
            </a>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/95 backdrop-blur-xs text-white shadow-lg border border-zinc-800/80 flex items-center gap-2 opacity-0 pointer-events-none scale-95 translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50 whitespace-nowrap">
              <TooltipGmailIcon className="w-4 h-4 shrink-0" />
              <span className="font-sans text-[11px] font-semibold text-zinc-100">Gmail</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-zinc-900/95" />
            </div>
          </div>
        </div>

        {/* Center Hero: Preserved Exactly as made */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">

          {/* Exact Manish Wordmark with 'Hello, I am' over 'M' and video text animation */}
          <div className="relative inline-flex items-center justify-center select-none">
            {/* Small 'Hello, I am' positioned 3px above M letter at 50px left */}
            <span
              className="absolute font-mono text-zinc-500 tracking-tight select-text z-10"
              style={{
                bottom: 'calc(100% + 3px)',
                left: '50px',
                fontSize: 'clamp(11px, 1.8vw, 15px)',
              }}
            >
              Hello, I am
            </span>

            <div className="relative flex items-center justify-center">
              <VideoTextAnimation className="h-[clamp(110px,21vw,210px)] w-auto object-contain max-w-full" />
              <h1 className="sr-only">Manish</h1>
            </div>
          </div>

          {/* Subtitle centered below logo with 5px gap */}
          <p
            className="text-base sm:text-lg md:text-xl font-mono text-zinc-600 tracking-tight text-center"
            style={{ marginTop: '5px' }}
          >
            Web &amp; App Developer
          </p>
        </div>

        {/* Subtle scroll down indicator */}
        <a
          href="#services"
          aria-label="Scroll to services"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-700 transition-colors flex flex-col items-center gap-1.5 opacity-70 z-10"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-px h-6 bg-zinc-300 animate-pulse" />
        </a>
      </section>

      {/* =========================================================================
          2. What can i do / SERVICES (Grigoletti Interactive Scroll Architecture)
         ========================================================================= */}
      <GrigolettiServicesSection />

      {/* =========================================================================
          4. SKILLS & TECH STACK (Exact 2-Column Brand Icon Showcase)
         ========================================================================= */}
      <TechStackShowcase />

      {/* =========================================================================
          5. FEATURED PROJECTS SHOWCASE (Grigoletti Hover Interactive Previews)
         ========================================================================= */}
      <GrigolettiProjectsSection onSelectProject={onSelectProject} />

      {/* =========================================================================
          6. EXPERIENCE & CAREER TIMELINE
         ========================================================================= */}
      <WorkExperienceSection />

      {/* =========================================================================
          7. CONTACT SECTION (Interactive Form + Direct Channels)
         ========================================================================= */}
      {/* =========================================================================
          7. CONTACT SECTION (Interactive Form + Direct Channels)
         ========================================================================= */}
      <section id="contact" className="w-full py-28 relative overflow-hidden bg-white select-none">
        {/* Layer 0: Revealed Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/assets/img/contant bg.png"
            alt="Revealed Contact Section Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Layer 1: Ink Reveal Canvas Overlay (Erases mask on hover/drag to reveal background image) */}
        <InkReveal
          maskColor={[255, 255, 255]}
          brushSize={140}
          lifetime={900}
          className="z-10"
        />

        {/* Layer 2: Contact Section Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center space-y-3 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 font-bold block mb-1">
                // 06. INITIATE CONTACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                Let's Build Something Together
              </h2>
            </div>
            <p className="text-zinc-800 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-200/80 shadow-2xs inline-block">
              Available for full-stack web applications, mobile engineering, systems architecture, or open-source collaboration. Feel free to reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Left Contact Info (2 columns) */}
            <div className="md:col-span-2 space-y-6">
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm space-y-3 font-mono text-xs">
                <span className="text-zinc-500 font-bold uppercase block tracking-wider">// DIRECT EMAIL</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-zinc-950 font-bold hover:underline block break-all text-sm"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 rounded-lg border border-zinc-200 bg-white/90 hover:bg-white text-zinc-800 font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs mt-2"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm space-y-2 font-mono text-xs text-zinc-700">
                <span className="text-zinc-500 font-bold uppercase block tracking-wider">// LOCATION &amp; STATUS</span>
                <div className="font-medium text-zinc-900">{PERSONAL_INFO.location}</div>
                <div className="flex items-center gap-2 text-emerald-700 pt-1 font-semibold">
                  <span className="relative flex h-2 w-2 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  </span>
                  <span>Available for Q2/Q3 Projects</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {PERSONAL_INFO.github && (
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl border border-zinc-200/90 bg-white/90 backdrop-blur-md hover:bg-white text-zinc-800 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 font-mono text-xs font-semibold shadow-2xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {PERSONAL_INFO.linkedin && (
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl border border-zinc-200/90 bg-white/90 backdrop-blur-md hover:bg-white text-zinc-800 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 font-mono text-xs font-semibold shadow-2xs"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Contact Form (3 columns) */}
            <div className="md:col-span-3">
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-700 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-700 font-semibold mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-700 font-semibold mb-1">
                    Message / Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project scope, timeline, and goals..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSending ? (
                    <span>Sending message...</span>
                  ) : sendSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Message Received! Will reply shortly.</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CLEAN MINIMAL FOOTER
         ========================================================================= */}
      <footer className="w-full py-12 bg-white text-zinc-500 font-mono text-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Manish. Web &amp; App Developer.
          </div>
          <div className="flex items-center gap-5">
            <a href="#hero" className="hover:text-zinc-900 transition-colors">
              Top ↑
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">
              GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-zinc-900 transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
