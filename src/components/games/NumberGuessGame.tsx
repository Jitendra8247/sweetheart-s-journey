import { useState, useEffect } from "react";
import { Heart, ArrowUp, ArrowDown } from "lucide-react";

interface NumberGuessGameProps {
  onComplete: () => void;
}

export const NumberGuessGame = ({ onComplete }: NumberGuessGameProps) => {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState<"higher" | "lower" | "correct" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 7;

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 50) + 1);
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    
    if (isNaN(num) || num < 1 || num > 50) return;

    setAttempts(a => a + 1);

    if (num === target) {
      setHint("correct");
      setTimeout(onComplete, 1000);
    } else if (num < target) {
      setHint("higher");
    } else {
      setHint("lower");
    }

    setGuess("");
  };

  const restart = () => {
    setTarget(Math.floor(Math.random() * 50) + 1);
    setGuess("");
    setHint(null);
    setAttempts(0);
  };

  if (attempts >= maxAttempts && hint !== "correct") {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-script text-foreground mb-4">Out of Attempts!</h2>
        <p className="text-muted-foreground font-body mb-2">The number was {target}</p>
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
      <h2 className="text-3xl font-script text-foreground mb-2">Guess My Number</h2>
      <p className="text-muted-foreground font-body mb-2">I'm thinking of a number 1-50</p>
      <p className="text-sm text-primary font-body mb-6">
        Attempts: {attempts}/{maxAttempts}
      </p>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-primary/20 max-w-sm mx-auto">
        {hint && (
          <div className={`
            mb-4 p-3 rounded-xl flex items-center justify-center gap-2 font-body
            ${hint === "correct" ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}
          `}>
            {hint === "higher" && (
              <>
                <ArrowUp size={20} /> Go Higher!
              </>
            )}
            {hint === "lower" && (
              <>
                <ArrowDown size={20} /> Go Lower!
              </>
            )}
            {hint === "correct" && (
              <>
                <Heart size={20} fill="currentColor" /> Perfect! You got it!
              </>
            )}
          </div>
        )}

        <form onSubmit={handleGuess} className="flex gap-2">
          <input
            type="number"
            min="1"
            max="50"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter number..."
            className="flex-1 px-4 py-3 rounded-full border-2 border-primary/30 focus:border-primary focus:outline-none font-body text-center text-xl bg-background"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};
