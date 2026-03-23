import { Metadata } from 'next';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL } from '@/lib/constants';
import { fetchMultipleLatestResults } from '@/lib/api/lottery';
import { generateResultBlogPost, generatePredictionBlogPost } from '@/lib/blog';
import { BlogPost } from '@/lib/types';
import GameBadge from '@/components/ui/GameBadge';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog - Resultados e Previsões das Loterias',
  description:
    'Acompanhe os últimos resultados e previsões de todas as loterias da Caixa. Análises, números sorteados e estatísticas atualizadas.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog - Resultados e Previsões das Loterias',
    description:
      'Acompanhe os últimos resultados e previsões de todas as loterias da Caixa. Análises, números sorteados e estatísticas atualizadas.',
    url: `${SITE_URL}/blog`,
    siteName: 'Resultados Mega Sena',
    locale: 'pt_BR',
    type: 'website',
  },
};

function formatDatePT(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export default async function BlogPage() {
  const results = await fetchMultipleLatestResults();
  const today = getTodayISO();

  const posts: BlogPost[] = [];

  // Generate result blog posts from latest results
  for (const slug of GAME_SLUGS) {
    const result = results[slug];
    if (result) {
      posts.push(generateResultBlogPost(slug, result));
    }
  }

  // Generate today's prediction posts for all games
  for (const slug of GAME_SLUGS) {
    posts.push(generatePredictionBlogPost(slug, today));
  }

  // Sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date));

  // Paginate: show first 20
  const displayPosts = posts.slice(0, 20);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="mb-8">
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-gray-700 transition-colors">
                Inicio
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">Blog</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Blog de Loterias
        </h1>
        <p className="text-lg text-gray-600">
          Resultados atualizados e previsões estatísticas de todas as loterias da Caixa.
        </p>
      </section>

      {/* Blog Post Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => {
            const game = post.gameSlug ? GAMES[post.gameSlug] : null;

            return (
              <article
                key={post.slug}
                className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Game badge */}
                {game && (
                  <div className="mb-3">
                    <GameBadge game={game} size="sm" />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 flex-1">
                  {truncateText(post.description, 120)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <time
                    dateTime={post.date}
                    className="text-xs text-gray-500"
                  >
                    {formatDatePT(post.date)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Ler mais &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Sobre o Blog de Loterias
        </h2>
        <p className="text-gray-600 mb-4">
          No nosso blog, você encontra os resultados mais recentes de todas as loterias da
          Caixa Econômica Federal, incluindo Mega-Sena, Lotofácil, Quina, Lotomania,
          +Milionária, Dia de Sorte, Super Sete, Dupla Sena e Timemania.
        </p>
        <p className="text-gray-600 mb-4">
          Além dos resultados, publicamos análises estatísticas e previsões para os
          próximos sorteios, baseadas em dados históricos e frequência dos números
          sorteados. Acompanhe nosso blog para ficar sempre atualizado.
        </p>
        <p className="text-gray-600">
          Todas as informações são atualizadas automaticamente após cada sorteio, garantindo
          que você tenha acesso aos dados mais recentes das loterias brasileiras.
        </p>
      </SEOContent>
    </>
  );
}
