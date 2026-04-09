import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import LotteryBall from '@/components/ui/LotteryBall';
import SEOContent from '@/components/ui/SEOContent';
import ToolContentSections from '@/components/ui/ToolContentSections';
import { TOOL_CONTENT } from '@/lib/lotteryContent';
import ResponsibleGamblingBanner from '@/components/ui/ResponsibleGamblingBanner';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Números Quentes e Frios - Estatísticas das Loterias',
  description:
    'Números quentes e frios de todas as loterias da Caixa. Frequência dos números mais e menos sorteados na Mega-Sena, Lotofácil e Quina.',
  alternates: {
    canonical: '/numeros-quentes-frios',
    languages: {
      'pt-BR': `${SITE_URL}/numeros-quentes-frios`,
    },
  },
  openGraph: {
    title: 'Números Quentes e Frios - Estatísticas das Loterias',
    description: 'Números quentes e frios de todas as loterias da Caixa. Frequência dos números mais e menos sorteados na Mega-Sena, Lotofácil e Quina.',
    url: `${SITE_URL}/numeros-quentes-frios`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

interface NumberFrequency {
  number: number;
  frequency: number;
}

function calculateFrequencies(
  results: { dezenas: string[] }[],
  maxNumber: number,
): NumberFrequency[] {
  const freq: Record<number, number> = {};
  for (let i = 1; i <= maxNumber; i++) {
    freq[i] = 0;
  }

  for (const result of results) {
    for (const d of result.dezenas) {
      const n = parseInt(d, 10);
      if (n >= 1 && n <= maxNumber) {
        freq[n] = (freq[n] || 0) + 1;
      }
    }
  }

  return Object.entries(freq).map(([num, count]) => ({
    number: parseInt(num, 10),
    frequency: count,
  }));
}

export default async function NumerosQuentesFriosPage() {
  let hasError = false;

  // Fetch all games in PARALLEL to avoid sequential timeout
  const settledResults = await Promise.allSettled(
    GAME_SLUGS.map(async (slug) => {
      const results = await fetchRecentResults(slug, 5);
      if (results.length === 0) return null;

      const game = GAMES[slug];
      const frequencies = calculateFrequencies(results, game.maxNumber);

      const sorted = [...frequencies].sort((a, b) => b.frequency - a.frequency);
      const hot = sorted.slice(0, 10);
      const cold = [...frequencies]
        .sort((a, b) => a.frequency - b.frequency)
        .slice(0, 10);

      const maxFreq = sorted[0]?.frequency || 1;

      return {
        slug,
        hot,
        cold,
        maxFreq,
        totalResults: results.length,
      };
    }),
  );

  const gameData = settledResults
    .filter(
      (r): r is PromiseFulfilledResult<{ slug: string; hot: NumberFrequency[]; cold: NumberFrequency[]; maxFreq: number; totalResults: number }> =>
        r.status === 'fulfilled' && r.value !== null,
    )
    .map((r) => r.value);

  if (settledResults.some((r) => r.status === 'rejected')) {
    hasError = true;
  }

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
        name: 'Números Quentes e Frios',
        item: `${SITE_URL}/numeros-quentes-frios`,
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
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Números Quentes e Frios</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Números Quentes e Frios
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Análise de frequência dos números mais e menos sorteados nas loterias
            da Caixa. Baseado nos últimos concursos de cada jogo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <ResponsibleGamblingBanner />

        {hasError && gameData.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-center">
            <p className="text-gray-600">
              Não foi possível carregar os dados estatísticos no momento. Por
              favor, tente novamente mais tarde.
            </p>
          </div>
        )}

        {gameData.map(({ slug, hot, cold, maxFreq, totalResults }) => {
          const game = GAMES[slug];
          return (
            <div
              key={slug}
              className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{game.emoji}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {game.name}
                </h2>
                <span className="text-sm text-gray-500">
                  ({totalResults} concursos analisados)
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hot Numbers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🔥</span> Números Quentes
                  </h3>
                  <div className="space-y-2">
                    {hot.map(({ number, frequency }) => (
                      <div key={number} className="flex items-center gap-3">
                        <LotteryBall
                          number={String(number).padStart(2, '0')}
                          color={game.ballColor}
                          textColor={game.ballTextColor}
                          size="sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-red-400"
                                style={{
                                  width: `${(frequency / maxFreq) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-16 text-right">
                              {frequency}x
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cold Numbers */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>❄️</span> Números Frios
                  </h3>
                  <div className="space-y-2">
                    {cold.map(({ number, frequency }) => (
                      <div key={number} className="flex items-center gap-3">
                        <LotteryBall
                          number={String(number).padStart(2, '0')}
                          color={game.ballColor}
                          textColor={game.ballTextColor}
                          size="sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-blue-400"
                                style={{
                                  width: `${(frequency / maxFreq) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-16 text-right">
                              {frequency}x
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            O que são Números Quentes e Frios?
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Números quentes são os que saíram mais vezes nos
              últimos concursos. Números frios são os que apareceram pouco.
            </p>
            <p className="text-gray-600">
              Alguns apostadores preferem jogar nos quentes, apostando que a
              frequência vai continuar. Outros escolhem os frios, achando que
              estão &quot;atrasados&quot;. Cada um com sua lógica.
            </p>
            <p className="text-gray-600">
              Na prática, cada sorteio é independente dos anteriores. A
              frequência passada não garante nada sobre o próximo resultado.
              Mas para quem gosta de estudar padrões, a análise é interessante.
            </p>
            <p className="text-gray-600">
              A análise cobre os últimos concursos de cada loteria. Os dados
              são atualizados após cada sorteio.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Ver Previsões
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Números
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/historico"
              className="text-emerald-600 hover:underline font-medium"
            >
              Histórico de Resultados
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/estatisticas"
              className="text-emerald-600 hover:underline font-medium"
            >
              Dashboard Estatístico
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/comparar"
              className="text-emerald-600 hover:underline font-medium"
            >
              Comparar Sorteios
            </Link>
          </div>
        </SEOContent>

        <ToolContentSections toolName="Números Quentes e Frios" content={TOOL_CONTENT['numeros-quentes-frios']} />
      </div>
    </>
  );
}
