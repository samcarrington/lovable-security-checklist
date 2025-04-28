
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

export interface Checklist {
  title: string;
  sections: ChecklistSection[];
}

const STORAGE_KEY = "vibe-checklist-state";

export async function fetchChecklist(): Promise<Checklist> {
  try {
    const response = await fetch('/src/data/checklist-data.json');
    if (!response.ok) {
      throw new Error('Failed to load checklist data');
    }
    return response.json();
  } catch (error) {
    console.error('Error loading checklist:', error);
    throw error;
  }
}

export function saveChecklistState(checkedItems: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
}

export function loadChecklistState(): Record<string, boolean> {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {};
  } catch (error) {
    console.error("Error loading checklist state:", error);
    return {};
  }
}
