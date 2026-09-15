import React, { useState, useEffect, useRef } from 'react';
import { Search, FolderGit2, Terminal, ArrowRight, Sun, Moon, Copy, Check, ExternalLink, Briefcase } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project, ThemeMode } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSelectProject: (project: Project) => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onSelectProject,
  onOpenTerminal
}) => {
  const [query, setQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1500);
  };

  const navActions = [
    { label: 'View Featured Projects', href: '#projects', icon: FolderGit2, section: 'Navigation' },
    { label: 'Inspect Technical Matrix', href: '#stack', icon: Briefcase, section: 'Navigation' },
    { label: 'Launch Interactive CLI Terminal', action: () => { onClose(); onOpenTerminal(); }, icon: Terminal, section: 'Actions' },
    { label: 'View Career Experience', href: '#experience', icon: Briefcase, section: 'Navigation' },
    { label: 'Initiate Contact & Transmission', href: '#contact', icon: ExternalLink, section: 'Navigation' },
    { label: `Toggle Theme (${theme === 'light' ? 'Dark Mode' : 'Light Mode'})`, action: onToggleTheme, icon: theme === 'dark' ? Sun : Moon, section: 'Actions' },
    { label: `Copy Direct Email (${PERSONAL_INFO.email})`, action: handleCopyEmail, icon: copiedEmail ? Check : Copy, section: 'Actions' },
  ];

  const filteredNav = navActions.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECTS.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tagline.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-100">
      <div className="w-full max-w-xl bg-white dark:bg-[#0e1117] border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-zinc-800 dark:text-zinc-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project name, or technology..."
            className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none text-xs"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">ESC</kbd>
        </div>

        {/* Action List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {/* Nav / Quick actions */}
          <div>
            <div className="px-2.5 py-1 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              Quick Actions & Navigation
            </div>
            <div className="space-y-0.5 mt-1">
              {filteredNav.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else if (item.href) {
                        onClose();
                        window.location.href = item.href;
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                Projects ({filteredProjects.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(proj);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group text-left"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{proj.title}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-md">{proj.tagline}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {proj.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
          <span>Navigate with ⌘K / Esc</span>
          <span>manish.io</span>
        </div>
      </div>
    </div>
  );
};
