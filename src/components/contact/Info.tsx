import Image from 'next/image'
import { DevicePhoneMobileIcon, AtSymbolIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { CardContainer, CardTitle, CardDescription } from '@/components/ui/cards/CardPrimitives'

type StatItem = {
  id: string
  value: string
  label: string
}

type ContactInfoProps = {
  heading?: string
  lead?: string
  description?: string
  imageUrl: string
  imageAlt?: string
  phoneTitle?: string
  phoneNumber?: string
  emailTitle?: string
  emailAddress?: string
  addressTitle?: string
  addressText?: string
  mapsUrl?: string
  showStats?: boolean
  stats?: StatItem[]
}

export default function ContactInfo({
  heading,
  lead,
  description,
  imageUrl,
  imageAlt,
  phoneTitle,
  phoneNumber,
  emailTitle,
  emailAddress,
  addressTitle,
  addressText,
  mapsUrl,
  showStats,
  stats,
}: ContactInfoProps) {
  const items = [
    {
      id: 'phone',
      Icon: DevicePhoneMobileIcon,
      title: phoneTitle,
      content: phoneNumber,
      href: phoneNumber ? `tel:${phoneNumber.replace(/\s+/g, '')}` : undefined,
    },
    {
      id: 'email',
      Icon: AtSymbolIcon,
      title: emailTitle,
      content: emailAddress,
      href: emailAddress ? `mailto:${emailAddress}` : undefined,
    },
    {
      id: 'address',
      Icon: MapPinIcon,
      title: addressTitle,
      content: addressText,
      href: mapsUrl || undefined,
    },
  ]

  const hasStats = showStats && stats && stats.length > 0

  return (
    <section id="elerhetosegek">
      <Container className="mt-9">
        <div className="flex flex-col items-center gap-4 text-center">
          {heading && <Heading>{heading}</Heading>}
          {lead && <Lead>{lead}</Lead>}
          {description && <Paragraph className="max-w-2xl">{description}</Paragraph>}
        </div>
        <div className="mt-8 grid gap-4 xl:grid-cols-2 xl:items-stretch">
          <CardContainer className="relative aspect-3/1 w-full overflow-hidden p-0">
            <Image
              src={imageUrl}
              alt={imageAlt || 'Marketing Puzzle kreatív marketingügynökség'}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </CardContainer>
          <div className="grid h-full gap-4 md:grid-cols-2">
            {items.map((item, index) => {
              const isLast = index === items.length - 1
              if (!item.title && !item.content) return null

              const href = item.href
              const isExternal = href ? href.startsWith('http') : false
              const tiltClassName =
                index % 2 === 0
                  ? 'hover:-rotate-1 sm:hover:scale-103 hover:shadow-md'
                  : 'hover:rotate-1 sm:hover:scale-103 hover:shadow-md'

              const className = [
                'transition-transform',
                tiltClassName,
                href ? 'cursor-pointer' : '',
                isLast ? 'md:col-span-2' : '',
              ]
                .filter(Boolean)
                .join(' ')

              const Icon = item.Icon

              return (
                <CardContainer
                  key={item.id}
                  as={href ? 'a' : 'div'}
                  {...(href
                    ? {
                        href,
                        target: isExternal ? '_blank' : undefined,
                        rel: isExternal ? 'noopener noreferrer' : undefined,
                      }
                    : {})}
                  className={className}
                >
                  <div className="flex flex-col gap-1">
                    <Icon className="text-primary h-5 w-5" />
                    {item.title && <CardTitle>{item.title}</CardTitle>}
                    {item.content && (
                      <CardDescription className="whitespace-pre-line">
                        {item.content}
                      </CardDescription>
                    )}
                  </div>
                </CardContainer>
              )
            })}
          </div>
        </div>
        {hasStats && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats!.map((stat) => (
                <div key={stat.id} className="border-l border-zinc-900/5 pl-4">
                  <div className="text-2xl leading-none font-semibold tracking-tighter text-zinc-800 sm:text-3xl">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-sm whitespace-pre-line text-zinc-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
