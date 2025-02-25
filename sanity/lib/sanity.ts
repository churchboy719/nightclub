import { createClient } from "@sanity/client";
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_PROJECT_ID: string;
  readonly SANITY_STUDIO_DATASET: string;
  readonly SANITY_STUDIO_API_VERSION: string;
  // Add more variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  useCdn: false, // Ensure real-time results
  apiVersion: import.meta.env.SANITY_STUDIO_API_VERSION, // Update to your Sanity API version
  token: import.meta.env.SANITY_API_TOKEN, // Required for server-side actions
});

console.log({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  token: import.meta.env.SANITY_STUDIO_API_VERSION,
});
