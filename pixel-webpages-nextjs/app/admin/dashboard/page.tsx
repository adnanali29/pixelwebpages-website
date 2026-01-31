'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    Activity, Box, Users, PenTool, Send, Calendar, Check, CheckCircle, Clock, Edit2, Eye, FileText, HomeIcon, Info, Mail, Menu, Palette, Phone, Plus, Search, SettingsIcon, Trash2, X, Bell, LogOut, ArrowRight, Terminal, Zap, ExternalLink
} from '@/components/icons';
import type { Project, Testimonial, TeamMember, Product, Service, Blog } from '@/lib/types';
import Link from 'next/link';
import { PRODUCT_THEMES, ADMIN_COLORS } from '@/lib/constants/themes';
import * as Icons from '@/components/icons';

const getSmartIcon = (name: string = "", size: number = 24, className: string = "") => {
    if (!name) return <Icons.Box size={size} className={className} />;
    const lowerName = name.toLowerCase();
    const props = { size, className };

    // Common patterns
    if (lowerName.match(/retail|shop|store|cart|buy|sell|commerce|order|pos|inventory|stock|catalog/)) return <Icons.ShoppingCart {...props} />;
    if (lowerName.match(/money|cash|pay|card|bank|financ|dollar|price|cost|bill|invoice|account|tax|gst|audit/)) return <Icons.DollarSign {...props} />;
    if (lowerName.match(/market|grow|trend|seo|rank|stat|chart|graph|analy|ads|campaign|lead|funnel|perform/)) return <Icons.TrendingUp {...props} />;
    if (lowerName.match(/law|legal|court|rule|terms|policy|trademark|right|protect|shield|secure|auth/)) return <Icons.Shield {...props} />;
    if (lowerName.match(/scale|balance|justice/)) return <Icons.Scale {...props} />;
    if (lowerName.match(/ai|smart|bot|gpt|brain|neural|intel|autom|learn|predict/)) return <Icons.Brain {...props} />;
    if (lowerName.match(/web|site|html|css|react|browser|domain|internet|portal|landing/)) return <Icons.Globe {...props} />;
    if (lowerName.match(/app|mobile|android|ios|phone|tablet|native/)) return <Icons.Smartphone {...props} />;
    if (lowerName.match(/cloud|server|host|deploy|aws|azure|vps/)) return <Icons.Cloud {...props} />;
    if (lowerName.match(/data|base|sql|query|storage|record/)) return <Icons.Database {...props} />;
    if (lowerName.match(/code|dev|prog|git|api|sdk|stack|tech|soft|ware|system/)) return <Icons.Code {...props} />;
    if (lowerName.match(/idea|innov|create|think|light|solve|start|launch|rocket/)) return <Icons.Rocket {...props} />;
    if (lowerName.match(/design|ui|ux|art|color|palette|sketch|draw|brand|logo|graphic|icon/)) return <Icons.Palette {...props} />;
    if (lowerName.match(/video|stream|play|watch|tube|film|movie|media|content/)) return <Icons.Video {...props} />;
    if (lowerName.match(/music|audio|sound|listen|pod|song/)) return <Icons.Music {...props} />;
    if (lowerName.match(/sign|board|print|banner|ad|billboard/)) return <Icons.Monitor {...props} />;
    if (lowerName.match(/team|staff|hr|human|people|group|user|client|crm|employ/)) return <Icons.Users {...props} />;
    if (lowerName.match(/ppt|slide|deck|pres|pitch|present|brief/)) return <Icons.FileText {...props} />;
    if (lowerName.match(/doc|file|paper|contract|agree|form|report/)) return <Icons.FileText {...props} />;
    if (lowerName.match(/mail|email|inbox|send|message|contact|chat/)) return <Icons.Mail {...props} />;
    if (lowerName.match(/call|phone|support|help|talk/)) return <Icons.Phone {...props} />;
    if (lowerName.match(/social|fb|insta|tweet|link|linkedin|network|connect/)) return <Icons.Linkedin {...props} />;
    if (lowerName.match(/event|cal|date|meet|sched|calendar|book/)) return <Icons.Calendar {...props} />;
    if (lowerName.match(/food|drink|cafe|rest|eat|cook/)) return <Icons.Coffee {...props} />;
    if (lowerName.match(/health|med|fit|gym|doc|care|life|wellness/)) return <Icons.Heart {...props} />;
    if (lowerName.match(/truck|ship|move|logis|deliver|supply|chain|transport/)) return <Icons.Truck {...props} />;
    if (lowerName.match(/fast|quick|speed|accelerate/)) return <Icons.Zap {...props} />;

    return <Icons.Box {...props} />;
};

interface ContactSubmission {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    type?: string;
    service_name?: string;
    product_name?: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Data states
    const [projects, setProjects] = useState<Project[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    // Edit/Delete Modal States
    const [editItem, setEditItem] = useState<any>(null);
    const [editSection, setEditSection] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ table: string, id: string } | null>(null);

    const [demos, setDemos] = useState<ContactSubmission[]>([]);
    const [explores, setExplores] = useState<ContactSubmission[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('admin_authenticated');
        if (!isAuthenticated) {
            router.push('/admin');
            return;
        }
        loadAllData();

        // Setup realtime subscription for notifications (simulated with interval or just load)
        const interval = setInterval(() => {
            // In a real app, you'd use supabase realtime
        }, 30000);

        return () => clearInterval(interval);
    }, [router]);

    const loadAllData = async () => {
        setIsLoading(true);
        try {
            const [
                projectsData,
                testimonialsData,
                teamData,
                productsData,
                servicesData,
                blogsData,
                contactsData,
                demoData,
                exploreData
            ] = await Promise.all([
                supabase.from('projects').select('*').order('created_at', { ascending: false }),
                supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
                supabase.from('team_members').select('*').order('created_at', { ascending: true }),
                supabase.from('products').select('*').order('created_at', { ascending: false }),
                supabase.from('services').select('*').order('created_at', { ascending: false }),
                supabase.from('blogs').select('*').order('created_at', { ascending: false }),
                supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
                supabase.from('demo_requests').select('*').order('created_at', { ascending: false }),
                supabase.from('explore_leads').select('*').order('created_at', { ascending: false }),
            ]);

            setProjects(projectsData.data || []);
            setTestimonials(testimonialsData.data || []);
            setTeamMembers(teamData.data || []);
            setProducts(productsData.data || []);
            setServices(servicesData.data || []);
            setBlogs(blogsData.data || []);
            setContacts(contactsData.data || []);
            setDemos(demoData.data || []);
            setExplores(exploreData.data || []);

            // Generate notifications with stable IDs
            const newNotifications: any[] = [];
            if (demoData.data && demoData.data.length > 0) {
                newNotifications.push({
                    id: `demo-${demoData.data[0].id}`,
                    type: 'New Lead',
                    title: `New Demo Request from ${demoData.data[0].name}`,
                    message: demoData.data[0].email,
                    time: 'Just now'
                });
            }
            if (exploreData.data && exploreData.data.length > 0) {
                newNotifications.push({
                    id: `explore-${exploreData.data[0].id}`,
                    type: 'New Lead',
                    title: `New Product Interest from ${exploreData.data[0].name}`,
                    message: exploreData.data[0].product_name,
                    time: '5 mins ago'
                });
            }
            if (contactsData.data && contactsData.data.length > 0) {
                newNotifications.push({
                    id: `contact-${contactsData.data[0].id}`,
                    type: 'New Message',
                    title: `New Contact Message from ${contactsData.data[0].name}`,
                    message: contactsData.data[0].message,
                    time: '10 mins ago'
                });
            }
            setNotifications(newNotifications);

        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error loading data:', error);
        }
        setIsLoading(false);
    };

    const handleSave = async (section: string, data: any) => {
        try {
            const tableMap: Record<string, string> = {
                'projects': 'projects',
                'testimonials': 'testimonials',
                'team': 'team_members',
                'products': 'products',
                'services': 'services',
                'blogs': 'blogs',
            };

            const table = tableMap[section];

            if (data.id) {
                // Update existing
                const { error } = await supabase.from(table).update(data).eq('id', data.id);
                if (error) throw error;
            } else {
                // Insert new
                if (data.desc && !data.description) {
                    data.description = data.desc;
                    delete data.desc;
                }
                const { error } = await supabase.from(table).insert([data]);
                if (error) throw error;
            }

            loadAllData();
            setEditItem(null);
            setEditSection(null);
        } catch (error: any) {
            console.error('Error saving:', error);
            alert(`Error saving item: ${error.message || 'Check console for details'}`);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;

        try {
            const { error } = await supabase.from(deleteConfirm.table).delete().eq('id', deleteConfirm.id);
            if (error) throw error;
            loadAllData();
            setDeleteConfirm(null);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authenticated');
        router.push('/admin');
    };

    const menuItems = [
        { type: 'link', id: 'Dashboard', icon: Activity },
        { type: 'header', label: 'Content' },
        { type: 'link', id: 'Home', icon: HomeIcon },
        { type: 'link', id: 'About', icon: Info },
        { type: 'link', id: 'Products', icon: Box },
        { type: 'link', id: 'Services', icon: Zap },
        { type: 'link', id: 'Blogs', icon: PenTool },
        { type: 'header', label: 'Inbox & Data' },
        { type: 'link', id: 'Demo Request', icon: FileText },
        { type: 'link', id: 'Explore Product', icon: Eye },
        { type: 'link', id: 'Contact Request', icon: Mail },
        { type: 'header', label: 'System' },
        { type: 'link', id: 'Settings', icon: SettingsIcon },
    ];

    const getMonthlyStats = (dataArray: any[]) => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        let current = 0;
        let previous = 0;

        dataArray.forEach(item => {
            if (!item.created_at) return;
            const date = new Date(item.created_at);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) current++;
            if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) previous++;
        });

        return { current, previous, total: dataArray.length };
    };

    const StatCard = ({ title, count, color, icon, stats }: { title: string, count: number, color: string, icon: any, stats: { current: number, total: number } }) => (
        <div className={`p-8 rounded-[2.5rem] border-4 border-black ${color} shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform cursor-default relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-4 bg-white rounded-2xl text-black border-2 border-black shadow-sm">
                    {icon}
                </div>
                <div className="text-right">
                    <h3 className="text-5xl font-black text-black leading-none">{count}</h3>
                    <p className="text-sm font-bold opacity-70 mt-1 uppercase tracking-wide">Total</p>
                </div>
            </div>
            <h4 className="font-black text-black text-2xl mb-6 relative z-10">{title}</h4>

            <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden mb-2 relative z-10">
                <div className="h-full bg-black/80" style={{ width: `${(stats.current / (stats.total || 1)) * 100}%` }}></div>
            </div>

            <div className="flex justify-between text-xs font-bold uppercase tracking-wider relative z-10 opacity-80 text-black">
                <span>{stats.current} New (Mo)</span>
                <span>+{stats.current} This Month</span>
            </div>
        </div>
    );

    const renderDashboard = () => {
        const demoStats = getMonthlyStats(demos);
        const exploreStats = getMonthlyStats(explores);
        const contactStats = getMonthlyStats(contacts);

        return (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Demo Requests" count={demoStats.total} color="bg-[#bef264]" icon={<Zap size={28} />} stats={demoStats} />
                    <StatCard title="Product Leads" count={exploreStats.total} color="bg-[#c084fc]" icon={<Eye size={28} />} stats={exploreStats} />
                    <StatCard title="Messages" count={contactStats.total} color="bg-[#60a5fa]" icon={<Mail size={28} />} stats={contactStats} />
                </div>

                <div className="bg-white border-2 border-zinc-100 rounded-[2.5rem] p-10">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-black mb-2">Quick Actions</h3>
                            <p className="text-zinc-500 font-medium">Manage your website content efficiently.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <button onClick={() => setActiveTab('Home')} className="flex items-center gap-3 px-8 py-4 bg-zinc-50 border-2 border-zinc-200 text-black font-bold rounded-2xl hover:bg-black hover:text-white hover:border-black transition-all active:scale-95 group">
                            <HomeIcon size={20} className="group-hover:scale-110 transition-transform" /> Edit Home
                        </button>
                        <button onClick={() => {
                            setActiveTab('Blogs');
                            setEditItem({ title: '', date: new Date().toISOString().split('T')[0], tag: '', color: 'bg-blue-400', image: '', content: '' });
                            setEditSection('blogs');
                        }} className="flex items-center gap-3 px-8 py-4 bg-zinc-50 border-2 border-zinc-200 text-black font-bold rounded-2xl hover:bg-[#c084fc] hover:text-black hover:border-black transition-all active:scale-95 group">
                            <PenTool size={20} className="group-hover:scale-110 transition-transform" /> New Blog
                        </button>
                        <button onClick={() => setActiveTab('Demo Request')} className="flex items-center gap-3 px-8 py-4 bg-zinc-50 border-2 border-zinc-200 text-black font-bold rounded-2xl hover:bg-[#60a5fa] hover:text-black hover:border-black transition-all active:scale-95 group">
                            <FileText size={20} className="group-hover:scale-110 transition-transform" /> View Demos
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderInbox = () => (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm animate-in fade-in space-y-6">
            {contacts.length === 0 ? (
                <div className="text-center py-20">
                    <Mail size={48} className="mx-auto text-zinc-300 mb-4" />
                    <p className="text-xl font-bold text-zinc-400">No messages yet</p>
                </div>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} className="bg-zinc-50 border-2 border-zinc-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 group hover:border-black hover:shadow-lg transition-all duration-300">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    {contact.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-black text-lg">{contact.name}</h4>
                                    <p className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                                        <Mail size={12} /> {contact.email}
                                        {contact.phone && <><span className="text-zinc-300">|</span> <Phone size={12} /> {contact.phone}</>}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-zinc-200 mt-2">
                                <p className="text-zinc-700 font-medium whitespace-pre-wrap">{contact.message}</p>
                            </div>
                            <p className="text-xs font-bold text-zinc-400 mt-3 flex items-center gap-1">
                                <Clock size={12} /> {new Date(contact.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-start">
                            <button
                                onClick={() => setDeleteConfirm({ table: 'contact_submissions', id: contact.id })}
                                className="p-3 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const renderCard = (item: any, section: string, titleKey: string = 'name') => (
        <div key={item.id} className="bg-white border-2 border-zinc-100 rounded-2xl p-5 flex justify-between items-center group hover:border-black hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-5 overflow-hidden">
                {item.image ? (
                    <img src={item.image} alt={item[titleKey]} className="w-14 h-14 rounded-xl object-cover bg-zinc-100 border border-zinc-100 shrink-0" />
                ) : (
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${item.color && item.color.startsWith('bg-') ? item.color : 'bg-black'} ${(!item.color || item.text_color === 'text-white' || item.color.includes('blue') || item.color.includes('purple')) ? 'text-white' : 'text-black'}`}>
                        {section === 'services' || section === 'products' ? getSmartIcon(item[titleKey] || item.title, 24) : (item[titleKey] || item.title || '?').charAt(0)}
                    </div>
                )}
                <div className="min-w-0">
                    <h4 className="font-bold text-black text-lg truncate">{item[titleKey] || item.title}</h4>
                    <p className="text-sm text-zinc-500 truncate">{item.desc || item.description || item.role}</p>
                </div>
            </div>
            <div className="flex gap-3 pl-4">
                <button
                    onClick={() => { setEditItem(item); setEditSection(section); }}
                    className="p-3 bg-zinc-50 hover:bg-black hover:text-white rounded-xl text-zinc-600 transition-colors"
                >
                    <Edit2 size={18} />
                </button>
                <button
                    onClick={() => setDeleteConfirm({ table: section === 'team' ? 'team_members' : section, id: item.id })}
                    className="p-3 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl text-red-500 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );

    const renderList = (items: any[], titleKey: string, section: string) => (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-black">{activeTab}</h3>
                <button
                    onClick={() => {
                        const newItem = section === 'projects' ? { name: '', url: '', description: '', color: 'bg-blue-500', image: '' } :
                            section === 'testimonials' ? { name: '', role: '', rating: 5, text: '' } :
                                section === 'team' ? { name: '', role: '', quote: '', image: '', color: 'bg-green-400' } :
                                    section === 'products' ? { name: '', color: 'blue', short_desc: '', description: '', benefits: [], explore_url: '' } :
                                        section === 'services' ? { title: '', color: 'bg-zinc-100', text_color: 'text-black', description: '' } :
                                            { title: '', date: new Date().toISOString().split('T')[0], tag: '', color: 'bg-blue-400', image: '', content: '' };
                        setEditItem(newItem);
                        setEditSection(section);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Add {activeTab.slice(0, -1)}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => renderCard(item, section, titleKey))}
                {items.length === 0 && (
                    <div className="col-span-full py-10 text-center text-zinc-400 font-bold">No items found.</div>
                )}
            </div>
        </div>
    );

    const renderEditor = () => {
        if (!editItem || !editSection) return null;

        const closeEditor = () => { setEditItem(null); setEditSection(null); };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-white border-4 border-black rounded-3xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in shadow-2xl">
                    <button onClick={closeEditor} className="absolute top-6 right-6 bg-black text-white p-2 rounded-full hover:scale-110 transition-transform">
                        <X size={20} />
                    </button>
                    <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-tight border-b-2 border-zinc-100 pb-4">
                        {editItem.id ? 'Edit Item' : 'Create New'}
                    </h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        let data: any = Object.fromEntries(formData.entries());

                        // Handle Arrays (Points, subServices etc if sent as newline strings)
                        Object.keys(editItem).forEach(key => {
                            if (Array.isArray(editItem[key]) && typeof data[key] === 'string') {
                                data[key] = data[key].split('\n').filter((s: string) => s.trim());
                            }
                        });

                        // Keep complex objects if not in form
                        if (editItem.sub_services) data.sub_services = editItem.sub_services;
                        if (!data.color && editItem.color) data.color = editItem.color;

                        // Handle numeric fields
                        if (data.rating) data.rating = parseInt(data.rating);

                        if (editItem.id) data.id = editItem.id;
                        handleSave(editSection, data);
                    }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.keys(editItem).map(key => {
                                if (key === 'id' || key === 'created_at' || key === 'updated_at' || key === 'sub_services') return null;

                                // Special handling for COLOR (Redesigned as per Image 2)
                                if (key === 'color') {
                                    return (
                                        <div key={key} className="md:col-span-2 space-y-4">
                                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">
                                                SELECT THEME
                                            </label>

                                            {/* Preset Grid (Naming-Focused) */}
                                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 bg-zinc-50 p-4 rounded-[2rem] border-2 border-zinc-100">
                                                {(editSection === 'products' ? PRODUCT_THEMES : ADMIN_COLORS).map((c: any) => {
                                                    // Unify variable access since products use .value and team uses .class
                                                    const themeValue = c.value || c.class;
                                                    const isActive = editItem.color === themeValue;

                                                    return (
                                                        <button
                                                            key={themeValue}
                                                            type="button"
                                                            onClick={() => setEditItem({ ...editItem, color: themeValue })}
                                                            className={`group relative flex flex-col items-center gap-2 p-2 rounded-2xl border-2 transition-all ${isActive
                                                                ? 'border-black bg-white shadow-sm scale-105'
                                                                : 'border-transparent hover:bg-zinc-100 opacity-70 hover:opacity-100'
                                                                }`}
                                                        >
                                                            {/* Color Swatch */}
                                                            <div
                                                                className="w-full h-10 rounded-xl border border-black/10 shadow-inner"
                                                                style={{ backgroundColor: c.hex }}
                                                            />

                                                            {/* Theme Name Label */}
                                                            <span className={`text-[10px] font-black uppercase truncate w-full text-center ${isActive ? 'text-black' : 'text-zinc-500'
                                                                }`}>
                                                                {c.name}
                                                            </span>

                                                            {/* Active State Indicator */}
                                                            {isActive && (
                                                                <div className="absolute -top-1 -right-1 bg-black text-white rounded-full p-0.5 shadow-md">
                                                                    <Check size={10} strokeWidth={4} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <p className="text-[10px] font-mono font-black text-zinc-400 ml-1 uppercase">
                                                Active Theme: <span className="text-black">{editItem.color || 'None'}</span>
                                            </p>
                                        </div>
                                    );
                                }

                                if (key === 'text_color' && (editSection === 'services' || editSection === 'team' || editSection === 'projects')) {
                                    return (
                                        <div key={key} className="space-y-4">
                                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest ml-1">Text Contrast</label>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditItem({ ...editItem, text_color: 'text-black' })}
                                                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${editItem.text_color === 'text-black' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-black border-zinc-100'}`}
                                                >
                                                    Dark Text
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditItem({ ...editItem, text_color: 'text-white' })}
                                                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${editItem.text_color === 'text-white' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-black border-zinc-100'}`}
                                                >
                                                    Light Text
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }

                                const isLongText = key === 'description' || key === 'content' || key === 'quote' || key === 'text' || key === 'short_desc' || key === 'desc';
                                const value = editItem[key];

                                if (Array.isArray(value)) {
                                    return (
                                        <div key={key} className="md:col-span-2">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">{key.replace(/_/g, ' ')} (One per line)</label>
                                            <textarea
                                                name={key}
                                                rows={4}
                                                defaultValue={value.join('\n')}
                                                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 font-medium focus:outline-none focus:border-black focus:bg-white transition-colors"
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key} className={isLongText ? "md:col-span-2" : ""}>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">{key.replace(/_/g, ' ')}</label>
                                        {isLongText ? (
                                            <textarea
                                                name={key}
                                                rows={3}
                                                defaultValue={value}
                                                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 font-medium focus:outline-none focus:border-black focus:bg-white transition-colors"
                                            />
                                        ) : (
                                            <input
                                                name={key}
                                                type={key.includes('url') ? 'url' : key === 'rating' ? 'number' : 'text'}
                                                defaultValue={value}
                                                className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 font-medium focus:outline-none focus:border-black focus:bg-white transition-colors"
                                            />
                                        )}
                                    </div>
                                );
                            })}

                            {/* Special handling for sub_services array of objects */}
                            {editItem.sub_services && (
                                <div className="md:col-span-2 space-y-6">
                                    <div className="flex justify-between items-center border-b-2 border-zinc-100 pb-2">
                                        <label className="block text-xs font-black text-zinc-500 uppercase">Sub Services (Dynamic Icons)</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSub = { title: 'New Feature', desc: 'Description here', points: ['Benefit 1'] };
                                                setEditItem({ ...editItem, sub_services: [...editItem.sub_services, newSub] });
                                            }}
                                            className="text-xs bg-black text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#bef264] hover:text-black transition-colors"
                                        >
                                            + Add Feature
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {editItem.sub_services.map((sub: any, sIdx: number) => (
                                            <div key={sIdx} className="p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-100 relative group/sub">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newArr = [...editItem.sub_services];
                                                        newArr.splice(sIdx, 1);
                                                        setEditItem({ ...editItem, sub_services: newArr });
                                                    }}
                                                    className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 opacity-0 group-hover/sub:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-white p-2 rounded-lg border border-zinc-200 text-zinc-400 group-hover/sub:text-black transition-colors">
                                                        {getSmartIcon(sub.title, 20)}
                                                    </div>
                                                    <input
                                                        placeholder="Feature Title"
                                                        value={sub.title}
                                                        onChange={(e) => {
                                                            const newArr = [...editItem.sub_services];
                                                            newArr[sIdx] = { ...sub, title: e.target.value };
                                                            setEditItem({ ...editItem, sub_services: newArr });
                                                        }}
                                                        className="flex-1 bg-white border border-zinc-200 p-2 rounded-lg font-bold text-sm focus:outline-none focus:border-black"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Feature Description"
                                                    value={sub.desc}
                                                    rows={2}
                                                    onChange={(e) => {
                                                        const newArr = [...editItem.sub_services];
                                                        newArr[sIdx] = { ...sub, desc: e.target.value };
                                                        setEditItem({ ...editItem, sub_services: newArr });
                                                    }}
                                                    className="w-full bg-white border border-zinc-200 p-2 rounded-lg text-xs focus:outline-none focus:border-black"
                                                />
                                                <textarea
                                                    placeholder="Points (One per line)"
                                                    value={Array.isArray(sub.points) ? sub.points.join('\n') : ''}
                                                    rows={2}
                                                    onChange={(e) => {
                                                        const newArr = [...editItem.sub_services];
                                                        newArr[sIdx] = { ...sub, points: e.target.value.split('\n').filter((p: string) => p.trim()) };
                                                        setEditItem({ ...editItem, sub_services: newArr });
                                                    }}
                                                    className="w-full bg-white border border-zinc-200 p-2 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="pt-6 border-t border-zinc-100 flex gap-4">
                            <button type="button" onClick={closeEditor} className="w-1/3 py-4 bg-white text-black font-bold rounded-xl border-2 border-zinc-200 hover:bg-zinc-50 transition-all">Cancel</button>
                            <button type="submit" className="w-2/3 py-4 bg-black text-white font-bold rounded-xl hover:bg-[#bef264] hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-1">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderHome = () => (
        <div className="space-y-8 animate-in fade-in">
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black">Featured Projects</h3>
                    <button
                        onClick={() => {
                            setEditItem({ name: '', url: '', description: '', color: 'bg-blue-500', image: '' });
                            setEditSection('projects');
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                        <Plus size={18} /> Add Project
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(p => renderCard(p, 'projects'))}
                </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black">Client Stories</h3>
                    <button
                        onClick={() => {
                            setEditItem({ name: '', role: '', rating: 5, text: '' });
                            setEditSection('testimonials');
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                        <Plus size={18} /> Add Review
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map(t => renderCard(t, 'testimonials'))}
                </div>
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black">Team Members</h3>
                <button
                    onClick={() => {
                        setEditItem({ name: '', role: '', quote: '', image: '', color: 'bg-green-400' });
                        setEditSection('team');
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Add Member
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map(t => renderCard(t, 'team'))}
            </div>
        </div>
    );

    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 4) {
            alert("Password too short");
            return;
        }
        sessionStorage.setItem('admin_password', newPassword);
        setNewPassword('');
        alert("Password Updated Successfully!");
    };

    const renderSettings = () => (
        <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] mt-8 animate-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-8 border-b-2 border-zinc-100 pb-6">
                <div className="p-3 bg-zinc-100 rounded-xl">
                    <SettingsIcon size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-black">Security</h2>
                    <p className="text-zinc-500 text-sm font-bold">Manage your admin access</p>
                </div>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-zinc-500 uppercase mb-2 ml-1">New Password</label>
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (digits/text)"
                        className="w-full bg-zinc-50 border-2 border-zinc-200 p-5 rounded-xl font-bold text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                    />
                    <p className="text-xs text-zinc-400 mt-2 ml-1 font-medium">Use a mix of numbers and letters for better security.</p>
                </div>
                <button type="submit" className="w-full py-5 bg-black text-white font-black text-lg rounded-xl hover:bg-[#bef264] hover:text-black border-2 border-black transition-all shadow-md hover:shadow-none hover:translate-y-1">
                    UPDATE PASSWORD
                </button>
            </form>
        </div>
    );

    const [searchTerm, setSearchTerm] = useState('');

    const renderDataTable = (dataArray: any[], title: string, emptyMsg: string) => {
        const filteredData = dataArray.filter(item =>
            (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return (
            <div className="bg-white border-2 border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col h-full max-h-[800px] animate-in fade-in">
                <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="font-black text-2xl text-black flex items-center gap-3">
                        {title} <span className="text-xs font-bold bg-zinc-200 text-zinc-600 px-3 py-1 rounded-full">{filteredData.length}</span>
                    </h3>
                    <div className="relative w-full sm:w-64">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border-2 border-zinc-200 rounded-xl pl-12 pr-4 py-3 font-medium text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                </div>
                <div className="overflow-y-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white text-zinc-400 font-bold uppercase text-[10px] tracking-wider sticky top-0 z-10 border-b border-zinc-100">
                            <tr>
                                <th className="p-5">Date</th>
                                <th className="p-5">Details</th>
                                <th className="p-5">Contact</th>
                                <th className="p-5">Message/Context</th>
                                <th className="p-5">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group">
                                    <td className="p-5 whitespace-nowrap text-zinc-400 font-mono text-xs">
                                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="p-5">
                                        <div className="font-bold text-black">{item.name}</div>
                                        {item.id && <div className="text-[10px] text-zinc-400 mt-1">ID: {String(item.id).slice(0, 8)}...</div>}
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col gap-1">
                                            <a href={`mailto:${item.email}`} className="text-sm font-medium text-blue-600 hover:underline">{item.email}</a>
                                            <span className="text-xs text-zinc-500">{item.phone || item.number}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 max-w-xs">
                                        <div className="text-sm text-zinc-700 font-medium line-clamp-2" title={item.message || item.description || item.product_name || item.service_name}>
                                            {item.message || item.description || item.product_name || item.service_name}
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <button
                                            onClick={() => setDeleteConfirm({ table: title.includes('Demo') ? 'demo_requests' : title.includes('Product') ? 'explore_leads' : 'contact_submissions', id: item.id })}
                                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-zinc-400 font-medium">{emptyMsg}</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="text-2xl font-bold text-zinc-400 animate-pulse">Loading Data...</div>
                </div>
            );
        }

        switch (activeTab) {
            case 'Dashboard': return renderDashboard();
            case 'Home': return renderHome();
            case 'About': return renderAbout();
            case 'Products': return renderList(products, 'name', 'products');
            case 'Services': return renderList(services, 'title', 'services');
            case 'Blogs': return renderList(blogs, 'title', 'blogs');
            case 'Demo Request': return renderDataTable(demos, 'Demo Requests', 'No demo requests found.');
            case 'Explore Product': return renderDataTable(explores, 'Product Interests', 'No explore requests found.');
            case 'Contact Request': return renderDataTable(contacts, 'Contact Messages', 'No contact messages found.');
            case 'Settings': return renderSettings();
            default: return renderDashboard();
        }
    };

    return (
        <div className="flex h-screen bg-zinc-50 font-sans text-black relative">
            {renderEditor()}

            {/* Delete Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white border-4 border-red-500 rounded-3xl w-full max-w-sm p-8 text-center animate-in zoom-in shadow-2xl relative">
                        <button onClick={() => setDeleteConfirm(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-black"><X size={20} /></button>
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-black mb-2">Delete Item?</h3>
                        <p className="text-zinc-500 font-bold mb-8">This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 bg-zinc-100 font-bold rounded-xl hover:bg-zinc-200 text-black transition-colors">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 font-bold rounded-xl text-white hover:bg-red-600 shadow-lg transition-colors">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Mobile Toggle */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute top-6 left-6 z-30 p-3 bg-black text-white rounded-full shadow-lg md:hidden"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-zinc-900 text-white flex flex-col p-6 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-zinc-800`}>
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#bef264] rounded-xl flex items-center justify-center text-black">
                            <Activity size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="font-black text-xl tracking-tighter block leading-none">Pixel</span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Admin</span>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar pr-2">
                    {menuItems.map((item: any, idx) => {
                        if (item.type === 'header') {
                            return <div key={idx} className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-8 mb-3 px-4">{item.label}</div>;
                        }
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                                className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition-all flex items-center gap-3 text-sm ${activeTab === item.id
                                    ? 'bg-[#bef264] text-black shadow-[0_4px_12px_rgba(190,242,100,0.3)]'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} /> {item.id}
                            </button>
                        );
                    })}
                </nav>

                <Link href="/" className="flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors mt-4">
                    <ExternalLink size={20} /> View Website
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-colors mt-2 mb-2">
                    <LogOut size={20} /> Logout Account
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-72 p-4 md:p-10 overflow-y-auto h-full pt-20 md:pt-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight">{activeTab}</h1>
                        <p className="text-zinc-400 font-bold mt-1 text-sm uppercase tracking-widest">Pixel Admin Dashboard • v2.0</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative group/notif">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${showNotifications ? 'bg-black text-[#bef264] border-black shadow-lg scale-105' : 'bg-white text-zinc-500 border-zinc-100 hover:border-black hover:text-black'}`}
                            >
                                <Bell size={24} className={notifications.length > 0 ? 'animate-bounce-slow' : ''} />
                                {notifications.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-4 border-white animate-pulse"></span>}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-[2rem] border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)] p-6 z-[100] animate-in slide-in-from-bottom-4">
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-zinc-50">
                                        <h4 className="font-black text-xl">Inbox</h4>
                                        <button onClick={() => setNotifications([])} className="text-[10px] bg-zinc-100 hover:bg-black hover:text-white px-3 py-1 rounded-full font-black uppercase tracking-widest transition-all">Clear</button>
                                    </div>
                                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="text-center py-10">
                                                <div className="bg-zinc-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-zinc-300">
                                                    <Bell size={32} />
                                                </div>
                                                <p className="text-sm text-zinc-400 font-black uppercase tracking-widest">Peace and Quiet 🎐</p>
                                            </div>
                                        ) : (
                                            notifications.map((n, i) => (
                                                <div key={n.id || i} className="p-4 bg-zinc-50/50 rounded-2xl border-2 border-zinc-100 hover:border-black transition-all cursor-pointer group/item">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-70">{n.type}</span>
                                                        <span className="text-[10px] font-bold text-zinc-400">{n.time}</span>
                                                    </div>
                                                    <p className="text-sm text-black font-black leading-tight group-hover/item:text-blue-600 transition-colors">{n.title}</p>
                                                    <p className="text-[10px] text-zinc-500 mt-1 font-bold truncate">{n.message}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3 bg-white pr-6 pl-2 py-2 rounded-2xl border-2 border-zinc-100 shadow-sm">
                            <div className="w-10 h-10 bg-black text-[#bef264] rounded-xl flex items-center justify-center font-black text-lg border-2 border-black">A</div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-black text-black leading-none">Admin User</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Super Admin</p>
                            </div>
                            <button onClick={handleLogout} className="ml-2 p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </header>
                {renderContent()}
            </div>
        </div>
    );
}
