import { createClient } from 'next-sanity';
import { apiVersion, projectId, dataset, token } from '../env';
// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly SANITY_STUDIO_PROJECT_ID: string;
//   readonly SANITY_STUDIO_DATASET: string;
//   readonly SANITY_STUDIO_API_VERSION: string;
//   // Add more variables as needed
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

console.log("Sanity Config:", { projectId, dataset, apiVersion, token });

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true if no token is used and real-time updates aren't required
  token,
});
