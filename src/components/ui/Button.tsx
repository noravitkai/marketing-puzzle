import Link from 'next/link'
import clsx from 'clsx'
import React from 'react'

const variantStyles = {
  primary:
    'bg-primary text-zinc-50 shadow-md font-medium text-sm shadow-zinc-800/5 hover:bg-zinc-800 hover:scale-110 hover:rotate-2',
  secondary:
    'shadow-md text-zinc-800 font-medium text-sm shadow-zinc-800/5 ring-1 ring-zinc-900/10 hover:scale-110 hover:-rotate-2',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  className?: string
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  const content = (
    <>
      {leadingIcon ? (
        <span className="inline-flex items-center justify-center">{leadingIcon}</span>
      ) : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="inline-flex items-center justify-center">{trailingIcon}</span>
      ) : null}
    </>
  )

  return typeof (props as any).href === 'undefined' ? (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  ) : (
    <Link className={classes} {...(props as React.ComponentPropsWithoutRef<typeof Link>)}>
      {content}
    </Link>
  )
}
