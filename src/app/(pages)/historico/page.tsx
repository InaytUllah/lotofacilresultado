import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import LotteryBall from '@/components/ui/LotteryBall';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Histórico de Resultados - Todos os Concursos',
  description:
    'Histórico completo de resultados de todas as loterias da Caixa. Consulte resultados anteriores da Mega-Sena, Lotofácil, Quina e outras loterias.',
  alternates: {
    canonical: '/historico',
    languages: {
      'pt-BR': `${SITE_URL}/historico`,
    },
  },
  openGraph: {
    title: 'Histórico de Resultados - Todos os Concursos',
    description: 'Histórico completo de resultados de todas as loterias da Caixa. Consulte resultados anteriores da Mega-Sena, Lotofácil, Quina e outras loterias.',
    url: `${SITE_URL}/historico`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
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
        name: 'Início',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Histórico',
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
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Histórico</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Histórico de Resultados
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Consulte os resultados anteriores de todas as loterias da Caixa
            Econômica Federal.
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
              Últimos Resultados - {game.name}
            </h2>
          </div>

          {hasError && results.length === 0 && (
            <p className="text-gray-600 text-center py-8">
              Não foi possível carregar o histórico no momento. Por favor, tente
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
                      Números
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
              páginas individuais de cada jogo
            </Link>
            .
          </p>
        </div>

        {/* CSV Download Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Baixar Resultados (CSV)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Baixe os últimos 50 resultados de cada loteria em formato CSV, compatível com Excel e Google Sheets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GAME_SLUGS.map((slug) => {
              const g = GAMES[slug];
              return (
                <a
                  key={slug}
                  href={`/api/download/${slug}`}
                  download
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                >
                  <span className="text-lg">{g.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {g.name}
                    </p>
                    <p className="text-xs text-gray-500">Últimos 50 concursos</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Dados fornecidos por lotofacilresultado.com | Fonte oficial: Caixa Econômica Federal
          </p>
        </div>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Histórico Completo das Loterias da Caixa
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Consulte o <strong className="text-gray-900">histórico de
              resultados</strong> de todas as loterias da Caixa Econômica
              Federal. Nossa base de dados é atualizada automaticamente após
              cada sorteio, trazendo os números sorteados, informações de
              premiação e acumulação.
            </p>
            <p className="text-gray-600">
              O histórico é uma ferramenta valiosa para quem gosta de estudar{' '}
              <strong className="text-gray-900">padrões e tendências</strong>{' '}
              nos resultados. Você pode verificar quais números saíram mais
              recentemente, identificar sequências e analisar a frequência dos
              sorteios.
            </p>
            <p className="text-gray-600">
              Para uma análise mais detalhada, visite as páginas de{' '}
              <Link
                href="/numeros-quentes-frios"
                className="text-emerald-600 hover:underline font-medium"
              >
                números quentes e frios
              </Link>{' '}
              ou consulte as{' '}
              <Link
                href="/previsoes"
                className="text-emerald-600 hover:underline font-medium"
              >
                previsões estatísticas
              </Link>{' '}
              para os próximos sorteios.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Números Quentes e Frios
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Previsões
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Números
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
