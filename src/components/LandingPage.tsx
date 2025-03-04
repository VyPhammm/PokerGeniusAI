import React from 'react';
import StartButton from './StartButton';

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 z-0" />
      
      {/* Main Content */}
      <div className="relative z-10 px-4 py-10 bg-white bg-opacity-95 shadow-xl sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <span className="inline-block text-6xl mb-4 animate-bounce">🎲</span>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Poker Probability Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Make smarter decisions with AI-powered poker odds calculation
            </p>
          </div>

          {/* Features List */}
          <div className="mb-12">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Real-time probability calculation</span>
              </div>
              <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">GTO-based recommendations</span>
              </div>
              <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Optimal bet sizing suggestions</span>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex flex-col space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <StartButton />
            
            {/* Additional Info */}
            <p className="text-center text-sm text-gray-500">
              Powered by OpenAI GPT-4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 