import React from 'react'
import ContactInfo from '@/components/contact/Info'
import { FormSection } from '@/components/sections/Form'
import { ContactForm, type ContactFormProps } from '@/components/ui/ContactForm'
import { Container } from '@/components/ui/Container'
import { Lead, Paragraph } from '@/components/ui/Text'
import { getPayloadClient } from '@/payload/getPayloadClient'

type Media = {
  id: string
  url: string | null
  alt?: string | null
}

type StatItemFromPayload = {
  id: string
  value: string
  label: string
}

type ContactBlockFromPayload = {
  id: string
  blockType: 'contactInfo'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  image: Media
  phoneTitle: string
  phoneNumber: string
  emailTitle: string
  emailAddress: string
  addressTitle: string
  addressText: string
  mapsUrl?: string | null
  showStats?: boolean | null
  stats?: StatItemFromPayload[] | null
}

type FormServiceOptionFromPayload = {
  value: string
  label: string
}

type FormBlockFromPayload = {
  id: string
  blockType: 'form'
  showHeader?: boolean | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  image?: Media | null
} & Omit<ContactFormProps, 'className' | 'serviceOptions' | 'toggleFileUrl'> & {
    serviceOptions?: FormServiceOptionFromPayload[] | null
    toggleFile?: Media | null
  }

type PageDoc = {
  id: string
  title: string
  slug: string
  mainTitle?: string | null
  highlightedTitle?: string | null
  headerDescription?: string | null
  layout?: (ContactBlockFromPayload | FormBlockFromPayload)[]
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'kapcsolat' },
    },
    depth: 2,
    limit: 1,
  })

  const page = docs[0] as PageDoc | undefined

  if (!page || !page.layout || !page.layout.length) {
    return null
  }

  const mainTitle = page.mainTitle || page.title
  const highlightedTitle = page.highlightedTitle ?? undefined
  const description = page.headerDescription ?? undefined

  return (
    <>
      <section id="kapcsolat">
        <Container className="mt-9">
          <header className="flex flex-col items-center gap-6 text-center">
            <Lead as="h1">
              {mainTitle}{' '}
              {highlightedTitle ? <span className="text-primary">{highlightedTitle}</span> : null}
            </Lead>
            {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
          </header>
        </Container>

        {page.layout.map((block) => {
          switch (block.blockType) {
            case 'contactInfo': {
              const contactBlock = block as ContactBlockFromPayload

              if (!contactBlock.image?.url) {
                return null
              }

              const statsEnabled = contactBlock.showStats === true
              const stats = statsEnabled ? (contactBlock.stats ?? []) : []
              const showHeader = contactBlock.showHeader !== false // default: show

              return (
                <ContactInfo
                  key={contactBlock.id}
                  heading={showHeader ? (contactBlock.heading ?? undefined) : undefined}
                  lead={showHeader ? (contactBlock.lead ?? undefined) : undefined}
                  description={showHeader ? (contactBlock.description ?? undefined) : undefined}
                  imageUrl={contactBlock.image.url}
                  imageAlt={contactBlock.image.alt ?? undefined}
                  phoneTitle={contactBlock.phoneTitle}
                  phoneNumber={contactBlock.phoneNumber}
                  emailTitle={contactBlock.emailTitle}
                  emailAddress={contactBlock.emailAddress}
                  addressTitle={contactBlock.addressTitle}
                  addressText={contactBlock.addressText}
                  mapsUrl={contactBlock.mapsUrl ?? undefined}
                  showStats={statsEnabled}
                  stats={stats.map((item) => ({
                    id: item.id,
                    value: item.value,
                    label: item.label,
                  }))}
                />
              )
            }

            case 'form': {
              const formBlock = block as FormBlockFromPayload

              const {
                id,
                heading,
                lead,
                description,
                image,
                serviceOptions,
                toggleFile,
                showHeader,
                ...rawFormProps
              } = formBlock

              const formProps: ContactFormProps = {
                ...rawFormProps,
                serviceOptions: serviceOptions ?? [],
                toggleFileUrl: toggleFile?.url ?? undefined,
              }

              const shouldShowHeader = showHeader !== false

              return (
                <FormSection
                  key={id}
                  id="ajanlatkeres"
                  heading={shouldShowHeader ? (heading ?? undefined) : undefined}
                  lead={shouldShowHeader ? (lead ?? undefined) : undefined}
                  description={shouldShowHeader ? (description ?? undefined) : undefined}
                  imageUrl={image?.url ?? undefined}
                  imageAlt={image?.alt ?? undefined}
                >
                  <ContactForm
                    {...formProps}
                    className="-mt-20 w-[90%] rounded-md bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm sm:-mt-28 sm:w-[80%] lg:-mt-44"
                  />
                </FormSection>
              )
            }

            default:
              return null
          }
        })}
      </section>
    </>
  )
}
