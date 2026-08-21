'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SlideNavigationProps {
  slides: SlideDef[];
}

interface SlideCtx {
  goTo: (id: string) => void;
}

const SlideNavContext = createContext<SlideCtx>({ goTo: () => {} });

/** Lets any slide's content (e.g. Hero CTAs) trigger navigation to another slide. */
export const useSlideNav = () => useContext(SlideNavContext);

/**
 * Replaces classic anchor-scrolling with a PowerPoint-style deck: one
 * slide fills the viewport at a time, the nav bar acts as tabs, and a
 * soft aperture of circles "opens" behind each transition — the visual
 * signature tying the boot-sequence intro to the rest of the site.
 */
const SlideNavigation: React.FC<SlideNavigationProps> = ({ slides }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const touchStartX = useRef<number | null>(null);

  const goToIndex = useCallback(
    (index: number) => {
      if (index === active || index < 0 || index >= slides.length) return;
      setDirection(index > active ? 'next' : 'prev');
      setActive(index);
    },
    [active, slides.length]
  );

  const goTo = useCallback(
    (id: string) => {
      const idx = slides.findIndex((s) => s.id === id);
      if (idx !== -1) goToIndex(idx);
    },
    [slides, goToIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToIndex(active + 1);
      if (e.key === 'ArrowLeft') goToIndex(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goToIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goToIndex(delta < 0 ? active + 1 : active - 1);
    }
    touchStartX.current = null;
  };

  return (
    <SlideNavContext.Provider value={{ goTo }}>
      <div className="fixed inset-0 overflow-hidden bg-[#08080D]">
        {/* Shared ambient background, kept behind every slide */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(217,70,239,0.09),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Aperture circles — the signature "PowerPoint slide" transition cue */}
        <div
          key={active}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="absolute h-[38vw] w-[38vw] max-h-[420px] max-w-[420px] rounded-full border border-indigo-500/10 [animation:apertureExpand_0.9s_ease-out]" />
          <span className="absolute h-[24vw] w-[24vw] max-h-[280px] max-w-[280px] rounded-full border border-fuchsia-500/10 [animation:apertureExpand_0.9s_ease-out_0.08s_both]" />
        </div>

        {/* Top nav — floating tab bar */}
        <nav className="fixed top-0 inset-x-0 z-40 flex justify-center pt-5 px-4">
          <div className="flex items-center gap-1 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-full px-2 py-2 shadow-2xl">
            <span className="hidden sm:flex items-center px-3 font-mono text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              MN
            </span>
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToIndex(i)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === active
                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/70'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Side arrows */}
        <button
          aria-label="Slide précédente"
          onClick={() => goToIndex(active - 1)}
          disabled={active === 0}
          className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-11 h-11 rounded-full bg-gray-900/50 backdrop-blur-md border border-gray-700/50 text-gray-300 hover:text-white hover:border-indigo-400/60 transition disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Slide suivante"
          onClick={() => goToIndex(active + 1)}
          disabled={active === slides.length - 1}
          className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-11 h-11 rounded-full bg-gray-900/50 backdrop-blur-md border border-gray-700/50 text-gray-300 hover:text-white hover:border-indigo-400/60 transition disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide track */}
        <div
          className="absolute inset-0"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((s, i) => {
            const offset = i - active;
            return (
              <div
                key={s.id}
                aria-hidden={i !== active}
                className="absolute inset-0 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto"
                style={{
                  transform: `translateX(${offset * 100}%) scale(${
                    i === active ? 1 : 0.96
                  })`,
                  opacity: i === active ? 1 : 0,
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 pt-28 pb-20 min-h-full">
                  {s.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide position dots */}
        <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Aller à ${s.label}`}
              onClick={() => goToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-7 bg-gradient-to-r from-indigo-400 to-fuchsia-400'
                  : 'w-2 bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <style jsx global>{`
          @keyframes apertureExpand {
            0% {
              opacity: 0.6;
              transform: scale(0.4);
            }
            100% {
              opacity: 0;
              transform: scale(1.4);
            }
          }
        `}</style>
      </div>
    </SlideNavContext.Provider>
  );
};

export default SlideNavigation;