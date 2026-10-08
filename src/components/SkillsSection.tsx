import React, { useState, useMemo } from 'react';
import { Search, Code2, Terminal, Layout, Server, Database, Cloud, Sparkles } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = [
    { label: 'All Stack', value: 'all', icon: Code2 },
    { label: 'Languages', value: 'languages', icon: Terminal },
    { label: 'Frontend', value: 'frontend', icon: Layout },
    { label: 'Backend', value: 'backend', icon: Server },
    { label: 'Databases', value: 'database', icon: Database },
    { label: 'DevOps & Tooling', value: 'devops', icon: Cloud },
  ];

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="stack" className="py-20 border-t border-zinc-200/80 dark:border-zinc-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
              <span>02 // TECHNICAL MATRIX</span>
              <span className="w-12 h-px bg-emerald-500/30" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-zinc-950 dark:text-white font-model-plastic">
              Core Stack &amp; Engineering Proficiencies
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Pragmatic, battle-tested technologies applied across high-load micro-services, reactive frontend architectures, and CI/CD automation pipelines.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g. React, Redis)..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs font-mono mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = cat.value === 'all'
              ? SKILLS.length
              : SKILLS.filter(s => s.category === cat.value).length;

            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.value
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 font-medium shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">[{count}]</span>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Quick Inspector Banner */}
        {selectedSkill && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50/80 dark:bg-zinc-900/80 border border-emerald-200 dark:border-emerald-500/40 text-xs font-mono text-zinc-800 dark:text-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-950 dark:text-white text-sm">{selectedSkill.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] border border-zinc-200 dark:border-zinc-700 font-medium">
                    {selectedSkill.level} • {selectedSkill.years}y experience
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5 font-sans">
                  Production application: {selectedSkill.highlight}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-[11px] self-end sm:self-center"
            >
              [Dismiss Inspector]
            </button>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" id="skills-grid">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`group p-4 rounded-xl cursor-pointer transition-all duration-150 border ${
                  isSelected
                    ? 'bg-zinc-50 dark:bg-zinc-800/80 border-emerald-500/80 ring-1 ring-emerald-500/30'
                    : 'bg-white dark:bg-zinc-900/40 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/80 border-zinc-200/90 dark:border-zinc-800/80 hover:border-zinc-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span
                      className={`px-1.5 py-0.5 rounded font-medium ${
                        skill.level === 'Expert'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/40'
                          : skill.level === 'Advanced'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/40'
                          : 'bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {skill.level}
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-500">{skill.years}y</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {skill.highlight}
                </p>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 text-xs font-mono">
            No technologies found matching "{searchQuery}". Try searching for 'TypeScript', 'React', or 'Docker'.
          </div>
        )}
      </div>
    </section>
  );
};
