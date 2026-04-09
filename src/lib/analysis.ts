import { unstable_cache } from 'next/cache';
import type { LotteryResult, GameConfig } from './types';
import { fetchResultByConcurso } from './api/lottery';
import { SITE_URL } from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NumberFrequency {
  number: string;
  count: number;
  label: 'quente' | 'frio' | 'normal';
}

export interface DrawAnalysis {
  repeatedFromPrev: string[];
  prevConcurso: number | null;
  top3Frequent: { number: string; count: number }[];
  mostOverdue: { number: string; drawsAgo: number } | null;
  numberFrequencies: NumberFrequency[];
  relatedResults: {
    concurso: number;
    data: string;
    dezenas: string[];
  }[];
}

// ---------------------------------------------------------------------------
// Score a result page for content quality (0-100)
// ---------------------------------------------------------------------------

export function scoreResultPage(result: LotteryResult | null): number {
  if (!result) return 0;
  let score = 0;
  if (result.dezenas && result.dezenas.length > 0) score += 30;
  if (result.premiacoes && result.premiacoes.some((p) => p.ganhadores > 0)) score += 20;
  if (result.valorAcumulado > 0 || result.valorEstimadoProximoConcurso > 0) score += 10;
  if (result.valorEstimadoProximoConcurso > 0) score += 10;
  if (result.dezenas && result.dezenas.length > 0) score += 10; // non-empty draw
  if (result.data && result.data.length >= 8) score += 10;
  if (result.concurso > 0) score += 10;
  return score;
}

// ---------------------------------------------------------------------------
// Auto-generate meta description from API data
// ---------------------------------------------------------------------------

export function generateMetaDescription(
  result: LotteryResult,
  game: GameConfig,
): string {
  const nums = result.dezenas.join('-');
  const topTier = result.premiacoes?.[0];
  const winners = topTier?.ganhadores ?? 0;

  if (result.acumulado || winners === 0) {
    const next =
      result.valorEstimadoProximoConcurso > 0
        ? ` Próximo estimado em ${formatCompact(result.valorEstimadoProximoConcurso)}.`
        : '';
    const base = `Resultado ${game.name} concurso ${result.concurso} (${result.data}): ${nums}. Acumulou!${next}`;
    return base.length > 160 ? base.slice(0, 157) + '...' : base;
  }

  const prize = topTier ? formatCompact(topTier.valorPremio) : '';
  const base = `Resultado ${game.name} concurso ${result.concurso} (${result.data}): ${nums}. ${winners} ganhador(es), prêmio ${prize}. Premiação completa.`;
  return base.length > 160 ? base.slice(0, 157) + '...' : base;
}

function formatCompact(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)} mi`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)} mil`;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// ---------------------------------------------------------------------------
// Auto-generate JSON-LD schemas from result data
// ---------------------------------------------------------------------------

export function generateResultSchemas(
  result: LotteryResult,
  game: GameConfig,
  concurso: number,
) {
  const dateParts = result.data.split('/');
  const isoDate =
    dateParts.length === 3
      ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T21:00:00-03:00`
      : new Date().toISOString();

  // dateModified = today (content is continuously enriched with analysis)
  const todayISO = new Date().toISOString().split('T')[0] + 'T12:00:00-03:00';

  const pageUrl = `${SITE_URL}/${game.slug}/resultado/${concurso}`;
  const description = generateMetaDescription(result, game);
  const topTier = result.premiacoes?.[0];
  const winners = topTier?.ganhadores ?? 0;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: game.name, item: `${SITE_URL}/${game.slug}` },
      { '@type': 'ListItem', position: 3, name: `Concurso ${concurso}`, item: pageUrl },
    ],
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${game.name} — Concurso ${concurso}`,
    startDate: isoDate,
    endDate: isoDate,
    eventStatus: 'https://schema.org/EventMovedOnline',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: result.localSorteio || 'Espaço da Sorte',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Caixa Econômica Federal',
      url: 'https://loterias.caixa.gov.br',
    },
    description: `Resultado oficial do ${game.name} concurso ${concurso}. Números: ${result.dezenas.join(', ')}. ${winners > 0 ? `${winners} ganhador(es).` : 'Acumulou!'}`,
  };

  // Use Article (not NewsArticle) — these are reference pages, not breaking news
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Resultado ${game.name} Concurso ${concurso} — ${result.data}`,
    datePublished: isoDate,
    dateModified: todayISO,
    author: {
      '@type': 'Organization',
      name: 'Lotofácil Resultado',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lotofácil Resultado',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    description,
    mainEntityOfPage: pageUrl,
  };

  return { breadcrumbSchema, eventSchema, articleSchema };
}

// ---------------------------------------------------------------------------
// Fetch and compute draw analysis (cached forever per concurso)
// ---------------------------------------------------------------------------

export async function fetchDrawAnalysis(
  gameSlug: string,
  concurso: number,
  currentDezenas: string[],
  maxNumber: number,
): Promise<DrawAnalysis> {
  const cachedAnalysis = unstable_cache(
    async () => computeAnalysis(gameSlug, concurso, currentDezenas, maxNumber),
    [`analysis-${gameSlug}-${concurso}`],
    { revalidate: false, tags: [`analysis-${gameSlug}`] },
  );

  try {
    return await cachedAnalysis();
  } catch {
    return emptyAnalysis();
  }
}

async function computeAnalysis(
  gameSlug: string,
  concurso: number,
  currentDezenas: string[],
  maxNumber: number,
): Promise<DrawAnalysis> {
  // Fetch up to 5 previous draws + 2 next draws in parallel (reduced for performance)
  const toFetch: number[] = [];
  for (let i = 1; i <= 5; i++) {
    if (concurso - i > 0) toFetch.push(concurso - i);
  }
  // Also fetch 2 next concursos for related results
  toFetch.push(concurso + 1, concurso + 2);

  const fetched = await Promise.allSettled(
    toFetch.map((c) => fetchResultByConcurso(gameSlug, c)),
  );

  const resultMap = new Map<number, LotteryResult>();
  for (let i = 0; i < toFetch.length; i++) {
    const settled = fetched[i];
    if (settled.status === 'fulfilled' && settled.value) {
      resultMap.set(toFetch[i], settled.value);
    }
  }

  // 1. Numbers repeated from previous draw
  const prevResult = resultMap.get(concurso - 1);
  const repeatedFromPrev = prevResult
    ? currentDezenas.filter((d) => prevResult.dezenas.includes(d))
    : [];

  // 2. Top 3 most frequent in last 5 draws
  const last10: string[][] = [];
  for (let i = 1; i <= 10; i++) {
    const r = resultMap.get(concurso - i);
    if (r) last10.push(r.dezenas);
  }
  const freqMap = new Map<string, number>();
  for (const draw of last10) {
    for (const d of draw) {
      freqMap.set(d, (freqMap.get(d) || 0) + 1);
    }
  }
  const top3Frequent = [...freqMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([number, count]) => ({ number, count }));

  // 3. Most overdue number (not in last 5 draws)
  const lastN: Set<string> = new Set();
  for (let i = 1; i <= 5; i++) {
    const r = resultMap.get(concurso - i);
    if (r) r.dezenas.forEach((d) => lastN.add(d));
  }
  // Also include current draw
  currentDezenas.forEach((d) => lastN.add(d));

  let mostOverdue: { number: string; drawsAgo: number } | null = null;
  for (let n = 1; n <= maxNumber; n++) {
    const numStr = String(n).padStart(2, '0');
    if (!lastN.has(numStr)) {
      // Find how many draws ago it last appeared (check up to 5)
      let drawsAgo = 5;
      for (let i = 1; i <= 5; i++) {
        const r = resultMap.get(concurso - i);
        if (r && r.dezenas.includes(numStr)) {
          drawsAgo = i;
          break;
        }
      }
      if (!mostOverdue || drawsAgo > mostOverdue.drawsAgo) {
        mostOverdue = { number: numStr, drawsAgo };
      }
    }
  }

  // 4. Number frequencies for current draw numbers (in last 5 draws)
  const freq5 = new Map<string, number>();
  for (let i = 1; i <= 5; i++) {
    const r = resultMap.get(concurso - i);
    if (r) {
      for (const d of r.dezenas) {
        freq5.set(d, (freq5.get(d) || 0) + 1);
      }
    }
  }

  const numberFrequencies: NumberFrequency[] = currentDezenas.map((num) => {
    const count = freq5.get(num) || 0;
    let label: 'quente' | 'frio' | 'normal' = 'normal';
    if (count >= 3) label = 'quente';
    else if (count <= 1) label = 'frio';
    return { number: num, count, label };
  });

  // 5. Related results (3 prev + 2 next)
  const relatedConcursos = [
    concurso - 3, concurso - 2, concurso - 1,
    concurso + 1, concurso + 2,
  ];
  const relatedResults = relatedConcursos
    .map((c) => {
      const r = resultMap.get(c);
      if (!r) return null;
      return { concurso: r.concurso, data: r.data, dezenas: r.dezenas };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  return {
    repeatedFromPrev,
    prevConcurso: prevResult ? concurso - 1 : null,
    top3Frequent,
    mostOverdue,
    numberFrequencies,
    relatedResults,
  };
}

function emptyAnalysis(): DrawAnalysis {
  return {
    repeatedFromPrev: [],
    prevConcurso: null,
    top3Frequent: [],
    mostOverdue: null,
    numberFrequencies: [],
    relatedResults: [],
  };
}
