import React from 'react'
import ContactInfo from '@/components/contact/Info'
import ContactSection from '@/components/home/Contact'
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
  lastNameLabel: string
  lastNameHint?: string | null
  lastNamePlaceholder?: string | null
  firstNameLabel: string
  firstNameHint?: string | null
  firstNamePlaceholder?: string | null
  emailLabel: string
  emailHint?: string | null
  emailPlaceholder?: string | null
  phoneLabel: string
  phoneHint?: string | null
  phonePlaceholder?: string | null
  companyLabel: string
  companyHint?: string | null
  companyPlaceholder?: string | null
  websiteLabel: string
  websiteHint?: string | null
  websitePlaceholder?: string | null
  serviceLabel: string
  serviceHint?: string | null
  servicePlaceholder?: string | null
  serviceOptions?: FormServiceOptionFromPayload[]
  messageLabel: string
  messageHint?: string | null
  messagePlaceholder?: string | null
  toggleLabel: string
  toggleDescription?: string | null
  toggleFile?: Media | null
  submitLabel: string
  endpoint: string
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

            return (
              <ContactSection
                key={formBlock.id}
                heading={formBlock.heading}
                lead={formBlock.lead ?? undefined}
                description={formBlock.description ?? undefined}
                imageUrl={formBlock.image?.url ?? undefined}
                imageAlt={formBlock.image?.alt ?? undefined}
                lastNameLabel={formBlock.lastNameLabel}
                lastNameHint={formBlock.lastNameHint ?? undefined}
                lastNamePlaceholder={formBlock.lastNamePlaceholder ?? undefined}
                firstNameLabel={formBlock.firstNameLabel}
                firstNameHint={formBlock.firstNameHint ?? undefined}
                firstNamePlaceholder={formBlock.firstNamePlaceholder ?? undefined}
                emailLabel={formBlock.emailLabel}
                emailHint={formBlock.emailHint ?? undefined}
                emailPlaceholder={formBlock.emailPlaceholder ?? undefined}
                phoneLabel={formBlock.phoneLabel}
                phoneHint={formBlock.phoneHint ?? undefined}
                phonePlaceholder={formBlock.phonePlaceholder ?? undefined}
                companyLabel={formBlock.companyLabel}
                companyHint={formBlock.companyHint ?? undefined}
                companyPlaceholder={formBlock.companyPlaceholder ?? undefined}
                websiteLabel={formBlock.websiteLabel}
                websiteHint={formBlock.websiteHint ?? undefined}
                websitePlaceholder={formBlock.websitePlaceholder ?? undefined}
                serviceLabel={formBlock.serviceLabel}
                serviceHint={formBlock.serviceHint ?? undefined}
                servicePlaceholder={formBlock.servicePlaceholder ?? undefined}
                serviceOptions={formBlock.serviceOptions ?? []}
                messageLabel={formBlock.messageLabel}
                messageHint={formBlock.messageHint ?? undefined}
                messagePlaceholder={formBlock.messagePlaceholder ?? undefined}
                toggleLabel={formBlock.toggleLabel}
                toggleDescription={formBlock.toggleDescription ?? undefined}
                toggleFileUrl={formBlock.toggleFile?.url ?? undefined}
                submitLabel={formBlock.submitLabel}
                endpoint={formBlock.endpoint}
              />
            )
          }

          default:
            return null
        }
      })}
    </>
  )
}
