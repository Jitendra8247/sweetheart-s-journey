import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

type Step = "question1" | "question2" | "catchCat" | "complete";

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [step, setStep] = useState<Step>("question1");
  const [showTitle, setShowTitle] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState({ x: 50, y: 50 });
  const [catCaught, setCatCaught] = useState(false);
  const [showCatMessage, setShowCatMessage] = useState(false);

  // Show title with animation, then show question after title animates
  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 300);
    const questionTimer = setTimeout(() => setShowQuestion(true), 1800);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(questionTimer);
    };
  }, []);

  // Move cat randomly
  useEffect(() => {
    if (step === "catchCat" && !catCaught) {
      setShowCatMessage(true);
      const interval = setInterval(() => {
        setCatPosition({
          x: Math.random() * 70 + 10,
          y: Math.random() * 60 + 15,
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [step, catCaught]);

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    setNoButtonPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }, []);

  const handleYesClick = () => {
    if (step === "question1") {
      setNoButtonPosition({ x: 0, y: 0 });
      setStep("question2");
    } else if (step === "question2") {
      setStep("catchCat");
    }
  };

  const handleCatClick = () => {
    setCatCaught(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-coral-50">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            size={Math.random() * 30 + 15}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Catch the Cat - Full screen takeover */}
      {step === "catchCat" && (
        <div className="fixed inset-0 z-20 bg-gradient-to-br from-rose-50 via-pink-50 to-coral-50">
          {/* Message */}
          {showCatMessage && !catCaught && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center animate-fade-in z-30">
              <h2 className="text-3xl md:text-5xl font-script text-foreground mb-2">
                Catch the Cat! 🐱
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                Click on it before it runs away!
              </p>
            </div>
          )}

          {/* Running Cat */}
          {!catCaught && (
            <button
              onClick={handleCatClick}
              className="absolute text-6xl md:text-8xl transition-all duration-300 hover:scale-125 cursor-pointer z-40"
              style={{
                left: `${catPosition.x}%`,
                top: `${catPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              🐱
            </button>
          )}

          {/* Cat caught celebration */}
          {catCaught && (
            <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
              <div className="text-center">
                <div className="text-8xl mb-4">🐱💕</div>
                <h2 className="text-3xl md:text-5xl font-script text-foreground">
                  You caught me!
                </h2>
                <p className="text-xl text-primary font-body mt-4 animate-pulse">
                  Loading your surprise...
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Title + Questions - Same page */}
      {step !== "catchCat" && (
        <div className="text-center z-10 px-6">
          <h1
            className={`text-5xl md:text-7xl font-script text-foreground transition-all duration-1000 ${
              showTitle
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            }`}
          >
            Happy Birthday
          </h1>
          <h2
            className={`text-4xl md:text-6xl font-script text-gradient mt-4 transition-all duration-1000 delay-500 ${
              showTitle
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            My Love
          </h2>
          <div className={`flex justify-center gap-3 mt-8 transition-opacity duration-500 ${showTitle ? "opacity-100" : "opacity-0"}`}>
            <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" />
            <Heart className="text-coral animate-heartbeat" size={40} fill="currentColor" style={{ animationDelay: "0.2s" }} />
            <Heart className="text-primary animate-heartbeat" size={32} fill="currentColor" style={{ animationDelay: "0.4s" }} />
          </div>

          {/* Question 1 - Below title */}
          {step === "question1" && showQuestion && (
            <div className="mt-12 animate-fade-in">
              <p className="text-xl md:text-2xl font-script text-foreground mb-6">
                I have something special for you my love...
                <br />
                <span className="text-primary">Wanna see?</span> 💕
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleYesClick}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic"
                >
                  Yes! 💖
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  style={
                    noButtonPosition.x !== 0 || noButtonPosition.y !== 0
                      ? {
                          position: "fixed",
                          left: noButtonPosition.x,
                          top: noButtonPosition.y,
                          zIndex: 50,
                        }
                      : {}
                  }
                  className="px-10 py-4 bg-muted text-muted-foreground rounded-full font-body font-semibold text-lg hover:bg-muted/80 transition-all shadow-md"
                >
                  No 😢
                </button>
              </div>
            </div>
          )}

          {/* Question 2 - Below title */}
          {step === "question2" && (
            <div className="mt-12 animate-fade-in">
              <p className="text-xl md:text-2xl font-script text-foreground mb-6">
                Do you love me? 🥺💕
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleYesClick}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold text-lg hover:bg-rose-dark transition-all hover:scale-105 shadow-romantic"
                >
                  Yes, Always! 💖
                </button>
                <button
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  style={
                    noButtonPosition.x !== 0 || noButtonPosition.y !== 0
                      ? {
                          position: "fixed",
                          left: noButtonPosition.x,
                          top: noButtonPosition.y,
                          zIndex: 50,
                        }
                      : {}
                  }
                  className="px-10 py-4 bg-muted text-muted-foreground rounded-full font-body font-semibold text-lg hover:bg-muted/80 transition-all shadow-md"
                >
                  No 😢
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
