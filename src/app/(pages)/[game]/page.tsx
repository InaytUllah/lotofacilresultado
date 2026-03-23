import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, DAYS_SHORT_PT } from '@/lib/constants';
import { fetchLatestResult, fetchRecentResults } from '@/lib/api/lottery';
import ResultCard from '@/components/ui/ResultCard';
import CountdownTimer from '@/components/ui/CountdownTimer';
import SEOContent from '@/components/ui/SEOContent';
import LotteryBall from '@/components/ui/LotteryBall';

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

  const title = `Resultado ${game.name} Hoje - Ultimo Concurso Atualizado`;

  return {
    title,
    description: game.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${game.slug}`,
    },
    openGraph: {
      title,
      description: game.metaDescription,
      url: `${SITE_URL}/${game.slug}`,
      siteName: 'Resultados Mega Sena',
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

  const nextDrawDate = getNextDrawDate(game.drawDays, game.drawTime);
  const drawDaysText = game.drawDays.map((d) => DAYS_SHORT_PT[d]).join(', ');

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
                Inicio
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">{game.name}</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Resultado {game.name} Hoje
        </h1>
        <p className="text-white/90 text-lg">{game.description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
          <span>Sorteios: {drawDaysText}</span>
          <span>Horario: {game.drawTime} (Horario de Brasilia)</span>
          <span>Aposta minima: {game.minBet}</span>
        </div>
      </section>

      {/* Latest Result */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ultimo Resultado
        </h2>

        {latestResult ? (
          <ResultCard result={latestResult} game={game} showPrizes />
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
            <p>Resultado ainda nao disponivel. Tente novamente em breve.</p>
          </div>
        )}
      </section>

      {/* Next Draw Countdown */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Proximo Sorteio
        </h2>
        <CountdownTimer
          targetDate={nextDrawDate}
          label={`Proximo concurso da ${game.name}`}
        />
        {latestResult && latestResult.valorEstimadoProximoConcurso > 0 && (
          <p className="text-center mt-4 text-gray-600">
            Premio estimado:{' '}
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
            Ultimos Resultados
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
                <div className="flex flex-wrap gap-2">
                  {result.dezenas.map((dezena, index) => (
                    <LotteryBall
                      key={`${dezena}-${index}`}
                      number={dezena}
                      color={game.ballColor}
                      textColor={game.ballTextColor}
                      size="sm"
                    />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SEO Content */}
      <SEOContent className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Como Jogar na {game.name}
        </h2>
        <p className="text-gray-600 mb-4">
          Na {game.name}, voce escolhe {game.selectNumbers} numeros de 01 a{' '}
          {game.maxNumber}. Os sorteios acontecem{' '}
          {drawDaysText} as {game.drawTime} (horario de Brasilia).
          A aposta minima custa {game.minBet}.
        </p>
        <p className="text-gray-600 mb-6">
          As chances de acertar o premio principal sao de {game.odds}.
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
            Faixas de Premiacao
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-2 font-semibold text-gray-700">Faixa</th>
                </tr>
              </thead>
              <tbody>
                {game.prizeCategories.map((category, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    <td className="py-2 text-gray-700">{category}</td>
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
              <p className="font-medium text-gray-800 text-sm">Previsoes</p>
              <p className="text-xs text-gray-500">Analise estatistica</p>
            </div>
          </Link>
          <Link
            href="/numeros-quentes-frios"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">🔥</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                Numeros Quentes e Frios
              </p>
              <p className="text-xs text-gray-500">Frequencia dos numeros</p>
            </div>
          </Link>
          <Link
            href="/gerador"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">🎰</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                Gerador de Numeros
              </p>
              <p className="text-xs text-gray-500">Gere combinacoes aleatorias</p>
            </div>
          </Link>
          <Link
            href="/historico"
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors"
          >
            <span className="text-lg">📅</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">Historico</p>
              <p className="text-xs text-gray-500">Resultados anteriores</p>
            </div>
          </Link>
        </div>
      </SEOContent>
    </>
  );
}
