import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PhotoSection() {
  const [imgError, setImgError] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.section
      className="flex flex-col items-center pt-12 pb-8 relative z-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="photo-circle mb-6 cursor-pointer"
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setClicked(!clicked)}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 text-6xl">
            🌸
          </div>
        ) : (
          <img
            src="/images/photo.jpg"
            alt="sen"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {clicked && (
        <motion.p
          className="text-pastel-pink text-sm mb-3 italic"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          — ya çok tatlısın lan sen 🫠
        </motion.p>
      )}

      <motion.h2
        className="text-2xl md:text-4xl font-bold glow-text text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        iki tatlı deli 🤪💜
      </motion.h2>

      <motion.p
        className="text-pastel-pink mt-2 text-center text-base md:text-lg px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        sen ve ben — aynı çılgınlığın iki farklı versiyonu
      </motion.p>

      <motion.p
        className="text-white/25 mt-1 text-center text-xs px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        (ve evet, fotoğrafa tıklayabilirsin)
      </motion.p>
    </motion.section>
  );
}
