import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface HeartChallengeProps {
  onComplete: () => void;
  requiredClicks?: number;
}

export const HeartChallenge = ({ onComplete, requiredClicks = 20 }: HeartChallengeProps) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; speed: number }[]>([]);
  const [clicks, setClicks] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeFailed, setTimeFailed] = useState(false);

  useEffect(() => {
    // Generate moving hearts
    const initialHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 20 + 24,
      speed: Math.random() * 400 + 300,
    }));
    setHearts(initialHearts);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (showComplete || timeFailed) return;
    if (timeLeft <= 0) {
      setTimeFailed(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showComplete, timeFailed]);

  // Move hearts around
  useEffect(() => {
    if (timeFailed) return;
    
    const interval = setInterval(() => {
      setHearts(prev => prev.map(heart => ({
        ...heart,
        x: Math.max(5, Math.min(90, heart.x + (Math.random() - 0.5) * 15)),
        y: Math.max(10, Math.min(85, heart.y + (Math.random() - 0.5) * 15)),
      })));
    }, 600);
    return () => clearInterval(interval);
  }, [timeFailed]);

  const handleHeartClick = (id: number) => {
    if (timeFailed) return;
    
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    // Add a new heart when one is clicked
    setHearts(prev => [
      ...prev.filter(h => h.id !== id),
      {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: Math.random() * 20 + 24,
        speed: Math.random() * 400 + 300,
      },
    ]);

    if (newClicks >= requiredClicks) {
      setShowComplete(true);
      setTimeout(onComplete, 1500);
    }
  };

  const handleRetry = () => {
    const initialHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 20 + 24,
      speed: Math.random() * 400 + 300,
    }));
    setHearts(initialHearts);
    setClicks(0);
    setTimeLeft(15);
    setTimeFailed(false);
    setShowComplete(false);
  };

  const progress = (clicks / requiredClicks) * 100;

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-rose-100/90 via-pink-50/90 to-coral-50/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-[210] w-full max-w-sm px-4">
        <div className="bg-card/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-romantic">
          <h2 className="text-xl md:text-2xl font-script text-foreground mb-2">
            Catch the Hearts! 💕
          </h2>
          <p className="text-sm text-muted-foreground font-body mb-3">
            Click {requiredClicks} hearts to prove your love!
          </p>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-xs text-primary font-body">{clicks}/{requiredClicks}</p>
            <p className={`text-xs font-body font-bold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
              Time: {timeLeft}s
            </p>
          </div>
        </div>
      </div>

      {/* Failure Message */}
      {timeFailed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[220]">
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-romantic animate-fade-up">
            <p className="text-2xl font-script text-red-600 mb-3">
              Time's Up! ⏰
            </p>
            <p className="text-lg font-body text-red-500 mb-4">
              you cant go like that
            </p>
            <p className="text-sm text-muted-foreground font-body mb-4">
              You clicked {clicks}/{requiredClicks} hearts
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Moving hearts */}
      {hearts.map(heart => (
        <button
          key={heart.id}
          onClick={() => handleHeartClick(heart.id)}
          className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 ${timeFailed ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Heart 
            className="text-primary drop-shadow-lg animate-heartbeat" 
            size={heart.size} 
            fill="currentColor"
          />
        </button>
      ))}

      {/* Completion celebration */}
      {showComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 animate-fade-in z-[220]">
          <div className="text-center animate-scale-in">
            <div className="text-6xl mb-4">💖✨💖</div>
            <h2 className="text-3xl font-script text-foreground">
              Thats My Baby 💖
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
