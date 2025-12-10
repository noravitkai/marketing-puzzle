import { getPayloadClient } from '@/payload/getPayloadClient'
import { getDisplayUrl } from '@/lib/url'

export type Media = {
  id: string
  url?: string | null
  alt?: string | null
}

export type ProjectLink = {
  label?: string | null
  url?: string | null
}

export type ProjectDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  featured?: boolean
  thumbnail: Media | string
  image?: Media | string
  body?: any

  client?: string | null
  year?: string | null
  tags?: string[] | null
  links?: ProjectLink[]
}

export type NormalizedProject = {
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

export type ProjectsLayoutBlock = {
  blockType: 'projects'
  mode?: 'all' | 'featured' | 'manual'
  projects?: ProjectDoc[]
}

export type PageDoc = {
  id: string
  slug: string
  title: string
  mainTitle?: string | null
  highlightedTitle?: string | null
  headerDescription?: string | null
  layout?: (ProjectsLayoutBlock | any)[]
}

export async function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  return (docs[0] as ProjectDoc | undefined) ?? null
}

export function normalizeProject(project: ProjectDoc): NormalizedProject {
  const thumb = project.thumbnail

  const imageSrc =
    thumb && typeof thumb === 'object' && 'url' in thumb && thumb.url ? thumb.url : ''

  const tags = Array.isArray(project.tags)
    ? project.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
    : []

  return {
    slug: project.slug,
    title: project.title,
    description: project.excerpt,
    imageSrc,
    tags,
  }
}

export function getProjectLinks(project: ProjectDoc): NormalizedLink[] {
  const rawLinks = Array.isArray(project.links) ? project.links : []

  return rawLinks
    .map((link) => {
      const { href, label } = getDisplayUrl(link.url, link.label)
      if (!href || !label) return null
      return { href, label }
    })
    .filter((link): link is NormalizedLink => link !== null)
}

export async function getProjectsIndexData() {
  const payload = await getPayloadClient()

  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'projektek' },
    },
    depth: 2,
    limit: 1,
  })

  const page = pageDocs[0] as PageDoc | undefined

  const projectsBlock = page?.layout?.find((block) => block.blockType === 'projects') as
    | ProjectsLayoutBlock
    | undefined

  let projectDocs: ProjectDoc[] = []

  if (projectsBlock?.mode === 'manual' && projectsBlock.projects?.length) {
    projectDocs = projectsBlock.projects as ProjectDoc[]
  } else {
    const where: Record<string, any> = {}

    if (projectsBlock?.mode === 'featured') {
      where.featured = { equals: true }
    }

    const { docs } = await payload.find({
      collection: 'projects',
      depth: 1,
      sort: '-createdAt',
      ...(Object.keys(where).length ? { where } : {}),
    })

    projectDocs = docs as ProjectDoc[]
  }

  const projects = projectDocs.map(normalizeProject)

  return {
    page,
    projectsBlock,
    projects,
  }
}
