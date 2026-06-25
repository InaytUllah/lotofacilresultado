import { MetadataRoute } from 'next';
import { GAME_SLUGS, GAMES, SITE_URL } from '@/lib/constants';
import { EDITORIAL_POSTS } from '@/lib/editorial';

// Required under output: 'export' so sitemap.xml is emitted as a static file.
export const dynamic = 'force-static';

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
    { path: '/mega-da-virada', priority: 0.9, freq: 'weekly' as const },
    { path: '/lotofacil-da-independencia', priority: 0.8, freq: 'weekly' as const },
    { path: '/quina-de-sao-joao', priority: 0.8, freq: 'weekly' as const },
    { path: '/onde-vai-o-dinheiro', priority: 0.6, freq: 'monthly' as const },
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

  // Editorial blog posts — hand-written long-form articles, high priority
  for (const post of EDITORIAL_POSTS) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: 'monthly',
      priority: 0.8,
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

  // Dated result pages — the route only generates 1 concurso per game
  // (see [game]/resultado/[concurso]/page.tsx). The sitemap previously
  // listed 100 URLs per game but only 1 of them was actually a 200 — 900
  // sitemap orphans = SEO penalty. Skip these from the sitemap entirely;
  // the game hub at /{game} already exists and lists recent results.

  const today = new Date();

  // Generate prediction blog post URLs for recent dates (1 day — matches the
  // blog/[slug] generateStaticParams window).
  for (let d = 0; d < 1; d++) {
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
