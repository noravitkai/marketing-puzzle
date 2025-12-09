import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { ContainerInner, ContainerOuter } from '@/components/ui/Container'

const NAV_GLOW_CLASSES = 'rounded-full bg-primary/30 blur-md transition duration-500 ease-in-out'

function glowStateClasses() {
  return 'scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
}

const NAV_ITEMS = [
  { href: '/', label: 'Főoldal' },
  { href: '/szolgaltatasok', label: 'Szolgáltatások' },
  { href: '/projektek', label: 'Projektek' },
  { href: '/blog', label: 'Blog' },
  { href: '/karrier', label: 'Karrier' },
  { href: '/adatkezeles', label: 'Adatkezelés' },
  { href: '/impresszum', label: 'Impresszum' },
  { href: '/sutik', label: 'Sütik' },
]

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={clsx(
        'group hover:text-primary relative inline-flex items-center px-3 py-1 text-sm text-zinc-700 transition',
      )}
    >
      <span className="relative inline-flex items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className={clsx('block h-full w-full', NAV_GLOW_CLASSES, glowStateClasses())} />
        </span>
        <span className="relative z-10">{children}</span>
      </span>
    </Link>
  )
}

function SocialLink({
  href,
  label,
  children,
  tiltClassName,
}: {
  href: string
  label: string
  children: React.ReactNode
  tiltClassName?: string
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'hover:text-primary inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 shadow-sm transition hover:scale-105 hover:shadow-md',
        tiltClassName,
      )}
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    {
      href: 'https://www.facebook.com/marketingpuzzlecreatives',
      label: 'Facebook',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
          />
        </svg>
      ),
    },
    {
      href: 'https://instagram.com',
      label: 'Instagram',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
          />
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/company/marketing-puzzle/posts/?feedView=all',
      label: 'LinkedIn',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
          />
          <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
        </svg>
      ),
    },
    {
      href: 'https://www.youtube.com/channel/UCBqnlAw2GH_Vz_46aHpdx7g',
      label: 'YouTube',
      icon: (
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
          />
        </svg>
      ),
    },
  ]

  return (
    <footer className="mt-16 flex-none sm:mt-20">
      <ContainerOuter>
        <div className="border-t border-zinc-100">
          <ContainerInner>
            <div className="flex flex-col gap-6 pt-16 pb-8 sm:pt-20 sm:pb-10">
              <div className="flex justify-center">
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src="/marketing-puzzle-logo-szines-fekvo.svg"
                    alt="Marketing Puzzle"
                    width={170}
                    height={40}
                    className="h-9 w-auto"
                    priority
                  />
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center gap-3 text-sm md:gap-5 lg:gap-7">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center gap-3 md:gap-5">
                {socials.map((social, index) => {
                  const tiltClassName = index % 2 === 0 ? 'hover:rotate-5' : 'hover:-rotate-5'
                  return (
                    <SocialLink
                      key={social.label}
                      href={social.href}
                      label={social.label}
                      tiltClassName={tiltClassName}
                    >
                      {social.icon}
                    </SocialLink>
                  )
                })}
              </div>
              <p className="text-center text-xs text-zinc-400">
                &copy; {year}. Marketing Puzzle. Minden jog fenntartva.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
