import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME, DAYS_SHORT_PT, DAYS_PT } from '@/lib/constants';
import { fetchLatestResult, fetchRecentResults } from '@/lib/api/lottery';
import ResultCard from '@/components/ui/ResultCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import LotteryBall from '@/components/ui/LotteryBall';
import LiveResultPoller from '@/components/ui/LiveResultPoller';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>;
}): Promise<Metadata> {
  const { game: gameSlug } = await params;
  const game = GAMES[gameSlug];
  if (!game) return {};

  const now = new Date();
  const todayFormatted = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const title = `Resultado ${game.name} Hoje ${todayFormatted} - Último Concurso`;
  const description = `Resultado ${game.name} de hoje ${todayFormatted} atualizado. Confira os números sorteados, premiação e próximo concurso da ${game.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${game.slug}`,
      languages: {
        'pt-BR': `${SITE_URL}/${game.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${game.slug}`,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

function getNextDrawDate(drawDays: number[], drawTime: string): Date {
  const now = new Date();
  const [hours, minutes] = drawTime.split(':').map(Number);

  for (let i = 0; i <= 7; i++) {
    const candidate = new Date(now);
    candidate.setDate(candidate.getDate() + i);
    candidate.setHours(hours, minutes, 0, 0);

    if (drawDays.includes(candidate.getDay()) && candidate > now) {
      return candidate;
    }
  }

  const fallback = new Date(now);
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(hours, minutes, 0, 0);
  return fallback;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default async function GamePage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game: gameSlug } = await params;
  const game = GAMES[gameSlug];

  if (!game) {
    notFound();
  }

  const [latestResult, recentResults] = await Promise.all([
    fetchLatestResult(game.slug),
    fetchRecentResults(game.slug, 10),
  ]);

  const now = new Date();
  const todayFormatted = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const nextDrawDate = getNextDrawDate(game.drawDays, game.drawTime);
  const drawDaysText = game.drawDays.map((d) => DAYS_SHORT_PT[d]).join(', ');

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
        name: `Resultado ${game.name}`,
        item: `${SITE_URL}/${game.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Live Result Poller - polls every 10s during draw window */}
      <LiveResultPoller
        drawTime={game.drawTime}
        drawDays={game.drawDays}
        pollInterval={10000}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">

      {/* Hero Header */}
      <section
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${game.color}, ${game.color}dd)`,
        }}
      >
        <nav className="text-sm text-white/80 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">{game.name}</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Resultado {game.name} Hoje - {todayFormatted}
        </h1>
        <p className="text-white/90 text-lg">{game.description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
          <span>Sorteios: {drawDaysText}</span>
          <span>Horário: {game.drawTime} (Horário de Brasília)</span>
          <span>Aposta mínima: {game.minBet}</span>
        </div>
      </section>

      {/* Latest Result */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Último Resultado
        </h2>

        {latestResult ? (
          <ResultCard result={latestResult} game={game} showPrizes />
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
            <p>Resultado ainda não disponível. Tente novamente em breve.</p>
          </div>
        )}
      </section>

      {/* Next Draw Countdown */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Próximo Sorteio
        </h2>
        <CountdownTimer
          targetDate={nextDrawDate}
          label={`Próximo concurso da ${game.name}`}
        />
        {latestResult && latestResult.valorEstimadoProximoConcurso > 0 && (
          <p className="text-center mt-4 text-gray-600">
            Prêmio estimado:{' '}
            <span className="font-bold text-lg" style={{ color: game.color }}>
              {formatCurrency(latestResult.valorEstimadoProximoConcurso)}
            </span>
          </p>
        )}
      </section>

      {/* Recent Results */}
      {recentResults.length > 1 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Últimos Resultados
          </h2>
          <div className="space-y-3">
            {recentResults.slice(1).map((result) => (
              <Link
                key={result.concurso}
                href={`/${game.slug}/resultado/${result.concurso}`}
                className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      Concurso {result.concurso}
                    </span>
                    <span className="text-sm text-gray-500">{result.data}</span>
                  </div>
                  {result.acumulado && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      Acumulado
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {result.dezenas.map((dezena, index) => (
                    <LotteryBall
                      key={`${dezena}-${index}`}
                      number={dezena}
                      color={game.ballColor}
                      textColor={game.ballTextColor}
                      size={result.dezenas.length > 10 ? 'xs' : 'sm'}
                    />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {(() => {
        const drawDayNames = game.drawDays.map((d: number) => DAYS_PT[d]).join(', ');
        const faqItems = [
          {
            question: `Qual o resultado da ${game.name} de hoje?`,
            answer: `O resultado mais recente da ${game.name} é atualizado automaticamente após cada sorteio. Acompanhe esta página para conferir os números sorteados, a premiação e o número do concurso assim que disponíveis.`,
          },
          {
            question: `Quando é o próximo sorteio da ${game.name}?`,
            answer: `Os sorteios da ${game.name} acontecem às ${game.drawTime} (horário de Brasília) nos dias ${drawDayNames}. Confira o contador regressivo acima para saber exatamente quando será o próximo concurso.`,
          },
          {
            question: `Quanto custa apostar na ${game.name}?`,
            answer: `A aposta mínima da ${game.name} custa ${game.minBet}. É possível aumentar as chances de ganhar marcando mais números, o que eleva o valor da aposta proporcionalmente.`,
          },
          {
            question: `Qual a chance de ganhar na ${game.name}?`,
            answer: `A probabilidade de acertar o prêmio principal da ${game.name} é de ${game.odds}. Existem também faixas de premiação menores com chances mais altas de acerto.`,
          },
          {
            question: `Como jogar na ${game.name}?`,
            answer: `Na ${game.name}, você escolhe ${game.selectNumbers} números de 01 a ${game.maxNumber}. As apostas podem ser feitas em casas lotéricas ou pelo aplicativo e site da Caixa Econômica Federal.`,
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
          <section className="mb-8">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Perguntas Frequentes
              </h2>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group rounded-lg border border-gray-100 bg-gray-50 transition-colors hover:border-gray-200"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 font-medium text-gray-800 [&::-webkit-details-marker]:hidden list-none">
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
                    <p className="px-4 pb-4 text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* SEO Content */}
      <SEOContent className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Como Jogar na {game.name}
        </h2>
        <p className="text-gray-600 mb-4">
          Na {game.name}, você escolhe {game.selectNumbers} números de 01 a{' '}
          {game.maxNumber}. Os sorteios acontecem{' '}
          {drawDaysText} às {game.drawTime} (horário de Brasília).
          A aposta mínima custa {game.minBet}.
        </p>
        <p className="text-gray-600 mb-6">
          As chances de acertar o prêmio principal são de {game.odds}.
        </p>

        <Link
          href="/como-jogar"
          className="inline-flex items-center text-sm font-medium transition-colors hover:underline"
          style={{ color: game.color }}
        >
          Saiba mais sobre como jogar &rarr;
        </Link>

        {/* Odds Table */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Faixas de Premiação
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-2 font-semibold text-gray-700">Faixa</th>
                  <th className="pb-2 font-semibold text-gray-700">Acertos</th>
                  <th className="pb-2 font-semibold text-gray-700">Probabilidade</th>
                  <th className="pb-2 font-semibold text-gray-700 text-right">Premiação</th>
                </tr>
              </thead>
              <tbody>
                {game.prizeTiers.map((tier, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-2 text-gray-700 font-medium">{tier.faixa}</td>
                    <td className="py-2 text-gray-700">{tier.acertos}</td>
                    <td className="py-2 text-gray-700">{tier.probabilidade}</td>
                    <td className="py-2 text-gray-700 text-right">{tier.premio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/previsoes"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">🔮</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">Análise Estatística</p>
              <p className="text-xs text-gray-500">Análise estatística</p>
            </div>
          </Link>
          <Link
            href="/numeros-quentes-frios"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">🔥</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                Números Quentes e Frios
              </p>
              <p className="text-xs text-gray-500">Frequência dos números</p>
            </div>
          </Link>
          <Link
            href="/gerador"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">🎰</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                Gerador de Números
              </p>
              <p className="text-xs text-gray-500">Gere combinações aleatórias</p>
            </div>
          </Link>
          <Link
            href="/historico"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">📅</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">Histórico</p>
              <p className="text-xs text-gray-500">Resultados anteriores</p>
            </div>
          </Link>
        </div>
      </SEOContent>
      </div>
    </>
  );
}
