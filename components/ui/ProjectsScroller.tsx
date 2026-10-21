'use client';

import { useRef } from 'react';
import { Project } from '@/lib/types';
import { ArrowLeft, ArrowRight, ExternalLink } from '@/components/icons';
import Link from 'next/link';

interface ProjectsScrollerProps {
  projects: Project[];
}

const DISTINCT_PALETTE = [
  '#60a5fa', // Blue (Addy Meals)
  '#fb923c', // Warm Orange (Dee Pets)
  '#f472b6', // Pastel Pink (Beluga Global Exports)
  '#c084fc', // Purple (Viberoot Essentials)
  '#4ade80', // Mint Green (Sikhaid NGO)
  '#facc15', // Golden Yellow (Badsha magic)
  '#a3e635', // Lime (Roxford Health)
  '#38bdf8', // Cyan
  '#e879f9', // Fuchsia
  '#2dd4bf', // Teal
  '#818cf8', // Indigo
  '#fb7185', // Rose
];

export default function ProjectsScroller({ projects }: ProjectsScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 z-10 relative">
      {/* Center-Aligned Header with Navigation Controls */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
          SELECTED WORK
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
          BUILT FOR <span className="text-[#bef264]">THE REAL WORLD.</span>
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
          A selection of products, platforms and digital experiences we&apos;ve helped bring to life.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous project"
              className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-black hover:bg-[#bef264] hover:border-[#bef264] flex items-center justify-center transition-all active:scale-90"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next project"
              className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-black hover:bg-[#bef264] hover:border-[#bef264] flex items-center justify-center transition-all active:scale-90"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <Link
            href="/services"
            className="px-5 py-2.5 bg-zinc-950 border border-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#bef264] hover:text-black hover:border-[#bef264] transition-all flex items-center gap-1.5 shadow-md"
          >
            VIEW ALL <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Horizontal Slidable Row with Distinct Colored Website Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-8 pt-2 px-1 no-scrollbar snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {projects.map((proj, idx) => {
          const cardBgColor = DISTINCT_PALETTE[idx % DISTINCT_PALETTE.length];

          return (
            <a
              key={proj.id}
              href={proj.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-[220px] sm:w-[240px] md:w-[260px] snap-start rounded-[2rem] border-[3.5px] border-black p-4 sm:p-5 shadow-[7px_7px_0px_0px_#ffffff] hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none"
              style={{ backgroundColor: cardBgColor }}
            >
              {/* Top Header: LIVE Badge + Title + Subtitle */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-black text-white font-mono text-[9px] font-black tracking-wider rounded-full uppercase inline-block shadow-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bef264] animate-pulse" />
                    LIVE
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-black tracking-tight mt-2 leading-tight">
                  {proj.name}
                </h3>

                <p className="text-black/80 font-bold text-[11px] sm:text-xs mt-1 leading-snug line-clamp-2 min-h-[2.1rem]">
                  {proj.description}
                </p>
              </div>

              {/* Middle: Rounded Square Image Preview */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden my-3.5 bg-black/10 flex items-center justify-center relative shadow-inner">
                {proj.image && proj.image.trim() !== '' ? (
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-black/95 rounded-2xl flex flex-col items-center justify-center p-3 text-center border border-zinc-800">
                    <span className="text-[#bef264] font-mono text-[11px] font-black tracking-widest uppercase mb-1">
                      {proj.name}
                    </span>
                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                      LIVE PLATFORM
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom: Full-Width Black Action Button */}
              <div className="w-full py-2.5 sm:py-3 bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 group-hover:bg-black/90 group-hover:scale-[1.02] active:scale-95 transition-all shadow-sm">
                <span>Visit Site</span>
                <ExternalLink size={13} />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
