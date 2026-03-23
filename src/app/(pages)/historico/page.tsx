import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import LotteryBall from '@/components/ui/LotteryBall';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Historico de Resultados - Todos os Concursos',
  description:
    'Historico completo de resultados de todas as loterias da Caixa. Consulte resultados anteriores da Mega-Sena, Lotofacil, Quina e outras loterias.',
  alternates: {
    canonical: '/historico',
  },
};

interface HistoricoPageProps {
  searchParams: Promise<{ jogo?: string }>;
}

export default async function HistoricoPage({ searchParams }: HistoricoPageProps) {
  const params = await searchParams;
  const selectedSlug = params.jogo && GAMES[params.jogo] ? params.jogo : 'mega-sena';
  const game = GAMES[selectedSlug];

  let results: Awaited<ReturnType<typeof fetchRecentResults>> = [];
  let hasError = false;

  try {
    results = await fetchRecentResults(selectedSlug, 10);
  } catch {
    hasError = true;
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
        name: 'Historico',
        item: `${SITE_URL}/historico`,
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
            <span>Historico</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Historico de Resultados
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Consulte os resultados anteriores de todas as loterias da Caixa
            Economica Federal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Game Selection Tabs */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Selecione o jogo:
          </h2>
          <div className="flex flex-wrap gap-2">
            {GAME_SLUGS.map((slug) => {
              const g = GAMES[slug];
              const isSelected = slug === selectedSlug;
              return (
                <Link
                  key={slug}
                  href={`/historico?jogo=${slug}`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                  style={isSelected ? { backgroundColor: g.color } : undefined}
                >
                  <span>{g.emoji}</span>
                  <span>{g.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Results Table */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">{game.emoji}</span>
            <h2 className="text-xl font-bold text-gray-900">
              Ultimos Resultados - {game.name}
            </h2>
          </div>

          {hasError && results.length === 0 && (
            <p className="text-gray-600 text-center py-8">
              Nao foi possivel carregar o historico no momento. Por favor, tente
              novamente mais tarde.
            </p>
          )}

          {results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                      Concurso
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                      Data
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                      Numeros
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-900">
                      Acumulado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.concurso}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-2">
                        <Link
                          href={`/${selectedSlug}/resultado/${result.concurso}`}
                          className="text-emerald-600 hover:underline font-medium"
                        >
                          {result.concurso}
                        </Link>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">
                        {formatDate(result.data)}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex flex-wrap gap-1">
                          {result.dezenas.map((d, idx) => (
                            <LotteryBall
                              key={idx}
                              number={d}
                              color={game.ballColor}
                              textColor={game.ballTextColor}
                              size="sm"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-sm">
                        {result.acumulado ? (
                          <span className="text-red-600 font-semibold">
                            {formatCurrency(result.valorAcumulado)}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-6 text-center">
            Veja mais resultados nas{' '}
            <Link
              href={`/${selectedSlug}`}
              className="text-emerald-600 hover:underline font-medium"
            >
              paginas individuais de cada jogo
            </Link>
            .
          </p>
        </div>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Historico Completo das Loterias da Caixa
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Consulte o <strong className="text-gray-900">historico de
              resultados</strong> de todas as loterias da Caixa Economica
              Federal. Nossa base de dados e atualizada automaticamente apos
              cada sorteio, trazendo os numeros sorteados, informacoes de
              premiacao e acumulacao.
            </p>
            <p className="text-gray-600">
              O historico e uma ferramenta valiosa para quem gosta de estudar{' '}
              <strong className="text-gray-900">padroes e tendencias</strong>{' '}
              nos resultados. Voce pode verificar quais numeros sairam mais
              recentemente, identificar sequencias e analisar a frequencia dos
              sorteios.
            </p>
            <p className="text-gray-600">
              Para uma analise mais detalhada, visite as paginas de{' '}
              <Link
                href="/numeros-quentes-frios"
                className="text-emerald-600 hover:underline font-medium"
              >
                numeros quentes e frios
              </Link>{' '}
              ou consulte as{' '}
              <Link
                href="/previsoes"
                className="text-emerald-600 hover:underline font-medium"
              >
                previsoes estatisticas
              </Link>{' '}
              para os proximos sorteios.
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
