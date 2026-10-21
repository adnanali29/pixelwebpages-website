'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TextPart {
    text: string;
    highlight?: boolean;
}

interface MatrixDecodeHeadingProps {
    lines: TextPart[][];
    className?: string;
    speed?: number;
    startDelay?: number;
}

const MYSTERY_CHARS = '01#@&%?$*§ΔΩ⚡✦XYZ';

export default function MatrixDecodeHeading({
    lines,
    className = '',
    speed = 28,
    startDelay = 200,
}: MatrixDecodeHeadingProps) {
    const fullText = lines.map(line => line.map(p => p.text).join('')).join('\n');
    const [displayText, setDisplayText] = useState<string>(
        fullText.replace(/[^\s\n]/g, () => MYSTERY_CHARS[Math.floor(Math.random() * MYSTERY_CHARS.length)])
    );
    const [isResolved, setIsResolved] = useState<boolean>(false);
    const iterationRef = useRef<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        timer = setTimeout(() => {
            iterationRef.current = 0;
            interval = setInterval(() => {
                setDisplayText(() => {
                    const progress = iterationRef.current;
                    const next = fullText
                        .split('')
                        .map((char, index) => {
                            if (char === ' ' || char === '\n') return char;
                            if (index < progress) {
                                return char;
                            }
                            return MYSTERY_CHARS[Math.floor(Math.random() * MYSTERY_CHARS.length)];
                        })
                        .join('');

                    if (progress >= fullText.length) {
                        clearInterval(interval);
                        setIsResolved(true);
                    }
                    return next;
                });
                iterationRef.current += 1.2;
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [fullText, speed, startDelay]);

    const handleHover = () => {
        if (!isResolved) return;
        setIsResolved(false);
        iterationRef.current = 0;
        const interval = setInterval(() => {
            setDisplayText(() => {
                const progress = iterationRef.current;
                const next = fullText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ' || char === '\n') return char;
                        if (index < progress) {
                            return char;
                        }
                        return MYSTERY_CHARS[Math.floor(Math.random() * MYSTERY_CHARS.length)];
                    })
                    .join('');

                if (progress >= fullText.length) {
                    clearInterval(interval);
                    setIsResolved(true);
                }
                return next;
            });
            iterationRef.current += 1.8;
        }, speed);
    };

    let charCursor = 0;

    return (
        <h1
            onMouseEnter={handleHover}
            className={`${className} font-black uppercase tracking-tight text-white leading-[0.95] select-none cursor-pointer group`}
        >
            {lines.map((lineParts, lineIdx) => (
                <div key={lineIdx} className="block whitespace-pre-wrap">
                    {lineParts.map((part, partIdx) => {
                        const partLength = part.text.length;
                        const partSlice = displayText.slice(charCursor, charCursor + partLength);
                        charCursor += partLength;

                        return (
                            <span
                                key={partIdx}
                                className={`${
                                    part.highlight ? 'text-[#bef264]' : 'text-white'
                                } transition-colors duration-150`}
                            >
                                {partSlice}
                            </span>
                        );
                    })}
                </div>
            ))}
        </h1>
    );
}
