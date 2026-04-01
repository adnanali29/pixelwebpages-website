'use client';

import { useEffect, useState } from 'react';
import { getBlogs } from '@/lib/actions';
import { Calendar, X } from '@/components/icons';
import type { Blog } from '@/lib/types';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl md:text-8xl font-black text-white mb-12">
                    OUR <span className="text-[#bef264]">BLOGS.</span>
                </h1>
                <p className="text-zinc-400 text-xl mb-16 max-w-2xl">
                    Insights, trends, and strategies to keep you ahead in the digital world.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            onClick={() => setActiveBlog(blog)}
                            className="group cursor-pointer active:scale-95 transition-transform"
                        >
                            <div className={`h-64 ${blog.color} rounded-[2rem] mb-6 border-4 border-black relative overflow-hidden shadow-[8px_8px_0px_0px_#fff] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex gap-3 text-xs font-bold text-[#bef264] uppercase tracking-wider mb-3">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.tag}</span>
                            </div>
                            <h3 className="text-2xl font-black text-white group-hover:text-[#bef264] transition-colors leading-tight">
                                {blog.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Modal */}
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
