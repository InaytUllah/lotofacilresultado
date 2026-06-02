// Cloudflare Pages Function — /api/results/{game}/recent?count=N
// Returns the N most recent results for the given game.

import { fetchRecent, getApiName } from '../../../_lottery';

interface Env {}

export const onRequestGet: PagesFunction<Env> = async ({ params, request }) => {
  const gameSlug = String(params.game);
  if (!getApiName(gameSlug)) {
    return json({ error: 'Unknown game' }, 404);
  }

  const url = new URL(request.url);
  const raw = parseInt(url.searchParams.get('count') || '10', 10);
  const count = Math.min(Math.max(Number.isFinite(raw) ? raw : 10, 1), 50);

  const results = await fetchRecent(gameSlug, count);
  return json({ results }, 200, 'public, s-maxage=30, stale-while-revalidate=120');
};

function json(body: unknown, status = 200, cache?: string): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  if (cache) headers['Cache-Control'] = cache;
  return new Response(JSON.stringify(body), { status, headers });
}
