import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="relative z-10 py-16 text-center px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          className="text-5xl mb-4"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          💜
        </motion.div>
        <p className="text-white/50 text-sm mb-1">
          bu sayfayı senin için yaptım
        </p>
        <p className="text-white/30 text-xs mb-1">
          çünkü bazı insanlar için normal bi mesaj yetmiyo
        </p>
        <p className="text-white/20 text-xs">
          seninle deli olmak güzel 🤪
        </p>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-white/15 text-xs tracking-widest uppercase">
            Developer <span className="text-neon-purple/40 font-semibold">Yura</span> Orijinal
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
