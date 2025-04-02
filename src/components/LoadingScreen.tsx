import React, { useEffect, useState } from 'react';
import { ChefHat } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsFading(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Chef Hat Animation Container */}
      <div className="relative w-24 h-24 mb-8">
        <ChefHat 
          className="w-24 h-24 text-[#037ffc] animate-bounce"
          style={{ animationDuration: '2s' }}
        />
        {/* Steam Particles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 w-2 h-2 bg-[#037ffc]/20 rounded-full"
            style={{
              animation: `steam 2s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
              transform: `translateX(${(i - 1) * 10}px)`,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-center mb-8">
        <p className="text-xl text-gray-800 font-medium animate-fade-in">
          Paving the way for effortless restaurant management
          <span className="animate-pulse">...</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#037ffc] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;