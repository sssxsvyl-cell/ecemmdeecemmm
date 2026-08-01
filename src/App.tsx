import { useState } from 'react';
import Starfield from './components/Starfield';
import FloatingEmojis from './components/FloatingEmojis';
import IntroScreen from './components/IntroScreen';
import PhotoSection from './components/PhotoSection';
import FlipCards from './components/FlipCards';
import SecretBoxes from './components/SecretBoxes';
import ComplimentRoulette from './components/ComplimentRoulette';
import MagicBall from './components/MagicBall';
import ClickCounter from './components/ClickCounter';
import MoodSelector from './components/MoodSelector';
import MemoryGame from './components/MemoryGame';
import QuoteWall from './components/QuoteWall';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import Divider from './components/Divider';
import EasterEgg from './components/EasterEgg';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setShouldPlayMusic(true);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 relative">
      <Starfield />
      <FloatingEmojis />

      <IntroScreen visible={!hasEntered} onEnter={handleEnter} />

      <EasterEgg />

      {hasEntered && <MusicPlayer shouldPlay={shouldPlayMusic} />}

      {hasEntered && (
        <main className="relative z-10">
          <PhotoSection />
          <Divider />
          <FlipCards />
          <Divider />
          <SecretBoxes />
          <Divider />
          <ComplimentRoulette />
          <Divider />
          <MoodSelector />
          <Divider />
          <MagicBall />
          <Divider />
          <MemoryGame />
          <Divider />
          <ClickCounter />
          <Divider />
          <QuoteWall />
          <Divider />
          <Footer />
        </main>
      )}
    </div>
  );
}
