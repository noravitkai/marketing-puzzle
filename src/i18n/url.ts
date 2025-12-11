import { locales, defaultLocale, type Locale } from '@/i18n/config'
import { localizedPath, localizedProjectDetailPath, localizedServiceDetailPath } from '@/i18n/paths'

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/')[1] as Locale | undefined
  return locales.includes(segment ?? defaultLocale) ? (segment as Locale) : defaultLocale
}

export function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const withoutQuery = pathname.split(/[?#]/)[0] || '/'
  const withoutLocale = withoutQuery.replace(/^\/(hu|en)/, '') || '/'

  if (withoutLocale === '/' || withoutLocale === '') {
    return localizedPath('home', nextLocale)
  }

  if (withoutLocale === '/services' || withoutLocale === '/szolgaltatasok') {
    return localizedPath('services', nextLocale)
  }

  if (withoutLocale.startsWith('/services/') || withoutLocale.startsWith('/szolgaltatasok/')) {
    const [, , slug] = withoutLocale.split('/')
    return localizedServiceDetailPath(nextLocale, slug ?? '')
  }

  if (withoutLocale === '/projects' || withoutLocale === '/projektek') {
    return localizedPath('projects', nextLocale)
  }

  if (withoutLocale.startsWith('/projects/') || withoutLocale.startsWith('/projektek/')) {
    const [, , slug] = withoutLocale.split('/')
    return localizedProjectDetailPath(nextLocale, slug ?? '')
  }

  if (withoutLocale === '/contact' || withoutLocale === '/kapcsolat') {
    return localizedPath('contact', nextLocale)
  }

  if (withoutLocale === '/blog') {
    return localizedPath('blog', nextLocale)
  }

  return `${localizedPath('home', nextLocale).replace(/\/(hu|en)$/, '')}${withoutLocale}`
}
