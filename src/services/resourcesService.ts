import type { ResourcesData, ResourcePage } from "@/types/resources";

const RESOURCES_URL = "/resources-data.json";

/**
 * Fetches all resources data from the public directory.
 * @returns The complete resources data with OWASP and agentic engineering links
 * @throws Error if fetching or parsing fails
 */
export async function fetchResourcesData(): Promise<ResourcesData> {
  const response = await fetch(RESOURCES_URL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch resources data: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data as ResourcesData;
}

/**
 * Fetches only the OWASP resources.
 * @returns The OWASP resource page data
 */
export async function fetchOWASPResources(): Promise<ResourcePage> {
  const data = await fetchResourcesData();
  return data.owasp;
}

/**
 * Fetches only the agentic engineering resources.
 * @returns The agentic engineering resource page data
 */
export async function fetchAgenticEngineeringResources(): Promise<ResourcePage> {
  const data = await fetchResourcesData();
  return data.agenticEngineering;
}
