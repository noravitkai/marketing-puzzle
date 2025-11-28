'use client'

import * as React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'

type CtaAction = {
  label: string
  href: string
}

type CtaImage = {
  src: string
  alt: string
}

export type CtaProps = {
  heading: string
  body: React.ReactNode
  primaryAction: CtaAction
  secondaryAction?: CtaAction
  images: [CtaImage, CtaImage]
  imagePosition?: 'images-right' | 'images-left'
  className?: string
}

export function Cta({
  heading,
  body,
  primaryAction,
  secondaryAction,
  images,
  imagePosition = 'images-right',
  className,
}: CtaProps) {
  const [firstImage, secondImage] = images
  const imagesLeft = imagePosition === 'images-left'

  return (
    <div className={clsx('mt-8 grid grid-cols-1 gap-4 md:grid-cols-2', className)}>
      <div
        className={clsx(
          'rounded-md bg-white/90 p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm md:p-8 lg:p-10',
          imagesLeft ? 'md:order-2' : 'md:order-1',
        )}
      >
        <div className="mx-auto max-w-xl text-left">
          <h3 className="font-bold text-zinc-800 sm:text-lg md:text-xl lg:text-3xl">{heading}</h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
            {body}
          </div>
          <div className="mt-4 flex flex-row justify-center gap-4 md:mt-8 md:flex-col md:items-stretch lg:flex-row lg:items-center lg:justify-start">
            <div className="md:w-full lg:w-auto">
              <Button href={primaryAction.href} variant="primary" className="md:w-full lg:w-auto">
                {primaryAction.label}
              </Button>
            </div>
            {secondaryAction && (
              <div className="md:w-full lg:w-auto">
                <Button
                  href={secondaryAction.href}
                  variant="secondary"
                  className="md:w-full lg:w-auto"
                >
                  {secondaryAction.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2',
          imagesLeft ? 'md:order-1' : 'md:order-2',
        )}
      >
        <div className="relative h-40 w-full sm:h-56 md:h-full">
          <Image
            alt={firstImage.alt}
            src={firstImage.src}
            fill
            className="rounded-md object-cover shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm"
          />
        </div>
        <div className="relative h-40 w-full sm:h-56 md:h-full">
          <Image
            alt={secondImage.alt}
            src={secondImage.src}
            fill
            className="rounded-md object-cover shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  )
}
