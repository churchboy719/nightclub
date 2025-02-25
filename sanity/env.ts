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


// // console.log('Environment Variables:', {
// //   projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
// //   dataset: import.meta.env.SANITY_STUDIO_DATASET,
// // });

// export const apiVersion = import.meta.env.SANITY_STUDIO_API_VERSION || '2024-10-02';

// export const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'default';

// export const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || '';

// export const token = import.meta.env.SANITY_API_TOKEN || '';

// if (!projectId || !dataset) {
//   throw new Error( 
//     `Missing required Sanity configuration:
//     - projectId: ${projectId ? '✔' : '❌'}
//     - dataset: ${dataset ? '✔' : '❌'}`
//   );
// }

export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-10-02';
export const dataset = process.env.SANITY_STUDIO_DATASET || 'default';
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';
export const token = process.env.SANITY_API_TOKEN || '';

if (!projectId || !dataset) {
  throw new Error( 
    `Missing required Sanity configuration:
    - projectId: ${projectId ? '✔' : '❌'}
    - dataset: ${dataset ? '✔' : '❌'}`
  );
}
