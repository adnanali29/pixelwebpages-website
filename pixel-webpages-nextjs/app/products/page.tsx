'use client';

import { useEffect, useState } from 'react';
import { getProducts, addDemoRequest, addExploreLead } from '@/lib/actions';
import type { Product } from '@/lib/types';
import {
    Box, ShoppingCart, DollarSign, TrendingUp, Shield, Scale, Brain, Globe, Smartphone, Cloud, Database, Code, Rocket, Palette, Video, Music, Monitor, Users, CheckCircle, FileText, Mail, Phone, Linkedin, Calendar, Coffee, Heart, Truck, Zap, X, Check, ExternalLink, ArrowRight
} from '@/components/icons';

const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    yellow: '#eab308',
    orange: '#f97316',
    pink: '#ec4899',
    cyan: '#06b6d4',
};

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

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [detailsModalProduct, setDetailsModalProduct] = useState<Product | null>(null);
    const [demoModalOpen, setDemoModalOpen] = useState(false);
    const [exploreModalOpen, setExploreModalOpen] = useState(false);
    const [selectedDemoProduct, setSelectedDemoProduct] = useState('');
    const [selectedExploreProduct, setSelectedExploreProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            if (data) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRequestDemo = (productName: string) => {
        setSelectedDemoProduct(productName);
        setIsSubmitted(false);
        setDemoModalOpen(true);
    };

    const handleExploreProduct = (productName: string) => {
        setSelectedExploreProduct(productName);
        setIsSubmitted(false);
        setExploreModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'demo' | 'explore' = 'demo') => {
        e.preventDefault();
        setIsSending(true);
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            // 1. Start Both Saves in Parallel (Much Faster!)
            const formspreePromise = fetch('https://formspree.io/f/xvgeqoag', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            const dbPromise = type === 'demo' 
                ? addDemoRequest({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('number'),
                    product_name: formData.get('product'),
                    message: formData.get('description') || "Demo Request",
                }) 
                : addExploreLead({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('number'),
                    product_name: formData.get('product'),
                    message: formData.get('description') || "Explore Product",
                });

            // 2. Wait for both concurrent operations
            await Promise.all([formspreePromise, dbPromise]);

            // 3. If it's an "Explore" request, redirect INSTANTLY
            if (type === 'explore') {
                const product = products.find(p => p.name === selectedExploreProduct);
                if (product && product.explore_url && product.explore_url !== '#') {
                    window.location.href = product.explore_url;
                    return; 
                }
            }

            setIsSubmitted(true);
            form.reset();
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

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-8xl font-black text-white mb-16">
                OUR <span className="text-blue-400">PRODUCTS.</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {products.map((prod, i) => {
                    const isLast = i === products.length - 1;
                    const isOdd = products.length % 2 !== 0;
                    const colClass = isLast && isOdd ? 'md:col-span-2' : '';

                    const colorHex = colorMap[prod.color] || '#3b82f6';

                    return (
                        <div
                            key={prod.id}
                            className={`bg-[#111] rounded-[3rem] border-4 border-zinc-900 p-10 relative overflow-hidden group transition-all duration-500 flex flex-col h-full ${colClass} hover:-translate-y-2`}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = colorHex;
                                e.currentTarget.style.boxShadow = `0 0 50px ${colorHex}33`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#18181b'; // matches border-zinc-900
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Background glow overlay */}
                            <div
                                className="absolute top-0 right-0 p-32 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                                style={{ backgroundColor: colorHex }}
                            />

                            <div
                                className="flex-1 relative z-10 cursor-pointer"
                                onClick={() => setDetailsModalProduct(prod)}
                            >
                                <div className="transition-transform duration-500 group-hover:scale-110 origin-left">
                                    {getSmartIcon(prod.name, 64, '')}
                                    <style jsx global>{`
                                        .group:hover svg { color: ${colorHex} !important; }
                                        svg { transition: color 0.3s; }
                                    `}</style>
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4">{prod.name}</h2>
                                <p className="text-zinc-400 text-lg mb-8 font-medium line-clamp-2">{prod.short_desc}</p>
                                <button
                                    className="text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 mb-4"
                                    style={{ color: colorHex }}
                                >
                                    CLICK FOR DETAILS <ArrowRight size={16} />
                                </button>
                            </div>
                            <div className="mt-auto space-y-3 relative z-10 pt-6">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRequestDemo(prod.name);
                                    }}
                                    className="w-full py-5 text-black font-black rounded-xl transition-all active:scale-95 text-lg shadow-lg"
                                    style={{ backgroundColor: colorHex }}
                                >
                                    REQUEST DEMO
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleExploreProduct(prod.name);
                                    }}
                                    className="block w-full py-5 border-2 text-white font-black rounded-xl transition-all active:scale-95 text-center text-lg"
                                    style={{ borderColor: colorHex }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = colorHex;
                                        e.currentTarget.style.color = 'black';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    EXPLORE PRODUCT
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Product Details Modal */}
            {detailsModalProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
                    <div className={`bg-zinc-900 border-4 border-${detailsModalProduct.color}-500/50 rounded-[3rem] w-full max-w-4xl overflow-hidden relative animate-in fade-in zoom-in duration-500 shadow-[0_0_100px_rgba(0,0,0,0.5)]`}>
                        <button
                            onClick={() => setDetailsModalProduct(null)}
                            className="absolute top-8 right-8 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 hover:scale-110 transition-all z-20 border border-white/10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                            {/* Left Column: Icon and Title */}
                            <div className={`md:w-[40%] p-12 bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center text-center relative overflow-hidden border-b md:border-b-0 md:border-r-2 border-zinc-800`}>
                                <div className={`absolute top-0 left-0 w-full h-full bg-${detailsModalProduct.color}-500/5 blur-[120px] pointer-events-none`} />
                                <div className="relative z-10">
                                    <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border-2 border-zinc-700/50 mb-8 inline-block shadow-2xl">
                                        {getSmartIcon(detailsModalProduct.name, 100, `text-${detailsModalProduct.color}-400`)}
                                    </div>
                                    <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">{detailsModalProduct.name}</h2>
                                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/10 border-2 border-blue-500/30 rounded-full">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        <span className="text-blue-400 text-sm font-black uppercase tracking-[0.2em]">ENTERPRISE GRADE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Content and Actions */}
                            <div className="md:w-[60%] p-12 md:p-16 flex flex-col justify-between overflow-y-auto bg-black/40">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-6 leading-tight">Unlock Your Potential</h2>
                                    <p className="text-zinc-400 text-xl leading-relaxed mb-10 font-medium opacity-90">
                                        {detailsModalProduct.description}
                                    </p>

                                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-[0.1em]">Why Choose {detailsModalProduct.name}?</h3>
                                    <div className="space-y-5 mb-12">
                                        {detailsModalProduct.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-start gap-5 group/item">
                                                <div className={`w-8 h-8 rounded-full border-2 border-${detailsModalProduct.color}-500/50 flex items-center justify-center text-${detailsModalProduct.color}-400 shrink-0 group-hover/item:bg-${detailsModalProduct.color}-500 group-hover/item:text-black transition-all duration-300`}>
                                                    <Check size={18} strokeWidth={4} />
                                                </div>
                                                <p className="text-white text-lg font-bold opacity-90 group-hover/item:opacity-100 transition-opacity">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => {
                                            handleRequestDemo(detailsModalProduct.name);
                                            setDetailsModalProduct(null);
                                        }}
                                        className={`w-full py-6 bg-${detailsModalProduct.color}-500 text-black font-black rounded-2xl hover:bg-white transition-all active:scale-95 border-2 border-transparent text-xl shadow-xl hover:shadow-${detailsModalProduct.color}-500/20`}
                                    >
                                        REQUEST DEMO
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleExploreProduct(detailsModalProduct.name);
                                            setDetailsModalProduct(null);
                                        }}
                                        className={`block w-full py-6 border-2 border-zinc-800 text-white font-black rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 text-center text-xl hover:border-zinc-700`}
                                    >
                                        EXPLORE PRODUCT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Demo Request Modal */}
            {demoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className={`${isSubmitted ? 'bg-[#f0fdf4]' : 'bg-white'} border-4 border-black rounded-[2.5rem] w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}>
                        <button
                            onClick={() => setDemoModalOpen(false)}
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
                                <h2 className="text-3xl font-black text-black mb-2 uppercase">Request Demo</h2>
                                <p className="text-zinc-600 mb-6 text-sm font-medium">
                                    Product:{' '}
                                    <span className="bg-[#bef264] px-1 text-black border border-black">
                                        {selectedDemoProduct}
                                    </span>
                                </p>

                                <form onSubmit={(e) => handleSubmit(e, 'demo')} className="space-y-4">
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
                                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                                        className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Phone Number"
                                    />
                                    <input name="product" type="hidden" value={selectedDemoProduct} />
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
            {/* Explore Product Modal (Matches HTML UNLOCK ACCESS design) */}
            {exploreModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className={`${isSubmitted ? 'bg-[#f0fdf4]' : 'bg-white'} border-4 border-black rounded-[2.5rem] w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]`}>
                        <button
                            onClick={() => setExploreModalOpen(false)}
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
                                <h2 className="text-3xl font-black text-black mb-2 uppercase">Unlock Access</h2>
                                <p className="text-zinc-600 mb-6 text-sm font-medium"> To explore <span className="font-bold text-black">{selectedExploreProduct}</span>, please share your details. </p>

                                <form onSubmit={(e) => handleSubmit(e, 'explore')} className="space-y-4">
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="w-full bg-zinc-100 border-2 border-black rounded-xl p-3 text-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Name"
                                    />
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="w-full bg-zinc-100 border-2 border-black rounded-xl p-3 text-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Email"
                                    />
                                    <input
                                        name="number"
                                        required
                                        type="tel"
                                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                                        className="w-full bg-zinc-100 border-2 border-black rounded-xl p-3 text-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                                        placeholder="Your Phone Number"
                                    />
                                    <input name="product" type="hidden" value={selectedExploreProduct} />
                                    <input name="description" type="hidden" value="Interested in exploring product details" />

                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-[#bef264] hover:text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_#000] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSending ? 'Redirecting...' : 'Continue to Product'}
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

