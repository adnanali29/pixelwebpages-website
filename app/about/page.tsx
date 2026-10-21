export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/actions';
import { TeamMember } from '@/lib/types';
import { ArrowRight, Users, Box, Star, Sparkles, Heart } from '@/components/icons';
import SynergyRevealHeading from '@/components/ui/SynergyRevealHeading';

const TAILWIND_BG_TO_HEX: Record<string, string> = {
    'bg-red-400': '#f87171',
    'bg-blue-400': '#60a5fa',
    'bg-green-400': '#4ade80',
    'bg-purple-400': '#c084fc',
    'bg-yellow-400': '#facc15',
    'bg-pink-400': '#f472b6',
    'bg-indigo-400': '#818cf8',
    'bg-orange-400': '#fb923c',
};

function getMemberPriority(member: TeamMember): number {
    const name = (member.name || '').toLowerCase().trim();
    const role = (member.role || '').toLowerCase().trim();
    if (name.includes('adnan') || (role.includes('founder') && !role.includes('co-founder') && !role.includes('co founder'))) {
        return 1;
    }
    if (name.includes('ayush') || role.includes('co-founder') || role.includes('co founder')) {
        return 2;
    }
    if (name.includes('anup') || role.includes('software') || role.includes('developer')) {
        return 3;
    }
    return 4;
}

function sortTeamMembers(members: TeamMember[]) {
    return [...members].sort((a, b) => getMemberPriority(a) - getMemberPriority(b));
}

async function fetchTeamMembers(): Promise<TeamMember[]> {
    try {
        const data = await getTeamMembers();
        return data || [];
    } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
    }
}

export const metadata = {
    title: 'About Us | Pixel WebPages',
    description:
        'A small team with a bigger purpose. Pixel WebPages builds digital products, platforms and high-growth experiences.',
};

export default async function AboutPage() {
    const teamMembers = sortTeamMembers(await fetchTeamMembers());

    return (
        <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-24">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#bef264]/5 rounded-full blur-[160px] pointer-events-none" />

            {/* ========================================================
                1. HERO SECTION (CENTER-ALIGNED LIKE WORK PAGE)
               ======================================================== */}
            <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                {/* Pill Badge */}
                <div className="inline-flex">
                    <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                        ABOUT US
                    </span>
                </div>

                <SynergyRevealHeading
                    className="text-4xl sm:text-6xl md:text-7xl"
                    lines={[
                        [{ text: 'A SMALL TEAM WITH' }],
                        [{ text: 'A BIGGER PURPOSE.', highlight: true }]
                    ]}
                />

                {/* Subtitle Description */}
                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Pixel WebPages is a technology and design studio that builds websites, software, and digital products for businesses, founders and organizations.
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <Link
                        href="/work"
                        className="px-7 py-3.5 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:bg-[#bef264] transition-all duration-200 flex items-center gap-2 shadow-[0_4px_20px_rgba(190,242,100,0.3)] hover:scale-105 active:scale-95"
                    >
                        OUR WORK <ArrowRight size={16} />
                    </Link>
                    <Link
                        href="#team"
                        className="px-7 py-3.5 bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:border-[#bef264] hover:text-[#bef264] transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                        MEET THE TEAM
                    </Link>
                </div>
            </section>

            {/* Bottom Stats Strip (Image 3) */}
            <section className="relative z-10">
                <div className="p-6 sm:p-8 rounded-3xl bg-black/90 border border-zinc-800/90 shadow-2xl relative overflow-hidden backdrop-blur-md">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-zinc-800/90">
                        {/* Stat 1 */}
                        <div className="text-center px-4">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bef264] tracking-tight">
                                19+
                            </div>
                            <div className="text-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                                Digital Projects
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="text-center px-4">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bef264] tracking-tight">
                                7+
                            </div>
                            <div className="text-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                                Brands Built
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="text-center px-4">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bef264] tracking-tight">
                                10+
                            </div>
                            <div className="text-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                                Products Launched
                            </div>
                        </div>

                        {/* Stat 4 */}
                        <div className="text-center px-4">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bef264] tracking-tight">
                                ∞
                            </div>
                            <div className="text-zinc-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                                Ideas to Build
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                NEW: DIGITAL ENTRY & WHY WE HELP (ABOVE MISSION)
               ======================================================== */}
            <section className="relative z-10 space-y-6">
                {/* Main Narrative Glassmorphic Card */}
                <div className="relative p-8 sm:p-12 lg:p-14 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/95 via-black to-zinc-950 border-2 border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Background glow accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#bef264]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

                    <div className="relative z-10 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#bef264]/15 border border-[#bef264]/30 text-[#bef264] text-xs font-mono font-black uppercase tracking-wider mb-6">
                            <Sparkles size={14} /> DIGITAL EVOLUTION
                        </div>

                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.15] mb-6">
                            Identifying and Developing Solutions to fill gaps in the <span className="text-[#bef264]">Digital World.</span>
                        </h2>

                        <p className="text-zinc-300 text-base sm:text-xl font-medium leading-relaxed mb-8">
                            We develop and plan your entry into the digital world. Our group of developers and designers work hard for your business to expand and prosper.
                        </p>

                        {/* "Why We Help" storytelling subcard */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-700/80 backdrop-blur-sm relative overflow-hidden space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#bef264] text-black flex items-center justify-center font-black shadow-md">
                                    <Heart size={20} className="text-black fill-black" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                                    Why We Help
                                </h3>
                            </div>

                            <div className="space-y-4 text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
                                <p>
                                    We started from zero, observing the struggles of small businesses in adopting technology. Our goal is to fill these gaps by building affordable, high-growth applications that ensure your business not only enters the digital world but sustains and prospers within it.
                                </p>
                                <p className="text-zinc-400">
                                    We have struggled building businesses across different sectors—healthcare tech, food & beverages, and more. We know that when you start, you are often confused, stuck, and lost. We were too. But by learning from every mistake, we gained the experience to guide you.
                                </p>
                            </div>

                            {/* Sector badges */}
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800">
                                <span className="px-3 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono font-medium border border-zinc-700">
                                    🏥 Healthcare Tech
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono font-medium border border-zinc-700">
                                    🍔 Food & Beverages
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono font-medium border border-zinc-700">
                                    ⚡ High-Growth Apps
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono font-medium border border-zinc-700">
                                    🌱 Small Business Scaling
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                2. MISSION & VISION & VALUES (MATCHING IMAGE 4)
               ======================================================== */}
            <section className="space-y-8 z-10 relative">
                {/* Top Row: Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {/* MISSION CARD */}
                    <div className="p-8 sm:p-12 rounded-[2.8rem] sm:rounded-[3.2rem] bg-white border-[3.5px] border-[#00c950] shadow-[12px_12px_0px_0px_#00c950] sm:shadow-[14px_14px_0px_0px_#00c950] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
                        <div>
                            {/* Mission Green Circular Disc */}
                            <div className="w-14 h-14 rounded-full bg-[#00c950] flex items-center justify-center text-white mb-6 shadow-sm">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 17 9 11 13 15 21 7" />
                                    <polyline points="14 7 21 7 21 14" />
                                </svg>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-black text-[#0a4827] uppercase tracking-tight mb-5">
                                OUR MISSION
                            </h2>

                            <p className="text-[#0a4827] text-base sm:text-lg font-medium leading-[1.65]">
                                Empowering your business to reach new heights and reinvent your brand with innovative tech solutions. We don’t settle for average.
                            </p>
                        </div>
                    </div>

                    {/* VISION CARD */}
                    <div className="p-8 sm:p-12 rounded-[2.8rem] sm:rounded-[3.2rem] bg-white border-[3.5px] border-[#2563eb] shadow-[12px_12px_0px_0px_#2563eb] sm:shadow-[14px_14px_0px_0px_#2563eb] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
                        <div>
                            {/* Vision Blue Circular Disc */}
                            <div className="w-14 h-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white mb-6 shadow-sm">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-black text-[#1e3a8a] uppercase tracking-tight mb-5">
                                OUR VISION
                            </h2>

                            <p className="text-[#1e40af] text-base sm:text-lg font-medium leading-[1.65]">
                                To be the leading provider of innovative tech solutions, driving business growth and brand transformation through cutting-edge technology.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Values / What Drives Us - 4 Attractive Modern Cards */}
                <div className="p-8 sm:p-12 rounded-[2.5rem] bg-black border-2 border-zinc-800/90 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="px-3.5 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-[11px] font-black uppercase tracking-wider inline-block mb-3 shadow-[0_0_15px_rgba(190,242,100,0.3)]">
                                OUR VALUES
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                                WHAT <span className="text-[#bef264]">DRIVES US.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
                            The foundational principles that guide every line of code, design sprint, and client partnership we build.
                        </p>
                    </div>

                    {/* 4 Distinct, Highly Attractive Glassmorphic Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Card 1: People First */}
                        <div className="group relative p-6 sm:p-7 rounded-[2rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#bef264] transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(190,242,100,0.15)] flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#bef264]/5 rounded-full blur-2xl group-hover:bg-[#bef264]/15 transition-all duration-300 pointer-events-none" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#bef264]/15 border border-[#bef264]/30 flex items-center justify-center text-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.2)] group-hover:scale-110 group-hover:bg-[#bef264] group-hover:text-black transition-all duration-300">
                                        <Users size={24} />
                                    </div>
                                    <span className="text-xs font-mono font-black text-zinc-600 group-hover:text-[#bef264] transition-colors">
                                        01
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#bef264] transition-colors">
                                    People First
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    Build for real people, not just technology. Empathy and user intuition lead our craftsmanship.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Innovation */}
                        <div className="group relative p-6 sm:p-7 rounded-[2rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#bef264] transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(190,242,100,0.15)] flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#bef264]/5 rounded-full blur-2xl group-hover:bg-[#bef264]/15 transition-all duration-300 pointer-events-none" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#bef264]/15 border border-[#bef264]/30 flex items-center justify-center text-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.2)] group-hover:scale-110 group-hover:bg-[#bef264] group-hover:text-black transition-all duration-300">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                            <path d="M9 18h6" />
                                            <path d="M10 22h4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-mono font-black text-zinc-600 group-hover:text-[#bef264] transition-colors">
                                        02
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#bef264] transition-colors">
                                    Innovation
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    Always curious. Always learning. Staying ahead of cutting-edge tech stacks and AI ecosystems.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Simplicity */}
                        <div className="group relative p-6 sm:p-7 rounded-[2rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#bef264] transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(190,242,100,0.15)] flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#bef264]/5 rounded-full blur-2xl group-hover:bg-[#bef264]/15 transition-all duration-300 pointer-events-none" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#bef264]/15 border border-[#bef264]/30 flex items-center justify-center text-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.2)] group-hover:scale-110 group-hover:bg-[#bef264] group-hover:text-black transition-all duration-300">
                                        <Box size={24} />
                                    </div>
                                    <span className="text-xs font-mono font-black text-zinc-600 group-hover:text-[#bef264] transition-colors">
                                        03
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#bef264] transition-colors">
                                    Simplicity
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    Complex problems. Simple solutions. Eliminating friction so your business can move fast.
                                </p>
                            </div>
                        </div>

                        {/* Card 4: Impact */}
                        <div className="group relative p-6 sm:p-7 rounded-[2rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-[#bef264] transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(190,242,100,0.15)] flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-28 h-28 bg-[#bef264]/5 rounded-full blur-2xl group-hover:bg-[#bef264]/15 transition-all duration-300 pointer-events-none" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#bef264]/15 border border-[#bef264]/30 flex items-center justify-center text-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.2)] group-hover:scale-110 group-hover:bg-[#bef264] group-hover:text-black transition-all duration-300">
                                        <Star size={24} />
                                    </div>
                                    <span className="text-xs font-mono font-black text-zinc-600 group-hover:text-[#bef264] transition-colors">
                                        04
                                    </span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#bef264] transition-colors">
                                    Impact
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    Create meaningful and long-term value. Measuring success through genuine business growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================
                3. FOUNDING TEAM (MATCHING IMAGE 2 DESIGN)
               ======================================================== */}
            <section id="team" className="z-10 relative">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="text-[#bef264] font-mono text-xs font-bold tracking-widest uppercase mb-2">
                        THE SQUAD
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                        FOUNDING <span className="text-[#bef264]">TEAM.</span>
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3">
                        The designers, engineers, and strategists bringing pixel-perfect experiences to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => {
                        // 3 distinct vibrant neo-brutalist hover colors
                        const hoverClasses = [
                            'hover:bg-[#bef264]', // 1. Lime
                            'hover:bg-[#c084fc]', // 2. Neon Purple
                            'hover:bg-[#38bdf8]', // 3. Vibrant Cyan / Sky
                            'hover:bg-[#fb923c]', // 4. Coral
                        ];
                        const hoverClass = hoverClasses[index % hoverClasses.length];

                        return (
                            <div
                                key={member.id}
                                className={`group bg-[#131316] ${hoverClass} border-[3.5px] border-zinc-900 hover:border-black rounded-[2.5rem] p-6 sm:p-7 shadow-[10px_10px_0px_0px_#ffffff] sm:shadow-[12px_12px_0px_0px_#ffffff] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
                            >
                                <div>
                                    {/* Portrait Image Frame with crisp white border */}
                                    <div className="w-full aspect-[4/4.3] rounded-[1.8rem] overflow-hidden border-2 border-white group-hover:border-black bg-zinc-900 shadow-sm mb-6 transition-colors">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Quote in Italics */}
                                    <p className="text-zinc-200 group-hover:text-black text-center text-sm sm:text-[15px] italic font-normal mb-6 leading-relaxed px-2 min-h-[3.5rem] flex items-center justify-center transition-colors">
                                        “{member.quote}”
                                    </p>
                                </div>

                                {/* Name & Role */}
                                <div className="text-center pt-2">
                                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-black uppercase tracking-wider mb-1 transition-colors">
                                        - {member.name}
                                    </h3>
                                    <p className="text-zinc-400 group-hover:text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
