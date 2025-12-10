import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { Container } from '@/components/ui/Container'
import { Prose } from '@/components/ui/Prose'
import { Lead, Paragraph } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
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

  const primaryLabel = (service.primaryCtaLabel ?? '').trim()
  const primaryHref = (service.primaryCtaHref ?? '').trim()
  const secondaryLabel = (service.secondaryCtaLabel ?? '').trim()
  const secondaryHref = (service.secondaryCtaHref ?? '').trim()

  const hasPrimaryCta = Boolean(primaryLabel && primaryHref)
  const hasSecondaryCta = Boolean(secondaryLabel && secondaryHref)
  const showAnyCta = hasPrimaryCta || hasSecondaryCta

  return (
    <Container className="mt-9">
      <div className="mx-auto max-w-2xl">
        <article>
          <div className="flex flex-col gap-6">
            <Link
              href="/#szolgaltatasok"
              aria-label="Vissza a szolgáltatásokhoz"
              className="group text-primary ring-primary hover:bg-primary inline-flex h-10 w-10 items-center justify-center rounded-full p-2 shadow-md ring-1 shadow-zinc-800/5 transition duration-300 ease-in-out hover:rotate-9 hover:text-white"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <header className="flex flex-col">
              <Lead as="h1">{service.title}</Lead>
            </header>
            <div>
              {service.body ? (
                <Prose value={service.body} />
              ) : service.excerpt ? (
                <Paragraph className="text-base text-zinc-600">{service.excerpt}</Paragraph>
              ) : null}
            </div>
            {showAnyCta && (
              <div className="flex flex-wrap gap-4">
                {hasPrimaryCta && (
                  <Button href={primaryHref} variant="primary">
                    {primaryLabel}
                  </Button>
                )}
                {hasSecondaryCta && (
                  <Button href={secondaryHref} variant="secondary">
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        </article>
      </div>
    </Container>
  )
}
