
export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  title: string;
  sections: ChecklistSection[];
}

const CHECKLIST_URL = "https://raw.githubusercontent.com/finehq/vibe-coding-checklist/refs/heads/main/checklist.json";
const STORAGE_KEY = "vibe-checklist-state";

export async function fetchChecklist(): Promise<Checklist> {
  try {
    const response = await fetch(CHECKLIST_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch checklist: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching checklist:", error);
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
