export type CardRank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type CardSuit = 'h' | 'd' | 'c' | 's';
export type Card = `${CardRank}${CardSuit}`;

export type GameStage = 'preflop' | 'flop' | 'turn' | 'river';

export interface ActionAnalysis {
  winRate: number;
  conditions: string[];
}

export interface ActionAnalysisMap {
  fold: ActionAnalysis;
  call: ActionAnalysis;
  raise: ActionAnalysis;
}

export interface GameState {
  stage: GameStage;
  holeCards: [Card?, Card?];
  communityCards: Card[];
  potSize: number;
  playerStack: number;
}

export interface CalculationResult {
  action: 'fold' | 'call' | 'raise';
  probability: number;
  win_probability: number;
  tie_probability: number;
  loss_probability: number;
  expected_value: number;
  bet_size: number;
  explanation: string;
  action_analysis: ActionAnalysisMap;
} 