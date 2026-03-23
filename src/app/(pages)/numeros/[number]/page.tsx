import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SITE_URL, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import LotteryBall from '@/components/ui/LotteryBall';
import SEOContent from '@/components/ui/SEOContent';

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  // Don't pre-render at build time — generated on demand via ISR
  return [];
}

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const n = parseInt(number, 10);

  if (isNaN(n) || n < 1 || n > 100) {
    return { title: 'Numero Invalido' };
  }

  return {
    title: `Numero ${n} - Estatisticas nas Loterias da Caixa`,
    description: `Estatisticas completas do numero ${n} em todas as loterias da Caixa. Frequencia, percentual de aparicao e ultima vez que foi sorteado.`,
    alternates: {
      canonical: `/numeros/${n}`,
    },
  };
}

interface NumberGameStats {
  slug: string;
  frequency: number;
  totalResults: number;
  percentage: number;
  lastDrawnConcurso: number | null;
  lastDrawnDate: string | null;
  isHot: boolean;
}

export default async function NumeroPage({ params }: PageProps) {
  const { number } = await params;
  const n = parseInt(number, 10);

  if (isNaN(n) || n < 1 || n > 100) {
    notFound();
  }

  const paddedNumber = String(n).padStart(2, '0');

  const gameStats: NumberGameStats[] = [];
  let hasError = false;

  for (const slug of GAME_SLUGS) {
    const game = GAMES[slug];

    // Only include games where this number is valid
    if (n > game.maxNumber) continue;

    try {
      const results = await fetchRecentResults(slug, 10);
      if (results.length === 0) continue;

      let frequency = 0;
      let lastDrawnConcurso: number | null = null;
      let lastDrawnDate: string | null = null;

      for (const result of results) {
        const found = result.dezenas.some((d) => parseInt(d, 10) === n);
        if (found) {
          frequency++;
          if (lastDrawnConcurso === null) {
            lastDrawnConcurso = result.concurso;
            lastDrawnDate = result.data;
          }
        }
      }

      // Calculate average frequency to determine hot/cold
      const totalDrawnNumbers = results.reduce(
        (sum, r) => sum + r.dezenas.length,
        0,
      );
      const avgFrequencyPerNumber = totalDrawnNumbers / game.maxNumber;

      gameStats.push({
        slug,
        frequency,
        totalResults: results.length,
        percentage: results.length > 0 ? (frequency / results.length) * 100 : 0,
        lastDrawnConcurso,
        lastDrawnDate,
        isHot: frequency > avgFrequencyPerNumber,
      });
    } catch {
      hasError = true;
    }
  }

  const prevNumber = n > 1 ? n - 1 : null;
  const nextNumber = n < 100 ? n + 1 : null;

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
        name: 'Numeros',
        item: `${SITE_URL}/numeros/1`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Numero ${n}`,
        item: `${SITE_URL}/numeros/${n}`,
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
            <Link href="/numeros/1" className="hover:text-white">
              Numeros
            </Link>
            <span className="mx-2">/</span>
            <span>{n}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              {paddedNumber}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Numero {n}
              </h1>
              <p className="text-lg text-emerald-100">
                Estatisticas detalhadas nas loterias da Caixa
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Navigation between numbers */}
        <div className="flex items-center justify-between">
          {prevNumber ? (
            <Link
              href={`/numeros/${prevNumber}`}
              className="text-emerald-600 hover:underline font-medium flex items-center gap-1"
            >
              <span>&larr;</span> Numero {prevNumber}
            </Link>
          ) : (
            <span />
          )}
          {nextNumber ? (
            <Link
              href={`/numeros/${nextNumber}`}
              className="text-emerald-600 hover:underline font-medium flex items-center gap-1"
            >
              Numero {nextNumber} <span>&rarr;</span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        {hasError && gameStats.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-center">
            <p className="text-gray-600">
              Nao foi possivel carregar as estatisticas no momento. Por favor,
              tente novamente mais tarde.
            </p>
          </div>
        )}

        {/* Game Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameStats.map((stats) => {
            const game = GAMES[stats.slug];
            return (
              <div
                key={stats.slug}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{game.emoji}</span>
                    <h2 className="text-lg font-bold text-gray-900">
                      {game.name}
                    </h2>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      stats.isHot
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {stats.isHot ? '🔥 Quente' : '❄️ Frio'}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <LotteryBall
                    number={paddedNumber}
                    color={game.ballColor}
                    textColor={game.ballTextColor}
                    size="lg"
                  />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.frequency}x
                    </p>
                    <p className="text-sm text-gray-500">
                      em {stats.totalResults} concursos
                    </p>
                  </div>
                </div>

                {/* Frequency Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Frequencia</span>
                    <span>{stats.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        stats.isHot ? 'bg-red-400' : 'bg-blue-400'
                      }`}
                      style={{ width: `${Math.min(stats.percentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  {stats.lastDrawnConcurso ? (
                    <>
                      <p>
                        Ultimo sorteio:{' '}
                        <strong className="text-gray-900">
                          Concurso {stats.lastDrawnConcurso}
                        </strong>
                      </p>
                      {stats.lastDrawnDate && (
                        <p>
                          Data:{' '}
                          <strong className="text-gray-900">
                            {stats.lastDrawnDate}
                          </strong>
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      Nao foi sorteado nos ultimos {stats.totalResults}{' '}
                      concursos
                    </p>
                  )}
                </div>

                <Link
                  href={`/${stats.slug}`}
                  className="text-emerald-600 hover:underline font-medium text-sm mt-3 inline-block"
                >
                  Ver resultados {game.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick Navigation to Other Numbers */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Consultar Outro Numero
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 60 }, (_, i) => i + 1).map((num) => (
              <Link
                key={num}
                href={`/numeros/${num}`}
                className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-full transition-colors ${
                  num === n
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                }`}
              >
                {num}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Analise do Numero {n} nas Loterias
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Esta pagina apresenta as{' '}
              <strong className="text-gray-900">
                estatisticas detalhadas
              </strong>{' '}
              do numero {n} em todas as loterias da Caixa Economica Federal
              onde ele pode ser sorteado. A analise considera os ultimos 50
              concursos de cada jogo.
            </p>
            <p className="text-gray-600">
              Um numero e classificado como{' '}
              <strong className="text-gray-900">quente</strong> (🔥) quando
              aparece com frequencia acima da media esperada, e como{' '}
              <strong className="text-gray-900">frio</strong> (❄️) quando
              aparece abaixo da media. Essa classificacao e relativa a cada
              jogo, pois as probabilidades variam conforme a quantidade de
              numeros disponiveis e selecionados.
            </p>
            <p className="text-gray-600">
              Lembre-se que cada sorteio e{' '}
              <strong className="text-gray-900">independente</strong> e a
              frequencia passada nao influencia os resultados futuros. Use
              essas estatisticas como referencia, mas jogue sempre com
              responsabilidade.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Numeros Quentes e Frios
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Previsoes
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Numeros
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
