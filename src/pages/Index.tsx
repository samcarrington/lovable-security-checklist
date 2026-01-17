import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchChecklist,
  loadChecklistState,
  saveChecklistState,
  Checklist,
} from "@/services/checklistService";
import GradientBackground from "@/components/GradientBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ChecklistHeader from "@/components/ChecklistHeader";
import ChecklistGrid from "@/components/ChecklistGrid";
import Footer from "@/components/Footer";
import { trackProgressMilestone } from "@/lib/analytics";

// Progress milestones to track
const MILESTONES = [25, 50, 75, 100];

const Index = () => {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Track which milestones have been fired to avoid duplicates
  const firedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        const savedState = loadChecklistState();
        setCheckedItems(savedState);

        const data = await fetchChecklist();
        setChecklist(data);
      } catch (err) {
        // Log errors in development only
        if (import.meta.env.DEV) {
          console.error("Failed to load checklist:", err);
        }
        setError("Failed to load checklist. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error loading checklist",
          description: "Please try refreshing the page.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [toast]);

  // Memoized progress calculation - O(n×m) but only recalculates when deps change
  const totalProgress = useMemo(() => {
    if (!checklist) return 0;

    let totalItems = 0;
    let checkedCount = 0;

    checklist.sections.forEach((section) => {
      totalItems += section.items.length;
      checkedCount += section.items.filter(
        (item) => checkedItems[item.id]
      ).length;
    });

    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
  }, [checkedItems, checklist]);

  // Track progress milestones
  useEffect(() => {
    MILESTONES.forEach((milestone) => {
      if (totalProgress >= milestone && !firedMilestones.current.has(milestone)) {
        firedMilestones.current.add(milestone);
        trackProgressMilestone(milestone);
      }
    });
    
    // Reset milestones if progress goes back down (e.g., user clears items)
    MILESTONES.forEach((milestone) => {
      if (totalProgress < milestone && firedMilestones.current.has(milestone)) {
        firedMilestones.current.delete(milestone);
      }
    });
  }, [totalProgress]);

  // Memoized callback to prevent unnecessary re-renders of children
  const handleItemToggle = useCallback((itemId: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const newState = { ...prev, [itemId]: checked };
      saveChecklistState(newState);
      return newState;
    });
  }, []);

  const backgroundIntensity = Math.max(
    20,
    Math.min(90, 30 + totalProgress * 0.4)
  );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!checklist) return null;

  return (
    <GradientBackground intensity={backgroundIntensity} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <ThemeToggle />
        <Navigation />
        <main id="main-content">
          <ChecklistHeader title={checklist.title} totalProgress={totalProgress} />
          <ChecklistGrid
            sections={checklist.sections}
            checkedItems={checkedItems}
            onItemToggle={handleItemToggle}
          />
        </main>
        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Index;
