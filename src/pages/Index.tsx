import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Checkpoint } from "@/components/Checkpoint";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(null);

  const handleComplete = (checkpoint: number) => {
    if (!completedCheckpoints.includes(checkpoint)) {
      setCompletedCheckpoints([...completedCheckpoints, checkpoint]);
    }
    setSelectedCheckpoint(null);
  };

  const isUnlocked = (checkpoint: number) => {
    if (checkpoint === 1) return true;
    return completedCheckpoints.includes(checkpoint - 1);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <FloatingHearts />
        
        <div className="relative z-10 text-center px-6 animate-fade-up">
          {/* Sparkles */}
          <Sparkles className="absolute -top-12 -left-8 text-coral animate-sparkle" size={24} />
          <Sparkles className="absolute -top-8 -right-12 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} size={20} />
          
          <Heart 
            className="mx-auto text-primary mb-6 animate-heartbeat drop-shadow-lg" 
            size={80} 
            fill="currentColor"
          />
          
          <h1 className="text-5xl md:text-7xl font-script text-foreground mb-4">
            For My Love
          </h1>
          
          <p className="text-xl text-muted-foreground font-body mb-2">
            A journey of 10 checkpoints
          </p>
          <p className="text-lg text-muted-foreground font-body mb-8">
            Each one holds a game and a message just for you 💕
          </p>
          
          <button
            onClick={() => setStarted(true)}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic"
          >
            Begin Our Journey
          </button>
          
          <p className="mt-8 text-sm text-muted-foreground font-body italic">
            Made with love, just for you ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart 
            className="mx-auto text-primary mb-4 animate-heartbeat" 
            size={48} 
            fill="currentColor"
          />
          <h1 className="text-4xl font-script text-foreground mb-2">
            Our Love Journey
          </h1>
          <p className="text-muted-foreground font-body">
            Complete each checkpoint to unlock the next 💕
          </p>
          <p className="text-sm text-primary font-body mt-2">
            Progress: {completedCheckpoints.length}/10
          </p>
        </div>

        {/* Progress Path */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num, index) => (
              <div key={num} className="flex items-center">
                <Checkpoint
                  number={num}
                  isUnlocked={isUnlocked(num)}
                  isCompleted={completedCheckpoints.includes(num)}
                  onComplete={() => handleComplete(num)}
                  onSelect={() => setSelectedCheckpoint(selectedCheckpoint === num ? null : num)}
                  isSelected={selectedCheckpoint === num}
                />
                {index < 9 && (
                  <div className={`
                    hidden md:block w-8 h-1 mx-2 rounded-full transition-colors duration-500
                    ${completedCheckpoints.includes(num) ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-6 max-w-md mx-auto shadow-card border border-primary/10">
            <h3 className="font-script text-2xl text-foreground mb-3">How to Play</h3>
            <ul className="text-left text-muted-foreground font-body space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Heart className="text-primary mt-1 flex-shrink-0" size={14} fill="currentColor" />
                <span>Click on a checkpoint to start its game</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="text-primary mt-1 flex-shrink-0" size={14} fill="currentColor" />
                <span>Complete the game to unlock a special message</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="text-primary mt-1 flex-shrink-0" size={14} fill="currentColor" />
                <span>Each message unlocks the next checkpoint</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="text-primary mt-1 flex-shrink-0" size={14} fill="currentColor" />
                <span>The final checkpoint holds a special surprise!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Completion message */}
        {completedCheckpoints.length === 10 && (
          <div className="mt-12 text-center animate-fade-up">
            <div className="bg-gradient-to-r from-primary to-coral rounded-2xl p-8 max-w-lg mx-auto shadow-romantic">
              <Sparkles className="mx-auto text-primary-foreground mb-4" size={32} />
              <h2 className="text-3xl font-script text-primary-foreground mb-4">
                Journey Complete!
              </h2>
              <p className="text-primary-foreground/90 font-body">
                Thank you for completing our love journey. Every word, every game, 
                every moment was created with love just for you. You mean the world to me! 💝
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
