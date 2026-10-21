'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, Instagram, Facebook, Linkedin, Globe, ArrowRight } from '../icons';
import { siteConfig } from '@/lib/constants';
import InteractiveRobot from './InteractiveRobot';

export default function Footer() {
    const pathname = usePathname();

    return (
        <div className="bg-black pt-4 sm:pt-6">
            {/* ========================================================
                1. PRE-FOOTER CTA BANNER (DISPLAYED ACROSS ALL PAGES)
               ======================================================== */}
            <div className="max-w-7xl mx-auto px-4 mb-16 sm:mb-20">
                <div className="bg-zinc-950 border border-zinc-800/90 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl backdrop-blur-md">
                    {/* Ambient subtle glow */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#bef264]/10 rounded-full blur-[140px] pointer-events-none" />
                    
                    {/* Subtle grid background pattern */}
                    <div 
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        {/* Left Side: Robot Image & Headline */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 flex-1">
                            {/* Interactive 2D Robot Mascot */}
                            <InteractiveRobot compact={true} />

                            {/* Copy & Headline */}
                            <div className="space-y-3 max-w-2xl">
                                <div className="inline-flex">
                                    <span className="px-3.5 py-1 rounded-full bg-[#bef264] text-black font-mono text-[11px] font-black tracking-widest uppercase shadow-[0_0_12px_rgba(190,242,100,0.3)]">
                                        LET'S BUILD TOGETHER
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-[1.1]">
                                    GREAT IDEAS DESERVE <br className="hidden sm:block" />
                                    A GREAT <span className="text-[#bef264]">TECHNOLOGY PARTNER.</span>
                                </h2>

                                <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed">
                                    Have a project, product idea or a bigger vision? Let's build it together.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-7 py-4 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:bg-[#bef264] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                <span>START A PROJECT</span>
                                <ArrowRight size={16} />
                            </Link>

                            <Link
                                href="tel:+919778803677"
                                className="w-full sm:w-auto px-7 py-4 bg-black border border-zinc-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl hover:border-zinc-600 transition-all text-center hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                TALK TO PIXEL
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================
                2. MAIN FOOTER
               ======================================================== */}
            <footer className="bg-black border-t border-zinc-900 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-zinc-900 pb-16">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-8 group w-fit">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img
                                        src="/images/logo-white.png"
                                        alt="Pixel WebPages Logo"
                                        className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-white font-black text-2xl tracking-tighter uppercase">
                                    PIXEL WEBPAGES
                                </span>
                            </Link>
                            <p className="text-zinc-400 font-bold text-lg max-w-sm mb-10 leading-relaxed">
                                Empowering your business to reach new heights and reinvent your brand with innovative tech solutions.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                <a
                                    href={siteConfig.links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#c084fc] hover:text-black hover:border-black transition-all active:scale-90"
                                >
                                    <Instagram size={20} />
                                </a>
                                <a
                                    href={siteConfig.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#bef264] hover:text-black hover:border-black transition-all active:scale-90"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href={siteConfig.links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#60a5fa] hover:text-black hover:border-black transition-all active:scale-90"
                                >
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Contact Us Column */}
                        <div>
                            <h3 className="text-white font-black mb-8 uppercase tracking-widest text-sm border-b border-zinc-900 pb-3 inline-block">
                                Contact Us
                            </h3>
                            <ul className="space-y-6">
                                <li className="group cursor-pointer">
                                    <a
                                        href="tel:+919778803677"
                                        className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors font-bold"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#bef264] group-hover:bg-[#bef264] group-hover:text-black transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <span>+91 9778803677</span>
                                    </a>
                                </li>
                                <li className="group cursor-pointer">
                                    <a
                                        href="mailto:pixelwebpages@gmail.com"
                                        className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors font-bold"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#bef264] group-hover:bg-[#bef264] group-hover:text-black transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <span>pixelwebpages@gmail.com</span>
                                    </a>
                                </li>
                                <li className="flex items-start gap-4 text-zinc-400 font-bold group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-[#bef264] shrink-0">
                                        <Globe size={18} />
                                    </div>
                                    <span className="pt-2">Cuttack, Odisha, India</span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div>
                            <h3 className="text-white font-black mb-8 uppercase tracking-widest text-sm border-b border-zinc-900 pb-3 inline-block">
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/work" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Our Work
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/case-studies" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Case Studies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Our Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blogs" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-zinc-500 hover:text-[#bef264] transition-colors font-bold block">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-zinc-600 font-bold text-sm">
                            © {new Date().getFullYear()} Pixel WebPages. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-zinc-600 font-bold text-sm">
                            Designed with <span className="text-red-500 animate-pulse">♥</span> in India
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
