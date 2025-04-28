
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

  // Get color based on progress
  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'text-red-500';
    if (progress < 66) return 'text-amber-500';
    return 'text-green-500';
  };

  const progressColor = getProgressColor(safePercentage);

  // Calculate dash values for SVG circle
  const radius = 80;
  const backgroundStrokeWidth = 12;
  const progressStrokeWidth = 14;
  
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
            progressColor,
            isAnimating ? "transition-all duration-1500 ease-out" : ""
          )}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-1">
        <span className={cn("font-bold", progressColor)}>{Math.round(safePercentage)}%</span>
        <CircleGauge 
          className={progressColor}
          size={size === 'lg' ? 20 : size === 'md' ? 16 : 14} 
        />
      </div>
    </div>
  );
};

export default ProgressDial;
