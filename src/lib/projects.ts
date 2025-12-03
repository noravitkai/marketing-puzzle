import { getPayloadClient } from '@/payload/getPayloadClient'

export type Media = {
  id: string
  url?: string | null
  alt?: string | null
}

export type ProjectDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  tag?: string
  featured?: boolean
  thumbnail: Media | string
  body?: any
  image?: Media | string
  client?: string | null
  year?: string | null
  services?: string | null
  result?: string | null
  url?: string | null
}

export type NormalizedProject = {
  slug: string
  title: string
  description: string
  imageSrc: string
  tag?: string
}

export type ProjectsLayoutBlock = {
  blockType: 'projects'
  mainTitle?: string
  highlightedTitle?: string
  description?: string
  mode?: 'all' | 'featured' | 'manual'
  projects?: ProjectDoc[]
}

export type PageDoc = {
  id: string
  slug: string
  title: string
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

  return {
    slug: project.slug,
    title: project.title,
    description: project.excerpt,
    imageSrc,
    tag: project.tag,
  }
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
