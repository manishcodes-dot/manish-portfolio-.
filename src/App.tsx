import React, { useState } from 'react';
import { CleanPortfolio } from './components/CleanPortfolio';
import { ProjectModal } from './components/ProjectModal';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Project } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900 flex flex-col items-center selection:bg-zinc-900 selection:text-white">
      {/* Initial Page Loading Overlay */}
      {isLoading && (
        <LoadingOverlay onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Portfolio Container (Pre-rendered underneath loading overlay) */}
      <main id="main-content" className="relative z-10 w-full">
        <CleanPortfolio onSelectProject={setSelectedProject} />
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
