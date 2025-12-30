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
  const [isBursting, setIsBursting] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const config = emojiConfig[type];

  const handleClick = () => {
    if (isBursting || isGone) return;
    
    setIsBursting(true);
    
    // After burst animation, show text
    setTimeout(() => {
      setShowText(true);
    }, 500);
    
    // Hide everything after 2 seconds
    setTimeout(() => {
      setIsGone(true);
    }, 2500);
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
          className={`inline-block text-4xl md:text-5xl transition-transform origin-center ${
            isBursting ? "animate-burst" : "hover:scale-110 animate-float"
          }`}
          style={{
            animationDelay: style?.animationDelay,
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
