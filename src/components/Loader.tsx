import React from "react";
import { Leaf, Sparkles } from "lucide-react";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "fullscreen";
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  text = "Loading pure goodness...",
  size = "md",
  color = "#213B14",
}) => {
  if (size === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2]/95 backdrop-blur-md transition-all">
        {/* Ambient Glow */}
        <div className="absolute w-64 h-64 bg-[#3F622D]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        {/* Brand Icon with Orbiting Spinner */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          {/* Outer Rotating Gradient Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#213B14] border-r-[#E4B34F] animate-spin" style={{ animationDuration: "1.2s" }} />
          {/* Inner Reverse Rotating Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#3F622D] border-l-[#213B14]/30 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.8s" }} />
          
          {/* Center Logo Icon */}
          <div className="w-16 h-16 rounded-full bg-white shadow-md border border-[#213B14]/15 p-2 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="TDF Logo" draggable={false} className="w-full h-full object-contain pointer-events-none select-none" />
          </div>

          {/* Sparkle Accent */}
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#E4B34F] animate-pulse" />
        </div>

        {/* Brand Name */}
        <h3 className="font-serif text-lg font-black tracking-wider text-[#213B14] mb-1">
          THE DRY FACTORY
        </h3>
        
        {/* Animated Loading Text */}
        <p className="text-xs font-bold text-[#3F622D]/70 tracking-widest uppercase animate-pulse">
          {text}
        </p>

        {/* Shimmering Progress Indicator */}
        <div className="w-36 h-1 bg-[#213B14]/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-[#213B14] via-[#E4B34F] to-[#213B14] rounded-full animate-pulse w-full" />
        </div>
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className="inline-flex items-center gap-2 text-xs font-bold">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full border-2 border-[#213B14]/20 border-t-[#213B14] animate-spin" />
        </div>
        {text && <span>{text}</span>}
      </div>
    );
  }

  // Standard Section Loader (size === "md" or "lg")
  return (
    <div className="py-16 flex flex-col items-center justify-center w-full">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#213B14] border-r-[#E4B34F] animate-spin"
          style={{ animationDuration: "1.2s", borderColor: `${color}30`, borderTopColor: color }}
        />
        {/* Inner reverse spinner */}
        <div
          className="absolute inset-2 rounded-full border border-transparent border-b-[#3F622D] animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.6s", borderBottomColor: color }}
        />
        {/* Center icon badge */}
        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#213B14]/15 p-1 flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="TDF Logo" draggable={false} className="w-full h-full object-contain pointer-events-none select-none" />
        </div>
      </div>
      {text && (
        <p className="text-xs font-bold text-[#213B14]/60 tracking-wider uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
