
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink } from "lucide-react";
import { 
  fetchChecklist, 
  loadChecklistState, 
  saveChecklistState, 
  Checklist 
} from '@/services/checklistService';
import ProgressDial from '@/components/ProgressDial';
import SectionCard from '@/components/SectionCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import GradientBackground from '@/components/GradientBackground';

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
        console.error('Failed to load checklist:', err);
        setError('Failed to load checklist. Please try again later.');
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
    
    checklist.sections.forEach(section => {
      totalItems += section.items.length;
      checkedCount += section.items.filter(item => checkedItems[item.id]).length;
    });
    
    const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
    setTotalProgress(progress);
    console.log(`Total progress updated: ${progress.toFixed(2)}%`);
  }, [checkedItems, checklist]);

  const handleItemToggle = (itemId: string, checked: boolean) => {
    console.log(`Toggling ${itemId} to ${checked}`);
    setCheckedItems(prev => {
      const newState = { ...prev, [itemId]: checked };
      saveChecklistState(newState);
      return newState;
    });
  };

  const backgroundIntensity = Math.max(20, Math.min(90, 30 + (totalProgress * 0.4)));
  
  if (isLoading) {
    return (
      <GradientBackground intensity={30} brightness={95}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vibe-purple mx-auto"></div>
            <p className="mt-4 text-vibe-gray">Loading checklist...</p>
          </div>
        </div>
      </GradientBackground>
    );
  }

  if (error) {
    return (
      <GradientBackground intensity={20} brightness={95}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </GradientBackground>
    );
  }

  if (!checklist) {
    return null;
  }

  return (
    <GradientBackground intensity={backgroundIntensity} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <ThemeToggle />
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white text-vibe-dark-gray">
            {checklist.title}
          </h1>
          
          <div className="flex justify-center mb-6">
            <ProgressDial 
              percentage={totalProgress} 
              size="lg"
              className="mb-4"
            />
          </div>
          
          <p className="text-vibe-gray max-w-2xl mx-auto">
            Use this list* to set areas of priority for your work once you're entering human-in-the-loop territory
            and guiding a project toward Production and release. If you are coding with LLM support and pairing, 
            ensure you educate yourself on risks and limitations. No code should reach production without human 
            review and approvals.
          </p>
          <p className="text-vibe-gray max-w-2xl mx-auto text-xs pt-4">
            *The list is not exhaustive and should not be used as the only means of security validation.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {checklist.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              checkedItems={checkedItems}
              onItemToggle={handleItemToggle}
            />
          ))}
        </div>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Made by Sam Carrington and Lovable using source material from ChatGPT and original JSON from{" "}
            <a 
              href="https://www.fine.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              fine.dev
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </footer>
      </div>
    </GradientBackground>
  );
};

export default Index;
