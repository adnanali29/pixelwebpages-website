'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface DataStreamHeadingProps {
    lines: TextPart[][];
    className?: string;
    startDelay?: number;
}

export default function DataStreamHeading({
    lines,
    className = '',
    startDelay = 150,
}: DataStreamHeadingProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    let globalCharIndex = 0;

    return (
        <h1
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.95] relative select-none cursor-default group`}
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

                                    const delay = isMounted ? globalCharIndex++ * 28 : 0;
                                    return (
                                        <span
                                            key={cIdx}
                                            className="inline-block transition-all duration-600 ease-out"
                                            style={{
                                                opacity: isMounted ? 1 : 0,
                                                transform: isMounted ? 'translateY(0px) scale(1)' : 'translateY(16px) scale(0.95)',
                                                filter: isMounted ? 'blur(0px)' : 'blur(4px)',
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
