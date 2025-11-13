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
          name: 'linkType',
          label: 'Link típusa',
          type: 'select',
          options: [
            { label: 'Belső link', value: 'internal' },
            { label: 'Külső link', value: 'external' },
          ],
          defaultValue: 'internal',
          required: true,
        },
        {
          name: 'internalPage',
          label: 'Belső link',
          type: 'relationship',
          relationTo: 'pages',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'internal',
          },
        },
        {
          name: 'href',
          label: 'Külső link',
          type: 'text',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'external',
          },
        },
      ],
    },
  ],
}
