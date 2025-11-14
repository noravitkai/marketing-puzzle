import Hero from '@/components/home/Hero'
import Services, { ServiceCard } from '@/components/home/Services'
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

type PageFromPayload = {
  id: string
  title: string
  slug: string
  layout: (HeroBlockFromPayload | ServicesBlockFromPayload)[]
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

          default:
            return null
        }
      })}
    </>
  )
}
