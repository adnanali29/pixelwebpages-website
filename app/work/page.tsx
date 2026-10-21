'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    ExternalLink,
    Search,
    Sparkles,
    CheckCircle,
    Globe,
    Zap,
    Code,
    Smartphone,
    TrendingUp,
    Shield,
    X,
    Star,
    Box,
    Plus
} from '@/components/icons';
import { CASE_STUDIES, CaseStudy } from '@/lib/caseStudiesData';
import TestimonialsScroller from '@/components/ui/TestimonialsScroller';

const ALL_PROJECTS = [
    // ----------------------------------------------------
    // 1. WEBSITE & LANDING PAGE (Auto-Scrolling Small Cards)
    // ----------------------------------------------------
    {
        id: 'web-1',
        title: 'Addy Meals',
        subtitle: 'Fresh, Macro-Balanced Fit Food Platform',
        category: 'Website and Landing Page',
        color: '#60a5fa',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        url: 'https://www.addymeals.com/',
        image: 'https://i.ibb.co/cc1RgLLz/BEIGE-VERTICAL-LOGO-ALT.png',
        description: 'A fit food and meal prep platform delivering macro-balanced nutrition for fitness enthusiasts.',
        tags: ['Next.js 15', 'TailwindCSS', 'PostgreSQL', 'Stripe'],
        impact: '+220% Meal Subscriptions',
        featured: true
    },
    {
        id: 'web-2',
        title: 'Sikhaid NGO',
        subtitle: 'Global Humanitarian Impact Platform',
        category: 'Website and Landing Page',
        color: '#4ade80',
        badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
        url: 'https://sikhaid.ngo/',
        image: 'https://i.ibb.co/xqtNbtmF/4.png',
        description: 'Empowering charitable contributions with transparent donor tracking, emergency relief feeds, and tax receipting.',
        caseStudySlug: 'sikhaid-ngo',
        tags: ['Next.js', 'TypeScript', 'Stripe', 'Cloudflare'],
        impact: '+310% Online Donations',
        featured: true
    },
    {
        id: 'web-3',
        title: 'Badsha Magic World',
        subtitle: 'Theatrical Brand Experience & Booking Portal',
        category: 'Website and Landing Page',
        color: '#f472b6',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
        url: 'https://badasha-landing-page.vercel.app/',
        image: 'https://i.ibb.co/BKt0Wc74/1.png',
        description: 'An interactive portfolio featuring stage showreels, ambient soundscapes, and VIP tour reservation engine.',
        caseStudySlug: 'badsha-magic',
        tags: ['Next.js', 'Web Audio', 'TailwindCSS', 'Motion'],
        impact: '+400% Show Bookings',
        featured: true
    },
    {
        id: 'web-4',
        title: 'Querent Portal',
        subtitle: 'AI-Powered Astrology & Guidance Experience',
        category: 'Website and Landing Page',
        color: '#c084fc',
        badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        url: 'https://www.querent.xyz/',
        image: 'https://i.ibb.co/YTPj0HN5/3.png',
        description: 'Personalized astrological charting and real-time consultation booking engine with modern SVG visuals.',
        caseStudySlug: 'querent-platform',
        tags: ['Next.js', 'React 19', 'Neon DB', 'WebSockets'],
        impact: '50k+ Daily Consults',
        featured: true
    },
    {
        id: 'web-5',
        title: 'Roxford Health',
        subtitle: 'Medical Services & Telehealth Landing Experience',
        category: 'Website and Landing Page',
        color: '#a3e635',
        badgeColor: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
        url: 'https://master--roxfordhealthcaretest.netlify.app/',
        image: 'https://i.ibb.co/8gqbNzcb/2.png',
        description: 'Clean, accessible healthcare portal connecting patients with specialized clinicians and automated booking.',
        caseStudySlug: 'roxford-health',
        tags: ['Next.js', 'TailwindCSS', 'PostgreSQL', 'Twilio'],
        impact: '60% Faster Check-in',
        featured: true
    },
    {
        id: 'web-6',
        title: 'Dee Pets',
        subtitle: 'Pet Health Diagnostics & Blood Test Services',
        category: 'Website and Landing Page',
        color: '#fb923c',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        url: 'https://pethealth.deepetservices.com/',
        image: 'https://i.ibb.co/MDRZ7svJ/1.png',
        description: 'Complete veterinary diagnostics, in-home blood test booking, and preventive wellness platform for pets.',
        tags: ['Next.js', 'TailwindCSS', 'Healthcare', 'Booking'],
        impact: '+190% Test Bookings',
        featured: true
    },
    {
        id: 'web-7',
        title: 'Astrohealer4u',
        subtitle: 'Astrology & Healing Portal',
        category: 'Website and Landing Page',
        color: '#2dd4bf',
        badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
        url: 'https://www.astrohealer4u.in/',
        image: 'https://i.ibb.co/rRY6syv4/Insta-Posts.jpg',
        description: 'Spiritual healing, planetary analysis, and consultation booking platform.',
        tags: ['Next.js', 'TailwindCSS', 'Booking'],
        impact: '+220% Consultations',
        featured: false
    },
    {
        id: 'web-8',
        title: 'Beluga Global Exports',
        subtitle: 'Seafood Cold-Chain & Global Logistics',
        category: 'Website and Landing Page',
        color: '#facc15',
        badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        url: 'https://www.belugaglobalexports.com/',
        image: 'https://i.ibb.co/kgBj0d0Z/5.png',
        description: 'B2B international seafood and perishable exports order management with cold-chain tracking.',
        tags: ['Next.js', 'Logistics', 'REST API'],
        impact: '12+ Countries Exported',
        featured: true
    },
    {
        id: 'web-9',
        title: 'Viberoot Essentials',
        subtitle: 'Organic Beauty & Wellness Store',
        category: 'Website and Landing Page',
        color: '#c084fc',
        badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        url: 'https://www.viberootessentials.com/',
        image: 'https://i.ibb.co/YTPj0HN5/3.png',
        description: 'Direct-to-consumer organic wellness, essential oils, and botanical skincare e-commerce platform.',
        tags: ['Next.js', 'E-Commerce', 'TailwindCSS', 'Stripe'],
        impact: '+165% Sales Growth',
        featured: true
    },
    {
        id: 'web-10',
        title: 'Addy Fitness',
        subtitle: 'High-Performance Fitness & Training Hub',
        category: 'Website and Landing Page',
        color: '#60a5fa',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        url: 'https://addyfitness.com/',
        image: 'https://i.ibb.co/kgBj0d0Z/5.png',
        description: 'A lightning-fast, conversion-optimized web experience for modern fitness enthusiasts and athletes.',
        caseStudySlug: 'addy-fitness',
        tags: ['Next.js 15', 'TailwindCSS', 'PostgreSQL', 'Framer Motion'],
        impact: '+185% Online Sign-ups',
        featured: false
    }

    // ----------------------------------------------------
    // 2. PACKAGING & BRANDING (Add your items here - No CTA)
    // ----------------------------------------------------

    // ----------------------------------------------------
    // 3. LOGOS (Add your logo images here - No CTA)
    // ----------------------------------------------------

    // ----------------------------------------------------
    // 4. STRATEGIES (Add your strategy cards here - No CTA)
    // ----------------------------------------------------
];

const CATEGORIES = [
    'All',
    'Website and Landing Page',
    'Packaging and Branding',
    'Logos',
    'Strategies'
];

const SECTION_DESCRIPTIONS: Record<string, { title: string; subtitle: string; icon: string }> = {
    'Website and Landing Page': {
        title: 'Website & Landing Pages',
        subtitle: 'Conversion-optimized web experiences, live portals, and client web applications.',
        icon: '🌐'
    },
    'Packaging and Branding': {
        title: 'Packaging & Branding',
        subtitle: 'Tactile packaging suites, print production systems, and brand asset guidelines.',
        icon: '📦'
    },
    'Logos': {
        title: 'Logos',
        subtitle: 'Distinctive brand marks, monograms, vector identity lockups, and emblem systems.',
        icon: '✨'
    },
    'Strategies': {
        title: 'Strategies',
        subtitle: 'Data-driven go-to-market roadmaps, funnel architectures, and brand growth frameworks.',
        icon: '📈'
    }
};

// Auto-scrolling small cards for Website and Landing Page (Right to Left Continuous Movement)
function WebsiteCardsScroller({ projects }: { projects: typeof ALL_PROJECTS }) {
    // Duplicate projects array to create seamless infinite loop
    const displayProjects = [
        ...projects,
        ...projects,
        ...projects,
        ...projects
    ];

    return (
        <div className="relative overflow-hidden w-full py-2 group">
            {/* Ambient edge gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

            <div className="animate-marquee-rtl-slow flex gap-4 sm:gap-6 py-3 px-2">
                {displayProjects.map((project, idx) => (
                    <div
                        key={`${project.id}-${idx}`}
                        className="shrink-0 w-[220px] sm:w-[245px] md:w-[265px] bg-[#0c0d10] rounded-[2rem] border border-zinc-800/90 hover:border-zinc-700 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative overflow-hidden group/card"
                    >
                        <div>
                            {/* Logo / Image Frame */}
                            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-white/95 border border-zinc-800/80 mb-3 flex items-center justify-center p-2 group-hover/card:border-zinc-600 transition-colors shadow-inner">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Simple Name */}
                            <h3 className="text-base sm:text-lg font-black text-white group-hover/card:text-[#bef264] transition-colors tracking-tight truncate">
                                {project.title}
                            </h3>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-3 mt-3 border-t border-zinc-900/80">
                            <a
                                href={project.url}
                                target={project.url !== '#' ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-white text-black font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl hover:bg-[#bef264] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                            >
                                <span>LIVE PREVIEW</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Blank Placeholder Card (No CTA)
function BlankCard({ label, category, index }: { label: string; category: string; index: number }) {
    return (
        <div className="group relative bg-zinc-950/60 border-2 border-dashed border-zinc-800/90 hover:border-[#bef264]/50 rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[220px] transition-all duration-300 hover:bg-zinc-900/30">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-[#bef264] group-hover:border-[#bef264]/40 transition-colors mb-3">
                <Plus size={20} />
            </div>
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider text-center">
                {label} #{index}
            </span>
            <span className="text-[11px] text-zinc-600 mt-1">Ready to add card</span>
        </div>
    );
}

// No-CTA Project Card (Simple image + name)
function SimpleNoCtaCard({ project }: { project: typeof ALL_PROJECTS[0] }) {
    return (
        <div className="group bg-zinc-950 rounded-[2rem] border border-zinc-800/80 hover:border-[#bef264]/60 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div>
                <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 mb-3 group-hover:border-zinc-700 transition-colors">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#bef264] transition-colors tracking-tight">
                    {project.title}
                </h3>
            </div>
        </div>
    );
}

import WorkCraftHeading from '@/components/ui/WorkCraftHeading';

export default function WorkPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = useMemo(() => {
        return ALL_PROJECTS.filter((project) => {
            const matchesCategory =
                selectedCategory === 'All' || project.category === selectedCategory;
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const websiteProjects = useMemo(() => {
        return ALL_PROJECTS.filter(p => p.category === 'Website and Landing Page');
    }, []);

    const packagingProjects = useMemo(() => {
        return ALL_PROJECTS.filter(p => p.category === 'Packaging and Branding');
    }, []);

    const logoProjects = useMemo(() => {
        return ALL_PROJECTS.filter(p => p.category === 'Logos');
    }, []);

    const strategyProjects = useMemo(() => {
        return ALL_PROJECTS.filter(p => p.category === 'Strategies');
    }, []);

    return (
        <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-20 font-sans">
            {/* Ambient Lighting */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

            {/* HERO HEADER */}
            <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex">
                    <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                        PORTFOLIO & WORK
                    </span>
                </div>

                <WorkCraftHeading
                    className="text-4xl sm:text-6xl md:text-7xl"
                    lines={[
                        [{ text: 'CRAFTING DIGITAL' }],
                        [{ text: 'EXCELLENCE & IMPACT.', highlight: true }]
                    ]}
                />

                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Explore our curated portfolio of bespoke web applications, enterprise SaaS platforms, and high-converting digital experiences built for forward-thinking brands.
                </p>

                {/* STATS STRIP */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
                    {[
                        { label: 'Completed Projects', value: '19+' },
                        { label: 'Average ROI Boost', value: '3.4x' },
                        { label: 'Uptime & Reliability', value: '99.9%' },
                        { label: 'Client Satisfaction', value: '100%' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 text-center">
                            <div className="text-2xl sm:text-3xl font-black text-[#bef264] font-mono">{stat.value}</div>
                            <div className="text-[11px] sm:text-xs text-zinc-400 font-bold uppercase mt-1 tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FILTER & SEARCH BAR */}
            <section className="relative z-10 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/90 border border-zinc-800/90 p-3 sm:p-4 rounded-3xl shadow-xl">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${selectedCategory === cat
                                    ? 'bg-[#bef264] text-black shadow-[0_0_12px_rgba(190,242,100,0.4)]'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search by keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-2.5 pl-10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264] transition-colors"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Search size={16} />
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* 4 DISCIPLINE SECTIONS */}
            <section className="relative z-10 space-y-20">
                {/* 1. WEBSITE AND LANDING PAGE SECTION */}
                {(selectedCategory === 'All' || selectedCategory === 'Website and Landing Page') && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/80">
                            <div>
                                <div className="flex items-center gap-2 text-[#bef264] text-xs font-mono font-black uppercase tracking-wider mb-2">
                                    <span className="text-base">{SECTION_DESCRIPTIONS['Website and Landing Page'].icon}</span>
                                    <span>Website and Landing Page</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                    {SECTION_DESCRIPTIONS['Website and Landing Page'].title}
                                </h2>
                                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                                    {SECTION_DESCRIPTIONS['Website and Landing Page'].subtitle}
                                </p>
                            </div>
                            <div className="text-xs font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                {websiteProjects.length} Websites
                            </div>
                        </div>

                        {/* Scrolling Right-to-Left Small Cards */}
                        <WebsiteCardsScroller projects={websiteProjects} />
                    </div>
                )}

                {/* 2. PACKAGING AND BRANDING SECTION */}
                {(selectedCategory === 'All' || selectedCategory === 'Packaging and Branding') && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/80">
                            <div>
                                <div className="flex items-center gap-2 text-[#bef264] text-xs font-mono font-black uppercase tracking-wider mb-2">
                                    <span className="text-base">{SECTION_DESCRIPTIONS['Packaging and Branding'].icon}</span>
                                    <span>Packaging and Branding</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                    {SECTION_DESCRIPTIONS['Packaging and Branding'].title}
                                </h2>
                                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                                    {SECTION_DESCRIPTIONS['Packaging and Branding'].subtitle}
                                </p>
                            </div>
                            <div className="text-xs font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                Blank Cards (No CTA)
                            </div>
                        </div>

                        {/* Blank Cards Grid (No CTA) */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {packagingProjects.length > 0 ? (
                                packagingProjects.map((p) => (
                                    <SimpleNoCtaCard key={p.id} project={p} />
                                ))
                            ) : null}
                            {[1, 2, 3, 4].slice(0, Math.max(0, 4 - packagingProjects.length)).map((num) => (
                                <BlankCard key={num} label="Packaging & Brand" category="Packaging and Branding" index={num} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. LOGOS SECTION */}
                {(selectedCategory === 'All' || selectedCategory === 'Logos') && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/80">
                            <div>
                                <div className="flex items-center gap-2 text-[#bef264] text-xs font-mono font-black uppercase tracking-wider mb-2">
                                    <span className="text-base">{SECTION_DESCRIPTIONS['Logos'].icon}</span>
                                    <span>Logos</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                    {SECTION_DESCRIPTIONS['Logos'].title}
                                </h2>
                                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                                    {SECTION_DESCRIPTIONS['Logos'].subtitle}
                                </p>
                            </div>
                            <div className="text-xs font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                Blank Cards (No CTA)
                            </div>
                        </div>

                        {/* Blank Logo Cards Grid (No CTA) */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {logoProjects.length > 0 ? (
                                logoProjects.map((p) => (
                                    <SimpleNoCtaCard key={p.id} project={p} />
                                ))
                            ) : null}
                            {[1, 2, 3, 4].slice(0, Math.max(0, 4 - logoProjects.length)).map((num) => (
                                <BlankCard key={num} label="Logo Asset" category="Logos" index={num} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. STRATEGIES SECTION */}
                {(selectedCategory === 'All' || selectedCategory === 'Strategies') && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800/80">
                            <div>
                                <div className="flex items-center gap-2 text-[#bef264] text-xs font-mono font-black uppercase tracking-wider mb-2">
                                    <span className="text-base">{SECTION_DESCRIPTIONS['Strategies'].icon}</span>
                                    <span>Strategies</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                                    {SECTION_DESCRIPTIONS['Strategies'].title}
                                </h2>
                                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                                    {SECTION_DESCRIPTIONS['Strategies'].subtitle}
                                </p>
                            </div>
                            <div className="text-xs font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                Blank Cards (No CTA)
                            </div>
                        </div>

                        {/* Blank Strategy Cards Grid (No CTA) */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {strategyProjects.length > 0 ? (
                                strategyProjects.map((p) => (
                                    <SimpleNoCtaCard key={p.id} project={p} />
                                ))
                            ) : null}
                            {[1, 2, 3, 4].slice(0, Math.max(0, 4 - strategyProjects.length)).map((num) => (
                                <BlankCard key={num} label="Strategy Card" category="Strategies" index={num} />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* EMPTY STATE IF NO FILTER MATCH */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 bg-zinc-950 rounded-3xl border border-zinc-900 space-y-4">
                    <p className="text-zinc-400 text-base font-bold">No projects matched your filter criteria.</p>
                    <button
                        onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                        className="px-6 py-2.5 bg-[#bef264] text-black font-bold text-xs rounded-xl"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

            {/* HOW WE DELIVER VALUE - 3 PILLARS */}
            <section className="relative z-10 bg-zinc-950/80 border border-zinc-900 rounded-[3rem] p-8 md:p-14 space-y-10">
                <div className="max-w-2xl">
                    <span className="text-[#bef264] font-mono text-xs font-black tracking-widest uppercase">
                        ENGINEERING PRINCIPLES
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
                        WHY CLIENTS CHOOSE <span className="text-[#bef264]">PIXEL WEBPAGES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Zap size={24} className="text-[#bef264]" />,
                            title: 'Sub-Second Performance',
                            desc: 'Every millisecond counts. We optimize Core Web Vitals, server-side caching, and lightweight assets for maximum speed.'
                        },
                        {
                            icon: <TrendingUp size={24} className="text-[#bef264]" />,
                            title: 'Conversion-Focused UX',
                            desc: 'We craft layouts and psychological micro-interactions specifically tuned to convert casual visitors into paying customers.'
                        },
                        {
                            icon: <Shield size={24} className="text-[#bef264]" />,
                            title: 'Future-Proof Codebase',
                            desc: 'Built on modern standards: Next.js 15, TypeScript, PostgreSQL, and scalable cloud architectures ready to scale.'
                        }
                    ].map((pillar, idx) => (
                        <div key={idx} className="bg-black/60 border border-zinc-800/80 rounded-2xl p-6 space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center">
                                {pillar.icon}
                            </div>
                            <h3 className="text-lg font-black text-white tracking-tight">{pillar.title}</h3>
                            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS SLIDER SECTION */}
            <section className="relative z-10">
                <TestimonialsScroller testimonials={[
                    {
                        id: 't1',
                        name: 'Sarah Jenkins',
                        role: 'CEO, Addy Fitness',
                        rating: 5,
                        text: 'Pixel WebPages transformed our entire digital presence. Our sign-ups went through the roof within weeks of launching.'
                    },
                    {
                        id: 't2',
                        name: 'Raunak Singhal',
                        role: 'Director, Sikhaid NGO',
                        rating: 5,
                        text: 'The transparency and speed of the donation portal has been a game-changer for our humanitarian campaigns.'
                    },
                    {
                        id: 't3',
                        name: 'Badsha Magic',
                        role: 'Illusionist & Performer',
                        rating: 5,
                        text: 'My booking calendar has never been busier. The portfolio captures the theatrical magic of my live shows with perfection.'
                    }
                ]} />
            </section>
        </div>
    );
}
