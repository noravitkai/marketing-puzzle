import clsx from 'clsx'

type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentPropsWithoutRef<'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Heading({ className, as: Element = 'h2', ...props }: HeadingProps) {
  return (
    <Element
      {...props}
      className={clsx(
        'font-secondary inline-flex w-auto max-w-max items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-widest text-zinc-800 uppercase shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm',
        className,
      )}
    />
  )
}

type LeadProps = {
  as?: 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentPropsWithoutRef<'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Lead({ className, as: Element = 'p', ...props }: LeadProps) {
  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-4xl leading-none font-extrabold tracking-tighter text-zinc-800 sm:text-5xl',
      )}
    />
  )
}

export function Paragraph({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p {...props} className={clsx(className, 'text-base text-zinc-600')} />
}
