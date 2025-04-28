
import { useState, useEffect } from 'react';
import { ChecklistSection } from '@/services/checklistService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface SectionCardProps {
  section: ChecklistSection;
  checkedItems: Record<string, boolean>;
  onItemToggle: (itemId: string, checked: boolean) => void;
}

const SectionCard = ({ section, checkedItems, onItemToggle }: SectionCardProps) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkedCount = section.items.filter(item => checkedItems[item.id]).length;
    const newProgress = section.items.length > 0 
      ? (checkedCount / section.items.length) * 100 
      : 0;
    
    if (newProgress !== progress) {
      setIsAnimating(true);
      setProgress(newProgress);
      
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [checkedItems, section.items, progress]);

  const handleClearSection = () => {
    // Instead of iterating and calling onItemToggle multiple times,
    // we'll collect all IDs and pass them to the parent to handle in one go
    const itemsToUncheck = section.items
      .filter(item => checkedItems[item.id])
      .map(item => item.id);
      
    // Call onItemToggle for each item that needs unchecking
    if (itemsToUncheck.length > 0) {
      console.log(`Unchecking ${itemsToUncheck.length} items:`, itemsToUncheck);
      itemsToUncheck.forEach(id => onItemToggle(id, false));
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold dark:text-white text-vibe-dark-gray">
              {section.title}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground hover:text-destructive"
                onClick={handleClearSection}
              >
                Clear all
              </Button>
              <span className="text-sm font-medium text-vibe-gray dark:text-gray-300">
                {section.items.filter(item => checkedItems[item.id]).length}/{section.items.length}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {section.description}
          </p>
          <Progress 
            value={progress} 
            className={`h-2 ${isAnimating ? 'animate-progress-fill' : ''}`}
            style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
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
                className="text-sm leading-tight cursor-pointer"
              >
                {item.title}
              </Label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
