import type { CollectionConfig } from 'payload'

export const projectsCollection: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'client', 'featured'],
  },
  fields: [
    {
      name: 'title',
      label: 'Cím',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Rövid leírás',
      type: 'textarea',
      required: true,
    },
    {
      name: 'body',
      label: 'Részletes leírás',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      label: 'Címkék',
      type: 'text',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      label: 'Kiemelt',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'thumbnail',
      label: 'Borítókép',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      label: 'Kép',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      label: 'Ügyfél',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      label: 'Év',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'links',
      label: 'Linkek',
      labels: {
        singular: 'Link',
        plural: 'Linkek',
      },
      type: 'array',
      required: false,
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'label',
          label: 'Megjelenő szöveg',
          type: 'text',
          required: false,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
