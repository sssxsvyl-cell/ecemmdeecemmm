import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface SecretBox {
  id: number;
  emoji: string;
  label: string;
  secret: string;
  secretEmoji: string;
  color: string;
}

const SECRETS: SecretBox[] = [
  {
    id: 1,
    emoji: '🎁',
    label: 'bi şey söylicem...',
    secret: 'senle konuşurken zaman nasıl geçiyo anlamıyorum. 3 saat geçiyo, 5 dk gibi hissediyorum. seninle vakit geçirmek bambaşka bi his.',
    secretEmoji: '⏰💜',
    color: '#b44aff',
  },
  {
    id: 2,
    emoji: '💌',
    label: 'bunu açmadan geçme',
    secret: 'o tatlı deliliğin yok mu, hani bazen saçma sapan şeyler yapıyon da gülüyosun, işte o an dünyanın en güzel insanı oluyosun.',
    secretEmoji: '🫠✨',
    color: '#ff6bb5',
  },
  {
    id: 3,
    emoji: '🗝️',
    label: 'gizli bi itiraf',
    secret: 'bazen mesajını görünce telefonu bi kenara koyup gülüyorum. sonra cevap yazıyorum. bunu kimse bilmiyo şimdiye kadar.',
    secretEmoji: '📱😊',
    color: '#4af0ff',
  },
  {
    id: 4,
    emoji: '🌟',
    label: 'son bi tane daha',
    secret: 'bu siteyi yaparken her bölümde seni düşündüm. her kelimede sen vardın. çünkü bu site senin için var. sen olmasaydın bunun bi anlamı olmazdı.',
    secretEmoji: '🖤',
    color: '#fff44a',
  },
];

function SecretBoxItem({ box }: { box: SecretBox }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setHasOpened(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b44aff', '#ff6bb5', '#4af0ff', '#fff44a'],
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleOpen}
    >
      <div
        className={`rounded-2xl p-6 border transition-all duration-500 ${
          isOpen
            ? 'border-neon-purple/50 bg-neon-purple/10'
            : 'border-white/10 bg-white/5 hover:border-white/20'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.span
            className="text-3xl"
            animate={
              !hasOpened
                ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: hasOpened ? 0 : Infinity }}
          >
            {box.emoji}
          </motion.span>
          <span className="font-semibold text-white/80">{box.label}</span>
          {!hasOpened && (
            <span className="ml-auto text-xs text-white/30 animate-pulse">aç beni</span>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10">
                <p className="text-3xl mb-2">{box.secretEmoji}</p>
                <p className="text-white/80 text-sm leading-relaxed">{box.secret}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SecretBoxes() {
  return (
    <section className="relative z-10 px-4 py-16 max-w-3xl mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        sana söylemek istediklerim 💌
      </motion.h2>
      <motion.p
        className="text-center text-white/40 mb-10 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        her birini tek tek aç, acele etme
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECRETS.map((box) => (
          <SecretBoxItem key={box.id} box={box} />
        ))}
      </div>
    </section>
  );
}
