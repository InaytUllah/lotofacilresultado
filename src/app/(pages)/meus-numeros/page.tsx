import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import MeusNumeros from '@/components/MeusNumeros';

const title = 'Meus Números - Salve Suas Apostas';
const description =
  'Salve suas combinações favoritas das loterias da Caixa e confira automaticamente se seus números foram sorteados nos últimos resultados.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/meus-numeros',
    languages: {
      'pt-BR': `${SITE_URL}/meus-numeros`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/meus-numeros`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Meus%20N%C3%BAmeros&color=%23059669', width: 1200, height: 630 }],
  },
};

export default function MeusNumerosPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Meus Números',
        item: `${SITE_URL}/meus-numeros`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Meus Números</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Meus Números
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Salve suas apostas favoritas e confira automaticamente se seus
            números foram sorteados.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <MeusNumeros />
      </div>
    </>
  );
}
