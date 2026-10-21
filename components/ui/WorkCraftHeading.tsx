'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface WorkCraftHeadingProps {
    lines: TextPart[][];
    className?: string;
    startDelay?: number;
}

export default function WorkCraftHeading({
    lines,
    className = '',
    startDelay = 150,
}: WorkCraftHeadingProps) {
    const [isConstructed, setIsConstructed] = useState(false);
    const [craftKey, setCraftKey] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsConstructed(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    const handleReCraft = () => {
        setIsConstructed(false);
        setCraftKey(prev => prev + 1);
        setTimeout(() => setIsConstructed(true), 50);
    };

    let charCount = 0;

    return (
        <h1
            onMouseEnter={handleReCraft}
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.95] select-none cursor-pointer group`}
        >
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap overflow-hidden py-1">
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

                                    const delay = charCount++ * 25;
                                    return (
                                        <span
                                            key={`${craftKey}-${cIdx}`}
                                            className="inline-block transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                                            style={{
                                                opacity: isConstructed ? 1 : 0,
                                                transform: isConstructed
                                                    ? 'translateY(0px) rotate(0deg) scale(1)'
                                                    : 'translateY(100%) rotate(12deg) scale(0.7)',
                                                filter: isConstructed ? 'blur(0px)' : 'blur(5px)',
                                                transitionDelay: `${delay}ms`,
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
