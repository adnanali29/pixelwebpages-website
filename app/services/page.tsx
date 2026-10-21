'use client';

import { useEffect, useState, useMemo } from 'react';
import { getServices, addContactSubmission } from '@/lib/actions';
import {
    ArrowRight, ShoppingCart, DollarSign, TrendingUp, Shield, Scale, Brain, Globe, Smartphone, Cloud, Database, Code, Rocket, Palette, Video, Music, Monitor, Users, CheckCircle, FileText, Mail, Phone, Linkedin, Calendar, Coffee, Heart, Truck, Zap, Box, X, Check, Search
} from '@/components/icons';
import type { Service, SubService } from '@/lib/types';

import RollingLetterHeading from '@/components/ui/RollingLetterHeading';

// Icon mapping function
const getSmartIcon = (name: string = "", size: number = 32, className: string = "") => {
    if (!name) return <Box size={size} className={className} />;
    const lowerName = name.toLowerCase();
    const props = { size, className };

    // 1. Retail & Commerce
    if (lowerName.match(/retail|shop|store|cart|buy|sell|commerce|order|pos|inventory|stock|catalog/)) return <ShoppingCart {...props} />;

    // 2. Finance & Money
    if (lowerName.match(/money|cash|pay|card|bank|financ|dollar|price|cost|bill|invoice|account|tax|gst|audit/)) return <DollarSign {...props} />;

    // 3. Growth, Marketing & Analytics
    if (lowerName.match(/market|grow|trend|seo|rank|stat|chart|graph|analy|ads|campaign|lead|funnel|perform/)) return <TrendingUp {...props} />;

    // 4. Legal & Compliance
    if (lowerName.match(/law|legal|court|rule|terms|policy|trademark|right|protect|shield|secure|auth/)) return <Shield {...props} />;
    if (lowerName.match(/scale|balance|justice/)) return <Scale {...props} />;

    // 5. Tech, AI & Development
    if (lowerName.match(/ai|smart|bot|gpt|brain|neural|intel|autom|learn|predict/)) return <Brain {...props} />;
    if (lowerName.match(/web|site|html|css|react|browser|domain|internet|portal|landing/)) return <Globe {...props} />;
    if (lowerName.match(/app|mobile|android|ios|phone|tablet|native/)) return <Smartphone {...props} />;
    if (lowerName.match(/cloud|server|host|deploy|aws|azure|vps/)) return <Cloud {...props} />;
    if (lowerName.match(/data|base|sql|query|storage|record/)) return <Database {...props} />;
    if (lowerName.match(/code|dev|prog|git|api|sdk|stack|tech|soft|ware|system/)) return <Code {...props} />;
    if (lowerName.match(/idea|innov|create|think|light|solve|start|launch|rocket/)) return <Rocket {...props} />;

    // 6. Creative & Design
    if (lowerName.match(/design|ui|ux|art|color|palette|sketch|draw|brand|logo|graphic|icon/)) return <Palette {...props} />;
    if (lowerName.match(/video|stream|play|watch|tube|film|movie|media|content/)) return <Video {...props} />;
    if (lowerName.match(/music|audio|sound|listen|pod|song/)) return <Music {...props} />;
    if (lowerName.match(/sign|board|print|banner|ad|billboard/)) return <Monitor {...props} />;

    // 7. Corporate & HR
    if (lowerName.match(/team|staff|hr|human|people|group|user|client|crm|employ/)) return <Users {...props} />;
    if (lowerName.match(/ppt|slide|deck|pres|pitch|present|brief/)) return <CheckCircle {...props} />;
    if (lowerName.match(/doc|file|paper|contract|agree|form|report/)) return <FileText {...props} />;

    // 8. Communication & Social
    if (lowerName.match(/mail|email|inbox|send|message|contact|chat/)) return <Mail {...props} />;
    if (lowerName.match(/call|phone|support|help|talk/)) return <Phone {...props} />;
    if (lowerName.match(/social|fb|insta|tweet|link|linkedin|network|connect/)) return <Linkedin {...props} />;

    // 9. Operations & Misc Industries
    if (lowerName.match(/event|cal|date|meet|sched|calendar|book/)) return <Calendar {...props} />;
    if (lowerName.match(/food|drink|cafe|rest|eat|cook/)) return <Coffee {...props} />;
    if (lowerName.match(/health|med|fit|gym|doc|care|life|wellness/)) return <Heart {...props} />;
    if (lowerName.match(/truck|ship|move|logis|deliver|supply|chain|transport/)) return <Truck {...props} />;
    if (lowerName.match(/fast|quick|speed|accelerate/)) return <Zap {...props} />;

    return <Box {...props} />;
};

const SERVICE_CATEGORIES = [
    'All Services',
    'Web & Engineering',
    'UI/UX & Design',
    'Mobile Apps',
    'Growth & Marketing',
    'Cloud & Systems'
];

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [activeCategory, setActiveCategory] = useState<Service | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        loadServices();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeCategory]);

    const loadServices = async () => {
        try {
            const data = await getServices();
            if (data) {
                setServices(data);
            }
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubServiceClick = (subTitle: string) => {
        setSelectedSubService(subTitle);
        setIsSubmitted(false);
        setModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const formspreePromise = fetch('https://formspree.io/f/xvgeqoag', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            const dbPromise = addContactSubmission({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('number') as string,
                message: `Service Request: ${selectedSubService}. Description: ${formData.get('description')}`,
            });

            await Promise.all([formspreePromise, dbPromise]);

            setIsSubmitted(true);
            form.reset();
        } catch (error) {
            alert('Error sending request. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    // Filter services based on category and search query
    const filteredServices = useMemo(() => {
        return services.filter((cat) => {
            const query = searchQuery.toLowerCase().trim();
            const subList = Array.isArray(cat.sub_services) ? cat.sub_services : [];

            // 1. Search Query Match
            const matchesQuery = !query ||
                cat.title.toLowerCase().includes(query) ||
                cat.description.toLowerCase().includes(query) ||
                subList.some(sub =>
                    sub.title.toLowerCase().includes(query) ||
                    sub.desc.toLowerCase().includes(query) ||
                    (Array.isArray(sub.points) && sub.points.some(p => p.toLowerCase().includes(query)))
                );

            // 2. Category Tab Match
            let matchesCategory = true;
            if (selectedCategory !== 'All Services') {
                const title = cat.title.toLowerCase();
                const desc = cat.description.toLowerCase();
                if (selectedCategory === 'Web & Engineering') {
                    matchesCategory = title.includes('web') || title.includes('develop') || title.includes('software') || title.includes('code') || title.includes('full') || desc.includes('engineering');
                } else if (selectedCategory === 'UI/UX & Design') {
                    matchesCategory = title.includes('design') || title.includes('ui') || title.includes('ux') || title.includes('brand') || title.includes('creative') || desc.includes('visual');
                } else if (selectedCategory === 'Mobile Apps') {
                    matchesCategory = title.includes('app') || title.includes('mobile') || title.includes('ios') || title.includes('android');
                } else if (selectedCategory === 'Growth & Marketing') {
                    matchesCategory = title.includes('market') || title.includes('growth') || title.includes('seo') || title.includes('ads') || title.includes('campaign') || desc.includes('leads');
                } else if (selectedCategory === 'Cloud & Systems') {
                    matchesCategory = title.includes('cloud') || title.includes('system') || title.includes('data') || title.includes('automat') || title.includes('infra') || title.includes('server');
                }
            }

            return matchesQuery && matchesCategory;
        });
    }, [services, searchQuery, selectedCategory]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Loading services...</div>
            </div>
        );
    }

    if (!activeCategory) {
        return (
            <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-14 font-sans">
                {/* Ambient Glows */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

                {/* ========================================================
                    1. HERO SECTION (CENTER-ALIGNED LIKE PRODUCT & WORK)
                   ======================================================== */}
                <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex">
                        <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                            OUR SERVICES
                        </span>
                    </div>

                    <RollingLetterHeading
                        className="text-4xl sm:text-6xl md:text-7xl"
                        lines={[
                            [{ text: 'EVERY DIGITAL LAYER.' }],
                            [{ text: 'UNDER ONE ROOF.', highlight: true }]
                        ]}
                    />

                    <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        From high-converting UI/UX design and brand systems to robust full-stack software, mobile apps, and automated cloud backends.
                    </p>
                </section>

                {/* ========================================================
                    2. CATEGORY FILTER & SEARCH BAR (EXACT SCREENSHOT STYLE)
                   ======================================================== */}
                <section className="relative z-10 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/90 border border-zinc-800/90 p-2 sm:p-2.5 rounded-3xl md:rounded-full shadow-2xl backdrop-blur-md">
                        {/* Category Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto px-2 py-1 no-scrollbar">
                            {SERVICE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                                        selectedCategory === cat
                                            ? 'bg-[#bef264] text-black shadow-[0_0_15px_rgba(190,242,100,0.4)]'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 px-2 md:px-0 md:pr-2">
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full px-4 py-2.5 pl-10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264] transition-colors"
                            />
                            <div className="absolute left-5 md:left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                                <Search size={15} />
                            </div>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-5 md:right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* ========================================================
                    3. GRID OF COLORFUL SERVICE CARDS (2-COL ON MOBILE)
                   ======================================================== */}
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative z-10">
                        {filteredServices.map((cat, i) => {
                            const total = filteredServices.length;
                            const itemsInLastRow = total % 4;
                            let spanClass = 'col-span-1 md:col-span-1';

                            if (itemsInLastRow === 1 && i === total - 1) spanClass = 'col-span-2 md:col-span-4 lg:col-span-4';
                            else if (itemsInLastRow === 2 && i >= total - 2) spanClass = 'col-span-1 md:col-span-2 lg:col-span-2';
                            else if (itemsInLastRow === 3 && i === total - 3) spanClass = 'col-span-2 md:col-span-2 lg:col-span-2';

                            return (
                                <div
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`group relative p-3.5 sm:p-6 md:p-7 rounded-[1.5rem] sm:rounded-[2.2rem] cursor-pointer transition-all duration-300 ${cat.color} border-[3px] sm:border-4 border-black shadow-[4px_4px_0px_0px_#fff] sm:shadow-[6px_6px_0px_0px_#fff] hover:shadow-[8px_8px_0px_0px_#fff] sm:hover:shadow-[10px_10px_0px_0px_#fff] hover:-translate-y-1 active:scale-95 ${spanClass} min-h-[165px] sm:min-h-[220px] md:min-h-[250px] flex flex-col justify-between overflow-hidden`}
                                >
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="bg-black/20 p-2 sm:p-3 rounded-xl sm:rounded-2xl text-black backdrop-blur-sm">
                                            <div className="sm:hidden">
                                                {getSmartIcon(cat.title, 20)}
                                            </div>
                                            <div className="hidden sm:block">
                                                {getSmartIcon(cat.title, 32)}
                                            </div>
                                        </div>
                                        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all -rotate-45 group-hover:rotate-0 shadow-lg">
                                            <ArrowRight size={14} className="sm:hidden" />
                                            <ArrowRight size={20} className="hidden sm:block" />
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-2 sm:mt-3">
                                        <h3 className={`text-sm sm:text-lg md:text-2xl font-black leading-snug sm:leading-tight mb-1 sm:mb-2 ${cat.text_color}`}>
                                            {cat.title}
                                        </h3>
                                        <p className={`font-bold text-[10.5px] sm:text-xs md:text-[13px] line-clamp-2 ${cat.text_color === 'text-white' ? 'text-white/80' : 'text-black/75'}`}>
                                            {cat.description}
                                        </p>
                                    </div>

                                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="relative z-10 py-16 text-center bg-zinc-950/80 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto mb-4">
                            <Search size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No services found</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            No service matches <span className="text-[#bef264] font-semibold">"{searchQuery}"</span>. Try searching another capability or reset filters.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All Services');
                            }}
                            className="px-6 py-2.5 bg-[#bef264] text-black font-bold text-xs rounded-full uppercase tracking-wider hover:bg-white transition-all shadow-md active:scale-95"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        );
    }

    const subServices = Array.isArray(activeCategory.sub_services) ? activeCategory.sub_services : [];

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-white font-bold mb-8 hover:text-[#bef264] transition-colors active:scale-95 group"
            >
                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center group-hover:border-[#bef264] group-hover:bg-[#bef264] group-hover:text-black transition-all">
                    <ArrowRight className="rotate-180" size={24} />
                </div>
                <span className="text-lg">Back to Services</span>
            </button>

            <div className={`p-10 rounded-[3rem] ${activeCategory.color} border-4 border-black mb-16 flex flex-col md:flex-row items-center gap-10 shadow-[8px_8px_0px_0px_#fff]`}>
                <div className="bg-black/10 p-8 rounded-[2.5rem] backdrop-blur-md border-2 border-black/5">
                    {getSmartIcon(activeCategory.title, 64)}
                </div>
                <div className="text-center md:text-left">
                    <h1 className={`text-4xl md:text-7xl font-black ${activeCategory.text_color} mb-4 tracking-tight`}>
                        {activeCategory.title}
                    </h1>
                    <p className={`text-xl md:text-2xl font-bold ${activeCategory.text_color} opacity-80 max-w-2xl`}>
                        {activeCategory.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subServices.map((sub: SubService, index: number) => (
                    <div
                        key={index}
                        className="bg-zinc-900/50 backdrop-blur-sm border-2 border-zinc-800 rounded-[2.5rem] p-8 hover:border-[#bef264] transition-all group flex flex-col justify-between min-h-[320px] hover:bg-zinc-900 aspect-square"
                    >
                        <div>
                            <div className="text-zinc-500 mb-8 group-hover:text-[#bef264] group-hover:scale-110 transition-all origin-left duration-300">
                                {getSmartIcon(sub.title, 48)}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#bef264] transition-colors">
                                {sub.title}
                            </h3>
                            <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                {sub.desc}
                            </p>
                        </div>

                        <div>
                            {Array.isArray(sub.points) && sub.points.length > 0 && (
                                <div className="space-y-2 mb-6 border-t border-zinc-800/80 pt-4">
                                    {sub.points.slice(0, 3).map((point: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
                                            <span className="truncate">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => handleSubServiceClick(sub.title)}
                                className="w-full py-4 bg-zinc-800 hover:bg-[#bef264] hover:text-black text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <span>Get Started</span>
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Service Inquiry */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg w-full relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 text-zinc-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-black text-white mb-2">Request Service</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            Let's discuss how we can help you with <span className="text-[#bef264] font-bold">{selectedSubService}</span>.
                        </p>

                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-[#bef264]/10 text-[#bef264] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#bef264]/20">
                                    <Check size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Request Sent!</h4>
                                <p className="text-zinc-400 text-sm">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#bef264]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#bef264]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="number"
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#bef264]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Project Details</label>
                                    <textarea
                                        required
                                        name="description"
                                        rows={3}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#bef264]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full py-4 bg-[#bef264] text-black font-black uppercase tracking-wider text-sm rounded-xl hover:bg-white transition-colors disabled:opacity-50 mt-4"
                                >
                                    {isSending ? 'Sending...' : 'Submit Request'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
