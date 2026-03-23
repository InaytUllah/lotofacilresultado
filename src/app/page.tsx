import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchMultipleLatestResults } from '@/lib/api/lottery';
import { getNextDrawDate, getDrawDayNames } from '@/lib/utils/format';

import ResultCard from '@/components/ui/ResultCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import ChecklistItem from '@/components/ui/ChecklistItem';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Resultados Mega Sena Hoje - Lotofacil, Quina e Todas as Loterias da Caixa',
  description:
    'Confira os resultados atualizados da Mega-Sena, Lotofacil, Quina, Lotomania, +Milionaria, Dia de Sorte, Super Sete, Dupla Sena e Timemania. Numeros sorteados, premiacao e proximos sorteios.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  let results: Record<string, import('@/lib/types').LotteryResult | null> = {};

  try {
    results = await fetchMultipleLatestResults();
  } catch {
    // API failed — we'll show placeholders
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Resultados das Loterias da Caixa
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mb-8">
            Confira os resultados atualizados de todas as loterias da Caixa
            Economica Federal. Mega-Sena, Lotofacil, Quina e muito mais.
          </p>

          {/* Badge pills */}
          <div className="flex flex-wrap gap-2">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/15 hover:bg-white/25 transition-colors"
                >
                  <span>{game.emoji}</span>
                  <span>{game.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Results Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ultimos Resultados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_SLUGS.map((slug) => {
            const game = GAMES[slug];
            const result = results[slug];

            if (!result) {
              return (
                <div
                  key={slug}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Resultado indisponivel no momento.
                  </p>
                </div>
              );
            }

            return (
              <ResultCard
                key={slug}
                result={result}
                game={game}
                showLink={true}
              />
            );
          })}
        </div>
      </section>

      {/* Next Draws Countdown */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Proximos Sorteios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              const nextDraw = getNextDrawDate(game.drawDays, game.drawTime);
              return (
                <div
                  key={slug}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                  </div>
                  <CountdownTimer
                    targetDate={nextDraw}
                    label={`Proximo sorteio: ${game.drawTime}h`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SEOContent>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tudo Sobre as Loterias da Caixa
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              As{' '}
              <strong className="text-gray-900">
                loterias da Caixa Economica Federal
              </strong>{' '}
              sao os jogos de azar mais populares do Brasil, com milhoes de
              apostadores participando dos sorteios semanais. Nosso site oferece
              os resultados atualizados de todas as modalidades logo apos a
              apuracao oficial.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">
              Principais Loterias
            </h3>

            <p>
              A{' '}
              <Link
                href="/mega-sena"
                className="text-emerald-600 hover:underline font-medium"
              >
                Mega-Sena
              </Link>{' '}
              e a loteria mais famosa do Brasil, com sorteios as tercas, quintas
              e sabados. O apostador escolhe 6 numeros de 1 a 60 e pode ganhar
              acertando 4, 5 ou 6 dezenas.
            </p>

            <p>
              A{' '}
              <Link
                href="/lotofacil"
                className="text-emerald-600 hover:underline font-medium"
              >
                Lotofacil
              </Link>{' '}
              e considerada a loteria mais facil de ganhar, com sorteios de
              segunda a sabado. O jogador marca 15 numeros entre 25, e ganha
              acertando a partir de 11 dezenas.
            </p>

            <p>
              A{' '}
              <Link
                href="/quina"
                className="text-emerald-600 hover:underline font-medium"
              >
                Quina
              </Link>{' '}
              oferece sorteios de segunda a sabado, onde o apostador escolhe 5
              numeros de 1 a 80. E possivel ganhar acertando de 2 a 5 numeros.
            </p>

            <p>
              Outras modalidades incluem a{' '}
              <Link
                href="/lotomania"
                className="text-emerald-600 hover:underline font-medium"
              >
                Lotomania
              </Link>
              , a{' '}
              <Link
                href="/mais-milionaria"
                className="text-emerald-600 hover:underline font-medium"
              >
                +Milionaria
              </Link>
              , o{' '}
              <Link
                href="/dia-de-sorte"
                className="text-emerald-600 hover:underline font-medium"
              >
                Dia de Sorte
              </Link>
              , o{' '}
              <Link
                href="/super-sete"
                className="text-emerald-600 hover:underline font-medium"
              >
                Super Sete
              </Link>
              , a{' '}
              <Link
                href="/dupla-sena"
                className="text-emerald-600 hover:underline font-medium"
              >
                Dupla Sena
              </Link>{' '}
              e a{' '}
              <Link
                href="/timemania"
                className="text-emerald-600 hover:underline font-medium"
              >
                Timemania
              </Link>
              .
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">
              Calendario de Sorteios
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                      Loteria
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                      Dias de Sorteio
                    </th>
                    <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                      Horario
                    </th>
                    <th className="text-left py-3 font-semibold text-gray-900">
                      Aposta Minima
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GAME_SLUGS.map((slug) => {
                    const game = GAMES[slug];
                    const dayNames = getDrawDayNames(game.drawDays);
                    return (
                      <tr
                        key={slug}
                        className="border-b border-gray-100"
                      >
                        <td className="py-3 pr-4">
                          <Link
                            href={`/${slug}`}
                            className="text-emerald-600 hover:underline font-medium"
                          >
                            {game.emoji} {game.name}
                          </Link>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {dayNames.join(', ')}
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {game.drawTime}h
                        </td>
                        <td className="py-3 text-gray-700">{game.minBet}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">
              O que voce encontra aqui
            </h3>

            <div className="space-y-3">
              <ChecklistItem>
                Resultados atualizados de todos os sorteios da Caixa
              </ChecklistItem>
              <ChecklistItem>
                Premiacao detalhada com numero de ganhadores por faixa
              </ChecklistItem>
              <ChecklistItem>
                Contagem regressiva para os proximos sorteios
              </ChecklistItem>
              <ChecklistItem>
                Estatisticas e analise de numeros quentes e frios
              </ChecklistItem>
              <ChecklistItem>
                Gerador de numeros aleatorios para suas apostas
              </ChecklistItem>
              <ChecklistItem>
                Historico completo de resultados anteriores
              </ChecklistItem>
            </div>
          </div>
        </SEOContent>
      </section>

      {/* Schema.org WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description:
              'Resultados atualizados de todas as loterias da Caixa Economica Federal.',
            inLanguage: 'pt-BR',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
