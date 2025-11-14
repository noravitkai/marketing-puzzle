import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export type ServiceCard = {
  id: string
  title: string
  description: string
  href?: string
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
  if (!services.length) {
    return null
  }

  return (
    <section id="services">
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2">{heading}</Heading>
          {lead ? <Lead as="p">{lead}</Lead> : null}
          {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const tiltClass = index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'
            return (
              <Card key={service.id} as="article" className={clsx(tiltClass)}>
                <Card.Body>
                  {service.iconUrl && <Card.Icon src={service.iconUrl} alt={service.iconAlt} />}
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Description>{service.description}</Card.Description>
                </Card.Body>
                <Card.Cta
                  href={service.href ?? '#'}
                  trailingIcon={<ArrowRightCircleIcon className="h-5 w-5" />}
                >
                  {ctaLabel}
                </Card.Cta>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
