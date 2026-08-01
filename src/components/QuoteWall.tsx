import { motion } from 'framer-motion';
import { useState } from 'react';

const QUOTES = [
  { text: 'seni tanıdığım için şanslıyım diye düşünüyorum bazen. sonra "yok la hak ediyorum" diyorum, çünkü biz birbirimizi hak ediyoruz.', emoji: '🍀' },
  { text: 'deli olmak kötü bi şey değil. hele senle deli olmak var ya, o bambaşka.', emoji: '🤪' },
  { text: 'bazı insanlarla vakit geçirmek enerji veriyo. sen o insanlardansın.', emoji: '⚡' },
  { text: 'senin gülüşünü duyunca ben de gülüyorum, bu refleks oldu artık.', emoji: '😂' },
  { text: 'dünyanın en garip ikili ödülü olsa kesin biz alırdık. ve ben bununla gurur duyardım.', emoji: '🏆' },
  { text: 'sen o kadar tatlısın ki bazen gerçek olmadığını düşünüyorum. sonra bi saçmalık yapıyosun ve "tamam gerçekmiş" diyorum.', emoji: '🧁' },
  { text: 'biz biraz farklıyız ama güzel bi farklıyız. dünya sıkıcı insanlarla dolu, biz değiliz.', emoji: '✨' },
  { text: 'bu şarkı seni hatırlatıyo diyeceğim ama her şarkı seni hatırlatıyo son zamanlarda, neyse.', emoji: '🎵' },
  { text: 'seninle sessiz kalsak bile sıkılmam. o da bi şey bu arada.', emoji: '🤫' },
  { text: 'sen bu siteyi gezerken ben muhtemelen senin gülüp gülmediğini merak ediyorum.', emoji: '📱' },
];

export default function QuoteWall() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <section className="relative z-10 px-4 py-16 max-w-2xl mx-auto text-center">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-8 glow-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        kafamdan geçenler 💭
      </motion.h2>

      <motion.div
        className="relative rounded-2xl p-8 bg-white/5 border border-white/10 cursor-pointer min-h-[160px] flex flex-col items-center justify-center"
        onClick={nextQuote}
        whileHover={{ borderColor: 'rgba(180, 74, 255, 0.3)' }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          key={currentQuote}
          className="text-4xl mb-4 block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {QUOTES[currentQuote].emoji}
        </motion.span>
        <motion.p
          key={`text-${currentQuote}`}
          className="text-white/80 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {QUOTES[currentQuote].text}
        </motion.p>
        <p className="text-white/20 text-xs mt-5">
          devamını görmek için tıkla ({currentQuote + 1}/{QUOTES.length})
        </p>
      </motion.div>
    </section>
  );
}
