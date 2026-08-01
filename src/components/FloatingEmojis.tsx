import { useMemo } from 'react';

const EMOJIS = ['✨', '🌙', '💜', '🦋', '🔮', '⭐', '🌸', '💫', '🪐', '🎵', '🤪', '💖'];

export default function FloatingEmojis() {
  const emojis = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 10,
      size: Math.random() * 1 + 1,
    }));
  }, []);

  return (
    <>
      {emojis.map((e) => (
        <div
          key={e.id}
          className="floating-emoji"
          style={{
            left: `${e.left}%`,
            fontSize: `${e.size}rem`,
            ['--duration' as string]: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        >
          {e.emoji}
        </div>
      ))}
    </>
  );
}
