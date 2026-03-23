import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ResponsibleGamingToast from '@/components/ui/ResponsibleGamingToast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Resultados Mega Sena - Lotofacil, Quina e Todas as Loterias',
    template: '%s | Resultados Mega Sena',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': SITE_URL,
    },
  },
  openGraph: {
    locale: 'pt_BR',
    type: 'website',
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Pular para o conteudo
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ResponsibleGamingToast />
      </body>
    </html>
  );
}
