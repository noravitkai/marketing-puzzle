import type { Block } from 'payload'

export const teamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Csapat szekció',
    plural: 'Csapat szekciók',
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
