import clsx from 'clsx'
import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1 sm:text-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
