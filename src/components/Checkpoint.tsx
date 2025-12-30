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
  const [diaryUnlocked, setDiaryUnlocked] = useState(false);

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
    setDiaryUnlocked(true);
    onComplete();
  };

  const GameComponent = games[number - 1]?.component;

  // Stone-like checkpoint styling
  const stoneStyles = `
    relative flex items-center justify-center
    transition-all duration-300 transform cursor-pointer
    border-2 border-foreground/80 rounded-[40%_60%_50%_50%/50%_40%_60%_50%]
    bg-background shadow-md hover:shadow-lg
    font-script text-2xl md:text-3xl text-foreground
  `;

  // Checkpoint 10 is special - it's the diary
  if (number === 10) {
    return (
      <>
        <button
          onClick={() => isUnlocked && onSelect()}
          disabled={!isUnlocked}
          className={`
            ${stoneStyles}
            w-16 h-14 md:w-20 md:h-16
            ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
            ${isCompleted ? 'bg-primary/20 border-primary' : ''}
          `}
        >
          {isCompleted ? (
            <CheckCircle size={28} className="text-primary" />
          ) : isUnlocked ? (
            <span>{number}</span>
          ) : (
            <Lock size={20} className="text-muted-foreground" />
          )}
        </button>

        {isSelected && isUnlocked && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-romantic relative z-[101]">
              <Diary onUnlock={handleDiaryUnlock} isUnlocked={diaryUnlocked} />
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
          ${stoneStyles}
          w-14 h-12 md:w-16 md:h-14
          ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
          ${isCompleted ? 'bg-primary/20 border-primary' : ''}
        `}
      >
        {isCompleted ? (
          <CheckCircle size={24} className="text-primary" />
        ) : isUnlocked ? (
          <span>{number}</span>
        ) : (
          <Lock size={18} className="text-muted-foreground" />
        )}
      </button>

      {isSelected && isUnlocked && !isCompleted && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-[100] p-2 sm:p-4">
          <div className="bg-background rounded-2xl p-4 sm:p-8 max-w-md w-full min-h-[70vh] sm:min-h-[60vh] shadow-romantic relative z-[101] flex flex-col">
            {!showGame && !gameCompleted && (
              <div className="text-center flex-1 flex flex-col justify-center">
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
              <div className="flex-1 flex flex-col justify-center">
                <GameComponent onComplete={handleGameComplete} />
              </div>
            )}

            {!showGame && (
              <button
                onClick={onSelect}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors font-body block mx-auto"
              >
                Close
              </button>
            )}
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
