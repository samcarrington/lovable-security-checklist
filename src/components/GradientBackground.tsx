import React from 'react';
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
    /**
     * Controls the visibility/strength of the background effect.
     * A value from 0 (transparent) to 100 (fully visible).
     * @default 50
     */
    intensity?: number;
    /**
     * Adjusts the overall brightness of the background effect.
     * A value from 0 (black) to 100 (normal brightness).
     * @default 100
     */
    brightness?: number;
    /** Optional additional CSS classes to apply to the main container div. */
    className?: string;
    /** The content to be rendered inside the background container. */
    children: React.ReactNode;
}

/**
 * A reusable component that provides a subtle, solid background.
 * Uses the design system's surface tokens for a clean, brutalist aesthetic.
 * The intensity and brightness props are maintained for API compatibility
 * but have minimal visual effect with the new solid background approach.
 */
const GradientBackground = ({
                                intensity = 50,
                                brightness = 100,
                                className,
                                children
                            }: GradientBackgroundProps) => {
    // Props maintained for API compatibility
    const _clampedIntensity = Math.min(100, Math.max(0, intensity)) / 100;
    const _clampedBrightness = Math.min(100, Math.max(0, brightness)) / 100;

    return (
        // Main container div with solid subtle background
        <div className={cn(
            "relative min-h-screen",
            "bg-background",
            className
        )}>
            {/* Subtle texture layer - minimal, brutalist approach */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    opacity: 0.03,
                    backgroundImage: `
                        radial-gradient(circle at 20% 80%, var(--slate-300), transparent 50%),
                        radial-gradient(circle at 80% 20%, var(--slate-200), transparent 50%)
                    `
                }}
                aria-hidden="true"
            />

            {/* Content Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GradientBackground;
