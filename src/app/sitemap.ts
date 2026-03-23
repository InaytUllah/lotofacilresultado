import { MetadataRoute } from 'next';
import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'always',
    priority: 1.0,
  });

  // Game pages
  for (const slug of GAME_SLUGS) {
    entries.push({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: 'always',
      priority: 0.9,
    });
  }

  // Tool/info pages
  const staticPages = [
    { path: '/previsoes', priority: 0.8, freq: 'daily' as const },
    { path: '/numeros-quentes-frios', priority: 0.8, freq: 'daily' as const },
    { path: '/gerador', priority: 0.7, freq: 'monthly' as const },
    { path: '/como-jogar', priority: 0.7, freq: 'monthly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/probabilidades', priority: 0.7, freq: 'monthly' as const },
    { path: '/historico', priority: 0.7, freq: 'daily' as const },
    { path: '/blog', priority: 0.8, freq: 'always' as const },
    { path: '/privacidade', priority: 0.3, freq: 'yearly' as const },
    { path: '/termos', priority: 0.3, freq: 'yearly' as const },
    { path: '/sobre', priority: 0.4, freq: 'yearly' as const },
    { path: '/contato', priority: 0.4, freq: 'yearly' as const },
    { path: '/jogo-responsavel', priority: 0.5, freq: 'yearly' as const },
    { path: '/aviso-legal', priority: 0.3, freq: 'yearly' as const },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.freq,
      priority: page.priority,
    });
  }

  // Number pages (1-60 for Mega-Sena range)
  for (let i = 1; i <= 60; i++) {
    entries.push({
      url: `${SITE_URL}/numeros/${i}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    });
  }

  // Generate blog post URLs for recent dates
  const today = new Date();
  for (let d = 0; d < 30; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];

    for (const slug of GAME_SLUGS) {
      // Prediction posts
      entries.push({
        url: `${SITE_URL}/blog/previsoes-${slug}-${dateStr}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.6,
      });
    }
  }

  return entries;
}
