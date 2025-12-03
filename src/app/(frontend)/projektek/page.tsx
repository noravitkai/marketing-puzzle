import React from 'react'
import { Container } from '@/components/ui/Container'
import { Lead, Paragraph } from '@/components/ui/Text'
import { SecondaryCard } from '@/components/ui/cards/SecondaryCard'
import { getProjectsIndexData } from '@/lib/projects'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const { page, projectsBlock, projects } = await getProjectsIndexData()

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
              href={`/projektek/${project.slug}`}
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
