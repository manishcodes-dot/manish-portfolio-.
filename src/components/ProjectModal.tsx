import React, { useState } from 'react';
import { X, ExternalLink, Github, Copy, Check, Terminal, Cpu, Zap, Activity } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0d0f14] border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl text-zinc-800 dark:text-zinc-200"
        id="project-detail-modal"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0d0f14]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-medium">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              // {project.year} release
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-project-modal-btn"
            className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Links Strip */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Live Demonstration</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 dark:text-amber-400 mb-2 font-semibold">
                <span>[01] The Engineering Challenge</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-2 font-semibold">
                <span>[02] Engineered Architecture</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* ASCII System Flow */}
          {project.asciiFlow && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>System Topology & Data Pipeline</span>
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">ASCII ARCHITECTURE</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-snug">
                {project.asciiFlow}
              </div>
            </div>
          )}

          {/* Architecture Pillars */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Key Technical Highlights</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-bold">›</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benchmarks & Metrics */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-zinc-700 dark:text-zinc-400 font-medium">
              <span>Production Metrics & Verification</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed"
                >
                  <span className="text-emerald-600 dark:text-emerald-400 block mb-1 font-semibold">#{idx + 1}</span>
                  {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Code Inspection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                <span>Implementation Excerpt</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-200 overflow-x-auto leading-relaxed">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>

          {/* Tech stack badges */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-zinc-500 mr-2 font-medium">Stack:</span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
