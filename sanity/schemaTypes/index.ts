import { type SchemaTypeDefinition } from 'sanity'
import { items } from '../schema/items'
import { blogs } from '../schema/blog'
import { menu } from '../schema/menu'
import { gallery } from '../schema/gallery'
import { cashiers, users } from '../schema/users'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [items, blogs, menu, gallery, users, cashiers],
}
