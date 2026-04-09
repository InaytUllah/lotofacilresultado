import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import { getNextDrawDate, getDrawDayNames } from '@/lib/utils/format';

import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import ChecklistItem from '@/components/ui/ChecklistItem';
import LiveResultPoller from '@/components/ui/LiveResultPoller';
import HomepageResults from '@/components/ui/HomepageResults';

// ISR: revalidate every 5 minutes — Vercel serves stale cache while rebuilding in background
export const revalidate = 300;

export const metadata: Metadata = {
  title:
    'Resultado Lotofácil Hoje — Mega-Sena, Quina e Loterias',
  description:
    'Resultados atualizados de todas as loterias da Caixa. Mega-Sena, Lotofácil, Quina, Lotomania e mais. Confira números sorteados e premiação.',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': SITE_URL,
    },
  },
  openGraph: {
    title: 'Resultado Lotofácil Hoje — Mega-Sena, Quina e Loterias',
    description: 'Resultados atualizados de todas as loterias da Caixa. Mega-Sena, Lotofácil, Quina, Lotomania e mais. Confira números sorteados e premiação.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Homepage FAQ items (static)
// ---------------------------------------------------------------------------

const HOMEPAGE_FAQ = [
  {
    question: 'Como são realizados os sorteios da Caixa?',
    answer: 'A Caixa Econômica Federal faz os sorteios ao vivo. As dezenas saem de globos mecânicos certificados. Os resultados são publicados em loterias.caixa.gov.br e aparecem aqui minutos depois.',
  },
  {
    question: 'Os resultados aqui são oficiais?',
    answer: 'Os dados vêm da API oficial da Caixa Econômica Federal. Números sorteados, premiação e ganhadores são os mesmos do resultado oficial.',
  },
  {
    question: 'Como conferir se minha aposta foi premiada?',
    answer: 'Use o Conferidor de Apostas. Informe os números jogados e o concurso. O sistema compara com o resultado oficial e mostra a faixa de premiação.',
  },
  {
    question: 'Qual loteria tem maior chance de ganhar?',
    answer: 'A Lotofácil, com chance de 1 em 3.268.760 para o prêmio principal. A Mega-Sena paga mais, mas a chance é de 1 em 50.063.860.',
  },
  {
    question: 'Com que frequência os resultados são atualizados?',
    answer: 'Em geral, dentro de 5 a 10 minutos após o fim de cada sorteio.',
  },
  {
    question: 'O que acontece quando o prêmio acumula?',
    answer: 'Se ninguém acerta o prêmio principal, o valor acumula para o concurso seguinte. O prêmio estimado do próximo concurso aparece aqui, calculado com base na arrecadação.',
  },
  {
    question: 'Como funciona a divisão do prêmio entre ganhadores?',
    answer: 'O prêmio bruto de cada faixa é dividido igualmente entre todos os apostadores que acertaram aquela faixa no mesmo concurso. Quanto mais ganhadores, menor o valor individual.',
  },
  {
    question: 'Como resgatar um prêmio de loteria?',
    answer: 'Até R$ 2.259,20: em qualquer lotérica. Acima disso: em agência da Caixa com documento de identidade. Acima de R$ 10.000,00: com agendamento. Prazo de 90 dias após o sorteio.',
  },
];

// ---------------------------------------------------------------------------
// Page Component — ISR cached, loading.tsx shows skeleton on cold cache
// ---------------------------------------------------------------------------

export default async function HomePage() {
  // FAQ schema (static, no API needed)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQ.map((item) => ({
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
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Live Result Poller */}
      <LiveResultPoller
        drawTime="21:00"
        drawDays={[0, 1, 2, 3, 4, 5, 6]}
        pollInterval={10000}
      />

      {/* Hero Section — renders INSTANTLY (no API needed) */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Resultados das Loterias da Caixa
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mb-6">
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

      {/* Results — fetched server-side, cached via ISR. loading.tsx shows skeleton on cold cache */}
      <div className="pt-8">
        <HomepageResults />
      </div>

      {/* Next Draws Countdown — renders INSTANTLY (no API needed) */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Próximos Sorteios
          </h2>
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

      {/* SEO Content — renders INSTANTLY (all static) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <SEOContent>
          <p className="text-gray-700 leading-relaxed mb-8">
            Milhões de brasileiros apostam nas loterias da Caixa Econômica
            Federal toda semana. Aqui você encontra os resultados de todas as
            modalidades logo após a apuração oficial.
          </p>

          {/* Draw Schedule Table */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Calendário de Sorteios
          </h3>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Loteria</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Dias de Sorteio</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Horário</th>
                  <th scope="col" className="text-left py-3 font-semibold text-gray-900">Aposta Mínima</th>
                </tr>
              </thead>
              <tbody>
                {GAME_SLUGS.map((slug) => {
                  const game = GAMES[slug];
                  const dayNames = getDrawDayNames(game.drawDays);
                  return (
                    <tr key={slug} className="border-b border-gray-100">
                      <td className="py-3 pr-4">
                        <Link
                          href={`/${slug}`}
                          className="text-emerald-600 hover:underline font-medium"
                        >
                          {game.emoji} {game.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-gray-700">{dayNames.join(', ')}</td>
                      <td className="py-3 pr-4 text-gray-700">{game.drawTime}h</td>
                      <td className="py-3 text-gray-700">{game.minBet}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* What you'll find here */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            O que você encontra aqui
          </h3>

          <div className="space-y-3 mb-6">
            <ChecklistItem>Resultados atualizados de todos os sorteios da Caixa</ChecklistItem>
            <ChecklistItem>Premiação detalhada com número de ganhadores por faixa</ChecklistItem>
            <ChecklistItem>Contagem regressiva para os próximos sorteios</ChecklistItem>
            <ChecklistItem>Estatísticas e análise de números quentes e frios</ChecklistItem>
            <ChecklistItem>Gerador de números aleatórios para suas apostas</ChecklistItem>
            <ChecklistItem>Histórico completo de resultados anteriores</ChecklistItem>
            <ChecklistItem>Conferidor automático de apostas</ChecklistItem>
            <ChecklistItem>Simulador para testar seus números em sorteios passados</ChecklistItem>
          </div>
        </SEOContent>
      </section>

      {/* FAQ Section — renders INSTANTLY (all static) */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes sobre Loterias
          </h2>
          <div className="space-y-3">
            {HOMEPAGE_FAQ.map((item, index) => (
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
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
