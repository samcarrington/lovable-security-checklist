import React from 'react';
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
    /**
     * Controls the visibility/strength of the gradient effect.
     * A value from 0 (transparent) to 100 (fully visible).
     * @default 50
     */
    intensity?: number;
    /**
     * Adjusts the overall brightness of the gradient effect.
     * A value from 0 (black) to 100 (normal brightness).
     * @default 100
     */
    brightness?: number;
    /** Optional additional CSS classes to apply to the main container div. */
    className?: string;
    /** The content to be rendered inside the gradient background container. */
    children: React.ReactNode;
}

/**
 * A reusable component that provides a subtle, layered gradient background effect.
 * It uses fixed positioning to cover the entire viewport behind its children.
 * The intensity and brightness of the effect can be controlled via props.
 */
const GradientBackground = ({
                                intensity = 50,
                                brightness = 100,
                                className,
                                children
                            }: GradientBackgroundProps) => {
    // Ensure intensity and brightness values are within the valid 0-100 range
    // and convert them to a 0-1 scale for CSS opacity/filter usage.
    const clampedIntensity = Math.min(100, Math.max(0, intensity)) / 100;
    const clampedBrightness = Math.min(100, Math.max(0, brightness)) / 100;

    return (
        // Main container div. Sets up relative positioning for the content
        // and ensures it takes at least the full screen height.
        <div className={cn("relative min-h-screen overflow-hidden", className)}>
            {/* First gradient layer (Base) */}
            <div
                className="fixed inset-0 transition-opacity duration-1000 will-change-[opacity]" // Fixed position to cover viewport, smooth transition
                style={{
                    opacity: clampedIntensity, // Control visibility with intensity prop
                    filter: `brightness(${clampedBrightness})`, // Control brightness with brightness prop
                    // Defines the base gradient effect using radial and linear gradients
                    background: `
            radial-gradient(circle at 15% 50%, rgba(255, 207, 139, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(255, 157, 167, 0.15), transparent 25%),
            linear-gradient(45deg, rgba(247, 225, 195, 0.15) 0%, rgba(255, 175, 189, 0.15) 100%),
            linear-gradient(180deg, rgba(255, 207, 139, 0.1) 0%, rgba(255, 207, 139, 0.2) 100%)
          `
                }}
            />

            {/* Second gradient layer (Overlay) - adds more depth */}
            <div
                className="fixed inset-0 transition-opacity duration-1000 will-change-[opacity]" // Fixed position, smooth transition
                style={{
                    // Slightly less opaque and slightly brighter than the base layer for subtle variation
                    opacity: clampedIntensity * 0.7,
                    filter: `brightness(${clampedBrightness * 1.1})`,
                    // Defines the overlay gradient effect
                    background: `
            radial-gradient(circle at 85% 70%, rgba(255, 175, 189, 0.1), transparent 30%),
            radial-gradient(circle at 15% 30%, rgba(255, 207, 139, 0.1), transparent 30%)
          `
                }}
            />

            {/* Content Layer - Renders the children above the gradient layers */}
            <div className="relative z-10"> {/* Ensures content is above the fixed background layers */}
                {children}
            </div>
        </div>
    );
};

export default GradientBackground;