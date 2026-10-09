'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import ScrollReveal from './ScrollReveal';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0
        }
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none'
          },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax relative w-full overflow-hidden bg-zinc-950" ref={parallaxRef}>
      <section className="parallax__header relative w-full h-[85vh] sm:h-screen overflow-hidden flex items-center justify-center">
        <div className="parallax__visuals relative w-full h-full">
          <div className="parallax__black-line-overflow absolute inset-0 pointer-events-none z-0" />
          <div data-parallax-layers className="parallax__layers relative w-full h-full flex items-center justify-center">
            <img
              src="https://cdn.21st.dev/assets/mirror/a4/a43f4eae3459c461345ee676f12d6e1ddca65e8a5279a5af00d475b17ff83aea.webp"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt="Background Layer"
              className="parallax__layer-img absolute top-0 left-1/2 -translate-x-1/2 h-full w-full object-cover max-w-none pointer-events-none select-none z-[1]"
            />
            <img
              src="https://cdn.21st.dev/assets/mirror/50/50ca6a0d36d2780bfcb469d6db7eaec0be7e0d2961ba69a63d2a1473b040338d.webp"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt="Middle Layer"
              className="parallax__layer-img absolute top-0 left-1/2 -translate-x-1/2 h-full w-full object-cover max-w-none pointer-events-none select-none z-[2]"
            />
            <div data-parallax-layer="3" className="parallax__layer-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] text-center w-full px-4 select-none">
              <h2 className="parallax__title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase drop-shadow-2xl font-sans">
                Parallax
              </h2>
            </div>
            <img
              src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Foreground Layer"
              className="parallax__layer-img absolute top-0 left-1/2 -translate-x-1/2 h-full w-full object-cover max-w-none pointer-events-none select-none z-[4]"
            />
          </div>
          <div className="parallax__fade absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-[5]" />
        </div>
      </section>

      <section className="parallax__content relative min-h-[60vh] py-20 px-6 sm:px-12 flex flex-col justify-center items-center bg-zinc-950 text-white z-10 border-t border-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
            containerClassName="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white"
          >
            Crafting high-performance digital experiences with precision engineering and thoughtful design.
          </ScrollReveal>

          <div className="mt-12 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" className="osmo-icon-svg w-12 h-12 text-zinc-400 opacity-60">
              <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
