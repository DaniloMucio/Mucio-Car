import './globals.css'
import type { Metadata } from 'next'
import { AppointmentProvider } from './context/AppointmentContext'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://muciocar.com.br'),
  title: 'Mucio Car - Estética Automotiva Premium',
  description: 'Especialistas em estética automotiva desde 2016. Oferecemos serviços premium de lavagem, polimento, cristalização e proteção para seu veículo.',
  keywords: ['estética automotiva', 'lavagem automotiva', 'polimento', 'cristalização', 'proteção veicular', 'carros clássicos', 'Araraquara'],
  authors: [{ name: 'Mucio Car' }],
  creator: 'Mucio Car',
  publisher: 'Mucio Car',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://muciocar.com.br',
    siteName: 'Mucio Car',
    title: 'Mucio Car - Estética Automotiva Premium',
    description: 'Especialistas em estética automotiva desde 2016. Oferecemos serviços premium de lavagem, polimento, cristalização e proteção para seu veículo.',
    images: [
      {
        url: '/images/logo/mucio-car-logo.png',
        width: 300,
        height: 180,
        alt: 'Mucio Car Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mucio Car - Estética Automotiva Premium',
    description: 'Especialistas em estética automotiva desde 2016. Oferecemos serviços premium de lavagem, polimento, cristalização e proteção para seu veículo.',
    images: ['/images/logo/mucio-car-logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link 
          rel="preload" 
          href="/images/cars/classic-car-1.jpg" 
          as="image" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className}>
        <AppointmentProvider>
          {children}
        </AppointmentProvider>
        <Footer />
      </body>
    </html>
  )
} 