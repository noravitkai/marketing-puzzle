import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Layout } from '@/components/ui/Layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Marketing Puzzle',
    default: 'Marketing Puzzle – Kreatív marketingügynökség',
  },
  description:
    'Ötletközpontú full-service marketingkommunikációs ügynökség. Weboldal, közösségi média, grafika, SEO, hirdetés, digitális tartalom 20+ év szakmai tapasztalattal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full">
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}
