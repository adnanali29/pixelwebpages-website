'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface TypewriterHeadingProps {
    lines: TextPart[][];
    className?: string;
    speed?: number;
    startDelay?: number;
}

export default function TypewriterHeading({
    lines,
    className = '',
    speed = 38,
    startDelay = 200,
}: TypewriterHeadingProps) {
    // Flatten total text characters to track progress
    const totalChars = lines.reduce(
        (sum, line) => sum + line.reduce((lSum, part) => lSum + part.text.length, 0),
        0
    );

    const [charCount, setCharCount] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    useEffect(() => {
        setCharCount(0);
        setIsComplete(false);

        const startTimer = setTimeout(() => {
            let current = 0;
            const interval = setInterval(() => {
                current += 1;
                setCharCount(current);
                if (current >= totalChars) {
                    clearInterval(interval);
                    setIsComplete(true);
                }
            }, speed);

            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, [totalChars, speed, startDelay]);

    let runningCharIndex = 0;

    return (
        <h1 className={`${className} font-black uppercase tracking-tight text-white leading-[0.95]`}>
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block min-h-[1.05em]">
                    {lineParts.map((part, partIdx) => {
                        const partStart = runningCharIndex;
                        const partEnd = partStart + part.text.length;
                        runningCharIndex = partEnd;

                        if (charCount <= partStart) {
                            return null;
                        }

                        const visibleLength = Math.max(0, Math.min(part.text.length, charCount - partStart));
                        const visibleText = part.text.slice(0, visibleLength);

                        return (
                            <span
                                key={partIdx}
                                className={part.highlight ? 'text-[#bef264]' : 'text-white'}
                            >
                                {visibleText}
                            </span>
                        );
                    })}
                    {lineIdx === lines.length - 1 && (
                        <span
                            className={`inline-block w-2.5 sm:w-3.5 h-[0.85em] ml-1.5 align-middle bg-[#bef264] rounded-sm shadow-[0_0_12px_rgba(190,242,100,0.8)] transition-opacity duration-300 ${
                                isComplete ? 'animate-pulse' : 'opacity-100'
                            }`}
                        />
                    )}
                </div>
            ))}
        </h1>
    );
}
