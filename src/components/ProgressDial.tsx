
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CircleGauge } from 'lucide-react';

interface ProgressDialProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressDial = ({ percentage, size = 'md', className }: ProgressDialProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Clamp percentage between 0 and 100
  const safePercentage = Math.min(100, Math.max(0, percentage));
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const sizeClasses = {
    sm: 'w-24 h-24 text-xl',
    md: 'w-32 h-32 text-2xl',
    lg: 'w-40 h-40 text-3xl',
  };

  // Calculate dash values for SVG circle
  const radius = 40;
  const backgroundStrokeWidth = 8;
  const progressStrokeWidth = 12; // Increased thickness for better visibility
  
  // Calculate the path for the progress arc
  const innerRadius = radius - progressStrokeWidth / 2; 
  const circumference = 2 * Math.PI * innerRadius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - safePercentage / 100);

  return (
    <div 
      className={cn(
        'relative flex items-center justify-center', 
        sizeClasses[size],
        className
      )}
    >
      {/* SVG based progress circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        {/* Background circle */}
        <circle 
          cx="50%" 
          cy="50%" 
          r={innerRadius} 
          strokeWidth={backgroundStrokeWidth}
          stroke="currentColor" 
          fill="none" 
          className="text-gray-200" 
        />
        
        {/* Progress arc */}
        <circle 
          cx="50%" 
          cy="50%" 
          r={innerRadius} 
          strokeWidth={progressStrokeWidth}
          stroke="currentColor" 
          fill="none" 
          strokeLinecap="round"
          className={cn(
            "text-vibe-purple",
            isAnimating ? "transition-all duration-1500 ease-out" : ""
          )}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      {/* Inner content with percentage */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1">
        <span className="font-bold">{Math.round(safePercentage)}%</span>
        <CircleGauge 
          className="text-vibe-purple" 
          size={size === 'lg' ? 20 : size === 'md' ? 16 : 14} 
        />
      </div>
    </div>
  );
};

export default ProgressDial;
