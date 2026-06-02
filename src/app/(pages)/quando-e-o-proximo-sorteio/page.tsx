import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS, DAYS_PT } from '@/lib/constants';
import { getNextDrawDate, getDrawDayNames } from '@/lib/utils/format';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';


export const metadata: Metadata = {
  title: 'Quando é o Próximo Sorteio? - Calendário das Loterias da Caixa',
  description:
    'Descubra quando é o próximo sorteio de cada loteria da Caixa. Calendário completo com dias, horários e contagem regressiva da Mega-Sena, Lotofácil, Quina e mais.',
  alternates: {
    canonical: '/quando-e-o-proximo-sorteio',
    languages: {
      'pt-BR': `${SITE_URL}/quando-e-o-proximo-sorteio`,
    },
  },
  openGraph: {
    title: 'Quando é o Próximo Sorteio? - Calendário das Loterias da Caixa',
    description:
      'Descubra quando é o próximo sorteio de cada loteria da Caixa. Calendário completo com contagem regressiva.',
    url: `${SITE_URL}/quando-e-o-proximo-sorteio`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Pr%C3%B3ximo%20Sorteio&color=%23059669', width: 1200, height: 630 }],
  },
};

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function ProximoSorteioPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Próximo Sorteio',
        item: `${SITE_URL}/quando-e-o-proximo-sorteio`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Que horas são os sorteios da Caixa?',
      answer:
        'Todos os sorteios das loterias da Caixa acontecem às 20h (horário de Brasília), de segunda a sábado. A transmissão é feita ao vivo pela internet e redes sociais da Caixa.',
    },
    {
      question: 'Tem sorteio de loteria no domingo?',
      answer:
        'Não. Nenhuma loteria da Caixa realiza sorteios aos domingos. Os sorteios acontecem de segunda a sábado.',
    },
    {
      question: 'Até que horas posso apostar para o sorteio de hoje?',
      answer:
        'As apostas para o sorteio do dia podem ser feitas até às 19h (horário de Brasília) em casas lotéricas. Pelo aplicativo ou internet banking, o horário limite pode variar.',
    },
    {
      question: 'Quando é a próxima Mega da Virada?',
      answer:
        'A Mega da Virada acontece sempre no dia 31 de dezembro de cada ano. É um concurso especial da Mega-Sena que não acumula.',
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Próximo Sorteio</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Quando é o Próximo Sorteio?
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Veja a contagem regressiva e o calendário de sorteios de todas as
            loterias da Caixa Econômica Federal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Countdown Timers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contagem Regressiva
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              const nextDraw = getNextDrawDate(game.drawDays, game.drawTime);
              const nextDrawDay = DAYS_PT[nextDraw.getDay()];
              const nextDrawFormatted = nextDraw.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                  </div>
                  <CountdownTimer
                    targetDate={nextDraw}
                    label={`${nextDrawDay}, ${nextDrawFormatted} às ${game.drawTime}h`}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Calendário Semanal de Sorteios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">
                    Loteria
                  </th>
                  {WEEKDAYS.map((day) => (
                    <th
                      key={day}
                      scope="col"
                      className="text-center py-3 px-2 font-semibold text-gray-900"
                    >
                      {day}
                    </th>
                  ))}
                  <th scope="col" className="text-center py-3 pl-4 font-semibold text-gray-900">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody>
                {GAME_SLUGS.map((slug) => {
                  const game = GAMES[slug];
                  return (
                    <tr key={slug} className="border-b border-gray-100">
                      <td className="py-3 pr-4">
                        <Link
                          href={`/${slug}`}
                          className="flex items-center gap-2 text-gray-900 hover:text-emerald-600 font-medium"
                        >
                          <span>{game.emoji}</span>
                          <span>{game.name}</span>
                        </Link>
                      </td>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                        <td key={dayIndex} className="text-center py-3 px-2">
                          {game.drawDays.includes(dayIndex) ? (
                            <span
                              className="inline-flex w-7 h-7 rounded-full items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: game.color }}
                            >
                              ✓
                            </span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      ))}
                      <td className="text-center py-3 pl-4 font-medium text-gray-700">
                        {game.drawTime}h
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
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
            Horários dos Sorteios das Loterias da Caixa
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Todos os sorteios das loterias da Caixa acontecem às 20h
              (horário de Brasília), de segunda a sábado. Não há sorteios aos
              domingos. A transmissão é feita ao vivo pela internet.
            </p>
            <p className="text-gray-600">
              As apostas podem ser feitas em casas lotéricas até às 19h do dia
              do sorteio, ou pelo aplicativo Loterias Caixa e internet banking.
              O valor mínimo para apostas online é de R$ 30,00 no carrinho.
            </p>
            <p className="text-gray-600">
              Os resultados são publicados neste site minutos após cada
              sorteio oficial. Ative as notificações para receber alertas
              automáticos quando novos resultados forem publicados.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/acumulados" className="text-emerald-600 hover:underline font-medium">
              Loterias Acumuladas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-emerald-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/conferidor" className="text-emerald-600 hover:underline font-medium">
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-emerald-600 hover:underline font-medium">
              Maiores Prêmios
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
