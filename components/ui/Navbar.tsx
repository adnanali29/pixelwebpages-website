'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from '../icons';
import { navItems } from '@/lib/constants';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-lg border-b border-zinc-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Box */}
                    <Link href="/" className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform">
                        <div className="w-10 h-10 flex items-center justify-center relative">
                            <img
                                src="/images/logo-white.png"
                                alt="Pixel WebPages Logo"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-white font-black text-xl tracking-tighter uppercase">
                            PIXEL WEBPAGES
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1 bg-zinc-950/90 border border-zinc-800/80 px-2 py-1.5 rounded-full shadow-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 whitespace-nowrap ${isActive(item.href)
                                    ? 'text-black bg-[#bef264] shadow-[0_0_12px_rgba(190,242,100,0.4)]'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                                    }`}
                            >
                                {item.text}
                            </Link>
                        ))}
                    </div>

                    {/* Right CTA: START A PROJECT */}
                    <div className="hidden lg:flex items-center">
                        <Link
                            href="/contact"
                            className="px-5 py-2.5 bg-white text-black text-xs font-black uppercase tracking-wider rounded-full hover:bg-[#bef264] transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(190,242,100,0.4)] flex items-center gap-1.5 group active:scale-95"
                        >
                            Start A Project
                            <span className="text-sm font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isOpen && (
                    <div className="lg:hidden py-4 border-t border-zinc-900 animate-in fade-in slide-in-from-top-2">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${isActive(item.href)
                                        ? 'bg-[#bef264] text-black font-black'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                        }`}
                                >
                                    {item.text}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 text-center py-3 bg-white text-black font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#bef264] transition-colors"
                            >
                                Start A Project ↗
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
