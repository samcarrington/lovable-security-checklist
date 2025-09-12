import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchChecklist,
  loadChecklistState,
  saveChecklistState,
  Checklist,
} from "@/services/checklistService";
import GradientBackground from "@/components/GradientBackground";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ChecklistHeader from "@/components/ChecklistHeader";
import ChecklistGrid from "@/components/ChecklistGrid";
import Footer from "@/components/Footer";

const Index = () => {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProgress, setTotalProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const savedState = loadChecklistState();
        setCheckedItems(savedState);

        const data = await fetchChecklist();
        setChecklist(data);
      } catch (err) {
        console.error("Failed to load checklist:", err);
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

  useEffect(() => {
    if (!checklist) return;

    let totalItems = 0;
    let checkedCount = 0;

    checklist.sections.forEach((section) => {
      totalItems += section.items.length;
      checkedCount += section.items.filter(
        (item) => checkedItems[item.id]
      ).length;
    });

    const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
    setTotalProgress(progress);
    console.log(`Total progress updated: ${progress.toFixed(2)}%`);
  }, [checkedItems, checklist]);

  const handleItemToggle = (itemId: string, checked: boolean) => {
    console.log(`Toggling ${itemId} to ${checked}`);
    setCheckedItems((prev) => {
      const newState = { ...prev, [itemId]: checked };
      saveChecklistState(newState);
      return newState;
    });
  };

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
        <ChecklistHeader title={checklist.title} totalProgress={totalProgress} />
        <ChecklistGrid
          sections={checklist.sections}
          checkedItems={checkedItems}
          onItemToggle={handleItemToggle}
        />
        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Index;