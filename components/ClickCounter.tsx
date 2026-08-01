import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

const MILESTONES: Record<number, string> = {
  5: 'aa meraklıymışsın 👀',
  10: 'valla azimlisin, hoşuma gitti 💜',
  20: 'yok artık 20 mi?? harbiden otistik enerji bu 🤪',
  30: 'SEN DELI MİSİN 30 NE KSJDKS',
  50: 'tamam tamam sen kazandın, resmen efsanesin 👑',
  75: 'bu kadar tıklayan bi sen bi de ben vardır heralde 😂',
  100: 'YÜZ?!?! seni durduramıyorum. resmen bi tıklama tanrıçasısın. sana hayranım. 🏆💎',
};

export default function ClickCounter() {
  const [count, setCount] = useState(0);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [particles, setParticles] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const handleClick = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);

    const emojis = ['💜', '✨', '⭐', '💖', '🌟', '🦋', '🔮', '🌸'];
    const newParticle = {
      id: Date.now(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: (Math.random() - 0.5) * 100,
      y: -(Math.random() * 80 + 30),
    };
    setParticles((prev) => [...prev.slice(-10), newParticle]);

    if (MILESTONES[newCount]) {
      setMilestone(MILESTONES[newCount]);
      setShowMilestone(true);
      confetti({
        particleCount: newCount * 2,
        spread: 70 + newCount,
        origin: { y: 0.6 },
        colors: ['#b44aff', '#ff6bb5', '#4af0ff', '#fff44a'],
      });
      setTimeout(() => setShowMilestone(false), 3500);
    }
  }, [count]);

  const getButtonColor = () => {
    if (count >= 100) return 'from-yellow-500 to-amber-600';
    if (count >= 50) return 'from-fuchsia-500 to-pink-600';
    if (count >= 20) return 'from-purple-500 to-indigo-600';
    return 'from-neon-purple to-neon-pink';
  };

  return (
    <section className="relative z-10 px-4 py-16 max-w-2xl mx-auto text-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        kaç kere basabilirsin? 🎯
      </motion.h2>
      <motion.p
        className="text-white/40 mb-8 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        her milestone'da sana bi şey söylicem, devam et
      </motion.p>

      <div className="relative inline-block">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-2xl pointer-events-none"
              style={{ left: '50%', top: '50%' }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        <motion.button
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${getButtonColor()} text-white font-bold text-xl md:text-2xl shadow-lg relative overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleClick}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          <span className="relative z-10">
            {count === 0 ? '👆' : count}
          </span>
        </motion.button>
      </div>

      <p className="text-white/30 text-sm mt-4">
        {count === 0
          ? 'hadi bas'
          : count < 10
          ? `${count}... daha çok var 😏`
          : count < 50
          ? `${count} oldu, bırakma 🔥`
          : `${count}... efsane 👑`}
      </p>

      <AnimatePresence>
        {showMilestone && milestone && (
          <motion.div
            className="mt-6 p-4 rounded-xl bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-medium"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {milestone}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
