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

  useEffect(() => {
    initializeGame();
  }, []);

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
  };

  const handleCardClick = (clickedIndex: number) => {
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
      <p className="text-sm text-primary font-body mb-6">Moves: {moves}</p>
      
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
