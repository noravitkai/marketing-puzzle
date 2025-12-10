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
      label: 'Elsődleges gomb szövege',
      type: 'text',
      required: false,
      defaultValue: 'Ajánlatkérés',
    },
    {
      name: 'primaryCtaHref',
      label: 'Elsődleges gomb linkje',
      type: 'text',
      required: false,
      defaultValue: '/kapcsolat',
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { primaryCtaLabel?: string } },
      ): true | string => {
        const rawLabel = siblingData?.primaryCtaLabel
        const label = typeof rawLabel === 'string' ? rawLabel.trim() : ''

        if (label && (!value || !String(value).trim())) {
          return 'Linket is adj meg.'
        }

        return true
      },
    },
    {
      name: 'secondaryCtaLabel',
      label: 'Másodlagos gomb szövege',
      type: 'text',
      required: false,
      defaultValue: 'További szolgáltatásaink',
    },
    {
      name: 'secondaryCtaHref',
      label: 'Másodlagos gomb linkje',
      type: 'text',
      required: false,
      defaultValue: '/#szolgaltatasok',
      validate: (
        value: unknown,
        { siblingData }: { siblingData?: { secondaryCtaLabel?: string } },
      ): true | string => {
        const rawLabel = siblingData?.secondaryCtaLabel
        const label = typeof rawLabel === 'string' ? rawLabel.trim() : ''

        if (label && (!value || !String(value).trim())) {
          return 'Linket is adj meg.'
        }

        return true
      },
    },
  ],
}
