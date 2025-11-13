import Hero from '@/components/home/Hero'
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

type PageFromPayload = {
  id: string
  title: string
  slug: string
  layout: HeroBlockFromPayload[]
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

  const heroBlock = page.layout.find((block: HeroBlockFromPayload) => block.blockType === 'hero')!

  return (
    <Hero
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
