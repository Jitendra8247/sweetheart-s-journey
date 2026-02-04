import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

interface LoveLoadingScreenProps {
  onComplete: () => void;
  message: string;
  duration?: number;
}

const loveMessages = [
  "Loading more love... 💕",
  "Preparing something special... ✨",
  "Adding extra sweetness... 🍯",
  "Sprinkling magic... 🌟",
  "Warming hearts... 💖",
];

export const LoveLoadingScreen = ({ onComplete, message, duration = 3000 }: LoveLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loveMessages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-rose-100 via-pink-50 to-coral-50 flex items-center justify-center">
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
            size={Math.random() * 30 + 10}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-6">
        {/* Animated icons */}
        <div className="flex justify-center gap-4 mb-8">
          <Heart className="text-primary animate-heartbeat" size={40} fill="currentColor" />
          <Sparkles className="text-coral animate-sparkle" size={36} />
          <Star className="text-primary animate-wiggle" size={32} fill="currentColor" />
          <Sparkles className="text-coral animate-sparkle" size={36} style={{ animationDelay: "0.3s" }} />
          <Heart className="text-primary animate-heartbeat" size={40} fill="currentColor" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Main message */}
        <h2 className="text-3xl md:text-4xl font-script text-foreground mb-4 animate-pulse">
          {message}
        </h2>

        {/* Sub message */}
        <p className="text-lg text-primary font-body mb-8 transition-all duration-500">
          {loveMessages[currentMessage]}
        </p>

        {/* Progress bar */}
        <div className="w-64 mx-auto bg-white/50 rounded-full h-4 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-primary via-coral to-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground font-body mt-3">{progress}% complete</p>

        {/* Bouncing emojis */}
        <div className="flex justify-center gap-6 mt-8 text-3xl">
          <span className="animate-bounce" style={{ animationDelay: "0s" }}>🐧</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>💝</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🎂</span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>💕</span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>🐧</span>
        </div>
      </div>
    </div>
  );
};
