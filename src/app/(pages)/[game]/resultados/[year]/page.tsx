import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME } from '@/lib/constants';
import { fetchLatestResult } from '@/lib/api/lottery';
import SEOContent from '@/components/ui/SEOContent';

// Static export: enumerate every game × year combo that should render.
// Yearly archives go back to 2010 (older lotteries have content from 2000s
// but truncating at 2010 keeps the build tight while covering all real
// indexable demand). Past years never change, so each year is built once
// and persisted via Cloudflare's edge cache.
export const dynamicParams = false;

export function generateStaticParams() {
  // Only the latest 3 years per game. Full 2010..now range hung the build
  // on Caixa API rate limits (153 routes × 1 fetch each). Past years rarely
  // get organic traffic; older ?year= URLs 404 (acceptable trade-off).
  const YEAR_END = new Date().getUTCFullYear();
  const YEAR_START = YEAR_END - 2;
  const params: { game: string; year: string }[] = [];
  for (const game of GAME_SLUGS) {
    for (let y = YEAR_START; y <= YEAR_END; y++) {
      params.push({ game, year: String(y) });
    }
  }
  return params;
}

function estimateDrawsPerYear(drawDaysPerWeek: number): number {
  return drawDaysPerWeek * 52;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; year: string }>;
}): Promise<Metadata> {
  const { game: gameSlug, year } = await params;
  const game = GAMES[gameSlug];
  const yearNum = parseInt(year, 10);

  if (!game || isNaN(yearNum) || yearNum < 2000 || yearNum > 2030) return {};

  const title = `Resultados ${game.name} ${year} - Todos os Concursos`;
  const description = `Todos os resultados da ${game.name} em ${year}. Confira os números sorteados, premiação completa e ganhadores de cada concurso do ano.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${game.slug}/resultados/${year}`,
      languages: {
        'pt-BR': `${SITE_URL}/${game.slug}/resultados/${year}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${game.slug}/resultados/${year}`,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

export default async function YearlyArchivePage({
  params,
}: {
  params: Promise<{ game: string; year: string }>;
}) {
  const { game: gameSlug, year } = await params;
  const game = GAMES[gameSlug];
  const yearNum = parseInt(year, 10);

  if (!game || isNaN(yearNum) || yearNum < 2000 || yearNum > 2030) {
    notFound();
  }

  const latestResult = await fetchLatestResult(game.slug);
  const currentYear = new Date().getFullYear();

  const drawsPerWeek = game.drawDays.length;
  const drawsPerYear = estimateDrawsPerYear(drawsPerWeek);

  let startConcurso: number;
  let endConcurso: number;

  if (latestResult) {
    const latestConcurso = latestResult.concurso;
    const yearsDiff = currentYear - yearNum;

    endConcurso = yearsDiff === 0
      ? latestConcurso
      : latestConcurso - (yearsDiff - 1) * drawsPerYear;
    startConcurso = endConcurso - drawsPerYear + 1;

    if (startConcurso < 1) startConcurso = 1;
    if (endConcurso < 1) endConcurso = 1;
  } else {
    startConcurso = 1;
    endConcurso = 1;
  }

  const concursos: number[] = [];
  for (let i = endConcurso; i >= startConcurso; i--) {
    concursos.push(i);
  }

  const prevYear = yearNum > 2000 ? yearNum - 1 : null;
  const nextYear = yearNum < currentYear ? yearNum + 1 : null;

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
        name: game.name,
        item: `${SITE_URL}/${game.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Resultados ${year}`,
        item: `${SITE_URL}/${game.slug}/resultados/${year}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">
              <Link href={`/${game.slug}`} className="hover:text-white transition-colors">
                {game.name}
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">Resultados {year}</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {game.emoji} Resultados {game.name} {year}
        </h1>
        <p className="text-white/90 text-lg">
          Todos os concursos da {game.name} realizados em {year}.
        </p>
      </section>

      {/* Year Navigation */}
      <div className="flex items-center justify-between mb-6">
        {prevYear ? (
          <Link
            href={`/${game.slug}/resultados/${prevYear}`}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            style={{ color: game.color }}
          >
            &larr; {prevYear}
          </Link>
        ) : (
          <span />
        )}
        <span className="text-lg font-bold text-gray-800">{year}</span>
        {nextYear ? (
          <Link
            href={`/${game.slug}/resultados/${nextYear}`}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            style={{ color: game.color }}
          >
            {nextYear} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Concurso Links Grid */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Concursos da {game.name} em {year}
        </h2>

        {concursos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum concurso encontrado para este período.
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Aproximadamente {concursos.length} concursos estimados.
              Clique em um concurso para ver o resultado completo.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {concursos.map((concurso) => (
                <Link
                  key={concurso}
                  href={`/${game.slug}/resultado/${concurso}`}
                  className="text-center px-2 py-2 rounded-lg border border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm transition-all text-sm font-medium"
                  style={{ color: game.color }}
                >
                  {concurso}
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Year Navigation (bottom) */}
      <div className="flex items-center justify-between mb-8">
        {prevYear ? (
          <Link
            href={`/${game.slug}/resultados/${prevYear}`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <span aria-hidden="true">&larr;</span>
            {prevYear}
          </Link>
        ) : (
          <div />
        )}
        {nextYear ? (
          <Link
            href={`/${game.slug}/resultados/${nextYear}`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            {nextYear}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Other Games */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Resultados {year} &mdash; Outras Loterias
        </h2>
        <div className="flex flex-wrap gap-2">
          {GAME_SLUGS.filter((s) => s !== game.slug).map((slug) => {
            const g = GAMES[slug];
            return (
              <Link
                key={slug}
                href={`/${slug}/resultados/${year}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <span>{g.emoji}</span>
                <span>{g.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Other Years */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Outros Anos &mdash; {game.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i).map(
            (y) => (
              <Link
                key={y}
                href={`/${game.slug}/resultados/${y}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  y === yearNum
                    ? 'text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={y === yearNum ? { backgroundColor: game.color } : undefined}
              >
                {y}
              </Link>
            ),
          )}
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Resultados da {game.name} em {year}
        </h2>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
          <p>
            Nesta página você encontra todos os resultados dos concursos da{' '}
            <strong>{game.name}</strong> realizados no ano de <strong>{year}</strong>.
            A {game.name} realiza sorteios {game.drawDays.length} vezes por semana,
            totalizando aproximadamente {drawsPerYear} concursos por ano.
          </p>
          <p>
            Clique no número de qualquer concurso para ver o resultado completo,
            incluindo os números sorteados, premiação, quantidade de
            ganhadores e valor acumulado. Os resultados são atualizados
            automaticamente após cada sorteio.
          </p>
          <p>
            A {game.name} é uma das loterias mais populares do Brasil, operada pela
            Caixa Econômica Federal. {game.description} Para jogar, você escolhe{' '}
            {game.selectNumbers} números de 1 a {game.maxNumber}. As apostas
            podem ser feitas em casas lotéricas ou pelo site da Caixa.
          </p>
        </div>
      </SEOContent>
      </div>
    </>
  );
}
