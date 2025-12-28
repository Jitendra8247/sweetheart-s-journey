import { useState } from "react";
import { Heart } from "lucide-react";

interface CompleteHeartGameProps {
  onComplete: () => void;
}

export const CompleteHeartGame = ({ onComplete }: CompleteHeartGameProps) => {
  const [pieces, setPieces] = useState([
    { id: 1, placed: false, position: { x: 0, y: 0 } },
    { id: 2, placed: false, position: { x: 0, y: 0 } },
    { id: 3, placed: false, position: { x: 0, y: 0 } },
    { id: 4, placed: false, position: { x: 0, y: 0 } },
  ]);
  const [currentPiece, setCurrentPiece] = useState(0);

  const handlePlacePiece = () => {
    const newPieces = [...pieces];
    newPieces[currentPiece].placed = true;
    setPieces(newPieces);

    if (currentPiece < 3) {
      setCurrentPiece(c => c + 1);
    } else {
      setTimeout(onComplete, 1000);
    }
  };

  const allPlaced = pieces.every(p => p.placed);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Complete the Heart</h2>
      <p className="text-muted-foreground font-body mb-6">
        Click to place each piece of the heart
      </p>

      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Heart outline */}
        <div className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-full flex items-center justify-center">
          <Heart 
            className={`text-primary/20 transition-all duration-500 ${allPlaced ? 'text-primary animate-heartbeat' : ''}`} 
            size={100} 
            fill={allPlaced ? "currentColor" : "none"}
            strokeWidth={allPlaced ? 0 : 1}
          />
        </div>

        {/* Placed pieces */}
        {pieces.map((piece, index) => (
          piece.placed && (
            <div
              key={piece.id}
              className="absolute animate-fade-up"
              style={{
                left: `${20 + (index % 2) * 40}%`,
                top: `${20 + Math.floor(index / 2) * 40}%`,
              }}
            >
              <Heart 
                className="text-primary" 
                size={40} 
                fill="currentColor"
              />
            </div>
          )
        ))}
      </div>

      {!allPlaced ? (
        <>
          <p className="text-sm text-primary font-body mb-4">
            Piece {currentPiece + 1} of 4
          </p>
          <button
            onClick={handlePlacePiece}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic"
          >
            Place Piece 💕
          </button>
        </>
      ) : (
        <p className="text-xl font-script text-primary animate-fade-up">
          Our hearts are now complete! 💝
        </p>
      )}
    </div>
  );
};
