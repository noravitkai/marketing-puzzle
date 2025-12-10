import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'

type FormSectionProps = {
  id?: string
  heading: string
  lead?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  children: React.ReactNode
}

export function FormSection({
  id,
  heading,
  lead,
  description,
  imageUrl,
  imageAlt,
  children,
}: FormSectionProps) {
  const hasImage = Boolean(imageUrl)

  return (
    <section id={id}>
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2">{heading}</Heading>
          {lead ? <Lead as="p">{lead}</Lead> : null}
          {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
        </div>
        {hasImage ? (
          <div className="mt-8">
            <div className="relative aspect-3/1 overflow-hidden rounded-md shadow-sm ring-1 ring-zinc-900/5">
              <Image
                src={imageUrl as string}
                alt={imageAlt ?? ''}
                fill
                sizes="(min-width: 1024px) 64rem, 42rem"
                className="object-cover"
              />
            </div>
            <div className="flex justify-center">{children}</div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">{children}</div>
        )}
      </Container>
    </section>
  )
}
