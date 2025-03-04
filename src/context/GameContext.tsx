import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Card } from '../types/poker';

type GameStage = 'landing' | 'hole-cards' | 'flop' | 'turn' | 'river';

interface GameState {
  stage: GameStage;
  holeCards: (Card | undefined)[];
  communityCards: (Card | undefined)[];
  potSize: number;
  playerStack: number;
}

interface GameContextType {
  state: GameState;
  selectHoleCard: (index: number, card: Card) => void;
  addCommunityCard: (card: Card) => void;
  advanceStage: () => void;
}

const initialState: GameState = {
  stage: 'landing',
  holeCards: [undefined, undefined],
  communityCards: [],
  potSize: 100,
  playerStack: 1000,
};

type GameAction =
  | { type: 'SELECT_HOLE_CARD'; index: number; card: Card }
  | { type: 'ADD_COMMUNITY_CARD'; card: Card }
  | { type: 'ADVANCE_STAGE' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SELECT_HOLE_CARD':
      const newHoleCards = [...state.holeCards];
      newHoleCards[action.index] = action.card;
      return {
        ...state,
        holeCards: newHoleCards,
      };
    case 'ADD_COMMUNITY_CARD':
      return {
        ...state,
        communityCards: [...state.communityCards, action.card],
      };
    case 'ADVANCE_STAGE':
      const nextStage = (): GameStage => {
        switch (state.stage) {
          case 'landing':
            return 'hole-cards';
          case 'hole-cards':
            return 'flop';
          case 'flop':
            return 'turn';
          case 'turn':
            return 'river';
          default:
            return state.stage;
        }
      };
      return {
        ...state,
        stage: nextStage(),
      };
    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const selectHoleCard = (index: number, card: Card) => {
    dispatch({ type: 'SELECT_HOLE_CARD', index, card });
  };

  const addCommunityCard = (card: Card) => {
    dispatch({ type: 'ADD_COMMUNITY_CARD', card });
  };

  const advanceStage = () => {
    dispatch({ type: 'ADVANCE_STAGE' });
  };

  return (
    <GameContext.Provider value={{ state, selectHoleCard, addCommunityCard, advanceStage }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext; 