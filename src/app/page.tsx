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
              e sábados. O apostador escolhe 6 números de 1 a 60 e pode ganhar
              acertando 4, 5 ou 6 dezenas.
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
              oferece sorteios de segunda a sábado, onde o apostador escolhe 5
              números de 1 a 80. É possível ganhar acertando de 2 a 5 números.
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
                +Milionária
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
