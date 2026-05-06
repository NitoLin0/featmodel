import React from "react";

interface AnimatedBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

export function AnimatedBackground({
  intensity = "medium",
}: Readonly<AnimatedBackgroundProps>) {
  const getOpacity = () => {
    switch (intensity) {
      case "low":
        return "opacity-10";
      case "high":
        return "opacity-30";
      default:
        return "opacity-20";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute top-10 right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-pulse`}></div>
      <div className={`absolute bottom-20 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-pulse animation-delay-2000`}></div>
      <div className={`absolute top-0 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-pulse animation-delay-4000`}></div>
      <div className={`absolute top-95 right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-pulse animation-delay-6000`}></div>
      <div className={`absolute bottom-20 left-130 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl ${getOpacity()} animate-pulse animation-delay-8000`}></div>
    </div>
  );
}
