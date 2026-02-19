import { useState } from "react";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const correctPassword = "824748";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)",
      }}
    >
      {/* Password card */}
      <div className={`relative z-10 ${shake ? 'animate-shake' : ''} ${isUnlocking ? 'animate-scale-out' : ''}`}>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-romantic p-8 md:p-12 max-w-md w-full mx-4">
          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className={`bg-gradient-to-br from-primary to-coral p-4 rounded-full ${isUnlocking ? 'animate-bounce' : ''}`}>
              <Lock className="text-white" size={40} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-script text-center text-foreground mb-3">
            Welcome 💕
          </h1>
          <p className="text-center text-muted-foreground font-body mb-8">
            Enter the secret code to continue
          </p>

          {/* Password form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-6 py-4 rounded-full border-2 border-primary/30 focus:border-primary focus:outline-none font-body text-center text-lg bg-white/80 transition-all"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isUnlocking}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-coral text-white rounded-full font-body font-medium text-lg hover:shadow-romantic transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUnlocking ? "Unlocking... ✨" : "Unlock 🔓"}
            </button>
          </form>
        </div>
      </div>

      {/* Success overlay */}
      {isUnlocking && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
          <div className="text-center animate-scale-in">
            <div className="text-6xl mb-4">💖✨💖</div>
            <h2 className="text-3xl font-script text-foreground">
              Welcome My Love! 💕
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
