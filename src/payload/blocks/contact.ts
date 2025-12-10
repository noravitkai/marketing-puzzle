import type { Block } from 'payload'

export const contactInfoBlock: Block = {
  slug: 'contactInfo',
  labels: {
    singular: 'Kapcsolati infó szekció',
    plural: 'Kapcsolati infó szekciók',
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
      name: 'image',
      label: 'Kép',
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
      label: 'Google Maps link',
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
      validate: (value, options) => {
        const siblingData = options?.siblingData as { showStats?: boolean } | undefined
        const showStats = Boolean(siblingData?.showStats)
        if (!showStats) {
          return true
        }
        const count = Array.isArray(value) ? value.length : 0
        if (count !== 4) {
          return 'Pontosan 4 statisztikát kell megadni.'
        }
        return true
      },
      fields: [
        {
          name: 'value',
          label: 'Érték',
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
