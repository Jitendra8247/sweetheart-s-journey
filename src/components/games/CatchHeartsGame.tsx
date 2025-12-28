import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";

interface CatchHeartsGameProps {
  onComplete: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  y: number;
}

export const CatchHeartsGame = ({ onComplete }: CatchHeartsGameProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const target = 10;

  useEffect(() => {
    if (timeLeft <= 0) {
      if (score >= target) {
        onComplete();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, onComplete]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (timeLeft > 0) {
        const newHeart: FallingHeart = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
        };
        setHearts(prev => [...prev, newHeart]);
      }
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [timeLeft]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({ ...heart, y: heart.y + 3 }))
          .filter(heart => heart.y < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  const catchHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    setScore(s => {
      const newScore = s + 1;
      if (newScore >= target) {
        setTimeout(onComplete, 300);
      }
      return newScore;
    });
  }, [onComplete]);

  const restart = () => {
    setHearts([]);
    setScore(0);
    setTimeLeft(15);
  };

  if (timeLeft <= 0 && score < target) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-script text-foreground mb-4">Time's Up!</h2>
        <p className="text-muted-foreground font-body mb-6">
          You caught {score}/{target} hearts. Try again!
        </p>
        <button
          onClick={restart}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Catch the Hearts!</h2>
      <p className="text-muted-foreground font-body mb-2">Tap the falling hearts!</p>
      <div className="flex justify-center gap-6 mb-4">
        <span className="text-primary font-body font-semibold">Score: {score}/{target}</span>
        <span className="text-coral font-body font-semibold">Time: {timeLeft}s</span>
      </div>
      
      <div className="relative w-full h-64 bg-card/50 rounded-2xl overflow-hidden border-2 border-primary/20">
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            onClick={() => catchHeart(heart.id)}
            className="absolute cursor-pointer text-primary hover:scale-125 transition-transform"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            size={32}
            fill="currentColor"
          />
        ))}
      </div>
    </div>
  );
};
