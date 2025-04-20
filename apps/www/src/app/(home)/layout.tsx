import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from 'next-themes'

import { cn } from '@/utilities/cn'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <ThemeProvider storageKey="@hynix:theme" attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hynix | Speed for purposeful developers',
  description:
    'A minimalist React component library powered by TailwindCSS and Ark UI  — accessible by default, themeable, and production-ready.',
}
