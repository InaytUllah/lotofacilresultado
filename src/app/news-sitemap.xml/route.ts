import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';
import { fetchLatestResult } from '@/lib/api/lottery';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results = await Promise.allSettled(
    GAME_SLUGS.map((slug) => fetchLatestResult(slug)),
  );

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newsItems: string[] = [];

  for (let i = 0; i < GAME_SLUGS.length; i++) {
    const slug = GAME_SLUGS[i];
    const game = GAMES[slug];
    const settled = results[i];
    if (settled.status !== 'fulfilled' || !settled.value) continue;

    const result = settled.value;
    // Parse dd/mm/yyyy date
    const [day, month, year] = result.data.split('/');
    const drawDate = new Date(`${year}-${month}-${day}T00:00:00-03:00`);

    if (drawDate < twoDaysAgo) continue;

    const isoDate = drawDate.toISOString();
    const url = `${SITE_URL}/${slug}/resultado/${result.concurso}`;
    const title = `Resultado ${game.name} Concurso ${result.concurso} — ${result.data}`;

    newsItems.push(`
    <url>
      <loc>${url}</loc>
      <news:news>
        <news:publication>
          <news:name>Lotofácil Resultado</news:name>
          <news:language>pt</news:language>
        </news:publication>
        <news:publication_date>${isoDate}</news:publication_date>
        <news:title>${title}</news:title>
      </news:news>
    </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
