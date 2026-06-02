import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { getNextDrawDate, getDrawDayNames } from '@/lib/utils/format';
import CountdownTimer from '@/components/ui/CountdownTimer';
import LiveResultPoller from '@/components/ui/LiveResultPoller';
import SEOContent from '@/components/ui/SEOContent';


export const metadata: Metadata = {
  title: 'Resultados ao Vivo - Sorteios das Loterias da Caixa em Tempo Real',
  description:
    'Acompanhe os sorteios das loterias da Caixa em tempo real. Resultados ao vivo da Mega-Sena, Lotofácil, Quina e todas as loterias com atualização automática.',
  alternates: {
    canonical: '/resultados-ao-vivo',
    languages: {
      'pt-BR': `${SITE_URL}/resultados-ao-vivo`,
    },
  },
  openGraph: {
    title: 'Resultados ao Vivo - Loterias da Caixa em Tempo Real',
    description:
      'Acompanhe os sorteios das loterias da Caixa em tempo real com atualização automática.',
    url: `${SITE_URL}/resultados-ao-vivo`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Resultados%20ao%20Vivo&color=%23dc2626', width: 1200, height: 630 }],
  },
};

export default function ResultadosAoVivoPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resultados ao Vivo',
        item: `${SITE_URL}/resultados-ao-vivo`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Os resultados aparecem em tempo real?',
      answer:
        'Os resultados são atualizados automaticamente a cada 10 segundos durante o horário dos sorteios. Em geral, aparecem de 5 a 10 minutos após o fim de cada sorteio.',
    },
    {
      question: 'Preciso atualizar a página manualmente?',
      answer:
        'Não. Esta página atualiza automaticamente durante o horário dos sorteios. Você verá os resultados aparecerem sem precisar recarregar.',
    },
    {
      question: 'Qual o horário dos sorteios?',
      answer:
        'A maioria dos sorteios da Caixa acontece às 20:00 ou 21:00 (horário de Brasília). Os horários variam por modalidade — confira a tabela abaixo.',
    },
    {
      question: 'Posso acompanhar de qualquer dispositivo?',
      answer:
        'Sim. A página funciona em computadores, tablets e celulares. A atualização automática funciona em todos os navegadores modernos.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Group games by draw time
  const gamesByTime: Record<string, string[]> = {};
  for (const slug of GAME_SLUGS) {
    const time = GAMES[slug].drawTime;
    if (!gamesByTime[time]) gamesByTime[time] = [];
    gamesByTime[time].push(slug);
  }

  const today = new Date();
  const dayOfWeek = today.getDay();

  // Games drawing today
  const todayGames = GAME_SLUGS.filter((slug) =>
    GAMES[slug].drawDays.includes(dayOfWeek)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Live Poller — polls every 10s during draw hours */}
      <LiveResultPoller
        drawTime="20:00"
        drawDays={[0, 1, 2, 3, 4, 5, 6]}
        pollInterval={10000}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-red-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Resultados ao Vivo</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Resultados ao Vivo
            </h1>
          </div>
          <p className="text-lg text-red-100 max-w-2xl">
            Acompanhe os sorteios das loterias da Caixa em tempo real.
            Esta página atualiza automaticamente durante o horário dos
            sorteios.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Today's Draws */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sorteios de Hoje
          </h2>
          <p className="text-gray-600 mb-6">
            {todayGames.length > 0
              ? `${todayGames.length} ${todayGames.length === 1 ? 'loteria sorteia' : 'loterias sorteiam'} hoje`
              : 'Nenhum sorteio programado para hoje'}
          </p>

          {todayGames.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {todayGames.map((slug) => {
                const game = GAMES[slug];
                const nextDraw = getNextDrawDate(game.drawDays, game.drawTime);
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 transition-colors block"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                        style={{ backgroundColor: game.color }}
                      >
                        {game.emoji} {game.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {game.drawTime}h
                      </span>
                    </div>
                    <CountdownTimer
                      targetDate={nextDraw}
                      label="Próximo sorteio"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500 text-lg">
                Sem sorteios hoje. Confira os{' '}
                <Link href="/" className="text-emerald-600 hover:underline">
                  últimos resultados
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        {/* All Countdowns */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contagem Regressiva — Todos os Sorteios
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              const nextDraw = getNextDrawDate(game.drawDays, game.drawTime);
              const dayNames = getDrawDayNames(game.drawDays);
              return (
                <div
                  key={slug}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                    <Link
                      href={`/${slug}`}
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      Ver resultado →
                    </Link>
                  </div>
                  <CountdownTimer
                    targetDate={nextDraw}
                    label={`Sorteio: ${game.drawTime}h`}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Dias: {dayNames.join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Schedule Table */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Horários dos Sorteios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Loteria</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Horário</th>
                  <th scope="col" className="text-left py-3 font-semibold text-gray-900">Dias</th>
                </tr>
              </thead>
              <tbody>
                {GAME_SLUGS.map((slug) => {
                  const game = GAMES[slug];
                  const dayNames = getDrawDayNames(game.drawDays);
                  const drawsToday = game.drawDays.includes(dayOfWeek);
                  return (
                    <tr
                      key={slug}
                      className={`border-b border-gray-100 ${drawsToday ? 'bg-emerald-50' : ''}`}
                    >
                      <td className="py-3 pr-4">
                        <Link
                          href={`/${slug}`}
                          className="text-emerald-600 hover:underline font-medium"
                        >
                          {game.emoji} {game.name}
                        </Link>
                        {drawsToday && (
                          <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                            Hoje
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">{game.drawTime}h</td>
                      <td className="py-3 text-gray-700">{dayNames.join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* How it works */}
        <section className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>ℹ️</span> Como Funciona
          </h2>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <p>Esta página verifica automaticamente os resultados a cada 10 segundos durante o horário dos sorteios (20:00-22:00).</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <p>Os dados vêm da API oficial da Caixa Econômica Federal. Em média, os resultados aparecem de 5 a 10 minutos após cada sorteio.</p>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <p>Fora do horário dos sorteios, a página mostra os últimos resultados disponíveis e a contagem regressiva para o próximo.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group rounded-xl border border-gray-200 bg-white transition-colors hover:border-gray-300"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-gray-800 [&::-webkit-details-marker]:hidden list-none">
                  <span>{item.question}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Resultados em Tempo Real das Loterias
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Acompanhar os sorteios em tempo real é a forma mais
              prática de saber se você ganhou. Esta página foi projetada
              para atualizar automaticamente durante os horários de
              sorteio, trazendo os números sorteados, premiação e
              número de ganhadores assim que são publicados pela Caixa.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="text-red-600 hover:underline font-medium">
              Todos os Resultados
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/conferidor" className="text-red-600 hover:underline font-medium">
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/quando-e-o-proximo-sorteio" className="text-red-600 hover:underline font-medium">
              Calendário de Sorteios
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/acumulados" className="text-red-600 hover:underline font-medium">
              Loterias Acumuladas
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
