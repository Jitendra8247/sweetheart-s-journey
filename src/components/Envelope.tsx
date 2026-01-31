import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeProps {
  message: string;
  checkpointNumber: number;
  onClose: () => void;
}

export const Envelope = ({ message, checkpointNumber, onClose }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    window.setTimeout(() => setShowCard(true), 1000);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
      <div className="relative">
        {/* Sparkles */}
        {isOpen && (
          <>
            <Sparkles className="absolute -top-10 -left-10 text-coral animate-sparkle" size={28} />
            <Sparkles className="absolute -top-6 -right-12 text-primary animate-sparkle" style={{ animationDelay: "0.2s" }} size={24} />
            <Sparkles className="absolute top-1/2 -left-14 text-lavender animate-sparkle" style={{ animationDelay: "0.4s" }} size={20} />
            <Sparkles className="absolute top-1/2 -right-14 text-coral animate-sparkle" style={{ animationDelay: "0.6s" }} size={22} />
            <Sparkles className="absolute -bottom-8 -left-8 text-primary animate-sparkle" style={{ animationDelay: "0.8s" }} size={18} />
            <Sparkles className="absolute -bottom-10 -right-10 text-lavender animate-sparkle" style={{ animationDelay: "1s" }} size={26} />
          </>
        )}

        {/* Floating hearts */}
        {isOpen && (
          <>
            <Heart className="absolute -top-16 left-1/4 text-primary animate-float" size={16} fill="currentColor" style={{ animationDelay: "0.3s" }} />
            <Heart className="absolute -top-12 right-1/4 text-coral animate-float" size={14} fill="currentColor" style={{ animationDelay: "0.6s" }} />
            <Heart className="absolute -bottom-14 left-1/3 text-lavender animate-float" size={18} fill="currentColor" style={{ animationDelay: "0.9s" }} />
          </>
        )}

        {/* Envelope */}
        <button
          type="button"
          onClick={handleOpen}
          className="w-80 sm:w-96 relative perspective-1000 text-left"
          aria-label={isOpen ? "Envelope opened" : "Open envelope"}
        >
          {/* Envelope Body - cute rounded design */}
          <div className={`relative bg-gradient-to-b from-rose-light via-secondary to-card rounded-2xl shadow-romantic border-2 border-primary/20 overflow-hidden transition-all duration-700 ${isOpen ? 'h-auto min-h-[400px] sm:min-h-[450px]' : 'h-64'}`}>
            
            {/* Envelope back pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-primary"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  size={12}
                  fill="currentColor"
                />
              ))}
            </div>

            {/* Envelope Flap - cute curved design */}
            <div 
              className={`absolute top-0 left-0 right-0 h-24 origin-top preserve-3d transition-transform duration-1000 ease-out ${isOpen ? 'animate-envelope-cute-open' : ''}`}
              style={{ transformOrigin: 'top center' }}
            >
              {/* Front of flap - curved bottom */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/20 backface-hidden"
                style={{ 
                  clipPath: 'ellipse(60% 100% at 50% 0%)',
                }}
              />
              {/* Inner flap pattern */}
              <div 
                className="absolute inset-0 backface-hidden flex items-start justify-center pt-4"
                style={{ 
                  clipPath: 'ellipse(60% 100% at 50% 0%)',
                }}
              >
                <Heart className="text-primary/30" size={20} fill="currentColor" />
              </div>
            </div>

            {/* Heart Seal with cute animation */}
            {!isOpen && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse" />
                  <Heart 
                    className="relative text-primary animate-heartbeat drop-shadow-lg" 
                    size={48} 
                    fill="currentColor"
                  />
                </div>
              </div>
            )}

            {/* Letter Card inside - bigger and no triangle */}
            {showCard && (
              <div className="mx-4 mt-6 mb-4 bg-cream rounded-xl shadow-card animate-letter-rise flex flex-col items-center justify-center p-6 sm:p-8 text-center border border-primary/10 min-h-[320px] sm:min-h-[360px]">
                {/* Decorative top */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                  <Heart className="text-primary" size={16} fill="currentColor" />
                  <div className="w-8 h-0.5 bg-primary/30 rounded-full" />
                </div>

                <div className="text-sm text-muted-foreground mb-3 font-body tracking-wide uppercase">
                  Checkpoint {checkpointNumber}
                </div>
                
                <div className="flex gap-1 mb-6">
                  <Heart className="text-primary animate-heartbeat" size={24} fill="currentColor" />
                  <Heart className="text-coral animate-heartbeat" size={24} fill="currentColor" style={{ animationDelay: "0.2s" }} />
                  <Heart className="text-primary animate-heartbeat" size={24} fill="currentColor" style={{ animationDelay: "0.4s" }} />
                </div>
                
                <p className="font-script text-xl sm:text-2xl text-foreground leading-relaxed px-2">
                  {message}
                </p>

                {/* Decorative bottom */}
                <div className="flex items-center gap-2 mt-6">
                  <Sparkles className="text-coral" size={14} />
                  <span className="text-primary/60 text-sm font-body">With love</span>
                  <Sparkles className="text-coral" size={14} />
                </div>
              </div>
            )}

            {/* Opening hint */}
            {!isOpen && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-body animate-pulse flex items-center gap-2">
                <span>Tap to open</span>
                <span className="animate-bounce">💌</span>
              </div>
            )}
          </div>
        </button>

        {/* Continue button */}
        {showCard && (
          <button
            onClick={onClose}
            className="mt-6 mx-auto block px-10 py-4 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-all shadow-romantic hover:shadow-glow hover:scale-105 animate-fade-in"
          >
            Continue Journey 💕
          </button>
        )}
      </div>
    </div>
  );
};
