import { memo } from "react";
import SectionCard from "@/components/SectionCard";
import { ChecklistSection } from "@/services/checklistService";

interface ChecklistGridProps {
  sections: ChecklistSection[];
  checkedItems: Record<string, boolean>;
  onItemToggle: (itemId: string, checked: boolean) => void;
}

const ChecklistGrid = memo(function ChecklistGrid({
  sections,
  checkedItems,
  onItemToggle,
}: ChecklistGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          checkedItems={checkedItems}
          onItemToggle={onItemToggle}
        />
      ))}
    </div>
  );
});

export default ChecklistGrid;
