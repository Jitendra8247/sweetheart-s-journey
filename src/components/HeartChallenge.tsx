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

  // Move hearts around
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => prev.map(heart => ({
        ...heart,
        x: Math.max(5, Math.min(90, heart.x + (Math.random() - 0.5) * 15)),
        y: Math.max(10, Math.min(85, heart.y + (Math.random() - 0.5) * 15)),
      })));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (id: number) => {
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
          <p className="text-xs text-primary font-body mt-2">{clicks}/{requiredClicks}</p>
        </div>
      </div>

      {/* Moving hearts */}
      {hearts.map(heart => (
        <button
          key={heart.id}
          onClick={() => handleHeartClick(heart.id)}
          className="absolute cursor-pointer transition-all duration-300 hover:scale-125"
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
              You're full of love!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
