import { useState, useEffect, useRef } from 'react';
import { ChecklistSection } from '@/services/checklistService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Info, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import ReactConfetti from 'react-confetti';

interface SectionCardProps {
  section: ChecklistSection;
  checkedItems: Record<string, boolean>;
  onItemToggle: (itemId: string, checked: boolean) => void;
}

const SectionCard = ({ section, checkedItems, onItemToggle }: SectionCardProps) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedItem, setSelectedItem] = useState<null | {
    title: string;
    summary?: string;
    externalLink?: string;
    link?: string;
  }>(null);

  const isFullyComplete = progress === 100;

  useEffect(() => {
    if (!cardRef.current) return;

    const updateDimensions = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight
        });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkedCount = section.items.filter(item => checkedItems[item.id]).length;
    const newProgress = section.items.length > 0 
      ? (checkedCount / section.items.length) * 100 
      : 0;
    
    if (newProgress !== progress) {
      setIsAnimating(true);
      setProgress(newProgress);
      
      if (newProgress === 100) {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [checkedItems, section.items, progress]);

  const handleClearSection = () => {
    const itemsToUncheck = section.items
      .filter(item => checkedItems[item.id])
      .map(item => item.id);
      
    if (itemsToUncheck.length > 0) {
      console.log(`Unchecking ${itemsToUncheck.length} items:`, itemsToUncheck);
      itemsToUncheck.forEach(id => onItemToggle(id, false));
    }
  };

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return '';
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={`shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden border-2 ${
        isFullyComplete 
        ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
        : 'border-transparent'
      }`}
    >
      {showConfetti && dimensions.width > 0 && dimensions.height > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <CardTitle className={`text-xl font-semibold pt-1 ${isFullyComplete ? 'text-amber-600 dark:text-amber-400' : 'dark:text-white text-vibe-dark-gray'}`}>
              {section.title}
            </CardTitle>
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground hover:text-destructive"
                onClick={handleClearSection}
              >
                Clear all
              </Button>
              <span className="text-sm font-medium text-vibe-gray dark:text-gray-300 py-2">
                {section.items.filter(item => checkedItems[item.id]).length}/{section.items.length}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {section.description}
          </p>
          <Progress 
            value={progress} 
            className={`h-2 ${isAnimating ? 'animate-progress-fill' : ''} ${isFullyComplete ? 'bg-amber-100 dark:bg-amber-950' : ''}`}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li key={item.id} className="flex items-start space-x-2">
              <Checkbox
                id={item.id}
                checked={!!checkedItems[item.id]}
                onCheckedChange={(checked) => {
                  onItemToggle(item.id, checked === true);
                }}
                className="mt-1"
              />
              <Label
                htmlFor={item.id}
                className={`text-sm leading-tight cursor-pointer flex-grow pt-1 ${!!checkedItems[item.id] ? 'line-through text-gray-300 dark:text-gray-500' : ''}`}
              >
                {item.title}
              </Label>
              {(item.summary || item.link) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setSelectedItem(item)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedItem?.title}</DialogTitle>
              {selectedItem?.summary && (
                <DialogDescription className="pt-2">
                  {selectedItem.summary}
                </DialogDescription>
              )}
            </DialogHeader>
            
            {selectedItem?.link && (
              <div className="mt-4 flex items-center">
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Learn more [{extractDomain(selectedItem.link)}]
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
