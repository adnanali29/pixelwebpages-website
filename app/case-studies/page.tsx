'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    ExternalLink,
    TrendingUp,
    Zap,
    Shield,
    CheckCircle,
    Star,
    Sparkles,
    Users,
    Code,
    Smartphone,
    Globe,
    FileText,
    ChevronRight,
    X
} from '@/components/icons';
import MatrixDecodeHeading from '@/components/ui/MatrixDecodeHeading';
import { CASE_STUDIES, CaseStudy } from '@/lib/caseStudiesData';

export default function CaseStudiesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [activeStudyModal, setActiveStudyModal] = useState<CaseStudy | null>(null);

    // Interactive ROI Calculator State (in Indian Rupees ₹)
    const [monthlyVisitors, setMonthlyVisitors] = useState<number>(20000);
    const [currentConversion, setCurrentConversion] = useState<number>(1.8);
    const [avgOrderValue, setAvgOrderValue] = useState<number>(4500);

    const categories = ['All', 'SaaS', 'Health', 'Non-Profit', 'Entertainment'];

    const filteredStudies = useMemo(() => {
        if (selectedCategory === 'All') return CASE_STUDIES;
        return CASE_STUDIES.filter(cs => cs.category === selectedCategory);
    }, [selectedCategory]);

    // ROI Calculation: Average 1.3x - 2.0x conversion boost with Pixel WebPages
    const currentMonthlyRevenue = (monthlyVisitors * (currentConversion / 100)) * avgOrderValue;
    const projectedConversion = (currentConversion * 2.3).toFixed(1);
    const projectedMonthlyRevenue = (monthlyVisitors * (parseFloat(projectedConversion) / 100)) * avgOrderValue;
    const monthlyAddedRevenue = projectedMonthlyRevenue - currentMonthlyRevenue;

    const formatINR = (val: number) => {
        return '₹' + Math.round(val).toLocaleString('en-IN');
    };

    return (
        <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-24 font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[170px] pointer-events-none" />

            {/* ========================================================
                1. HERO SECTION
               ======================================================== */}
            <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex">
                    <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                        CLIENT SUCCESS & CASE STUDIES
                    </span>
                </div>

                <MatrixDecodeHeading
                    className="text-4xl sm:text-6xl md:text-7xl"
                    lines={[
                        [{ text: 'PROVEN RESULTS.' }],
                        [{ text: 'MEASURABLE IMPACT.', highlight: true }]
                    ]}
                />

                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Discover how we partner with ambitious founders, enterprises, and non-profits to build breakthrough digital platforms that accelerate growth and outperform competitors.
                </p>

                {/* HIGHLIGHTED METRICS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-4xl mx-auto">
                    {[
                        { label: 'Avg Conversion Jump', value: '+130%', sub: 'Across client launches' },
                        { label: 'Avg Page Speed (LCP)', value: '0.84s', sub: 'Sub-second performance' },
                        { label: 'Active End Users', value: '250k+', sub: 'Daily transactions' },
                        { label: 'Client Retention', value: '71%', sub: 'Long term partners' }
                    ].map((metric, i) => (
                        <div key={i} className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 text-center">
                            <div className="text-2xl sm:text-3xl font-black text-[#bef264] font-mono">{metric.value}</div>
                            <div className="text-[11px] sm:text-xs font-bold text-white uppercase mt-1">{metric.label}</div>
                            <div className="text-[10px] text-zinc-500 font-medium">{metric.sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================
                2. CATEGORY FILTER TABS
               ======================================================== */}
            <section className="relative z-10 flex items-center justify-between flex-wrap gap-4 border-b border-zinc-900 pb-6">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${selectedCategory === cat
                                ? 'bg-[#bef264] text-black shadow-[0_0_12px_rgba(190,242,100,0.4)]'
                                : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                    SHOWING <span className="text-[#bef264] font-bold">{filteredStudies.length}</span> DETAILED STUDIES
                </div>
            </section>

            {/* ========================================================
                3. DETAILED CASE STUDIES LIST
               ======================================================== */}
            <section className="relative z-10 space-y-16">
                {filteredStudies.map((study, index) => (
                    <div
                        id={study.slug}
                        key={study.id}
                        className="bg-zinc-950 rounded-[3rem] border border-zinc-800/90 p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:border-[#bef264]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
                    >
                        {/* Ambient Card Background */}
                        <div
                            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
                            style={{ backgroundColor: study.color }}
                        />

                        {/* Top Header Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase text-black"
                                        style={{ backgroundColor: study.color }}
                                    >
                                        {study.client}
                                    </span>
                                    <span className="text-zinc-500 font-mono text-xs">{study.industry} • {study.year}</span>
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                    {study.title}
                                </h2>
                                <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
                                    {study.subtitle}
                                </p>
                            </div>

                            <a
                                href={study.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="self-start md:self-auto shrink-0 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-[#bef264] transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
                            >
                                <span>Live Website</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>

                        {/* Metrics Grid Strip */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                            {study.metrics.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-zinc-800/80 flex flex-col justify-between"
                                >
                                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{m.change || 'Metric'}</span>
                                    <div
                                        className="text-2xl sm:text-3xl font-black font-mono my-1 tracking-tight"
                                        style={{ color: study.color }}
                                    >
                                        {m.value}
                                    </div>
                                    <span className="text-xs font-bold text-zinc-300">{m.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Main Body: 2 Columns (Image + Deep-Dive Breakdown) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left: Product Image & Tech Stack */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-[4/3] bg-zinc-900 group">
                                    <img
                                        src={study.image}
                                        alt={study.client}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-4 rounded-2xl bg-black/40 border border-zinc-900 space-y-2">
                                    <span className="text-[11px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">
                                        TECH ARCHITECTURE
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {study.techStack.map((tech, tidx) => (
                                            <span
                                                key={tidx}
                                                className="px-2.5 py-1 bg-zinc-900/90 text-zinc-300 text-[11px] font-mono rounded-lg border border-zinc-800"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Challenge, Solution & Deliverables */}
                            <div className="lg:col-span-7 space-y-6">
                                {/* The Challenge */}
                                <div className="p-6 rounded-2xl bg-black/40 border border-zinc-900 space-y-2">
                                    <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                                        <span>🚨</span> THE CHALLENGE
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {study.challenge}
                                    </p>
                                </div>

                                {/* Our Solution */}
                                <div className="p-6 rounded-2xl bg-black/40 border border-zinc-900 space-y-2">
                                    <div className="flex items-center gap-2 text-[#bef264] font-mono text-xs font-bold uppercase tracking-wider">
                                        <span>⚡</span> THE SOLUTION & ARCHITECTURE
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {study.solution}
                                    </p>
                                </div>

                                {/* Key Features Delivered */}
                                <div className="space-y-3">
                                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                                        KEY DELIVERABLES:
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {study.features.map((feat, fidx) => (
                                            <div
                                                key={fidx}
                                                className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900"
                                            >
                                                <span className="text-[#bef264] font-bold">✔</span>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Verified Client Testimonial */}
                                <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900/90 to-zinc-950 border border-zinc-800/80 relative">
                                    <div className="flex gap-1 text-[#bef264] mb-3">
                                        {[...Array(5)].map((_, si) => (
                                            <Star key={si} size={14} className="fill-[#bef264]" />
                                        ))}
                                    </div>
                                    <p className="text-zinc-200 text-sm italic leading-relaxed">
                                        "{study.testimonial.quote}"
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-white font-black text-xs">{study.testimonial.author}</div>
                                            <div className="text-zinc-500 font-mono text-[10px]">{study.testimonial.role}</div>
                                        </div>
                                        <button
                                            onClick={() => setActiveStudyModal(study)}
                                            className="text-xs font-bold text-[#bef264] hover:underline flex items-center gap-1"
                                        >
                                            Full Story ➔
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* ========================================================
                4. INTERACTIVE ROI CALCULATOR
               ======================================================== */}
            <section className="relative z-10 bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-[3rem] p-8 md:p-14 space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-[#bef264] font-mono text-xs font-black tracking-widest uppercase">
                        INTERACTIVE REVENUE SIMULATOR
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                        ROI <span className="text-[#bef264]">CALCULATOR</span>
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                        See how an optimized Next.js stack with sub-second speeds and high-converting UX impacts your bottom line.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
                    {/* Controls */}
                    <div className="lg:col-span-7 bg-black/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                        {/* Monthly Traffic */}
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-zinc-400">Monthly Website Visitors</span>
                                <span className="text-[#bef264] font-mono">{monthlyVisitors.toLocaleString('en-IN')}</span>
                            </div>
                            <input
                                type="range"
                                min="2000"
                                max="200000"
                                step="1000"
                                value={monthlyVisitors}
                                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                                className="w-full accent-[#bef264] cursor-pointer"
                            />
                        </div>

                        {/* Current Conversion Rate */}
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-zinc-400">Current Conversion Rate</span>
                                <span className="text-[#bef264] font-mono">{currentConversion}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="10.0"
                                step="0.1"
                                value={currentConversion}
                                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                                className="w-full accent-[#bef264] cursor-pointer"
                            />
                        </div>

                        {/* Average Order Value / Lead Value */}
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-zinc-400">Average Order / Deal Value (₹)</span>
                                <span className="text-[#bef264] font-mono">{formatINR(avgOrderValue)}</span>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="100000"
                                step="500"
                                value={avgOrderValue}
                                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                                className="w-full accent-[#bef264] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Result Projection Card */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-[#bef264] to-[#86efac] rounded-3xl p-8 text-black flex flex-col justify-between space-y-6 shadow-[0_15px_30px_rgba(190,242,100,0.3)]">
                        <div>
                            <span className="text-xs font-mono font-black uppercase tracking-wider text-black/70">
                                ESTIMATED MONTHLY ADDED REVENUE
                            </span>
                            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight mt-2">
                                +{formatINR(monthlyAddedRevenue)}
                            </div>
                            <p className="text-black/80 font-bold text-xs mt-1">
                                Based on a projected {projectedConversion}% conversion rate (+130% average uplift).
                            </p>
                        </div>

                        <div className="border-t border-black/20 pt-4 space-y-2 text-xs font-bold">
                            <div className="flex justify-between">
                                <span>Current Monthly:</span>
                                <span>{formatINR(currentMonthlyRevenue)}</span>
                            </div>
                            <div className="flex justify-between font-black">
                                <span>New Projected Monthly:</span>
                                <span>{formatINR(projectedMonthlyRevenue)}</span>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="w-full py-3.5 bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-900 transition-all text-center flex items-center justify-center gap-2 shadow-lg"
                        >
                            Claim This Growth ↗
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========================================================
                5. MODAL: IN-DEPTH CASE STUDY MODAL
               ======================================================== */}
            {activeStudyModal && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] max-w-3xl w-full p-6 sm:p-10 space-y-6 shadow-2xl relative my-8">
                        <button
                            onClick={() => setActiveStudyModal(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div>
                            <span
                                className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase text-black inline-block"
                                style={{ backgroundColor: activeStudyModal.color }}
                            >
                                {activeStudyModal.client}
                            </span>
                            <h3 className="text-3xl font-black text-white mt-3">{activeStudyModal.title}</h3>
                            <p className="text-zinc-400 text-sm mt-1">{activeStudyModal.subtitle}</p>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900">
                            <img src={activeStudyModal.image} alt={activeStudyModal.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                            <h4 className="text-base font-bold text-white uppercase tracking-wider">Project Summary</h4>
                            <p>{activeStudyModal.challenge}</p>
                            <p>{activeStudyModal.solution}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {activeStudyModal.metrics.map((m, i) => (
                                <div key={i} className="bg-black p-3 rounded-xl border border-zinc-800 text-center">
                                    <div className="text-xl font-mono font-black text-[#bef264]">{m.value}</div>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">{m.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                            <button
                                onClick={() => setActiveStudyModal(null)}
                                className="px-5 py-2.5 bg-zinc-900 text-zinc-300 font-bold text-xs rounded-xl hover:text-white"
                            >
                                Close
                            </button>
                            <a
                                href={activeStudyModal.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[#bef264] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all flex items-center gap-2"
                            >
                                Visit Live Website <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
