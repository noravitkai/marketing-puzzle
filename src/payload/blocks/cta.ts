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
      name: 'cta',
      label: 'CTA doboz',
      type: 'group',
      fields: [
        {
          name: 'heading',
          label: 'CTA cím',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          label: 'CTA leírás',
          type: 'richText',
          required: true,
        },
        {
          name: 'primaryAction',
          label: 'Elsődleges gomb',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'Gomb szövege',
              type: 'text',
              required: false,
            },
            {
              name: 'href',
              label: 'Hivatkozás (URL vagy slug)',
              type: 'text',
              required: false,
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
              label: 'Gomb szövege',
              type: 'text',
              required: false,
            },
            {
              name: 'href',
              label: 'Hivatkozás (URL vagy slug)',
              type: 'text',
              required: false,
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
