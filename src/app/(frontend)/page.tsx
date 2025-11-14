import Hero from '@/components/home/Hero'
import Video from '@/components/home/Video'
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

type PageFromPayload = {
  id: string
  title: string
  slug: string
  layout: (HeroBlockFromPayload | VideoBlockFromPayload)[]
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

          default:
            return null
        }
      })}
    </>
  )
}
