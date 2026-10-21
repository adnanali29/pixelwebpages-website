'use client';

import { useEffect, useState, useMemo } from 'react';
import { getBlogs } from '@/lib/actions';
import { Calendar, X, Search, ArrowRight } from '@/components/icons';
import DataStreamHeading from '@/components/ui/DataStreamHeading';
import type { Blog } from '@/lib/types';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await getBlogs();
            if (data) {
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Extract dynamic category tags from existing blogs
    const categories = useMemo(() => {
        const set = new Set<string>();
        set.add('All Articles');
        blogs.forEach((b) => {
            if (b.tag && b.tag.trim()) {
                set.add(b.tag.trim());
            }
        });
        // If there are few tags, ensure standard ones exist
        ['Design', 'Development', 'Strategy', 'Business'].forEach(t => {
            if (set.size < 5) set.add(t);
        });
        return Array.from(set);
    }, [blogs]);

    // Live search & category filter
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const query = searchQuery.toLowerCase().trim();

            const matchesQuery = !query ||
                blog.title.toLowerCase().includes(query) ||
                (blog.tag && blog.tag.toLowerCase().includes(query)) ||
                (blog.content && blog.content.toLowerCase().includes(query)) ||
                (blog.date && blog.date.toLowerCase().includes(query));

            const matchesCategory =
                selectedCategory === 'All Articles' ||
                (blog.tag && blog.tag.toLowerCase() === selectedCategory.toLowerCase());

            return matchesQuery && matchesCategory;
        });
    }, [blogs, searchQuery, selectedCategory]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Loading articles...</div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-28 sm:pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen relative overflow-hidden space-y-14 font-sans">
                {/* Ambient Glows */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

                {/* ========================================================
                    1. HERO SECTION (CENTER-ALIGNED LIKE PRODUCT & WORK)
                   ======================================================== */}
                <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex">
                        <span className="px-4 py-1.5 rounded-full bg-[#bef264] text-black font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                            OUR ARTICLES & INSIGHTS
                        </span>
                    </div>

                    <DataStreamHeading
                        className="text-4xl sm:text-6xl md:text-7xl"
                        lines={[
                            [{ text: 'IDEAS, TRENDS & ' }],
                            [{ text: 'DIGITAL STRATEGIES.', highlight: true }]
                        ]}
                    />

                    <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        In-depth insights, architecture patterns, design principles, and strategies to keep your brand ahead in a fast-evolving digital world.
                    </p>
                </section>

                {/* ========================================================
                    2. CATEGORY FILTER & LIVE SEARCH BAR (EXACT SCREENSHOT STYLE)
                   ======================================================== */}
                <section className="relative z-10 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/90 border border-zinc-800/90 p-2 sm:p-2.5 rounded-3xl md:rounded-full shadow-2xl backdrop-blur-md">
                        {/* Category Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto px-2 py-1 no-scrollbar">
                            {categories.map((cat) => (
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
                                placeholder="Search articles, keywords..."
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
                    3. BLOG ARTICLES GRID
                   ======================================================== */}
                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                onClick={() => setActiveBlog(blog)}
                                className="group cursor-pointer active:scale-95 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className={`h-64 ${blog.color || 'bg-zinc-900'} rounded-[2rem] mb-6 border-4 border-black relative overflow-hidden shadow-[8px_8px_0px_0px_#fff] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[#bef264] rounded-full text-[11px] font-bold uppercase tracking-wider border border-zinc-800">
                                                {blog.tag || 'Insight'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 text-xs font-bold text-[#bef264] uppercase tracking-wider mb-2">
                                        <span>{blog.date}</span>
                                        <span>•</span>
                                        <span>5 min read</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white group-hover:text-[#bef264] transition-colors leading-tight mb-3">
                                        {blog.title}
                                    </h3>
                                    {blog.content && (
                                        <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                                            {blog.content}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                                    <span>Read Article</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative z-10 py-16 text-center bg-zinc-950/80 border border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mx-auto mb-4">
                            <Search size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-zinc-400 text-sm mb-6">
                            No articles matching <span className="text-[#bef264] font-semibold">"{searchQuery}"</span>. Try adjusting your search query or reset category filter.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All Articles');
                            }}
                            className="px-6 py-2.5 bg-[#bef264] text-black font-bold text-xs rounded-full uppercase tracking-wider hover:bg-white transition-all shadow-md active:scale-95"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* ========================================================
                4. BLOG MODAL POPUP
               ======================================================== */}
            {activeBlog && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setActiveBlog(null)}
                            className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:scale-110 transition-transform z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="h-64 md:h-80 w-full relative">
                            <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                        </div>

                        <div className="p-8 md:p-12">
                            <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 text-black ${activeBlog.color || 'bg-white'}`}>
                                {activeBlog.tag}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                {activeBlog.title}
                            </h2>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8 border-b border-zinc-800 pb-8">
                                <Calendar size={16} />
                                <span>{activeBlog.date}</span>
                                <span className="mx-2">•</span>
                                <span>5 min read</span>
                            </div>
                            <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
                                <p className="leading-relaxed whitespace-pre-line">{activeBlog.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
