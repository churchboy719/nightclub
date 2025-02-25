import { defineField, defineType } from "sanity";

export const blogs = defineType({
    name: 'blogs',
    title: 'blogs',
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
            name: 'story',
            title: 'Story',
            type: 'string'
        }
    ]
})