import { useState, useEffect } from "react";

interface ConfettiOverlayProps {
  onClear: () => void;
  message?: string;
}

const confettiEmojis = ["🎉", "🎊", "🎈", "🎁", "💝", "✨", "🌸", "💕", "🎂", "🥳"];

export const ConfettiOverlay = ({ onClear, message = "Pop all the confetti to continue! 🎉" }: ConfettiOverlayProps) => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string; popped: boolean }[]>([]);
  const [allPopped, setAllPopped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [timeFailed, setTimeFailed] = useState(false);

  useEffect(() => {
    // Generate 15-20 random confetti pieces
    const count = Math.floor(Math.random() * 6) + 15;
    const pieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 25, // Start from 25% down to avoid message area
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      popped: false,
    }));
    setConfetti(pieces);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (allPopped || timeFailed) return;
    if (timeLeft <= 0) {
      setTimeFailed(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, allPopped, timeFailed]);

  const handlePop = (id: number) => {
    if (timeFailed) return;
    
    setConfetti(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, popped: true } : c);
      const allDone = updated.every(c => c.popped);
      if (allDone) {
        setAllPopped(true);
        setTimeout(onClear, 500);
      }
      return updated;
    });
  };

  const handleRetry = () => {
    // Reset everything
    const count = Math.floor(Math.random() * 6) + 15;
    const pieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 25,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      popped: false,
    }));
    setConfetti(pieces);
    setTimeLeft(8);
    setTimeFailed(false);
    setAllPopped(false);
  };

  const remaining = confetti.filter(c => !c.popped).length;

  return (
    <div className="fixed inset-0 z-[200] bg-foreground/30 backdrop-blur-sm">
      {/* Message */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-[210]">
        <div className="bg-card/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-romantic">
          <p className="text-lg md:text-xl font-script text-foreground">{message}</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-sm text-primary font-body">
              {allPopped ? "🎉 All done!" : `${remaining} remaining`}
            </p>
            <p className={`text-sm font-body font-bold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
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
              You are not allowed to go further until you pop them
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

      {/* Confetti pieces */}
      {confetti.map(piece => (
        !piece.popped && (
          <button
            key={piece.id}
            onClick={() => handlePop(piece.id)}
            className={`absolute text-3xl md:text-4xl cursor-pointer transition-all duration-200 hover:scale-150 animate-float ${timeFailed ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              animationDelay: `${piece.id * 0.1}s`,
            }}
          >
            {piece.emoji}
          </button>
        )
      ))}

      {/* Popped effect */}
      {confetti.map(piece => (
        piece.popped && (
          <div
            key={`popped-${piece.id}`}
            className="absolute text-2xl animate-scale-out pointer-events-none"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
            }}
          >
            ✨
          </div>
        )
      ))}
    </div>
  );
};
