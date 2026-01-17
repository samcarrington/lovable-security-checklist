/**
 * TypeScript interfaces for examples manifest
 */

export interface ExampleItem {
  id: string;
  title: string;
  description: string;
  filename: string;
  path: string;
}

export interface ExampleCategory {
  title: string;
  description: string;
  items: ExampleItem[];
}

export interface ExamplesManifest {
  agents: ExampleCategory;
  prompts: ExampleCategory;
}
