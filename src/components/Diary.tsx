import { useState } from "react";
import { Lock, ChevronLeft, ChevronRight, Heart, BookOpen } from "lucide-react";

interface DiaryProps {
  onUnlock: () => void;
}

const diaryPages = [
  { quote: "The day we met, my heart knew it was home.", photo: 1 },
  { quote: "Your smile is my favorite view in the world.", photo: 2 },
  { quote: "Every moment with you feels like magic.", photo: 3 },
  { quote: "You're my today and all of my tomorrows.", photo: 4 },
  { quote: "In your arms, I found my forever.", photo: 5 },
  { quote: "You make ordinary days extraordinary.", photo: 6 },
  { quote: "My heart beats your name.", photo: 7 },
  { quote: "You're the reason I believe in love.", photo: 8 },
  { quote: "Every love story is beautiful, but ours is my favorite.", photo: 9 },
  { quote: "With you, I am home.", photo: 10 },
  { quote: "You're my best adventure.", photo: 11 },
  { quote: "Together is my favorite place to be.", photo: 12 },
  { quote: "You had me at hello.", photo: 13 },
  { quote: "I fall in love with you more every day.", photo: 14 },
  { quote: "You're the missing piece I never knew I needed.", photo: 15 },
  { quote: "My soul recognized yours the moment we met.", photo: 16 },
  { quote: "You're my happy ending.", photo: 17 },
  { quote: "Forever isn't long enough with you.", photo: 18 },
  { quote: "You make my heart smile.", photo: 19 },
  { quote: "I choose you, and I'll choose you over and over.", photo: 20 },
  { quote: "You are my forever and always. I love you! 💕", photo: 21 },
];

export const Diary = ({ onUnlock, isUnlocked = false }: DiaryProps & { isUnlocked?: boolean }) => {
  const [isLocked, setIsLocked] = useState(!isUnlocked);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [shake, setShake] = useState(false);
  const [isOpen, setIsOpen] = useState(isUnlocked);

  const correctPassword = "11062023";

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setIsLocked(false);
      setTimeout(() => setIsOpen(true), 500);
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  const nextPage = () => {
    if (currentPage < diaryPages.length - 1) {
      setCurrentPage(p => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
    }
  };

  if (isLocked) {
    return (
      <div className="text-center">
        <div className={`relative inline-block ${shake ? 'animate-shake' : ''}`}>
          {/* Diary cover */}
          <div className="w-72 h-96 bg-gradient-to-br from-rose-dark to-primary rounded-lg shadow-romantic p-6 relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-primary-foreground"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  size={16}
                  fill="currentColor"
                />
              ))}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <BookOpen className="text-primary-foreground mb-4" size={48} />
              <h2 className="text-3xl font-script text-primary-foreground mb-2">
                Our Love Story
              </h2>
              <p className="text-primary-foreground/80 text-sm font-body mb-8">
                A diary of us 💕
              </p>

              {/* Lock */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <Lock className="text-primary-foreground" size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-muted-foreground font-body mb-2 italic">
            Hint: Do you still remember the date?
          </p>
          <p className="text-xs text-muted-foreground font-body mb-4">
            (Format: DDMMYYYY)
          </p>

          <form onSubmit={handleUnlock} className="max-w-xs mx-auto">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the date..."
              className="w-full px-4 py-3 rounded-full border-2 border-primary/30 focus:border-primary focus:outline-none font-body text-center bg-background mb-4"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors shadow-romantic"
            >
              Unlock Our Story 🔓
            </button>
          </form>
        </div>
      </div>
    );
  }

  const page = diaryPages[currentPage];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-script text-foreground mb-6">
        Our Love Story 💕
      </h2>

      {/* Open Diary */}
      <div className={`relative transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-center gap-1">
          {/* Left Page - Quote */}
          <div className="w-64 h-80 bg-cream rounded-l-lg shadow-card border border-primary/10 p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-2 left-4 text-xs text-muted-foreground font-body">
              {currentPage * 2 + 1}
            </div>
            <Heart className="text-primary/30 mb-4" size={24} fill="currentColor" />
            <p className="font-script text-xl text-foreground leading-relaxed text-center italic">
              "{page.quote}"
            </p>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Heart className="text-primary/20" size={16} fill="currentColor" />
            </div>
          </div>

          {/* Spine */}
          <div className="w-4 bg-rose-dark shadow-inner" />

          {/* Right Page - Photo placeholder */}
          <div className="w-64 h-80 bg-cream rounded-r-lg shadow-card border border-primary/10 p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-2 right-4 text-xs text-muted-foreground font-body">
              {currentPage * 2 + 2}
            </div>
            <div className="w-40 h-48 bg-muted rounded-lg border-4 border-primary/20 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <Heart className="text-primary/40 mx-auto mb-2" size={32} fill="currentColor" />
                <p className="text-xs text-muted-foreground font-body">
                  Photo {page.photo}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Add your photo here 📸
                </p>
              </div>
              {/* Tape corners */}
              <div className="absolute -top-1 -left-1 w-8 h-4 bg-secondary/80 rotate-[-30deg]" />
              <div className="absolute -top-1 -right-1 w-8 h-4 bg-secondary/80 rotate-[30deg]" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`
              p-3 rounded-full transition-all
              ${currentPage === 0 
                ? 'text-muted-foreground/30 cursor-not-allowed' 
                : 'text-primary hover:bg-primary/10'
              }
            `}
          >
            <ChevronLeft size={28} />
          </button>

          <span className="text-sm text-muted-foreground font-body">
            Page {currentPage + 1} of {diaryPages.length}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === diaryPages.length - 1}
            className={`
              p-3 rounded-full transition-all
              ${currentPage === diaryPages.length - 1 
                ? 'text-muted-foreground/30 cursor-not-allowed' 
                : 'text-primary hover:bg-primary/10'
              }
            `}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {currentPage === diaryPages.length - 1 && (
          <p className="mt-6 text-lg font-script text-primary animate-fade-up">
            Thank you for completing our journey! 💝
          </p>
        )}
      </div>
    </div>
  );
};
