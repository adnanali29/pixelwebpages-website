'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
    ArrowRight, ShoppingCart, DollarSign, TrendingUp, Shield, Scale, Brain, Globe, Smartphone, Cloud, Database, Code, Rocket, Palette, Video, Music, Monitor, Users, CheckCircle, FileText, Mail, Phone, Linkedin, Calendar, Coffee, Heart, Truck, Zap, Box, X, Check
} from '@/components/icons';
import type { Service, SubService } from '@/lib/types';

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

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [activeCategory, setActiveCategory] = useState<Service | null>(null);
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
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });

        if (!error && data) {
            setServices(data);
        }
        setIsLoading(false);
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
            const response = await fetch('https://formspree.io/f/xvgeqoag', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });
            if (response.ok) {
                // Also save to Supabase for Admin Dashboard
                await supabase.from('contact_submissions').insert([{
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('number'),
                    message: `Service Request: ${selectedSubService}. Description: ${formData.get('description')}`,
                }]);

                setIsSubmitted(true);
                form.reset();
            } else {
                alert('Error sending request. Please try again.');
            }
        } catch (error) {
            alert('Error sending request. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Loading...</div>
            </div>
        );
    }

    if (!activeCategory) {
        return (
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[150px] animate-pulse delay-1000 pointer-events-none" />
                <h1 className="text-4xl md:text-8xl font-black text-white mb-12 text-center">
                    OUR <span className="text-[#bef264]">SERVICES.</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {services.map((cat, i) => {
                        const total = services.length;
                        const itemsInLastRow = total % 4;
                        let spanClass = 'md:col-span-1';

                        if (itemsInLastRow === 1 && i === total - 1) spanClass = 'md:col-span-4';
                        if (itemsInLastRow === 2 && i >= total - 2) spanClass = 'md:col-span-2';
                        if (itemsInLastRow === 3 && i === total - 3) spanClass = 'md:col-span-2';

                        return (
                            <div
                                key={cat.id}
                                onClick={() => setActiveCategory(cat)}
                                className={`group relative p-6 rounded-[2rem] cursor-pointer transition-all duration-300 ${cat.color} border-4 border-black shadow-[6px_6px_0px_0px_#fff] hover:shadow-[10px_10px_0px_0px_#fff] hover:-translate-y-1 active:scale-95 ${spanClass} min-h-[240px] flex flex-col justify-between overflow-hidden`}
                            >
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="bg-black/20 p-3 rounded-xl text-black backdrop-blur-sm">
                                        {getSmartIcon(cat.title, 32)}
                                    </div>
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all -rotate-45 group-hover:rotate-0 shadow-lg">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>

                                <div className="relative z-10 mt-2">
                                    <h3 className={`text-2xl font-black leading-tight mb-2 ${cat.text_color}`}>
                                        {cat.title}
                                    </h3>
                                    <p className={`font-bold text-xs line-clamp-2 ${cat.text_color === 'text-white' ? 'text-white/80' : 'text-black/70'}`}>
                                        {cat.description}
                                    </p>
                                </div>

                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
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
                            <ul className="space-y-2">
                                {sub.points && sub.points.slice(0, 3).map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        <span className="w-1.5 h-1.5 bg-[#bef264] rounded-full mt-1.5 shrink-0" />
                                        <span className="line-clamp-1">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => handleSubServiceClick(sub.title)}
                            className="mt-8 w-full py-4 bg-black border border-zinc-700 rounded-2xl text-white font-bold hover:bg-[#bef264] hover:text-black hover:border-black transition-all active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-[4px_4px_0px_0px_#bef264]"
                        >
                            Start Project <ArrowRight size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#f0fdf4] border-4 border-black rounded-[2.5rem] w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 bg-black text-white p-1 rounded-full hover:scale-110 transition-transform z-10"
                        >
                            <X size={20} />
                        </button>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-200">
                                    <Check size={32} strokeWidth={4} />
                                </div>
                                <h2 className="text-3xl font-black text-black mb-2">Message Sent!</h2>
                                <p className="text-zinc-600 font-bold text-lg">We will reach out in 24-48 hours.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-black text-black mb-2 uppercase">Let&apos;s Build It.</h2>
                                <p className="text-zinc-600 mb-6 text-sm font-medium">
                                    Requesting:{' '}
                                    <span className="bg-[#bef264] px-1 text-black border border-black">
                                        {activeCategory.title} - {selectedSubService}
                                    </span>
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Name"
                                    />
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Email"
                                    />
                                    <input
                                        name="number"
                                        required
                                        type="tel"
                                        className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Phone Number"
                                    />
                                    <input
                                        name="service"
                                        type="hidden"
                                        value={`${activeCategory.title} - ${selectedSubService}`}
                                    />
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Brief Description..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-[#bef264] hover:text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_#000] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSending ? 'Sending...' : 'Send Request'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
