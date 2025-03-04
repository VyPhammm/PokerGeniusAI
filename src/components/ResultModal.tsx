import React from 'react';
import { CalculationResult } from '../types/poker';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen || !result) return null;

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full mx-4 my-4 max-h-[90vh] flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hole Cards Analysis
          </h2>
          <p className="text-gray-600">
            Here's your probability of winning with these hole cards
          </p>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {/* Suggested Action */}
          <div className={`
            rounded-xl p-6
            ${result.action === 'raise' ? 'bg-green-50' : ''}
            ${result.action === 'call' ? 'bg-yellow-50' : ''}
            ${result.action === 'fold' ? 'bg-red-50' : ''}
          `}>
            <div className="flex justify-between items-center">
              <span className={`
                font-medium
                ${result.action === 'raise' ? 'text-green-700' : ''}
                ${result.action === 'call' ? 'text-yellow-700' : ''}
                ${result.action === 'fold' ? 'text-red-700' : ''}
              `}>
                Suggested Action
              </span>
              <span className={`
                text-2xl font-bold capitalize
                ${result.action === 'raise' ? 'text-green-700' : ''}
                ${result.action === 'call' ? 'text-yellow-700' : ''}
                ${result.action === 'fold' ? 'text-red-700' : ''}
              `}>
                {result.action}
              </span>
            </div>
          </div>

          {/* Win Probability */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-700 font-medium">Win Probability</span>
              <span className="text-2xl font-bold text-blue-700">
                {formatPercentage(result.win_probability)}
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${result.win_probability * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Tie Probability</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatPercentage(result.tie_probability)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Loss Probability</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatPercentage(result.loss_probability)}
              </div>
            </div>
          </div>

          {/* Action Analysis */}
          {result.action_analysis && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Action Analysis</h3>
              
              {/* Fold Analysis */}
              {result.action_analysis.fold && (
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-red-700 font-medium">Fold</span>
                    <span className="text-xl font-bold text-red-700">
                      {formatPercentage(result.action_analysis.fold.winRate)} Win Rate
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-red-600 font-medium">Conditions to improve:</div>
                    <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                      {result.action_analysis.fold.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Call Analysis */}
              {result.action_analysis.call && (
                <div className="bg-yellow-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-yellow-700 font-medium">Call</span>
                    <span className="text-xl font-bold text-yellow-700">
                      {formatPercentage(result.action_analysis.call.winRate)} Win Rate
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-yellow-600 font-medium">Conditions to improve:</div>
                    <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                      {result.action_analysis.call.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Raise Analysis */}
              {result.action_analysis.raise && (
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-green-700 font-medium">Raise</span>
                    <span className="text-xl font-bold text-green-700">
                      {formatPercentage(result.action_analysis.raise.winRate)} Win Rate
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-green-600 font-medium">Conditions to improve:</div>
                    <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                      {result.action_analysis.raise.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-sm text-gray-600 mb-2">Analysis</div>
            <p className="text-gray-900 whitespace-pre-line">
              {result.explanation}
            </p>
          </div>
        </div>

        {/* Close Button - Keep outside scrollable area */}
        <div className="mt-8 flex justify-end space-x-4 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="
              px-6 py-3 
              bg-gray-50 hover:bg-gray-100 
              text-gray-700 font-medium 
              rounded-xl 
              transition-colors duration-200
              border border-gray-200
            "
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              // We'll trigger a new analysis by closing the modal first
              setTimeout(() => {
                const calculateButton = document.querySelector('[data-testid="calculate-button"]');
                if (calculateButton instanceof HTMLButtonElement) {
                  calculateButton.click();
                }
              }, 100);
            }}
            className="
              px-6 py-3 
              bg-blue-500 hover:bg-blue-600 
              text-white font-medium 
              rounded-xl 
              transition-colors duration-200
              flex items-center
              shadow-sm hover:shadow-md
            "
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Analyze Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal; 