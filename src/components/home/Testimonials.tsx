'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Container } from '@/components/ui/Container'
import { Heading, Paragraph, Lead } from '@/components/ui/Text'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import 'swiper/css'

export type Testimonial = {
  id: string
  quote: string
  author: string
  company?: string | null
}

type TestimonialsProps = {
  heading: string
  lead?: string
  description?: string
  items: Testimonial[]
}

function QuoteMark() {
  return (
    <span className="pointer-events-none absolute top-0 left-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 320"
        className="text-primary h-16 w-20 opacity-10"
        aria-hidden="true"
      >
        <path
          d="M82.87 129.48S77.32 98.96 114.31 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.59 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61zm154.26 0S231.58 98.96 268.57 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.58 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const CIRCLE_RADIUS = 16
const CIRCLE_LENGTH = 2 * Math.PI * CIRCLE_RADIUS

export default function Testimonials({ heading, lead, description, items }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [cardHeight, setCardHeight] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    function updateHeight() {
      if (!sectionRef.current) return
      const cards = sectionRef.current.querySelectorAll<HTMLElement>(
        'blockquote[data-testimonial="true"]',
      )
      if (!cards.length) return

      let max = 0

      cards.forEach((card) => {
        card.style.minHeight = 'auto'
      })

      cards.forEach((card) => {
        const h = card.offsetHeight
        if (h > max) max = h
      })

      if (max > 0) {
        setCardHeight(max)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [items.length])

  if (!items.length) {
    return null
  }

  const progress = items.length === 0 ? 0 : (activeIndex + 1) / items.length
  const strokeOffset = CIRCLE_LENGTH * (1 - progress)

  return (
    <section id="testimonials-section" ref={sectionRef as React.RefObject<HTMLElement>}>
      <Container className="mt-16 sm:mt-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading as="h2">{heading}</Heading>
            {lead ? <Lead as="p">{lead}</Lead> : null}
            {description ? <Paragraph className="max-w-2xl">{description}</Paragraph> : null}
          </div>
        </div>

        <div className="mt-8">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={items.length > 1}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={32}
            autoplay={{ delay: 8000 }}
            navigation={{
              nextEl: '.next-button',
              prevEl: '.prev-button',
            }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
            }}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="swiper-container"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <blockquote
                  data-testimonial="true"
                  style={cardHeight ? { minHeight: cardHeight } : undefined}
                  className="relative m-0.5 flex h-full flex-col rounded-md bg-white/90 p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm"
                >
                  <QuoteMark />
                  <div className="relative z-10 flex-1">
                    <p className="text-sm text-zinc-800">{item.quote}</p>
                  </div>
                  <p className="relative z-10 mt-3 text-sm text-zinc-600">
                    – {item.author}
                    {item.company ? `, ${item.company}` : ''}
                  </p>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
                <circle
                  cx="20"
                  cy="20"
                  r={CIRCLE_RADIUS}
                  className="text-zinc-100"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={CIRCLE_LENGTH}
                  strokeDashoffset={0}
                />
                <circle
                  cx="20"
                  cy="20"
                  r={CIRCLE_RADIUS}
                  className="text-secondary transition-all duration-500 ease-out"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={CIRCLE_LENGTH}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className={clsx('flex items-center gap-3', items.length === 2 ? 'lg:hidden' : '')}>
            <button
              type="button"
              className="prev-button text-primary hover:bg-primary ring-primary rounded-full p-2 shadow-md ring-1 shadow-zinc-800/5 transition duration-300 ease-in-out hover:rotate-9 hover:text-white"
              aria-label="Előző vélemény"
            >
              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="next-button text-primary hover:bg-primary ring-primary rounded-full p-2 shadow-md ring-1 shadow-zinc-800/5 transition duration-300 ease-in-out hover:-rotate-9 hover:text-white"
              aria-label="Következő vélemény"
            >
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
