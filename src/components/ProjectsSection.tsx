import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Code, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const categories: { label: string; value: ProjectCategory; count: number }[] = [
    { label: 'All Projects', value: 'all', count: PROJECTS.length },
    { label: 'Full-Stack', value: 'fullstack', count: PROJECTS.filter(p => p.category === 'fullstack').length },
    { label: 'Frontend & UI', value: 'frontend', count: PROJECTS.filter(p => p.category === 'frontend').length },
    { label: 'DevTools & Systems', value: 'devtools', count: PROJECTS.filter(p => p.category === 'devtools').length },
  ];

  return (
    <section id="projects" className="py-20 border-t border-zinc-200/80 dark:border-zinc-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
              <span>01 // SHOWCASE</span>
              <span className="w-12 h-px bg-emerald-500/30" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-zinc-950 dark:text-white font-model-plastic">
              Engineered Applications &amp; Open Source
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Production web applications, distributed edge systems, and developer tooling focused on speed, resilience, and clean abstractions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.value
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 font-medium shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">[{cat.count}]</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl bg-white dark:bg-zinc-900/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase tracking-wider font-medium">
                      {project.category}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">// {project.year}</span>
                  </div>

                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* Metric Strip */}
                <div className="mb-5 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">⚡</span>
                  <span className="leading-snug">{project.metrics[0]}</span>
                </div>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions Strip */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between gap-3 text-xs font-mono">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Inspect Architecture</span>
                  <span className="text-zinc-400 dark:text-zinc-500">→</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    title="Live Demo"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
