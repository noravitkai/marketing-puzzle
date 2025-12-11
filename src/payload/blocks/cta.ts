import type { Block } from 'payload'

export const ctaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA szekció',
    plural: 'CTA szekciók',
  },
  fields: [
    {
      name: 'showHeader',
      label: 'Szekció fejléce megjelenjen?',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'heading',
      label: 'Szekció címe',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
    },
    {
      name: 'lead',
      label: 'Alcím',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
    },
    {
      name: 'description',
      label: 'Leírás',
      type: 'textarea',
      required: false,
      localized: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showHeader),
      },
    },
    {
      name: 'imagePosition',
      label: 'Elrendezés',
      type: 'select',
      defaultValue: 'images-right',
      options: [
        {
          label: 'Képek jobbra, szöveg balra',
          value: 'images-right',
        },
        {
          label: 'Képek balra, szöveg jobbra',
          value: 'images-left',
        },
      ],
      admin: {
        description:
          'Válaszd ki, hogy a CTA doboz melyik oldalon, és a képek melyik oldalon jelenjenek meg.',
      },
    },
    {
      name: 'cta',
      label: 'CTA doboz',
      type: 'group',
      fields: [
        {
          name: 'heading',
          label: 'CTA cím',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'body',
          label: 'CTA leírás',
          type: 'richText',
          required: true,
          localized: true,
        },
        {
          name: 'primaryAction',
          label: 'Elsődleges gomb',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'Felirat',
              type: 'text',
              required: false,
              localized: true,
            },
            {
              name: 'href',
              label: 'Hivatkozás',
              type: 'text',
              required: false,
              validate: (value: unknown, { siblingData }: { siblingData: any }) => {
                const label = siblingData?.label ? String(siblingData.label).trim() : ''
                const href = typeof value === 'string' ? value.trim() : ''

                if (label && !href) {
                  return 'Linket is adj meg.'
                }

                return true
              },
            },
          ],
        },
        {
          name: 'secondaryAction',
          label: 'Másodlagos gomb',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'Felirat',
              type: 'text',
              required: false,
              localized: true,
            },
            {
              name: 'href',
              label: 'Hivatkozás',
              type: 'text',
              required: false,
              validate: (value: unknown, { siblingData }: { siblingData: any }) => {
                const label = siblingData?.label ? String(siblingData.label).trim() : ''
                const href = typeof value === 'string' ? value.trim() : ''

                if (label && !href) {
                  return 'Linket is adj meg.'
                }

                return true
              },
            },
          ],
        },
        {
          name: 'images',
          label: 'Képek',
          labels: {
            singular: 'Kép',
            plural: 'Képek',
          },
          type: 'array',
          minRows: 2,
          maxRows: 2,
          required: true,
          fields: [
            {
              name: 'image',
              label: 'Kép',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
