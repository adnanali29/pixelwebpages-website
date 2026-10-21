export const dynamic = 'force-dynamic';

import { getProjects, getTestimonials } from '@/lib/actions';
import { Project, Testimonial } from '@/lib/types';
import {
  ArrowRight,
  Zap,
  MousePointer,
  Database,
  Search,
  FileText,
  PenTool,
  Code,
  Rocket,
  TrendingUp,
  Box,
  ShoppingCart,
  Sparkles,
  Headphones,
  SettingsIcon,
  Globe,
  ExternalLink,
  ChevronRight,
  Star
} from '@/components/icons';
import Link from 'next/link';
import InteractiveRobot from '@/components/ui/InteractiveRobot';
import TestimonialsScroller from '@/components/ui/TestimonialsScroller';
import ProjectsScroller from '@/components/ui/ProjectsScroller';
import AnimatedGrowthChart from '@/components/ui/AnimatedGrowthChart';
import TechHeroHeading from '@/components/ui/TechHeroHeading';

async function fetchHomeProjects(): Promise<Project[]> {
  try {
    const data = await getProjects();

    return [...data].sort((a, b) => {
      const getPriority = (name: string) => {
        const n = name.toLowerCase().trim();
        if (n.includes('addy meals')) return 1;
        if (n.includes('dee pets')) return 2;
        if (n.includes('beluga') || n.includes('leuga')) return 3;
        if (n.includes('viberoot') || n.includes('vibe root')) return 4;
        if (n.includes('addy fitness')) return 5;
        if (n.includes('sikhaid')) return 6;
        if (n.includes('badsha')) return 7;
        if (n.includes('roxford')) return 8;
        if (n.includes('querent')) return 9;
        return 999;
      };

      const pA = getPriority(a.name);
      const pB = getPriority(b.name);

      if (pA !== pB) return pA - pB;
      return 0;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function fetchHomeTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await getTestimonials();
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export default async function HomePage() {
  const projects = await fetchHomeProjects();
  const testimonials = await fetchHomeTestimonials();

  return (
    <div className="bg-black text-white space-y-16 md:space-y-24 pb-4 overflow-x-hidden relative font-sans">
      {/* Dynamic Ambient Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,_rgba(190,242,100,0.06),transparent_65%)]" />
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-purple-900/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-[#bef264]/5 rounded-full blur-[160px] animate-pulse delay-1000" />
      </div>

      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center px-4 max-w-7xl mx-auto pt-24 md:pt-28 pb-4 z-10">
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-14">
          {/* Left Text Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Tag Badge */}
            <div className="inline-block mb-5 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-950/80 text-[#bef264] font-mono text-xs uppercase tracking-widest cursor-default shadow-sm">
              PIXEL WEBPAGES • EST 2025
            </div>

            <div className="mb-6">
              <TechHeroHeading
                className="text-5xl sm:text-6xl md:text-[5.5rem]"
                lines={[
                  [{ text: 'BUILDING' }],
                  [{ text: 'THE FUTURE', highlight: true }],
                  [{ text: 'FOR YOU.' }]
                ]}
              />
            </div>

            <p className="text-zinc-400 text-base md:text-xl max-w-xl mb-8 font-medium leading-relaxed">
              We design, develop and launch digital products that turn ideas into experiences people actually use.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-wider rounded-xl shadow-[5px_5px_0px_0px_#bef264] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                START PROJECT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 bg-black text-white border border-zinc-800 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-900 hover:border-zinc-700 active:scale-95 transition-all text-center"
              >
                EXPLORE OUR WORK
              </Link>
            </div>
          </div>

          {/* Right Robot Character */}
          <div className="flex-1 w-full max-w-lg flex items-center justify-center">
            <InteractiveRobot />
          </div>
        </div>
      </section>

      {/* METRICS BANNER CARD - HIGHLY ATTRACTIVE & RESPONSIVE */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="p-4 sm:p-5 md:py-3.5 md:px-6 rounded-2xl sm:rounded-3xl bg-zinc-950/90 border border-zinc-800/90 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/3 w-64 h-32 bg-[#bef264]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Capability Pill Chips - STRICTLY SINGLE LINE */}
          <div className="flex flex-nowrap items-center justify-start gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-wider overflow-x-auto max-w-full scrollbar-none py-1 shrink-0">
            {['WEB', 'PRODUCTS', 'SOFTWARE', 'AI', 'AUTOMATION', 'GROWTH'].map((tag, i) => (
              <span
                key={tag}
                className="px-2 sm:px-2.5 md:px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-zinc-300 font-semibold flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? 'bg-[#bef264]' : i === 3 ? 'bg-[#c084fc]' : 'bg-zinc-500'}`} />
                {tag}
              </span>
            ))}
          </div>

          {/* Right: 4 Stat Glass Cards on Mobile & Clean Strip on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-0 w-full lg:w-auto text-center sm:divide-x sm:divide-zinc-800/80">
            <div className="p-3 sm:px-4 md:px-5 sm:py-1 rounded-xl sm:rounded-none bg-zinc-900/40 sm:bg-transparent border border-zinc-800/60 sm:border-0 flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-[#bef264] font-mono tracking-tight leading-none">19+</div>
              <div className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 sm:mt-1 whitespace-nowrap">Digital Projects</div>
            </div>
            <div className="p-3 sm:px-4 md:px-5 sm:py-1 rounded-xl sm:rounded-none bg-zinc-900/40 sm:bg-transparent border border-zinc-800/60 sm:border-0 flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-[#bef264] font-mono tracking-tight leading-none">7+</div>
              <div className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 sm:mt-1 whitespace-nowrap">Brands Built</div>
            </div>
            <div className="p-3 sm:px-4 md:px-5 sm:py-1 rounded-xl sm:rounded-none bg-zinc-900/40 sm:bg-transparent border border-zinc-800/60 sm:border-0 flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-[#bef264] font-mono tracking-tight leading-none">10+</div>
              <div className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 sm:mt-1 whitespace-nowrap">Products Launched</div>
            </div>
            <div className="p-3 sm:px-4 md:px-5 sm:py-1 rounded-xl sm:rounded-none bg-zinc-900/40 sm:bg-transparent border border-zinc-800/60 sm:border-0 flex flex-col items-center justify-center">
              <div className="text-xl sm:text-2xl font-black text-[#bef264] font-mono tracking-tight leading-none">∞</div>
              <div className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1.5 sm:mt-1 whitespace-nowrap">Ideas to Build</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
              WHAT WE DO
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-[0.95]">
              WE TURN <br />
              <span className="text-[#bef264]">IDEAS INTO</span> <br />
              DIGITAL REALITY.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              From the first sketch to the final deployment, Pixel WebPages brings strategy, design, technology and growth under one roof. We work with founders, businesses and organizations to build digital experiences that aren&apos;t just visually impressive — they&apos;re built to perform.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#bef264] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all group"
              >
                MORE ABOUT PIXEL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[2rem] bg-zinc-950 border border-zinc-800/80 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden">
                <img
                  src="/images/what-we-do-hud.jpg"
                  alt="Robot with Glass HUD Process Screen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ONE TEAM. EVERY DIGITAL LAYER. (CENTER-ALIGNED) */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
            OUR CAPABILITIES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95]">
            ONE TEAM. <br />
            <span className="text-[#bef264]">EVERY DIGITAL LAYER.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Strategy, design, development and growth — all under one roof.
          </p>
          <div className="pt-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 border border-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#bef264] hover:text-black hover:border-[#bef264] transition-all shadow-md group"
            >
              ALL SERVICES <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 6 Layer Cards (2 cards per row on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {[
            {
              title: 'Strategy',
              items: ['Digital strategy', 'Product strategy', 'Technology consulting'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              )
            },
            {
              title: 'Design',
              items: ['UI/UX design', 'Brand systems', 'Motion & interaction'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              )
            },
            {
              title: 'Development',
              items: ['Web development', 'Web applications', 'Custom software'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              )
            },
            {
              title: 'Technology',
              items: ['AI & automation', 'APIs & integrations', 'Cloud infrastructure'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              )
            },
            {
              title: 'Growth',
              items: ['SEO', 'Performance marketing', 'Analytics & CRO'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
              )
            },
            {
              title: 'Support',
              items: ['Maintenance', 'Optimization', 'Continuous dev'],
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 text-[#bef264]">
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                </svg>
              )
            }
          ].map((card) => (
            <div
              key={card.title}
              className="p-3.5 sm:p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 group hover:-translate-y-0.5 shadow-lg"
            >
              {/* Left Icon Square */}
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-[#bef264]/40 transition-colors">
                {card.icon}
              </div>

              {/* Right Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 tracking-tight group-hover:text-[#bef264] transition-colors truncate sm:whitespace-normal">
                  {card.title}
                </h3>
                <ul className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-zinc-400 font-normal">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="leading-snug truncate sm:whitespace-normal">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: HOW WE WORK (CENTER-ALIGNED) */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
            HOW WE WORK
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
            FROM <span className="text-[#bef264]">IDEA ➔ IMPACT</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-medium">
            A clear, proven process to turn your vision into reality.
          </p>
        </div>

        {/* 6 Connected Steps (2 cards per row on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
          {[
            {
              step: '01',
              title: 'DISCOVER',
              highlight: 'Understand the problem.',
              desc: 'We understand your business, users, goals and opportunities.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
              )
            },
            {
              step: '02',
              title: 'DEFINE',
              highlight: 'Turn ideas into systems.',
              desc: 'We define the product architecture, features and technology stack.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                </svg>
              )
            },
            {
              step: '03',
              title: 'DESIGN',
              highlight: 'Make it feel right.',
              desc: 'Interface, interaction and visual identity come together.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                </svg>
              )
            },
            {
              step: '04',
              title: 'DEVELOP',
              highlight: 'Build the engine.',
              desc: 'Clean, scalable and production-ready technology.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              )
            },
            {
              step: '05',
              title: 'LAUNCH',
              highlight: 'Put it into the world.',
              desc: 'Deployment, testing and optimization for real users.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                </svg>
              )
            },
            {
              step: '06',
              title: 'GROW',
              highlight: 'Keep improving.',
              desc: 'We use data and feedback to continuously improve what we built.',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-8 sm:h-8 text-[#bef264]">
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-6" />
                </svg>
              )
            }
          ].map((item) => (
            <div key={item.step} className="relative flex flex-col">
              <div className="p-3.5 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-[#bef264]/80 flex flex-col justify-between h-full transition-all group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[11px] sm:text-xs font-mono text-[#bef264] font-black">{item.step}</span>
                  </div>
                  <div className="mb-2 sm:mb-3">{item.icon}</div>
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight mb-1">{item.title}</h3>
                  <div className="text-[11px] sm:text-xs text-zinc-300 font-semibold mb-1 sm:mb-2 leading-snug">{item.highlight}</div>
                  <p className="text-[10px] sm:text-xs text-zinc-500 font-normal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: SELECTED WORK (SLIDABLE CAROUSEL) */}
      <ProjectsScroller projects={projects} />

      {/* SECTION: RESULTS & IMPACT (CENTER-ALIGNED HEADER) */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Center-Aligned Results Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
              RESULTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[0.95]">
              WE DON&apos;T JUST BUILD. <br />
              <span className="text-[#bef264]">WE MOVE NUMBERS.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
              Good design gets attention. Good technology creates outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* 4 Outcome Metric Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-2xl sm:text-4xl font-black text-[#bef264] font-mono">200K+</div>
                <div className="text-zinc-400 text-[11px] sm:text-xs font-bold uppercase mt-1">Users Reached</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-2xl sm:text-4xl font-black text-white font-mono">3.5×</div>
                <div className="text-zinc-400 text-[11px] sm:text-xs font-bold uppercase mt-1">Avg. Growth</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-2xl sm:text-4xl font-black text-[#bef264] font-mono">₹91 Lakhs</div>
                <div className="text-zinc-400 text-[11px] sm:text-xs font-bold uppercase mt-1">Revenue Enabled</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-2xl sm:text-4xl font-black text-white font-mono">19+</div>
                <div className="text-zinc-400 text-[11px] sm:text-xs font-bold uppercase mt-1">Projects Delivered</div>
              </div>
            </div>

            {/* Right Visual Growth Chart Card */}
            <div className="lg:col-span-5 flex items-end justify-center w-full lg:self-end">
              <AnimatedGrowthChart />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TECHNOLOGY STACK (CENTER-ALIGNED) */}
      <section className="max-w-7xl mx-auto px-4 z-10 relative">
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl text-center">
          <div className="max-w-3xl mx-auto mb-8 space-y-3">
            <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase">
              TECHNOLOGY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
              BUILT WITH <span className="text-[#bef264]">THE RIGHT TOOLS.</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
              We choose technology based on the problem — not the trend.
            </p>
          </div>

          {/* Tech Badges List Centered */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
            {[
              'Next.js',
              'React',
              'Node.js',
              'TypeScript',
              'PostgreSQL',
              'AI',
              'APIs',
              'Cloud',
              'Automation'
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-black border border-zinc-800 text-zinc-300 font-mono text-xs md:text-sm font-bold hover:border-[#bef264] hover:text-[#bef264] transition-all cursor-default shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SCROLLER */}
      <section className="z-10 relative">
        <TestimonialsScroller testimonials={testimonials} />
      </section>
    </div>
  );
}
