import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  CardContainer,
  CardTitle,
  CardDescription,
  type CardContainerProps,
  type CardTitleProps,
} from './CardPrimitives'

type PrimaryCardRootProps = CardContainerProps<typeof Link>

function PrimaryCardRoot(props: PrimaryCardRootProps) {
  const { className, as: _as, ...rest } = props
  const finalClassName = clsx('sm:hover:scale-105 hover:shadow-md', className)

  return <CardContainer as={Link} {...rest} className={finalClassName} />
}

function PrimaryCardBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>
}

function PrimaryCardIcon({ src, alt }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt ?? ''}
      className="h-12 w-12 object-contain"
      loading="lazy"
      aria-hidden={!alt}
    />
  )
}

function PrimaryCardTitle({ children, className, ...rest }: CardTitleProps) {
  return (
    <CardTitle className={clsx('mt-3', className)} {...rest}>
      {children}
    </CardTitle>
  )
}

function PrimaryCardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <CardDescription className={clsx('mt-3', className)}>{children}</CardDescription>
}

type PrimaryCardCtaProps = {
  children: React.ReactNode
  className?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

function PrimaryCardCta({ className, children, leadingIcon, trailingIcon }: PrimaryCardCtaProps) {
  return (
    <div
      className={clsx(
        'text-primary mt-3 inline-flex items-center gap-2 text-sm font-medium',
        className,
      )}
    >
      {leadingIcon && <span className="inline-flex">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className="inline-flex">{trailingIcon}</span>}
    </div>
  )
}

export const PrimaryCard = Object.assign(PrimaryCardRoot, {
  Body: PrimaryCardBody,
  Icon: PrimaryCardIcon,
  Title: PrimaryCardTitle,
  Description: PrimaryCardDescription,
  Cta: PrimaryCardCta,
})
