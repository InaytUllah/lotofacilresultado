import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import DrawComparison from '@/components/DrawComparison';

const title = 'Comparar Sorteios - Compare Dois Resultados';
const description =
  'Compare dois sorteios de qualquer loteria da Caixa lado a lado. Veja n\u00fameros em comum, soma, distribui\u00e7\u00e3o par/\u00edmpar e mais.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/comparar',
    languages: { 'pt-BR': `${SITE_URL}/comparar` },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/comparar`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function CompararPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'In\u00edcio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparar Sorteios', item: `${SITE_URL}/comparar` },
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
            <span>Comparar Sorteios</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Comparar Sorteios
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Compare dois concursos de qualquer loteria lado a lado. Descubra
            n\u00fameros em comum, diferen\u00e7as na soma e distribui\u00e7\u00e3o.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <DrawComparison />

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Compara\u00e7\u00e3o</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              A ferramenta de compara\u00e7\u00e3o busca os resultados diretamente da API
              da Caixa e apresenta os dois sorteios lado a lado. N\u00fameros em
              comum aparecem destacados em verde.
            </p>
            <p>
              Voc\u00ea pode comparar sorteios de qualquer per\u00edodo \u2014 basta informar
              os n\u00fameros dos concursos. Use o hist\u00f3rico para encontrar os
              concursos que deseja comparar.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/historico" className="text-emerald-600 hover:underline font-medium">
              Hist\u00f3rico de Resultados
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/estatisticas" className="text-emerald-600 hover:underline font-medium">
              Estat\u00edsticas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/numeros-quentes-frios" className="text-emerald-600 hover:underline font-medium">
              N\u00fameros Quentes e Frios
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
