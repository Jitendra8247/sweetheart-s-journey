import { useState, useEffect } from "react";

interface FloatingDistractionProps {
  isActive: boolean;
}

const distractions = ["🦋", "🌸", "✨", "🌈", "🎀", "🌺", "💫", "🍭"];

export const FloatingDistraction = ({ isActive }: FloatingDistractionProps) => {
  const [items, setItems] = useState<{ id: number; x: number; y: number; emoji: string; dx: number; dy: number }[]>([]);

  useEffect(() => {
    if (!isActive) {
      setItems([]);
      return;
    }

    // Create initial distractions
    const initial = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      emoji: distractions[Math.floor(Math.random() * distractions.length)],
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
    }));
    setItems(initial);

    // Animate movement
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        let newX = item.x + item.dx;
        let newY = item.y + item.dy;
        let newDx = item.dx;
        let newDy = item.dy;

        // Bounce off edges
        if (newX <= 5 || newX >= 95) {
          newDx = -newDx;
          newX = Math.max(5, Math.min(95, newX));
        }
        if (newY <= 5 || newY >= 95) {
          newDy = -newDy;
          newY = Math.max(5, Math.min(95, newY));
        }

        return { ...item, x: newX, y: newY, dx: newDx, dy: newDy };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive || items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[50]">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute text-2xl md:text-3xl transition-transform duration-100"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};
