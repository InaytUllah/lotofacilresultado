import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchMultipleLatestResults } from '@/lib/api/lottery';
import LotteryBall from '@/components/ui/LotteryBall';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import { getNextDrawDate } from '@/lib/utils/format';

export const revalidate = 300;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const metadata: Metadata = {
  title: 'Loterias Acumuladas Hoje - Prêmios Acumulados da Caixa',
  description:
    'Veja todas as loterias da Caixa que estão acumuladas hoje. Confira os prêmios estimados da Mega-Sena, Lotofácil, Quina e outras loterias acumuladas.',
  alternates: {
    canonical: '/acumulados',
    languages: {
      'pt-BR': `${SITE_URL}/acumulados`,
    },
  },
  openGraph: {
    title: 'Loterias Acumuladas Hoje - Prêmios Acumulados da Caixa',
    description:
      'Veja todas as loterias da Caixa que estão acumuladas hoje. Confira os prêmios estimados da Mega-Sena, Lotofácil, Quina e outras loterias acumuladas.',
    url: `${SITE_URL}/acumulados`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Loterias%20Acumuladas&color=%23d97706', width: 1200, height: 630 }],
  },
};

export default async function AcumuladosPage() {
  let results: Record<string, import('@/lib/types').LotteryResult | null> = {};

  try {
    results = await fetchMultipleLatestResults();
  } catch {
    // API failed
  }

  const accumulated = GAME_SLUGS
    .map((slug) => {
      const game = GAMES[slug];
      const result = results[slug];
      return {
        slug,
        game,
        result,
        nextPrize: result?.valorEstimadoProximoConcurso || 0,
        isAccumulated: result?.acumulado ?? false,
        nextConcurso: (result?.concurso || 0) + 1,
      };
    })
    .sort((a, b) => b.nextPrize - a.nextPrize);

  const accumulatedGames = accumulated.filter((item) => item.isAccumulated);
  const nonAccumulatedGames = accumulated.filter((item) => !item.isAccumulated);

  const totalAccumulated = accumulatedGames.reduce((sum, item) => sum + item.nextPrize, 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Loterias Acumuladas',
        item: `${SITE_URL}/acumulados`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-amber-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Loterias Acumuladas</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Loterias Acumuladas Hoje
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mb-6">
            Confira quais loterias da Caixa estão acumuladas e os prêmios
            estimados para os próximos sorteios.
          </p>
          {totalAccumulated > 0 && (
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-6 py-3">
              <span className="text-amber-200 text-sm">Total acumulado:</span>
              <span className="text-2xl sm:text-3xl font-extrabold">
                {formatCurrency(totalAccumulated)}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Accumulated Games */}
        {accumulatedGames.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-amber-500">🔥</span> Acumuladas
            </h2>
            <div className="space-y-4">
              {accumulatedGames.map((item) => {
                const nextDraw = getNextDrawDate(item.game.drawDays, item.game.drawTime);
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className="block rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{item.game.emoji}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.game.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Concurso {item.nextConcurso}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                          {formatCurrency(item.nextPrize)}
                        </p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Acumulado
                        </span>
                      </div>
                    </div>
                    {item.result && (
                      <div className="mt-4 pt-4 border-t border-amber-200/50">
                        <p className="text-xs text-gray-500 mb-2">
                          Último resultado — Concurso {item.result.concurso}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.result.dezenas.map((d, i) => (
                            <LotteryBall
                              key={`${d}-${i}`}
                              number={d}
                              color={item.game.ballColor}
                              textColor={item.game.ballTextColor}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      <CountdownTimer
                        targetDate={nextDraw}
                        label={`Próximo sorteio: ${item.game.drawTime}h`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Non-Accumulated Games */}
        {nonAccumulatedGames.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-emerald-500">✅</span> Com Ganhador no Último Sorteio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nonAccumulatedGames.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="block rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.game.emoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.game.name}</h3>
                      <p className="text-xs text-gray-500">
                        Concurso {item.nextConcurso}
                      </p>
                    </div>
                  </div>
                  {item.nextPrize > 0 && (
                    <p className="text-lg font-bold text-emerald-600 mb-2">
                      {formatCurrency(item.nextPrize)}
                    </p>
                  )}
                  {item.result && (
                    <div className="flex flex-wrap gap-1">
                      {item.result.dezenas.slice(0, 6).map((d, i) => (
                        <LotteryBall
                          key={`${d}-${i}`}
                          number={d}
                          color={item.game.ballColor}
                          textColor={item.game.ballTextColor}
                          size="xs"
                        />
                      ))}
                      {item.result.dezenas.length > 6 && (
                        <span className="text-xs text-gray-400 self-center">
                          +{item.result.dezenas.length - 6}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {Object.values(results).every((r) => r === null) && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-gray-500">
              Não foi possível carregar os dados das loterias no momento.
              Tente novamente em alguns minutos.
            </p>
          </div>
        )}

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            O que são Loterias Acumuladas?
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Uma loteria acumula quando nenhum apostador acerta o prêmio
              principal do concurso. O valor não distribuído é somado ao prêmio
              do próximo sorteio, criando jackpots cada vez maiores.
            </p>
            <p className="text-gray-600">
              A Mega-Sena é a loteria que mais acumula, já que a chance de
              acertar as 6 dezenas é de 1 em 50 milhões. Já a Lotofácil
              acumula menos, pois a probabilidade de acerto é maior.
            </p>
            <p className="text-gray-600">
              Os prêmios estimados são calculados pela Caixa com base na
              arrecadação prevista. O valor final pode variar dependendo do
              volume de apostas realizadas para o concurso.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/historico"
              className="text-emerald-600 hover:underline font-medium"
            >
              Histórico de Resultados
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/conferidor"
              className="text-emerald-600 hover:underline font-medium"
            >
              Conferidor de Apostas
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
              href="/estatisticas"
              className="text-emerald-600 hover:underline font-medium"
            >
              Dashboard Estatístico
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
