import { useState, useEffect } from 'react';

/**
 * Custom hook for animated counter
 * Smoothly animates from 0 to target value
 */
export const useAnimatedCounter = (
  targetValue: number,
  duration: number = 1500,
  delay: number = 0
) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 60;
      const increment = targetValue / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCurrent(Math.min(Math.round(increment * currentStep), targetValue));
        } else {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [targetValue, duration, delay]);

  return current;
};
