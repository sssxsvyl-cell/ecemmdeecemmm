import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const RESPONSES = [
  'kesinlikle evet 💜',
  'yüzde yüz lan',
  'bunda şüphe mi var?',
  'yıldızlar da öyle diyo',
  'hmm bi daha sor bence 🤔',
  'belki... belki de evet 👀',
  'cevabı zaten biliyosun 😏',
  'sence? 🤪',
  'tabii ki, sormana bile gerek yok',
  'bu sorunun cevabı senin gülüşünde saklı',
  'bence ikimiz de biliyoruz...',
  'emin değilim ama sen güzelsin, o kesin 💅',
  'yıldızlar bunu söylüyo ama ben zaten biliyodum',
  'evet evet evet',
  'sana hayır diyemem ki 🫠',
  'düşüneyim... düşündüm, evet.',
  'şu an tek bildiğim şey senin çok tatlı olduğun',
  'cevap pozitif, tıpkı senin enerjin gibi ✨',
];

export default function MagicBall() {
  const [response, setResponse] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [key, setKey] = useState(0);

  const shake = useCallback(() => {
    if (isShaking) return;
    setIsShaking(true);
    setResponse(null);

    setTimeout(() => {
      const randomResponse = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      setResponse(randomResponse);
      setIsShaking(false);
      setKey((k) => k + 1);
    }, 1000);
  }, [isShaking]);

  return (
    <section className="relative z-10 px-4 py-16 max-w-2xl mx-auto text-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        bi soru sor 🔮
      </motion.h2>
      <motion.p
        className="text-white/40 mb-8 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        aklından bi soru tut, sonra topa bas
      </motion.p>

      <motion.div
        className="inline-flex flex-col items-center cursor-pointer"
        onClick={shake}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-cosmic-700 via-cosmic-800 to-black border-2 border-neon-purple/40 flex items-center justify-center relative overflow-hidden glow-box"
          animate={
            isShaking
              ? {
                  rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                  x: [0, -10, 10, -8, 8, -4, 4, 0],
                }
              : {}
          }
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-purple/20 to-transparent" />

          <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-cosmic-900/80 border border-neon-purple/20 flex items-center justify-center p-3">
            <AnimatePresence mode="wait">
              {isShaking ? (
                <motion.span
                  key="loading"
                  className="text-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                >
                  🌀
                </motion.span>
              ) : response ? (
                <motion.p
                  key={key}
                  className="text-xs md:text-sm text-neon-purple font-medium text-center leading-tight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {response}
                </motion.p>
              ) : (
                <motion.span
                  key="idle"
                  className="text-3xl md:text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  8
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-white/30 text-sm mt-4">
          {isShaking ? 'bakıyorum... 🤔' : response ? 'bi daha sor 👆' : 'bas lan 👆'}
        </p>
      </motion.div>
    </section>
  );
}
