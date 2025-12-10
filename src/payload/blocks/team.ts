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
      labels: {
        singular: 'Csapattag',
        plural: 'Csapattagok',
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          label: 'Név',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Bemutatkozás',
          type: 'textarea',
          required: false,
        },
        {
          name: 'positions',
          label: 'Pozíciók',
          labels: {
            singular: 'Pozíció',
            plural: 'Pozíciók',
          },
          type: 'array',
          required: false,
          fields: [
            {
              name: 'label',
              label: 'Megnevezés',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'photo',
          label: 'Fotó',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
