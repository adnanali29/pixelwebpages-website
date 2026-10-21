'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface RollingLetterHeadingProps {
    lines: TextPart[][];
    className?: string;
    delayPerChar?: number;
    startDelay?: number;
}

export default function RollingLetterHeading({
    lines,
    className = '',
    delayPerChar = 35,
    startDelay = 150,
}: RollingLetterHeadingProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [rollKey, setRollKey] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setRollKey(prev => prev + 1);
    };

    let globalCharIndex = 0;

    return (
        <h1
            onMouseEnter={handleMouseEnter}
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.95] cursor-default select-none`}
            style={{ perspective: '1000px' }}
        >
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap">
                    {lineParts.map((part, partIdx) => {
                        const chars = Array.from(part.text);
                        return (
                            <span
                                key={partIdx}
                                className={part.highlight ? 'text-[#bef264]' : 'text-white'}
                            >
                                {chars.map((char, charIdx) => {
                                    const currIndex = globalCharIndex++;
                                    const delay = isMounted ? currIndex * delayPerChar : 0;

                                    if (char === ' ') {
                                        return <span key={charIdx}> </span>;
                                    }

                                    return (
                                        <span
                                            key={`${rollKey}-${currIndex}`}
                                            className="inline-block overflow-hidden align-top"
                                            style={{
                                                height: '1.05em',
                                                verticalAlign: 'top',
                                            }}
                                        >
                                            <span
                                                className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                                style={{
                                                    transform: isMounted ? 'translateY(0%) rotateX(0deg)' : 'translateY(120%) rotateX(-90deg)',
                                                    transitionDelay: `${delay}ms`,
                                                    transformOrigin: '50% 100%',
                                                }}
                                            >
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
