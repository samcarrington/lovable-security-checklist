import type { ExamplesManifest } from "@/types/examples";

const MANIFEST_URL = "/examples/manifest.json";

/**
 * Fetches the examples manifest from the public directory.
 * @returns The examples manifest with agents and prompts metadata
 * @throws Error if fetching or parsing fails
 */
export async function fetchExamplesManifest(): Promise<ExamplesManifest> {
  const response = await fetch(MANIFEST_URL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch examples manifest: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data as ExamplesManifest;
}

/**
 * Fetches the raw markdown content of an example file.
 * @param path The path to the markdown file (e.g., "/examples/agents/security-reviewer.md")
 * @returns The raw markdown content as a string
 * @throws Error if fetching fails
 */
export async function fetchExampleContent(path: string): Promise<string> {
  const response = await fetch(path);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch example content: ${response.status} ${response.statusText}`);
  }
  
  return response.text();
}

/**
 * Gets the download URL for an example file.
 * @param path The path to the file
 * @returns The full URL for downloading
 */
export function getDownloadUrl(path: string): string {
  return path;
}
