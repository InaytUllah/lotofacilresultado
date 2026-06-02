// Cloudflare Pages Function — /api/results/{game}
// Replaces the Next.js route src/app/api/results/[game]/route.ts after static
// export migration. Returns the latest result, or a specific concurso when
// ?concurso=N is provided.

import { fetchLatest, fetchByConcurso, getApiName } from '../../_lottery';

interface Env {}

export const onRequestGet: PagesFunction<Env> = async ({ params, request }) => {
  const gameSlug = String(params.game);
  if (!getApiName(gameSlug)) {
    return json({ error: 'Unknown game' }, 404);
  }

  const url = new URL(request.url);
  const concursoParam = url.searchParams.get('concurso');

  if (concursoParam) {
    const concurso = parseInt(concursoParam, 10);
    if (!Number.isFinite(concurso) || concurso < 1) {
      return json({ error: 'Invalid concurso' }, 400);
    }
    const result = await fetchByConcurso(gameSlug, concurso);
    // Past results don't change — cache aggressively at the edge.
    return json({ result }, 200, 'public, s-maxage=86400, stale-while-revalidate=604800');
  }

  const result = await fetchLatest(gameSlug);
  return json({ result }, 200, 'public, s-maxage=30, stale-while-revalidate=120');
};

function json(body: unknown, status = 200, cache?: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  if (cache) headers['Cache-Control'] = cache;
  return new Response(JSON.stringify(body), { status, headers });
}
