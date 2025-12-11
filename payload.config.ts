import sharp from 'sharp'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { heroBlock } from '@/payload/blocks/hero'
import { videoBlock } from '@/payload/blocks/video'
import { servicesBlock } from '@/payload/blocks/services'
import { teamBlock } from '@/payload/blocks/team'
import { ctaBlock } from '@/payload/blocks/cta'
import { testimonialsBlock } from '@/payload/blocks/testimonials'
import { formBlock } from '@/payload/blocks/form'
import { projectsBlock } from '@/payload/blocks/projects'
import { contactInfoBlock } from '@/payload/blocks/contact'
import { projectsCollection } from '@/payload/collections/projects'
import { servicesCollection } from '@/payload/collections/services'
import { teamMembersCollection } from '@/payload/collections/teamMembers'
import { locales, defaultLocale } from '@/i18n/config'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,

  editor: lexicalEditor(),

  admin: {
    user: 'users',
  },

  localization: {
    locales: [...locales],
    defaultLocale,
    fallback: true,
  },

  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: ['admin', 'editor'],
          defaultValue: 'editor',
        },
      ],
    },
    {
      slug: 'media',
      upload: true,
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          label: 'Alt szöveg',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      slug: 'pages',
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'mainTitle',
          label: 'Fő címrész',
          type: 'text',
          required: false,
        },
        {
          name: 'highlightedTitle',
          label: 'Kiemelt címrész',
          type: 'text',
          required: false,
        },
        {
          name: 'headerDescription',
          label: 'Leírás',
          type: 'textarea',
          required: false,
        },
        {
          name: 'layout',
          label: 'Page layout',
          type: 'blocks',
          required: true,
          blocks: [
            heroBlock,
            videoBlock,
            servicesBlock,
            teamBlock,
            ctaBlock,
            testimonialsBlock,
            formBlock,
            projectsBlock,
            contactInfoBlock,
          ],
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    projectsCollection,
    servicesCollection,
    teamMembersCollection,
  ],

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),

  sharp,
})
