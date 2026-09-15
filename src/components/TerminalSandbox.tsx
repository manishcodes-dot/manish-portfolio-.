import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, Copy, Check, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILLS } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
}

export const TerminalSandbox: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: `manish.io v2.4.0 (x86_64-web-node) - Linux 6.6.21-edge
Type 'help' to view available commands, or click the quick pills below.`
    }
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to command history
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const inputLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      content: trimmed
    };

    const cmd = trimmed.toLowerCase();
    let responseLine: TerminalLine;

    if (cmd === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 font-mono text-xs">
            <div className="text-zinc-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-zinc-300">
              <div><span className="text-emerald-400 font-bold">projects</span> - List engineered software projects</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Inspect technical matrix & proficiencies</div>
              <div><span className="text-emerald-400 font-bold">bio</span> - Read developer background & philosophy</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Display email, location & channels</div>
              <div><span className="text-emerald-400 font-bold">cat resume</span> - Print plain-text CV summary</div>
              <div><span className="text-emerald-400 font-bold">uptime</span> - Check system uptime & node status</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> - Direct contract & hiring pipeline</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal session output</div>
            </div>
          </div>
        )
      };
    } else if (cmd === 'projects') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-zinc-400 font-semibold">PRODUCTION PROJECTS [{PROJECTS.length}]:</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 rounded bg-zinc-950/70 border border-zinc-800/80">
                <div className="flex items-center justify-between text-zinc-200">
                  <span className="font-bold text-emerald-300">{p.title}</span>
                  <span className="text-zinc-500">[{p.category}]</span>
                </div>
                <div className="text-zinc-400 text-[11px] mt-0.5">{p.tagline}</div>
                <div className="text-zinc-500 text-[10px] mt-1">Stack: {p.technologies.slice(0, 4).join(', ')}</div>
              </div>
            ))}
          </div>
        )
      };
    } else if (cmd === 'skills' || cmd === 'stack') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-zinc-400 font-semibold">CORE TECHNICAL PROFICIENCIES:</div>
            <div className="text-zinc-300 space-y-1">
              <div><span className="text-emerald-400">Languages:</span> TypeScript (6y), JavaScript (6y), Node.js (6y), SQL (5y), Go (3y)</div>
              <div><span className="text-emerald-400">Frontend:</span> React 19, Next.js, Tailwind v4, State Architecture, Canvas 2D, WebSockets</div>
              <div><span className="text-emerald-400">Backend:</span> Express, Microservices, Redis, Event-driven Queues, REST & GraphQL</div>
              <div><span className="text-emerald-400">Databases:</span> PostgreSQL, Redis (Pub/Sub & Locks), Prisma, Drizzle, MongoDB</div>
              <div><span className="text-emerald-400">DevOps:</span> Docker, CI/CD Actions, Linux, Vite/esbuild, Edge Workers</div>
            </div>
          </div>
        )
      };
    } else if (cmd === 'bio' || cmd === 'about' || cmd === 'whoami') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 font-mono text-xs text-zinc-300 leading-relaxed">
            <div className="text-emerald-400 font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.role}</div>
            <p className="text-zinc-400">{PERSONAL_INFO.bio}</p>
            <div className="text-zinc-500 text-[11px]">Location: {PERSONAL_INFO.location} | Status: {PERSONAL_INFO.availability}</div>
          </div>
        )
      };
    } else if (cmd === 'contact') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 font-mono text-xs text-zinc-300">
            <div className="text-zinc-400 font-semibold">TRANSMISSION CHANNELS:</div>
            <div>Direct Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline">{PERSONAL_INFO.linkedin}</a></div>
            <div>Location: {PERSONAL_INFO.location}</div>
          </div>
        )
      };
    } else if (cmd.includes('cat resume') || cmd === 'resume') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-2 whitespace-pre-wrap">
{`============================================================
MANISH RANA — Senior Web & Full-Stack Engineer
Email: ${PERSONAL_INFO.email} | Portfolio: https://manish.io
============================================================
SUMMARY:
6+ years engineering reliable web systems, reactive frontend 
dashboards, and high-throughput microservices in TypeScript.

EXPERIENCE:
• Senior Full-Stack Engineer @ Veloce Systems (2023 - Present)
  - React 19 migration, 48% load speed improvement, 99/100 CWV
  - Real-time WebSocket state sync for 120k peak clients
• Lead Frontend Developer @ Aether Cloud (2021 - 2023)
  - Zero-dependency design system; Canvas topology engine (20k nodes)
• Web Developer & Systems Engineer @ QuantMatrix (2019 - 2021)
  - Idempotent Stripe billing pipeline; Redis caching layers
============================================================`}
          </div>
        )
      };
    } else if (cmd === 'sudo hire' || cmd === 'hire') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'success',
        content: (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 font-mono text-xs text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>ACCESS GRANTED: INITIALIZING PRIORITY CHANNEL</span>
            </div>
            <p className="text-emerald-400/90 text-xs">
              Thank you for considering collaboration! Let's build something exceptional. You can reach out directly via email at <span className="text-white font-bold">{PERSONAL_INFO.email}</span> or submit the contact form below.
            </p>
            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded text-[11px] font-medium"
              >
                <span>Jump to Contact Form</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )
      };
    } else if (cmd === 'uptime') {
      responseLine = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="font-mono text-xs text-zinc-300">
            <div>14:28:10 up 142 days, 18:42, 1 user, load average: 0.08, 0.04, 0.01</div>
            <div className="text-zinc-500 mt-1">Runtime: Node.js v22.14.0 | Memory: 32MB / 512MB</div>
          </div>
        )
      };
    } else {
      responseLine = {
        id: `err-${Date.now()}`,
        type: 'error',
        content: (
          <div className="font-mono text-xs text-rose-400">
            zsh: command not found: {trimmed}. Type <span className="text-zinc-200 underline font-bold cursor-pointer" onClick={() => executeCommand('help')}>'help'</span> for list of commands.
          </div>
        )
      };
    }

    setLines(prev => [...prev, inputLine, responseLine]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    }
  };

  const quickPills = ['projects', 'skills', 'bio', 'cat resume', 'sudo hire', 'clear'];

  return (
    <section id="terminal" className="py-20 border-t border-zinc-200/80 dark:border-zinc-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
              <span>03 // INTERACTIVE ENVIRONMENT</span>
              <span className="w-12 h-px bg-emerald-500/30" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Interactive Web Developer CLI
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Explore projects, inspect technical competencies, or run simulated diagnostic commands directly in the browser.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {quickPills.map(pill => (
              <button
                key={pill}
                onClick={() => executeCommand(pill)}
                className="px-2.5 py-1 text-[11px] font-mono rounded bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors shadow-2xs"
              >
                ${' '}{pill}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-xl bg-[#090b0e] border border-zinc-800/90 shadow-2xl overflow-hidden font-mono text-xs cursor-text"
        >
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-zinc-400 text-xs">guest@manish.io: ~ (zsh)</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
              <span className="hidden sm:inline">UTF-8</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLines([]);
                }}
                className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                title="Clear console"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-5 max-h-[380px] min-h-[260px] overflow-y-auto space-y-3.5">
            {lines.map((line) => (
              <div key={line.id} className="space-y-1">
                {line.type === 'input' && (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <span>guest@manish.io:~$</span>
                    <span className="text-zinc-100">{line.content}</span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="pl-4 border-l border-zinc-800 text-zinc-300">
                    {line.content}
                  </div>
                )}
                {line.type === 'system' && (
                  <div className="text-zinc-500 italic">
                    {line.content}
                  </div>
                )}
                {line.type === 'error' && (
                  <div className="pl-4 border-l border-rose-900/60">
                    {line.content}
                  </div>
                )}
                {line.type === 'success' && (
                  <div className="pl-4 border-l border-emerald-600/60">
                    {line.content}
                  </div>
                )}
              </div>
            ))}

            {/* Current Active Input Prompt */}
            <div className="flex items-center gap-2 text-emerald-400 pt-1">
              <span className="select-none font-semibold">guest@manish.io:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none text-zinc-100 focus:outline-none font-mono text-xs"
                placeholder="type a command (e.g. 'help', 'projects', 'sudo hire')..."
                autoComplete="off"
                spellCheck={false}
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 select-none" />
            </div>

            <div ref={outputEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};
