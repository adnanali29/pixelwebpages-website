import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Instagram, Facebook, Linkedin, Globe } from '../icons';
import { siteConfig } from '@/lib/constants';

export default function Footer() {
    return (
        <div className="bg-black pt-20">
            {/* CTA Section - "Have something in mind?" */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
                <div className="bg-[#bef264] rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] border-4 border-black transform hover:scale-[1.01] transition-transform duration-300">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-black mb-3 tracking-tighter">
                            Have something in mind?
                        </h2>
                        <p className="text-zinc-800 font-bold text-lg md:text-xl">
                            We might have missed it. Tell us!
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="mt-8 md:mt-0 px-10 py-5 bg-black text-white font-black text-xl rounded-2xl shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-y-1 active:scale-95 transition-all text-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black border-t border-zinc-900 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-zinc-900 pb-16">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-8 group w-fit">
                                <img
                                    src="https://i.ibb.co/MDRZ7svJ/1.png"
                                    alt="Pixel WebPages Logo"
                                    className="w-12 h-12 rounded-2xl object-contain border border-zinc-800 bg-black group-hover:rotate-12 transition-transform"
                                />
                                <span className="text-white font-black text-2xl tracking-tighter group-hover:text-[#bef264] transition-colors">
                                    Pixel WebPages
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
                            Designed with <span className="text-red-500 animate-pulse">♥</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
