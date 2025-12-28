import { useState } from "react";
import { Heart, Check, X } from "lucide-react";

interface LoveQuizGameProps {
  onComplete: () => void;
}

const questions = [
  {
    question: "What does 'Te Amo' mean?",
    options: ["I hate you", "I love you", "Goodbye", "Hello"],
    correct: 1,
  },
  {
    question: "Which flower symbolizes love?",
    options: ["Sunflower", "Daisy", "Rose", "Tulip"],
    correct: 2,
  },
  {
    question: "What color represents love?",
    options: ["Blue", "Green", "Red", "Yellow"],
    correct: 2,
  },
];

export const LoveQuizGame = ({ onComplete }: LoveQuizGameProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    
    setSelected(optionIndex);
    const isCorrect = optionIndex === questions[currentQ].correct;
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        if (score + (isCorrect ? 1 : 0) >= 2) {
          setTimeout(onComplete, 1500);
        }
      }
    }, 1000);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score >= 2;
    return (
      <div className="text-center">
        <h2 className="text-3xl font-script text-foreground mb-4">
          {passed ? "You're a Love Expert!" : "Keep Learning About Love!"}
        </h2>
        <p className="text-xl text-primary font-body mb-4">
          Score: {score}/{questions.length}
        </p>
        {!passed && (
          <button
            onClick={restart}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Love Quiz</h2>
      <p className="text-sm text-primary font-body mb-6">Question {currentQ + 1}/{questions.length}</p>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-primary/20 max-w-sm mx-auto">
        <p className="text-lg font-body text-foreground mb-6">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
              className={`
                w-full p-3 rounded-xl font-body transition-all duration-300
                flex items-center justify-between
                ${selected === null 
                  ? 'bg-secondary hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 hover:border-primary' 
                  : selected === index
                    ? index === q.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-400 text-white'
                    : index === q.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-secondary opacity-50'
                }
              `}
            >
              <span>{option}</span>
              {selected !== null && index === q.correct && (
                <Check size={20} />
              )}
              {selected === index && index !== q.correct && (
                <X size={20} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
