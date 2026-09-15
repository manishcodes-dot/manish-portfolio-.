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
        
        {/* Subtle geometric dot grid background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Top-Left Corner Badge: Location / Year */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-400 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>PORTFOLIO // 2026</span>
        </div>

        {/* Top-Right Corner Badge: Live Availability Status */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex items-center gap-2 font-mono text-[11px] text-zinc-600 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Projects</span>
        </div>

        {/* Bottom-Left Corner: Quick Links */}
        <div className="absolute bottom-8 left-6 sm:left-10 hidden md:flex items-center gap-4 font-mono text-xs text-zinc-500">
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

        {/* Bottom-Right Corner: Social Shortcuts */}
        <div className="absolute bottom-8 right-6 sm:right-10 hidden md:flex items-center gap-3 font-mono text-xs text-zinc-500">
          {PERSONAL_INFO.github && (
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">
              GH
            </a>
          )}
          {PERSONAL_INFO.linkedin && (
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">
              LI
            </a>
          )}
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-zinc-950 transition-colors">
            EM
          </a>
        </div>

        {/* Center Hero: Preserved Exactly as made */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
          
          {/* Exact Manish Wordmark with 'hello, I am' over 'M' and red 'i' dot */}
          <div className="relative inline-flex items-center justify-center select-none">
            {/* Small 'hello, I am' positioned at the top-left over the 'M' in matching monospace font */}
            <span
              className="absolute font-mono text-zinc-500 tracking-tight select-text"
              style={{
                top: '-0.5em',
                left: '0.05em',
                fontSize: 'clamp(11px, 1.8vw, 15px)',
              }}
            >
              hello, I am
            </span>

            <h1
              className="font-script text-[#000000] tracking-normal leading-none inline-block select-text"
              style={{
                fontSize: 'clamp(72px, 15vw, 140px)',
                lineHeight: 1,
              }}
            >
              Man<span className="inline-block relative">
                <span className="text-[#000000]">ı</span>
                <span
                  className="absolute left-1/2 -translate-x-1/2 w-[0.145em] h-[0.145em] rounded-full bg-[#b91c1c] pointer-events-none"
                  style={{
                    top: '0.12em',
                  }}
                />
              </span>sh
            </h1>
          </div>

          {/* Subtitle with exact 14px gap as requested */}
          <p
            className="text-base sm:text-lg md:text-xl font-mono text-zinc-600 tracking-tight"
            style={{ marginTop: '14px' }}
          >
            Web Developer &amp; App Developer
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
          2. HOW CAN I HELP YOU / SERVICES (Grigoletti Interactive Scroll Architecture)
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
      <section id="contact" className="w-full py-28 border-t border-zinc-200/80 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              // 06. INITIATE CONTACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Let's Build Something Together
            </h2>
            <p className="text-zinc-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Available for full-stack web applications, mobile engineering, systems architecture, or open-source collaboration. Feel free to reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Left Contact Info (2 columns) */}
            <div className="md:col-span-2 space-y-6">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 font-mono text-xs">
                <span className="text-zinc-400 font-bold uppercase block tracking-wider">// DIRECT EMAIL</span>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="text-zinc-900 font-bold hover:underline block break-all text-sm"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs mt-2"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 font-mono text-xs text-zinc-600">
                <span className="text-zinc-400 font-bold uppercase block tracking-wider">// LOCATION &amp; STATUS</span>
                <div>{PERSONAL_INFO.location}</div>
                <div className="flex items-center gap-2 text-emerald-600 pt-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Q2/Q3 Projects</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {PERSONAL_INFO.github && (
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 font-mono text-xs shadow-2xs"
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
                    className="flex-1 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 font-mono text-xs shadow-2xs"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Contact Form (3 columns) */}
            <div className="md:col-span-3">
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-2xs space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-600 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-600 mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-600 mb-1">
                    Message / Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project scope, timeline, and goals..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"
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
      <footer className="w-full py-12 border-t border-zinc-200 bg-white text-zinc-500 font-mono text-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Manish. Web Developer &amp; App Developer.
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
