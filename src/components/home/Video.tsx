import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Heading, Lead, Paragraph } from '@/components/ui/Text'
import leftIllustration from '@/images/illustrations/lightbulb.svg'
import rightIllustration from '@/images/illustrations/puzzle-pieces.svg'

type VideoProps = {
  heading: string
  lead?: string
  description?: string
  youtubeId: string
  privacyEnhanced?: boolean
}

export default function Video({
  heading,
  lead,
  description,
  youtubeId,
  privacyEnhanced = false,
}: VideoProps) {
  const domain = privacyEnhanced ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'
  const src = `${domain}/embed/${youtubeId}?playlist=${youtubeId}&loop=1&autoplay=1&mute=1&playsinline=1&controls=1&fs=1&rel=0&modestbranding=1&iv_load_policy=3`

  return (
    <section id="video-section">
      <Container className="mt-16 sm:mt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading as="h2">{heading}</Heading>

          {lead && (
            <Lead as="p" id="home-video-title">
              {lead}
            </Lead>
          )}

          {description && <Paragraph className="max-w-2xl">{description}</Paragraph>}
        </div>
        <div className="mt-8 w-full">
          <div className="flex items-center justify-between gap-2 lg:gap-4">
            <div className="relative -mr-16 hidden shrink-0 lg:block">
              <Image
                src={leftIllustration}
                alt="Egyszerű villanykörte illusztráció sugárzó fényvonalakkal"
                aria-hidden="true"
                className="h-36 w-auto origin-center -rotate-7"
              />
            </div>
            <div className="relative z-10 flex-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-md shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm">
                <iframe
                  src={src}
                  title="Összefoglaló videó"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
            <div className="relative -ml-16 hidden shrink-0 lg:block">
              <Image
                src={rightIllustration}
                alt="Összekapcsolódó puzzle darabok illusztráció"
                aria-hidden="true"
                className="h-36 w-auto origin-center rotate-7"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
