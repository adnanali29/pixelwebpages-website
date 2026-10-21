'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface TechHeroHeadingProps {
    lines: TextPart[][];
    className?: string;
    startDelay?: number;
}

export default function TechHeroHeading({
    lines,
    className = '',
}: TechHeroHeadingProps) {
    const [mounted, setMounted] = useState(false);
    const [glitchCount, setGlitchCount] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    let globalCounter = 0;

    return (
        <h1
            onMouseEnter={() => setGlitchCount((c) => c + 1)}
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.92] select-none cursor-pointer group relative`}
        >
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap relative overflow-hidden py-0.5">
                    {lineParts.map((part, partIdx) => {
                        const chars = Array.from(part.text);
                        return (
                            <span
                                key={partIdx}
                                className={part.highlight ? 'text-[#bef264]' : 'text-white'}
                            >
                                {chars.map((char, cIdx) => {
                                    if (char === ' ') {
                                        return (
                                            <span key={cIdx} className="inline-block" style={{ width: '0.3em' }}>
                                                &nbsp;
                                            </span>
                                        );
                                    }

                                    const delay = (globalCounter++) * 25;

                                    return (
                                        <span
                                            key={`${glitchCount}-${lineIdx}-${partIdx}-${cIdx}`}
                                            className="inline-block transition-all duration-700 ease-out"
                                            style={{
                                                opacity: mounted ? 1 : 0.95,
                                                transform: 'translateY(0px)',
                                                transitionDelay: `${delay}ms`,
                                                textShadow: part.highlight
                                                    ? '0 0 25px rgba(190, 242, 100, 0.45)'
                                                    : '0 0 20px rgba(255, 255, 255, 0.15)',
                                            }}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                            </span>
                        );
                    })}
                </div>
            ))}
        </h1>
    );
}
