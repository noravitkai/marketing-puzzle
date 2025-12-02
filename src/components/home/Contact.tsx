import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { ContactForm } from '@/components/ui/ContactForm'

type HomeFormSectionProps = {
  heading: string
  lead?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
} & Omit<React.ComponentProps<typeof ContactForm>, 'className'>

export default function ContactSection({
  heading,
  lead,
  description,
  imageUrl,
  imageAlt,
  ...formProps
}: HomeFormSectionProps) {
  const hasImage = Boolean(imageUrl)

  return (
    <section id="ajanlatkeres">
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
            <div className="flex justify-center">
              <ContactForm
                {...formProps}
                className="-mt-20 w-[90%] rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-28 sm:w-[80%] lg:-mt-44"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <ContactForm {...formProps} className="w-full max-w-3xl" />
          </div>
        )}
      </Container>
    </section>
  )
}
