import React from 'react'
import clsx from 'clsx'
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardCta,
  type CardContainerProps,
  type CardTitleProps,
  type CardCtaProps,
} from './CardPrimitives'

function PrimaryCardRoot<T extends React.ElementType = 'div'>(props: CardContainerProps<T>) {
  const finalClassName = clsx(props.className, 'sm:hover:scale-105 hover:shadow-md')

  return (
    <>
      <CardContainer {...props} className={finalClassName} />
    </>
  )
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

function PrimaryCardCta({ className, children, ...props }: CardCtaProps) {
  return (
    <CardCta className={className} {...props}>
      {children}
    </CardCta>
  )
}

export const PrimaryCard = Object.assign(PrimaryCardRoot, {
  Body: PrimaryCardBody,
  Icon: PrimaryCardIcon,
  Title: PrimaryCardTitle,
  Description: PrimaryCardDescription,
  Cta: PrimaryCardCta,
})
