import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogleIndexing } from '@/lib/api/google-indexing';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    let urls: string[] = [];

    if (body.full) {
      // Fetch sitemap and submit all URLs
      try {
        const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
        const sitemapText = await sitemapRes.text();
        const urlMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g);
        if (urlMatches) {
          for (const match of urlMatches) {
            urls.push(match.replace('<loc>', '').replace('</loc>', ''));
          }
        }
      } catch {
        return NextResponse.json({ error: 'Failed to fetch sitemap' }, { status: 500 });
      }
    } else if (body.urls && Array.isArray(body.urls)) {
      urls = body.urls;
    } else {
      return NextResponse.json({ error: 'Provide "urls" array or "full": true' }, { status: 400 });
    }

    const result = await notifyGoogleIndexing(urls);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
