import { defineField, defineType } from "sanity";

export const gallery = defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields:[
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'post',
            title: 'Post',
            type: 'string'
        },
        {
            name: 'date',
            title: 'date',
            type: 'number'
        }
    ]
})