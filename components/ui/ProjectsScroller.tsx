'use client';

import { useRef } from 'react';
import { Project } from '@/lib/types';
import { ArrowLeft, ArrowRight, ExternalLink } from '@/components/icons';

interface ProjectsScrollerProps {
    projects: Project[];
}

export default function ProjectsScroller({ projects }: ProjectsScrollerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
    const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

    return (
        <section className="w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-widest">
                    Featured <span className="text-[#bef264]">Projects</span>
                </h2>
            </div>
            <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto pb-8 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`snap-center shrink-0 w-[85vw] md:w-[350px] h-[550px] md:h-[600px] ${project.color} rounded-[2.5rem] border-4 border-black p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_#fff] hover:-translate-y-2 active:scale-95 transition-all group relative overflow-hidden`}
                    >
                        <div className="relative z-10">
                            <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                LIVE
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-black leading-tight mb-2">
                                {project.name}
                            </h3>
                            <p className="text-black font-bold opacity-70 text-sm line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                        <div className="w-full h-64 mt-4 relative rounded-3xl overflow-hidden group-hover:scale-105 transition-transform border-4 border-black/10 shadow-inner">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95 transition-transform mt-4 border-2 border-transparent hover:border-white"
                        >
                            Visit Site <ExternalLink size={18} />
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={scrollLeft}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-[#bef264] hover:text-black transition-colors active:scale-95"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={scrollRight}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-[#bef264] hover:text-black transition-colors active:scale-95"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
}
