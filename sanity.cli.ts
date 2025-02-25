/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//     readonly SANITY_STUDIO_PROJECT_ID: string;
//     readonly SANITY_STUDIO_DATASET: string;
//     readonly SANITY_STUDIO_API_VERSION: string;
//     // Add more variables as needed
//   }
  
//   interface ImportMeta {
//     readonly env: ImportMetaEnv;
//   }

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
