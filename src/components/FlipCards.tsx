import { motion } from 'framer-motion';
import { useState } from 'react';

interface FlipCardData {
  id: number;
  emoji: string;
  title: string;
  backEmoji: string;
  backText: string;
  gradient: string;
}

const CARDS: FlipCardData[] = [
  {
    id: 1,
    emoji: '🧠',
    title: 'aynı kafa yapısı',
    backEmoji: '🌀',
    backText: 'ikimiz de biraz "farklıyız" ve bence bu harika. herkes gibi olmaktansa seninle garip olmayı tercih ederim her gün.',
    gradient: 'from-purple-600/30 to-blue-600/30',
  },
  {
    id: 2,
    emoji: '🤡',
    title: 'tatlı delilik',
    backEmoji: '🎪',
    backText: 'biz biraz manyağız, kabul. ama o manyaklığın var ya, o yüzden sıkılmıyoruz birbirimizden. bence harika bir kombinasyonuz.',
    gradient: 'from-pink-600/30 to-red-600/30',
  },
  {
    id: 3,
    emoji: '🎵',
    title: 'aynı playlist',
    backEmoji: '🎧',
    backText: 'aynı şarkılarda aynı yerlerde gülüyoruz lan. hatta bazen aynı şarkıyı aynı anda keşfediyoruz. bu normal değil bence.',
    gradient: 'from-cyan-600/30 to-teal-600/30',
  },
  {
    id: 4,
    emoji: '🪐',
    title: 'bizim dünyamız',
    backEmoji: '🌌',
    backText: 'başkaları yanımızda ne konuştuğumuzu anlamıyor. niye? çünkü bizim bi evrenimiz var. gizli kodlarımız, şakalarımız... sadece biz biliyoruz.',
    gradient: 'from-yellow-600/30 to-orange-600/30',
  },
  {
    id: 5,
    emoji: '💬',
    title: 'sessiz anlaşma',
    backEmoji: '👁️',
    backText: 'bazen konuşmadan anlıyoruz birbirimizi. bi bakışla, bi gülümsemeyle. bu tip şeyler herkesle olmuyo, bunu biliyosun dimi?',
    gradient: 'from-violet-600/30 to-fuchsia-600/30',
  },
  {
    id: 6,
    emoji: '💫',
    title: 'kaos ikilisi',
    backEmoji: '🔥',
    backText: 'yan yana gelince ortam bi garip oluyo ama EN İYİ garip. sensiz her şey sıradan, seninle her şey bi macera.',
    gradient: 'from-emerald-600/30 to-lime-600/30',
  },
];

function FlipCard({ card, index }: { card: FlipCardData; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card h-52"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        <div
          className={`flip-card-front w-full h-full rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center p-4 glow-box hover:border-neon-purple/50 transition-colors`}
        >
          <span className="text-5xl mb-3">{card.emoji}</span>
          <h3 className="text-lg font-bold text-white">{card.title}</h3>
          <p className="text-xs text-white/30 mt-2">çevir beni 👆</p>
        </div>

        <div
          className={`flip-card-back w-full h-full rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-neon-purple/30 flex flex-col items-center justify-center p-5`}
        >
          <span className="text-4xl mb-3">{card.backEmoji}</span>
          <p className="text-sm text-white/90 text-center leading-relaxed">{card.backText}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlipCards() {
  return (
    <section className="relative z-10 px-4 py-16 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        neden bu kadar benziyoruz? 🤔
      </motion.h2>
      <motion.p
        className="text-center text-white/40 mb-10 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        kartlara bas, arkalarına yazdıklarımı oku
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((card, index) => (
          <FlipCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
