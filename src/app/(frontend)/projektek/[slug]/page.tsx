import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/Container'
import { Lead, Paragraph } from '@/components/ui/Text'
import { Prose } from '@/components/ui/Prose'
import { getDisplayUrl } from '@/lib/url'
import { getProjectBySlug } from '@/lib/projects'

type ProjectPageParams = {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

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
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const thumbnail =
    project.thumbnail && typeof project.thumbnail === 'object' ? project.thumbnail : null

  const imageMedia = project.image && typeof project.image === 'object' ? project.image : null

  const image = imageMedia ?? thumbnail
  const imageUrl = image?.url ?? ''
  const imageAlt = image?.alt ?? project.title

  const hasDetails = project.client || project.year || project.services || project.result
  const { href: projectHref, label: projectUrlLabel } = getDisplayUrl(project.url)
  const showDetailsSection = hasDetails || (projectHref && projectUrlLabel)

  return (
    <Container className="mt-9 sm:mt-16">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        {imageUrl && (
          <div className="lg:pl-20">
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
          </div>
        )}

        <div className="lg:order-first lg:row-span-2">
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
          <div className="lg:pl-20">
            {hasDetails && (
              <dl className="space-y-3 text-sm text-zinc-600">
                {project.client && (
                  <div>
                    <dt className="font-medium text-zinc-800">Ügyfél</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt className="font-medium text-zinc-800">Év</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                {project.services && (
                  <div>
                    <dt className="font-medium text-zinc-800">Szolgáltatások</dt>
                    <dd>{project.services}</dd>
                  </div>
                )}
                {project.result && (
                  <div>
                    <dt className="font-medium text-zinc-800">Eredmény</dt>
                    <dd>{project.result}</dd>
                  </div>
                )}
              </dl>
            )}

            {projectHref && projectUrlLabel && (
              <div className="mt-6 border-t border-zinc-100 pt-4">
                <a
                  href={projectHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary inline-flex items-center text-sm font-medium hover:underline"
                >
                  {projectUrlLabel}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
