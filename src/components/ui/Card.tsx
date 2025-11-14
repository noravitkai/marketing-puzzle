import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        'flex h-full flex-col items-start rounded-md bg-white/90 p-6 shadow-sm ring-1 ring-zinc-900/5 backdrop-blur-sm transition hover:shadow-md sm:hover:scale-105',
        className,
      )}
    >
      {children}
    </Component>
  )
}

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>
}

Card.Title = function CardTitle<T extends React.ElementType = 'h3'>({
  as,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, 'as'> & {
  as?: T
}) {
  const Component = as ?? 'h3'

  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800">
      {children}
    </Component>
  )
}

Card.Description = function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-zinc-600">{children}</p>
}

type CardCtaProps = React.ComponentPropsWithoutRef<typeof Link> & {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  className?: string
}

Card.Cta = function CardCta({
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
        'clickable-parent text-primary mt-3 inline-flex items-center gap-2 text-sm font-medium',
        className,
      )}
    >
      {leadingIcon ? <span className="inline-flex">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="inline-flex">{trailingIcon}</span> : null}
    </Link>
  )
}
