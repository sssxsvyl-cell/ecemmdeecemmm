import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Mood {
  emoji: string;
  label: string;
  response: string;
  responseEmoji: string;
  bgColor: string;
}

const MOODS: Mood[] = [
  {
    emoji: '😊',
    label: 'mutlu',
    response: 'mutlu olduğunda gözlerin parlıyo biliyo musun? o parıltı bi başka oluyo. mutluluğun hep sürsün, yoksa ben üzülürüm 🥺',
    responseEmoji: '🌞💛',
    bgColor: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    emoji: '😢',
    label: 'üzgün',
    response: 'lan üzülme be, bak şimdi benim de modum düştü. ne oldu söyle, konuşalım. her ne olursa olsun yanındayım tamam mı?',
    responseEmoji: '🤗💜',
    bgColor: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    emoji: '🤪',
    label: 'çılgın',
    response: 'EVEEET İŞTE BU BİZ! bu enerjiyle dünyayı fethedebiliriz. sen çılgınken ben de çılgınım, böyle devam 🔥🔥',
    responseEmoji: '🎪🤹',
    bgColor: 'from-pink-500/20 to-red-500/20',
  },
  {
    emoji: '😴',
    label: 'uykulu',
    response: 'git uyu o zaman tatlım, güzellik uykusu falan de... ama zaten uyumasan da güzelsin, o ayrı mesele 🌙',
    responseEmoji: '😴⭐',
    bgColor: 'from-purple-500/20 to-blue-500/20',
  },
  {
    emoji: '🤔',
    label: 'düşünceli',
    response: 'ne düşünüyosun acaba? bahse girerim çok derin bi şey. ya da çok saçma bi şey. seninle ikisi de aynı kapıya çıkıyo 😂',
    responseEmoji: '💭🧠',
    bgColor: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    emoji: '😎',
    label: 'havalı',
    response: 'zaten havalısın da, bunu seçmen ayrı havalı oldu. sen ne yapsan yakışıyo sana, ciddiyim.',
    responseEmoji: '🕶️👑',
    bgColor: 'from-gray-500/20 to-slate-500/20',
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  return (
    <section className="relative z-10 px-4 py-16 max-w-3xl mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-2 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        şu an modin ne? 🎭
      </motion.h2>
      <motion.p
        className="text-center text-white/40 mb-10 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        birine bas, sana bi şey söylicem
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.label}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
              selectedMood?.label === mood.label
                ? 'border-neon-purple bg-neon-purple/20 scale-110'
                : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedMood(mood)}
          >
            <span className="text-2xl md:text-3xl">{mood.emoji}</span>
            <span className="text-[10px] text-white/50 mt-1">{mood.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood.label}
            className={`rounded-2xl p-6 bg-gradient-to-br ${selectedMood.bgColor} border border-white/10 text-center`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p className="text-3xl mb-3">{selectedMood.responseEmoji}</p>
            <p className="text-white/90 leading-relaxed">{selectedMood.response}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
