import { useState } from "react";
import { Heart, Sparkles, Cake } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Checkpoint } from "@/components/Checkpoint";

// Scattered decorative emojis with positions
const decorativeEmojis = [
  { emoji: "💐", top: "8%", left: "5%" },
  { emoji: "💐", top: "10%", right: "8%" },
  { emoji: "🎈", top: "12%", right: "25%" },
  { emoji: "✨", top: "18%", left: "20%" },
  { emoji: "🎂", top: "24%", left: "35%" },
  { emoji: "🖤", top: "15%", left: "3%" },
  { emoji: "💕", top: "28%", right: "5%" },
  { emoji: "🐧", top: "42%", right: "8%" },
  { emoji: "😺", top: "48%", left: "45%" },
  { emoji: "👫", top: "52%", left: "25%" },
  { emoji: "💐", top: "55%", right: "15%" },
  { emoji: "💕", top: "62%", right: "18%" },
  { emoji: "🐶", top: "68%", right: "25%" },
  { emoji: "🐧", top: "75%", left: "42%" },
  { emoji: "💕", top: "72%", left: "15%" },
  { emoji: "🖤", top: "85%", left: "8%" },
  { emoji: "💐", top: "88%", right: "12%" },
  { emoji: "✨", top: "92%", right: "30%" },
];

// Checkpoint positions for the winding path (percentages)
const checkpointPositions = [
  { top: "12%", left: "15%" },    // 1
  { top: "14%", left: "40%" },    // 2
  { top: "22%", right: "12%" },   // 3
  { top: "32%", left: "45%" },    // 4
  { top: "38%", left: "18%" },    // 5
  { top: "50%", left: "35%" },    // 6
  { top: "48%", right: "15%" },   // 7
  { top: "62%", right: "10%" },   // 8
  { top: "75%", left: "30%" },    // 9
  { top: "88%", left: "35%" },    // 10
];

// SVG path connecting checkpoints
const PathLine = ({ completed }: { completed: number }) => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--coral))" />
      </linearGradient>
    </defs>
    {/* Background path */}
    <path
      d="M 18 14 L 42 15 Q 55 15 60 18 L 82 24 Q 88 28 85 32 L 55 34 Q 45 35 35 38 L 22 40 Q 15 42 18 48 L 38 52 Q 50 52 60 50 L 80 50 Q 90 52 88 58 L 85 64 Q 82 68 70 72 L 45 76 Q 35 78 38 85 L 40 90"
      fill="none"
      stroke="hsl(var(--muted))"
      strokeWidth="0.8"
      strokeLinecap="round"
      className="transition-all duration-500"
    />
    {/* Completed path overlay */}
    <path
      d="M 18 14 L 42 15 Q 55 15 60 18 L 82 24 Q 88 28 85 32 L 55 34 Q 45 35 35 38 L 22 40 Q 15 42 18 48 L 38 52 Q 50 52 60 50 L 80 50 Q 90 52 88 58 L 85 64 Q 82 68 70 72 L 45 76 Q 35 78 38 85 L 40 90"
      fill="none"
      stroke="url(#pathGradient)"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeDasharray="200"
      strokeDashoffset={200 - (completed * 20)}
      className="transition-all duration-1000"
    />
  </svg>
);

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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Header */}
      <div className="text-center pt-6 pb-2 relative z-20">
        <h1 className="text-3xl md:text-4xl font-script text-foreground mb-1">
          HAPPY BIRTHDAY
        </h1>
        <h2 className="text-2xl md:text-3xl font-script text-foreground mb-2">
          MY LOVE
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-body">
          <Cake className="text-primary" size={20} />
          <span>cake.. with candles</span>
        </div>
        <p className="text-sm text-primary font-body mt-2">
          Progress: {completedCheckpoints.length}/10
        </p>
      </div>

      {/* Winding Path Container */}
      <div className="relative w-full min-h-[1200px] md:min-h-[1000px]">
        {/* Connecting Path */}
        <PathLine completed={completedCheckpoints.length} />

        {/* Scattered Emojis */}
        {decorativeEmojis.map((item, index) => (
          <div
            key={index}
            className="absolute text-lg md:text-xl animate-float pointer-events-none select-none"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Checkpoints */}
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <div
            key={num}
            className="absolute z-10"
            style={{
              top: checkpointPositions[num - 1].top,
              left: checkpointPositions[num - 1].left,
              right: checkpointPositions[num - 1].right,
            }}
          >
            <Checkpoint
              number={num}
              isUnlocked={isUnlocked(num)}
              isCompleted={completedCheckpoints.includes(num)}
              onComplete={() => handleComplete(num)}
              onSelect={() => setSelectedCheckpoint(selectedCheckpoint === num ? null : num)}
              isSelected={selectedCheckpoint === num}
            />
          </div>
        ))}
      </div>

      {/* Completion message */}
      {completedCheckpoints.length === 10 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 animate-fade-up">
          <div className="bg-gradient-to-r from-primary to-coral rounded-2xl p-6 max-w-sm mx-auto shadow-romantic">
            <Sparkles className="mx-auto text-primary-foreground mb-3" size={28} />
            <h2 className="text-2xl font-script text-primary-foreground mb-2 text-center">
              Journey Complete!
            </h2>
            <p className="text-primary-foreground/90 font-body text-sm text-center">
              Thank you for completing our love journey. You mean the world to me! 💝
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
