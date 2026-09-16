import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Globe, Smartphone, Cpu, Laptop } from 'lucide-react';

interface SubService {
  number: string;
  label: string;
}

interface ServiceItem {
  number: string;
  category: string;
  title: string;
  question: string;
  description: string;
  subservices: SubService[];
  tags: string[];
  icon: React.ElementType;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01.',
    category: 'Websites building',
    title: 'Web Development',
    question: 'Need an ultra-fast, accessible, and functionable web application?',
    description: 'Building responsive, lightning-fast web applications with React, TypeScript, Next.js, and modern CSS engines. Engineered with sub-second page loads, accessibility compliance, and interactive animations.',
    subservices: [
      { number: '01', label: 'Single Page to Multi-Page Websites' },
      { number: '02', label: 'Design Systems & functionanle components' },
      { number: '03', label: 'backend connection & api connection' }
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'javascript', 'REST API', 'Node.js', 'MongoDB/PostgreSQL'],
    icon: Laptop
  },
  {
    number: '02.',
    category: 'MOBILE & DISTRIBUTED SYSTEMS',
    title: 'App Development',
    description: 'Cross-platform mobile applications, microservices, and distributed backend pipelines. Implementing reliable state engines, local-first offline syncing, background workers, and real-time protocols.',
    question: 'Looking to build iOS & Android experiences app for your business ?',
    subservices: [
      { number: '01', label: 'Cross-Platform iOS & Android' },
      { number: '02', label: 'Offline-App to Local Sync' },
      { number: '03', label: 'Realtime-Notifications & Widgets of the apps ' }
    ],
    tags: ['Flutter', 'Node.js', 'MongoDB/PostgreSQL', 'Firebase', 'Redis'],
    icon: Smartphone
  },
  {
    number: '03.',
    category: 'INFRASTRUCTURE & SEO',
    title: 'SEO & Systems',
    question: 'Need to rank site or business at the top of the search result ?',
    description: 'Constructing robust backend services, microservice architectures, and search engine optimization. From WebSocket event relays to transactional database engines with strict ACID integrity and Core Web Vitals optimization.',
    subservices: [
      { number: '01', label: 'Keywords Research & analysis' },
      { number: '02', label: 'Technical SEO & Web Master' },
      { number: '03', label: 'Sites Optimization' }
    ],
    tags: ['Keywords Research', 'Google', 'Search Engine', 'SEO', 'Technical SEO','Web Master'],
    icon: Cpu
  }
];

export const GrigolettiServicesSection: React.FC = () => {
  // Accordion state: only one open at a time. Default state is closed (null)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <section
      id="services"
      className="w-full py-28 border-t border-zinc-200/80 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Header matching Jeff Milanes / CleanPortfolio format */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              // 02. SERVICES &amp; EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              What I Do
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-lg">
              Crafting robust digital solutions from architectural conceptualization to high-performance production releases.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Directory</span>
          </div>
        </div>

        {/* Accordion List Styled in Clean Portfolio Aesthetic */}
        <div className="divide-y divide-zinc-200/80 border-b border-zinc-200/80">
          {SERVICES_DATA.map((service, index) => {
            const isOpen = openIndex === index;
            const Icon = service.icon;

            return (
              <div
                key={service.number}
                className={`transition-colors duration-200 ${isOpen ? 'bg-zinc-50/50' : 'hover:bg-zinc-50/30'}`}
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  onClick={() => toggleDropdown(index)}
                  className="w-full text-left py-6 sm:py-8 px-2 sm:px-4 flex items-center justify-between group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    {/* Number: 01. / 02. / 03. in clean monospace/sans font matching website */}
                    <span className="font-mono text-lg sm:text-2xl font-bold text-zinc-400 group-hover:text-zinc-950 transition-colors shrink-0">
                      {service.number}
                    </span>

                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Icon container */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-colors ${isOpen
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-2xs'
                          : 'bg-white border-zinc-200 text-zinc-800 group-hover:border-zinc-300'
                        }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Main Title */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-zinc-800 transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block sm:hidden">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Edge: Category pill + Diagonal corner arrow */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {service.category}
                    </span>

                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${isOpen
                        ? 'bg-zinc-950 border-zinc-950 text-white'
                        : 'bg-white border-zinc-200 text-zinc-500 group-hover:border-zinc-300 group-hover:text-zinc-900'
                      }`}>
                      <ArrowDownRight
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-[-90deg]' : 'rotate-0'
                          }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Dropdown Content Drawer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-2 sm:px-4 ${isOpen ? 'max-h-[600px] opacity-100 pb-8 sm:pb-10' : 'max-h-0 opacity-0 pb-0'
                    }`}
                >
                  <div className="pt-2 pl-0 sm:pl-16 space-y-6">
                    {/* The Need / Prompt */}
                    <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        // THE NEED
                      </div>
                      <p className="text-sm font-semibold text-zinc-900">
                        "{service.question}"
                      </p>
                    </div>

                    {/* Detailed Paragraph */}
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl font-sans">
                      {service.description}
                    </p>

                    {/* Subservices Checklist with Clean Hairline Dividers */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        CORE DELIVERABLES &amp; EXECUTION
                      </div>
                      <div className="divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70">
                        {service.subservices.map((sub) => (
                          <div
                            key={sub.number}
                            className="py-3 flex items-center gap-4 text-xs font-mono text-zinc-800"
                          >
                            <span className="text-zinc-400 font-semibold shrink-0">
                              {sub.number}
                            </span>
                            <span className="text-sm font-sans font-medium text-zinc-800">
                              {sub.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Tags & Discuss Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-700 text-xs font-mono shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-950 hover:underline shrink-0"
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
