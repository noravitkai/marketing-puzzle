import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { PrimaryCard } from '@/components/ui/cards/PrimaryCard'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export type ServiceCard = {
  id: string
  title: string
  description: string
  href: string
  iconUrl?: string
  iconAlt?: string
}

type ServicesProps = {
  heading: string
  lead?: string
  description?: string
  ctaLabel: string
  services: ServiceCard[]
}

export default function Services({
  heading,
  lead,
  description,
  ctaLabel,
  services,
}: ServicesProps) {
  if (!services.length) return null

  return (
    <section id="szolgaltatasok">
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          {heading && <Heading>{heading}</Heading>}
          {lead && <Lead>{lead}</Lead>}
          {description && <Paragraph className="max-w-3xl">{description}</Paragraph>}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const tiltClassName = index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'
            return (
              <PrimaryCard
                key={service.id}
                href={service.href}
                className={clsx('h-full', tiltClassName)}
              >
                <PrimaryCard.Body>
                  {service.iconUrl && (
                    <PrimaryCard.Icon src={service.iconUrl} alt={service.iconAlt} />
                  )}
                  <PrimaryCard.Title>{service.title}</PrimaryCard.Title>
                  <PrimaryCard.Description>{service.description}</PrimaryCard.Description>
                </PrimaryCard.Body>
                <PrimaryCard.Cta trailingIcon={<ArrowRightCircleIcon className="h-5 w-5" />}>
                  {ctaLabel}
                </PrimaryCard.Cta>
              </PrimaryCard>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
