import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'

type FormSectionProps = {
  id?: string
  heading?: string
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
  const hasHeader = Boolean(heading || lead || description)

  return (
    <section id={id}>
      <Container className="mt-16 sm:mt-20">
        {hasHeader ? (
          <div className="flex flex-col items-center gap-6 text-center">
            {heading ? <Heading as="h2">{heading}</Heading> : null}
            {lead ? <Lead as="p">{lead}</Lead> : null}
            {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
          </div>
        ) : null}
        {hasImage ? (
          <div className={hasHeader ? 'mt-8' : ''}>
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
          <div className={hasHeader ? 'mt-8 flex justify-center' : 'flex justify-center'}>
            {children}
          </div>
        )}
      </Container>
    </section>
  )
}
