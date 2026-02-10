import { useState, useEffect } from "react";
import { Heart, RefreshCw } from "lucide-react";

interface WordScrambleGameProps {
  onComplete: () => void;
}

const loveWords = [
  { word: "LOVE", hint: "What I Do o You" },
  { word: "HEART", hint: "It beats for you" },
  { word: "KISS", hint: "What I Always Want To Do" },
  { word: "HUG", hint: "I want to do and hold you till i melt" },
  { word: "FOREVER", hint: "How long will you be there in my heart" },
];

export const WordScrambleGame = ({ onComplete }: WordScrambleGameProps) => {
  const [currentWord, setCurrentWord] = useState(loveWords[0]);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState(0);
  const [shake, setShake] = useState(false);

  const scrambleWord = (word: string): string => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  useEffect(() => {
    setScrambled(scrambleWord(currentWord.word));
  }, [currentWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guess.toUpperCase() === currentWord.word) {
      const newSolved = solved + 1;
      setSolved(newSolved);
      setGuess("");
      
      if (newSolved >= 3) {
        setTimeout(onComplete, 500);
      } else {
        const nextWord = loveWords[newSolved];
        setCurrentWord(nextWord);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const shuffleAgain = () => {
    setScrambled(scrambleWord(currentWord.word));
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Word Scramble</h2>
      <p className="text-muted-foreground font-body mb-4">Unscramble the love words!</p>
      <p className="text-sm text-primary font-body mb-6">Solved: {solved}/3</p>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-primary/20 max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`text-4xl font-script text-primary tracking-widest ${shake ? 'animate-shake' : ''}`}>
            {scrambled}
          </div>
          <button
            onClick={shuffleAgain}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground font-body mb-4 italic">
          Hint: {currentWord.hint}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Your answer..."
            className="flex-1 px-4 py-2 rounded-full border-2 border-primary/30 focus:border-primary focus:outline-none font-body bg-background"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};
