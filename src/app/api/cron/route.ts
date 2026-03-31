import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { notifyGoogleIndexing } from '@/lib/api/google-indexing';
import { fetchLatestResult } from '@/lib/api/lottery';
import { GAMES, GAME_SLUGS, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// In-memory dedup: tracks last-submitted concurso per game slug.
// Resets on cold start (Vercel functions are ephemeral — that's fine).
// ---------------------------------------------------------------------------
const lastSubmittedConcurso = new Map<string, number>();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get today's date as DD/MM/YYYY in BRT (America/Sao_Paulo). */
function getTodayBRT(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatter.format(now); // "DD/MM/YYYY"
}

/**
 * Compute the next draw date string used in the prediction blog post slug.
 * Format: DD-MM-YYYY (hyphenated).
 * Uses `dataProximoConcurso` from the API result when available,
 * otherwise falls back to tomorrow's date in BRT.
 */
function getNextDrawDateSlug(dataProximoConcurso?: string): string {
  if (dataProximoConcurso) {
    // API returns DD/MM/YYYY — convert slashes to hyphens
    return dataProximoConcurso.replace(/\//g, '-');
  }
  // Fallback: tomorrow in BRT
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatter.format(tomorrow).replace(/\//g, '-');
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  // Verify CRON_SECRET
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isFull = request.nextUrl.searchParams.get('full') === 'true';

  try {
    // Revalidate all pages so Next.js serves fresh data
    revalidatePath('/', 'layout');

    // ------------------------------------------------------------------
    // FULL MODE (?full=true) — daily 6:07 AM cron
    // Submit only the 9 game pages + homepage + /previsoes + /blog = 12 URLs
    // ------------------------------------------------------------------
    if (isFull) {
      const urls: string[] = [SITE_URL];
      for (const slug of GAME_SLUGS) {
        urls.push(`${SITE_URL}/${slug}`);
      }
      urls.push(`${SITE_URL}/previsoes`);
      urls.push(`${SITE_URL}/blog`);

      const result = await notifyGoogleIndexing(urls);

      return NextResponse.json({
        success: true,
        revalidated: true,
        googleNotified: result,
        urlCount: urls.length,
        urls,
        type: 'full',
        timestamp: new Date().toISOString(),
      });
    }

    // ------------------------------------------------------------------
    // DRAW-TIME MODE (default) — runs every 2 min during draw windows
    // Only submit URLs for games that have a NEW result from today.
    // ------------------------------------------------------------------
    const todayBRT = getTodayBRT();
    const urls: string[] = [];
    const gamesWithNewResults: string[] = [];
    const skippedGames: string[] = [];

    // Fetch latest result for every game in parallel
    const results = await Promise.all(
      GAME_SLUGS.map(async (slug) => {
        const result = await fetchLatestResult(slug);
        return { slug, result };
      }),
    );

    for (const { slug, result } of results) {
      if (!result) continue;

      // Check if this result is from today (BRT)
      if (result.data !== todayBRT) continue;

      // Dedup: skip if we already submitted this exact concurso
      const lastConcurso = lastSubmittedConcurso.get(slug);
      if (lastConcurso === result.concurso) {
        skippedGames.push(slug);
        continue;
      }

      // New result found — record it and queue URLs
      lastSubmittedConcurso.set(slug, result.concurso);
      gamesWithNewResults.push(slug);

      // 1. The new result page
      urls.push(`${SITE_URL}/${slug}/resultado/${result.concurso}`);

      // 2. The game page (updated with latest result)
      urls.push(`${SITE_URL}/${slug}`);

      // 3. The new prediction blog post for the next draw
      const nextDrawDateSlug = getNextDrawDateSlug(result.dataProximoConcurso);
      urls.push(`${SITE_URL}/blog/previsoes-${slug}-${nextDrawDateSlug}`);
    }

    // If no games have new results today, return early — submit nothing
    if (urls.length === 0) {
      return NextResponse.json({
        success: true,
        revalidated: true,
        googleNotified: { success: 0, failed: 0 },
        urlCount: 0,
        urls: [],
        type: 'draw-time',
        message: 'No new results today — nothing to submit',
        skippedGames,
        todayBRT,
        timestamp: new Date().toISOString(),
      });
    }

    // Add homepage once (it shows latest results)
    urls.push(SITE_URL);

    const googleResult = await notifyGoogleIndexing(urls);

    return NextResponse.json({
      success: true,
      revalidated: true,
      googleNotified: googleResult,
      urlCount: urls.length,
      urls,
      gamesWithNewResults,
      skippedGames,
      type: 'draw-time',
      todayBRT,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json(
      { error: 'Cron failed', details: String(error) },
      { status: 500 },
    );
  }
}
