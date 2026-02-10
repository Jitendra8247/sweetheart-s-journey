import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface BirthdayIntroProps {
  onShowDiary: () => void;
}

export const BirthdayIntro = ({ onShowDiary }: BirthdayIntroProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Start title animation after a small delay
    const titleTimer = setTimeout(() => setShowTitle(true), 300);
    return () => clearTimeout(titleTimer);
  }, []);

  useEffect(() => {
    if (showTitle) {
      // Show paragraph after title animation completes (around 2s)
      const paragraphTimer = setTimeout(() => setShowParagraph(true), 2000);
      return () => clearTimeout(paragraphTimer);
    }
  }, [showTitle]);

  useEffect(() => {
    if (showParagraph) {
      // Show button after paragraph appears
      const buttonTimer = setTimeout(() => setShowButton(true), 800);
      return () => clearTimeout(buttonTimer);
    }
  }, [showParagraph]);

  const handleWannaMore = () => {
    setSlideOut(true);
    // Wait for slide animation then show diary
    setTimeout(() => {
      onShowDiary();
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Birthday Message Container */}
      <div 
        className={`text-center transition-all duration-700 ease-out ${
          slideOut ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        {/* Animated Title */}
        <div className="overflow-hidden mb-6">
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-script text-gradient transition-all duration-1000 ease-out ${
              showTitle 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            }`}
            style={{ 
              animationDelay: '0.2s',
            }}
          >
            Happy Birthday
          </h1>
        </div>
        
        <div className="overflow-hidden mb-8">
          <h2 
            className={`text-3xl md:text-5xl lg:text-6xl font-script text-primary transition-all duration-1000 ease-out delay-300 ${
              showTitle 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-full opacity-0'
            }`}
          >
            My Love 💕
          </h2>
        </div>

        {/* Hearts decoration */}
        <div 
          className={`flex justify-center gap-3 mb-8 transition-all duration-500 ${
            showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <Heart className="text-primary animate-heartbeat" size={24} fill="currentColor" />
          <Heart className="text-coral animate-heartbeat" size={32} fill="currentColor" style={{ animationDelay: '0.2s' }} />
          <Heart className="text-primary animate-heartbeat" size={24} fill="currentColor" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Paragraph - fades in from invisible */}
        <p 
          className={`text-base md:text-lg text-foreground/90 font-body max-w-md mx-auto mb-10 leading-relaxed transition-opacity duration-1000 ${
            showParagraph ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Today is your special day, and I wanted to create something just for you. 
          Every moment with you is a treasure, and this little journey is my way of 
          celebrating the amazing person you are. Thank you for being my everything.
        </p>

        {/* Button - appears after paragraph */}
        <button
          onClick={handleWannaMore}
          className={`px-8 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg 
            hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic
            ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ 
            transitionProperty: 'opacity, transform',
            transitionDuration: '500ms',
          }}
          disabled={!showButton}
        >
          Wanna see more? 💕
        </button>
      </div>
    </div>
  );
};
