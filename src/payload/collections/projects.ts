import type { CollectionConfig } from 'payload'

export const projectsCollection: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tag', 'featured'],
  },
  fields: [
    {
      name: 'title',
      label: 'Cím',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tag',
      label: 'Címke',
      type: 'text',
      required: false,
    },
    {
      name: 'excerpt',
      label: 'Rövid leírás',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featured',
      label: 'Kiemelt',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'thumbnail',
      label: 'Borítókép',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'body',
      label: 'Részletes leírás',
      type: 'richText',
    },
  ],
}
