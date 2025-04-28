
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

const STORAGE_KEY = "vibe-checklist-state";

// Embedded checklist data instead of fetching from external URL
const checklistData: Checklist = {
  "title": "Vibe Engineering Quality Checklist",
  "sections": [
    {
      "id": "foundations",
      "title": "Foundations",
      "items": [
        {
          "id": "foundations-1",
          "text": "All strings visible to users can be translated (i18n)"
        },
        {
          "id": "foundations-2",
          "text": "The code follows the style guide"
        },
        {
          "id": "foundations-3",
          "text": "No unnecessary comments"
        },
        {
          "id": "foundations-4",
          "text": "No commented out code"
        },
        {
          "id": "foundations-5",
          "text": "No TODOs in the code"
        },
        {
          "id": "foundations-6",
          "text": "No debugger statements"
        },
        {
          "id": "foundations-7",
          "text": "No console.log statements"
        }
      ]
    },
    {
      "id": "operability",
      "title": "Operability",
      "items": [
        {
          "id": "operability-1",
          "text": "Important user events are tracked"
        },
        {
          "id": "operability-2",
          "text": "All errors are reported and monitored"
        },
        {
          "id": "operability-3",
          "text": "All async operations provide feedback to the user"
        },
        {
          "id": "operability-4",
          "text": "All features are described in the documentation"
        }
      ]
    },
    {
      "id": "security",
      "title": "Security",
      "items": [
        {
          "id": "security-1",
          "text": "Sensitive data is handled securely"
        },
        {
          "id": "security-2",
          "text": "Authentication and authorization are implemented correctly"
        },
        {
          "id": "security-3",
          "text": "User input is validated and sanitized"
        },
        {
          "id": "security-4",
          "text": "External dependencies are up-to-date and have no known vulnerabilities"
        }
      ]
    },
    {
      "id": "testing",
      "title": "Testing",
      "items": [
        {
          "id": "testing-1",
          "text": "Unit tests cover business logic"
        },
        {
          "id": "testing-2",
          "text": "Tests exercise error and edge cases"
        },
        {
          "id": "testing-3",
          "text": "E2E tests cover main user flows"
        }
      ]
    },
    {
      "id": "performance",
      "title": "Performance",
      "items": [
        {
          "id": "performance-1",
          "text": "Large lists are virtualized or paginated"
        },
        {
          "id": "performance-2",
          "text": "Images are optimized"
        },
        {
          "id": "performance-3",
          "text": "Expensive operations are cached, memoized, and/or lazy-loaded"
        },
        {
          "id": "performance-4",
          "text": "Bunding size is reasonable"
        },
        {
          "id": "performance-5",
          "text": "Elements don't repaint/reflow unnecessarily"
        }
      ]
    },
    {
      "id": "accessibility",
      "title": "Accessibility",
      "items": [
        {
          "id": "accessibility-1",
          "text": "Content is accessible via keyboard navigation"
        },
        {
          "id": "accessibility-2",
          "text": "Elements have appropriate ARIA attributes"
        },
        {
          "id": "accessibility-3",
          "text": "Color contrast meets WCAG requirements"
        },
        {
          "id": "accessibility-4",
          "text": "Text has appropriate size and spacing"
        },
        {
          "id": "accessibility-5",
          "text": "Focus states are visually indicated"
        },
        {
          "id": "accessibility-6",
          "text": "UI elements have proper semantic HTML tags"
        }
      ]
    }
  ]
};

export async function fetchChecklist(): Promise<Checklist> {
  return Promise.resolve(checklistData);
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
