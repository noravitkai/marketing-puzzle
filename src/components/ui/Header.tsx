'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const NAV_ITEMS = [
  { href: '/', label: 'Főoldal' },
  { href: '/szolgaltatasok', label: 'Szolgáltatások' },
  { href: '/projektek', label: 'Projektek' },
  { href: '/kapcsolat', label: 'Kapcsolat' },
  { href: '/blog', label: 'Blog' },
]

const GLOW_BASE_CLASSES =
  'bg-primary/30 hidden h-6 w-14 rounded-full blur-lg transition duration-500 ease-in-out md:block'

const FOCUS_RING_PRIMARY =
  'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none'

const SCROLL_DELTA = 5

function glowStateClasses(active: boolean) {
  return active
    ? 'scale-100 opacity-100'
    : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
}

function useHideOnScroll() {
  const [visible, setVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    lastScrollY.current = window.scrollY
    function onScroll() {
      const current = window.scrollY
      const diff = current - lastScrollY.current
      if (Math.abs(diff) < SCROLL_DELTA) return
      if (current < 64 || diff < 0) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

function MobileNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <li>
      <PopoverButton
        as={Link}
        href={href}
        className={clsx(
          'block rounded-md px-1 py-2 text-left text-base',
          FOCUS_RING_PRIMARY,
          isActive ? 'text-primary font-semibold' : 'text-zinc-800',
        )}
      >
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(props: React.ComponentPropsWithoutRef<typeof Popover>) {
  return (
    <Popover {...props}>
      <PopoverButton
        className={clsx(
          'group flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm outline-none',
          FOCUS_RING_PRIMARY,
        )}
      >
        <Image
          src="/marketing-puzzle-ikon-szines-fekvo.svg"
          alt="Marketing Puzzle logó"
          width={24}
          height={24}
          className="h-5 w-auto"
          priority
        />
        <span>Menü</span>
        <ChevronDownIcon className="h-4 w-4" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 shadow-lg ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton
            aria-label="Bezárás"
            className={clsx('-m-1 rounded-full p-1 ring-offset-0 outline-none', FOCUS_RING_PRIMARY)}
          >
            <XMarkIcon className="h-6 w-6 text-zinc-500" />
          </PopoverButton>
          <h2 className="text-sm font-medium text-zinc-600">Menü</h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.href} href={item.href}>
                {item.label}
              </MobileNavItem>
            ))}
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

function DesktopNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'group relative block rounded-md px-3 py-2 text-sm font-medium transition-colors',
          FOCUS_RING_PRIMARY,
          isActive ? 'text-primary' : 'hover:text-primary',
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className={clsx(GLOW_BASE_CLASSES, glowStateClasses(isActive))} />
        </span>
        <span className="relative z-10">{children}</span>
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm">
        <li>
          <Link
            href="/"
            aria-label="Marketing Puzzle - vissza a főoldalra"
            className={clsx('flex items-center rounded-md px-3 py-2', FOCUS_RING_PRIMARY)}
          >
            <Image
              src="/marketing-puzzle-ikon-szines-fekvo.svg"
              alt="Marketing Puzzle logó"
              width={140}
              height={32}
              className="h-6 w-auto"
              priority
            />
          </Link>
        </li>
        {NAV_ITEMS.filter((item) => item.href !== '/').map((item) => (
          <DesktopNavItem key={item.href} href={item.href}>
            {item.label}
          </DesktopNavItem>
        ))}
      </ul>
    </nav>
  )
}

function LanguageToggle({ className }: { className?: string }) {
  const [lang, setLang] = React.useState<'EN' | 'HU'>('EN')
  const handleClick = () => {
    setLang((prev) => (prev === 'EN' ? 'HU' : 'EN'))
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'group text-primary relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/90 text-xs font-semibold uppercase shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm transition-colors md:h-10 md:w-10',
        'font-secondary',
        FOCUS_RING_PRIMARY,
        className,
      )}
      aria-label={`Nyelv váltása (jelenleg: ${lang})`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className={clsx(GLOW_BASE_CLASSES, glowStateClasses(false))} />
      </span>
      <span className="relative z-10">{lang}</span>
    </button>
  )
}

export function Header() {
  const showHeader = useHideOnScroll()
  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <Container className="py-6">
        <div
          className={clsx(
            'flex items-center justify-center transition-opacity duration-200',
            showHeader ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="flex items-center gap-2 md:hidden">
            <MobileNavigation />
            <LanguageToggle />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <DesktopNavigation />
            <LanguageToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
