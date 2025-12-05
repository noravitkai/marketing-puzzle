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
      name: 'mode',
      label: 'Megjelenítendő szolgáltatások',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'Összes',
          value: 'all',
        },
        {
          label: 'Kiemelt',
          value: 'featured',
        },
        {
          label: 'Választott',
          value: 'manual',
        },
      ],
    },
    {
      name: 'services',
      label: 'Szolgáltatások',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.mode === 'manual',
      },
    },
  ],
}
