import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const StartButton: React.FC = () => {
  const { advanceStage } = useGame();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    // Add a small delay for the animation
    setTimeout(() => {
      advanceStage();
    }, 200);
  };

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-blue-500 rounded-lg filter blur-md transition-opacity duration-200
                   ${isHovered ? 'opacity-30' : 'opacity-0'}`}
      />

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        disabled={isPressed}
        className={`
          relative w-full bg-gradient-to-r from-blue-500 to-blue-700
          hover:from-blue-600 hover:to-blue-800 text-white font-bold
          py-4 px-8 rounded-lg transform transition-all duration-200
          ${isHovered ? 'scale-105' : 'scale-100'}
          ${isPressed ? 'scale-95 opacity-80' : ''}
          disabled:cursor-not-allowed
          shadow-lg hover:shadow-xl
          flex items-center justify-center space-x-2
        `}
      >
        <span className="text-lg">Start Calculating</span>
        
        {/* Arrow Icon */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 
                     ${isHovered ? 'translate-x-1' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>

        {/* Loading Spinner (shows when button is pressed) */}
        {isPressed && (
          <svg
            className="animate-spin ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </button>

      {/* Ripple Effect Container */}
      <div className="absolute inset-0 pointer-events-none">
        {isPressed && (
          <span className="absolute inset-0 rounded-lg animate-ripple bg-white opacity-25" />
        )}
      </div>
    </div>
  );
};

export default StartButton; 