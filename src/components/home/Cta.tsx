import { Container } from '@/components/ui/Container'
import { Cta as CtaCard } from '@/components/ui/Cta'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { RichText } from '@payloadcms/richtext-lexical/react'

type CtaBlockProps = {
  block: {
    id: string
    blockType: 'cta'
    showHeader?: boolean | null
    heading?: string | null
    lead?: string | null
    description?: string | null
    cta: {
      heading: string
      body?: any | null
      primaryAction?: {
        label?: string | null
        href?: string | null
      } | null
      secondaryAction?: {
        label?: string | null
        href?: string | null
      } | null
      images: {
        image?: {
          url?: string | null
          alt?: string | null
        } | null
      }[]
    }
  }
}

export default function CtaSection({ block }: CtaBlockProps) {
  const { showHeader, heading, lead, description, cta } = block

  const primaryAction = {
    label: cta.primaryAction?.label || 'Tovább',
    href: cta.primaryAction?.href || '#',
  }

  const secondaryAction =
    cta.secondaryAction?.label && cta.secondaryAction.href
      ? {
          label: cta.secondaryAction.label,
          href: cta.secondaryAction.href,
        }
      : undefined

  const images = (cta.images || [])
    .map((item) => {
      const file = item.image
      const src = file?.url
      if (!src) return null

      return {
        src,
        alt: file?.alt || '',
      }
    })
    .filter((img): img is { src: string; alt: string } => img !== null)
    .slice(0, 2)

  if (images.length < 2) {
    return null
  }

  return (
    <section id="referenciaink">
      <Container className="mt-16 sm:mt-20">
        {showHeader && (heading || lead || description) && (
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            {heading && <Heading as="h2">{heading}</Heading>}
            {lead && <Lead as="p">{lead}</Lead>}
            {description && <Paragraph className="max-w-2xl">{description}</Paragraph>}
          </div>
        )}

        <CtaCard
          className="w-full"
          heading={cta.heading}
          body={
            cta.body ? (
              <div className="text-sm leading-relaxed text-zinc-600 sm:text-base [&_p+p]:mt-4">
                <RichText data={cta.body} />
              </div>
            ) : null
          }
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          images={[images[0], images[1]]}
        />
      </Container>
    </section>
  )
}
