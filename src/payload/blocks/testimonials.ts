import type { Block } from 'payload'

export const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Vélemények szekció',
    plural: 'Vélemények szekciók',
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
      name: 'items',
      label: 'Vélemények',
      labels: {
        singular: 'Vélemény',
        plural: 'Vélemények',
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          label: 'Vélemény szövege',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          label: 'Véleményező neve',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          label: 'Cég és/vagy pozíció',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}
