import { Card, CardRank, CardSuit } from '../types/poker';

export const RANKS: CardRank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const SUITS: CardSuit[] = ['h', 'd', 'c', 's'];

export const isValidCard = (card: string): card is Card => {
  if (card.length !== 2) return false;
  const rank = card[0].toUpperCase() as CardRank;
  const suit = card[1].toLowerCase() as CardSuit;
  return RANKS.includes(rank) && SUITS.includes(suit);
};

export const formatCard = (card: Card): string => {
  const suitSymbols: Record<CardSuit, string> = {
    h: '♥',
    d: '♦',
    c: '♣',
    s: '♠',
  };
  return `${card[0]}${suitSymbols[card[1] as CardSuit]}`;
};

export const isCardAvailable = (
  card: Card,
  selectedCards: Card[],
): boolean => {
  return !selectedCards.includes(card);
};

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      deck.push(`${rank}${suit}` as Card);
    }
  }
  return deck;
}; 