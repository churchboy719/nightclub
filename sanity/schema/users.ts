
import { defineField, defineType } from "sanity";

export const users = defineType({
    name: 'users',
    title: 'Users',
    type: 'document',
    fields:[
        defineField({
            name: 'id',
            title: 'Id',
            type: 'string'
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{source: 'name'}
        },
        {
            name: 'username',
            title: 'Username',
            type: 'string'
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string'
        },
        {
            name: 'role',
            title: 'Role',
            type: 'boolean'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'boolean'
        }


    ]
})

export default {
    name: "users",
    type: "document",
    title: "Users",
    fields: [
      { name: "username", type: "string", title: "Username" },
      { name: "password", type: "string", title: "Password" },
      { name: "role", type: "string", title: "Role" },
      { name: "status", type: "boolean", title: "Status" },
    ],
  };
  
  export const cashiers = defineType({
    name: 'cashiers',
    title: 'Cashiers',
    type: 'document',
    fields:[
        defineField({
            name: 'id',
            title: 'Id',
            type: 'string'
        }),
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{source: 'name'}
        },
        {
            name: 'username',
            title: 'Username',
            type: 'string'
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string'
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'boolean'
        }


    ]
})