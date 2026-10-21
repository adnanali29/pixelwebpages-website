'use client';

import React, { useEffect, useState } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface CinematicTypeFadeHeadingProps {
    lines: TextPart[][];
    className?: string;
    speed?: number;
    startDelay?: number;
}

export default function CinematicTypeFadeHeading({
    lines,
    className = '',
    speed = 55, // Slow, cinematic letter-by-letter cadence
    startDelay = 250,
}: CinematicTypeFadeHeadingProps) {
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
        <h1 className={`${className} font-black uppercase tracking-tight text-white leading-[0.92]`}>
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap">
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
                                className={`${
                                    part.highlight ? 'text-[#bef264]' : 'text-white'
                                } transition-all duration-300`}
                                style={{
                                    textShadow: part.highlight ? '0 0 25px rgba(190,242,100,0.3)' : 'none',
                                }}
                            >
                                {visibleText}
                            </span>
                        );
                    })}
                    {lineIdx === lines.length - 1 && (
                        <span
                            className={`inline-block w-3 sm:w-4 h-[0.8em] ml-2 align-middle bg-[#bef264] rounded-sm shadow-[0_0_15px_rgba(190,242,100,0.9)] transition-opacity duration-500 ${
                                isComplete ? 'animate-pulse' : 'opacity-100'
                            }`}
                        />
                    )}
                </div>
            ))}
        </h1>
    );
}
