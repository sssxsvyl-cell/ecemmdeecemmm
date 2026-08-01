import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroScreenProps {
  visible: boolean;
  onEnter: () => void;
}

const TYPEWRITER_TEXT = 'bunu yaparken çok eğlendim bu arada...';

export default function IntroScreen({ visible, onEnter }: IntroScreenProps) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < TYPEWRITER_TEXT.length) {
        setTyped(TYPEWRITER_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-900 cursor-pointer"
          onClick={onEnter}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-10"
                style={{
                  background: `radial-gradient(circle, ${
                    ['#b44aff', '#ff6bb5', '#4af0ff', '#fff44a', '#b44aff'][i]
                  }, transparent)`,
                  width: `${300 + i * 100}px`,
                  height: `${300 + i * 100}px`,
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -20, 30, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-6xl mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌙
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-3 rainbow-text text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            selam tatlım 💜
          </motion.h1>

          <motion.p
            className="text-lg text-pastel-purple mb-3 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            sana bi sürprizim var, hazır mısın?
          </motion.p>

          <motion.p
            className="text-sm text-white/30 mb-8 text-center px-4 h-5 typewriter-cursor inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {typed}
          </motion.p>

          <motion.div
            className="px-8 py-4 rounded-full border-2 border-neon-purple bg-neon-purple/10 text-neon-purple font-semibold text-lg pulse-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            gir bakalım 👀
          </motion.div>

          <motion.p
            className="text-sm text-white/20 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            bi de şarkı koydum, kulaklığını tak 🎧
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
