import { useState } from "react";
import { Heart, Lock, CheckCircle } from "lucide-react";
import { Envelope } from "./Envelope";
import { MemoryGame } from "./games/MemoryGame";
import { CatchHeartsGame } from "./games/CatchHeartsGame";
import { WordScrambleGame } from "./games/WordScrambleGame";
import { PuzzleGame } from "./games/PuzzleGame";
import { TicTacToeGame } from "./games/TicTacToeGame";
import { LoveQuizGame } from "./games/LoveQuizGame";
import { NumberGuessGame } from "./games/NumberGuessGame";
import { ClickHeartGame } from "./games/ClickHeartGame";
import { FindDifferenceGame } from "./games/FindDifferenceGame";
import { CompleteHeartGame } from "./games/CompleteHeartGame";
import { Diary } from "./Diary";

interface CheckpointProps {
  number: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const checkpointMessages = [
  "You are the reason my heart beats faster every day.",
  "With you, every moment becomes a beautiful memory.",
  "Your love is the greatest gift I've ever received.",
  "You make me want to be a better person.",
  "In your eyes, I found my forever home.",
  "Every day with you is a new adventure.",
  "You're not just my love, you're my best friend.",
  "My heart chose you, and it was the best choice ever.",
  "Together, we can conquer anything.",
  "You are my today, tomorrow, and forever.",
];

const games = [
  { name: "Memory Match", component: MemoryGame },
  { name: "Catch Hearts", component: CatchHeartsGame },
  { name: "Word Scramble", component: WordScrambleGame },
  { name: "Slide Puzzle", component: PuzzleGame },
  { name: "Love Tic-Tac-Toe", component: TicTacToeGame },
  { name: "Love Quiz", component: LoveQuizGame },
  { name: "Number Guess", component: NumberGuessGame },
  { name: "Click Heart", component: ClickHeartGame },
  { name: "Find Difference", component: FindDifferenceGame },
  { name: "Complete Heart", component: CompleteHeartGame },
];

export const Checkpoint = ({ 
  number, 
  isUnlocked, 
  isCompleted, 
  onComplete, 
  onSelect,
  isSelected 
}: CheckpointProps) => {
  const [showGame, setShowGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const handleGameComplete = () => {
    setGameCompleted(true);
    setShowGame(false);
    setShowEnvelope(true);
  };

  const handleEnvelopeClose = () => {
    setShowEnvelope(false);
    onComplete();
  };

  const handleDiaryUnlock = () => {
    onComplete();
  };

  const GameComponent = games[number - 1]?.component;

  // Checkpoint 10 is special - it's the diary
  if (number === 10) {
    return (
      <>
        <button
          onClick={() => isUnlocked && onSelect()}
          disabled={!isUnlocked}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-300 transform
            ${isUnlocked 
              ? isCompleted
                ? 'bg-coral text-primary-foreground shadow-romantic scale-110'
                : 'bg-primary text-primary-foreground shadow-romantic hover:scale-110 animate-heartbeat'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          {isCompleted ? (
            <CheckCircle size={28} />
          ) : isUnlocked ? (
            <Heart size={28} fill="currentColor" />
          ) : (
            <Lock size={24} />
          )}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-body text-muted-foreground">
            Final
          </span>
        </button>

        {isSelected && isUnlocked && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-romantic">
              <Diary onUnlock={handleDiaryUnlock} />
              <button
                onClick={onSelect}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors font-body block mx-auto"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => isUnlocked && onSelect()}
        disabled={!isUnlocked}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center
          transition-all duration-300 transform
          ${isUnlocked 
            ? isCompleted
              ? 'bg-primary/70 text-primary-foreground shadow-card'
              : 'bg-primary text-primary-foreground shadow-romantic hover:scale-110'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
        `}
      >
        {isCompleted ? (
          <CheckCircle size={24} />
        ) : isUnlocked ? (
          <span className="font-script text-xl">{number}</span>
        ) : (
          <Lock size={20} />
        )}
      </button>

      {isSelected && isUnlocked && !isCompleted && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl p-8 max-w-md w-full shadow-romantic">
            {!showGame && !gameCompleted && (
              <div className="text-center">
                <h2 className="text-2xl font-script text-foreground mb-2">
                  Checkpoint {number}
                </h2>
                <p className="text-muted-foreground font-body mb-6">
                  Complete the game to unlock your message!
                </p>
                <p className="text-primary font-body font-medium mb-6">
                  Game: {games[number - 1]?.name}
                </p>
                <button
                  onClick={() => setShowGame(true)}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors shadow-romantic"
                >
                  Start Game 💕
                </button>
              </div>
            )}

            {showGame && GameComponent && (
              <GameComponent onComplete={handleGameComplete} />
            )}

            <button
              onClick={onSelect}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors font-body block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEnvelope && (
        <Envelope
          message={checkpointMessages[number - 1]}
          checkpointNumber={number}
          onClose={handleEnvelopeClose}
        />
      )}
    </>
  );
};
