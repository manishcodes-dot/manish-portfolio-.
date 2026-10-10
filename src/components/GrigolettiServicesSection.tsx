import React from 'react';

interface ThingsIDoItem {
  title: string;
  description: string;
  link: string;
}

const THINGS_I_DO_ITEMS: ThingsIDoItem[] = [
  {
    title: 'Aceternity',
    description: 'Design + Dev studio for startups and enterprises.',
    link: 'https://aceternity.com',
  },
  {
    title: 'Aceternity UI',
    description: 'Component library for modern websites.',
    link: 'https://ui.aceternity.com',
  },
  {
    title: 'Acebuilder',
    description: 'AI landing page builder with exportable code.',
    link: 'https://ai.aceternity.com',
  },
  {
    title: 'Vibrant',
    description: 'Curated website, section and UI design inspiration.',
    link: 'https://vibrant.design',
  },
  {
    title: 'YouTube',
    description: 'I talk about design engineering and SaaS.',
    link: 'https://youtube.com/@manuarora',
  },
];

export const GrigolettiServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="w-full py-16 sm:py-20 bg-white select-none border-t border-zinc-200/80"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-sans mb-6">
          Things I do
        </h2>

        {/* List items (Exact layout & text from manuarora.in, without icons) */}
        <div className="space-y-4">
          {THINGS_I_DO_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3.5 sm:p-4 -mx-3 sm:-mx-4 rounded-xl hover:bg-zinc-100/80 transition-colors duration-200 cursor-pointer"
            >
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 group-hover:text-zinc-900 transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 font-normal leading-relaxed mt-0.5">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
