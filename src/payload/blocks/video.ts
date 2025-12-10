import type { Block } from 'payload'

export const videoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Videó szekció',
    plural: 'Videó szekciók',
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
      name: 'youtubeId',
      label: 'YouTube ID (URL utolsó része)',
      type: 'text',
      required: true,
      defaultValue: 'vBJMdDTcTLo',
    },
    {
      name: 'privacyEnhanced',
      label: 'GDPR megfelelő mód engedélyezése',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
