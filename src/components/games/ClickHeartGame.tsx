import { useState } from "react";
import { Heart } from "lucide-react";

interface ClickHeartGameProps {
  onComplete: () => void;
}

const loveMessages = [
  "I LOVE YOU",
  "HAPPY BIRTHDAY",
  "MY PAGAL",
  "I LOVE U DARLING",
  "MY CHHOTI BACHHI",
  "YOU'RE MY ONLY ONE",
  "MY CUTE CAT",
  "MY HEARTBEAT",
  "MOST BEAUTIFUL PRINCESS",
  "MY BABY",
];

export const ClickHeartGame = ({ onComplete }: ClickHeartGameProps) => {
  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const target = 50;

  const handleClick = () => {
    setCount(c => {
      const newCount = c + 1;
      if (newCount >= target) {
        setTimeout(onComplete, 500);
      }
      return newCount;
    });
    setScale(1.3);
    setTimeout(() => setScale(1), 100);
    
    // Show random love message
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setCurrentMessage(randomMessage);
    
    // Clear message after a short time
    setTimeout(() => {
      setCurrentMessage(null);
    }, 400);
  };

  const progress = (count / target) * 100;

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Show Your Love!</h2>
      <p className="text-muted-foreground font-body mb-4">Click the heart {target} times!</p>
      
      <div className="mb-6">
        <div className="w-48 h-3 bg-muted rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-primary font-body mt-2">{count}/{target}</p>
      </div>

      <div className="relative inline-block">
        <button
          onClick={handleClick}
          className="relative focus:outline-none transform transition-transform active:scale-95"
          style={{ transform: `scale(${scale})` }}
        >
          <Heart 
            className="text-primary drop-shadow-lg cursor-pointer hover:drop-shadow-2xl transition-all" 
            size={120} 
            fill="currentColor"
          />
          {count > 0 && count % 10 === 0 && (
            <span className="absolute -top-2 -right-2 text-2xl animate-ping">💕</span>
          )}
        </button>
        
        {/* Floating love message */}
        {currentMessage && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap animate-message-float pointer-events-none"
          >
            <span className="font-script text-lg text-primary drop-shadow-lg bg-background/90 px-3 py-1 rounded-full">
              {currentMessage}
            </span>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground font-body italic">
        Every click is a kiss You Will Owe Me
      </p>
    </div>
  );
};
