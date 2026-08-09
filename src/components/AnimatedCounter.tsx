import React from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  suffix = ''
}) => {
  return (
    <span className="font-extrabold tracking-tight">
      {targetValue}
      {suffix}
    </span>
  );
};
