'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\nightclub\app\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import { items } from './sanity/schema/items'
import { blogs } from './sanity/schema/blog'
import { menu } from './sanity/schema/menu'
import { gallery } from './sanity/schema/gallery'
import { cashiers, users } from './sanity/schema/users'
import { type SchemaTypeDefinition } from 'sanity'

export default defineConfig({
  basePath: '/nightclub/app',
  projectId: "kvcrnd7d",
  dataset: "night",
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema : {
    types: [items, blogs, menu, gallery, users, cashiers],
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
