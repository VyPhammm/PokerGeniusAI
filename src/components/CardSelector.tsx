import React, { useState } from 'react';
import { Card, CardRank, CardSuit } from '../types/poker';
import { RANKS, SUITS, formatCard, isCardAvailable } from '../utils/cards';

interface CardSelectorProps {
  selectedCards: Card[];
  onCardSelect: (card: Card) => void;
  index: number;
}

const CardSelector: React.FC<CardSelectorProps> = ({ selectedCards, onCardSelect, index }) => {
  const [selectedRank, setSelectedRank] = useState<CardRank | null>(null);
  const [selectedSuit, setSelectedSuit] = useState<CardSuit | null>(null);
  const [isSelectingRank, setIsSelectingRank] = useState(false);
  const [isSelectingSuit, setIsSelectingSuit] = useState(false);

  const handleRankSelect = (rank: CardRank) => {
    setSelectedRank(rank);
    setIsSelectingRank(false);
    setIsSelectingSuit(true);
    if (selectedSuit) {
      const card = `${rank}${selectedSuit}` as Card;
      if (isCardAvailable(card, selectedCards)) {
        onCardSelect(card);
        setIsSelectingSuit(false);
      }
    }
  };

  const handleSuitSelect = (suit: CardSuit) => {
    setSelectedSuit(suit);
    setIsSelectingSuit(false);
    if (selectedRank) {
      const card = `${selectedRank}${suit}` as Card;
      if (isCardAvailable(card, selectedCards)) {
        onCardSelect(card);
      }
    }
  };

  const handleCardClick = () => {
    setIsSelectingRank(true);
    setIsSelectingSuit(false);
  };

  const suitColors: Record<CardSuit, string> = {
    h: 'text-red-500',
    d: 'text-red-500',
    c: 'text-green-500',
    s: 'text-gray-800'
  };

  const suitSymbols: Record<CardSuit, string> = {
    h: '♥',
    d: '♦',
    c: '♣',
    s: '♠'
  };

  return (
    <div className="relative animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
      {/* Card Display */}
      <button
        onClick={handleCardClick}
        className="
          w-full aspect-w-2 aspect-h-3 
          bg-white rounded-2xl shadow-lg
          flex flex-col items-center justify-center
          hover:shadow-xl transition-shadow duration-300
        "
      >
        {selectedRank && selectedSuit ? (
          <div className={`text-7xl font-bold ${suitColors[selectedSuit]}`}>
            {selectedRank}
            {suitSymbols[selectedSuit]}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-gray-300 text-8xl mb-2">?</span>
          </div>
        )}
      </button>

      {/* Selection Panel */}
      {(isSelectingRank || isSelectingSuit) && (
        <div className="absolute top-full left-0 -translate-x-1 bg-white rounded-2xl shadow-lg p-4 mt-4 z-30 animate-fade-in">
          {/* Panel Header */}
          <div className="text-center mb-4">
            <h3 className="text-gray-700 font-medium">
              {isSelectingRank ? 'Select Your Card' : 'Select Suit'}
            </h3>
          </div>

          {/* Rank Selection */}
          {isSelectingRank && (
            <div className="grid grid-rows-3 grid-flow-col gap-3 p-4 bg-gray-50 rounded-xl">
              {RANKS.map((rank) => (
                <button
                  key={rank}
                  onClick={() => handleRankSelect(rank)}
                  className="
                    w-5 h-5
                    flex items-center justify-center
                    text-x font-medium text-gray-700
                    hover:bg-gray-80 rounded-lg
                    transition-all duration-200
                    hover:transform hover:scale-80
                  "
                >
                  {rank}
                </button>
              ))}
            </div>
          )}

          {/* Suit Selection */}
          {isSelectingSuit && (
            <div className="grid grid-cols-4 gap-4 p-4">
              {SUITS.map((suit) => {
                const card = selectedRank ? `${selectedRank}${suit}` as Card : null;
                const isAvailable = !card || isCardAvailable(card, selectedCards);
                
                return (
                  <button
                    key={suit}
                    onClick={() => handleSuitSelect(suit)}
                    disabled={!isAvailable}
                    className={`
                      w-10 h-10 rounded-lg
                      flex items-center justify-center
                      text-2xl ${suitColors[suit]}
                      ${isAvailable 
                        ? 'hover:bg-gray-100 hover:transform hover:scale-105' 
                        : 'opacity-40 cursor-not-allowed'}
                      transition-all duration-200
                    `}
                  >
                    {suitSymbols[suit]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {(isSelectingRank || isSelectingSuit) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-20" 
          onClick={() => {
            setIsSelectingRank(false);
            setIsSelectingSuit(false);
          }}
        />
      )}
    </div>
  );
};

export default CardSelector; 