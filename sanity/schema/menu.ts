
import { defineField, defineType } from "sanity";

export const menu = defineType({
    name: 'menu',
    title: 'Menus',
    type: 'document',
    fields:[
        defineField({
            name: 'product',
            title: 'Product',
            type: 'string'
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{source: 'name'}
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of:[{type:'image'}]
        },
        {
            name: 'detail',
            title: 'Detail',
            type: 'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        }
    ]
})