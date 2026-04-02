export const dynamic = 'force-dynamic';

import { getTeamMembers } from '@/lib/actions';
import { TeamMember } from '@/lib/types';
import { TrendingUp, Globe } from '@/components/icons';

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

function getRolePriority(role: string | null | undefined): number {
    if (!role) return 3;
    const r = role.toLowerCase().trim();
    if (r.includes('founder') && !r.includes('co-founder') && !r.includes('co founder')) {
        return 1;
    }
    if (r.includes('co-founder') || r.includes('co founder')) {
        return 2;
    }
    return 3;
}

function sortFounderFirst(members: TeamMember[]) {
    return [...members].sort((a, b) => {
        return getRolePriority(a.role) - getRolePriority(b.role);
    });
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
    title: 'About Us',
    description:
        'Learn about Pixel WebPages - Identifying and Developing Solutions to fill gaps in the Digital World.',
};

export default async function AboutPage() {
    const teamMembers = sortFounderFirst(await fetchTeamMembers());


    const coreValues = [
        { name: 'Innovation', color: 'hover:bg-red-400 hover:border-red-400' },
        { name: 'Integrity', color: 'hover:bg-blue-400 hover:border-blue-400' },
        { name: 'Customer-Centricity', color: 'hover:bg-green-400 hover:border-green-400' },
        { name: 'Excellence', color: 'hover:bg-purple-400 hover:border-purple-400' },
        { name: 'Collaboration', color: 'hover:bg-yellow-400 hover:border-yellow-400' },
    ];

    return (
        <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto min-h-screen relative overflow-hidden">
            {/* AMBIENT BACKGROUNDS */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse delay-1000 pointer-events-none" />

            <h1 className="text-4xl md:text-8xl font-black text-white mb-6">
                ABOUT <span className="text-[#bef264]">US.</span>
            </h1>

            {/* INTRO SECTION */}
            <div className="mb-16">
                <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-light mb-8">
                    Identifying and Developing Solutions to fill gaps in the Digital World. We develop and plan your entry into the digital world. Our group of developers and designers work hard for your business to expand and prosper.
                </p>
                <div className="border-l-4 border-[#bef264] pl-6 py-2">
                    <h3 className="text-white font-bold text-lg mb-2">Why We Help</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                        We started from zero, observing the struggles of small businesses in adopting technology. Our goal is to fill these gaps by building affordable, high-growth applications that ensure your business not only enters the digital world but sustains and prospers within it.
                    </p>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        We have struggled building businesses across different sectors—healthcare tech, food & beverages, and more. We know that when you start, you are often confused, stuck, and lost. We were too. But by learning from every mistake, we gained the experience to guide you.
                    </p>
                </div>
            </div>

            {/* MISSION & VISION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <div className="bg-white p-10 rounded-[2.5rem] border-4 border-green-500 shadow-[8px_8px_0px_0px_#22c55e] transform hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                        <TrendingUp size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-green-900 mb-4">
                        OUR MISSION
                    </h2>
                    <p className="text-green-800 font-medium leading-relaxed text-lg">
                        Empowering your business to reach new heights and reinvent your brand with innovative tech solutions. We don&apos;t settle for average.
                    </p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border-4 border-blue-500 shadow-[8px_8px_0px_0px_#3b82f6] transform hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-blue-900 mb-4">
                        OUR VISION
                    </h2>
                    <p className="text-blue-800 font-medium leading-relaxed text-lg">
                        To be the leading provider of innovative tech solutions, driving business growth and brand transformation through cutting-edge technology.
                    </p>
                </div>
            </div>

            {/* FOUNDING TEAM */}
            <h2 className="text-4xl font-black text-white mb-10 text-center">
                FOUNDING TEAM
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-10 mb-20">
                {teamMembers.map((member) => {
                    const hoverColor =
                        member.color?.startsWith('bg-')
                            ? TAILWIND_BG_TO_HEX[member.color] ?? '#bef264'
                            : member.color || '#bef264';

                    return (
                        <div
                            key={member.id}
                            className="group dynamic-hover bg-zinc-900 border-4 border-black p-8 rounded-[2rem] text-center w-full md:w-80 hover:-translate-y-2 transition-all cursor-pointer shadow-[8px_8px_0px_0px_#fff] active:scale-95"
                            style={{ '--hover-bg': hoverColor } as React.CSSProperties}
                        >
                            <div className="w-full h-72 rounded-2xl mx-auto mb-6 overflow-hidden border-2 border-white group-hover:border-black transition-colors">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-white text-lg italic mb-4 group-hover:text-black transition-colors">
                                &quot;{member.quote}&quot;
                            </p>

                            <h3 className="text-xl font-black text-white uppercase group-hover:text-black transition-colors">
                                - {member.name}
                            </h3>

                            <p className="text-zinc-500 text-sm font-bold uppercase group-hover:text-black/70 transition-colors">
                                {member.role}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* CORE VALUES */}
            <h2 className="text-4xl font-black text-white mb-8 text-center">
                CORE VALUES
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
                {coreValues.map((val, i) => (
                    <div
                        key={i}
                        className={`px-8 py-4 bg-zinc-900 rounded-full border border-zinc-800 ${val.color} hover:text-black hover:scale-105 active:scale-95 transition-all cursor-default`}
                    >
                        <span className="font-bold text-lg">{val.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
