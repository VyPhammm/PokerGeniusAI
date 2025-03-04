import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'currentColor',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer spinning circle */}
        <div
          className={`
            ${sizeClasses[size]}
            animate-spin
            rounded-full
            border-2
            border-solid
            border-t-transparent
            border-l-transparent
            border-r-transparent
          `}
          style={{ borderBottomColor: color }}
        />
        
        {/* Inner pulsing dot */}
        <div
          className={`
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            animate-pulse
          `}
          style={{
            backgroundColor: color,
            width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
            height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner; 