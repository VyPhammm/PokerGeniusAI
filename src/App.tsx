import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import LandingPage from './components/LandingPage';
import HoleCardSelection from './components/HoleCardSelection';
import FlopSelection from './components/FlopSelection';
import './App.css';

const GameScreen: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="relative">
      {state.stage === 'landing' && <LandingPage />}
      {state.stage === 'hole-cards' && <HoleCardSelection />}
      {state.stage === 'flop' && <FlopSelection />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export default App;
