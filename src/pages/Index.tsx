import { useState } from "react";
import { Heart, Sparkles, Cake, Star, Music, Gift } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Checkpoint } from "@/components/Checkpoint";

// Scattered decorative emojis with positions - MORE and BIGGER
const decorativeEmojis = [
  { emoji: "💐", top: "5%", left: "5%", size: "3xl" },
  { emoji: "💐", top: "8%", right: "8%", size: "4xl" },
  { emoji: "🎈", top: "15%", right: "20%", size: "3xl" },
  { emoji: "✨", top: "12%", left: "25%", size: "2xl" },
  { emoji: "🎂", top: "22%", left: "8%", size: "4xl" },
  { emoji: "🖤", top: "18%", right: "35%", size: "3xl" },
  { emoji: "💕", top: "28%", right: "5%", size: "4xl" },
  { emoji: "🌹", top: "35%", left: "3%", size: "3xl" },
  { emoji: "🦋", top: "32%", right: "12%", size: "3xl" },
  { emoji: "💝", top: "40%", left: "15%", size: "4xl" },
  { emoji: "🌸", top: "45%", right: "8%", size: "3xl" },
  { emoji: "💐", top: "52%", right: "25%", size: "4xl" },
  { emoji: "💕", top: "58%", left: "5%", size: "3xl" },
  { emoji: "🎀", top: "55%", right: "3%", size: "4xl" },
  { emoji: "🌺", top: "65%", left: "20%", size: "3xl" },
  { emoji: "💖", top: "68%", right: "15%", size: "4xl" },
  { emoji: "🦢", top: "72%", left: "8%", size: "3xl" },
  { emoji: "💐", top: "78%", right: "5%", size: "4xl" },
  { emoji: "🌷", top: "82%", left: "25%", size: "3xl" },
  { emoji: "💗", top: "85%", right: "20%", size: "4xl" },
  { emoji: "✨", top: "88%", left: "10%", size: "3xl" },
  { emoji: "🎁", top: "92%", right: "10%", size: "4xl" },
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

// Hero section with birthday message
const HeroSection = ({ onScrollDown }: { onScrollDown: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background via-rose-light/20 to-background">
    <FloatingHearts />
    
    {/* Decorative corners */}
    <div className="absolute top-8 left-8 text-5xl animate-float">💐</div>
    <div className="absolute top-8 right-8 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>💐</div>
    <div className="absolute bottom-32 left-12 text-4xl animate-float" style={{ animationDelay: "1s" }}>🌹</div>
    <div className="absolute bottom-32 right-12 text-4xl animate-float" style={{ animationDelay: "1.5s" }}>🌷</div>
    
    {/* Floating decorations */}
    <div className="absolute top-20 left-1/4 text-3xl animate-wiggle">✨</div>
    <div className="absolute top-32 right-1/4 text-3xl animate-wiggle" style={{ animationDelay: "0.3s" }}>💕</div>
    <div className="absolute top-1/4 left-16 text-4xl animate-float" style={{ animationDelay: "0.8s" }}>🦋</div>
    <div className="absolute top-1/4 right-16 text-4xl animate-float" style={{ animationDelay: "1.2s" }}>🎀</div>
    <div className="absolute bottom-1/3 left-20 text-3xl animate-wiggle" style={{ animationDelay: "0.6s" }}>💖</div>
    <div className="absolute bottom-1/3 right-20 text-3xl animate-wiggle" style={{ animationDelay: "0.9s" }}>🌸</div>
    
    {/* Sparkles */}
    <Sparkles className="absolute top-16 left-1/3 text-coral animate-sparkle" size={32} />
    <Sparkles className="absolute top-24 right-1/3 text-primary animate-sparkle" style={{ animationDelay: "0.5s" }} size={28} />
    <Star className="absolute bottom-40 left-1/4 text-coral animate-sparkle" style={{ animationDelay: "0.7s" }} size={24} fill="currentColor" />
    <Star className="absolute bottom-48 right-1/4 text-primary animate-sparkle" style={{ animationDelay: "1s" }} size={20} fill="currentColor" />
    
    {/* Main content */}
    <div className="relative z-10 text-center px-6 animate-fade-up">
      {/* Hearts decoration above title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" />
        <Heart className="text-coral animate-heartbeat" size={40} fill="currentColor" style={{ animationDelay: "0.2s" }} />
        <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" style={{ animationDelay: "0.4s" }} />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-script text-foreground mb-2 drop-shadow-lg">
        Happy Birthday
      </h1>
      <h2 className="text-5xl md:text-7xl font-script text-gradient mb-8">
        My Love
      </h2>
      
      {/* Cake with decorations */}
      <div className="relative inline-block mb-8">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <Sparkles className="text-coral animate-sparkle" size={20} />
          <Sparkles className="text-primary animate-sparkle" size={24} style={{ animationDelay: "0.3s" }} />
          <Sparkles className="text-coral animate-sparkle" size={20} style={{ animationDelay: "0.6s" }} />
        </div>
        <div className="bg-gradient-to-br from-primary/20 to-coral/20 rounded-3xl p-8 shadow-romantic">
          <Cake className="text-primary mx-auto animate-float" size={120} />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">🎂✨🎂</div>
      </div>
      
      <p className="text-xl md:text-2xl text-muted-foreground font-body mb-4">
        Wishing you the most magical day ever! 🎉
      </p>
      <p className="text-lg text-muted-foreground font-body mb-10 max-w-md mx-auto">
        Scroll down to explore our love journey with 10 special checkpoints 💕
      </p>
      
      {/* Scroll indicator */}
      <button
        onClick={onScrollDown}
        className="flex flex-col items-center gap-2 mx-auto group cursor-pointer"
      >
        <span className="text-primary font-body font-medium group-hover:text-coral transition-colors">
          Scroll Down
        </span>
        <div className="w-8 h-12 rounded-full border-2 border-primary flex items-start justify-center p-2 group-hover:border-coral transition-colors">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce group-hover:bg-coral transition-colors" />
        </div>
      </button>
    </div>
    
    {/* Bottom decorations */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-4xl">
      <span className="animate-wiggle">🌹</span>
      <span className="animate-wiggle" style={{ animationDelay: "0.2s" }}>💝</span>
      <span className="animate-wiggle" style={{ animationDelay: "0.4s" }}>🌹</span>
    </div>
  </div>
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

  const scrollToCheckpoints = () => {
    const checkpointsSection = document.getElementById('checkpoints-section');
    checkpointsSection?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="bg-background relative overflow-x-hidden">
      {/* Hero Section - Full Page */}
      <HeroSection onScrollDown={scrollToCheckpoints} />
      
      {/* Checkpoints Section */}
      <div id="checkpoints-section" className="min-h-screen relative pt-8">
        {/* Section Header */}
        <div className="text-center py-8 relative z-20">
          <h2 className="text-3xl md:text-4xl font-script text-foreground mb-2">
            Our Love Journey
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Complete each checkpoint to unlock the next 💕
          </p>
          <p className="text-sm text-primary font-body mt-2">
            Progress: {completedCheckpoints.length}/10
          </p>
        </div>

        {/* Winding Path Container */}
        <div className="relative w-full min-h-[1200px] md:min-h-[1000px]">
          {/* Connecting Path */}
          <PathLine completed={completedCheckpoints.length} />

          {/* Scattered Emojis - BIGGER */}
          {decorativeEmojis.map((item, index) => (
            <div
              key={index}
              className={`absolute text-${item.size} animate-float pointer-events-none select-none`}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                animationDelay: `${index * 0.3}s`,
                fontSize: item.size === "4xl" ? "2.5rem" : item.size === "3xl" ? "2rem" : "1.5rem",
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
