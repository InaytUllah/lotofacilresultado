import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import StatsVisualizer from '@/components/StatsVisualizer';
import SEOContent from '@/components/ui/SEOContent';


const title = 'Estat\u00EDsticas das Loterias - Dashboard Visual';
const description =
  'Dashboard de estat\u00EDsticas visuais das loterias da Caixa. Frequ\u00EAncia dos n\u00FAmeros, distribui\u00E7\u00E3o par/\u00EDmpar, soma, consecutivos e dezenas da Mega-Sena, Lotof\u00E1cil, Quina e mais.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/estatisticas',
    languages: { 'pt-BR': `${SITE_URL}/estatisticas` },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/estatisticas`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Estat%C3%ADsticas%20das%20Loterias&color=%23059669', width: 1200, height: 630 }],
  },
};

// Static export: no runtime ?jogo= switching. The page seeds with mega-sena
// data; StatsVisualizer (client) can fetch other games on demand via the
// /api/results/{game}/recent Pages Function when the user switches games.
export default async function EstatisticasPage() {
  const gameSlug = 'mega-sena';
  const game = GAMES[gameSlug];

  const results = await fetchRecentResults(gameSlug, 20);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'In\u00EDcio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Estat\u00EDsticas',
        item: `${SITE_URL}/estatisticas`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              In&#237;cio
            </Link>
            <span className="mx-2">/</span>
            <span>Estat&#237;sticas</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Estat&#237;sticas das Loterias
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Dashboard visual com an&#225;lise estat&#237;stica dos &#250;ltimos sorteios.
            Frequ&#234;ncia dos n&#250;meros, distribui&#231;&#227;o par/&#237;mpar, soma, consecutivos e
            dezenas.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <StatsVisualizer results={results} game={game} />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Interpretar as Estat&#237;sticas
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O <strong className="text-gray-900">Dashboard de Estat&#237;sticas</strong>{' '}
              analisa os &#250;ltimos 20 sorteios do jogo selecionado e apresenta
              cinco visualiza&#231;&#245;es principais para ajudar voc&#234; a entender os
              padr&#245;es dos resultados.
            </p>
            <p className="text-gray-600">
              A <strong className="text-gray-900">frequ&#234;ncia dos n&#250;meros</strong>{' '}
              mostra quantas vezes cada n&#250;mero foi sorteado, ordenado do mais
              frequente para o menos frequente. A{' '}
              <strong className="text-gray-900">distribui&#231;&#227;o par/&#237;mpar</strong>{' '}
              revela o equil&#237;brio entre n&#250;meros pares e &#237;mpares.
            </p>
            <p className="text-gray-600">
              A <strong className="text-gray-900">distribui&#231;&#227;o por soma</strong>{' '}
              agrupa os concursos pela soma dos n&#250;meros sorteados, ajudando a
              identificar faixas de soma mais comuns. A an&#225;lise de{' '}
              <strong className="text-gray-900">n&#250;meros consecutivos</strong>{' '}
              mostra com que frequ&#234;ncia sorteios incluem pares como 12-13 ou
              34-35.
            </p>
            <p className="text-gray-600">
              A <strong className="text-gray-900">distribui&#231;&#227;o por dezena</strong>{' '}
              mostra quantos n&#250;meros caem em cada faixa (01-10, 11-20, etc.),
              revelando se certas faixas aparecem mais que outras.
            </p>
            <p className="text-gray-600">
              Lembre-se: cada sorteio &#233; independente. Estat&#237;sticas passadas n&#227;o
              garantem resultados futuros. Use os dados como refer&#234;ncia, n&#227;o
              como previs&#227;o.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              N&#250;meros Quentes e Frios
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              An&#225;lise Estat&#237;stica
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/historico"
              className="text-emerald-600 hover:underline font-medium"
            >
              Hist&#243;rico de Resultados
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
