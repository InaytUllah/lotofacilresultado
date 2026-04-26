import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration';
import NotificationBell from '@/components/ui/NotificationBell';
import BackToTop from '@/components/ui/BackToTop';
import PWAInstallPrompt from '@/components/ui/PWAInstallPrompt';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6YPCF13JT5';

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
    default: 'Lotofácil Resultado - Lotofácil, Quina e Todas as Loterias',
    template: '%s | Lotofácil Resultado',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'resultado lotofácil',
    'resultado mega-sena',
    'resultado quina',
    'resultado lotomania',
    'resultado dia de sorte',
    'resultado timemania',
    'resultado dupla sena',
    'resultado super sete',
    'resultado +milionária',
    'loterias da caixa',
    'resultado loterias hoje',
    'concurso loterias',
    'próximo sorteio',
    'loterias acumuladas',
    'conferir aposta',
  ],
  authors: [{ name: 'Lotofácil Resultado', url: SITE_URL }],
  creator: 'Lotofácil Resultado',
  publisher: 'Lotofácil Resultado',
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
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@lotofacilresultado',
    site: '@lotofacilresultado',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
      <head>
        <link rel="preconnect" href="https://loteriascaixa-api.herokuapp.com" />
        <link rel="dns-prefetch" href="https://loteriascaixa-api.herokuapp.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lotofácil Resultado',
              alternateName: 'Resultados das Loterias da Caixa',
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/api/icon?size=512`,
                width: 512,
                height: 512,
              },
              description: SITE_DESCRIPTION,
              foundingDate: '2023',
              areaServed: {
                '@type': 'Country',
                name: 'Brasil',
              },
              knowsAbout: [
                'Loterias da Caixa Econômica Federal',
                'Mega-Sena',
                'Lotofácil',
                'Quina',
                'Lotomania',
                'Dia de Sorte',
                'Timemania',
                'Dupla Sena',
                'Super Sete',
                '+Milionária',
                'Probabilidades de loteria',
                'Estatísticas de sorteios',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                url: `${SITE_URL}/contato`,
                availableLanguage: ['Portuguese', 'pt-BR'],
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lotofácil Resultado',
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SITE_URL}/historico?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
        <NotificationBell />
        <BackToTop />
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
