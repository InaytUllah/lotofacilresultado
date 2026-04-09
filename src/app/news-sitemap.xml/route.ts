import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';
import { fetchLatestResult } from '@/lib/api/lottery';

export const dynamic = 'force-dynamic';

// Lottery-specific keywords for Google News sitemap
const GAME_KEYWORDS: Record<string, string> = {
  'mega-sena': 'mega sena, resultado mega sena, mega-sena, números mega sena, concurso mega sena',
  'lotofacil': 'lotofácil, resultado lotofácil, lotofacil, números lotofácil, concurso lotofácil',
  'quina': 'quina, resultado quina, números quina, concurso quina, loteria quina',
  'lotomania': 'lotomania, resultado lotomania, números lotomania, concurso lotomania',
  'mais-milionaria': '+milionária, mais milionária, resultado mais milionária, concurso mais milionária',
  'dia-de-sorte': 'dia de sorte, resultado dia de sorte, números dia de sorte, mês da sorte',
  'super-sete': 'super sete, resultado super sete, super 7, concurso super sete',
  'dupla-sena': 'dupla sena, resultado dupla sena, dupla-sena, concurso dupla sena',
  'timemania': 'timemania, resultado timemania, time do coração, concurso timemania',
};

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
    const keywords = GAME_KEYWORDS[slug] || `${game.name.toLowerCase()}, resultado ${game.name.toLowerCase()}`;

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
        <news:keywords>${keywords}</news:keywords>
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
