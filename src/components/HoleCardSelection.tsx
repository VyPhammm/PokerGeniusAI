import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Card } from '../types/poker';
import CardSelector from './CardSelector';
import { validateHoleCards } from '../utils/validation';
import { usePokerCalculator } from '../hooks/usePokerCalculator';
import LoadingOverlay from './LoadingOverlay';
import LoadingSpinner from './LoadingSpinner';
import ResultModal from './ResultModal';

const HoleCardSelection: React.FC = () => {
  const { state, selectHoleCard, advanceStage } = useGame();
  const [error, setError] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const calculator = usePokerCalculator();

  const handleCardSelect = (index: 0 | 1) => (card: Card) => {
    setError(null);
    setIsCalculated(false);
    setShowResults(false);
    selectHoleCard(index, card);
  };

  const handleCalculate = async () => {
    const validationResult = validateHoleCards(state.holeCards);
    
    if (!validationResult.isValid) {
      setError(validationResult.message || 'Invalid selection');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await calculator.calculate({
        hole_cards: state.holeCards as [Card, Card],
        community_cards: [],
        pot_size: 100,
        player_stack: 1000,
      });
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate odds');
    } finally {
      setIsLoading(false);
      setIsCalculated(true);
    }
  };

  const handleNext = () => {
    advanceStage();
  };

  const selectedCards = state.holeCards.filter((card): card is Card => card !== undefined);
  const isSelectionComplete = selectedCards.length === 2;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={isLoading} 
        message="Calculating hole cards probabilities..."
      />

      {/* Results Modal */}
      <ResultModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        result={calculator.result}
      />

      <div className="flex-1 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Select Your Hole Cards
          </h1>
          <p className="text-lg text-gray-600">
            Choose your two starting cards
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto -mb-4 animate-fade-in">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Selection Area */}
        <div className="max-w-2xl mx-auto">
          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-24 mb-16">
            <CardSelector
              selectedCards={selectedCards}
              onCardSelect={handleCardSelect(0)}
              index={0}
            />
            <CardSelector
              selectedCards={selectedCards}
              onCardSelect={handleCardSelect(1)}
              index={1}
            />
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mt-16">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="sticky bottom-0 w-full bg-white py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Next Button - Shows after Calculate is clicked */}
          {isCalculated && (
            <button
              onClick={handleNext}
              className="
                w-full py-4 px-6 
                bg-blue-500 rounded-2xl
                text-white text-lg font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-xl hover:bg-blue-600
                animate-fade-in
              "
            >
              Next: Select Flop Cards
            </button>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={!isSelectionComplete || isLoading}
            data-testid="calculate-button"
            className={`
              w-full py-4 px-6 
              ${isCalculated ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'}
              rounded-2xl
              text-lg font-semibold
              transition-all duration-300
              shadow-lg hover:shadow-xl
              ${(!isSelectionComplete || isLoading) && 'cursor-not-allowed opacity-75'}
              flex items-center justify-center
            `}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-3" />
                Calculating...
              </>
            ) : (
              isSelectionComplete ? 'Calculate Odds' : 'Select Both Cards'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoleCardSelection; 