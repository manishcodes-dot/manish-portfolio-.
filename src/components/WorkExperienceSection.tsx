import React from 'react';
import {
  OptimusIcon,
  PaydestalIcon,
  EducativeIcon,
  FreeCodeCampIcon,
  WinRealtyIcon,
  AgproIcon,
} from './CompanyLogos';

interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
  icon: React.ElementType;
  tileBg: string;
  technologies?: string[];
}

const WORK_EXPERIENCES: WorkExperienceItem[] = [
  {
    id: 'optimus-ai',
    company: 'Optimus AI Lab',
    role: 'Mid-level Frontend Engineer',
    startDate: 'NOV 25, 2024',
    endDate: 'JAN 8, 2025',
    description: 'At Optimus, my work involves developing and maintaining dynamic user-centric applications and interfaces for top organizations and government agencies.',
    icon: OptimusIcon,
    tileBg: 'bg-[#18181b] text-white shadow-sm shadow-black/15',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'paydestal',
    company: 'Paydestal',
    role: 'Frontend Developer',
    startDate: 'SEP 11, 2024',
    endDate: 'PRESENT',
    isCurrent: true,
    description: 'At Paydestal, my primary roles involve collaborating with a cross-functional team to develop new fintech products and interactive dashboards using React.js, integrating APIs to display business data and transactions analytics, as well as optimizing existing applications to improve user experience and ensure product compliance.',
    icon: PaydestalIcon,
    tileBg: 'bg-[#18181b] text-white shadow-sm shadow-black/15',
    technologies: ['React.js', 'Fintech APIs', 'Interactive Dashboards', 'TypeScript']
  },
  {
    id: 'educative',
    company: 'Educative',
    role: 'Project Author',
    startDate: 'DEC 5, 2023',
    endDate: 'SEP 16, 2024',
    description: 'Technical content author tasked with creating interactive real-world tutorials, focused on topics like Next.js, TypeScript, React.',
    icon: EducativeIcon,
    tileBg: 'bg-[#4338CA] text-white shadow-sm shadow-indigo-600/20',
    technologies: ['Next.js', 'TypeScript', 'React', 'Curriculum Design']
  },
  {
    id: 'freecodecamp',
    company: 'Freecodecamp',
    role: 'Technical Writer',
    startDate: 'AUG 25, 2022',
    endDate: 'DEC 6, 2023',
    description: 'Volunteer writer for freeCodeCamp, producing technical articles around topics like nextjs, react, and JavaScript.',
    icon: FreeCodeCampIcon,
    tileBg: 'bg-[#0a0a23] text-white shadow-sm shadow-black/20',
    technologies: ['Technical Writing', 'JavaScript', 'React', 'Open Source']
  },
  {
    id: 'winrealty',
    company: 'Winrealty',
    role: 'Frontend Developer',
    startDate: 'AUG 16, 2022',
    endDate: 'JUL 28, 2023',
    description: 'At Winrealty, I was tasked to manage and develop a responsive and performant frontend application that reshapes the way countless users purchase property in Nigeria.',
    icon: WinRealtyIcon,
    tileBg: 'bg-[#EA580C] text-white shadow-sm shadow-orange-600/20',
    technologies: ['React', 'Responsive UI', 'Property Engine', 'Performance']
  },
  {
    id: 'agpro',
    company: 'Agpro Inc',
    role: 'Frontend Developer (Contract)',
    startDate: 'OCT 11, 2022',
    endDate: 'JAN 16, 2023',
    description: "At Agpro Inc, I worked closely with a team to rebrand and build the frontend infrastructure of Agpro's Angular-based service web app that allows thousands of clients across the USA monitor their barn activity.",
    icon: AgproIcon,
    tileBg: 'bg-[#0284C7] text-white shadow-sm shadow-sky-600/20',
    technologies: ['Angular', 'TypeScript', 'IoT Dashboards', 'WebSockets']
  },
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              Work Experience
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-lg">
              Engineering track record spanning production frontend architecture, fintech systems, and interactive technical authoring.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>6 Track Records</span>
          </div>
        </div>

        {/* 2-Column Grid of Experience Cards without card borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
          {WORK_EXPERIENCES.map((exp) => {
            const Icon = exp.icon;
            return (
              <div 
                key={exp.id} 
                className="flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Row: Icon + Company & Role */}
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Rounded App Icon Tile */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 ${exp.tileBg} transition-transform duration-200 group-hover:scale-105`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight truncate">
                          {exp.company}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-600 shrink-0">
                            PRESENT
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-zinc-700">
                        {exp.role}
                      </div>

                      {/* Dates */}
                      <div className="font-mono text-[11px] text-zinc-400 tracking-wider flex items-center gap-1.5 pt-0.5">
                        <span>{exp.startDate}</span>
                        <span>-</span>
                        {exp.isCurrent ? (
                          <span className="text-emerald-600 font-semibold">PRESENT</span>
                        ) : (
                          <span>{exp.endDate}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description paragraph */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans pt-1">
                    {exp.description}
                  </p>
                </div>

                {/* Technologies Pills */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-zinc-500 bg-zinc-100/80 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
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
