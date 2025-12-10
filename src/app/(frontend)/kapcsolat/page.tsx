import React from 'react'
import ContactInfo from '@/components/contact/Info'
import { FormSection } from '@/components/sections/Form'
import { ContactForm, type ContactFormProps } from '@/components/ui/ContactForm'
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

type InfoBlockFromPayload = {
  id: string
  blockType: 'contactInfo'
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
  heading: string
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
  layout?: (InfoBlockFromPayload | FormBlockFromPayload)[]
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

  return (
    <>
      {page.layout.map((block) => {
        switch (block.blockType) {
          case 'contactInfo': {
            const infoBlock = block as InfoBlockFromPayload

            const statsEnabled = infoBlock.showStats === true
            const stats = statsEnabled ? (infoBlock.stats ?? []) : []

            return (
              <ContactInfo
                key={infoBlock.id}
                heading={infoBlock.heading ?? undefined}
                lead={infoBlock.lead ?? undefined}
                description={infoBlock.description ?? undefined}
                imageUrl={infoBlock.image.url ?? undefined}
                imageAlt={infoBlock.image.alt ?? undefined}
                phoneTitle={infoBlock.phoneTitle}
                phoneNumber={infoBlock.phoneNumber}
                emailTitle={infoBlock.emailTitle}
                emailAddress={infoBlock.emailAddress}
                addressTitle={infoBlock.addressTitle}
                addressText={infoBlock.addressText}
                mapsUrl={infoBlock.mapsUrl ?? undefined}
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
              ...rawFormProps
            } = formBlock

            const formProps: ContactFormProps = {
              ...rawFormProps,
              serviceOptions: serviceOptions ?? [],
              toggleFileUrl: toggleFile?.url ?? undefined,
            }

            return (
              <FormSection
                key={id}
                id="kapcsolat-form"
                heading={heading}
                lead={lead ?? undefined}
                description={description ?? undefined}
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
    </>
  )
}
