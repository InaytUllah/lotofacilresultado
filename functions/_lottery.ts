// Cloudflare Pages Function shared lib — lottery data fetcher.
//
// Ported from src/lib/api/lottery.ts but stripped of all Next.js dependencies
// (unstable_cache, next/cache, Next-specific fetch options). Caching is handled
// at the edge via Cache-Control headers in each route handler.

export interface Prize {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

export interface LotteryResult {
  concurso: number;
  data: string;
  dezenas: string[];
  dezenasOrdemSorteio?: string[];
  premiacoes: Prize[];
  acumulado: boolean;
  valorAcumulado: number;
  valorEstimadoProximoConcurso: number;
  dataProximoConcurso?: string;
  localSorteio?: string;
  mesSorte?: string;
  timeCoracao?: string;
  tpiConcurso?: string;
}

// Game slug -> Caixa API name. Kept inline here so the Pages Function has no
// imports from the Next.js src/ tree (different bundling root).
const GAME_API: Record<string, string> = {
  'mega-sena': 'megasena',
  'lotofacil': 'lotofacil',
  'quina': 'quina',
  'lotomania': 'lotomania',
  'timemania': 'timemania',
  'dupla-sena': 'duplasena',
  'dia-de-sorte': 'diadesorte',
  'super-sete': 'supersete',
  'mais-milionaria': 'maismilionaria',
  'federal': 'federal',
  'loteca': 'loteca',
};

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const HEADERS: HeadersInit = {
  'User-Agent': USER_AGENT,
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  Referer: 'https://loterias.caixa.gov.br/',
};

export function getApiName(gameSlug: string): string | null {
  return GAME_API[gameSlug] ?? null;
}

function normalizePrizes(raw: any): Prize[] {
  if (!raw) return [];
  if (Array.isArray(raw.listaRateioPremio)) {
    return raw.listaRateioPremio.map((p: any, i: number) => ({
      descricao: p.descricaoFaixa ?? p.descricao ?? `Faixa ${i + 1}`,
      faixa: p.faixa ?? i + 1,
      ganhadores: p.numeroDeGanhadores ?? p.ganhadores ?? 0,
      valorPremio: p.valorPremio ?? 0,
    }));
  }
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
      raw.listaDezenas ?? raw.dezenas ?? raw.dezenasSorteadasOrdemSorteio ?? [];
    const dezenasOrdem: string[] | undefined =
      raw.dezenasSorteadasOrdemSorteio ?? raw.dezenasOrdemSorteio ?? undefined;
    return {
      concurso: raw.numero ?? raw.concurso,
      data: raw.dataApuracao ?? raw.data ?? '',
      dezenas: dezenas.map((d: string) => String(d).padStart(2, '0')),
      dezenasOrdemSorteio: dezenasOrdem
        ? dezenasOrdem.map((d: string) => String(d).padStart(2, '0'))
        : undefined,
      premiacoes: normalizePrizes(raw),
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

function buildUrls(apiName: string, concurso?: number): string[] {
  const primary = concurso
    ? `https://loteriascaixa-api.herokuapp.com/api/${apiName}/${concurso}`
    : `https://loteriascaixa-api.herokuapp.com/api/${apiName}/latest`;
  const fallback1 = concurso
    ? `https://servicebus2.caixa.gov.br/portaldeloterias/api/${apiName}/${concurso}`
    : `https://servicebus2.caixa.gov.br/portaldeloterias/api/${apiName}/`;
  const fallback2 = concurso
    ? `https://loterias.caixa.gov.br/Servicos/Geral/Resultado?loteria=${apiName}&concurso=${concurso}`
    : `https://loterias.caixa.gov.br/Servicos/Geral/Resultado?loteria=${apiName}&concurso=`;
  return [primary, fallback1, fallback2];
}

async function fetchWithTimeout(url: string, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { headers: HEADERS, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRaw(apiName: string, concurso?: number): Promise<any | null> {
  for (const url of buildUrls(apiName, concurso)) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && (data.numero || data.concurso || data.dezenas)) return data;
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchRawWithLimit(apiName: string, concurso?: number): Promise<any | null> {
  try {
    return await Promise.race([
      fetchRaw(apiName, concurso),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);
  } catch {
    return null;
  }
}

export async function fetchLatest(gameSlug: string): Promise<LotteryResult | null> {
  const apiName = getApiName(gameSlug);
  if (!apiName) return null;
  return normalizeResult(await fetchRawWithLimit(apiName));
}

export async function fetchByConcurso(
  gameSlug: string,
  concurso: number,
): Promise<LotteryResult | null> {
  const apiName = getApiName(gameSlug);
  if (!apiName) return null;
  return normalizeResult(await fetchRawWithLimit(apiName, concurso));
}

export async function fetchRecent(
  gameSlug: string,
  count: number,
): Promise<LotteryResult[]> {
  const latest = await fetchLatest(gameSlug);
  if (!latest) return [];
  const latestConcurso = latest.concurso;
  const results: LotteryResult[] = [latest];

  const concursos: number[] = [];
  for (let i = 1; i < count; i++) concursos.push(latestConcurso - i);

  const batch = await Promise.all(concursos.map((c) => fetchByConcurso(gameSlug, c)));
  for (const r of batch) if (r) results.push(r);
  return results.sort((a, b) => b.concurso - a.concurso);
}
