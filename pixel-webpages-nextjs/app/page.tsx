/* eslint-disable no-console */
import { createServerClient } from '@/lib/supabase/server';
import { Project, Testimonial } from '@/lib/types';
import { ArrowRight, Zap, MousePointer, Database } from '@/components/icons';
import Link from 'next/link';
import ProjectsScroller from '@/components/ui/ProjectsScroller';
import TestimonialsScroller from '@/components/ui/TestimonialsScroller';
import InteractiveRobot from '@/components/ui/InteractiveRobot';

async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  if (!data) return [];

  const priority = ['Addy Fitness', 'Sikhaid NGO'];

  return [...data].sort((a, b) => {
    const aIndex = priority.indexOf(a.name);
    const bIndex = priority.indexOf(b.name);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

    if (aIndex !== -1) return -1;

    if (bIndex !== -1) return 1;

    return 0;
  });
}




async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export default async function HomePage() {
  const projects = await getProjects();
  const testimonials = await getTestimonials();
  return (
    <div className="bg-black space-y-10 md:space-y-10 pb-12 overflow-x-hidden relative">
      {/* Dynamic Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(190,242,100,0.08),transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-[#bef264]/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 px-4 max-w-7xl mx-auto pt-24 md:pt-28 pb-10 md:pb-0 z-10">
        <div className="flex-1 text-center md:text-left">
          <div className="hidden md:inline-block mb-8 px-6 py-2 rounded-full border-2 border-black bg-[#bef264] text-black font-bold uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] transform hover:-translate-y-1 transition-transform cursor-default">
            Pixel WebPages • Est 2025
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bef264] to-[#a3e635]">
              THE FUTURE
            </span> <br />
            FOR YOu.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
            We don&apos;t just build websites. We craft digital experiences that pop, snap, and engage. Your brand, reinvented.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-black border-2 border-black font-black rounded-xl shadow-[6px_6px_0px_0px_#bef264] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              START PROJECT <ArrowRight size={26} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="px-10 py-5 bg-black text-white border-2 border-zinc-800 font-bold rounded-xl hover:bg-zinc-900 hover:border-zinc-700 active:scale-95 transition-all text-center"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg">
          <InteractiveRobot />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-8 rounded-[2rem] bg-[#c084fc] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 active:scale-95 transition-all cursor-default">
            <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
              <Zap size={32} />
            </div>
            <h3 className="text-3xl font-black text-black mb-2">Blazing Fast</h3>
            <p className="text-black font-bold opacity-80">Next.js powered sites that load before you can blink.</p>
          </div>
          <div className="group p-8 rounded-[2rem] bg-[#60a5fa] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 active:scale-95 transition-all cursor-default">
            <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
              <MousePointer size={32} />
            </div>
            <h3 className="text-3xl font-black text-black mb-2">Interactive</h3>
            <p className="text-black font-bold opacity-80">Animations that follow your every move and click.</p>
          </div>
          <div className="group p-8 rounded-[2rem] bg-[#fb923c] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 active:scale-95 transition-all cursor-default">
            <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
              <Database size={32} />
            </div>
            <h3 className="text-3xl font-black text-black mb-2">Scalable</h3>
            <p className="text-black font-bold opacity-80">Built to grow with your business from day one.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS SCROLLER */}
      <ProjectsScroller projects={projects} />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsScroller testimonials={testimonials} />
    </div>
  );
}
