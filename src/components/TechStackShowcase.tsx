import React from 'react';
import {
  FlutterIcon,
  ReactIcon,
  JavaScriptIcon,
  NodeJsIcon,
  NextJsIcon,
  GitIcon,
  FigmaIcon,
  FirebaseIcon,
  MongoDbIcon,
  PostgresSqlIcon,
} from './TechLogoIcons';

interface TechItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  bgClass: string;
  shadowClass?: string;
  type?: string;
}

const FRONTEND_TECHS: TechItem[] = [
  {
    id: 'flutter',
    name: 'FLUTTER',
    category: 'Cross-Platform App UI',
    icon: FlutterIcon,
    bgClass: 'bg-[#02569B] text-white',
    shadowClass: 'shadow-sm shadow-[#02569B]/25',
    type: 'Framework'
  },
  {
    id: 'react',
    name: 'REACT',
    category: 'Component Architecture',
    icon: ReactIcon,
    bgClass: 'bg-[#20232A] text-[#61DAFB]',
    shadowClass: 'shadow-sm shadow-[#20232A]/25',
    type: 'Library'
  },
  {
    id: 'javascript',
    name: 'JAVASCRIPT',
    category: 'ESNext & Web APIs',
    icon: JavaScriptIcon,
    bgClass: 'bg-[#F7DF1E] text-black',
    shadowClass: 'shadow-sm shadow-[#F7DF1E]/25',
    type: 'Language'
  },
];

const BACKEND_TECHS: TechItem[] = [
  {
    id: 'nodejs',
    name: 'NODE.JS',
    category: 'Asynchronous Event Runtime',
    icon: NodeJsIcon,
    bgClass: 'bg-[#539E43] text-white',
    shadowClass: 'shadow-sm shadow-[#539E43]/25',
    type: 'Runtime'
  },
  {
    id: 'nextjs',
    name: 'NEXT.JS',
    category: 'Full-Stack & SSR Framework',
    icon: NextJsIcon,
    bgClass: 'bg-[#000000] text-white',
    shadowClass: 'shadow-sm shadow-black/25',
    type: 'Framework'
  },
];

const TOOLS_TECHS: TechItem[] = [
  {
    id: 'git',
    name: 'GIT',
    category: 'Version Control & Workflows',
    icon: GitIcon,
    bgClass: 'bg-[#F05032] text-white',
    shadowClass: 'shadow-sm shadow-[#F05032]/25',
    type: 'Version Control'
  },
  {
    id: 'figma',
    name: 'FIGMA',
    category: 'UI/UX Design Systems',
    icon: FigmaIcon,
    bgClass: 'bg-[#1E1E1E] text-white',
    shadowClass: 'shadow-sm shadow-[#1E1E1E]/25',
    type: 'Design Tool'
  },
  {
    id: 'firebase',
    name: 'FIREBASE',
    category: 'Auth, Firestore & Hosting',
    icon: FirebaseIcon,
    bgClass: 'bg-[#FFA000] text-white',
    shadowClass: 'shadow-sm shadow-[#FFA000]/25',
    type: 'Cloud Platform'
  },
];

const DATABASE_TECHS: TechItem[] = [
  {
    id: 'mongodb',
    name: 'MONGODB',
    category: 'Document Storage & Aggregation',
    icon: MongoDbIcon,
    bgClass: 'bg-[#13AA52] text-white',
    shadowClass: 'shadow-sm shadow-[#13AA52]/25',
    type: 'Database'
  },
  {
    id: 'postgresql',
    name: 'POSTGRESQL',
    category: 'Relational Database Engine',
    icon: PostgresSqlIcon,
    bgClass: 'bg-[#336791] text-white',
    shadowClass: 'shadow-sm shadow-[#336791]/25',
    type: 'Database'
  },
];

export const TechStackShowcase: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="w-full py-28 border-t border-zinc-200/80 bg-zinc-50/50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching the rest of the website */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              // 03. TOOLKIT &amp; PROFICIENCIES
            </span>
            <h2 className="text-2xl sm:text-3xl sm:text-4xl font-semibold tracking-wide text-zinc-950 mt-1 font-model-plastic">
              Technical Stack &amp; Skills
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-lg font-kyoto">
              Primary languages, frameworks, and developer tools used to build reliable web and mobile applications.
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Layout matching the exact structure from the reference image, dressed in the site's clean design system */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
          
          {/* ================= LEFT COLUMN: FRONTEND & DATABASE ================= */}
          <div className="space-y-12">
            
            {/* FRONTEND Section */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-6">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-950">
                  FRONTEND
                </h3>
              </div>

              <div className="space-y-4">
                {FRONTEND_TECHS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.id}
                      className="p-2 -mx-2 rounded-xl hover:bg-zinc-100/60 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Rounded App Icon Tile */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tech.bgClass} ${tech.shadowClass ?? 'shadow-2xs'} transition-transform duration-200 group-hover:scale-105`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Name & Subtitle */}
                        <div>
                          <div className="font-mono text-xs sm:text-sm font-bold text-zinc-950 tracking-wider group-hover:text-black uppercase">
                            {tech.name}
                          </div>
                          <div className="text-xs text-zinc-500 font-sans">
                            {tech.category}
                          </div>
                        </div>
                      </div>


                    </div>
                  );
                })}
              </div>
            </div>

            {/* DATABASE Section */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-6">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-950">
                  DATABASE
                </h3>
              </div>

              <div className="space-y-4">
                {DATABASE_TECHS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.id}
                      className="p-2 -mx-2 rounded-xl hover:bg-zinc-100/60 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tech.bgClass} ${tech.shadowClass ?? 'shadow-2xs'} transition-transform duration-200 group-hover:scale-105`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="font-mono text-xs sm:text-sm font-bold text-zinc-950 tracking-wider group-hover:text-black uppercase">
                            {tech.name}
                          </div>
                          <div className="text-xs text-zinc-500 font-sans">
                            {tech.category}
                          </div>
                        </div>
                      </div>


                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: BACKEND & TOOLS ================= */}
          <div className="space-y-12">
            
            {/* BACKEND Section */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-6">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-950">
                  BACKEND
                </h3>
              </div>

              <div className="space-y-4">
                {BACKEND_TECHS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.id}
                      className="p-2 -mx-2 rounded-xl hover:bg-zinc-100/60 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tech.bgClass} ${tech.shadowClass ?? 'shadow-2xs'} transition-transform duration-200 group-hover:scale-105`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="font-mono text-xs sm:text-sm font-bold text-zinc-950 tracking-wider group-hover:text-black uppercase">
                            {tech.name}
                          </div>
                          <div className="text-xs text-zinc-500 font-sans">
                            {tech.category}
                          </div>
                        </div>
                      </div>


                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOOLS Section */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-6">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-950">
                  TOOLS
                </h3>
              </div>

              <div className="space-y-4">
                {TOOLS_TECHS.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.id}
                      className="p-2 -mx-2 rounded-xl hover:bg-zinc-100/60 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tech.bgClass} ${tech.shadowClass ?? 'shadow-2xs'} transition-transform duration-200 group-hover:scale-105`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="font-mono text-xs sm:text-sm font-bold text-zinc-950 tracking-wider group-hover:text-black uppercase">
                            {tech.name}
                          </div>
                          <div className="text-xs text-zinc-500 font-sans">
                            {tech.category}
                          </div>
                        </div>
                      </div>


                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
