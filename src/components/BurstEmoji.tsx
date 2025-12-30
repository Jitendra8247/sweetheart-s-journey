import { useState } from "react";

interface BurstEmojiProps {
  type: "heart" | "star" | "balloon" | "rose";
  style?: React.CSSProperties;
}

const emojiConfig = {
  heart: { emoji: "❤️", text: "I LOVE YOU DARLING" },
  star: { emoji: "⭐", text: "HAPPY BIRTHDAY" },
  balloon: { emoji: "🎈", text: "HAPPY BIRTHDAY MY LOVE" },
  rose: { emoji: "🌹", text: "I LOVE YOU MY BABY" },
};

export const BurstEmoji = ({ type, style }: BurstEmojiProps) => {
  const [tapCount, setTapCount] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const config = emojiConfig[type];
  const maxTaps = 5 + Math.floor(Math.random() * 2); // 5-6 taps to burst

  // Calculate scale based on tap count (grows with each tap)
  const currentScale = 1 + (tapCount * 0.25);

  const handleClick = () => {
    if (isBursting || isGone) return;
    
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);
    
    // Check if it should burst
    if (newTapCount >= maxTaps) {
      setIsBursting(true);
      
      // After burst animation, show text
      setTimeout(() => {
        setShowText(true);
      }, 600);
      
      // Hide everything after 2 seconds
      setTimeout(() => {
        setIsGone(true);
      }, 2600);
    }
  };

  if (isGone) return null;

  return (
    <div
      className="absolute cursor-pointer select-none"
      style={{
        ...style,
        transform: "translate(-50%, -50%)",
      }}
      onClick={handleClick}
    >
      {!showText ? (
        <span
          className={`inline-block text-4xl md:text-5xl transition-all duration-150 origin-center ${
            isBursting ? "animate-pump-burst" : "hover:brightness-110"
          }`}
          style={{
            transform: `scale(${currentScale})`,
            filter: tapCount > 0 ? `drop-shadow(0 0 ${tapCount * 3}px hsl(var(--primary)))` : undefined,
          }}
        >
          {config.emoji}
        </span>
      ) : (
        <div className="animate-text-pop whitespace-nowrap">
          <span className="font-script text-lg md:text-xl text-primary drop-shadow-lg bg-background/80 px-3 py-1 rounded-full">
            {config.text}
          </span>
        </div>
      )}
    </div>
  );
};
