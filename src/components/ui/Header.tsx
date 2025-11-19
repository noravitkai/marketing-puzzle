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
    lastScrollY.current = window.scrollY
    const DELTA = 5

    function onScroll() {
      const current = window.scrollY
      const diff = current - lastScrollY.current

      if (Math.abs(diff) >= DELTA) {
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
          'relative block px-3 py-2 transition',
          isActive ? 'text-primary' : 'hover:text-primary',
        )}
      >
        {children}
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
      <ul className="flex items-center gap-3 rounded-full bg-white/90 px-4 text-sm font-medium text-zinc-800 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm">
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
          <MobileNavigation className="md:hidden" />
          <DesktopNavigation className="hidden md:block" />
        </div>
      </Container>
    </header>
  )
}
