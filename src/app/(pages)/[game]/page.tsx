import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME, DAYS_SHORT_PT, DAYS_PT } from '@/lib/constants';
import { fetchLatestResult, fetchRecentResults } from '@/lib/api/lottery';
import { LOTTERY_CONTENT } from '@/lib/lotteryContent';
import { fetchDrawAnalysis } from '@/lib/analysis';
import ResultCard from '@/components/ui/ResultCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import LotteryBall from '@/components/ui/LotteryBall';
import LiveResultPoller from '@/components/ui/LiveResultPoller';

export const revalidate = 300; // ISR: revalidate every 5 minutes
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
  const description = `Resultado ${game.name} de hoje ${todayFormatted} atualizado. Confira os números sorteados, premiação, ganhadores e análise estatística do último concurso.`;

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
    fetchRecentResults(game.slug, 5),
  ]);

  const now = new Date();
  const todayFormatted = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const lastResultDate = latestResult?.data || todayFormatted;

  const nextDrawDate = getNextDrawDate(game.drawDays, game.drawTime);
  const drawDaysText = game.drawDays.map((d) => DAYS_SHORT_PT[d]).join(', ');

  // Fetch analysis for latest result
  let analysis = null;
  if (latestResult) {
    try {
      analysis = await fetchDrawAnalysis(
        game.slug,
        latestResult.concurso,
        latestResult.dezenas,
        game.maxNumber,
      );
    } catch {
      // silently fail
    }
  }

  // Get lottery content
  const content = LOTTERY_CONTENT[gameSlug];

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

  // FAQ items
  const drawDayNames = game.drawDays.map((d: number) => DAYS_PT[d]).join(', ');
  const faqItems = [
    {
      question: `Qual o resultado da ${game.name} de hoje?`,
      answer: `O resultado da ${game.name} aparece aqui minutos após cada sorteio. Os números sorteados, a premiação e o concurso ficam disponíveis nesta página.`,
    },
    {
      question: `Quando é o próximo sorteio da ${game.name}?`,
      answer: `Os sorteios da ${game.name} acontecem às ${game.drawTime} (horário de Brasília), nos dias ${drawDayNames}. O contador regressivo acima mostra quanto falta.`,
    },
    {
      question: `Quanto custa apostar na ${game.name}?`,
      answer: `A aposta mínima da ${game.name} custa ${game.minBet}. Marcar mais números melhora as chances, mas a aposta fica mais cara.`,
    },
    {
      question: `Qual a chance de ganhar na ${game.name}?`,
      answer: `A chance de acertar o prêmio principal da ${game.name} é de ${game.odds}. Também há faixas menores com chances melhores.`,
    },
    {
      question: `Como jogar na ${game.name}?`,
      answer: `Escolha ${game.selectNumbers} números de 01 a ${game.maxNumber}. Dá para apostar em lotéricas ou pelo aplicativo e site da Caixa.`,
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

  // Recent results for "mini news" section
  const newsItems = recentResults.slice(0, 3);

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
          Resultado {game.name} - {lastResultDate}
        </h1>
        <p className="text-white/90 text-lg">{game.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
          <span>Sorteios: {drawDaysText}</span>
          <span>Horário: {game.drawTime} (Horário de Brasília)</span>
          <span>Aposta mínima: {game.minBet}</span>
          <span className="inline-flex items-center gap-1 bg-red-600 text-white rounded px-2 py-0.5 text-xs font-bold">
            18+ Jogue com responsabilidade
          </span>
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

      {/* ═══ ANÁLISE DO ÚLTIMO RESULTADO ═══ */}
      {latestResult && analysis && (
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Análise do Último Resultado
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Hot/cold from last draw */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Classificação dos números sorteados</p>
              <div className="flex flex-wrap gap-2">
                {analysis.numberFrequencies.map((nf) => (
                  <span
                    key={nf.number}
                    className={`inline-flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
                      nf.label === 'quente'
                        ? 'bg-red-100 text-red-700'
                        : nf.label === 'frio'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {nf.number}
                    {nf.label === 'quente' && ' 🔥'}
                    {nf.label === 'frio' && ' ❄️'}
                  </span>
                ))}
              </div>
            </div>

            {/* Prize status */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Status do prêmio principal</p>
              {latestResult.premiacoes?.[0]?.ganhadores > 0 ? (
                <div>
                  <p className="text-lg font-bold" style={{ color: game.color }}>
                    {latestResult.premiacoes[0].ganhadores} ganhador(es)
                  </p>
                  <p className="text-sm text-gray-600">
                    Prêmio de {formatCurrency(latestResult.premiacoes[0].valorPremio)} cada
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-bold text-amber-600">Acumulou!</p>
                  {latestResult.valorEstimadoProximoConcurso > 0 && (
                    <p className="text-sm text-gray-600">
                      Próximo estimado: {formatCurrency(latestResult.valorEstimadoProximoConcurso)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Repeated from previous */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Números repetidos do anterior</p>
              <p className="text-lg font-bold" style={{ color: game.color }}>
                {analysis.repeatedFromPrev.length > 0
                  ? `${analysis.repeatedFromPrev.length}: ${analysis.repeatedFromPrev.join(', ')}`
                  : 'Nenhum número repetiu'}
              </p>
            </div>

            {/* Top 3 frequent */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Mais frequentes (últimos 5)</p>
              {analysis.top3Frequent.length > 0 ? (
                <div className="flex gap-3">
                  {analysis.top3Frequent.map((nf) => (
                    <span key={nf.number} className="text-lg font-bold" style={{ color: game.color }}>
                      {nf.number} <span className="text-xs text-gray-500">({nf.count}x)</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">Dados insuficientes</p>
              )}
            </div>
          </div>
        </section>
      )}

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

      {/* ═══ ÚLTIMAS NOTÍCIAS (Mini News from recent draws) ═══ */}
      {newsItems.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Últimas Notícias da {game.name}
          </h2>
          <div className="space-y-3">
            {newsItems.map((item) => {
              const topTier = item.premiacoes?.[0];
              const winners = topTier?.ganhadores ?? 0;
              const totalDist = item.premiacoes.reduce(
                (s, p) => s + p.ganhadores * p.valorPremio, 0,
              );
              return (
                <Link
                  key={item.concurso}
                  href={`/${game.slug}/resultado/${item.concurso}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold text-gray-800 text-sm">
                    {game.name}: Concurso {item.concurso} tem{' '}
                    {winners > 0
                      ? `${winners} ganhador(es) e distribui ${formatCurrency(totalDist)}`
                      : 'prêmio acumulado'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Sorteio de {item.data} — Números: {item.dezenas.slice(0, 6).join(', ')}
                    {item.dezenas.length > 6 && ', ...'}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

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
      <section className="mb-8">
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

      {/* ═══ SOBRE A [LOTTERY] — RICH CONTENT SECTION ═══ */}
      {content && (
        <SEOContent className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sobre a {game.name}
          </h2>

          {/* Full description */}
          <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
            {content.fullDescription.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* How to play */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Como Jogar na {game.name}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-8">
            {content.howToPlay.split('\n').map((step, i) => {
              const text = step.replace(/^\d+\.\s*/, '');
              return <li key={i}>{text}</li>;
            })}
          </ol>

          {/* Prize structure */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Estrutura de Premiação
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {content.prizeStructure}
          </p>

          {/* Odds Table */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Faixas de Premiação
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th scope="col" className="pb-2 font-semibold text-gray-700">Faixa</th>
                    <th scope="col" className="pb-2 font-semibold text-gray-700">Acertos</th>
                    <th scope="col" className="pb-2 font-semibold text-gray-700">Probabilidade</th>
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

          {/* History */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            História da {game.name}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {content.drawHistory}
          </p>

          {/* Curiosities */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Curiosidades
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {content.curiosities}
          </p>

          {/* Internal Links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/previsoes"
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <span className="text-lg">🔮</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">Análise Estatística</p>
                <p className="text-xs text-gray-500">Análise estatística avançada</p>
              </div>
            </Link>
            <Link
              href="/numeros-quentes-frios"
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <span className="text-lg">🔥</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">Números Quentes e Frios</p>
                <p className="text-xs text-gray-500">Frequência dos números</p>
              </div>
            </Link>
            <Link
              href="/gerador"
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <span className="text-lg">🎰</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">Gerador de Números</p>
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
      )}

      </div>
    </>
  );
}
