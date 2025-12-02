import { Container } from '@/components/ui/Container'
import { Cta as CtaCard } from '@/components/ui/Cta'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

type CtaBlockProps = {
  block: {
    id: string
    blockType: 'cta'
    showHeader?: boolean | null
    imagePosition?: 'images-right' | 'images-left' | null
    heading?: string | null
    lead?: string | null
    description?: string | null
    cta: {
      heading: string
      body?: SerializedEditorState | null
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
  const { showHeader, heading, lead, description, cta, imagePosition } = block
  const resolvedImagePosition: 'images-right' | 'images-left' = imagePosition ?? 'images-right'

  const primaryAction =
    cta.primaryAction?.label && cta.primaryAction.href
      ? {
          label: cta.primaryAction.label,
          href: cta.primaryAction.href,
        }
      : undefined

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
    <section>
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
          imagePosition={resolvedImagePosition}
        />
      </Container>
    </section>
  )
}
