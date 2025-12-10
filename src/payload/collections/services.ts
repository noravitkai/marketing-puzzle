import type { CollectionConfig } from 'payload'

export const servicesCollection: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured'],
  },
  fields: [
    {
      name: 'title',
      label: 'Szolgáltatás neve',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      label: 'Rövid leírás',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featured',
      label: 'Kiemelt',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'icon',
      label: 'Ikon vagy illusztráció (SVG)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'body',
      label: 'Részletes leírás',
      type: 'richText',
    },
    {
      name: 'primaryCtaLabel',
      label: 'Elsődleges gomb szövege (pl. "Ajánlatkérés")',
      type: 'text',
      required: false,
      defaultValue: 'Ajánlatkérés',
    },
    {
      name: 'primaryCtaHref',
      label: 'Elsődleges gomb linkje (pl. "/kapcsolat")',
      type: 'text',
      required: false,
      defaultValue: '/kapcsolat',
    },
    {
      name: 'secondaryCtaLabel',
      label: 'Másodlagos gomb szövege (pl. "További szolgáltatásaink")',
      type: 'text',
      required: false,
      defaultValue: 'További szolgáltatásaink',
    },
    {
      name: 'secondaryCtaHref',
      label: 'Másodlagos gomb linkje (pl. "/#szolgaltatasok")',
      type: 'text',
      required: false,
      defaultValue: '/#szolgaltatasok',
    },
  ],
}
