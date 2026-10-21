'use client';

import React, { useEffect, useState, useRef } from 'react';

interface InteractiveRobotProps {
    compact?: boolean;
}

export default function InteractiveRobot({ compact = false }: InteractiveRobotProps) {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
    const [floatY, setFloatY] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
    const requestRef = useRef<number | null>(null);

    // Track mouse position across window
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const normX = (event.clientX - innerWidth / 2) / (innerWidth / 2);
            const normY = (event.clientY - innerHeight / 2) / (innerHeight / 2);
            setMouseOffset({ x: normX, y: normY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Physics smoothing loop & floating oscillation
    useEffect(() => {
        let startTime = performance.now();
        const animate = (time: number) => {
            setFloatY(Math.sin(time / 450) * (compact ? 3 : 5));
            setSmoothPos((prev) => {
                const ease = 0.08;
                return {
                    x: prev.x + (mouseOffset.x - prev.x) * ease,
                    y: prev.y + (mouseOffset.y - prev.y) * ease,
                };
            });
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mouseOffset, compact]);

    // Natural blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 160);
        }, 3600 + Math.random() * 2000);

        return () => clearInterval(blinkInterval);
    }, []);

    const rotateY = smoothPos.x * (compact ? 12 : 20); // 3D tilt left-right
    const rotateX = -smoothPos.y * (compact ? 10 : 16); // 3D tilt up-down
    const eyeOffsetX = smoothPos.x * (compact ? 5 : 12);
    const eyeOffsetY = smoothPos.y * (compact ? 4 : 10);

    if (compact) {
        return (
            <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0 flex items-center justify-center select-none"
                style={{ perspective: '800px' }}
            >
                {/* Ambient Neon Lime Glow */}
                <div
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(190,242,100,0.35),_transparent_70%)] blur-[25px] pointer-events-none"
                    style={{
                        transform: `translate(${smoothPos.x * 8}px, ${smoothPos.y * 8}px)`,
                    }}
                />

                {/* Floating 3D Container */}
                <div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform duration-75 ease-out"
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatY}px)`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Top Antenna */}
                    <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-zinc-600 rounded-full flex flex-col items-center justify-start z-10 shadow-md"
                        style={{ transform: 'translateZ(6px)' }}
                    >
                        {/* Red glowing bulb */}
                        <div className="w-3.5 h-3.5 bg-red-500 rounded-full -mt-2 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.9)] border border-red-300" />
                    </div>

                    {/* Robot Head Body */}
                    <div
                        className="w-full h-full bg-white rounded-[1.4rem] sm:rounded-[1.6rem] border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center relative overflow-hidden"
                        style={{ transform: 'translateZ(15px)' }}
                    >
                        {/* Visor Screen */}
                        <div className="w-[84%] h-[68%] bg-black rounded-[0.9rem] sm:rounded-[1.1rem] flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden border-2 border-zinc-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
                            {/* CRT scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] z-10 bg-[length:100%_2px,2px_100%] pointer-events-none" />

                            {/* Left Eye */}
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                                <div
                                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 bg-blue-500 rounded-full shadow-[0_0_6px_#3b82f6] transition-all duration-100 flex items-center justify-center ${
                                        isBlinking ? 'scale-y-0 h-0.5' : 'scale-y-100'
                                    }`}
                                    style={{
                                        transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                                    }}
                                >
                                    <div className="w-1 h-1 bg-white rounded-full -translate-x-0.5 -translate-y-0.5" />
                                </div>
                            </div>

                            {/* Right Eye */}
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                                <div
                                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 bg-blue-500 rounded-full shadow-[0_0_6px_#3b82f6] transition-all duration-100 flex items-center justify-center ${
                                        isBlinking ? 'scale-y-0 h-0.5' : 'scale-y-100'
                                    }`}
                                    style={{
                                        transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                                    }}
                                >
                                    <div className="w-1 h-1 bg-white rounded-full -translate-x-0.5 -translate-y-0.5" />
                                </div>
                            </div>

                            {/* Cute mouth bar */}
                            <div className="absolute bottom-1.5 w-3.5 h-0.5 bg-zinc-700 rounded-full" />
                        </div>

                        {/* Subtle Cheek Blush */}
                        <div className="absolute bottom-2.5 left-2 w-2 h-2 bg-pink-300 rounded-full opacity-60 blur-xs" />
                        <div className="absolute bottom-2.5 right-2 w-2 h-2 bg-pink-300 rounded-full opacity-60 blur-xs" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative w-full max-w-[380px] h-[380px] sm:max-w-[420px] sm:h-[420px] mx-auto flex items-center justify-center select-none"
            style={{ perspective: '1100px' }}
        >
            {/* Ambient Neon Lime & Emerald Aura Glow */}
            <div
                className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(190,242,100,0.3),_transparent_70%)] blur-[70px] pointer-events-none transition-all duration-500"
                style={{
                    transform: `translate(${smoothPos.x * 25}px, ${smoothPos.y * 25}px)`,
                }}
            />

            {/* Floating 3D Assembly Container */}
            <div
                className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center transition-transform duration-75 ease-out"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatY}px)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* MAIN ROBOT CHARACTER */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    {/* Top Antenna */}
                    <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-3.5 h-14 bg-zinc-600 rounded-full flex flex-col items-center justify-start z-10 shadow-md"
                        style={{ transform: 'translateZ(10px)' }}
                    >
                        {/* Red glowing bulb */}
                        <div className="w-7 h-7 bg-red-500 rounded-full -mt-3.5 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.9),0_0_40px_rgba(239,68,68,0.5)] border-2 border-red-300" />
                    </div>

                    {/* Robot Head Body */}
                    <div
                        className="w-full h-full bg-white rounded-[3.2rem] border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200"
                        style={{ transform: 'translateZ(25px)' }}
                    >
                        {/* Visor Screen */}
                        <div className="w-[84%] h-[68%] bg-black rounded-[2.2rem] flex items-center justify-center gap-6 relative overflow-hidden border-4 border-zinc-900 shadow-[inset_0_4px_20px_rgba(0,0,0,0.9)]">
                            {/* CRT scanlines effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                            {/* Left Eye */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                                <div
                                    className={`w-9 h-9 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6] transition-all duration-100 flex items-center justify-center ${
                                        isBlinking ? 'scale-y-0 h-1' : 'scale-y-100 h-9'
                                    }`}
                                    style={{
                                        transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                                    }}
                                >
                                    <div className="w-3.5 h-3.5 bg-white rounded-full -translate-x-1 -translate-y-1" />
                                </div>
                            </div>

                            {/* Right Eye */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                                <div
                                    className={`w-9 h-9 bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6] transition-all duration-100 flex items-center justify-center ${
                                        isBlinking ? 'scale-y-0 h-1' : 'scale-y-100 h-9'
                                    }`}
                                    style={{
                                        transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`,
                                    }}
                                >
                                    <div className="w-3.5 h-3.5 bg-white rounded-full -translate-x-1 -translate-y-1" />
                                </div>
                            </div>

                            {/* Cute mouth bar */}
                            <div className="absolute bottom-4 w-10 h-1.5 bg-zinc-700 rounded-full" />
                        </div>

                        {/* Subtle Cheek Blush */}
                        <div className="absolute bottom-8 left-8 w-5 h-5 bg-pink-300 rounded-full opacity-60 blur-xs" />
                        <div className="absolute bottom-8 right-8 w-5 h-5 bg-pink-300 rounded-full opacity-60 blur-xs" />
                    </div>
                </div>
            </div>
        </div>
    );
}
