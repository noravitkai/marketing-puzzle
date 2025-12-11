import type { Block } from 'payload'

export const heroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero szekció',
    plural: 'Hero szekciók',
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
      required: true,
    },
    {
      name: 'primaryCtaLabel',
      label: 'Elsődleges gomb szöveg',
      type: 'text',
      required: false,
    },
    {
      name: 'primaryCtaUrl',
      label: 'Elsődleges gomb link',
      type: 'text',
      required: false,
      validate: (value: unknown, { siblingData }: { siblingData: any }) => {
        const label = siblingData?.primaryCtaLabel ? String(siblingData.primaryCtaLabel).trim() : ''
        const url = typeof value === 'string' ? value.trim() : ''

        if (label && !url) {
          return 'Linket is adj meg.'
        }

        return true
      },
    },
    {
      name: 'secondaryCtaLabel',
      label: 'Másodlagos gomb szöveg',
      type: 'text',
      required: false,
    },
    {
      name: 'secondaryCtaUrl',
      label: 'Másodlagos gomb link',
      type: 'text',
      required: false,
      validate: (value: unknown, { siblingData }: { siblingData: any }) => {
        const label = siblingData?.secondaryCtaLabel
          ? String(siblingData.secondaryCtaLabel).trim()
          : ''
        const url = typeof value === 'string' ? value.trim() : ''

        if (label && !url) {
          return 'Linket is adj meg.'
        }

        return true
      },
    },
    {
      name: 'cards',
      label: 'Kártyák (képek)',
      labels: {
        singular: 'Kártya',
        plural: 'Kártyák',
      },
      type: 'array',
      minRows: 5,
      maxRows: 5,
      fields: [
        {
          name: 'image',
          label: 'Kép',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'badgeText',
          label: 'Címke szöveg',
          type: 'text',
          required: true,
        },
        {
          name: 'service',
          label: 'Szolgáltatás',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
      ],
    },
  ],
}
