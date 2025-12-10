import Hero from '@/components/home/Hero'
import Video from '@/components/home/Video'
import Services, { ServiceCard } from '@/components/home/Services'
import Team, { TeamMember } from '@/components/home/Team'
import Testimonials, { Testimonial } from '@/components/home/Testimonials'
import { FormSection } from '@/components/sections/Form'
import { ContactForm, type ContactFormProps } from '@/components/ui/ContactForm'
import { getPayloadClient } from '@/payload/getPayloadClient'

type HeroCardFromPayload = {
  id: string
  badgeText: string
  linkType: 'internal' | 'external'
  href?: string | null
  internalPage?: {
    id: string
    slug: string
  } | null
  image?: {
    id: string
    url?: string | null
    alt?: string | null
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
  heading: string
  lead?: string | null
  description?: string | null
  youtubeId: string
  privacyEnhanced?: boolean | null
}

type ServiceCardFromPayload = {
  id: string
  title: string
  description: string
  targetPage?: {
    id: string
    slug: string
  } | null
  icon?: {
    id: string
    url?: string | null
    alt?: string | null
  } | null
}

type ServicesBlockFromPayload = {
  id: string
  blockType: 'services'
  heading: string
  lead?: string | null
  description?: string | null
  ctaLabel: string
  items?: ServiceCardFromPayload[]
}

type TeamMemberFromPayload = {
  id: string
  name: string
  description?: string | null
  positions?: {
    id: string
    label: string
  }[]
  photo?: {
    id: string
    url?: string | null
    alt?: string | null
  } | null
}

type TeamBlockFromPayload = {
  id: string
  blockType: 'team'
  heading: string
  lead?: string | null
  description?: string | null
  members?: TeamMemberFromPayload[]
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
  heading: string
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
    | TestimonialsBlockFromPayload
    | FormBlockFromPayload
  )[]
}

export default async function HomePage() {
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
  })

  const docs = result.docs as PageFromPayload[]
  const [page] = docs

  return (
    <>
      {page.layout.map((block) => {
        switch (block.blockType) {
          case 'hero': {
            const heroBlock = block as HeroBlockFromPayload

            return (
              <Hero
                key={heroBlock.id}
                mainTitle={heroBlock.mainTitle}
                highlightedTitle={heroBlock.highlightedTitle ?? undefined}
                description={heroBlock.description}
                primaryCtaLabel={heroBlock.primaryCtaLabel ?? undefined}
                primaryCtaUrl={heroBlock.primaryCtaUrl ?? undefined}
                secondaryCtaLabel={heroBlock.secondaryCtaLabel ?? undefined}
                secondaryCtaUrl={heroBlock.secondaryCtaUrl ?? undefined}
                cards={heroBlock.cards ?? []}
              />
            )
          }

          case 'services': {
            const servicesBlock = block as ServicesBlockFromPayload

            const services: ServiceCard[] =
              servicesBlock.items?.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                href: item.targetPage?.slug ? `/${item.targetPage.slug}` : undefined,
                iconUrl: item.icon?.url ?? undefined,
                iconAlt: item.icon?.alt ?? item.title,
              })) ?? []

            return (
              <Services
                key={servicesBlock.id}
                heading={servicesBlock.heading}
                lead={servicesBlock.lead ?? undefined}
                description={servicesBlock.description ?? undefined}
                ctaLabel={servicesBlock.ctaLabel}
                services={services}
              />
            )
          }

          case 'video': {
            const videoBlock = block as VideoBlockFromPayload

            return (
              <Video
                key={videoBlock.id}
                heading={videoBlock.heading}
                lead={videoBlock.lead ?? undefined}
                description={videoBlock.description ?? undefined}
                youtubeId={videoBlock.youtubeId}
                privacyEnhanced={videoBlock.privacyEnhanced ?? false}
              />
            )
          }

          case 'team': {
            const teamBlock = block as TeamBlockFromPayload

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
                heading={teamBlock.heading}
                lead={teamBlock.lead ?? undefined}
                description={teamBlock.description ?? undefined}
                members={members}
              />
            )
          }

          case 'testimonials': {
            const testimonialsBlock = block as TestimonialsBlockFromPayload

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
                heading={testimonialsBlock.heading}
                lead={testimonialsBlock.lead ?? undefined}
                description={testimonialsBlock.description ?? undefined}
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
              serviceOptions,
              toggleFile,
              showHeader,
              ...rawFormProps
            } = formBlock

            const formProps: ContactFormProps = {
              ...rawFormProps,
              serviceOptions: serviceOptions ?? [],
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

          default:
            return null
        }
      })}
    </>
  )
}
