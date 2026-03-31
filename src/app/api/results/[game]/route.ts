import { NextRequest, NextResponse } from 'next/server';
import { GAMES } from '@/lib/constants';
import { fetchLatestResult, fetchResultByConcurso, fetchRecentResults } from '@/lib/api/lottery';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ game: string }> },
) {
  const { game: gameSlug } = await params;
  const game = GAMES[gameSlug];

  if (!game) {
    return NextResponse.json({ error: 'Unknown game' }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const concursoParam = searchParams.get('concurso');
  const recentParam = searchParams.get('recent');

  // Fetch multiple recent results: /api/results/mega-sena?recent=10
  if (recentParam) {
    const count = Math.min(parseInt(recentParam, 10) || 10, 50);
    const results = await fetchRecentResults(gameSlug, count);
    return NextResponse.json(
      { results },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
        },
      },
    );
  }

  // Fetch specific concurso: /api/results/mega-sena?concurso=2987
  let result;
  if (concursoParam) {
    const concurso = parseInt(concursoParam, 10);
    if (isNaN(concurso) || concurso < 1) {
      return NextResponse.json({ error: 'Invalid concurso' }, { status: 400 });
    }
    result = await fetchResultByConcurso(gameSlug, concurso);
  } else {
    result = await fetchLatestResult(gameSlug);
  }

  return NextResponse.json(
    { result },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
      },
    },
  );
}
