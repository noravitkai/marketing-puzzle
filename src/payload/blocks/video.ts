import type { Block } from 'payload'

export const videoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Videó szekció',
    plural: 'Videó szekciók',
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
