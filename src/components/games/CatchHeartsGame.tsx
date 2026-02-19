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
  const [gameOver, setGameOver] = useState(false);
  const target = 22;

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
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
    if (gameOver) return;
    
    const spawnInterval = setInterval(() => {
      if (timeLeft > 0) {
        const newHeart: FallingHeart = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
        };
        setHearts(prev => [...prev, newHeart]);
      }
    }, 600); // Faster spawn rate

    return () => clearInterval(spawnInterval);
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    
    const moveInterval = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({ ...heart, y: heart.y + 5 })) // Faster falling speed (was 3)
          .filter(heart => heart.y < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameOver]);

  const catchHeart = useCallback((id: number) => {
    if (gameOver) return;
    
    setHearts(prev => prev.filter(h => h.id !== id));
    setScore(s => {
      const newScore = s + 1;
      if (newScore >= target) {
        setGameOver(true);
        setTimeout(onComplete, 300);
      }
      return newScore;
    });
  }, [onComplete, gameOver]);

  const restart = () => {
    setHearts([]);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
  };

  if (gameOver && score < target) {
    return (
      <div className="text-center">
        <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-xl p-6 animate-fade-up">
          <h2 className="text-3xl font-script text-red-600 mb-3">Time's Up!</h2>
          <p className="text-xl font-script text-red-500 mb-4">
            Chhoti Bachhi hi ho tum to 😄
          </p>
          <p className="text-muted-foreground font-body mb-6">
            You caught {score}/{target} hearts
          </p>
          <button
            onClick={restart}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Catch the Hearts!</h2>
      <p className="text-muted-foreground font-body mb-2">Tap the falling hearts quickly!</p>
      <div className="flex justify-center gap-6 mb-4">
        <span className="text-primary font-body font-semibold">Score: {score}/{target}</span>
        <span className={`font-body font-semibold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-coral'}`}>
          Time: {timeLeft}s
        </span>
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
