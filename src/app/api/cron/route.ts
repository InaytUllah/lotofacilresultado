import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { notifyGoogleIndexing } from '@/lib/api/google-indexing';
import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Verify CRON_SECRET
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isFull = request.nextUrl.searchParams.get('full') === 'true';

  try {
    // Revalidate all pages
    revalidatePath('/', 'layout');

    // Build URLs to notify Google
    const urls: string[] = [];
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    // Also yesterday in case results were late
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (isFull) {
      // Full sitemap submission
      // Fetch sitemap and extract all URLs
      try {
        const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
        const sitemapText = await sitemapRes.text();
        const urlMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g);
        if (urlMatches) {
          for (const match of urlMatches) {
            const url = match.replace('<loc>', '').replace('</loc>', '');
            urls.push(url);
          }
        }
      } catch (e) {
        // Fallback: submit known static URLs
        urls.push(SITE_URL);
        for (const slug of GAME_SLUGS) {
          urls.push(`${SITE_URL}/${slug}`);
        }
        urls.push(`${SITE_URL}/previsoes`);
        urls.push(`${SITE_URL}/numeros-quentes-frios`);
        urls.push(`${SITE_URL}/gerador`);
        urls.push(`${SITE_URL}/como-jogar`);
        urls.push(`${SITE_URL}/faq`);
        urls.push(`${SITE_URL}/probabilidades`);
        urls.push(`${SITE_URL}/historico`);
        urls.push(`${SITE_URL}/blog`);
      }
    } else {
      // Draw-time cron: submit only today's pages
      urls.push(SITE_URL);
      for (const slug of GAME_SLUGS) {
        urls.push(`${SITE_URL}/${slug}`);
        // Blog posts for today's results
        urls.push(`${SITE_URL}/blog/resultado-${slug}-concurso-latest`);
        // Prediction pages
        urls.push(`${SITE_URL}/blog/previsoes-${slug}-${todayStr}`);
      }
      urls.push(`${SITE_URL}/blog`);
      urls.push(`${SITE_URL}/previsoes`);
    }

    // Notify Google
    const result = await notifyGoogleIndexing(urls);

    return NextResponse.json({
      success: true,
      revalidated: true,
      googleNotified: result,
      urlCount: urls.length,
      type: isFull ? 'full' : 'draw-time',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Cron failed', details: String(error) }, { status: 500 });
  }
}
