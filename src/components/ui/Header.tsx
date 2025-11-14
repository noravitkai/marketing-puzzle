'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import { Container } from '@/components/ui/Container'

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
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 ring-offset-0 backdrop-blur-sm outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
        Menü
        <ChevronDownIcon className="ml-2 h-4 w-4" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton
            aria-label="Bezárás"
            className="-m-1 p-1 ring-offset-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
          >
            <XMarkIcon className="h-6 w-6 text-zinc-500" />
          </PopoverButton>
          <h2 className="text-sm font-medium text-zinc-600">Menü</h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800">
            <MobileNavItem href="/szolgaltatasok">Szolgáltatások</MobileNavItem>
            <MobileNavItem href="/projektek">Projektek</MobileNavItem>
            <MobileNavItem href="/rolunk">Rólunk</MobileNavItem>
            <MobileNavItem href="/blog">Blog</MobileNavItem>
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = usePathname() === href

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
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm">
        <NavItem href="/szolgaltatasok">Szolgáltatások</NavItem>
        <NavItem href="/projektek">Projektek</NavItem>
        <NavItem href="/rolunk">Rólunk</NavItem>
        <NavItem href="/blog">Blog</NavItem>
      </ul>
    </nav>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <Container className="py-6">
        <div className="flex items-center justify-center">
          <MobileNavigation className="md:hidden" />
          <DesktopNavigation className="hidden md:block" />
        </div>
      </Container>
    </header>
  )
}
