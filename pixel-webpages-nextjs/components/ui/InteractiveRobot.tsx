'use client';

import { useEffect, useState } from 'react';
import { Code, Zap } from '@/components/icons';

export default function InteractiveRobot() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (event.clientX - innerWidth / 2) / 30;
            const y = (event.clientY - innerHeight / 2) / 30;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto animate-float scale-75 md:scale-100 origin-center">
            <div className="relative w-full h-full">
                {/* Antenna */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-16 bg-zinc-600 rounded-full flex flex-col items-center justify-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full -mt-4 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]" />
                </div>

                {/* Head */}
                <div className="w-full h-full bg-white rounded-[3rem] border-8 border-black shadow-[15px_15px_0px_0px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Screen */}
                    <div className="w-5/6 h-4/6 bg-black rounded-[2rem] flex items-center justify-center gap-6 relative overflow-hidden border-4 border-zinc-800">
                        {/* Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                        {/* Left Eye */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <div
                                className="w-8 h-8 bg-blue-500 rounded-full"
                                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                            />
                        </div>

                        {/* Right Eye */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <div
                                className="w-8 h-8 bg-blue-500 rounded-full"
                                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                            />
                        </div>

                        {/* Mouth */}
                        <div className="absolute bottom-8 w-12 h-2 bg-zinc-700 rounded-full" />
                    </div>
                    {/* Blush */}
                    <div className="absolute bottom-12 left-8 w-6 h-6 bg-pink-300 rounded-full opacity-50 blur-sm" />
                    <div className="absolute bottom-12 right-8 w-6 h-6 bg-pink-300 rounded-full opacity-50 blur-sm" />
                </div>

                {/* Left Arm */}
                <div className="absolute top-1/2 -left-16 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce-slow">
                    <Code size={24} className="text-black" />
                </div>
                {/* Right Arm */}
                <div className="absolute top-1/2 -right-16 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce-slow delay-75">
                    <Zap size={24} className="text-black" />
                </div>
            </div>
        </div>
    );
}
