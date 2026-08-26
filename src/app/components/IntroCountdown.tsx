'use client'
import React, { useEffect, useState } from 'react';

interface IntroCountdownProps {
  children: React.ReactNode;
}

/**
 * Boot-sequence intro: a terminal-styled 3‑2‑1 countdown before the
 * portfolio reveals itself. Mirrors the "compiling" identity of a dev
 * portfolio instead of a generic spinner. Respects reduced-motion and
 * skips itself on repeat visits within the same tab session.
 */
const IntroCountdown: React.FC<IntroCountdownProps> = ({ children }) => {
  const [count, setCount] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('intro-seen') === '1';

    if (prefersReduced || alreadySeen) {
      setDone(true);
      return;
    }

    setCount(3);
    const t1 = setTimeout(() => setCount(2), 700);
    const t2 = setTimeout(() => setCount(1), 1400);
    const t3 = setTimeout(() => setCount(0), 2100);
    const t4 = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('intro-seen', '1');
    }, 2650);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {!done && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080D] transition-opacity duration-500 ${
            count === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_65%)]" />
          <div className="absolute h-64 w-64 rounded-full border border-indigo-500/20 animate-ping [animation-duration:1.8s]" />

          <p className="font-mono text-xs tracking-[0.3em] text-indigo-400/80 mb-6 uppercase">
            $ initializing portfolio.exe
          </p>

          <div
            key={count}
            className="font-mono text-7xl md:text-8xl font-bold text-white [animation:fadeScale_0.6s_ease-out]"
          >
            {count && count > 0 ? count : '✓'}
          </div>

          <p className="font-mono text-xs text-gray-500 mt-6">
            {count && count > 0 ? 'compilation en cours…' : 'prêt.'}
          </p>

          <style jsx>{`
            @keyframes fadeScale {
              0% {
                opacity: 0;
                transform: scale(0.6);
              }
              60% {
                opacity: 1;
                transform: scale(1.08);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${
          done ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default IntroCountdown;