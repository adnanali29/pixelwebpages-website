'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BarData {
  heightPercent: number; // percentage of chart area (e.g. 26 to 100)
  baseColor: string;
  glowColor: string;
}

const BARS: BarData[] = [
  { heightPercent: 26, baseColor: 'bg-[#1e2e12]', glowColor: 'rgba(58, 92, 32, 0.5)' },
  { heightPercent: 40, baseColor: 'bg-[#2f4919]', glowColor: 'rgba(80, 128, 42, 0.6)' },
  { heightPercent: 55, baseColor: 'bg-[#4b7224]', glowColor: 'rgba(115, 178, 55, 0.7)' },
  { heightPercent: 70, baseColor: 'bg-[#6fa330]', glowColor: 'rgba(152, 222, 68, 0.8)' },
  { heightPercent: 84, baseColor: 'bg-[#95cb41]', glowColor: 'rgba(175, 238, 76, 0.9)' },
  { heightPercent: 100, baseColor: 'bg-[#bef264]', glowColor: 'rgba(190, 242, 100, 1)' },
];

// The exact user-specified jump & fallback sequence
const CHOREOGRAPHY = [
  { from: 0, to: 0 }, // 1. Bar 1 drop
  { from: 0, to: 1 }, // 2. Jump to Bar 2
  { from: 1, to: 1 }, // 3. Bar 2 drop
  { from: 1, to: 2 }, // 4. Jump to Bar 3
  { from: 2, to: 2 }, // 5. Bar 3 drop
  { from: 2, to: 1 }, // 6. Fall back to Bar 2
  { from: 1, to: 0 }, // 7. Fall back to Bar 1
  { from: 0, to: 1 }, // 8. Jump to Bar 2
  { from: 1, to: 2 }, // 9. Jump to Bar 3
  { from: 2, to: 3 }, // 10. Jump to Bar 4
  { from: 3, to: 4 }, // 11. Jump to Bar 5
  { from: 4, to: 3 }, // 12. Fall back to Bar 4
  { from: 3, to: 4 }, // 13. Jump back to Bar 5
  { from: 4, to: 5 }, // 14. Jump to Bar 6 (Peak Bar!)
  { from: 5, to: 5 }, // 15. Peak celebration drop
];

export default function AnimatedGrowthChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ballPos, setBallPos] = useState<{ x: number; y: number; scaleX: number; scaleY: number; opacity: number }>({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 0,
  });
  const [barPops, setBarPops] = useState<boolean[]>([false, false, false, false, false, false]);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const HOP_DURATION = 390; // ms per hop
    const LAUNCH_DURATION = 720; // ms for launch & loop
    const NUM_HOPS = CHOREOGRAPHY.length;
    const TOTAL_CYCLE = NUM_HOPS * HOP_DURATION + LAUNCH_DURATION;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) % TOTAL_CYCLE;

      if (!containerRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const chartWidth = rect.width;
      const chartHeight = rect.height;

      // Calculate bar centers and top Y levels
      const barWidth = chartWidth / BARS.length;
      const barPositions = BARS.map((bar, i) => {
        const cx = i * barWidth + barWidth / 2;
        const barH = (bar.heightPercent / 100) * (chartHeight - 12);
        const topY = chartHeight - barH;
        return { cx, topY };
      });

      const hopIndex = Math.floor(elapsed / HOP_DURATION);

      if (hopIndex < NUM_HOPS) {
        const { from, to } = CHOREOGRAPHY[hopIndex];
        const progress = (elapsed % HOP_DURATION) / HOP_DURATION; // 0 to 1
        const fromBar = barPositions[from];
        const toBar = barPositions[to];

        // Trigger bar pop on landing & launch
        const activeIdx = progress < 0.5 ? from : to;
        setBarPops((prev) => {
          const next = [false, false, false, false, false, false];
          if (progress < 0.25 || progress > 0.75) {
            next[activeIdx] = true;
          }
          return next;
        });

        // Compute parabolic bounce arc
        const currentX = fromBar.cx + (toBar.cx - fromBar.cx) * progress;
        const linearY = fromBar.topY + (toBar.topY - fromBar.topY) * progress;
        const isSameBar = from === to;
        const arcHeight = isSameBar ? 26 : Math.min(48, chartHeight * 0.28);
        const currentY = linearY - 4 * arcHeight * progress * (1 - progress) - 10;

        // Squash on contact, stretch in flight
        let sX = 1;
        let sY = 1;
        if (progress < 0.14 || progress > 0.86) {
          sX = 1.25;
          sY = 0.75;
        } else {
          sX = 0.84;
          sY = 1.16;
        }

        setBallPos({
          x: currentX,
          y: currentY,
          scaleX: sX,
          scaleY: sY,
          opacity: 1,
        });
      } else {
        // Final launch from Bar 6 upwards towards the top-right arrow, then smooth loop back
        const launchProgress = (elapsed - NUM_HOPS * HOP_DURATION) / LAUNCH_DURATION;
        const lastBar = barPositions[5];
        const firstBar = barPositions[0];

        setBarPops((prev) => {
          const next = [false, false, false, false, false, false];
          if (launchProgress < 0.2) {
            next[5] = true;
          }
          return next;
        });

        if (launchProgress < 0.55) {
          const p = launchProgress / 0.55;
          const targetX = chartWidth - 8;
          const targetY = -40;
          const currentX = lastBar.cx + (targetX - lastBar.cx) * p;
          const currentY = lastBar.topY + (targetY - lastBar.topY) * p;
          setBallPos({
            x: currentX,
            y: currentY,
            scaleX: 0.8,
            scaleY: 1.3,
            opacity: 1 - p * 0.9,
          });
        } else {
          const p = (launchProgress - 0.55) / 0.45;
          const startX = firstBar.cx - 20;
          const startY = -20;
          const currentX = startX + (firstBar.cx - startX) * p;
          const currentY = startY + (firstBar.topY - startY) * p - 10;
          setBallPos({
            x: currentX,
            y: currentY,
            scaleX: 0.9,
            scaleY: 1.15,
            opacity: p,
          });
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-black border border-zinc-800 relative flex flex-col justify-between h-[300px] sm:h-[320px] shadow-2xl overflow-hidden group">
      {/* Background subtle ambient glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#bef264]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header: Monospace Tag + Top-right Action Button */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs sm:text-sm font-mono text-[#bef264] uppercase font-bold tracking-wider">
          REAL RESULTS. REAL IMPACT.
        </span>
        <div className="w-8 h-8 rounded-full bg-[#bef264] text-black flex items-center justify-center text-sm font-bold shadow-[0_0_16px_rgba(190,242,100,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45 cursor-pointer">
          ↗
        </div>
      </div>

      {/* Chart Area with Jumping Ball & Interactive Popping Bars */}
      <div
        ref={containerRef}
        className="relative flex items-end justify-between gap-2.5 sm:gap-3.5 h-44 sm:h-48 px-1 pt-6 z-10"
      >
        {/* Animated Jumping Glow Ball */}
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-150"
          style={{
            left: `${ballPos.x}px`,
            top: `${ballPos.y}px`,
            transform: `translate(-50%, -50%) scale(${ballPos.scaleX}, ${ballPos.scaleY})`,
            opacity: ballPos.opacity,
          }}
        >
          {/* Outer glow aura */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-8 h-8 rounded-full bg-[#bef264]/40 blur-md animate-ping" />
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#bef264] shadow-[0_0_12px_#bef264,0_0_24px_rgba(190,242,100,0.9)] border border-white/60" />
          </div>
        </div>

        {/* 6 Ascending Graph Bars */}
        {BARS.map((bar, idx) => {
          const isPopped = barPops[idx];
          const isFinalBar = idx === BARS.length - 1;

          return (
            <div
              key={idx}
              className="relative w-full h-full flex items-end"
              onMouseEnter={() => {
                setBarPops((prev) => {
                  const next = [...prev];
                  next[idx] = true;
                  return next;
                });
              }}
              onMouseLeave={() => {
                setBarPops((prev) => {
                  const next = [...prev];
                  next[idx] = false;
                  return next;
                });
              }}
            >
              {/* The individual Bar element */}
              <div
                className={`w-full ${bar.baseColor} rounded-t-xl sm:rounded-t-2xl transition-all duration-200 cursor-pointer relative overflow-hidden`}
                style={{
                  height: `${bar.heightPercent}%`,
                  transform: isPopped ? 'scaleY(1.08)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                  boxShadow: isPopped
                    ? `0 0 24px ${bar.glowColor}, inset 0 2px 4px rgba(255,255,255,0.3)`
                    : isFinalBar
                    ? '0 0 20px rgba(190, 242, 100, 0.5), inset 0 2px 4px rgba(255,255,255,0.4)'
                    : 'none',
                }}
              >
                {/* Pop light reflection effect */}
                <div
                  className={`absolute inset-0 bg-white/20 transition-opacity duration-200 pointer-events-none ${
                    isPopped ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
