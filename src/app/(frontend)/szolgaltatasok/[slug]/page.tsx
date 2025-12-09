import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { Container } from '@/components/ui/Container'
import { Prose } from '@/components/ui/Prose'
import { Lead, Paragraph } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { getServiceBySlug, type ServiceDoc } from '@/lib/services'

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = (await getServiceBySlug(slug)) as ServiceDoc | null

  if (!service) {
    return {
      title: 'A szolgáltatás részletei jelenleg nem elérhetők.',
    }
  }

  return {
    title: service.title,
    description: service.excerpt,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = (await getServiceBySlug(slug)) as ServiceDoc | null

  if (!service) {
    notFound()
  }

  const tags = Array.isArray(service.tags)
    ? service.tags.filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    : []

  return (
    <Container className="mt-9">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/#szolgaltatasok"
            aria-label="Vissza a szolgáltatásokhoz"
            className="group text-primary ring-primary hover:bg-primary mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full p-2 shadow-md ring-1 shadow-zinc-800/5 transition duration-300 ease-in-out hover:rotate-9 hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Link>

          <article>
            <header className="flex flex-col">
              {tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}

              <Lead as="h1">{service.title}</Lead>
            </header>

            <div className="mt-6">
              {service.body ? (
                <Prose value={service.body} />
              ) : service.excerpt ? (
                <Paragraph className="text-base text-zinc-600">{service.excerpt}</Paragraph>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
