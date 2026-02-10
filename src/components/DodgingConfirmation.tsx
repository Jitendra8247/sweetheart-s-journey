import { useState, useCallback } from "react";
import { Heart } from "lucide-react";

interface DodgingConfirmationProps {
  message: string;
  onConfirm: () => void;
  yesText?: string;
  noText?: string;
}

export const DodgingConfirmation = ({ 
  message, 
  onConfirm, 
  yesText = "YES", 
  noText = "NO" 
}: DodgingConfirmationProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const dodgeMessages = [
    "Hehe, can't click me! 😜",
    "Try again, sweetie! 💕",
    "I'm too fast! 🏃‍♀️",
    "Just say YES! 💖",
    "You know you want to! 😘",
    "Stop playing with my feelings! 🥺",
  ];

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    setNoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    setDodgeCount(prev => prev + 1);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-foreground/40 backdrop-blur-md flex items-center justify-center">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
            size={Math.random() * 25 + 15}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main card */}
      <div className="bg-card/95 backdrop-blur-md rounded-3xl p-8 shadow-romantic max-w-md mx-4 text-center animate-scale-in relative z-10">
        <div className="text-4xl mb-4">💝</div>
        <h2 className="text-2xl md:text-3xl font-script text-foreground mb-4">
          {message}
        </h2>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic"
          >
            {yesText}
          </button>
          
          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            style={
              noPosition.x !== 0 || noPosition.y !== 0
                ? {
                    position: "fixed",
                    left: noPosition.x,
                    top: noPosition.y,
                    zIndex: 250,
                  }
                : {}
            }
            className="px-8 py-3 bg-muted text-muted-foreground rounded-full font-body text-base hover:bg-muted/80 transition-all shadow-md"
          >
            {noText}
          </button>
        </div>

        {/* Dodge count message */}
        {dodgeCount >= 3 && (
          <p className="mt-4 text-sm text-coral font-body animate-pulse">
            Just say yes already! You've tried {dodgeCount} times! 😂
          </p>
        )}
      </div>

      {/* Floating dodge message */}
      {showMessage && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 bg-coral text-white px-6 py-3 rounded-full font-body animate-fade-in z-[260]">
          {dodgeMessages[Math.min(dodgeCount - 1, dodgeMessages.length - 1)]}
        </div>
      )}
    </div>
  );
};
