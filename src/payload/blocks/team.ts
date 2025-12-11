import type { Block } from 'payload'

export const teamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Csapat szekció',
    plural: 'Csapat szekciók',
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
      name: 'members',
      label: 'Csapattagok',
      type: 'relationship',
      relationTo: 'teamMembers',
      hasMany: true,
      required: false,
    },
  ],
}
