import { useGameStore } from './store/gameStore';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const gamePhase = useGameStore((s) => s.gamePhase);

  switch (gamePhase) {
    case 'start':
      return <StartScreen />;
    case 'pick_case':
    case 'play':
    case 'banker_offer':
      return <GameBoard />;
    case 'game_over':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}
