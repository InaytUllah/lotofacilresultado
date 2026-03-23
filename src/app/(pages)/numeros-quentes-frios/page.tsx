import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import LotteryBall from '@/components/ui/LotteryBall';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Numeros Quentes e Frios - Estatisticas das Loterias',
  description:
    'Descubra os numeros quentes e frios de todas as loterias da Caixa. Analise de frequencia dos numeros mais e menos sorteados na Mega-Sena, Lotofacil, Quina e mais.',
  alternates: {
    canonical: '/numeros-quentes-frios',
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
  const gameData: {
    slug: string;
    hot: NumberFrequency[];
    cold: NumberFrequency[];
    maxFreq: number;
    totalResults: number;
  }[] = [];

  let hasError = false;

  for (const slug of GAME_SLUGS) {
    try {
      const results = await fetchRecentResults(slug, 10);
      if (results.length === 0) continue;

      const game = GAMES[slug];
      const frequencies = calculateFrequencies(results, game.maxNumber);

      const sorted = [...frequencies].sort((a, b) => b.frequency - a.frequency);
      const hot = sorted.slice(0, 10);
      const cold = [...frequencies]
        .sort((a, b) => a.frequency - b.frequency)
        .slice(0, 10);

      const maxFreq = sorted[0]?.frequency || 1;

      gameData.push({
        slug,
        hot,
        cold,
        maxFreq,
        totalResults: results.length,
      });
    } catch {
      hasError = true;
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Numeros Quentes e Frios',
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
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span>Numeros Quentes e Frios</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Numeros Quentes e Frios
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Analise de frequencia dos numeros mais e menos sorteados nas loterias
            da Caixa. Baseado nos ultimos 50 concursos de cada jogo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {hasError && gameData.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-center">
            <p className="text-gray-600">
              Nao foi possivel carregar os dados estatisticos no momento. Por
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
                    <span>🔥</span> Numeros Quentes
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
                    <span>❄️</span> Numeros Frios
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
            O que sao Numeros Quentes e Frios?
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Na analise estatistica das loterias, os{' '}
              <strong className="text-gray-900">numeros quentes</strong> sao
              aqueles que foram sorteados com maior frequencia em um determinado
              periodo. Ja os{' '}
              <strong className="text-gray-900">numeros frios</strong> sao os
              que apareceram menos vezes nos sorteios recentes.
            </p>
            <p className="text-gray-600">
              Muitos apostadores utilizam essa analise para montar suas apostas,
              seja apostando nos numeros quentes (acreditando que a tendencia
              vai continuar) ou nos numeros frios (acreditando que eles estao
              &quot;atrasados&quot; e devem sair em breve).
            </p>
            <p className="text-gray-600">
              E importante lembrar que cada sorteio e{' '}
              <strong className="text-gray-900">independente</strong> dos
              anteriores. Os numeros sao sorteados aleatoriamente e a frequencia
              passada nao garante resultados futuros. No entanto, a analise
              estatistica pode ser uma ferramenta divertida para quem gosta de
              estudar padroes.
            </p>
            <p className="text-gray-600">
              Nossa analise e baseada nos{' '}
              <strong className="text-gray-900">ultimos 50 concursos</strong> de
              cada loteria, oferecendo uma visao recente da distribuicao dos
              numeros. Os dados sao atualizados automaticamente apos cada
              sorteio.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Ver Previsoes
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Numeros
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/historico"
              className="text-emerald-600 hover:underline font-medium"
            >
              Historico de Resultados
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
