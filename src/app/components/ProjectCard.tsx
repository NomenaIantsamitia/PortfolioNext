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
  Minimize2,
  X,
} from 'lucide-react';
import { Project } from '../types';
import Image from 'next/image';

interface ProjectCardProps extends Project {
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
  demoLink,
  githubLink,
  githubFrontend,
  githubBackend,
  featured,
  status = 'live',
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

  const isLive = status === 'live' && Boolean(demoLink);
  const canPreviewVideo = Boolean(videoSrc) && !videoError;
  const hasSplitRepos = Boolean(githubFrontend || githubBackend);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPreviewVideo) return;

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
  }, [isActive, isFullscreen, canPreviewVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getPositionClasses = () => {
    if (isFullscreen) {
      return 'fixed inset-4 sm:inset-8 z-[70] max-w-none w-auto h-auto scale-100 rotate-y-0 opacity-100 shadow-2xl border-indigo-500/50';
    }

    switch (position) {
      case 'left':
        return 'z-20 -translate-x-[58%] scale-[0.78] rotate-y-[18deg] opacity-50 hover:opacity-80 cursor-pointer';
      case 'right':
        return 'z-20 translate-x-[58%] scale-[0.78] -rotate-y-[18deg] opacity-50 hover:opacity-80 cursor-pointer';
      case 'center':
        return 'z-40 translate-x-0 scale-100 rotate-y-0 opacity-100 shadow-[0_25px_80px_-15px_rgba(99,102,241,0.35)] border-indigo-500/40';
      default:
        return 'z-0 scale-50 opacity-0 pointer-events-none';
    }
  };

  return (
    <div
      onClick={!isFullscreen ? onClick : undefined}
      className={`
        absolute w-full max-w-[480px] sm:max-w-[520px]
        transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        transform-gpu will-change-transform
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black
        border border-gray-700/50
        backdrop-blur-xl
        ${getPositionClasses()}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Bouton fermer en plein écran */}
      {isFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFullscreen?.();
          }}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 text-white hover:bg-red-600/80 transition-colors border border-white/10"
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
          ${isFullscreen ? 'h-[70vh] sm:h-[75vh]' : isActive ? 'h-64 sm:h-72' : 'h-44 sm:h-52'}
        `}
      >
        {featured && !isFullscreen && (
          <div className="absolute top-3.5 left-3.5 z-30 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">
              À L&apos;AFFICHE
            </span>
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
            sizes={isFullscreen ? '100vw' : '(max-width: 768px) 100vw, 520px'}
            priority={featured}
          />
        )}

        {canPreviewVideo && (
          <video
            ref={videoRef}
            src={videoSrc}
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

        {/* Contrôles vidéo */}
        {(isActive || isFullscreen) && canPreviewVideo && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={togglePlay}
              className="text-white hover:text-indigo-300 transition-colors p-0.5"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-indigo-300 transition-colors p-0.5"
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bouton plein écran */}
            {!isFullscreen && onToggleFullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFullscreen();
                }}
                className="text-white hover:text-indigo-300 transition-colors p-0.5 ml-1"
                aria-label="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* DÉTAILS (cachés en plein écran pour maximiser la vidéo) */}
      {!isFullscreen && (
        <div className="p-5 sm:p-6 relative z-20">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h3>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {isActive && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-800/80">
              {isLive ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
                >
                  <span>Démo en direct</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/80 text-gray-400 font-medium text-sm border border-gray-700">
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
                      className="p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                    >
                      <Monitor className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {githubBackend && (
                    <a
                      href={githubBackend}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Code Backend"
                      className="p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                    >
                      <Server className="w-4.5 h-4.5" />
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
                    className="p-2.5 rounded-xl text-gray-400 hover:text-white border border-gray-700 hover:border-indigo-400/60 bg-gray-800/60 transition-all"
                  >
                    <Github className="w-4.5 h-4.5" />
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