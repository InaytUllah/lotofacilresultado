import { unstable_cache } from 'next/cache';
import { LotteryResult, Prize } from '../types';
import { GAMES, GAME_SLUGS } from '../constants';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const HEADERS: HeadersInit = {
  'User-Agent': USER_AGENT,
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  Referer: 'https://loterias.caixa.gov.br/',
};

// ---------------------------------------------------------------------------
// Normalize raw API responses into our LotteryResult shape
// ---------------------------------------------------------------------------

function normalizePrizes(raw: any): Prize[] {
  if (!raw) return [];

  // Primary API format
  if (Array.isArray(raw.listaRateioPremio)) {
    return raw.listaRateioPremio.map((p: any, i: number) => ({
      descricao: p.descricaoFaixa ?? p.descricao ?? `Faixa ${i + 1}`,
      faixa: p.faixa ?? i + 1,
      ganhadores: p.numeroDeGanhadores ?? p.ganhadores ?? 0,
      valorPremio: p.valorPremio ?? 0,
    }));
  }

  // Fallback format
  if (Array.isArray(raw.premiacoes)) {
    return raw.premiacoes.map((p: any, i: number) => ({
      descricao: p.descricao ?? `Faixa ${i + 1}`,
      faixa: p.faixa ?? i + 1,
      ganhadores: p.ganhadores ?? 0,
      valorPremio: p.valorPremio ?? 0,
    }));
  }

  return [];
}

function normalizeResult(raw: any): LotteryResult | null {
  if (!raw || (!raw.numero && !raw.concurso)) return null;

  try {
    const dezenas: string[] =
      raw.listaDezenas ??
      raw.dezenas ??
      raw.dezenasSorteadasOrdemSorteio ??
      [];

    const dezenasOrdem: string[] | undefined =
      raw.dezenasSorteadasOrdemSorteio ?? raw.dezenasOrdemSorteio ?? undefined;

    const premiacoes = normalizePrizes(raw);

    return {
      concurso: raw.numero ?? raw.concurso,
      data: raw.dataApuracao ?? raw.data ?? '',
      dezenas: dezenas.map((d: string) => String(d).padStart(2, '0')),
      dezenasOrdemSorteio: dezenasOrdem
        ? dezenasOrdem.map((d: string) => String(d).padStart(2, '0'))
        : undefined,
      premiacoes,
      acumulado: raw.acumulado ?? false,
      valorAcumulado:
        raw.valorAcumuladoConcursoEspecial ??
        raw.valorAcumuladoConcurso_0_5 ??
        raw.valorAcumuladoProximoConcurso ??
        raw.valorAcumulado ??
        0,
      valorEstimadoProximoConcurso:
        raw.valorEstimadoProximoConcurso ?? raw.valorEstimado ?? 0,
      dataProximoConcurso: raw.dataProximoConcurso ?? undefined,
      localSorteio: raw.localSorteio ?? raw.local ?? undefined,
      mesSorte: raw.nomeTimeCoracaoMesSorte ?? raw.mesSorte ?? undefined,
      timeCoracao: raw.nomeTimeCoracaoMesSorte ?? raw.timeCoracao ?? undefined,
      tpiConcurso: raw.tpiConcurso ?? undefined,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Raw fetch helpers with 3 fallback sources
// ---------------------------------------------------------------------------

async function fetchWithTimeout(
  url: string,
  timeoutMs = 10000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers: HEADERS,
      signal: controller.signal,
      cache: 'no-store',
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRaw(
  apiName: string,
  concurso?: number,
): Promise<any | null> {
  const urls = buildUrls(apiName, concurso);

  for (const url of urls) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && (data.numero || data.concurso || data.dezenas)) {
        return data;
      }
    } catch {
      // try next source
    }
  }

  return null;
}

function buildUrls(apiName: string, concurso?: number): string[] {
  // Primary: public mirror API (works globally, no geo-blocking)
  const primary = concurso
    ? `https://loteriascaixa-api.herokuapp.com/api/${apiName}/${concurso}`
    : `https://loteriascaixa-api.herokuapp.com/api/${apiName}/latest`;

  // Fallback 1: Caixa direct API (may be geo-blocked outside Brazil)
  const fallback1 = concurso
    ? `https://servicebus2.caixa.gov.br/portaldeloterias/api/${apiName}/${concurso}`
    : `https://servicebus2.caixa.gov.br/portaldeloterias/api/${apiName}/`;

  // Fallback 2: Caixa alternate endpoint
  const fallback2 = concurso
    ? `https://loterias.caixa.gov.br/Servicos/Geral/Resultado?loteria=${apiName}&concurso=${concurso}`
    : `https://loterias.caixa.gov.br/Servicos/Geral/Resultado?loteria=${apiName}&concurso=`;

  return [primary, fallback1, fallback2];
}

// ---------------------------------------------------------------------------
// Cached public API
// ---------------------------------------------------------------------------

function getGameConfig(gameSlug: string) {
  const config = GAMES[gameSlug];
  if (!config) {
    throw new Error(`Unknown game slug: ${gameSlug}`);
  }
  return config;
}

export async function fetchLatestResult(
  gameSlug: string,
): Promise<LotteryResult | null> {
  const config = getGameConfig(gameSlug);

  const cachedFetch = unstable_cache(
    async () => {
      const raw = await fetchRaw(config.apiName);
      return normalizeResult(raw);
    },
    [`lottery-latest-${gameSlug}`],
    { revalidate: 60, tags: [`lottery-${gameSlug}`, 'lottery-all'] },
  );

  try {
    return await cachedFetch();
  } catch {
    return null;
  }
}

export async function fetchResultByConcurso(
  gameSlug: string,
  concurso: number,
): Promise<LotteryResult | null> {
  const config = getGameConfig(gameSlug);

  const cachedFetch = unstable_cache(
    async () => {
      const raw = await fetchRaw(config.apiName, concurso);
      return normalizeResult(raw);
    },
    [`lottery-concurso-${gameSlug}-${concurso}`],
    {
      revalidate: 60,
      tags: [`lottery-${gameSlug}`, `lottery-concurso-${concurso}`],
    },
  );

  try {
    return await cachedFetch();
  } catch {
    return null;
  }
}

export async function fetchMultipleLatestResults(): Promise<
  Record<string, LotteryResult | null>
> {
  const entries = await Promise.all(
    GAME_SLUGS.map(async (slug) => {
      const result = await fetchLatestResult(slug);
      return [slug, result] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export async function fetchRecentResults(
  gameSlug: string,
  count: number,
): Promise<LotteryResult[]> {
  const latest = await fetchLatestResult(gameSlug);
  if (!latest) return [];

  const latestConcurso = latest.concurso;
  const results: LotteryResult[] = [latest];

  // Fetch previous concursos in parallel
  const concursosToFetch: number[] = [];
  for (let i = 1; i < count; i++) {
    concursosToFetch.push(latestConcurso - i);
  }

  const batchResults = await Promise.all(
    concursosToFetch.map((c) => fetchResultByConcurso(gameSlug, c)),
  );
  for (const r of batchResults) {
    if (r) results.push(r);
  }

  return results.sort((a, b) => b.concurso - a.concurso);
}
