import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

const EMOJI_PAIRS = ['💜', '🌙', '🤪', '🦋', '🔮', '🌸'];

const WIN_MESSAGES = [
  'vay be, hafızan da güzelmiş senin 🧠✨',
  'çok iyisin lan, ben bu kadar hızlı yapamam',
  'zeki olduğunu biliyodum zaten 😏',
  'sen ne yapsan iyi yapıyosun ya',
  'aferin sana, gurur duydum şu an 🥹',
];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function createCards(): Card[] {
  const doubled = [...EMOJI_PAIRS, ...EMOJI_PAIRS];
  const shuffled = doubled.sort(() => Math.random() - 0.5);
  return shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [winMsg, setWinMsg] = useState('');

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking) return;
      if (flippedIds.includes(id)) return;
      if (cards[id].isMatched) return;
      if (flippedIds.length >= 2) return;

      const newFlipped = [...flippedIds, id];
      setFlippedIds(newFlipped);

      setCards((prev) =>
        prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
      );

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);

        const [first, second] = newFlipped;
        if (cards[first].emoji === cards[second].emoji) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === first || card.id === second
                  ? { ...card, isMatched: true }
                  : card
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 500);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === first || card.id === second
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [cards, flippedIds, isChecking]
  );

  useEffect(() => {
    if (cards.every((c) => c.isMatched) && cards.length > 0) {
      setIsWon(true);
      setWinMsg(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#b44aff', '#ff6bb5', '#4af0ff', '#fff44a'],
      });
    }
  }, [cards]);

  const resetGame = () => {
    setCards(createCards());
    setFlippedIds([]);
    setMoves(0);
    setIsChecking(false);
    setIsWon(false);
  };

  return (
    <section className="relative z-10 px-4 py-16 max-w-xl mx-auto text-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        bakalım hafızan nasılmış 🧩
      </motion.h2>
      <motion.p
        className="text-white/40 mb-8 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        aynı emojileri eşleştir {moves > 0 && `— ${moves} hamle yaptın`}
      </motion.p>

      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto mb-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`w-full aspect-square rounded-xl cursor-pointer flex items-center justify-center text-2xl md:text-3xl border-2 transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-neon-purple/20 border-neon-purple/40'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            } ${card.isMatched ? 'opacity-60' : ''}`}
            whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? (
              <motion.span
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.2 }}
              >
                {card.emoji}
              </motion.span>
            ) : (
              <span className="text-white/20">?</span>
            )}
          </motion.div>
        ))}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 rounded-xl bg-neon-purple/20 border border-neon-purple/40"
        >
          <p className="text-lg font-bold text-neon-purple mb-1">
            🎉 {moves} hamlede bitirdin!
          </p>
          <p className="text-white/70 text-sm">{winMsg}</p>
        </motion.div>
      )}

      <motion.button
        className="px-6 py-2 rounded-full border border-white/20 text-white/60 text-sm hover:border-neon-purple/50 hover:text-neon-purple transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
      >
        tekrar oyna 🔄
      </motion.button>
    </section>
  );
}
