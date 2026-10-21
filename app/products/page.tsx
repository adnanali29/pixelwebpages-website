'use client';

import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    ShoppingCart,
    TrendingUp,
    Users,
    SettingsIcon,
    Zap,
    Search,
    X,
    Check,
    ArrowRight,
    Sparkles,
    Globe,
    FileText,
    Database,
    Code,
    Smartphone,
    Calendar,
    DollarSign
} from '@/components/icons';
import TestimonialsScroller from '@/components/ui/TestimonialsScroller';
import TypewriterHeading from '@/components/ui/TypewriterHeading';
import type { Testimonial, Product } from '@/lib/types';
import { getProducts, addDemoRequest, addExploreLead, getTestimonials } from '@/lib/actions';

interface ProductCardItem {
    id: string;
    order: number;
    name: string;
    title: string;
    color: string;
    accentColor: string;
    short_desc: string;
    description: string;
    benefits: string[];
    tags: string[];
    categories: string[];
    explore_url?: string;
    isComingSoon?: boolean;
    type: 'crm' | 'inventory' | 'retail' | 'event' | 'finance' | 'client';
}

const PRODUCTS_LIST: ProductCardItem[] = [
    {
        id: 'pixel-crm',
        order: 1,
        name: 'Pixel CRM',
        title: 'Pixel CRM',
        color: '#3b82f6',
        accentColor: 'rgba(59, 130, 246, 0.15)',
        short_desc: 'Manage your clients, plans and progress.',
        description: 'Pixel CRM brings deal pipelines, contact histories, and automated follow-ups into a high-performance visual workspace.',
        benefits: [
            'Visual Drag-and-Drop Deal Pipelines',
            'Automated Email & WhatsApp Follow-ups',
            'Centralized Client Timeline & Docs',
            'Team Activity & Revenue Forecasting'
        ],
        tags: ['Sales', 'CRM'],
        categories: ['All Products', 'Business Tools'],
        explore_url: 'https://crm.pixelwebpages.com/',
        type: 'crm'
    },
    {
        id: 'inventory-os',
        order: 2,
        name: 'Inventory OS',
        title: 'Inventory OS',
        color: '#22c55e',
        accentColor: 'rgba(34, 197, 94, 0.15)',
        short_desc: 'Real-time inventory tracking for modern businesses.',
        description: 'Inventory OS provides real-time multi-warehouse stock sync, automated replenishment triggers, and demand forecasting.',
        benefits: [
            'Real-Time Multi-Warehouse Sync',
            'Smart Low-Stock & Expiry Alerts',
            'Integrated Barcode & QR Scanning',
            'Turnover & Demand Forecasting'
        ],
        tags: ['Business Tools', 'Inventory'],
        categories: ['All Products', 'Business Tools', 'E-commerce'],
        explore_url: 'https://inventory.pixelwebpages.com/',
        type: 'inventory'
    },
    {
        id: 'retail-pro',
        order: 3,
        name: 'Retail Pro',
        title: 'Retail Pro',
        color: '#f97316',
        accentColor: 'rgba(249, 115, 22, 0.15)',
        short_desc: 'Next-gen Point of Sale for retail and offline businesses.',
        description: 'A lightning-fast modern POS system built for speed, offline billing resilience, and omnichannel inventory management.',
        benefits: [
            'Lightning Fast 1-Tap Touch Billing',
            'Works 100% Offline with Auto-Sync',
            'Thermal Receipt & Digital SMS Invoices',
            'Customer Loyalty & Discount Engine'
        ],
        tags: ['Retail', 'Point of Sale'],
        categories: ['All Products', 'E-commerce', 'Business Tools'],
        explore_url: 'https://retail.pixelwebpages.com/',
        type: 'retail'
    },
    {
        id: 'event-flow',
        order: 4,
        name: 'Event Flow',
        title: 'Event Flow',
        color: '#f59e0b',
        accentColor: 'rgba(245, 158, 11, 0.15)',
        short_desc: 'Interactive event layout, ticketing, and guest passes.',
        description: 'End-to-end event command center for ticketing, QR check-ins, VIP attendee tracking, and live schedule updates.',
        benefits: [
            'Instant QR Code Pass Generation',
            'Multi-Tiered Ticket Sales & Discounts',
            'Live Guest Check-In & Scanner App',
            'Automated SMS & Email Reminders'
        ],
        tags: ['Events', 'Ticketing'],
        categories: ['All Products', 'Community', 'Business Tools'],
        explore_url: '#',
        type: 'event'
    },
    {
        id: 'finance-hub',
        order: 5,
        name: 'Finance Hub',
        title: 'Finance Hub',
        color: '#0ea5e9',
        accentColor: 'rgba(14, 165, 233, 0.15)',
        short_desc: 'Track income, expenses and overall financial health.',
        description: 'Take control of your finances with automated GST invoice generation, expense tracking, and real-time cashflow analytics.',
        benefits: [
            'Automated GST & Tax Invoice Generation',
            'Real-Time Cashflow & Profit Tracking',
            '1-Click Payment Link Integration',
            'Expense Categorization & Audit Reports'
        ],
        tags: ['Finance', 'Analytics'],
        categories: ['All Products', 'Business Tools', 'Automation'],
        explore_url: '#',
        type: 'finance'
    },
    {
        id: 'client-management',
        order: 6,
        name: 'Client Management',
        title: 'Client Management',
        color: '#0284c7',
        accentColor: 'rgba(2, 132, 199, 0.15)',
        short_desc: 'Manage your clients, track their progress and stay connected.',
        description: 'Dedicated branded client portals where clients can track project milestones, approve deliverables, and communicate effortlessly.',
        benefits: [
            'Custom Branded Client Dashboard',
            'Real-Time Milestone & Task Tracking',
            'File Sharing & Deliverable Approval Flow',
            'Direct Message Threading & History'
        ],
        tags: ['Clients', 'Management'],
        categories: ['All Products', 'Business Tools', 'Automation'],
        explore_url: '#',
        type: 'client'
    }
];

const CATEGORIES = [
    'All Products',
    'Business Tools',
    'E-commerce',
    'Automation',
    'Community'
];

export default function ProductsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [detailsModalProduct, setDetailsModalProduct] = useState<ProductCardItem | null>(null);
    const [demoModalOpen, setDemoModalOpen] = useState(false);
    const [exploreModalOpen, setExploreModalOpen] = useState(false);
    const [selectedDemoProduct, setSelectedDemoProduct] = useState('');
    const [selectedExploreProduct, setSelectedExploreProduct] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const testimonialData = await getTestimonials();
            if (testimonialData) setTestimonials(testimonialData);
        } catch (error) {
            console.error('Error loading page data:', error);
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

            await Promise.all([formspreePromise, dbPromise]);

            if (type === 'explore') {
                const product = PRODUCTS_LIST.find(p => p.name === selectedExploreProduct);
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

    const filteredProducts = useMemo(() => {
        return PRODUCTS_LIST.filter((prod) => {
            const matchesCategory =
                selectedCategory === 'All Products' ||
                prod.categories.includes(selectedCategory);
            const matchesSearch =
                prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prod.short_desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prod.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        }).sort((a, b) => a.order - b.order);
    }, [selectedCategory, searchQuery]);

    return (
        <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-16 font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

            {/* ========================================================
                1. HERO SECTION (CENTER-ALIGNED LIKE WORK PAGE)
               ======================================================== */}
            <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex">
                    <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                        OUR PRODUCTS
                    </span>
                </div>

                <TypewriterHeading
                    className="text-4xl sm:text-6xl md:text-7xl"
                    lines={[
                        [{ text: 'BUILDING TOOLS' }],
                        [{ text: 'FOR A ' }, { text: 'BRIGHTER TOMORROW.', highlight: true }]
                    ]}
                />

                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Our products are built to solve real problems. From businesses to communities, we create tools that make work simpler, faster and more impactful.
                </p>
            </section>

            {/* ========================================================
                2. CATEGORY FILTER & SEARCH BAR (EXACT SCREENSHOT STYLE)
               ======================================================== */}
            <section className="relative z-10 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/90 border border-zinc-800/90 p-2 sm:p-2.5 rounded-3xl md:rounded-full shadow-2xl backdrop-blur-md">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto px-2 py-1 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${selectedCategory === cat
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
                            placeholder="Search products..."
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
                3. PRODUCTS GRID (STRICTLY ORDERED 1 TO 6)
               ======================================================== */}
            <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {filteredProducts.map((prod) => (
                    <div
                        key={prod.id}
                        className="group bg-[#0c0d10] rounded-[2.5rem] border border-zinc-800/90 hover:border-zinc-700 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)] relative overflow-hidden"
                    >
                        {/* Top Ambient Glow */}
                        <div
                            className="absolute -top-14 -right-10 w-80 h-80 opacity-30 group-hover:opacity-55 blur-[85px] rounded-full pointer-events-none transition-all duration-500"
                            style={{ backgroundColor: prod.color }}
                        />

                        {/* Top Content Area: 2 Columns (Info on Left, Device Mockup on Right) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5 items-stretch min-h-[220px] sm:min-h-[250px]">
                            {/* Left Col: Icon, Title, Subtitle, Category Pills */}
                            <div className="md:col-span-6 flex flex-col justify-between py-1 space-y-4">
                                <div className="space-y-3">
                                    {/* Top App Icon */}
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-13 h-13 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 shadow-inner"
                                            style={{
                                                backgroundColor: prod.accentColor,
                                                borderColor: `${prod.color}60`,
                                                color: prod.color
                                            }}
                                        >
                                            {prod.type === 'crm' && <Users size={24} />}
                                            {prod.type === 'inventory' && <ShoppingCart size={24} />}
                                            {prod.type === 'retail' && <ShoppingCart size={24} />}
                                            {prod.type === 'event' && <Calendar size={24} />}
                                            {prod.type === 'finance' && <DollarSign size={24} />}
                                            {prod.type === 'client' && <Globe size={24} />}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-white transition-colors">
                                            {prod.title}
                                        </h3>
                                        <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                                            {prod.short_desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Category Tags / Pills */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {prod.tags.map((tag, tidx) => (
                                        <span
                                            key={tidx}
                                            className="px-3.5 py-1 bg-zinc-900/90 text-zinc-300 text-xs font-semibold rounded-full border border-zinc-800 shadow-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Col: Custom Hardware / Device Mockup Panel (Docked from side bezel to right edge, down to CTA) */}
                            <div className="md:col-span-6 relative w-full h-[220px] sm:h-[250px] md:h-[260px] flex items-center justify-start md:justify-end -mr-0 md:-mr-7 lg:-mr-8 overflow-hidden">
                                {/* 1. Pixel CRM Mockup (Image 2 - CRM) */}
                                {prod.type === 'crm' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/crm-device.png"
                                                alt="Pixel CRM Live Dashboard"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(59,130,246,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 2. Inventory OS Mockup */}
                                {prod.type === 'inventory' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-[#22c55e]/30 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22c55e]/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/inventory-os-device.png"
                                                alt="Inventory OS Live Tablet Dashboard"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(34,197,94,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 3. Retail Pro Mockup (Image 3 - Retail POS) */}
                                {prod.type === 'retail' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/retail-pro-device.png"
                                                alt="Retail Pro POS Terminal Hardware"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(249,115,22,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 4. Event Flow Mockup (Image 4 - Event Flow) */}
                                {prod.type === 'event' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/event-flow-device.png"
                                                alt="Event Flow Live Interactive Map"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(245,158,11,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 5. Finance Hub Mockup (Image 5 - Finance Hub) */}
                                {prod.type === 'finance' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-sky-500/30 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/finance-hub-device.png"
                                                alt="Finance Hub Analytics Suite"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(14,165,233,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 6. Client Management Mockup (Image 2 - Client Management) */}
                                {prod.type === 'client' && (
                                    <div className="relative w-full h-full flex items-center justify-start md:justify-end">
                                        <div className="absolute -top-10 -right-4 w-72 h-72 bg-sky-600/30 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-600/45 group-hover:scale-110 transition-all duration-500" />
                                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                                        <div className="relative h-full flex items-center transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                            <img
                                                src="/images/client-management-device.png"
                                                alt="Client Management Live Dashboard"
                                                className="h-full w-auto max-w-none object-contain object-left select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_25px_rgba(2,132,199,0.3)]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Two Action Buttons (Solid Accent on Left + Outlined on Right) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-900 mt-auto">
                            <button
                                onClick={() => handleRequestDemo(prod.name)}
                                className="w-full py-3.5 px-5 font-black text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 text-black hover:opacity-95 shadow-md text-center"
                                style={{ backgroundColor: prod.color }}
                            >
                                REQUEST DEMO
                            </button>
                            <button
                                onClick={() => handleExploreProduct(prod.name)}
                                className="w-full py-3.5 px-5 bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all active:scale-95 text-center border-2"
                                style={{ borderColor: prod.color }}
                            >
                                EXPLORE PRODUCT
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* ========================================================
                4. PRODUCT DETAILS MODAL
               ======================================================== */}
            {detailsModalProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] w-full max-w-2xl p-8 relative shadow-2xl space-y-6">
                        <button
                            onClick={() => setDetailsModalProduct(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div>
                            <span
                                className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase text-black inline-block"
                                style={{ backgroundColor: detailsModalProduct.color }}
                            >
                                {detailsModalProduct.tags.join(' • ')}
                            </span>
                            <h2 className="text-3xl font-black text-white mt-3">{detailsModalProduct.title}</h2>
                            <p className="text-zinc-400 text-sm mt-1">{detailsModalProduct.short_desc}</p>
                        </div>

                        <p className="text-zinc-300 text-sm leading-relaxed">{detailsModalProduct.description}</p>

                        <div className="space-y-2">
                            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">KEY BENEFITS</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {detailsModalProduct.benefits.map((b, bi) => (
                                    <div key={bi} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-900">
                                        <span className="text-[#bef264] font-bold">✔</span>
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-900">
                            <button
                                onClick={() => {
                                    handleRequestDemo(detailsModalProduct.name);
                                    setDetailsModalProduct(null);
                                }}
                                className="w-full py-3 bg-[#bef264] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all"
                            >
                                Request Demo
                            </button>
                            <button
                                onClick={() => {
                                    handleExploreProduct(detailsModalProduct.name);
                                    setDetailsModalProduct(null);
                                }}
                                className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-all"
                            >
                                Explore Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                5. REQUEST DEMO MODAL
               ======================================================== */}
            {demoModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl space-y-5">
                        <button
                            onClick={() => setDemoModalOpen(false)}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        {isSubmitted ? (
                            <div className="text-center py-8 space-y-3">
                                <div className="w-14 h-14 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto text-black">
                                    <Check size={28} strokeWidth={3} />
                                </div>
                                <h3 className="text-2xl font-black text-white">Demo Requested!</h3>
                                <p className="text-zinc-400 text-xs">Our product specialist will reach out in 24 hours.</p>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <span className="text-[10px] font-mono text-[#bef264] uppercase tracking-wider font-bold">INTERACTIVE WALKTHROUGH</span>
                                    <h3 className="text-2xl font-black text-white mt-1">Request Demo</h3>
                                    <p className="text-zinc-400 text-xs mt-0.5">Product: <strong className="text-white">{selectedDemoProduct}</strong></p>
                                </div>

                                <form onSubmit={(e) => handleSubmit(e, 'demo')} className="space-y-3">
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Your Full Name"
                                    />
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Work Email Address"
                                    />
                                    <input
                                        name="number"
                                        required
                                        type="tel"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Phone Number"
                                    />
                                    <input name="product" type="hidden" value={selectedDemoProduct} />
                                    <textarea
                                        name="description"
                                        rows={3}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Tell us about your use case (optional)..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-3 bg-[#bef264] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all disabled:opacity-50"
                                    >
                                        {isSending ? 'Submitting...' : 'Submit Demo Request'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ========================================================
                6. EXPLORE PRODUCT MODAL
               ======================================================== */}
            {exploreModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] w-full max-w-md p-8 relative shadow-2xl space-y-5">
                        <button
                            onClick={() => setExploreModalOpen(false)}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        {isSubmitted ? (
                            <div className="text-center py-8 space-y-3">
                                <div className="w-14 h-14 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto text-black">
                                    <Check size={28} strokeWidth={3} />
                                </div>
                                <h3 className="text-2xl font-black text-white">Access Granted!</h3>
                                <p className="text-zinc-400 text-xs">Redirecting to product dashboard...</p>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <span className="text-[10px] font-mono text-[#bef264] uppercase tracking-wider font-bold">INSTANT EXPLORATION</span>
                                    <h3 className="text-2xl font-black text-white mt-1">Explore {selectedExploreProduct}</h3>
                                    <p className="text-zinc-400 text-xs mt-0.5">Please provide your details to access the live sandbox.</p>
                                </div>

                                <form onSubmit={(e) => handleSubmit(e, 'explore')} className="space-y-3">
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Your Full Name"
                                    />
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Work Email Address"
                                    />
                                    <input
                                        name="number"
                                        required
                                        type="tel"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#bef264]"
                                        placeholder="Phone Number"
                                    />
                                    <input name="product" type="hidden" value={selectedExploreProduct} />
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#bef264] transition-all disabled:opacity-50"
                                    >
                                        {isSending ? 'Unlocking...' : 'Continue to Product Dashboard ➔'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Testimonials */}
            <div className="mt-20">
                <TestimonialsScroller testimonials={testimonials} />
            </div>
        </div>
    );
}
