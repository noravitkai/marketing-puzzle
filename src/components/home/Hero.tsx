import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Lead, Paragraph } from '@/components/ui/Text'
import { PlayCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'

export type HeroCard = {
  id: string
  badgeText: string
  service?: {
    slug: string
  } | null
  image?: {
    url?: string | null
    alt?: string | null
  } | null
}

export type HeroProps = {
  mainTitle: string
  highlightedTitle?: string
  description: string
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
  cards?: HeroCard[]
}

function resolveCardHref(card: HeroCard): string {
  if (card.service?.slug) {
    return `/szolgaltatasok/${card.service.slug}`
  }
  return '#'
}

function Photos({ cards }: { cards?: HeroCard[] }) {
  if (!cards || cards.length === 0) {
    return null
  }

  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {cards.map((card, index) => {
          const imageUrl = card.image?.url
          if (!imageUrl) return null

          const href = resolveCardHref(card)

          return (
            <Link
              key={card.id}
              href={href}
              className={clsx(
                'group relative aspect-9/10 w-44 flex-none overflow-hidden rounded-md bg-zinc-100 transition hover:scale-105 sm:w-72',
                rotations[index % rotations.length],
              )}
            >
              <Image
                src={imageUrl}
                alt={card.image?.alt ?? ''}
                fill
                sizes="(min-width: 640px) 18rem, 11rem"
                className="rounded-md object-cover"
              />
              <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2">
                <div className="hidden translate-y-1 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 lg:block">
                  <Badge>{card.badgeText}</Badge>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Hero({
  mainTitle,
  highlightedTitle,
  description,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  cards,
}: HeroProps) {
  return (
    <>
      <Container className="mt-9">
        <div className="flex flex-col items-center gap-6 text-center">
          <Lead as="h1">
            {mainTitle}{' '}
            {highlightedTitle ? <span className="text-primary">{highlightedTitle}</span> : null}
          </Lead>
          <Paragraph className="max-w-2xl">{description}</Paragraph>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {primaryCtaLabel && primaryCtaUrl ? (
              <Button
                href={primaryCtaUrl}
                variant="primary"
                trailingIcon={
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
                }
              >
                {primaryCtaLabel}
              </Button>
            ) : null}
            {secondaryCtaLabel && secondaryCtaUrl ? (
              <Button
                href={secondaryCtaUrl}
                variant="secondary"
                trailingIcon={<PlayCircleIcon className="h-5 w-5" aria-hidden="true" />}
              >
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
      <Photos cards={cards} />
    </>
  )
}
