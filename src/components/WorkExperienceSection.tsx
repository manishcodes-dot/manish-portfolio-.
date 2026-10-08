import React from 'react';

interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  statusBadge?: string;
  description: React.ReactNode;
  logoSrc: string;
  tileBg: string;
  technologies?: string[];
}

const WORK_EXPERIENCES: WorkExperienceItem[] = [
  {
    id: 'informatics-college',
    company: 'Informatics College',
    role: 'Graduate in Computer Science',
    startDate: 'NOV 2021',
    endDate: 'GRADUATED',
    statusBadge: 'GRADUATED',
    description: (
      <>
        At Informatics College, I graduated with a degree in{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Computer Science</span>{' '}
        &amp; Information Technology, focusing on{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Software Engineering</span>,{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Web Development</span>,{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Web Architecture</span>, and{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Database Systems</span>.
      </>
    ),
    logoSrc: '/assets/img/informaticse imgsvg.svg',
    tileBg: 'bg-white border border-zinc-200 text-zinc-950 shadow-sm'
  },
  {
    id: 'fishtail-infosolutions',
    company: 'Fishtail Infosolutions',
    role: 'SEO Analyst & Copywriter',
    startDate: 'MAR 2023',
    endDate: 'PRESENT',
    statusBadge: 'PRESENT',
    description: (
      <>
        At Fishtail Infosolutions, my role involves analyzing{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Search Engine Performance</span>, performing{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Technical SEO Audits</span>, conducting{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Keyword Research</span>, and crafting engaging{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Copywriting</span> &amp;{' '}
        <span className="underline decoration-zinc-400 underline-offset-4 text-zinc-900 font-medium">Content Strategy</span> to maximize organic search visibility and user conversion.
      </>
    ),
    logoSrc: '/assets/img/fishtail-logo.png',
    tileBg: 'bg-[#18181b] text-white shadow-sm shadow-black/15'
  }
];

export const WorkExperienceSection: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="w-full py-28 border-t border-zinc-200/80 bg-zinc-50/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header consistent with the website */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              // 05. CAREER &amp; IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl sm:text-4xl font-semibold tracking-wide text-zinc-950 mt-1 font-model-plastic">
              Work Experience
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-lg font-kyoto">
              Engineering track record, SEO analysis &amp; copywriting experience, and academic graduation background.
            </p>
          </div>
        </div>

        {/* Stacked Vertical Timeline Layout with Connector Line under logos */}
        <div className="relative max-w-3xl space-y-12">
          {WORK_EXPERIENCES.map((exp, index) => {
            const isLast = index === WORK_EXPERIENCES.length - 1;
            return (
              <div key={exp.id} className="relative flex gap-5 sm:gap-7 group">
                
                {/* Left Column: Logo Tile + Vertical Connector Line Below Logo */}
                <div className="flex flex-col items-center shrink-0">
                  {/* Rounded App Icon Tile */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 ${exp.tileBg} transition-transform duration-200 group-hover:scale-105 p-2.5 overflow-hidden shadow-sm relative z-10`}>
                    <img 
                      src={exp.logoSrc} 
                      alt={exp.company} 
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  {/* Vertical Timeline Line below logo tile */}
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-zinc-200/90 my-2 min-h-[4rem] rounded-full" />
                  )}
                </div>

                {/* Right Column: Experience & Academic Details */}
                <div className="flex-1 space-y-3 pt-0.5 pb-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-zinc-400 tracking-wider">
                          {exp.id === 'fishtail-infosolutions' ? 'MAR 2023 -' : exp.startDate}
                        </span>
                        {exp.statusBadge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-600">
                            {exp.statusBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-zinc-700">
                      {exp.role}
                    </div>
                  </div>

                  {/* Description paragraph */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-kyoto">
                    {exp.description}
                  </p>

                  {/* Technologies / Skills Pills */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-zinc-500 bg-zinc-100/80 border border-zinc-200/50 px-2.5 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};



