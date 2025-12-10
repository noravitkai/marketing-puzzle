'use client'

import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

type CtaImage = {
  image?: {
    url?: string | null
    alt?: string | null
  } | null
}

type CtaBlockFromPayload = {
  id: string
  blockType: 'cta'
  showHeader?: boolean | null
  imagePosition?: 'images-right' | 'images-left' | null
  heading?: string | null
  lead?: string | null
  description?: string | null
  cta: {
    heading: string
    body?: SerializedEditorState | null
    primaryAction?: {
      label?: string | null
      href?: string | null
    } | null
    secondaryAction?: {
      label?: string | null
      href?: string | null
    } | null
    images: CtaImage[]
  }
}

type CtaSectionProps = {
  block: CtaBlockFromPayload
  primaryLeadingIcon?: React.ReactNode
  primaryTrailingIcon?: React.ReactNode
  secondaryLeadingIcon?: React.ReactNode
  secondaryTrailingIcon?: React.ReactNode
}

export default function CtaSection({
  block,
  primaryLeadingIcon,
  primaryTrailingIcon,
  secondaryLeadingIcon,
  secondaryTrailingIcon,
}: CtaSectionProps) {
  const { showHeader, heading, lead, description, cta, imagePosition } = block
  const resolvedImagePosition: 'images-right' | 'images-left' = imagePosition ?? 'images-right'

  const primaryAction =
    cta.primaryAction?.label && cta.primaryAction.href
      ? {
          label: cta.primaryAction.label,
          href: cta.primaryAction.href,
        }
      : undefined

  const secondaryAction =
    cta.secondaryAction?.label && cta.secondaryAction.href
      ? {
          label: cta.secondaryAction.label,
          href: cta.secondaryAction.href,
        }
      : undefined

  const images = (cta.images || [])
    .map((item) => {
      const file = item.image
      const src = file?.url
      if (!src) return null

      return {
        src,
        alt: file?.alt || '',
      }
    })
    .filter((img): img is { src: string; alt: string } => img !== null)
    .slice(0, 2)

  if (images.length < 2) {
    return null
  }

  const [firstImage, secondImage] = images
  const imagesLeft = resolvedImagePosition === 'images-left'
  const hasPrimary = !!primaryAction
  const hasSecondary = !!secondaryAction
  const hasAnyAction = hasPrimary || hasSecondary

  return (
    <section>
      <Container className="mt-16 sm:mt-20">
        {showHeader && (heading || lead || description) && (
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            {heading && <Heading as="h2">{heading}</Heading>}
            {lead && <Lead as="p">{lead}</Lead>}
            {description && <Paragraph className="max-w-2xl">{description}</Paragraph>}
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
          <div
            className={clsx(
              'rounded-md bg-white/90 p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm',
              imagesLeft ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            <div className="mx-auto text-left">
              <h3 className="text-base font-semibold tracking-tight text-zinc-800">
                {cta.heading}
              </h3>

              <div className="mt-3 text-sm text-zinc-600">
                {cta.body ? <RichText data={cta.body} className="space-y-3" /> : null}
              </div>
              {hasAnyAction && (
                <div className="mt-6 flex flex-row items-center justify-start gap-4">
                  {hasPrimary && primaryAction && (
                    <Button
                      href={primaryAction.href}
                      variant="primary"
                      leadingIcon={primaryLeadingIcon}
                      trailingIcon={primaryTrailingIcon}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                  {hasSecondary && secondaryAction && (
                    <Button
                      href={secondaryAction.href}
                      variant="secondary"
                      leadingIcon={secondaryLeadingIcon}
                      trailingIcon={secondaryTrailingIcon}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={clsx(
              'grid grid-cols-2 gap-4 sm:gap-8',
              imagesLeft ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <div className="relative h-40 w-full sm:h-56 lg:h-full">
              <Image
                alt={firstImage.alt}
                src={firstImage.src}
                fill
                className="rotate-1 rounded-md object-cover shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm"
              />
            </div>
            <div className="relative h-40 w-full sm:h-56 lg:h-full">
              <Image
                alt={secondImage.alt}
                src={secondImage.src}
                fill
                className="-rotate-1 rounded-md object-cover shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
