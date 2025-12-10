import { getPayloadClient } from '@/payload/getPayloadClient'
import { getDisplayUrl } from '@/lib/url'

export type Media = {
  id: string
  url?: string | null
  alt?: string | null
}

export type ServiceLink = {
  label?: string | null
  url?: string | null
}

export type ServiceDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: Media | string
  image?: Media | string
  body?: any
  tags?: string[] | null
  links?: ServiceLink[]
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
}

export type NormalizedService = {
  slug: string
  title: string
  description: string
  imageSrc: string
  tags: string[]
}

export type NormalizedLink = {
  href: string
  label: string
}

export type ServicesLayoutBlock = {
  blockType: 'services'
  mainTitle?: string
  highlightedTitle?: string
  description?: string
  mode?: 'all' | 'manual'
  services?: ServiceDoc[]
}

export type PageDoc = {
  id: string
  slug: string
  title: string
  layout?: (ServicesLayoutBlock | any)[]
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'services',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  return (docs[0] as ServiceDoc | undefined) ?? null
}

export function normalizeService(service: ServiceDoc): NormalizedService {
  const thumb = service.thumbnail

  const imageSrc =
    thumb && typeof thumb === 'object' && 'url' in thumb && thumb.url ? thumb.url : ''

  const tags = Array.isArray(service.tags)
    ? service.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
    : []

  return {
    slug: service.slug,
    title: service.title,
    description: service.excerpt,
    imageSrc,
    tags,
  }
}

export function getServiceLinks(service: ServiceDoc): NormalizedLink[] {
  const rawLinks = Array.isArray(service.links) ? service.links : []

  return rawLinks
    .map((link) => {
      const { href, label } = getDisplayUrl(link.url, link.label)
      if (!href || !label) return null
      return { href, label }
    })
    .filter((link): link is NormalizedLink => link !== null)
}

export async function getServicesIndexData() {
  const payload = await getPayloadClient()

  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'szolgaltatasok' },
    },
    depth: 2,
    limit: 1,
  })

  const page = pageDocs[0] as PageDoc | undefined

  const servicesBlock = page?.layout?.find((block) => block.blockType === 'services') as
    | ServicesLayoutBlock
    | undefined

  let serviceDocs: ServiceDoc[] = []

  if (servicesBlock?.mode === 'manual' && servicesBlock.services?.length) {
    serviceDocs = servicesBlock.services as ServiceDoc[]
  } else {
    const { docs } = await payload.find({
      collection: 'services',
      depth: 1,
      sort: '-createdAt',
    })

    serviceDocs = docs as ServiceDoc[]
  }

  const services = serviceDocs.map(normalizeService)

  return {
    page,
    servicesBlock,
    services,
  }
}
