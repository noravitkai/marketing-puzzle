import type { Block } from 'payload'

export const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Vélemények szekció',
    plural: 'Vélemények szekciók',
  },
  fields: [
    {
      name: 'heading',
      label: 'Fő címrész',
      type: 'text',
      required: true,
    },
    {
      name: 'lead',
      label: 'Kiemelt címrész',
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
