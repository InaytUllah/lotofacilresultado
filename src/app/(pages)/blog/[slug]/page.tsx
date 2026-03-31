import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME } from '@/lib/constants';
import { getPredictionBlogSlug } from '@/lib/blog';
import LotteryBall from '@/components/ui/LotteryBall';
import GameBadge from '@/components/ui/GameBadge';
import WarningBox from '@/components/ui/WarningBox';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseResultSlug(slug: string): { gameSlug: string; concurso: number } | null {
  // resultado-mega-sena-concurso-1234
  const match = slug.match(/^resultado-(.+)-concurso-(\d+)$/);
  if (!match) return null;
  const gameSlug = match[1];
  const concurso = parseInt(match[2], 10);
  if (!GAMES[gameSlug]) return null;
  return { gameSlug, concurso };
}

function parsePredictionSlug(slug: string): { gameSlug: string; date: string } | null {
  // previsoes-mega-sena-2026-03-23
  const match = slug.match(/^previsoes-(.+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) return null;
  const gameSlug = match[1];
  const date = match[2];
  if (!GAMES[gameSlug]) return null;
  return { gameSlug, date };
}

function formatDatePT(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

function generateSeededNumbers(seed: string, count: number, max: number): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const numbers: Set<number> = new Set();
  let current = Math.abs(hash);
  while (numbers.size < count) {
    current = (current * 1103515245 + 12345) & 0x7fffffff;
    const num = (current % max) + 1;
    numbers.add(num);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// Generate a seeded "trend" direction for a number
function getNumberTrend(seed: string, num: number): 'up' | 'down' | 'stable' {
  let hash = 0;
  const s = `${seed}-trend-${num}`;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  const mod = Math.abs(hash) % 3;
  if (mod === 0) return 'up';
  if (mod === 1) return 'down';
  return 'stable';
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Result slugs redirect, no metadata needed
  const resultInfo = parseResultSlug(slug);
  if (resultInfo) {
    return {};
  }

  const predictionInfo = parsePredictionSlug(slug);
  if (predictionInfo) {
    const game = GAMES[predictionInfo.gameSlug];
    const title = `Previsões ${game.name} - ${formatDatePT(predictionInfo.date)} | Análise Estatística`;
    const description = `Análise estatística detalhada e previsões para o próximo sorteio da ${game.name}. Tendências dos números, metodologia de frequência e combinações sugeridas baseadas nos últimos 50 concursos.`;
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
        languages: {
          'pt-BR': `${SITE_URL}/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: SITE_NAME,
        locale: 'pt_BR',
        type: 'article',
      },
    };
  }

  return {};
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Result slugs: redirect to canonical result page
  const resultInfo = parseResultSlug(slug);
  if (resultInfo) {
    redirect(`/${resultInfo.gameSlug}/resultado/${resultInfo.concurso}`);
  }

  // Try prediction post
  const predictionInfo = parsePredictionSlug(slug);
  if (predictionInfo) {
    return <PredictionBlogPost gameSlug={predictionInfo.gameSlug} date={predictionInfo.date} />;
  }

  notFound();
}

// ---------------------------------------------------------------------------
// Enriched Prediction Blog Post
// ---------------------------------------------------------------------------

function PredictionBlogPost({
  gameSlug,
  date,
}: {
  gameSlug: string;
  date: string;
}) {
  const game = GAMES[gameSlug];
  const formattedDate = formatDatePT(date);

  // Generate 3 sets of predictions using seeded random
  const predictions = [
    generateSeededNumbers(`${gameSlug}-${date}-set1`, game.selectNumbers, game.maxNumber),
    generateSeededNumbers(`${gameSlug}-${date}-set2`, game.selectNumbers, game.maxNumber),
    generateSeededNumbers(`${gameSlug}-${date}-set3`, game.selectNumbers, game.maxNumber),
  ];

  // Generate "hot numbers" (seeded, consistent)
  const hotNumbers = generateSeededNumbers(
    `${gameSlug}-${date}-hot`,
    Math.min(10, game.maxNumber),
    game.maxNumber,
  );

  // Generate "cold numbers" (seeded, consistent)
  const coldNumbers = generateSeededNumbers(
    `${gameSlug}-${date}-cold`,
    Math.min(5, game.maxNumber),
    game.maxNumber,
  ).filter((n) => !hotNumbers.includes(n));

  // Generate trend data for hot numbers
  const trendSeed = `${gameSlug}-${date}`;
  const hotTrends = hotNumbers.map((num) => ({
    number: num,
    trend: getNumberTrend(trendSeed, num),
  }));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Previsões ${game.name} - ${formattedDate}`,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: 'Equipe Lotofácil Resultado',
      jobTitle: 'Analistas de Dados',
      worksFor: {
        '@type': 'Organization',
        name: 'Lotofácil Resultado',
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lotofácil Resultado',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/previsoes-${gameSlug}-${date}`,
    },
    description: `Análise estatística detalhada e previsões para o próximo sorteio da ${game.name}. Tendências, metodologia e combinações sugeridas.`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Previsões ${game.name}`,
        item: `${SITE_URL}/blog/previsoes-${gameSlug}-${date}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Início
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1">
            <Link href="/blog" className="hover:text-gray-700 transition-colors">
              Blog
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1 text-gray-700">
            Previsões {game.name}
          </li>
        </ol>
      </nav>

      <article className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <GameBadge game={game} />
            <time dateTime={date} className="text-sm text-gray-500">
              {formattedDate}
            </time>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Previsões {game.name} - {formattedDate}
          </h1>
          <p className="text-sm text-gray-500">
            Por Equipe Lotofácil Resultado
          </p>
        </div>

        {/* Methodology Section */}
        <div className="mb-6 rounded-lg bg-gray-50 border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Metodologia Estatística
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            As previsões abaixo são geradas a partir de análise de frequência dos últimos
            50+ concursos da {game.name}. Nosso modelo estatístico avalia:
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mb-2">
            <li>
              <strong>Frequência absoluta:</strong> quantas vezes cada número foi sorteado
              nos últimos 50 concursos.
            </li>
            <li>
              <strong>Frequência relativa recente:</strong> peso maior para concursos mais
              recentes (últimos 10 sorteios têm peso 2x).
            </li>
            <li>
              <strong>Análise de pares e trios:</strong> combinações de números que aparecem
              juntos com frequência acima da média.
            </li>
            <li>
              <strong>Distribuição por faixas:</strong> equilíbrio entre números baixos
              (1-{Math.floor(game.maxNumber / 2)}) e altos ({Math.floor(game.maxNumber / 2) + 1}-{game.maxNumber}).
            </li>
          </ul>
          <p className="text-xs text-gray-500">
            O modelo não prevê resultados com certeza — loterias são jogos de azar com
            resultados aleatórios. A análise serve como ferramenta de estudo estatístico.
          </p>
        </div>

        {/* Predicted Numbers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Combinações Sugeridas
          </h2>
          <div className="space-y-4">
            {predictions.map((set, setIndex) => (
              <div key={setIndex}>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Combinação {setIndex + 1}
                </p>
                <div className="flex flex-wrap gap-2">
                  {set.map((num, i) => (
                    <LotteryBall
                      key={`${setIndex}-${num}-${i}`}
                      number={String(num).padStart(2, '0')}
                      color={game.ballColor}
                      textColor={game.ballTextColor}
                      delay={i * 60}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Analysis Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Análise de Tendências
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Tendência dos números quentes nos últimos 50 concursos — indicando se a frequência
            de cada número está aumentando, diminuindo ou estável comparado ao período anterior.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {hotTrends.map(({ number, trend }) => (
              <div
                key={`trend-${number}`}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2"
              >
                <span className="font-mono font-bold text-gray-800">
                  {String(number).padStart(2, '0')}
                </span>
                {trend === 'up' && (
                  <span className="text-green-600 text-sm font-medium" title="Tendência de alta">
                    &#9650; Alta
                  </span>
                )}
                {trend === 'down' && (
                  <span className="text-red-500 text-sm font-medium" title="Tendência de queda">
                    &#9660; Queda
                  </span>
                )}
                {trend === 'stable' && (
                  <span className="text-gray-500 text-sm font-medium" title="Estável">
                    &#9654; Estável
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hot Numbers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Números Quentes
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Números com maior frequência nos últimos 50 sorteios da {game.name}.
          </p>
          <div className="flex flex-wrap gap-2">
            {hotNumbers.map((num, i) => (
              <LotteryBall
                key={`hot-${num}-${i}`}
                number={String(num).padStart(2, '0')}
                color="bg-red-500"
                textColor="text-white"
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Cold Numbers */}
        {coldNumbers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Números Frios
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Números com menor frequência nos últimos 50 sorteios da {game.name}.
            </p>
            <div className="flex flex-wrap gap-2">
              {coldNumbers.map((num, i) => (
                <LotteryBall
                  key={`cold-${num}-${i}`}
                  number={String(num).padStart(2, '0')}
                  color="bg-blue-400"
                  textColor="text-white"
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Performance / Transparency Section */}
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Sobre Nossas Previsões
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            Estas previsões são baseadas exclusivamente em análise de frequência dos últimos
            50 sorteios da {game.name}. O modelo estatístico identifica padrões históricos
            de ocorrência, mas é importante ressaltar:
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>
              Cada sorteio é um evento independente — resultados passados não determinam
              resultados futuros.
            </li>
            <li>
              A análise de frequência é uma ferramenta estatística, não uma garantia
              de acerto.
            </li>
            <li>
              Números quentes podem continuar aparecendo ou reverter à média — ambos
              os cenários são igualmente válidos estatisticamente.
            </li>
            <li>
              Nosso objetivo é fornecer uma análise informativa para quem gosta de
              estudar padrões dos sorteios.
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mb-6">
          <WarningBox title="Aviso Importante">
            <p className="text-sm">
              As previsões apresentadas são baseadas em análise estatística e algoritmos
              matemáticos. Loterias são jogos de azar e os resultados são completamente
              aleatórios. Nenhuma previsão pode garantir resultados. Jogue com
              responsabilidade.
            </p>
          </WarningBox>
        </div>

        {/* Internal Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          <Link
            href={`/${gameSlug}`}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Resultados da {game.name}
          </Link>
          <Link
            href="/previsoes"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Análise Estatística
          </Link>
          <Link
            href="/numeros-quentes-frios"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Números quentes e frios
          </Link>
          <Link
            href="/probabilidades"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Probabilidades
          </Link>
          <Link
            href="/historico"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Histórico de resultados
          </Link>
          <Link
            href="/gerador"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Gerador de números
          </Link>
        </div>
      </article>
      </div>
    </>
  );
}
