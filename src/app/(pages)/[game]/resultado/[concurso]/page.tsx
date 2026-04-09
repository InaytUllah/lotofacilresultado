import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME, DAYS_PT } from '@/lib/constants';
import { fetchResultByConcurso } from '@/lib/api/lottery';
import {
  fetchDrawAnalysis,
  generateMetaDescription,
  generateResultSchemas,
  scoreResultPage,
} from '@/lib/analysis';
import { LOTTERY_CONTENT, PRIZE_REDEMPTION } from '@/lib/lotteryContent';
import LotteryBall from '@/components/ui/LotteryBall';

export const revalidate = 300; // ISR: revalidate every 5 minutes (result pages change less often)
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; concurso: string }>;
}): Promise<Metadata> {
  const { game: gameSlug, concurso } = await params;
  const game = GAMES[gameSlug];
  if (!game) return {};

  const concursoNum = parseInt(concurso, 10);
  if (isNaN(concursoNum) || concursoNum <= 0) return {};

  let result;
  try {
    result = await fetchResultByConcurso(game.slug, concursoNum);
  } catch {
    // fallback
  }

  const pageUrl = `${SITE_URL}/${game.slug}/resultado/${concurso}`;

  const title = result
    ? `${game.name} Concurso ${concurso} — ${result.data} | Resultado Oficial`
    : `Resultado ${game.name} Concurso ${concurso} - Números Sorteados`;

  const description = result
    ? generateMetaDescription(result, game)
    : `Confira o resultado do concurso ${concurso} da ${game.name}. Números sorteados, premiação completa e ganhadores.`;

  const score = scoreResultPage(result ?? null);
  const robotsDirective = score >= 50
    ? { index: true, follow: true }
    : { index: false, follow: true };

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: { 'pt-BR': pageUrl },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'article',
    },
    robots: robotsDirective,
    other: {
      ...(concursoNum > 1 && {
        'link-prev': `${SITE_URL}/${game.slug}/resultado/${concursoNum - 1}`,
      }),
      'link-next': `${SITE_URL}/${game.slug}/resultado/${concursoNum + 1}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function parseDrawDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ConcursoPage({
  params,
}: {
  params: Promise<{ game: string; concurso: string }>;
}) {
  const { game: gameSlug, concurso: concursoParam } = await params;
  const game = GAMES[gameSlug];

  if (!game || !GAME_SLUGS.includes(gameSlug)) {
    notFound();
  }

  const concurso = parseInt(concursoParam, 10);
  if (isNaN(concurso) || concurso <= 0) {
    notFound();
  }

  const result = await fetchResultByConcurso(game.slug, concurso);
  if (!result) {
    notFound();
  }

  // Fetch analysis data
  const analysis = await fetchDrawAnalysis(
    game.slug,
    concurso,
    result.dezenas,
    game.maxNumber,
  );

  // Generate JSON-LD schemas
  const { breadcrumbSchema, eventSchema, articleSchema } =
    generateResultSchemas(result, game, concurso);

  // Prize totals
  const totalDistributed = result.premiacoes.reduce(
    (sum, p) => sum + p.ganhadores * p.valorPremio,
    0,
  );
  const topTier = result.premiacoes[0];
  const topTierWinners = topTier?.ganhadores ?? 0;

  const prevConcurso = concurso - 1;
  const nextConcurso = concurso + 1;

  // Lottery content for curiosity facts
  const content = LOTTERY_CONTENT[gameSlug];
  const factIndex = content ? concurso % content.facts.length : 0;
  const curiosityFact = content ? content.facts[factIndex] : null;

  // Calculate prize redemption deadline
  const drawDate = parseDrawDate(result.data);
  const deadlineDate = new Date(drawDate);
  deadlineDate.setDate(deadlineDate.getDate() + PRIZE_REDEMPTION.deadline);
  const deadlineFormatted = deadlineDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Day of week for historical context
  const drawDayOfWeek = DAYS_PT[drawDate.getDay()]?.toLowerCase() || '';

  // Build historical context paragraph
  const historicalContext = (() => {
    const parts: string[] = [];
    parts.push(
      `O concurso ${concurso} da ${game.name} foi realizado em ${drawDayOfWeek}, ${result.data}.`,
    );

    if (topTierWinners > 0) {
      parts.push(
        `${topTierWinners} apostador(es) acertou(aram) o prêmio principal e cada um recebeu ${formatCurrency(topTier.valorPremio)}.`,
      );
      parts.push(
        'Os ganhadores podem resgatar o prêmio em qualquer agência da Caixa ou unidade lotérica em até 90 dias.',
      );
    } else {
      parts.push(
        'O prêmio principal não foi ganho e acumulou para o concurso seguinte.',
      );
      if (result.valorEstimadoProximoConcurso > 0) {
        parts.push(
          `O concurso ${nextConcurso} tem prêmio estimado em ${formatCurrency(result.valorEstimadoProximoConcurso)}.`,
        );
      }
    }

    if (totalDistributed > 0) {
      parts.push(
        `No total, ${formatCurrency(totalDistributed)} foram distribuídos entre todas as faixas de premiação neste concurso.`,
      );
    }

    parts.push(
      `A aposta mínima da ${game.name} custa ${game.minBet} e a probabilidade de acertar o prêmio principal é de ${game.odds}.`,
    );

    return parts.join(' ');
  })();

  return (
    <>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, eventSchema, articleSchema]),
        }}
      />

      {/* Prev/Next link tags */}
      {prevConcurso > 0 && (
        <link
          rel="prev"
          href={`${SITE_URL}/${game.slug}/resultado/${prevConcurso}`}
        />
      )}
      <link
        rel="next"
        href={`${SITE_URL}/${game.slug}/resultado/${nextConcurso}`}
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
              <Link
                href={`/${game.slug}`}
                className="hover:text-gray-700 transition-colors"
              >
                {game.name}
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1 text-gray-700 font-medium">
              Concurso {concurso}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <section
          className="rounded-2xl p-6 sm:p-8 mb-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${game.color}, ${game.color}dd)`,
          }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Resultado {game.name} — Concurso {concurso}
          </h1>
          <p className="text-white/80">
            Data do sorteio: {result.data}
            {result.localSorteio && ` | ${result.localSorteio}`}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {result.acumulado && (
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white/20">
                Acumulado
              </span>
            )}
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white">
              18+ Jogue com responsabilidade
            </span>
          </div>
        </section>

        {/* Lottery Balls */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Números Sorteados
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {result.dezenas.map((dezena, index) => (
              <LotteryBall
                key={`${dezena}-${index}`}
                number={dezena}
                color={game.ballColor}
                textColor={game.ballTextColor}
                size="lg"
                delay={index * 100}
              />
            ))}
          </div>

          {result.mesSorte && (
            <p className="text-center mt-4 text-gray-600">
              Mês da Sorte:{' '}
              <span className="font-bold" style={{ color: game.color }}>
                {result.mesSorte}
              </span>
            </p>
          )}
          {result.timeCoracao && (
            <p className="text-center mt-4 text-gray-600">
              Time do Coração:{' '}
              <span className="font-bold" style={{ color: game.color }}>
                {result.timeCoracao}
              </span>
            </p>
          )}

          {result.dezenasOrdemSorteio && result.dezenasOrdemSorteio.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2 text-center">Ordem de sorteio</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {result.dezenasOrdemSorteio.map((dezena, index) => (
                  <span
                    key={`ordem-${dezena}-${index}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-semibold"
                    style={{ borderColor: game.color, color: game.color }}
                  >
                    {dezena}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Accumulated Value */}
        {result.acumulado && result.valorAcumulado > 0 && (
          <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-gray-700 mb-1">
              Ninguém acertou. O prêmio acumulou para:
            </p>
            <p className="text-3xl font-bold text-amber-600">
              {formatCurrency(result.valorAcumulado)}
            </p>
            {result.valorEstimadoProximoConcurso > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Estimativa próximo concurso:{' '}
                {formatCurrency(result.valorEstimadoProximoConcurso)}
              </p>
            )}
          </section>
        )}

        {/* Winners Table */}
        {result.premiacoes.length > 0 && (
          <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Premiação Completa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-gray-200">
                    <th className="pb-3 font-semibold text-gray-700">Faixa</th>
                    <th className="pb-3 font-semibold text-gray-700 text-center">Ganhadores</th>
                    <th className="pb-3 font-semibold text-gray-700 text-right">Prêmio</th>
                  </tr>
                </thead>
                <tbody>
                  {result.premiacoes.map((premio) => (
                    <tr
                      key={premio.faixa}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 text-gray-800 font-medium">
                        {premio.descricao}
                      </td>
                      <td className="py-3 text-center">
                        {premio.ganhadores > 0 ? (
                          <span className="font-semibold" style={{ color: game.color }}>
                            {premio.ganhadores.toLocaleString('pt-BR')}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Não houve ganhadores
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right text-gray-800">
                        {formatCurrency(premio.valorPremio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {totalDistributed > 0 && (
                  <tfoot>
                    <tr className="border-t-2 border-gray-200">
                      <td className="pt-3 font-bold text-gray-900" colSpan={2}>
                        Total Distribuído
                      </td>
                      <td className="pt-3 text-right font-bold text-gray-900">
                        {formatCurrency(totalDistributed)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </section>
        )}

        {/* ═══ CONTEXTO HISTÓRICO ═══ */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Contexto Histórico
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {historicalContext}
          </p>
        </section>

        {/* Análise do Concurso */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Análise do Concurso
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Números repetidos do concurso anterior
              </p>
              <p className="text-lg font-bold" style={{ color: game.color }}>
                {analysis.repeatedFromPrev.length > 0
                  ? `${analysis.repeatedFromPrev.length} número(s): ${analysis.repeatedFromPrev.join(', ')}`
                  : 'Nenhum número repetiu'}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Mais frequentes nos últimos 5 concursos
              </p>
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

            {analysis.mostOverdue && (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Número mais atrasado
                </p>
                <p className="text-lg font-bold" style={{ color: game.color }}>
                  {analysis.mostOverdue.number}{' '}
                  <span className="text-xs text-gray-500">
                    ({analysis.mostOverdue.drawsAgo}+ concursos sem sair)
                  </span>
                </p>
              </div>
            )}

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Prêmio principal
              </p>
              <p className="text-lg font-bold" style={{ color: game.color }}>
                {topTierWinners > 0
                  ? `${topTierWinners} ganhador(es) — ${formatCurrency(topTier.valorPremio)} cada`
                  : 'Não houve ganhador — acumulou!'}
              </p>
            </div>
          </div>
        </section>

        {/* Números em Destaque */}
        {analysis.numberFrequencies.length > 0 && (
          <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Números em Destaque
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Frequência de cada número sorteado nos últimos 5 concursos da {game.name}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {analysis.numberFrequencies.map((nf) => (
                <div
                  key={nf.number}
                  className={`flex flex-col items-center rounded-xl p-3 min-w-[70px] border ${
                    nf.label === 'quente'
                      ? 'border-red-200 bg-red-50'
                      : nf.label === 'frio'
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span className="text-xl font-bold" style={{ color: game.color }}>
                    {nf.number}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{nf.count}x em 5</span>
                  {nf.label === 'quente' && (
                    <span className="text-xs font-semibold text-red-600 mt-0.5">Quente 🔥</span>
                  )}
                  {nf.label === 'frio' && (
                    <span className="text-xs font-semibold text-blue-600 mt-0.5">Frio ❄️</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ VOCÊ SABIA? — CURIOSITY BLOCK ═══ */}
        {curiosityFact && (
          <section className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-lg font-bold text-emerald-800 mb-2 flex items-center gap-2">
              <span>💡</span> Você sabia?
            </h2>
            <p className="text-emerald-700 leading-relaxed">
              {curiosityFact}
            </p>
          </section>
        )}

        {/* ═══ COMO RESGATAR SEU PRÊMIO ═══ */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Como Resgatar seu Prêmio
          </h2>
          <div className="space-y-3 mb-4">
            {PRIZE_REDEMPTION.tiers.map((tier, i) => (
              <div key={i} className="rounded-lg bg-gray-50 p-4">
                <p className="font-semibold text-gray-800 text-sm mb-1">{tier.range}</p>
                <p className="text-sm text-gray-600">{tier.where}</p>
                <p className="text-xs text-gray-500 mt-1">Documentos: {tier.docs}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              <strong>Prazo para resgate deste concurso:</strong>{' '}
              {deadlineFormatted} (90 dias corridos após o sorteio).
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {PRIZE_REDEMPTION.taxInfo}
            </p>
          </div>
        </section>

        {/* Concursos Relacionados */}
        {analysis.relatedResults.length > 0 && (
          <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Concursos Relacionados
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-gray-200">
                    <th className="pb-2 font-semibold text-gray-700">Concurso</th>
                    <th className="pb-2 font-semibold text-gray-700">Data</th>
                    <th className="pb-2 font-semibold text-gray-700">Números</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.relatedResults.map((rel) => (
                    <tr
                      key={rel.concurso}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        rel.concurso === concurso ? 'bg-emerald-50 font-bold' : ''
                      }`}
                    >
                      <td className="py-2">
                        <Link
                          href={`/${game.slug}/resultado/${rel.concurso}`}
                          className="font-medium hover:underline"
                          style={{ color: game.color }}
                        >
                          {rel.concurso}
                        </Link>
                      </td>
                      <td className="py-2 text-gray-600">{rel.data}</td>
                      <td className="py-2 text-gray-700">
                        {rel.dezenas.slice(0, 6).join(', ')}
                        {rel.dezenas.length > 6 && ', ...'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* YouTube Draw Video */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Transmissão Oficial do Sorteio
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Assista à transmissão oficial do sorteio do Concurso {concurso} da{' '}
            {game.name} no canal da Caixa Econômica Federal.
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=resultado+${game.apiName}+concurso+${concurso}+caixa`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Assistir no YouTube
          </a>
        </div>

        {/* Previous / Next Navigation */}
        <section className="mb-8 flex items-center justify-between gap-4">
          {prevConcurso > 0 ? (
            <Link
              href={`/${game.slug}/resultado/${prevConcurso}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span aria-hidden="true">&larr;</span>
              Concurso {prevConcurso}
            </Link>
          ) : (
            <div />
          )}
          <Link
            href={`/${game.slug}/resultado/${nextConcurso}`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            Concurso {nextConcurso}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>

        {/* Share Section */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Compartilhe este resultado
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Envie o resultado do concurso {concurso} da {game.name} para seus amigos
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={`https://wa.me/?text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')} - Confira em ${SITE_URL}/${game.slug}/resultado/${concurso}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${SITE_URL}/${game.slug}/resultado/${concurso}&text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            >
              Telegram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')}&url=${SITE_URL}/${game.slug}/resultado/${concurso}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
            >
              X / Twitter
            </a>
          </div>
        </section>

        {/* Back to game link */}
        <div className="text-center">
          <Link
            href={`/${game.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
            style={{ color: game.color }}
          >
            &larr; Ver todos os resultados da {game.name}
          </Link>
        </div>
      </div>
    </>
  );
}
