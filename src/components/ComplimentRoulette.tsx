import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const COMPLIMENTS = [
  { text: 'gülüşün odayı aydınlatıyo, abartmıyorum', emoji: '🌅' },
  { text: 'seninle konuşmak günün en güzel kısmı', emoji: '☀️' },
  { text: 'sen yokken bi şeyler eksik oluyo, tam olarak ne bilmiyorum ama eksik', emoji: '🧩' },
  { text: 'tarzın var ya tarzın, kimse senin gibi olamaz', emoji: '💅' },
  { text: 'sen bi yerden çıkınca ortam değişiyo, farkında mısın?', emoji: '✨' },
  { text: 'sana bakınca "iyi ki varsın" diyesim geliyo', emoji: '🥹' },
  { text: 'dünyanın en tatlı delisi sensin, fight me', emoji: '🤪' },
  { text: 'gözlerin çok güzel, bunu birine söylemem normalde ama neyse', emoji: '👀' },
  { text: 'sesin bile tatlı lan, hayır ciddiyim', emoji: '🎙️' },
  { text: 'sen tam bi vibe sın, yanında olmak bile yeterli', emoji: '🌊' },
  { text: 'bazen sana bakıp "bu kız gerçek mi" diye düşünüyorum', emoji: '🤯' },
  { text: 'senin enerjin bulaşıcı, ama güzel bi bulaşıcılık', emoji: '⚡' },
  { text: 'zeki, tatlı ve biraz deli. mükemmel kombinasyon', emoji: '🧬' },
  { text: 'sana kötü bi şey söylemek imkansız çünkü yoksun', emoji: '🚫' },
  { text: 'sen olmasan bu site bi anlam ifade etmezdi, ciddiyim', emoji: '💜' },
];

export default function ComplimentRoulette() {
  const [current, setCurrent] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrent(null);

    // Quick shuffle animation
    let count = 0;
    const maxCount = 12;
    const interval = setInterval(() => {
      setCurrent(Math.floor(Math.random() * COMPLIMENTS.length));
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * COMPLIMENTS.length);
        setCurrent(final);
        setIsSpinning(false);
      }
    }, 100);
  }, [isSpinning]);

  return (
    <section className="relative z-10 px-4 py-16 max-w-2xl mx-auto text-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        iltifat makinesi 🎰
      </motion.h2>
      <motion.p
        className="text-white/40 mb-8 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        butona bas, sana güzel bi şey söyleyeyim
      </motion.p>

      <div className="min-h-[140px] flex flex-col items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {current !== null && (
            <motion.div
              key={isSpinning ? `spin-${current}` : `final-${current}`}
              className={`rounded-2xl p-6 bg-white/5 border max-w-md ${
                isSpinning ? 'border-white/10' : 'border-neon-purple/30 bg-neon-purple/5'
              }`}
              initial={{ opacity: 0, y: isSpinning ? 10 : 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: isSpinning ? 0.08 : 0.4, type: isSpinning ? 'tween' : 'spring' }}
            >
              <p className="text-3xl mb-3">{COMPLIMENTS[current].emoji}</p>
              <p className={`leading-relaxed ${isSpinning ? 'text-white/40 text-sm' : 'text-white/90'}`}>
                {COMPLIMENTS[current].text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {current === null && !isSpinning && (
          <motion.p
            className="text-white/20 text-sm"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👇 aşağıdaki butona bas 👇
          </motion.p>
        )}
      </div>

      <motion.button
        className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold shadow-lg hover:shadow-neon-purple/30"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={spin}
        disabled={isSpinning}
      >
        {isSpinning ? '🎰 dönüyo...' : current !== null ? 'bi tane daha 💜' : 'çevir 🎰'}
      </motion.button>
    </section>
  );
}
