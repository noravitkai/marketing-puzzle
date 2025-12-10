import type { CollectionConfig } from 'payload'

export const servicesCollection: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured'],
  },
  fields: [
    {
      name: 'title',
      label: 'Szolgáltatás neve',
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
      name: 'icon',
      label: 'Ikon vagy illusztráció (SVG)',
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
