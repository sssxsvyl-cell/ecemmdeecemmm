import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const tryPlay = useCallback(async () => {
    if (!audioRef.current || hasError) return;
    try {
      audioRef.current.volume = 0.5;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      // Autoplay blocked, will retry on user interaction
      setIsPlaying(false);
    }
  }, [hasError]);

  useEffect(() => {
    if (shouldPlay) {
      tryPlay();
    }
  }, [shouldPlay, tryPlay]);

  // Also try on any click if not playing
  useEffect(() => {
    if (!shouldPlay || isPlaying || hasError) return;

    const handleInteraction = () => {
      tryPlay();
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [shouldPlay, isPlaying, tryPlay, hasError]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const musicBars = [1, 2, 3, 4, 5];

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/song.mp3"
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <motion.div
          className={`rounded-full bg-cosmic-800/90 backdrop-blur-md border border-neon-purple/30 shadow-lg flex items-center gap-3 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'px-5 py-3' : 'p-3'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Music visualizer */}
          <div
            className="flex items-end h-5 gap-[2px] cursor-pointer"
            onClick={togglePlay}
          >
            {musicBars.map((bar) => (
              <div
                key={bar}
                className="music-bar"
                style={{
                  ['--duration' as string]: `${0.3 + bar * 0.1}s`,
                  ['--max-height' as string]: `${8 + bar * 3}px`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  height: isPlaying ? undefined : '4px',
                }}
              />
            ))}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={togglePlay}
                  className="text-neon-purple hover:text-neon-pink transition-colors text-lg"
                >
                  {hasError ? '❌' : isPlaying ? '⏸️' : '▶️'}
                </button>
                <span className="text-white/50 text-xs whitespace-nowrap">
                  {hasError ? 'şarkı yok' : isPlaying ? '♪ çalıyor' : 'duraklatıldı'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
