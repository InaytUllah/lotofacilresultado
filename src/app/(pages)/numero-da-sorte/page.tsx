import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import LuckyGenerator from '@/components/LuckyGenerator';

const title = 'N\u00famero da Sorte - Gere Seus N\u00fameros da Sorte';
const description =
  'Gere n\u00fameros da sorte personalizados com base no seu nome e data de nascimento para as loterias da Caixa. Ferramenta gratuita para divers\u00e3o.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/numero-da-sorte',
    languages: { 'pt-BR': `${SITE_URL}/numero-da-sorte` },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/numero-da-sorte`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function NumeroDaSortePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'In\u00edcio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'N\u00famero da Sorte', item: `${SITE_URL}/numero-da-sorte` },
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
            <Link href="/" className="hover:text-white">In\u00edcio</Link>
            <span className="mx-2">/</span>
            <span>N\u00famero da Sorte</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            N\u00famero da Sorte
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Digite seu nome e data de nascimento para gerar n\u00fameros da sorte
            personalizados para qualquer loteria da Caixa.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <LuckyGenerator />

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              O gerador usa seu nome e data de nascimento como semente para criar
              combina\u00e7\u00f5es \u00fanicas. A mesma entrada sempre gera os mesmos n\u00fameros,
              ent\u00e3o voc\u00ea pode usar seus n\u00fameros da sorte em todas as apostas.
            </p>
            <p>
              Use o bot\u00e3o &quot;Gerar Novamente&quot; para obter uma combina\u00e7\u00e3o diferente
              mantendo seus dados. Os n\u00fameros s\u00e3o gerados localmente no seu
              navegador &mdash; nenhum dado \u00e9 enviado a servidores.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/gerador" className="text-emerald-600 hover:underline font-medium">
              Gerador Aleat\u00f3rio
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/conferidor" className="text-emerald-600 hover:underline font-medium">
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/meus-numeros" className="text-emerald-600 hover:underline font-medium">
              Meus N\u00fameros
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
