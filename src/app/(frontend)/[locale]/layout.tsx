import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import '@/styles/globals.css'
import { Layout } from '@/components/ui/Layout'
import { I18nProvider } from '@/i18n/I18nProvider'
import { getMessages } from '@/i18n/getMessages'
import { locales, type Locale } from '@/i18n/config'

export const metadata: Metadata = {
  title: {
    template: '%s - Marketing Puzzle',
    default: 'Marketing Puzzle – Kreatív marketingügynökség',
  },
  description:
    'Ötletközpontú full-service marketingkommunikációs ügynökség. Weboldal, közösségi média, grafika, SEO, hirdetés, digitális tartalom 20+ év szakmai tapasztalattal.',
}

type FrontendLocaleLayoutProps = {
  params: Promise<{
    locale: Locale
  }>
  children: React.ReactNode
}

export default async function FrontendLocaleLayout({
  params,
  children,
}: FrontendLocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = getMessages(locale)

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <I18nProvider locale={locale} messages={messages}>
          <Layout>{children}</Layout>
        </I18nProvider>
      </body>
    </html>
  )
}
