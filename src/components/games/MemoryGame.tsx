import { useState, useEffect } from "react";
import { Bird, Feather, Egg, TreeDeciduous, Leaf, CloudSun } from "lucide-react";

interface MemoryGameProps {
  onComplete: () => void;
}

// Different bird-themed icons for the memory game
const icons = [Bird, Feather, Egg, TreeDeciduous, Leaf, CloudSun];

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [showFailMessage, setShowFailMessage] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          setShowFailMessage(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const initializeGame = () => {
    const iconIndices = [...Array(6).keys(), ...Array(6).keys()]; // [0,1,2,3,4,5,0,1,2,3,4,5]
    const shuffled = iconIndices.sort(() => Math.random() - 0.5);
    
    const gameCards: Card[] = shuffled.map((iconIndex, position) => ({
      id: position, // Use position as the unique identifier
      iconIndex,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setIsChecking(false);
    setTimeLeft(30);
    setGameOver(false);
    setShowFailMessage(false);
  };

  const handleCardClick = (clickedIndex: number) => {
    if (gameOver) return;
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    if (cards[clickedIndex].isFlipped || cards[clickedIndex].isMatched) return;

    const newCards = [...cards];
    newCards[clickedIndex].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, clickedIndex];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);
      
      const [first, second] = newFlipped;
      
      if (newCards[first].iconIndex === newCards[second].iconIndex) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setIsChecking(false);

          if (matchedCards.every(c => c.isMatched)) {
            setGameOver(true);
            setTimeout(onComplete, 500);
          }
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Memory Match</h2>
      <p className="text-muted-foreground font-body mb-4">Find all matching pairs!</p>
      
      <div className="flex items-center justify-center gap-6 mb-6">
        <p className="text-sm text-primary font-body">Moves: {moves}</p>
        <p className={`text-sm font-body font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
          Time: {timeLeft}s
        </p>
      </div>

      {/* Failure Message */}
      {showFailMessage && (
        <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-xl p-4 animate-fade-up">
          <p className="text-xl font-script text-red-600 mb-2">
            Haar Gayi Chalo Dobara Try Karo 😅
          </p>
          <button
            onClick={initializeGame}
            className="mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
        {cards.map((card, index) => {
          const IconComponent = icons[card.iconIndex];
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`
                aspect-square rounded-xl cursor-pointer transition-all duration-300 transform
                ${card.isFlipped || card.isMatched 
                  ? 'bg-primary rotate-0 scale-100' 
                  : 'bg-card border-2 border-primary/30 hover:border-primary hover:scale-105'
                }
                ${card.isMatched ? 'opacity-70' : ''}
                ${gameOver && !card.isMatched ? 'opacity-50 cursor-not-allowed' : ''}
                flex items-center justify-center shadow-card
              `}
            >
              {(card.isFlipped || card.isMatched) && (
                <IconComponent 
                  className="text-primary-foreground" 
                  size={28} 
                  fill="currentColor"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
