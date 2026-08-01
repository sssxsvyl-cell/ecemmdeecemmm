import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function EasterEgg() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1;
        setKonamiProgress(next);
        if (next === konamiCode.length) {
          setShowEasterEgg(true);
          setKonamiProgress(0);
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#b44aff', '#ff6bb5', '#4af0ff', '#fff44a', '#ff0000', '#00ff00'],
          });
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowEasterEgg(false)}
        >
          <motion.div
            className="bg-cosmic-800 rounded-3xl p-8 max-w-md mx-4 border border-neon-purple/40 text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-5xl mb-4">🏆</p>
            <h3 className="text-2xl font-bold rainbow-text mb-3">
              nasıl buldun lan bunu??
            </h3>
            <p className="text-white/70 mb-4">
              konami kodunu biliyosun ha... vay be, seni hafife almışım. harbiden farklı birisin 🎮
            </p>
            <p className="text-white/40 text-sm mb-4">
              bu gizli mesajı sadece sen gördün. özelsin çünkü 💜
            </p>
            <button
              className="px-6 py-2 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-sm hover:bg-neon-purple/30 transition-colors"
              onClick={() => setShowEasterEgg(false)}
            >
              aramızda kalsın 🤫
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
