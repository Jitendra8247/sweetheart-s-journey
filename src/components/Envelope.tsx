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
    setIsOpen(true);
    setTimeout(() => setShowCard(true), 800);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative">
        {/* Sparkles */}
        {isOpen && (
          <>
            <Sparkles className="absolute -top-8 -left-8 text-coral animate-sparkle" size={24} />
            <Sparkles className="absolute -top-4 -right-10 text-primary animate-sparkle" style={{ animationDelay: "0.3s" }} size={20} />
            <Sparkles className="absolute -bottom-6 -left-6 text-lavender animate-sparkle" style={{ animationDelay: "0.6s" }} size={18} />
            <Sparkles className="absolute -bottom-8 -right-8 text-coral animate-sparkle" style={{ animationDelay: "0.9s" }} size={22} />
          </>
        )}

        {/* Envelope */}
        <div 
          className="w-80 h-56 relative cursor-pointer perspective-1000"
          onClick={!isOpen ? handleOpen : undefined}
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary to-card rounded-lg shadow-romantic border border-primary/20" />
          
          {/* Envelope Flap */}
          <div 
            className={`absolute top-0 left-0 right-0 h-28 origin-top preserve-3d transition-transform duration-700 ${isOpen ? 'animate-envelope-open' : ''}`}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Front of flap */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-rose-light to-secondary backface-hidden"
              style={{ 
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            />
            {/* Back of flap */}
            <div 
              className="absolute inset-0 bg-card backface-hidden"
              style={{ 
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                transform: 'rotateX(180deg)',
              }}
            />
          </div>

          {/* Heart Seal */}
          {!isOpen && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
              <Heart 
                className="text-primary animate-heartbeat drop-shadow-lg" 
                size={40} 
                fill="currentColor"
              />
            </div>
          )}

          {/* Card inside */}
          {showCard && (
            <div className="absolute inset-4 bg-cream rounded-lg shadow-card animate-card-reveal flex flex-col items-center justify-center p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2 font-body">
                Checkpoint {checkpointNumber}
              </div>
              <Heart className="text-primary mb-4" size={28} fill="currentColor" />
              <p className="font-script text-xl text-foreground leading-relaxed">
                {message}
              </p>
            </div>
          )}

          {/* Click hint */}
          {!isOpen && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-body animate-pulse">
              Click to open 💌
            </div>
          )}
        </div>

        {/* Close button */}
        {showCard && (
          <button
            onClick={onClose}
            className="mt-6 mx-auto block px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-medium hover:bg-rose-dark transition-colors shadow-romantic"
          >
            Continue Journey
          </button>
        )}
      </div>
    </div>
  );
};
