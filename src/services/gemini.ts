import { GoogleGenerativeAI } from '@google/generative-ai';
import { CalculationResult } from '../types/poker';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface PokerRequest {
  hole_cards: [string, string];
  community_cards: string[];
  pot_size: number;
  player_stack: number;
}

export type PokerResponse = CalculationResult;

export const calculatePokerProbability = async (request: PokerRequest): Promise<PokerResponse> => {
  try {
    // Check if API key is configured
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please check your environment variables.');
    }

    const prompt = `
      As an expert poker analyzer, evaluate these hole cards and provide strategic recommendations.
      You MUST strictly follow these preflop hand rankings and win rates:

      Hole cards: ${request.hole_cards.join(', ')}
      Community cards: ${request.community_cards.join(', ') || 'None'}

      COMPLETE PREFLOP HAND RANKINGS:

      Top 5% (ALWAYS RAISE):
      AA, KK, QQ, JJ, TT, AKs, 99, AQs, AKo, AJs, KQs
      Win rate: 70-85%
      
      Top 10% (RAISE or CALL):
      88, ATs, AQo, KJs, QJs, KTs, AJo, KQo, QTs, A9s
      Win rate: 60-70%
      
      Top 15% (CALL or RAISE in position):
      77, ATo, JTs, KJo, A8s, K9s, QJo, A7s
      Win rate: 55-60%
      
      Top 20% (CALL):
      KTo, Q9s, A5s, 66, QTo, A6s, J9s, A9o, A4s, T9s, K8s
      Win rate: 50-55%
      
      Top 25% (CALL in position):
      JTo, A3s, K7s, A8o, Q8s, K9o, A2s, J8s, K6s, 55, T8s
      Win rate: 45-50%

      Top 30% (CALL if cheap):
      A7o, 98s, Q9o, K5s, A5o, J9o, Q7s
      Win rate: 42-45%

      Top 35% (CALL if very cheap):
      T9o, A6o, K4s, K8o, A4o, J7s, Q6s, T7s, K3s, 97s, 87s
      Win rate: 40-42%

      Top 40% (Consider calling in late position):
      A3o, 44, Q5s, K7o, K2s, Q8o, J8o, Q4s
      Win rate: 38-40%

      Top 45% (Marginal hands):
      A2o, T8o, K6o, J6s, 76s, T6s, 98o, 86s
      Win rate: 36-38%

      Top 50% (Weak playable hands):
      Q3s, 96s, J5s, K5o, Q2s, J4s, 33, Q7o, 65s, K4o
      Win rate: 34-36%

      Top 55% (Very weak playable):
      75s, J7o, J3s, T7o, T5s, 85s, Q6o, 87o, 95s
      Win rate: 32-34%

      Top 60% (Usually fold):
      97o, K3o, T4s, J2s, 54s, Q5o, 64s, T3s
      Win rate: 30-32%

      Top 65% (Almost always fold):
      K2o, 22, 74s, Q4o, T2s, 84s, 76o, J6o, 94s
      Win rate: 28-30%

      Top 70% (Only play in special situations):
      86o, T6o, 53s, 96o, 93s, Q3o, J5o, 63s
      Win rate: 26-28%

      Below 70% (Fold):
      All other hands
      Win rate: <26%

      ACTION RULES:
      1. If hand is in Top 5% → ALWAYS RAISE
      2. If hand is in Top 10% → RAISE in position, CALL out of position
      3. If hand is in Top 15-20% → CALL, can RAISE in late position
      4. If hand is in Top 25-30% → CALL only in position
      5. If hand is in Top 30-40% → CALL only if cheap and in position
      6. If hand is in Top 40-50% → Usually fold, call only in late position if very cheap
      7. If hand is below 50% → FOLD unless special circumstances

      ADDITIONAL CONSIDERATIONS:
      - Suited hands get +5% win rate bonus
      - Connected cards (no gap) get +3% win rate bonus
      - One-gap hands get +2% win rate bonus
      - Position advantage adds +5% to win rate
      - Late position can improve hand category by one level

      Respond in this exact format:
      Action: [fold/call/raise]
      Win Probability: [number]%
      Tie Probability: [number]%
      Loss Probability: [number]%

      Action Analysis:
      FOLD:
      - Win Rate: [number]%
      - Conditions to improve: [list specific conditions]

      CALL:
      - Win Rate: [number]%
      - Conditions to improve: [list specific conditions]

      RAISE:
      - Win Rate: [number]%
      - Conditions to improve: [list specific conditions]

      Note:
      - Use EXACT win rates from the rankings above
      - Probabilities must add up to 100%
      - Consider position and opponent ranges
      - For conditions to improve, focus on:
        * Pair possibilities
        * Straight draws
        * Flush draws
        * Over cards
      - Always explain why the hand falls into its specific ranking category
      - Include exact win rate percentage from the rankings
    `;

    console.log('Sending request to Gemini...', {
      request,
      prompt
    });

    try {
      // Generate content using Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Received raw response from Gemini:', text);

      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      // Parse the response and extract relevant information
      const parsedResponse: PokerResponse = {
        action: 'fold', // Default value
        probability: 0,
        win_probability: 0,
        tie_probability: 0,
        loss_probability: 0,
        expected_value: 0,
        bet_size: 0,
        explanation: '',
        action_analysis: {
          fold: { winRate: 0, conditions: [] },
          call: { winRate: 0, conditions: [] },
          raise: { winRate: 0, conditions: [] }
        }
      };

      // Extract action
      const actionMatch = text.match(/Action:\s*(fold|call|raise)/i);
      if (actionMatch) {
        parsedResponse.action = actionMatch[1].toLowerCase() as 'fold' | 'call' | 'raise';
      }

      // Extract probabilities
      const winMatch = text.match(/Win Probability:\s*(\d+(?:\.\d+)?)/i);
      if (winMatch) {
        parsedResponse.win_probability = parseFloat(winMatch[1]) / 100;
        parsedResponse.probability = parsedResponse.win_probability;
      }

      const tieMatch = text.match(/Tie Probability:\s*(\d+(?:\.\d+)?)/i);
      if (tieMatch) {
        parsedResponse.tie_probability = parseFloat(tieMatch[1]) / 100;
      }

      const lossMatch = text.match(/Loss Probability:\s*(\d+(?:\.\d+)?)/i);
      if (lossMatch) {
        parsedResponse.loss_probability = parseFloat(lossMatch[1]) / 100;
      }

      // Extract action analysis
      const actions = ['fold', 'call', 'raise'] as const;
      actions.forEach(action => {
        const section = text.match(new RegExp(`${action.toUpperCase()}:[\\s\\S]*?Win Rate:\\s*(\\d+(?:\\.\\d+)?)%[\\s\\S]*?Conditions to improve:\\s*([^]*?)(?=\\n\\s*\\n|$)`, 'i'));
        if (section) {
          parsedResponse.action_analysis[action] = {
            winRate: parseFloat(section[1]) / 100,
            conditions: section[2].trim().split('\n').map(s => s.trim()).filter(s => s.length > 0)
          };
        }
      });

      console.log('Parsed response:', parsedResponse);

      // Validate the parsed values
      if (parsedResponse.win_probability === 0 && 
          parsedResponse.tie_probability === 0 && 
          parsedResponse.loss_probability === 0) {
        console.warn('Warning: All probabilities are zero. Raw response:', text);
      }

      return parsedResponse;

    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      throw new Error(`Gemini API Error: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Error calculating poker probability:', error);
    throw error;
  }
}; 