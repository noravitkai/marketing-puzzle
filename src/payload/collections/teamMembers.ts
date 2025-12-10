import type { CollectionConfig } from 'payload'

export const teamMembersCollection: CollectionConfig = {
  slug: 'teamMembers',
  labels: {
    singular: 'Csapattag',
    plural: 'Csapattagok',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
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
}
