'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { Container } from '@/components/ui/Container'

const NAV_ITEMS = [
  { href: '/szolgaltatasok', label: 'Szolgáltatások' },
  { href: '/projektek', label: 'Projektek' },
  { href: '/rolunk', label: 'Rólunk' },
  { href: '/blog', label: 'Blog' },
]

const SCROLL_DELTA = 5

const GLOW_BASE_CLASSES =
  'bg-primary/30 hidden h-6 w-14 rounded-full blur-lg transition duration-500 ease-in-out md:block'

function glowStateClasses(active: boolean) {
  return active
    ? 'scale-100 opacity-100'
    : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
}

function useBodyScrollLock(locked: boolean) {
  React.useEffect(() => {
    if (!locked || typeof document === 'undefined') return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [locked])
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

      if (Math.abs(diff) >= SCROLL_DELTA) {
        setVisible(diff <= 0)
        lastScrollY.current = current
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible
}

function MobileMenuPortal({ open, children }: { open: boolean; children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !open || typeof document === 'undefined') return null
  return createPortal(children, document.body)
}

function MobileNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(props: React.ComponentPropsWithoutRef<typeof Popover>) {
  return (
    <Popover {...props}>
      {({ open }) => {
        useBodyScrollLock(open)

        return (
          <>
            <div className="rounded-full bg-white/90 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm">
              <PopoverButton className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-800 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
                <Image
                  src="/marketing-puzzle-ikon-szines-fekvo.svg"
                  alt="Marketing Puzzle logó"
                  width={24}
                  height={24}
                  className="h-5 w-auto"
                  priority
                />
                <span>Menü</span>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </PopoverButton>
            </div>

            <MobileMenuPortal open={open}>
              <div
                className="fixed inset-0 z-40 bg-zinc-900/30 backdrop-blur-xs transition-opacity duration-150"
                aria-hidden="true"
              />

              <PopoverPanel
                focus
                className="fixed inset-x-6 top-6 z-50 origin-top rounded-3xl bg-white p-8 shadow-lg ring-1 ring-zinc-900/5 transition-transform duration-150 data-closed:scale-95 data-closed:opacity-0"
              >
                <div className="flex flex-row-reverse items-center justify-between">
                  <PopoverButton
                    aria-label="Bezárás"
                    className="-m-1 p-1 outline-none focus:outline-none focus-visible:outline-none"
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
            </MobileMenuPortal>
          </>
        )
      }}
    </Popover>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'group relative block px-3 py-2 transition-colors',
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

        {isActive && (
          <span className="from-primary-500/0 via-primary-500/40 to-primary-500/0 absolute inset-x-1 -bottom-px h-px bg-linear-to-r" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex items-center gap-3 overflow-hidden rounded-full bg-white/90 px-4 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm">
        <li>
          <Link href="/" aria-label="Marketing Puzzle - vissza a főoldalra">
            <Image
              src="/marketing-puzzle-ikon-szines-fekvo.svg"
              alt="Marketing Puzzle logó"
              width={140}
              height={32}
              className="h-8 w-auto py-1"
              priority
            />
          </Link>
        </li>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
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
        'group font-secondary text-primary relative overflow-hidden rounded-full bg-white/90 px-4 py-2 text-sm font-black shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm transition-colors',
        className,
      )}
      aria-label={`Nyelv váltása (jelenleg: ${lang}) – csak demo, még nem kapcsol nyelvet`}
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
            'flex items-center justify-center transition-all duration-200',
            showHeader
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0',
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
