import { useState, useEffect } from "react";
import { Lock, ChevronLeft, ChevronRight, Heart, BookOpen } from "lucide-react";

// Import memory photos
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";
import memory7 from "@/assets/memory-7.jpg";
import memory8 from "@/assets/memory-8.jpg";
import memory9 from "@/assets/memory-9.jpg";
import memory18 from "@/assets/memory-18.jpg";
import memory19 from "@/assets/memory-19.jpg";
import memory20 from "@/assets/memory-20.jpg";
import memory21 from "@/assets/memory-21.jpg";
import memory22 from "@/assets/memory-22.jpg";

interface DiaryProps {
  onUnlock: () => void;
  isUnlocked?: boolean;
}

// Helper function to get photo import or null
const getPhotoSrc = (photoNum: number): string | null => {
  const photoMap: { [key: number]: string } = {
    1: memory1,
    2: memory2,
    3: memory3,
    4: memory4,
    5: memory5,
    6: memory6,
    7: memory7,
    8: memory8,
    9: memory9,
    18: memory18,
    19: memory19,
    20: memory20,
    21: memory21,
    22: memory22,
  };
  return photoMap[photoNum] || null;
};

const diaryPages = [
  { quote: "The day we met, my heart knew it was home The day we met, my heart knew it was home The day we met, my heart knew it was home The day we met, my heart knew it was home.", photo: 1 },
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
  { quote: "Our love story is my greatest treasure.", photo: 21 },
  { quote: "You are my forever and always. I love you! 💕", photo: 22 },
];

export const Diary = ({ onUnlock, isUnlocked = false }: DiaryProps) => {
  const [isLocked, setIsLocked] = useState(!isUnlocked);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [shake, setShake] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(isUnlocked);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const correctPassword = "11062023";

  useEffect(() => {
    if (isUnlocked) {
      setIsLocked(false);
      setIsOpen(true);
    }
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setIsLocked(false);
      setIsOpening(true);
      // Lock opening animation
      setTimeout(() => {
        setIsOpening(false);
        setIsOpen(true);
      }, 1500);
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  const nextPage = () => {
    if (currentPage < diaryPages.length - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  if (isLocked) {
    return (
      <div className="text-center perspective-1000">
        <div className={`relative inline-block ${shake ? 'animate-shake' : ''} ${isOpening ? 'animate-diary-unlock' : ''}`}>
          {/* Diary cover - looks like real leather diary */}
          <div className="w-80 h-[420px] bg-gradient-to-br from-rose-900 via-rose-800 to-rose-950 rounded-r-lg rounded-l-sm shadow-2xl relative overflow-hidden border-l-8 border-rose-950">
            {/* Leather texture overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
            
            {/* Spine detail */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-rose-950 to-rose-900 shadow-inner" />
            
            {/* Decorative gold border */}
            <div className="absolute inset-4 border-2 border-amber-500/40 rounded pointer-events-none">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500/60" />
            </div>

            {/* Decorative hearts pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 15 }).map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-amber-300"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  size={14}
                  fill="currentColor"
                />
              ))}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
              <BookOpen className="text-amber-400/80 mb-4 drop-shadow-lg" size={56} />
              <h2 className="text-4xl font-script text-amber-100 mb-2 drop-shadow-lg">
                This Is For You My Love 💕
              </h2>
              <p className="text-amber-200/70 text-sm font-body mb-10">
                A World Where Live Only Us And No Other Soul
              </p>

              {/* Golden lock */}
              <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 ${isOpening ? 'animate-lock-open' : ''}`}>
                <div className="bg-gradient-to-b from-amber-400 to-amber-600 p-3 rounded-lg shadow-lg border-2 border-amber-300">
                  <Lock className="text-amber-900" size={28} />
                </div>
              </div>
            </div>

            {/* Ribbon bookmark */}
            <div className="absolute top-0 right-12 w-4 h-24 bg-gradient-to-b from-primary to-coral rounded-b-full shadow-md" />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-muted-foreground font-body mb-2 italic">
            Hint: Do you still remember the date? The date wherea all the memories hold where everything has started.
            if you still cant find the password then hear Heat Waves Song You'll Remember it then.
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
              See What is Inside for You.
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
        Our World Where We Blongs To 💕
      </h2>

      {/* Open Diary with page turn effect - horizontal layout on all screens */}
      <div className={`relative transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'} perspective-1000`}>
        <div className="flex justify-center overflow-x-auto px-2">
          {/* Book container - always horizontal (side by side) */}
          <div className="relative preserve-3d flex flex-row min-w-max">
            {/* Left Page - Quote */}
            <div className="w-40 xs:w-48 sm:w-64 md:w-80 h-56 xs:h-64 sm:h-80 md:h-96 bg-gradient-to-br from-amber-50 to-amber-100 rounded-l-sm shadow-xl border border-amber-200/50 p-3 sm:p-6 relative overflow-hidden">
              {/* Page texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_100%]" />
              
              {/* Page edge shadow */}
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-amber-200/30 to-transparent" />
              
              <div className="absolute top-2 left-3 text-xs text-amber-700/50 font-body">
                {currentPage * 2 + 1}
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-1 sm:px-2">
                <Heart className="text-primary/40 mb-2 sm:mb-4" size={16} fill="currentColor" />
                <p className="font-script text-sm xs:text-base sm:text-lg md:text-xl text-amber-900 leading-relaxed text-center italic">
                  "{page.quote}"
                </p>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute bottom-3 right-3">
                <Heart className="text-primary/20" size={12} fill="currentColor" />
              </div>
            </div>

            {/* Spine - always vertical */}
            <div className="w-2 sm:w-4 h-56 xs:h-64 sm:h-80 md:h-96 bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 shadow-inner" />

            {/* Right Page - Photo with flip animation */}
            <div 
              className={`w-40 xs:w-48 sm:w-64 md:w-80 h-56 xs:h-64 sm:h-80 md:h-96 bg-gradient-to-bl from-amber-50 to-amber-100 rounded-r-sm shadow-xl border border-amber-200/50 p-3 sm:p-6 relative overflow-hidden origin-left preserve-3d ${
                isFlipping ? (flipDirection === "next" ? "animate-page-flip-out" : "animate-page-flip-in") : ""
              }`}
            >
              {/* Page texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_100%]" />
              
              {/* Page edge shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-200/30 to-transparent" />
              
              <div className="absolute top-2 right-3 text-xs text-amber-700/50 font-body">
                {currentPage * 2 + 2}
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-1">
                <div className="w-full h-full bg-amber-200/50 rounded-lg border-2 border-amber-300/40 flex items-center justify-center relative overflow-hidden shadow-inner">
                  {getPhotoSrc(page.photo) ? (
                    <img 
                      src={getPhotoSrc(page.photo)!} 
                      alt={`Memory ${page.photo}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Heart className="text-primary/40 mx-auto mb-1 sm:mb-2" size={20} fill="currentColor" />
                      <p className="text-xs sm:text-base text-amber-700/70 font-body">
                        Photo {page.photo}
                      </p>
                      <p className="text-xs text-amber-600/60 font-body mt-1 hidden xs:block">
                        Add your photo 📸
                      </p>
                    </div>
                  )}
                  {/* Tape corners */}
                  <div className="absolute -top-2 -left-2 w-6 sm:w-10 h-3 sm:h-5 bg-amber-100/90 rotate-[-30deg] shadow-sm" />
                  <div className="absolute -top-2 -right-2 w-6 sm:w-10 h-3 sm:h-5 bg-amber-100/90 rotate-[30deg] shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className={`
              p-3 rounded-full transition-all
              ${currentPage === 0 || isFlipping
                ? 'text-muted-foreground/30 cursor-not-allowed' 
                : 'text-primary hover:bg-primary/10 hover:scale-110'
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
            disabled={currentPage === diaryPages.length - 1 || isFlipping}
            className={`
              p-3 rounded-full transition-all
              ${currentPage === diaryPages.length - 1 || isFlipping
                ? 'text-muted-foreground/30 cursor-not-allowed' 
                : 'text-primary hover:bg-primary/10 hover:scale-110'
              }
            `}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {currentPage === diaryPages.length - 1 && (
          <p className="mt-6 text-lg font-script text-primary animate-fade-up">
            So Thats it and Happy Birthday My Baby 💕
            Thank You For Reading I LOVE YOU 💕
          </p>
        )}
      </div>
    </div>
  );
};
