import type { Block } from 'payload'

export const contactInfoBlock: Block = {
  slug: 'contactInfo',
  labels: {
    singular: 'Kapcsolati infó szekció',
    plural: 'Kapcsolati infó szekciók',
  },
  fields: [
    {
      name: 'heading',
      label: 'Szekció címe',
      type: 'text',
      required: false,
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
      name: 'image',
      label: 'Kép (bal oldali nagy kártya)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'phoneTitle',
      label: 'Telefon kártya címe',
      type: 'text',
      required: true,
      defaultValue: 'Telefon',
    },
    {
      name: 'phoneNumber',
      label: 'Telefonszám',
      type: 'text',
      required: true,
    },
    {
      name: 'emailTitle',
      label: 'E-mail kártya címe',
      type: 'text',
      required: true,
      defaultValue: 'E-mail',
    },
    {
      name: 'emailAddress',
      label: 'E-mail cím',
      type: 'text',
      required: true,
    },
    {
      name: 'addressTitle',
      label: 'Cím kártya címe',
      type: 'text',
      required: true,
      defaultValue: 'Cím',
    },
    {
      name: 'addressText',
      label: 'Cím',
      type: 'textarea',
      required: true,
    },
    {
      name: 'mapsUrl',
      label: 'Google Maps URL (kattintható címhez)',
      type: 'text',
      required: false,
    },
    {
      name: 'showStats',
      label: 'Statisztikák megjelenítése',
      type: 'checkbox',
      required: false,
      defaultValue: false,
    },
    {
      name: 'stats',
      label: 'Statisztikák',
      labels: {
        singular: 'Statisztika',
        plural: 'Statisztikák',
      },
      type: 'array',
      minRows: 0,
      maxRows: 4,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showStats),
      },
      fields: [
        {
          name: 'value',
          label: 'Érték/cím',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Leírás',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
