import { useState, useEffect } from "react";
import { Heart, Star, Moon, Sun, Flower2, Music } from "lucide-react";

interface MemoryGameProps {
  onComplete: () => void;
}

const icons = [Heart, Star, Moon, Sun, Flower2, Music];

interface Card {
  id: number;
  icon: typeof Heart;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [...icons, ...icons]
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(c => c.isMatched)) {
            setTimeout(onComplete, 500);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Memory Match</h2>
      <p className="text-muted-foreground font-body mb-4">Find all matching pairs!</p>
      <p className="text-sm text-primary font-body mb-6">Moves: {moves}</p>
      
      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square rounded-xl cursor-pointer transition-all duration-300 transform
              ${card.isFlipped || card.isMatched 
                ? 'bg-primary rotate-0 scale-100' 
                : 'bg-card border-2 border-primary/30 hover:border-primary hover:scale-105'
              }
              ${card.isMatched ? 'opacity-70' : ''}
              flex items-center justify-center shadow-card
            `}
          >
            {(card.isFlipped || card.isMatched) && (
              <card.icon 
                className="text-primary-foreground" 
                size={28} 
                fill="currentColor"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
