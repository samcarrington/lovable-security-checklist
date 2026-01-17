/**
 * TypeScript interfaces for resource links
 */

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  description: string;
  checklistSection?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  links: ResourceLink[];
}

export interface ResourcePage {
  title: string;
  description: string;
  categories: ResourceCategory[];
}

export interface ResourcesData {
  owasp: ResourcePage;
  agenticEngineering: ResourcePage;
}
