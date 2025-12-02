import React from 'react'
import { Container } from '@/components/ui/Container'
import { Lead, Paragraph } from '@/components/ui/Text'
import { SecondaryCard } from '@/components/ui/cards/SecondaryCard'
import { getPayloadClient } from '@/payload/getPayloadClient'

type Media = {
  id: string
  url: string
  alt?: string
}

type ProjectDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  tag?: string
  featured?: boolean
  thumbnail: Media
}

type NormalizedProject = {
  slug: string
  title: string
  description: string
  imageSrc: string
  tag?: string
}

type ProjectsLayoutBlock = {
  blockType: 'projects'
  mainTitle?: string
  highlightedTitle?: string
  description?: string
  mode?: 'all' | 'featured' | 'manual'
  projects?: ProjectDoc[]
}

type PageDoc = {
  id: string
  slug: string
  title: string
  layout?: (ProjectsLayoutBlock | any)[]
}

function normalizeProject(project: ProjectDoc): NormalizedProject {
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

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
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

  if (!projects.length) {
    return null
  }

  const mainTitle = projectsBlock?.mainTitle || page?.title || 'Esettanulmányok, eredmények.'
  const highlightedTitle = projectsBlock?.highlightedTitle
  const description = projectsBlock?.description

  return (
    <section id="projektek">
      <Container className="mt-9">
        <header className="flex flex-col items-center gap-6 text-center">
          <Lead as="h1">
            {mainTitle}{' '}
            {highlightedTitle ? <span className="text-primary">{highlightedTitle}</span> : null}
          </Lead>
          {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
        </header>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <SecondaryCard
              key={project.slug}
              href={`/projects/${project.slug}`}
              title={project.title}
              description={project.description}
              image={project.imageSrc}
              className="h-72"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
