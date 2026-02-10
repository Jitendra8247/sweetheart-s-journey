import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface PuzzleGameProps {
  onComplete: () => void;
}

export const PuzzleGame = ({ onComplete }: PuzzleGameProps) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create a solvable puzzle (simple shuffle)
    let shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = 0; i < 50; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const possibleMoves = getValidMoves(emptyIndex);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      shuffled = swapTiles(shuffled, emptyIndex, randomMove);
    }
    setTiles(shuffled);
    setMoves(0);
  };

  const getValidMoves = (emptyIndex: number): number[] => {
    const moves: number[] = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    
    if (row > 0) moves.push(emptyIndex - 3);
    if (row < 2) moves.push(emptyIndex + 3);
    if (col > 0) moves.push(emptyIndex - 1);
    if (col < 2) moves.push(emptyIndex + 1);
    
    return moves;
  };

  const swapTiles = (arr: number[], i: number, j: number): number[] => {
    const newArr = [...arr];
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    return newArr;
  };

  const handleTileClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);
    
    if (validMoves.includes(index)) {
      const newTiles = swapTiles(tiles, emptyIndex, index);
      setTiles(newTiles);
      setMoves(m => m + 1);
      
      // Check win condition
      const isSolved = newTiles.every((tile, idx) => 
        tile === (idx + 1) % 9
      );
      
      if (isSolved) {
        setTimeout(onComplete, 500);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Slide Puzzle</h2>
      <p className="text-muted-foreground font-body mb-2">Arrange numbers 1-8 in order if you can minus iq wali baby</p>
      <p className="text-sm text-primary font-body mb-6">Moves: {moves}</p>

      <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
        {tiles.map((tile, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-2xl font-script
              transition-all duration-200 cursor-pointer
              ${tile === 0 
                ? 'bg-transparent' 
                : 'bg-primary text-primary-foreground shadow-card hover:scale-105 hover:shadow-romantic'
              }
            `}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="mt-6 px-6 py-2 border-2 border-primary text-primary rounded-full font-body font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Shuffle Again
      </button>
    </div>
  );
};
