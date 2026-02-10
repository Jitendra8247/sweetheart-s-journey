import { useState } from "react";
import { Heart, Star, Moon, Sun, Flower2 } from "lucide-react";

interface FindDifferenceGameProps {
  onComplete: () => void;
}

const basePattern = [Heart, Star, Moon, Heart, Sun, Flower2, Star, Moon, Heart];
const differentIndex = 4; // Sun is different

export const FindDifferenceGame = ({ onComplete }: FindDifferenceGameProps) => {
  const [found, setFound] = useState(false);
  const [wrongClick, setWrongClick] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (found) return;

    if (index === differentIndex) {
      setFound(true);
      setTimeout(onComplete, 1000);
    } else {
      setWrongClick(index);
      setTimeout(() => setWrongClick(null), 500);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-2">Find the Different One!</h2>
      <p className="text-muted-foreground font-body mb-6">
        One of these is not like the others
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-48 mx-auto">
        {basePattern.map((Icon, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`
              aspect-square rounded-xl flex items-center justify-center cursor-pointer
              transition-all duration-300 transform
              ${found && index === differentIndex 
                ? 'bg-green-100 scale-110 ring-4 ring-green-400' 
                : 'bg-card border-2 border-primary/20 hover:border-primary hover:scale-105'
              }
              ${wrongClick === index ? 'animate-shake bg-red-100' : ''}
            `}
          >
            <Icon 
              className={`
                ${index === differentIndex ? 'text-coral' : 'text-primary'}
                ${found && index === differentIndex ? 'animate-heartbeat' : ''}
              `} 
              size={28} 
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {found && (
        <p className="mt-6 text-lg font-script text-primary animate-fade-up">
          You found it! YOU ARE MY SUNSHINE BABY!
        </p>
      )}

      <p className="mt-4 text-sm text-muted-foreground font-body italic">
        Hint: Its You For Me
      </p>
    </div>
  );
};
