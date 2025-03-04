import { Card } from '../types/poker';
import { isValidCard } from './cards';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateHoleCards = (cards: (Card | undefined)[]): ValidationResult => {
  // Check if we have exactly two cards
  if (cards.length !== 2) {
    return {
      isValid: false,
      message: 'Please select exactly two hole cards'
    };
  }

  // Check if both cards are defined
  if (!cards[0] || !cards[1]) {
    return {
      isValid: false,
      message: 'Both hole cards must be selected'
    };
  }

  // Check if cards are valid
  if (!isValidCard(cards[0]) || !isValidCard(cards[1])) {
    return {
      isValid: false,
      message: 'Invalid card selection'
    };
  }

  // Check for duplicates
  if (cards[0] === cards[1]) {
    return {
      isValid: false,
      message: 'Cannot select the same card twice'
    };
  }

  return { isValid: true };
};

export const validateCommunityCards = (
  communityCards: (Card | undefined)[],
  holeCards: (Card | undefined)[]
): ValidationResult => {
  // Check for duplicates with hole cards
  const allCards = [...holeCards, ...communityCards].filter((card): card is Card => card !== undefined);
  const uniqueCards = new Set(allCards);

  if (uniqueCards.size !== allCards.length) {
    return {
      isValid: false,
      message: 'Duplicate cards are not allowed'
    };
  }

  // Check if all provided cards are valid
  const invalidCard = allCards.find(card => !isValidCard(card));
  if (invalidCard) {
    return {
      isValid: false,
      message: `Invalid card: ${invalidCard}`
    };
  }

  return { isValid: true };
}; 