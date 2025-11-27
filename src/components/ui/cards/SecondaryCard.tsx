import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { CardContainer, CardTitle, CardDescription } from './CardPrimitives'

export type SecondaryCardProps = {
  title: string
  description: string
  image: string
  href: string
  className?: string
  showArrow?: boolean
}

export function SecondaryCard({
  title,
  description,
  image,
  href,
  className,
  showArrow = true,
}: SecondaryCardProps) {
  return (
    <CardContainer
      as={Link}
      href={href}
      aria-label={title}
      className={clsx('group relative overflow-hidden', className)}
    >
      <div className="mb-2 flex max-w-full items-center pr-2">
        <CardTitle
          className="min-w-0 flex-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
          title={title}
        >
          {title}
        </CardTitle>
        {showArrow && (
          <ArrowRightCircleIcon
            aria-hidden="true"
            className="ml-1 h-5 w-5 shrink-0 opacity-0 transition-all duration-150 ease-out group-hover:translate-x-1 group-hover:opacity-100"
          />
        )}
      </div>
      <CardDescription className="line-clamp-3 text-pretty">{description}</CardDescription>
      <div className="pointer-events-none absolute top-36 -right-6 left-10">
        <div className="relative aspect-video w-full rotate-[-5deg] overflow-hidden rounded-md shadow-lg ring-1 ring-zinc-900/5 transition-transform duration-150 ease-in-out group-hover:-translate-x-0.5 group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:shadow-xl">
          <img
            src={image}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </CardContainer>
  )
}
