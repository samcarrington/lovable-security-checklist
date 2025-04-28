
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
  const rotationAngle = safePercentage * 3.6; // 3.6 degrees per percentage point (360/100)
  
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

  return (
    <div 
      className={cn(
        'relative flex items-center justify-center', 
        sizeClasses[size],
        className
      )}
    >
      {/* Background circle */}
      <div className="absolute inset-0 rounded-full border-8 border-vibe-light-purple"></div>
      
      {/* Progress circle - using CSS custom property for animation */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full border-8 border-vibe-purple",
          isAnimating ? "animate-dial-rotate" : ""
        )}
        style={{ 
          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
          transform: !isAnimating ? `rotate(${rotationAngle}deg)` : 'rotate(0deg)',
          '--rotation-angle': `${rotationAngle}deg`
        } as React.CSSProperties}
      ></div>
      
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
