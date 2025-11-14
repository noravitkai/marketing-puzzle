import type { Block } from 'payload'

export const servicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatások szekció',
    plural: 'Szolgáltatások szekciók',
  },
  fields: [
    {
      name: 'heading',
      label: 'Szekció címe',
      type: 'text',
      required: true,
    },
    {
      name: 'lead',
      label: 'Alcím',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      label: 'Leírás',
      type: 'textarea',
      required: false,
    },
    {
      name: 'ctaLabel',
      label: 'Gomb szövege',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      label: 'Szolgáltatások',
      labels: {
        singular: 'Szolgáltatás',
        plural: 'Szolgáltatások',
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Cím',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Leírás',
          type: 'textarea',
          required: true,
        },
        {
          name: 'targetPage',
          label: 'Kapcsolódó oldal',
          type: 'relationship',
          relationTo: 'pages',
          required: false,
        },
      ],
    },
  ],
}
