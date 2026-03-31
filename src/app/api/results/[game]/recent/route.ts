import { NextRequest, NextResponse } from 'next/server';
import { GAMES } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';

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
  const count = Math.min(
    Math.max(parseInt(searchParams.get('count') || '10', 10) || 10, 1),
    50,
  );

  const results = await fetchRecentResults(gameSlug, count);

  return NextResponse.json(
    { results },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    },
  );
}
