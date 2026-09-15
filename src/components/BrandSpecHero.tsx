import React from 'react';

export const BrandSpecHero: React.FC = () => {
  return (
    <section id="hero-spec" className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        
        {/* Wordmark with the actual 'i' dot in dark red */}
        <div className="relative inline-flex items-center justify-center select-none">
          {/* Small 'hello, I am' positioned at the top-left over the 'M' in matching monospace font */}
          <span
            className="absolute font-mono text-zinc-500 tracking-tight select-text"
            style={{
              top: '-0.5em',
              left: '0.05em',
              fontSize: 'clamp(11px, 1.8vw, 15px)',
            }}
          >
            hello, I am
          </span>

          <h1
            className="font-script text-[#000000] tracking-normal leading-none inline-block select-text"
            style={{
              fontSize: 'clamp(72px, 14vw, 130px)',
              lineHeight: 1,
            }}
          >
            Man<span className="inline-block relative">
              <span className="text-[#000000]">ı</span>
              <span
                className="absolute left-1/2 -translate-x-1/2 w-[0.145em] h-[0.145em] rounded-full bg-[#b91c1c] pointer-events-none"
                style={{
                  top: '0.12em',
                }}
              />
            </span>sh
          </h1>
        </div>

        {/* Showcase text below the logo with exact 14px gap */}
        <p
          className="text-base sm:text-lg md:text-xl font-mono text-zinc-600 tracking-tight"
          style={{ marginTop: '14px' }}
        >
          Web Developer &amp; App Developer
        </p>

      </div>
    </section>
  );
};
