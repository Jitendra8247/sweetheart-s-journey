import { useState, useEffect } from "react";

interface ConfettiOverlayProps {
  onClear: () => void;
  message?: string;
}

const confettiEmojis = ["🎉", "🎊", "🎈", "🎁", "💝", "✨", "🌸", "💕", "🎂", "🥳"];

export const ConfettiOverlay = ({ onClear, message = "Pop all the confetti to continue! 🎉" }: ConfettiOverlayProps) => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; emoji: string; popped: boolean }[]>([]);
  const [allPopped, setAllPopped] = useState(false);

  useEffect(() => {
    // Generate 15-20 random confetti pieces
    const count = Math.floor(Math.random() * 6) + 15;
    const pieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      popped: false,
    }));
    setConfetti(pieces);
  }, []);

  const handlePop = (id: number) => {
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

  const remaining = confetti.filter(c => !c.popped).length;

  return (
    <div className="fixed inset-0 z-[200] bg-foreground/30 backdrop-blur-sm">
      {/* Message */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-[210]">
        <div className="bg-card/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-romantic">
          <p className="text-lg md:text-xl font-script text-foreground">{message}</p>
          <p className="text-sm text-primary font-body mt-1">
            {allPopped ? "🎉 All done!" : `${remaining} remaining`}
          </p>
        </div>
      </div>

      {/* Confetti pieces */}
      {confetti.map(piece => (
        !piece.popped && (
          <button
            key={piece.id}
            onClick={() => handlePop(piece.id)}
            className="absolute text-3xl md:text-4xl cursor-pointer transition-all duration-200 hover:scale-150 animate-float"
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
