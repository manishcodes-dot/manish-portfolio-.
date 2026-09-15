import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ShowcaseProject {
  id: string;
  year: string;
  categoryTag: string;
  title: string;
  description: string;
  previewImage: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  originalProject?: Project;
}

interface GrigolettiProjectsSectionProps {
  onSelectProject?: (project: Project) => void;
}

// Map the showcase projects to have the live website preview images from the Grigoletti portfolio
const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'kinesis-sync',
    year: '2026',
    categoryTag: 'FULL-STACK / CATALOG',
    title: 'German Museums Association',
    description: 'High-traffic digital directory and interactive cultural catalog with sub-second page loads, real-time filtering, and core web vitals optimization.',
    previewImage: 'https://framerusercontent.com/images/i76YDKRnBHSxSWhAYleZg4GK68.webp',
    liveUrl: 'https://einkaufsfuehrer-museen.de/',
    githubUrl: 'https://github.com/manishrana/kinesis-sync',
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    originalProject: PROJECTS.find(p => p.id === 'kinesis-sync')
  },
  {
    id: 'hyperscale-ui',
    year: '2026',
    categoryTag: 'WEB APP / EDITORIAL',
    title: 'Alice Toschi',
    description: 'Editorial multilingual website and booking portal designed for transcultural psychology practices in Switzerland with accessible interaction models.',
    previewImage: 'https://framerusercontent.com/images/Fu4G84uMVJIm4rUVCMbjQpBd7Y.png',
    liveUrl: 'https://alicetoschi.ch',
    githubUrl: 'https://github.com/manishrana/hyperscale-ui',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Accessible UI', 'Motion'],
    originalProject: PROJECTS.find(p => p.id === 'hyperscale-ui')
  },
  {
    id: 'tracelens-apm',
    year: '2026',
    categoryTag: 'LANDING / SHOWROOM',
    title: 'Thömus AG',
    description: 'High-performance interactive digital showroom and configurator for Swiss premium high-tech bicycles with 60fps canvas animations.',
    previewImage: 'https://framerusercontent.com/images/IcWdpX4RxRn4v21QMiB1LA1jZg.webp',
    liveUrl: 'https://thoemus.ch',
    githubUrl: 'https://github.com/manishrana/tracelens-apm',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Web Vitals', 'Tailwind CSS'],
    originalProject: PROJECTS.find(p => p.id === 'tracelens-apm')
  },
  {
    id: 'omnistore-commerce',
    year: '2026',
    categoryTag: 'ECOMMERCE / REAL-TIME',
    title: 'Anatolya Food Basel',
    description: 'Modern food ordering application with real-time checkout, automated delivery dispatch, and custom menu configuration.',
    previewImage: 'https://framerusercontent.com/images/yWuwWV4ObzEuXykOBJAtVxHgkY.webp',
    liveUrl: 'https://anatolyalieferservice.ch',
    githubUrl: 'https://github.com/manishrana/omnistore-platform',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    originalProject: PROJECTS.find(p => p.id === 'omnistore-commerce')
  },
  {
    id: 'bytegraph-ast',
    year: '2025',
    categoryTag: 'ENERGY / VISUALIZER',
    title: 'SB Solartech',
    description: 'Renewable energy quotation system, photovoltaic project visualizer, and corporate showcase with interactive estimation calculators.',
    previewImage: 'https://framerusercontent.com/images/4JdAemqW2BsKobZUlA4MofghxPQ.webp',
    liveUrl: 'https://sbsolartech.ch',
    githubUrl: 'https://github.com/manishrana/bytegraph-ast',
    technologies: ['TypeScript', 'WebGL / Canvas', 'Tailwind CSS', 'Vite'],
    originalProject: PROJECTS.find(p => p.id === 'bytegraph-ast')
  },
  {
    id: 'peter-beratungen',
    year: '2025',
    categoryTag: 'CORPORATE / CONSULTING',
    title: 'Peter Beratungen',
    description: 'Corporate advisory and tax consultancy web identity with interactive service calculators and client scheduling.',
    previewImage: 'https://framerusercontent.com/images/WJ0y6llOzxCVSvZswMazyiFDX4.webp',
    liveUrl: 'https://peterberatungen.ch',
    githubUrl: 'https://github.com/manishrana',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'SEO Engine']
  }
];

export const GrigolettiProjectsSection: React.FC<GrigolettiProjectsSectionProps> = ({ onSelectProject }) => {
  // Alice Toschi (index 1) default active or active on hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section 
      id="projects" 
      className="w-full py-28 border-t border-zinc-200/80 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching the website aesthetic */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              // 04. SELECTED WORKS &amp; CLIENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-lg">
              I’ve helped businesses and founders build high-converting web applications, digital showrooms, and reliable systems. Hover any project to preview.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Hover for Live Preview</span>
          </div>
        </div>

        {/* Interactive List with Preview on Hover */}
        <div className="divide-y divide-zinc-200/80 border-t border-b border-zinc-200/80">
          {SHOWCASE_PROJECTS.map((project, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`transition-all duration-300 relative ${
                  isHovered 
                    ? 'bg-zinc-950 text-white rounded-2xl my-3 shadow-xl p-5 sm:p-7' 
                    : 'py-5 sm:py-6 px-2 sm:px-3 hover:bg-zinc-50/60 cursor-pointer'
                }`}
              >
                {!isHovered ? (
                  /* Standard Row State (Clean, minimal, website aesthetic) */
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider shrink-0 w-32 sm:w-40">
                        {project.year}, &nbsp;{project.categoryTag.split('/')[0].trim()}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight hover:text-zinc-700 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto text-zinc-400 hover:text-zinc-950">
                      <span className="hidden md:inline-block font-mono text-[11px] text-zinc-400">
                        Preview
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-transform" />
                    </div>
                  </div>
                ) : (
                  /* Hovered State with Live Preview & Website Theme */
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Left Details: Category, Title, Description, Buttons */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-zinc-300 text-xs font-mono font-medium">
                          {project.year}
                        </span>
                        <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                          {project.categoryTag}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed font-sans">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Live Website Button */}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-100 font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Website</span>
                        </a>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white font-mono text-xs border border-zinc-700 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}

                        {onSelectProject && project.originalProject && (
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.originalProject!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Architecture</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Website Preview Mockup Card */}
                    <div className="w-full sm:w-72 md:w-80 shrink-0">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl group/preview relative aspect-[16/10]"
                      >
                        <img
                          src={project.previewImage}
                          alt={`Website Preview for ${project.title}`}
                          className="w-full h-full object-cover object-top group-hover/preview:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-xs font-mono text-white flex items-center gap-1.5 font-medium">
                            <span>Open {project.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
