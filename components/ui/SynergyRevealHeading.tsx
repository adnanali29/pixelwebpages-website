'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface SynergyRevealHeadingProps {
    lines: TextPart[][];
    className?: string;
    startDelay?: number;
}

export default function SynergyRevealHeading({
    lines,
    className = '',
    startDelay = 150,
}: SynergyRevealHeadingProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
            setTimeout(() => setIsPulsing(true), 800);
        }, startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    let globalCharIndex = 0;

    return (
        <h1
            onMouseEnter={() => {
                setIsPulsing(false);
                setTimeout(() => setIsPulsing(true), 50);
            }}
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.95] select-none cursor-default group`}
        >
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap py-0.5">
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

                                    const delay = isMounted ? globalCharIndex++ * 30 : 0;
                                    return (
                                        <span
                                            key={cIdx}
                                            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                            style={{
                                                opacity: isMounted ? 1 : 0,
                                                transform: isMounted ? 'scale(1) translateY(0px)' : 'scale(0.8) translateY(20px)',
                                                filter: isMounted ? 'blur(0px)' : 'blur(5px)',
                                                transitionDelay: `${delay}ms`,
                                            }}
                                        >
                                            <span className={`inline-block ${isPulsing && part.highlight ? 'drop-shadow-[0_0_12px_rgba(190,242,100,0.5)]' : ''}`}>
                                                {char}
                                            </span>
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
