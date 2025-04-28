
import React from 'react';
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  intensity?: number; // 0-100
  brightness?: number; // 0-100
  className?: string;
  children: React.ReactNode;
}

const GradientBackground = ({ 
  intensity = 50, 
  brightness = 100, 
  className,
  children 
}: GradientBackgroundProps) => {
  // Clamp values between 0-100
  const clampedIntensity = Math.min(100, Math.max(0, intensity)) / 100;
  const clampedBrightness = Math.min(100, Math.max(0, brightness)) / 100;
  
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Base layer */}
      <div 
        className="fixed inset-0 transition-opacity duration-1000"
        style={{
          opacity: clampedIntensity,
          filter: `brightness(${clampedBrightness})`,
          background: `
            radial-gradient(circle at 15% 50%, rgba(255, 207, 139, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(255, 157, 167, 0.15), transparent 25%),
            linear-gradient(45deg, rgba(247, 225, 195, 0.15) 0%, rgba(255, 175, 189, 0.15) 100%),
            linear-gradient(180deg, rgba(255, 207, 139, 0.1) 0%, rgba(255, 207, 139, 0.2) 100%)
          `
        }}
      />
      
      {/* Overlay layer */}
      <div 
        className="fixed inset-0 transition-opacity duration-1000"
        style={{
          opacity: clampedIntensity * 0.7,
          filter: `brightness(${clampedBrightness * 1.1})`,
          background: `
            radial-gradient(circle at 85% 70%, rgba(255, 175, 189, 0.1), transparent 30%),
            radial-gradient(circle at 15% 30%, rgba(255, 207, 139, 0.1), transparent 30%)
          `
        }}
      />
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
