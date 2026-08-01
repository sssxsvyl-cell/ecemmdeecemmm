import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <motion.div
      className="relative z-10 flex items-center justify-center py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon-purple/30" />
      <span className="mx-4 text-white/20 text-lg">✦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon-purple/30" />
    </motion.div>
  );
}
