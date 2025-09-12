import SectionCard from "@/components/SectionCard";

interface Section {
  id: string;
  items: Array<{ id: string; [key: string]: any }>; // Adjust the item structure as needed
}

const ChecklistGrid = ({
  sections,
  checkedItems,
  onItemToggle,
}: {
  sections: Array<Section>;
  checkedItems: Record<string, boolean>;
  onItemToggle: (itemId: string, checked: boolean) => void;
}) => (
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

export default ChecklistGrid;