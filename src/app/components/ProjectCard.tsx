'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Monitor,
  Server,
  Maximize2,
  X,
  Clapperboard,
  Smartphone,
} from 'lucide-react';
import { Project, ProjectVideo } from '../types';
import Image from 'next/image';

interface ProjectCardProps extends Project {
  index: number;
  isActive: boolean;
  onClick: () => void;
  position: 'left' | 'center' | 'right' | 'hidden';
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageSrc,
  videoSrc,
  videos: videosProp,
  demoLink,
  githubLink,
  githubFrontend,
  githubBackend,
  featured,
  status = 'live',
  platforms,
  index,
  isActive,
  onClick,
  position,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Normalise les sources vidéo
  const videos: ProjectVideo[] =
    videosProp && videosProp.length > 0
      ? videosProp
      : videoSrc
        ? [{ label: 'Démo', src: videoSrc, isDefault: true }]
        : [];

  const defaultVideo = videos.find((v) => v.isDefault) ?? videos[0];
  const [activeVideoSrc, setActiveVideoSrc] = useState(defaultVideo?.src ?? '');
  const [activeVideoLabel, setActiveVideoLabel] = useState(defaultVideo?.label ?? '');

  const isLive = status === 'live' && Boolean(demoLink);
  const canPreviewVideo = Boolean(activeVideoSrc) && !videoError;
  const hasSplitRepos = Boolean(githubFrontend || githubBackend);
  const hasMultipleVideos = videos.length > 1;

  // Responsive + reduced motion
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 639px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMobile = () => setIsMobile(mqMobile.matches);
    const updateMotion = () => setReduceMotion(mqMotion.matches);
    updateMobile();
    updateMotion();
    mqMobile.addEventListener('change', updateMobile);
    mqMotion.addEventListener('change', updateMotion);
    return () => {
      mqMobile.removeEventListener('change', updateMobile);
      mqMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  // Charge / joue la vidéo active
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeVideoSrc) return;

    video.src = activeVideoSrc;
    video.load();
    setVideoError(false);

    if (isActive || isFullscreen) {
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setVideoError(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [activeVideoSrc, isActive, isFullscreen]);

  // Pause quand on quitte l’état actif
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPreviewVideo) return;
    if (!(isActive || isFullscreen)) {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isFullscreen, canPreviewVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setVideoError(true));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const switchVideo = (v: ProjectVideo) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (v.src === activeVideoSrc) return;
    setIsPlaying(false);
    setActiveVideoSrc(v.src);
    setActiveVideoLabel(v.label);
  };

  const getStateClasses = () => {
    if (isFullscreen) {
      return 'opacity-100 shadow-2xl border-indigo-500/50 cursor-default pointer-events-auto';
    }
    switch (position) {
      case 'left':
      case 'right':
        return 'opacity-40 sm:opacity-50 hover:opacity-80 cursor-pointer pointer-events-auto';
      case 'center':
        return 'opacity-100 shadow-[0_25px_80px_-15px_rgba(99,102,241,0.35)] border-indigo-500/40 cursor-default pointer-events-auto';
      default:
        return 'opacity-0 pointer-events-none';
    }
  };

  const getZIndex = () => {
    if (isFullscreen) return 'z-[70]';
    switch (position) {
      case 'center':
        return 'z-40';
      case 'left':
      case 'right':
        return 'z-20';
      default:
        return 'z-0';
    }
  };

  const getTransform = () => {
    if (isFullscreen) return 'translateX(0) translateY(0) rotateY(0deg) scale(1)';

    if (isMobile) {
      switch (position) {
        case 'center':
          return 'translateX(0) rotateY(0deg) scale(1)';
        case 'left':
          return 'translateX(-14%) rotateY(0deg) scale(0.86)';
        case 'right':
          return 'translateX(14%) rotateY(0deg) scale(0.86)';
        default:
          return 'translateX(0) scale(0.7)';
      }
    }

    switch (position) {
      case 'center':
        return 'translateX(0) rotateY(0deg) scale(1)';
      case 'left':
        return 'translateX(-58%) rotateY(18deg) scale(0.78)';
      case 'right':
        return 'translateX(58%) rotateY(-18deg) scale(0.78)';
      default:
        return 'translateX(0) scale(0.5)';
    }
  };

  const reelNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      onClick={!isFullscreen ? onClick : undefined}
      role={position === 'center' && !isFullscreen ? 'group' : undefined}
      aria-hidden={position === 'hidden'}
      className={`
        absolute w-[88vw] sm:w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px]
        transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        motion-reduce:transition-none
        transform-gpu will-change-transform
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black
        border border-gray-700/50
        backdrop-blur-xl
        ${isFullscreen ? 'fixed inset-3 sm:inset-8 top-[max(0.75rem,env(safe-area-inset-top))] max-w-none w-auto h-auto' : ''}
        ${getZIndex()} ${getStateClasses()}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: getTransform(),
        transitionDuration: reduceMotion ? '0ms' : undefined,
      }}
    >
      {/* Étiquette bobine */}
      {!isFullscreen && (
        <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-mono tracking-wider text-gray-300">
            N°{reelNumber}
          </span>
        </div>
      )}

      {/* Fermer plein écran */}
      {isFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFullscreen?.();
          }}
          className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-50 p-2.5 rounded-full bg-black/70 text-white hover:bg-red-600/80 transition-colors border border-white/10"
          aria-label="Fermer le plein écran"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* MÉDIAS */}
      <div
        className={`
          relative w-full overflow-hidden bg-black
          transition-all duration-500
          ${isFullscreen ? 'h-[60vh] sm:h-[75vh]' : isActive ? 'h-48 sm:h-64 md:h-72' : 'h-36 sm:h-44 md:h-52'}
        `}
      >
        {featured && !isFullscreen && (
          <div className="absolute top-3.5 left-3.5 z-30 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 sm:px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
          </div>
        )}

        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={`
              object-cover transition-opacity duration-700
              ${isActive && canPreviewVideo && isPlaying ? 'opacity-0' : 'opacity-100'}
            `}
            sizes={isFullscreen ? '100vw' : '(max-width: 640px) 88vw, 520px'}
            priority={featured}
          />
        )}

        {canPreviewVideo && (
          <video
            ref={videoRef}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-700
              ${(isActive || isFullscreen) && isPlaying ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 z-10 pointer-events-none" />

 

        {/* Sélecteur multi-vidéos */}
        {hasMultipleVideos && (isActive || isFullscreen) && (
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 flex gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
            {videos.map((v) => (
              <button
                key={v.src}
                onClick={switchVideo(v)}
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                  activeVideoSrc === v.src
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Contrôles play / mute / fullscreen */}
        {(isActive || isFullscreen) && canPreviewVideo && (
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={togglePlay}
              className="text-white hover:text-indigo-300 transition-colors p-1"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-indigo-300 transition-colors p-1"
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {!isFullscreen && onToggleFullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFullscreen();
                }}
                className="text-white hover:text-indigo-300 transition-colors p-1 ml-0.5"
                aria-label="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* DÉTAILS */}
      {!isFullscreen && (
        <div className="p-4 sm:p-5 md:p-6 relative z-20">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>

      

          {/* Badges plateformes */}
          {platforms && platforms.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
            
              {platforms.includes('android') && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] border border-emerald-500/25">
                  <Smartphone className="w-3 h-3" /> Android
                </span>
              )}
              {platforms.includes('ios') && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-400/15 text-gray-200 text-[10px] border border-gray-400/25">
                  <Smartphone className="w-3 h-3" /> iOS
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-[10px] sm:text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {isActive && (
            <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-800/80">
              {isLive ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs sm:text-sm hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25"
                >
                  <span>Démo en direct</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gray-800/80 text-gray-400 font-medium text-xs sm:text-sm border border-gray-700">
                  Bientôt en ligne
                </div>
              )}

              {hasSplitRepos ? (
                <>
                  {githubFrontend && (
                    <a
                      href={githubFrontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Code Frontend"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                    >
                      <Monitor className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                  {githubBackend && (
                    <a
                      href={githubBackend}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Code Backend"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                    >
                      <Server className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                </>
              ) : (
                githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Code Source"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                  >
                    <Github className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </a>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;