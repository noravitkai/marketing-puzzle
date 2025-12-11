import type { Locale } from '@/i18n/config'

export type RouteKey = 'home' | 'services' | 'projects' | 'contact' | 'blog'

const basePaths: Record<RouteKey, Record<Locale, string>> = {
  home: {
    hu: '/hu',
    en: '/en',
  },
  services: {
    hu: '/hu/szolgaltatasok',
    en: '/en/services',
  },
  projects: {
    hu: '/hu/projektek',
    en: '/en/projects',
  },
  contact: {
    hu: '/hu/kapcsolat',
    en: '/en/contact',
  },
  blog: {
    hu: '/hu/blog',
    en: '/en/blog',
  },
}

export function localizedPath(route: RouteKey, locale: Locale): string {
  return basePaths[route][locale]
}

export function localizedServiceDetailPath(locale: Locale, slug: string): string {
  const trimmedSlug = slug.trim()
  if (!trimmedSlug) {
    return basePaths.services[locale]
  }

  if (locale === 'hu') {
    return `/hu/szolgaltatasok/${trimmedSlug}`
  }

  return `/en/services/${trimmedSlug}`
}

export function localizedProjectDetailPath(locale: Locale, slug: string): string {
  const trimmedSlug = slug.trim()
  if (!trimmedSlug) {
    return basePaths.projects[locale]
  }

  if (locale === 'hu') {
    return `/hu/projektek/${trimmedSlug}`
  }

  return `/en/projects/${trimmedSlug}`
}
