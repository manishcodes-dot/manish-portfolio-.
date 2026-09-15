import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-zinc-200/80 dark:border-zinc-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
            <span>04 // CAREER TRAJECTORY</span>
            <span className="w-12 h-px bg-emerald-500/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Engineering Experience & Impact
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            Track record of shipping mission-critical web applications, architecting design systems, and scaling distributed client-server systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800/80">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline marker node */}
              <div className="absolute left-1.5 sm:left-2.5 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-zinc-900 border-2 border-emerald-600 dark:border-emerald-500 group-hover:scale-125 transition-transform" />

              <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all shadow-xs hover:shadow-sm">
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold">
                      @{exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-[10px] font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Accomplishments */}
                <ul className="space-y-2 mb-5 text-xs text-zinc-700 dark:text-zinc-300">
                  {exp.accomplishments.map((item, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-bold">›</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-[11px] font-mono text-zinc-500 mr-2">Technologies:</span>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
