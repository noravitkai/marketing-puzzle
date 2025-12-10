import type { Block } from 'payload'

export const servicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatások szekció',
    plural: 'Szolgáltatások szekciók',
  },
  fields: [
    {
      name: 'showHeader',
      label: 'Szekció fejléce megjelenjen?',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'heading',
      label: 'Szekció címe',
      type: 'text',
      required: false,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
    },
    {
      name: 'lead',
      label: 'Alcím',
      type: 'text',
      required: false,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
    },
    {
      name: 'description',
      label: 'Leírás',
      type: 'textarea',
      required: false,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
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
