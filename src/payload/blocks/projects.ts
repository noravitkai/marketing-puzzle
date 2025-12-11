import type { Block } from 'payload'

export const projectsBlock: Block = {
  slug: 'projects',
  labels: {
    singular: 'Projektek szekció',
    plural: 'Projektek szekciók',
  },
  fields: [
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
