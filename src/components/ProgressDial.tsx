
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
    sm: 'w-24 h-24 text-2xl',
    md: 'w-32 h-32 text-3xl',
    lg: 'w-40 h-40 text-4xl',
  };

  // Calculate dash values for SVG circle
  const radius = 45; // Main circle radius
  const strokeWidth = 8;
  const innerRadius = radius - strokeWidth / 2; // Adjusted for stroke width
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
          strokeWidth={strokeWidth}
          stroke="currentColor" 
          fill="none" 
          className="text-vibe-light-purple"
        />
        
        {/* Progress arc */}
        <circle 
          cx="50%" 
          cy="50%" 
          r={innerRadius} 
          strokeWidth={strokeWidth}
          stroke="currentColor" 
          fill="none" 
          strokeLinecap="round"
          className={cn(
            "text-vibe-purple",
            isAnimating ? "transition-all duration-1500 ease-out" : ""
          )}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isAnimating ? circumference : strokeDashoffset}
        />
      </svg>
      
      {/* Inner circle with percentage */}
      <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="font-bold">{Math.round(safePercentage)}%</span>
          <CircleGauge className="text-vibe-purple mt-1" size={size === 'lg' ? 24 : size === 'md' ? 20 : 16} />
        </div>
      </div>
    </div>
  );
};

export default ProgressDial;
