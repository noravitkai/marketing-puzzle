import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { LinkIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/ui/Container'
import { Lead, Paragraph } from '@/components/ui/Text'
import { Prose } from '@/components/ui/Prose'
import { getDisplayUrl, type DisplayUrl } from '@/lib/url'
import { getProjectBySlug } from '@/lib/projects'

type ProjectPageParams = {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'

type ProjectLink = {
  label?: string | null
  url?: string | null
}

type ProjectDoc = {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: { url?: string | null; alt?: string | null } | string
  image?: { url?: string | null; alt?: string | null } | string
  client?: string | null
  year?: string | null
  links?: ProjectLink[]
  body?: any
}

type NormalizedLink = {
  href: string
  label: string
}

function getProjectLinks(project: ProjectDoc): NormalizedLink[] {
  const rawLinks = Array.isArray(project.links) ? project.links : []

  return rawLinks
    .map((link) => {
      const { href, label } = getDisplayUrl(link.url, link.label)
      if (!href || !label) return null
      return { href, label }
    })
    .filter((link): link is NormalizedLink => link !== null)
}

type ProjectDetailsProps = {
  project: {
    client?: string | null
    year?: string | null
  }
  links: NormalizedLink[]
}

function ProjectDetails({ project, links }: ProjectDetailsProps) {
  const hasDetails = project.client || project.year
  const hasLinks = links.length > 0

  if (!hasDetails && !hasLinks) return null

  return (
    <div className="space-y-6">
      {hasDetails && (
        <dl className="space-y-3 text-sm text-zinc-600">
          {project.client && (
            <div>
              <dt>Ügyfél</dt>
              <dd className="text-xl font-semibold text-zinc-800">{project.client}</dd>
            </div>
          )}
          {project.year && (
            <div>
              <dt>Év</dt>
              <dd className="text-xl font-semibold text-zinc-800">{project.year}</dd>
            </div>
          )}
        </dl>
      )}

      {hasLinks && (
        <div className={hasDetails ? 'border-t border-zinc-100 pt-6' : ''}>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-zinc-500"
              >
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const project = (await getProjectBySlug(params.slug)) as ProjectDoc | null

  if (!project) {
    return {
      title: 'Az esettanulmányok feltöltése jelenleg folyamatban van.',
    }
  }

  return {
    title: project.title,
    description: project.excerpt,
  }
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = (await getProjectBySlug(params.slug)) as ProjectDoc | null

  if (!project) {
    notFound()
  }

  const thumbnail =
    project.thumbnail && typeof project.thumbnail === 'object' ? project.thumbnail : null

  const imageMedia = project.image && typeof project.image === 'object' ? project.image : null

  const image = imageMedia ?? thumbnail
  const imageUrl = image?.url ?? ''
  const imageAlt = image?.alt ?? project.title

  const links = getProjectLinks(project)
  const hasDetails = project.client || project.year
  const showDetailsSection = hasDetails || links.length > 0
  const showRightColumn = imageUrl || showDetailsSection

  return (
    <Container className="mt-9">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2">
        {showRightColumn && (
          <aside className="order-1 space-y-6 lg:sticky lg:top-24 lg:order-2 lg:self-start lg:pl-20">
            {imageUrl && (
              <div className="max-w-xs px-2.5 lg:max-w-none">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 1024px) 32rem, 20rem"
                  className="aspect-square rotate-3 rounded-md bg-white/90 object-cover shadow-sm ring-1 ring-zinc-900/5"
                />
              </div>
            )}
            {showDetailsSection && (
              <div className="hidden lg:block">
                <ProjectDetails project={project} links={links} />
              </div>
            )}
          </aside>
        )}

        <div className={showRightColumn ? 'order-2 lg:order-1' : 'order-1 lg:order-1'}>
          <Lead as="h1">{project.title}</Lead>
          <div className="mt-6">
            {project.body ? (
              <Prose value={project.body} />
            ) : (
              project.excerpt && (
                <Paragraph className="text-base text-zinc-600">{project.excerpt}</Paragraph>
              )
            )}
          </div>
        </div>
        {showDetailsSection && (
          <div className="order-3 border-t border-zinc-100 pt-6 lg:hidden">
            <ProjectDetails project={project} links={links} />
          </div>
        )}
      </div>
    </Container>
  )
}
