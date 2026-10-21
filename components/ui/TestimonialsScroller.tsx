'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Star } from '@/components/icons';

interface TestimonialsScrollerProps {
    testimonials: Testimonial[];
}

function renderStars(rating: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <Star key={i} size={16} fill="currentColor" className="text-[#bef264]" />
            );
        } else if (i - 0.5 === rating) {
            stars.push(
                <div key={i} className="relative">
                    <Star size={16} className="text-zinc-700" />
                    <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
                        <Star size={16} fill="currentColor" className="text-[#bef264]" />
                    </div>
                </div>
            );
        } else {
            stars.push(<Star key={i} size={16} className="text-zinc-700" />);
        }
    }
    return <div className="flex gap-1 mb-4">{stars}</div>;
}

export default function TestimonialsScroller({ testimonials }: TestimonialsScrollerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const animRef = useRef<number | null>(null);

    // Quadruple the array for completely seamless infinite scrolling loop
    const displayTestimonials = [
        ...testimonials,
        ...testimonials,
        ...testimonials,
        ...testimonials
    ];

    // High-performance 60FPS continuous auto-scroll engine
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let lastTimestamp: number | null = null;
        // Speed in pixels per second (gentle and smooth)
        const SPEED = 45; 

        const step = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = (timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            if (!isHovered && container) {
                container.scrollLeft += SPEED * delta;

                // When we have scrolled half the content, seamlessly wrap back
                const halfWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                }
            }

            animRef.current = requestAnimationFrame(step);
        };

        animRef.current = requestAnimationFrame(step);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [isHovered, testimonials]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="w-full overflow-hidden relative pt-2 pb-0">
            <div className="max-w-7xl mx-auto px-4 text-center mb-8 md:mb-12">
                <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase mb-2">
                    TESTIMONIALS
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                    CLIENT <span className="text-[#c084fc]">STORIES</span>
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                    Hear directly from the founders and partners who trusted us to build their vision.
                </p>
            </div>

            {/* Auto Carousel Container */}
            <div 
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                {/* Left & Right ambient fade gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

                {/* 1 Single Horizontal Continuous Scrolling Row */}
                <div
                    ref={scrollContainerRef}
                    className="flex flex-row flex-nowrap gap-5 overflow-x-hidden no-scrollbar py-4 px-4 w-full select-none cursor-grab active:cursor-grabbing"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {displayTestimonials.map((t, idx) => (
                        <div
                            key={`${t.id}-${idx}`}
                            className="shrink-0 w-[310px] sm:w-[360px] md:w-[410px] bg-zinc-950/95 border border-zinc-800/90 hover:border-[#c084fc] p-6 sm:p-8 rounded-[2rem] transition-all duration-300 group flex flex-col justify-between h-auto shadow-2xl hover:-translate-y-1.5"
                        >
                            <div>
                                {renderStars(t.rating)}
                                <p className="text-zinc-300 font-medium text-xs sm:text-sm mb-6 leading-relaxed">
                                    &quot;{t.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-zinc-900/90">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#bef264] to-[#60a5fa] flex items-center justify-center font-black text-black text-base border border-white/20 shadow-md shrink-0">
                                    {t.name.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-black text-sm sm:text-base group-hover:text-[#c084fc] transition-colors truncate">
                                        {t.name}
                                    </h4>
                                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider truncate mt-0.5">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
