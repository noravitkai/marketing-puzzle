import * as React from 'react'
import Hero from '@/components/home/Hero'
import Video from '@/components/home/Video'
import Services, { ServiceCard } from '@/components/home/Services'
import Team, { TeamMember } from '@/components/home/Team'
import Testimonials, { Testimonial } from '@/components/home/Testimonials'
import { FormSection } from '@/components/sections/Form'
import { ContactForm, type ContactFormProps } from '@/components/ui/ContactForm'
import CtaSection from '@/components/sections/Cta'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { SerializedEditorState } from 'lexical'
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import type { Locale } from '@/i18n/config'
import { localizedServiceDetailPath } from '@/i18n/paths'
import { normalizeCtaUrlForLocale } from '@/i18n/url'

type Media = {
  id: string
  url?: string | null
  alt?: string | null
}

type HeroCardFromPayload = {
  id: string
  badgeText: string
  image?: Media | null
  service?: {
    slug: string
  } | null
}

type HeroBlockFromPayload = {
  id: string
  blockType: 'hero'
  mainTitle: string
  highlightedTitle?: string | null
  description: string
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  cards?: HeroCardFromPayload[]
}

type VideoBlockFromPayload = {
  id: string
  blockType: 'video'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  youtubeId: string
  privacyEnhanced?: boolean | null
}

type ServiceDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  featured?: boolean
  icon?: Media | null
}

type ServicesBlockFromPayload = {
  id: string
  blockType: 'services'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  ctaLabel: string
  mode?: 'all' | 'featured' | 'manual'
  services?: ServiceDoc[]
}

function normalizeService(service: ServiceDoc, locale: Locale): ServiceCard {
  const icon = service.icon
  const iconUrl =
    icon && typeof icon === 'object' && 'url' in icon && icon.url ? icon.url : undefined
  const iconAlt =
    icon && typeof icon === 'object' && 'alt' in icon && icon.alt ? icon.alt : service.title

  const slug = service.slug?.trim()
  const href = slug ? localizedServiceDetailPath(locale, slug) : '#'

  return {
    id: service.id,
    title: service.title,
    description: service.excerpt,
    href,
    iconUrl,
    iconAlt,
  }
}

type TeamMemberFromPayload = {
  id: string
  name: string
  description?: string | null
  positions?: {
    id: string
    label: string
  }[]
  photo?: Media | null
}

type TeamBlockFromPayload = {
  id: string
  blockType: 'team'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  members?: TeamMemberFromPayload[]
}

type CtaBlockFromPayload = {
  id: string
  blockType: 'cta'
  showHeader?: boolean | null
  imagePosition?: 'images-right' | 'images-left' | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  cta: {
    heading: string
    body?: SerializedEditorState | null
    primaryAction?: {
      label?: string | null
      href?: string | null
    } | null
    secondaryAction?: {
      label?: string | null
      href?: string | null
    } | null
    images: {
      image?: {
        url?: string | null
        alt?: string | null
      } | null
    }[]
  }
}

type TestimonialFromPayload = {
  id: string
  quote: string
  author: string
  company?: string | null
}

type TestimonialsBlockFromPayload = {
  id: string
  blockType: 'testimonials'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  items?: TestimonialFromPayload[]
}

type FormServiceOptionFromPayload = {
  value: string
  label: string
}

type MediaFromPayload = {
  id: string
  url?: string | null
  alt?: string | null
}

type FormBlockFromPayload = {
  id: string
  blockType: 'form'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  image?: MediaFromPayload | null
} & Omit<ContactFormProps, 'className' | 'serviceOptions' | 'toggleFileUrl'> & {
    serviceOptions?: FormServiceOptionFromPayload[] | null
    toggleFile?: MediaFromPayload | null
  }

type PageFromPayload = {
  id: string
  title: string
  slug: string
  layout: (
    | HeroBlockFromPayload
    | VideoBlockFromPayload
    | ServicesBlockFromPayload
    | TeamBlockFromPayload
    | CtaBlockFromPayload
    | TestimonialsBlockFromPayload
    | FormBlockFromPayload
  )[]
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: 'fooldal',
      },
    },
    locale,
  })

  const docs = result.docs as PageFromPayload[]
  const [page] = docs

  let servicesCards: ServiceCard[] = []
  let serviceOptions: FormServiceOptionFromPayload[] = []

  const servicesLayoutBlock = page.layout.find((block) => block.blockType === 'services') as
    | ServicesBlockFromPayload
    | undefined

  if (servicesLayoutBlock) {
    let serviceDocs: ServiceDoc[] = []

    if (servicesLayoutBlock.mode === 'manual' && servicesLayoutBlock.services?.length) {
      serviceDocs = servicesLayoutBlock.services as ServiceDoc[]
    } else {
      const where: Record<string, any> = {}

      if (servicesLayoutBlock.mode === 'featured') {
        where.featured = { equals: true }
      }

      const { docs: fetchedServices } = await payload.find({
        collection: 'services',
        depth: 1,
        sort: '-createdAt',
        ...(Object.keys(where).length ? { where } : {}),
      })

      serviceDocs = fetchedServices as ServiceDoc[]
    }

    servicesCards = serviceDocs.map((service) => normalizeService(service, locale))
    serviceOptions = serviceDocs
      .filter((service) => Boolean(service.title))
      .map((service) => ({
        value: service.slug || service.id,
        label: service.title,
      }))
  }

  if (!serviceOptions.length) {
    const { docs: fallbackServices } = await payload.find({
      collection: 'services',
      depth: 0,
      sort: 'title',
    })

    const fallbackServiceDocs = fallbackServices as ServiceDoc[]
    serviceOptions = fallbackServiceDocs
      .filter((service) => Boolean(service.title))
      .map((service) => ({
        value: service.slug || service.id,
        label: service.title,
      }))
  }

  return (
    <>
      {page.layout.map((block) => {
        switch (block.blockType) {
          case 'hero': {
            const heroBlock = block as HeroBlockFromPayload

            return (
              <Hero
                key={heroBlock.id}
                locale={locale}
                mainTitle={heroBlock.mainTitle}
                highlightedTitle={heroBlock.highlightedTitle ?? undefined}
                description={heroBlock.description}
                primaryCtaLabel={heroBlock.primaryCtaLabel ?? undefined}
                primaryCtaUrl={normalizeCtaUrlForLocale(heroBlock.primaryCtaUrl, locale)}
                secondaryCtaLabel={heroBlock.secondaryCtaLabel ?? undefined}
                secondaryCtaUrl={normalizeCtaUrlForLocale(heroBlock.secondaryCtaUrl, locale)}
                cards={heroBlock.cards ?? []}
              />
            )
          }

          case 'services': {
            const servicesBlock = block as ServicesBlockFromPayload
            const shouldShowHeader = servicesBlock.showHeader !== false

            return (
              <Services
                key={servicesBlock.id}
                heading={shouldShowHeader ? (servicesBlock.heading ?? undefined) : undefined}
                lead={shouldShowHeader ? (servicesBlock.lead ?? undefined) : undefined}
                description={
                  shouldShowHeader ? (servicesBlock.description ?? undefined) : undefined
                }
                ctaLabel={servicesBlock.ctaLabel}
                services={servicesCards}
              />
            )
          }

          case 'video': {
            const videoBlock = block as VideoBlockFromPayload
            const shouldShowHeader = videoBlock.showHeader !== false

            return (
              <Video
                key={videoBlock.id}
                heading={shouldShowHeader ? (videoBlock.heading ?? undefined) : undefined}
                lead={shouldShowHeader ? (videoBlock.lead ?? undefined) : undefined}
                description={shouldShowHeader ? (videoBlock.description ?? undefined) : undefined}
                youtubeId={videoBlock.youtubeId}
                privacyEnhanced={videoBlock.privacyEnhanced ?? false}
              />
            )
          }

          case 'team': {
            const teamBlock = block as TeamBlockFromPayload
            const shouldShowHeader = teamBlock.showHeader !== false

            const members: TeamMember[] =
              teamBlock.members?.map((member) => ({
                id: member.id,
                name: member.name,
                positions: member.positions?.map((p) => p.label) ?? [],
                imageUrl: member.photo?.url ?? undefined,
                imageAlt: member.photo?.alt ?? undefined,
                description: member.description ?? undefined,
              })) ?? []

            return (
              <Team
                key={teamBlock.id}
                heading={shouldShowHeader ? (teamBlock.heading ?? undefined) : undefined}
                lead={shouldShowHeader ? (teamBlock.lead ?? undefined) : undefined}
                description={shouldShowHeader ? (teamBlock.description ?? undefined) : undefined}
                members={members}
              />
            )
          }

          case 'testimonials': {
            const testimonialsBlock = block as TestimonialsBlockFromPayload
            const shouldShowHeader = testimonialsBlock.showHeader !== false

            const items: Testimonial[] =
              testimonialsBlock.items?.map((item) => ({
                id: item.id,
                quote: item.quote,
                author: item.author,
                company: item.company ?? undefined,
              })) ?? []

            return (
              <Testimonials
                key={testimonialsBlock.id}
                heading={shouldShowHeader ? (testimonialsBlock.heading ?? undefined) : undefined}
                lead={shouldShowHeader ? (testimonialsBlock.lead ?? undefined) : undefined}
                description={
                  shouldShowHeader ? (testimonialsBlock.description ?? undefined) : undefined
                }
                items={items}
              />
            )
          }

          case 'form': {
            const formBlock = block as FormBlockFromPayload

            const {
              id,
              heading,
              lead,
              description,
              image,
              toggleFile,
              showHeader,
              ...rawFormProps
            } = formBlock

            const formProps: ContactFormProps = {
              ...rawFormProps,
              serviceOptions,
              toggleFileUrl: toggleFile?.url ?? undefined,
            }

            const shouldShowHeader = showHeader !== false

            return (
              <FormSection
                key={id}
                id="konzultacio"
                heading={shouldShowHeader ? (heading ?? undefined) : undefined}
                lead={shouldShowHeader ? (lead ?? undefined) : undefined}
                description={shouldShowHeader ? (description ?? undefined) : undefined}
                imageUrl={image?.url ?? undefined}
                imageAlt={image?.alt ?? undefined}
              >
                <ContactForm
                  {...formProps}
                  className="-mt-20 w-[90%] rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-28 sm:w-[80%] lg:-mt-44"
                />
              </FormSection>
            )
          }

          case 'cta': {
            const ctaBlock = block as CtaBlockFromPayload

            return (
              <CtaSection
                key={ctaBlock.id}
                block={ctaBlock}
                primaryTrailingIcon={<ArrowRightIcon className="h-5 w-5" />}
                secondaryTrailingIcon={<InformationCircleIcon className="h-5 w-5" />}
              />
            )
          }

          default:
            return null
        }
      })}
    </>
  )
}
