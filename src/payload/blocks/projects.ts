import type { Block } from 'payload'

export const projectsBlock: Block = {
  slug: 'projects',
  labels: {
    singular: 'Projektek szekció',
    plural: 'Projektek szekciók',
  },
  fields: [
    {
      name: 'mainTitle',
      label: 'Fő címrész',
      type: 'text',
      required: true,
    },
    {
      name: 'highlightedTitle',
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
      name: 'mode',
      label: 'Megjelenítendő projektek',
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
      name: 'projects',
      label: 'Projektek',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.mode === 'manual',
      },
    },
  ],
}
