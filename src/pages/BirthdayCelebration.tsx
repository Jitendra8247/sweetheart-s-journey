import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Diary } from "@/components/Diary";
import { FloatingHearts } from "@/components/FloatingHearts";
import penguinBackground from "@/assets/penguin-background.jpg";

const BirthdayCelebration = () => {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [showDiary, setShowDiary] = useState(false);
  const [diaryUnlocked, setDiaryUnlocked] = useState(false);

  useEffect(() => {
    // Start title animation after a brief delay
    const titleTimer = setTimeout(() => setShowTitle(true), 500);
    return () => clearTimeout(titleTimer);
  }, []);

  useEffect(() => {
    if (showTitle) {
      // Show paragraph after title animation completes
      const paragraphTimer = setTimeout(() => setShowParagraph(true), 2000);
      return () => clearTimeout(paragraphTimer);
    }
  }, [showTitle]);

  useEffect(() => {
    if (showParagraph) {
      // Show button after paragraph fades in
      const buttonTimer = setTimeout(() => setShowButton(true), 1500);
      return () => clearTimeout(buttonTimer);
    }
  }, [showParagraph]);

  const handleWannaSeeMore = () => {
    setSlideOut(true);
    setTimeout(() => {
      setShowDiary(true);
    }, 800);
  };

  const handleDiaryUnlock = () => {
    setDiaryUnlocked(true);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${penguinBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      
      <FloatingHearts />

      {/* Birthday Intro Content */}
      {!showDiary && (
        <div 
          className={`relative z-10 text-center px-6 max-w-2xl mx-auto transition-all duration-700 ${
            slideOut ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          {/* Scrolling Title */}
          <div className="overflow-hidden mb-8">
            <h1 
              className={`text-5xl md:text-7xl font-script text-gradient drop-shadow-lg transition-all duration-1000 ${
                showTitle 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-full opacity-0'
              }`}
            >
              Happy Birthday
            </h1>
            <h2 
              className={`text-4xl md:text-6xl font-script text-foreground mt-2 drop-shadow-lg transition-all duration-1000 delay-500 ${
                showTitle 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-full opacity-0'
              }`}
            >
              My Love 💕
            </h2>
          </div>

          {/* Paragraph that fades in */}
          <p 
            className={`text-lg md:text-xl text-foreground/90 font-body leading-relaxed mb-8 drop-shadow transition-opacity duration-1000 ${
              showParagraph ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Today marks another beautiful year of your amazing life. 
            Every moment with you has been a treasure, and I'm so grateful 
            to celebrate this special day with you. You bring so much joy, 
            love, and happiness into my world. 🎂✨
          </p>

          {/* Button that appears */}
          <button
            onClick={handleWannaSeeMore}
            className={`px-10 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic ${
              showButton 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{ transition: 'opacity 0.5s, transform 0.5s' }}
          >
            Wanna see more? 💝
          </button>
        </div>
      )}

      {/* Diary Section */}
      {showDiary && (
        <div 
          className="relative z-10 w-full max-w-2xl mx-auto px-4 animate-fade-up"
        >
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-romantic border border-primary/20">
            <Diary onUnlock={handleDiaryUnlock} isUnlocked={diaryUnlocked} />
            
            <button
              onClick={handleGoBack}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors font-body block mx-auto"
            >
              ← Back to Journey
            </button>
          </div>
        </div>
      )}

      {/* Penguin decorations */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-3xl z-10">
        <span className="animate-wiggle">🐧</span>
        <span className="animate-wiggle" style={{ animationDelay: "0.3s" }}>💕</span>
        <span className="animate-wiggle" style={{ animationDelay: "0.6s" }}>🐧</span>
      </div>
    </div>
  );
};

export default BirthdayCelebration;
