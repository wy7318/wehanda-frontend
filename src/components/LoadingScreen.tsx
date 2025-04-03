import React, { useEffect, useState } from 'react';
import { ChefHat, ShoppingBag, Utensils, Pizza, Coffee, Clock } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const loadingPhrases = [
    "Preparing your digital menu",
    "Setting up ordering system",
    "Getting tables ready",
    "Final touches..."
  ];

  useEffect(() => {
    // Animate loading dots
    const dotInterval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 300);

    // Progress bar animation
    const duration = 2000; // 2 seconds
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      // Update loading phase based on progress
      if (newProgress > 25 && newProgress <= 50) {
        setLoadingPhase(1);
      } else if (newProgress > 50 && newProgress <= 75) {
        setLoadingPhase(2);
      } else if (newProgress > 75) {
        setLoadingPhase(3);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        clearInterval(dotInterval);
        setIsFading(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 700);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearInterval(dotInterval);
    };
  }, [onLoadingComplete]);

  // Icons for the floating elements
  const icons = [
    <Pizza className="text-amber-500" />,
    <Coffee className="text-brown-600" />,
    <Utensils className="text-green-500" />,
    <ShoppingBag className="text-purple-500" />,
    <Clock className="text-red-500" />
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'
        }`}
      style={{
        background: 'radial-gradient(circle at center, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles - SLOWED DOWN */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/5 animate-float"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 25}s`, // Much slower animation
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Icon Elements - REDUCED & SLOWED DOWN */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-icons"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDuration: `${Math.random() * 10 + 30}s`, // Much slower animation
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            <div className="p-3 bg-white rounded-full shadow-md">
              {icons[i % icons.length]}
            </div>
          </div>
        ))}
      </div>

      {/* Logo and Chef Hat Animation Container */}
      <div className="relative mb-12 transform transition-all duration-1000"
        style={{ transform: `scale(${1 + progress * 0.002})` }}>

        {/* Logo text */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              WEHANDA
            </span>
          </div>
        </div>

        {/* Chef Hat with animation */}
        <div className="relative flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-xl">
              <ChefHat
                className="w-16 h-16 text-white"
              />
            </div>

            {/* Animated steam particles */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full"
                style={{
                  animation: `steam 2s ease-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  top: '-10px',
                  left: `${40 + (i - 2) * 8}px`,
                  opacity: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Loading Message with Phase Transition */}
      <div className="text-center mb-10 h-8 overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${loadingPhase * 100}%)` }}
        >
          {loadingPhrases.map((phrase, i) => (
            <p
              key={i}
              className="text-xl text-gray-700 font-medium h-8 flex items-center justify-center"
            >
              {phrase}
              <span className="inline-flex ml-1 w-6">
                {[0, 1, 2].map(dot => (
                  <span
                    key={dot}
                    className={`h-1.5 w-1.5 rounded-full mx-0.5 inline-block ${activeDot === dot ? 'bg-blue-600' : 'bg-blue-300'
                      }`}
                  ></span>
                ))}
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative w-80 h-2 bg-blue-100 rounded-full overflow-hidden shadow-inner mb-2">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* Glowing effect on progress bar */}
        <div
          className="absolute top-0 h-full w-10 bg-white opacity-30"
          style={{
            left: `${progress - 5}%`,
            display: progress < 5 ? 'none' : 'block',
            filter: 'blur(3px)'
          }}
        ></div>
      </div>

      {/* Percentage display */}
      <div className="text-sm text-gray-600 font-medium">
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

// Add necessary animations to global CSS
const GlobalStyles = () => {
  return (
    <style jsx global>{`
      @keyframes steam {
        0% {
          transform: translateY(0) scale(0.5);
          opacity: 0;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          transform: translateY(-20px) scale(1);
          opacity: 0;
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-10px) rotate(2deg); /* Reduced movement */
        }
      }
      
      @keyframes float-icons {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        33% {
          transform: translateY(-8px) rotate(5deg); /* Reduced movement */
        }
        66% {
          transform: translateY(3px) rotate(-3deg); /* Reduced movement */
        }
      }
    `}</style>
  );
};

const LoadingScreenWithStyles: React.FC<LoadingScreenProps> = (props) => {
  return (
    <>
      <GlobalStyles />
      <LoadingScreen {...props} />
    </>
  );
};

export default LoadingScreenWithStyles;