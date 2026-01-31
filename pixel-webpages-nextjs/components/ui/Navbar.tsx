'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from '../icons';
import { navItems } from '@/lib/constants';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
                        <img
                            src="https://i.ibb.co/MDRZ7svJ/1.png"
                            alt="Pixel WebPages Logo"
                            className="w-10 h-10 rounded-xl object-contain group-hover:rotate-12 transition-transform"
                        />
                        <span className="text-white font-bold text-xl tracking-tighter">
                            Pixel WebPages
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 border-2 active:scale-95 ${isActive(item.href)
                                    ? 'text-black bg-[#bef264] border-[#bef264] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] -translate-y-0.5'
                                    : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-700'
                                    }`}
                            >
                                {item.text}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 rounded-full font-bold transition-all ${isActive(item.href)
                                        ? 'bg-[#bef264] text-black border-2 border-black'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border-2 border-transparent'
                                        }`}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
