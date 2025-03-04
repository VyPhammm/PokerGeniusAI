import { useState } from 'react';
import { calculatePokerProbability, PokerRequest, PokerResponse } from '../services/gemini';

interface CalculatorState {
  loading: boolean;
  error: string | null;
  result: PokerResponse | null;
}

export const usePokerCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    loading: false,
    error: null,
    result: null
  });

  const calculate = async (request: PokerRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await calculatePokerProbability(request);
      setState(prev => ({ ...prev, loading: false, result }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  };

  const resetState = () => {
    setState({
      loading: false,
      error: null,
      result: null
    });
  };

  return {
    ...state,
    calculate,
    resetState
  };
}; 