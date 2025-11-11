import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Marketing Puzzle',
  description: 'Ötletközpontú marketingmegoldások, kreatív ügynökség',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className="font-primary bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  )
}
