'use client';

import { useRef } from 'react';
import { Testimonial } from '@/lib/types';
import { ArrowLeft, ArrowRight, Star } from '@/components/icons';

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
    const testimonialRef = useRef<HTMLDivElement>(null);

    const scrollTestimonialLeft = () => testimonialRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
    const scrollTestimonialRight = () => testimonialRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

    return (
        <section className="w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase">
                    Client <span className="text-[#c084fc]">Stories</span>
                </h2>
            </div>
            <div
                ref={testimonialRef}
                className="flex gap-6 overflow-x-auto pb-4 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing max-w-7xl mx-auto"
            >
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[2rem] hover:border-[#c084fc] transition-colors group flex flex-col justify-between h-auto"
                    >
                        <div>
                            {renderStars(t.rating)}
                            <p className="text-zinc-300 font-medium mb-6 leading-relaxed">
                                &quot;{t.text}&quot;
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bef264] to-[#60a5fa] flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                                {t.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base">{t.name}</h4>
                                <p className="text-zinc-500 text-xs font-bold uppercase">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={scrollTestimonialLeft}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-[#c084fc] hover:text-black transition-colors active:scale-95"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={scrollTestimonialRight}
                    className="p-4 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-[#c084fc] hover:text-black transition-colors active:scale-95"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
}
