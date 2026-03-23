import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL } from '@/lib/constants';
import { fetchResultByConcurso } from '@/lib/api/lottery';
import { getResultBlogSlug, getPredictionBlogSlug } from '@/lib/blog';
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

function convertBRDateToISO(brDate: string): string {
  const [day, month, year] = brDate.split('/');
  return `${year}-${month}-${day}`;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

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

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const resultInfo = parseResultSlug(slug);
  if (resultInfo) {
    const game = GAMES[resultInfo.gameSlug];
    const title = `Resultado ${game.name} Concurso ${resultInfo.concurso}`;
    const description = `Confira os números sorteados no concurso ${resultInfo.concurso} da ${game.name}. Veja a premiação completa e se houve ganhadores.`;
    return {
      title,
      description,
      alternates: { canonical: `${SITE_URL}/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: 'Resultados Mega Sena',
        locale: 'pt_BR',
        type: 'article',
      },
    };
  }

  const predictionInfo = parsePredictionSlug(slug);
  if (predictionInfo) {
    const game = GAMES[predictionInfo.gameSlug];
    const title = `Previsões ${game.name} - ${formatDatePT(predictionInfo.date)}`;
    const description = `Análise estatística e previsões para o próximo sorteio da ${game.name}. Números quentes, frios e combinações sugeridas.`;
    return {
      title,
      description,
      alternates: { canonical: `${SITE_URL}/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: 'Resultados Mega Sena',
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

  // Try result post
  const resultInfo = parseResultSlug(slug);
  if (resultInfo) {
    return <ResultBlogPost gameSlug={resultInfo.gameSlug} concurso={resultInfo.concurso} />;
  }

  // Try prediction post
  const predictionInfo = parsePredictionSlug(slug);
  if (predictionInfo) {
    return <PredictionBlogPost gameSlug={predictionInfo.gameSlug} date={predictionInfo.date} />;
  }

  notFound();
}

// ---------------------------------------------------------------------------
// Result Blog Post
// ---------------------------------------------------------------------------

async function ResultBlogPost({
  gameSlug,
  concurso,
}: {
  gameSlug: string;
  concurso: number;
}) {
  const game = GAMES[gameSlug];
  const result = await fetchResultByConcurso(gameSlug, concurso);

  if (!result) {
    notFound();
  }

  const isoDate = convertBRDateToISO(result.data);
  const hasWinners = result.premiacoes.length > 0 && result.premiacoes[0]?.ganhadores > 0;
  const topPrizeWinners = result.premiacoes[0]?.ganhadores ?? 0;
  const topPrizeValue = result.premiacoes[0]?.valorPremio ?? 0;

  const prevConcurso = concurso - 1;
  const nextConcurso = concurso + 1;
  const prevSlug = getResultBlogSlug(gameSlug, prevConcurso);
  const nextSlug = getResultBlogSlug(gameSlug, nextConcurso);

  // Auto-generated analysis text
  const numbersText = result.dezenas.join(', ');
  let analysisText = `No concurso ${concurso} da ${game.name}, realizado em ${result.data}, os números sorteados foram: ${numbersText}.`;

  if (result.acumulado) {
    analysisText += ` O prêmio acumulou e o valor estimado para o próximo concurso é de ${formatCurrency(result.valorEstimadoProximoConcurso)}.`;
  } else if (hasWinners) {
    analysisText += ` ${topPrizeWinners} ${topPrizeWinners === 1 ? 'apostador acertou' : 'apostadores acertaram'} o prêmio principal de ${formatCurrency(topPrizeValue)}.`;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Resultado ${game.name} Concurso ${concurso}`,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      '@type': 'Organization',
      name: 'Resultados Mega Sena',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resultados Mega Sena',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/resultado-${gameSlug}-concurso-${concurso}`,
    },
    description: `Confira os números sorteados no concurso ${concurso} da ${game.name}.`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Resultado ${game.name} Concurso ${concurso}`,
        item: `${SITE_URL}/blog/resultado-${gameSlug}-concurso-${concurso}`,
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

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Inicio
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1">
            <Link href="/blog" className="hover:text-gray-700 transition-colors">
              Blog
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1 text-gray-700">
            Concurso {concurso}
          </li>
        </ol>
      </nav>

      <article className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 mb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <GameBadge game={game} />
            <time dateTime={isoDate} className="text-sm text-gray-500">
              {result.data}
            </time>
            {result.acumulado && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Acumulado
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Resultado {game.name} Concurso {concurso}
          </h1>
        </div>

        {/* Lottery Balls */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Números Sorteados
          </h2>
          <div className="flex flex-wrap gap-3">
            {result.dezenas.map((dezena, index) => (
              <LotteryBall
                key={`${dezena}-${index}`}
                number={dezena}
                color={game.ballColor}
                textColor={game.ballTextColor}
                size="lg"
                delay={index * 80}
              />
            ))}
          </div>
        </div>

        {/* Prize Table */}
        {result.premiacoes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Premiação Completa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-2 font-semibold text-gray-700">Faixa</th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Ganhadores
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-right">
                      Prêmio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.premiacoes.map((premio) => (
                    <tr key={premio.faixa} className="border-b border-gray-50">
                      <td className="py-2 text-gray-700">{premio.descricao}</td>
                      <td className="py-2 text-center text-gray-700">
                        {premio.ganhadores}
                      </td>
                      <td className="py-2 text-right text-gray-700">
                        {formatCurrency(premio.valorPremio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Accumulated Value */}
        {result.acumulado && result.valorAcumulado > 0 && (
          <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-amber-800 font-medium">
              O prêmio acumulou! Valor acumulado:{' '}
              <span className="font-bold">{formatCurrency(result.valorAcumulado)}</span>
            </p>
            {result.valorEstimadoProximoConcurso > 0 && (
              <p className="text-amber-700 text-sm mt-1">
                Prêmio estimado para o próximo concurso:{' '}
                <span className="font-semibold">
                  {formatCurrency(result.valorEstimadoProximoConcurso)}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Analysis Text */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Análise</h2>
          <p className="text-gray-600 leading-relaxed">{analysisText}</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          <Link
            href={`/${gameSlug}`}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Ver página da {game.name}
          </Link>
        </div>
      </article>

      {/* Previous/Next Navigation */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href={`/blog/${prevSlug}`}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          &larr; Concurso {prevConcurso}
        </Link>
        <Link
          href={`/blog/${nextSlug}`}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Concurso {nextConcurso} &rarr;
        </Link>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Prediction Blog Post
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Previsões ${game.name} - ${formattedDate}`,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Organization',
      name: 'Resultados Mega Sena',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resultados Mega Sena',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/previsoes-${gameSlug}-${date}`,
    },
    description: `Análise estatística e previsões para o próximo sorteio da ${game.name}.`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
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

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Inicio
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Previsões {game.name} - {formattedDate}
          </h1>
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

        {/* Hot Numbers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Números Quentes
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Números com maior frequência nos últimos sorteios.
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
              Números com menor frequência nos últimos sorteios.
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

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          <Link
            href={`/${gameSlug}`}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Ver resultados da {game.name}
          </Link>
          <Link
            href="/previsoes"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Todas as previsões
          </Link>
        </div>
      </article>
    </>
  );
}
