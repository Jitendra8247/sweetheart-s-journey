import { useState } from "react";
import { Heart, X } from "lucide-react";

interface TicTacToeGameProps {
  onComplete: () => void;
}

type CellValue = "heart" | "x" | null;

export const TicTacToeGame = ({ onComplete }: TicTacToeGameProps) => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<"player" | "ai" | "tie" | null>(null);

  const checkWinner = (squares: CellValue[]): CellValue => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAIMove = (squares: CellValue[]): number => {
    const available = squares.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "heart";
    setBoard(newBoard);

    const playerWin = checkWinner(newBoard);
    if (playerWin) {
      setGameOver(true);
      setWinner("player");
      setTimeout(onComplete, 1000);
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      setWinner("tie");
      return;
    }

    setIsPlayerTurn(false);

    // AI move
    setTimeout(() => {
      const aiMove = getAIMove(newBoard);
      if (aiMove !== undefined) {
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "x";
        setBoard(aiBoard);

        const aiWin = checkWinner(aiBoard);
        if (aiWin) {
          setGameOver(true);
          setWinner("ai");
          return;
        }

        if (aiBoard.every(cell => cell !== null)) {
          setGameOver(true);
          setWinner("tie");
          return;
        }
      }
      setIsPlayerTurn(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Love Tic-Tac-Toe</h2>
      <p className="text-muted-foreground font-body mb-4">
        You are <Heart className="inline text-primary" size={16} fill="currentColor" /> - Beat the AI!
      </p>

      {gameOver && (
        <div className="mb-4 p-3 rounded-xl bg-card border border-primary/20">
          <p className="font-script text-xl text-foreground">
            {winner === "player" && "You won! Love conquers all! 💕"}
            {winner === "ai" && "AI won! Try again!"}
            {winner === "tie" && "It's a tie! Love is complicated 💝"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto mb-4">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`
              aspect-square rounded-xl flex items-center justify-center
              transition-all duration-200 cursor-pointer
              bg-card border-2 border-primary/30 hover:border-primary
              ${cell ? 'cursor-default' : 'hover:scale-105'}
            `}
          >
            {cell === "heart" && (
              <Heart className="text-primary" size={32} fill="currentColor" />
            )}
            {cell === "x" && (
              <X className="text-muted-foreground" size={32} strokeWidth={3} />
            )}
          </div>
        ))}
      </div>

      {(gameOver && winner !== "player") && (
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
};
