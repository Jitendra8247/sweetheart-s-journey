import { useState } from "react";
import { Heart, Sparkles, Star } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Checkpoint } from "@/components/Checkpoint";
import { BurstEmoji } from "@/components/BurstEmoji";
import { Diary } from "@/components/Diary";
import { IntroSequence } from "@/components/IntroSequence";
import birthdayCake from "@/assets/birthday-cake.png";
import penguinBackground from "@/assets/penguin-background.jpg";

// Interactive emojis with burst effect - reduced count
const interactiveEmojis: { type: "heart" | "star" | "balloon" | "rose"; top: string; left?: string; right?: string }[] = [
  { type: "rose", top: "8%", left: "8%" },
  { type: "heart", top: "20%", right: "10%" },
  { type: "balloon", top: "35%", left: "5%" },
  { type: "star", top: "50%", right: "8%" },
  { type: "heart", top: "65%", left: "10%" },
  { type: "rose", top: "80%", right: "12%" },
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
      strokeWidth="1.2"
      strokeLinecap="round"
      className="transition-all duration-500"
    />
    {/* Completed path overlay */}
    <path
      d="M 18 14 L 42 15 Q 55 15 60 18 L 82 24 Q 88 28 85 32 L 55 34 Q 45 35 35 38 L 22 40 Q 15 42 18 48 L 38 52 Q 50 52 60 50 L 80 50 Q 90 52 88 58 L 85 64 Q 82 68 70 72 L 45 76 Q 35 78 38 85 L 40 90"
      fill="none"
      stroke="url(#pathGradient)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="300"
      strokeDashoffset={300 - (completed * 30)}
      className="transition-all duration-1000"
    />
  </svg>
);

// Hero section with birthday message
const HeroSection = () => (
  <div 
    className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
  >
    <FloatingHearts />
    
    {/* Main content */}
    <div className="relative z-10 text-center px-6 animate-fade-up">
      {/* Hearts decoration above title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" />
        <Heart className="text-coral animate-heartbeat" size={40} fill="currentColor" style={{ animationDelay: "0.2s" }} />
        <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" style={{ animationDelay: "0.4s" }} />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-script text-foreground mb-2 drop-shadow-lg">
        Happy Birthday
      </h1>
      <h2 className="text-4xl md:text-6xl font-script text-gradient mb-8">
        My Love
      </h2>
      
      {/* Cake image */}
      <div className="relative inline-block mb-8">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <Sparkles className="text-coral animate-sparkle" size={20} />
          <Sparkles className="text-primary animate-sparkle" size={24} style={{ animationDelay: "0.3s" }} />
          <Sparkles className="text-coral animate-sparkle" size={20} style={{ animationDelay: "0.6s" }} />
        </div>
        <div className="bg-white/80 rounded-3xl p-6 shadow-romantic backdrop-blur-sm">
          <img src={birthdayCake} alt="Birthday Cake" className="w-32 h-32 md:w-40 md:h-40 object-contain animate-float" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl">✨🎂✨</div>
      </div>
      
      <p className="text-lg md:text-xl text-foreground/90 font-body mb-3 drop-shadow">
        Wishing you the most magical day ever! 🎉
      </p>
      <p className="text-base text-foreground/80 font-body mb-8 max-w-md mx-auto drop-shadow">
        Scroll down to explore our love journey with 10 special checkpoints 💕
      </p>
    </div>
    
    {/* Bottom decorations */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-3xl z-10">
      <span className="animate-wiggle">🐧</span>
      <span className="animate-wiggle" style={{ animationDelay: "0.2s" }}>💝</span>
      <span className="animate-wiggle" style={{ animationDelay: "0.4s" }}>🐧</span>
    </div>
  </div>
);

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(null);
  const [showDiaryAuto, setShowDiaryAuto] = useState(false);

  const handleComplete = (checkpoint: number) => {
    if (!completedCheckpoints.includes(checkpoint)) {
      const newCompleted = [...completedCheckpoints, checkpoint];
      setCompletedCheckpoints(newCompleted);
    }
    setSelectedCheckpoint(null);
  };

  const isUnlocked = (checkpoint: number) => {
    if (checkpoint === 1) return true;
    return completedCheckpoints.includes(checkpoint - 1);
  };

  // Show intro sequence first
  if (!introComplete) {
    return <IntroSequence onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div 
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${penguinBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Global overlay for readability */}
      <div className="fixed inset-0 bg-background/40 backdrop-blur-[2px] pointer-events-none" />
      
      {/* Hero Section - Full Page */}
      <HeroSection />
      
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

          {/* Interactive Burst Emojis */}
          {interactiveEmojis.map((item, index) => (
            <BurstEmoji
              key={index}
              type={item.type}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                animationDelay: `${index * 0.3}s`,
              }}
            />
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

      {/* Auto-show Diary when all 9 checkpoints are complete */}
      {showDiaryAuto && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-romantic relative z-[101]">
            <Diary 
              onUnlock={() => {
                handleComplete(10);
                setShowDiaryAuto(false);
              }} 
              isUnlocked={completedCheckpoints.includes(10)} 
            />
            <button
              onClick={() => setShowDiaryAuto(false)}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors font-body block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
