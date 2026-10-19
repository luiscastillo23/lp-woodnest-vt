import { useState, useEffect, useCallback } from 'react';

export function usePreloader(duration = 2800) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoaded(false);
    setProgress(0);

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      const easedProgress =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      const currentPercentage = Math.floor(easedProgress * 100);
      setProgress(currentPercentage);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => setIsLoaded(true), 250);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [duration]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  return { progress, isLoaded, replay: startLoading };
}