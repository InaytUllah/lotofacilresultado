import { MetadataRoute } from 'next';
import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';

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

  // Generate prediction blog post URLs for recent dates (no result blog posts, no number pages)
  const today = new Date();
  for (let d = 0; d < 7; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];

    for (const slug of GAME_SLUGS) {
      // Prediction posts only
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
