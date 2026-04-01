import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchMultipleLatestResults } from '@/lib/api/lottery';
import { getNextDrawDate, getDrawDayNames } from '@/lib/utils/format';

import ResultCard from '@/components/ui/ResultCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import ChecklistItem from '@/components/ui/ChecklistItem';
import LiveResultPoller from '@/components/ui/LiveResultPoller';

// force-dynamic prevents build timeout — API calls happen at request time, not build time
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Resultado das Loterias da Caixa Hoje — Mega-Sena, Lotofácil, Quina e Mais',
  description:
    'Confira os resultados atualizados de todas as loterias da Caixa Econômica Federal. Mega-Sena, Lotofácil, Quina, Lotomania e muito mais. Resultados minutos após o sorteio.',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': SITE_URL,
    },
  },
  openGraph: {
    title: 'Resultado das Loterias da Caixa Hoje — Mega-Sena, Lotofácil, Quina e Mais',
    description: 'Confira os resultados atualizados de todas as loterias da Caixa Econômica Federal. Mega-Sena, Lotofácil, Quina, Lotomania e muito mais. Resultados minutos após o sorteio.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
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
      {/* Live Result Poller - polls every 10s during draw window (21:00 BRT, all draw days) */}
      <LiveResultPoller
        drawTime="21:00"
        drawDays={[0, 1, 2, 3, 4, 5, 6]}
        pollInterval={10000}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Resultados das Loterias da Caixa
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mb-8">
            Confira os resultados atualizados de todas as loterias da Caixa
            Econômica Federal. Mega-Sena, Lotofácil, Quina e muito mais.
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

      {/* Featured Jackpot Card */}
      {(() => {
        let maxPrize = 0;
        let jackpotSlug = '';
        for (const slug of GAME_SLUGS) {
          const r = results[slug];
          if (r && r.valorEstimadoProximoConcurso > maxPrize) {
            maxPrize = r.valorEstimadoProximoConcurso;
            jackpotSlug = slug;
          }
        }
        if (!jackpotSlug || maxPrize <= 0) return null;
        const jackpotGame = GAMES[jackpotSlug];
        const jackpotResult = results[jackpotSlug]!;
        const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maxPrize);
        return (
          <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
            <Link
              href={`/${jackpotSlug}`}
              className="block rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-200 rounded-full px-3 py-1 mb-3">
                    🏆 Maior Prêmio Estimado
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {jackpotGame.emoji} {jackpotGame.name} — Concurso {jackpotResult.concurso + 1}
                  </h2>
                  <p className="text-gray-600 mt-1">Próximo sorteio estimado em</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">{formatted}</p>
                  <p className="text-sm text-emerald-700 font-medium mt-1">Ver detalhes &rarr;</p>
                </div>
              </div>
            </Link>
          </section>
        );
      })()}

      {/* Latest Results Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Últimos Resultados
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
                    Resultado indisponível no momento.
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
            Próximos Sorteios
          </h2>
          {/* Mobile: horizontal scroll; Desktop: grid */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              const nextDraw = getNextDrawDate(game.drawDays, game.drawTime);
              return (
                <div
                  key={slug}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm snap-start flex-shrink-0 w-[280px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                  </div>
                  <CountdownTimer
                    targetDate={nextDraw}
                    label={`Próximo: ${game.drawTime}h`}
                  />
                </div>
              );
            })}
          </div>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    label={`Próximo sorteio: ${game.drawTime}h`}
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
                loterias da Caixa Econômica Federal
              </strong>{' '}
              são os jogos de azar mais populares do Brasil, com milhões de
              apostadores participando dos sorteios semanais. Nosso site oferece
              os resultados atualizados de todas as modalidades logo após a
              apuração oficial.
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
              é a loteria mais famosa do Brasil, com sorteios às terças, quintas
              e sábados às 21h. O apostador escolhe 6 números de 1 a 60 e pode ganhar
              acertando 4, 5 ou 6 dezenas. A probabilidade de acertar a Sena com uma aposta
              simples é de 1 em 50.063.860. A aposta mínima custa R$ 5,00 e os prêmios
              frequentemente ultrapassam R$ 100 milhões quando acumulados.
            </p>

            <p>
              A{' '}
              <Link
                href="/lotofacil"
                className="text-emerald-600 hover:underline font-medium"
              >
                Lotofácil
              </Link>{' '}
              é considerada a loteria mais fácil de ganhar, com sorteios de
              segunda a sábado. O jogador marca 15 números entre 25, e ganha
              acertando a partir de 11 dezenas. A chance de acertar os 15 números é de
              1 em 3.268.760, mas a probabilidade de ganhar qualquer prêmio (11 acertos)
              é de aproximadamente 1 em 11. A aposta mínima é de apenas R$ 3,00, tornando-a
              acessível para todos os perfis de apostadores.
            </p>

            <p>
              A{' '}
              <Link
                href="/quina"
                className="text-emerald-600 hover:underline font-medium"
              >
                Quina
              </Link>{' '}
              oferece sorteios de segunda a sábado, onde o apostador escolhe 5
              números de 1 a 80. É possível ganhar acertando de 2 a 5 números, com
              probabilidade de 1 em 24.040.016 para o prêmio principal. A aposta mínima
              custa R$ 2,50 e a Quina de São João, realizada no dia 24 de junho, não acumula.
            </p>

            <p>
              A{' '}
              <Link
                href="/lotomania"
                className="text-emerald-600 hover:underline font-medium"
              >
                Lotomania
              </Link>{' '}
              é uma modalidade única onde o apostador escolhe 50 números de 00 a 99.
              São sorteados 20 números por concurso, e quem acertar todos os 20 ou
              nenhum dos 20 leva o prêmio máximo. Os sorteios acontecem às segundas,
              quartas e sextas-feiras, com aposta fixa de R$ 3,00.
            </p>

            <p>
              A{' '}
              <Link
                href="/mais-milionaria"
                className="text-emerald-600 hover:underline font-medium"
              >
                +Milionária
              </Link>{' '}
              é a loteria com os maiores prêmios do Brasil, com mínimo garantido de
              R$ 10 milhões. O apostador escolhe 6 números de 1 a 50 mais 2 trevos
              de 1 a 6. Com sorteios às quartas e sábados, a probabilidade de acertar
              tudo é de 1 em 238.360.500.
            </p>

            <p>
              O{' '}
              <Link
                href="/dia-de-sorte"
                className="text-emerald-600 hover:underline font-medium"
              >
                Dia de Sorte
              </Link>{' '}
              combina números e meses: o apostador escolhe 7 números de 1 a 31 e um
              mês da sorte. Sorteios às terças, quintas e sábados. A chance de
              acertar o mês é de 1 em 12, proporcionando um prêmio adicional.
            </p>

            <p>
              O{' '}
              <Link
                href="/super-sete"
                className="text-emerald-600 hover:underline font-medium"
              >
                Super Sete
              </Link>{' '}
              funciona com 7 colunas, cada uma com números de 0 a 9. O apostador
              escolhe um número por coluna e ganha acertando de 3 a 7 colunas.
              Sorteios às segundas, quartas e sextas, com aposta mínima de R$ 2,50.
            </p>

            <p>
              A{' '}
              <Link
                href="/dupla-sena"
                className="text-emerald-600 hover:underline font-medium"
              >
                Dupla Sena
              </Link>{' '}
              oferece duas chances de ganhar no mesmo concurso: são realizados dois
              sorteios de 6 números (de 1 a 50) por concurso. Sorteios às segundas,
              quartas e sextas-feiras, com aposta mínima de R$ 2,50.
            </p>

            <p>
              A{' '}
              <Link
                href="/timemania"
                className="text-emerald-600 hover:underline font-medium"
              >
                Timemania
              </Link>{' '}
              une futebol e loteria: o apostador escolhe 10 números de 1 a 80 e um
              time do coração entre 80 clubes brasileiros. São sorteados 7 números,
              e acertar o time do coração também garante prêmio. Sorteios às terças,
              quintas e sábados, com aposta única de R$ 3,50.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">
              Calendário de Sorteios
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
                      Horário
                    </th>
                    <th className="text-left py-3 font-semibold text-gray-900">
                      Aposta Mínima
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
              O que você encontra aqui
            </h3>

            <div className="space-y-3">
              <ChecklistItem>
                Resultados atualizados de todos os sorteios da Caixa
              </ChecklistItem>
              <ChecklistItem>
                Premiação detalhada com número de ganhadores por faixa
              </ChecklistItem>
              <ChecklistItem>
                Contagem regressiva para os próximos sorteios
              </ChecklistItem>
              <ChecklistItem>
                Estatísticas e análise de números quentes e frios
              </ChecklistItem>
              <ChecklistItem>
                Gerador de números aleatórios para suas apostas
              </ChecklistItem>
              <ChecklistItem>
                Histórico completo de resultados anteriores
              </ChecklistItem>
            </div>
          </div>
        </SEOContent>
      </section>

    </>
  );
}
