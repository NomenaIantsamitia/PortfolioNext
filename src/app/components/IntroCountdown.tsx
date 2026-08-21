'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface IntroCountdownProps {
  children: React.ReactNode;
}

const BOOT_LOGS = [
  'INITIALIZING_KERNEL...',
  'LOADING_ASTRO_MODULES...',
  'OPTIMIZING_BUNDLE...',
  'SYSTEM_READY',
];

const IntroCountdown: React.FC<IntroCountdownProps> = ({ children }) => {
  const [count, setCount] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  const handleSkip = useCallback(() => {
    setDone(true);
    sessionStorage.setItem('intro-seen', '1');
  }, []);

  // Support clavier ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSkip]);

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

    // Séquence de boot progressive
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setCount(2), 750));
    timers.push(setTimeout(() => setCount(1), 1500));
    timers.push(setTimeout(() => setCount(0), 2250));

    // Affichage progressif des logs
    BOOT_LOGS.forEach((log, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, log]);
        }, i * 650)
      );
    });

    // Fin de l’intro
    timers.push(
      setTimeout(() => {
        setDone(true);
        sessionStorage.setItem('intro-seen', '1');
      }, 2900)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!mounted) return null;

  const progress =
    count !== null ? Math.min(100, ((3 - count) / 3) * 100) : 0;

  return (
    <>
      {!done && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chargement du portfolio"
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] text-white select-none overflow-hidden transition-opacity duration-700 ease-out ${
            count === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Grille de fond */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

          {/* Glow central */}
          <div className="absolute h-[40rem] w-[40rem] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
          <div className="absolute h-[20rem] w-[20rem] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none top-1/3" />

          {/* Bouton Skip */}
          <button
            onClick={handleSkip}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 font-mono text-[11px] text-gray-500 hover:text-indigo-300 transition-all duration-300 uppercase tracking-[0.2em] border border-gray-800/80 hover:border-indigo-500/50 rounded-full px-4 py-1.5 backdrop-blur-md hover:bg-indigo-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Passer [ESC]
          </button>

          {/* Contenu principal */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
            {/* Badge version */}
            <div className="flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/25 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.28em] text-indigo-300/90 uppercase">
                v2.026 // BUILD_EXEC
              </span>
            </div>

            {/* Compteur */}
            <div className="relative flex items-center justify-center h-36 w-36 my-1">
              <div
                key={count}
                className="font-mono text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-[0_0_40px_rgba(99,102,241,0.45)] [animation:fadeScale_0.55s_cubic-bezier(0.16,1,0.3,1)]"
              >
                {count !== null && count > 0 ? count : '✓'}
              </div>
            </div>

            {/* Terminal logs */}
            <div className="mt-10 w-full max-w-xs">
              <div className="font-mono text-[11px] sm:text-xs space-y-1.5 min-h-[5.5rem]">
                {visibleLogs.map((log, i) => (
                  <p
                    key={i}
                    className="flex items-center gap-2 text-indigo-300/90 tracking-wide animate-[fadeIn_0.4s_ease-out]"
                  >
                    <span className="text-gray-600 select-none">&gt;</span>
                    <span>{log}</span>
                    {i === visibleLogs.length - 1 && (
                      <span className="inline-block w-1.5 h-3.5 bg-indigo-400 animate-pulse ml-0.5" />
                    )}
                  </p>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 w-full h-[3px] bg-gray-800/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeScale {
              0% {
                opacity: 0;
                transform: scale(0.65) translateY(12px);
                filter: blur(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(4px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}

      {/* Contenu du site */}
      <div
        className={`transition-all duration-1000 ease-out ${
          done
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-[0.985] translate-y-2'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default IntroCountdown;