import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

export type CardContainerProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<T>

export function CardContainer<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...restProps
}: CardContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        'group relative flex flex-col items-start rounded-md bg-white/90 p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm transition',
        'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none',
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export type CardTitleProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

export function CardTitle({ children, className, ...rest }: CardTitleProps) {
  return (
    <h3
      className={clsx('text-base font-semibold tracking-tight text-zinc-800', className)}
      {...rest}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={clsx('text-sm text-zinc-600', className)}>{children}</p>
}

export type CardCtaProps = React.ComponentPropsWithoutRef<typeof Link> & {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  className?: string
}

export function CardCta({
  children,
  leadingIcon,
  trailingIcon,
  className,
  ...linkProps
}: CardCtaProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'text-primary mt-3 inline-flex items-center gap-2 text-sm font-medium',
        className,
      )}
    >
      {leadingIcon && <span className="inline-flex">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && <span className="inline-flex">{trailingIcon}</span>}
    </Link>
  )
}
