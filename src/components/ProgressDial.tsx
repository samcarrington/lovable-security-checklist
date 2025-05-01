import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CircleGauge } from 'lucide-react';

interface ProgressDialProps {
  /** The percentage value to display (0-100). */
  percentage: number;
  /** The size of the progress dial: 'sm', 'md', or 'lg'. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes to apply to the component. */
  className?: string;
}

/**
 * A circular progress dial component that visually represents a percentage value.
 * It includes an animated progress arc and a percentage label.
 */
const ProgressDial = ({ percentage, size = 'md', className }: ProgressDialProps) => {
  // State to control animation when the percentage changes
  const [isAnimating, setIsAnimating] = useState(false);

  // Ensure the percentage value is clamped between 0 and 100
  const safePercentage = Math.min(100, Math.max(0, percentage));

  useEffect(() => {
    // Trigger animation when the percentage changes
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500); // Animation duration: 1.5 seconds
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [percentage]);

  // Define size-specific CSS classes for the component
  const sizeClasses = {
    sm: 'w-24 h-24 text-xl', // Small size
    md: 'w-32 h-32 text-2xl', // Medium size (default)
    lg: 'w-40 h-40 text-3xl', // Large size
  };

  // Determine the color of the progress arc based on the percentage value
  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'text-red-500'; // Red for low progress
    if (progress < 66) return 'text-amber-500'; // Amber for medium progress
    return 'text-green-500'; // Green for high progress
  };

  const progressColor = getProgressColor(safePercentage);

  // Calculate SVG circle properties for the progress arc
  const radius = 80; // Radius of the circle
  const backgroundStrokeWidth = 12; // Stroke width for the background circle
  const progressStrokeWidth = 14; // Stroke width for the progress arc

  const innerRadius = radius - progressStrokeWidth / 2; // Adjusted radius for the progress arc
  const circumference = 2 * Math.PI * innerRadius; // Circumference of the circle
  const strokeDasharray = circumference; // Total length of the arc
  const strokeDashoffset = circumference * (1 - safePercentage / 100); // Offset for the progress arc

  return (
      <div
          className={cn(
              'relative flex items-center justify-center', // Center the dial
              sizeClasses[size], // Apply size-specific classes
              className // Apply additional custom classes
          )}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
              cx="50%" // Center X coordinate
              cy="50%" // Center Y coordinate
              r={innerRadius} // Radius of the circle
              strokeWidth={backgroundStrokeWidth} // Stroke width
              stroke="currentColor" // Use current text color
              fill="none" // No fill
              className="text-gray-200" // Light gray color for the background
          />

          {/* Progress arc */}
          <circle
              cx="50%" // Center X coordinate
              cy="50%" // Center Y coordinate
              r={innerRadius} // Radius of the circle
              strokeWidth={progressStrokeWidth} // Stroke width
              stroke="currentColor" // Use current text color
              fill="none" // No fill
              strokeLinecap="round" // Rounded ends for the arc
              className={cn(
                  progressColor, // Apply progress color
                  isAnimating ? "transition-all duration-1500 ease-out" : "" // Smooth animation
              )}
              strokeDasharray={strokeDasharray} // Total length of the arc
              strokeDashoffset={strokeDashoffset} // Offset to represent progress
          />
        </svg>

        {/* Content layer: Displays the percentage and an icon */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-1">
          {/* Percentage label */}
          <span className={cn("font-bold", progressColor)}>
          {Math.round(safePercentage)}% {/* Round the percentage to the nearest integer */}
        </span>
          {/* Icon representing the progress */}
          <CircleGauge
              className={progressColor} // Apply progress color
              size={size === 'lg' ? 20 : size === 'md' ? 16 : 14} // Adjust icon size based on the dial size
          />
        </div>
      </div>
  );
};

export default ProgressDial;