import { MetadataRoute } from 'next';
import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';
import { fetchLatestResult } from '@/lib/api/lottery';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1.0,
  });

  // Game pages
  for (const slug of GAME_SLUGS) {
    entries.push({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    });
  }

  // Tool/info pages
  const staticPages = [
    { path: '/previsoes', priority: 0.8, freq: 'daily' as const },
    { path: '/numeros-quentes-frios', priority: 0.8, freq: 'daily' as const },
    { path: '/conferidor', priority: 0.8, freq: 'weekly' as const },
    { path: '/simulador', priority: 0.8, freq: 'weekly' as const },
    { path: '/gerador', priority: 0.7, freq: 'weekly' as const },
    { path: '/como-jogar', priority: 0.7, freq: 'weekly' as const },
    { path: '/faq', priority: 0.7, freq: 'weekly' as const },
    { path: '/probabilidades', priority: 0.7, freq: 'weekly' as const },
    { path: '/historico', priority: 0.7, freq: 'daily' as const },
    { path: '/meus-numeros', priority: 0.7, freq: 'weekly' as const },
    { path: '/bolao', priority: 0.7, freq: 'weekly' as const },
    { path: '/estatisticas', priority: 0.8, freq: 'daily' as const },
    { path: '/numero-da-sorte', priority: 0.6, freq: 'weekly' as const },
    { path: '/comparar', priority: 0.7, freq: 'weekly' as const },
    { path: '/acumulados', priority: 0.9, freq: 'daily' as const },
    { path: '/maiores-premios', priority: 0.7, freq: 'monthly' as const },
    { path: '/quando-e-o-proximo-sorteio', priority: 0.8, freq: 'daily' as const },
    { path: '/como-resgatar-premio', priority: 0.7, freq: 'monthly' as const },
    { path: '/dicas-para-apostar', priority: 0.7, freq: 'monthly' as const },
    { path: '/glossario', priority: 0.6, freq: 'monthly' as const },
    { path: '/resultados-ao-vivo', priority: 0.9, freq: 'daily' as const },
    { path: '/qual-loteria-jogar', priority: 0.7, freq: 'monthly' as const },
    { path: '/blog', priority: 0.8, freq: 'weekly' as const },
    { path: '/privacidade', priority: 0.3, freq: 'monthly' as const },
    { path: '/termos', priority: 0.3, freq: 'monthly' as const },
    { path: '/sobre', priority: 0.4, freq: 'monthly' as const },
    { path: '/contato', priority: 0.4, freq: 'monthly' as const },
    { path: '/jogo-responsavel', priority: 0.5, freq: 'monthly' as const },
    { path: '/aviso-legal', priority: 0.3, freq: 'monthly' as const },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.freq,
      priority: page.priority,
    });
  }

  // Number statistics pages (1-60, most common lottery range)
  for (let n = 1; n <= 60; n++) {
    entries.push({
      url: `${SITE_URL}/numeros/${n}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    });
  }

  // Yearly archive pages (current year + previous year)
  const currentYear = new Date().getFullYear();
  for (const slug of GAME_SLUGS) {
    for (const year of [currentYear, currentYear - 1]) {
      entries.push({
        url: `${SITE_URL}/${slug}/resultados/${year}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
  }

  // Dynamic result pages — last 100 concursos per lottery
  // Fetch latest concurso number for each lottery (9 API calls, cached)
  const latestResults = await Promise.allSettled(
    GAME_SLUGS.map((slug) => fetchLatestResult(slug)),
  );

  const today = new Date();

  for (let i = 0; i < GAME_SLUGS.length; i++) {
    const slug = GAME_SLUGS[i];
    const settled = latestResults[i];
    if (settled.status !== 'fulfilled' || !settled.value) continue;

    const latestConcurso = settled.value.concurso;
    const startConcurso = Math.max(1, latestConcurso - 99);

    for (let c = latestConcurso; c >= startConcurso; c--) {
      // Calculate age-based priority
      const drawsFromLatest = latestConcurso - c;
      let priority: number;
      if (drawsFromLatest <= 3) {
        // Very recent draws (≈ last week) — high priority
        priority = 0.8;
      } else if (drawsFromLatest <= 15) {
        // Last ~30 days — medium priority
        priority = 0.6;
      } else {
        // Older draws — low priority
        priority = 0.4;
      }

      entries.push({
        url: `${SITE_URL}/${slug}/resultado/${c}`,
        lastModified: c === latestConcurso ? now : undefined,
        changeFrequency: 'never',
        priority,
      });
    }
  }

  // Generate prediction blog post URLs for recent dates (7 days only)
  for (let d = 0; d < 7; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];

    for (const slug of GAME_SLUGS) {
      entries.push({
        url: `${SITE_URL}/blog/previsoes-${slug}-${dateStr}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
