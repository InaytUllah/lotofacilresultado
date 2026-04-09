import { Metadata } from 'next';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME } from '@/lib/constants';
import { generatePredictionBlogPost, generateResultBlogPost } from '@/lib/blog';
import { fetchRecentResults } from '@/lib/api/lottery';
import { BlogPost } from '@/lib/types';
import GameBadge from '@/components/ui/GameBadge';
import SEOContent from '@/components/ui/SEOContent';

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'Blog - Resultados, Previsões e Análises das Loterias',
  description:
    'Resultados detalhados e análises estatísticas de todas as loterias da Caixa. Mega-Sena, Lotofácil, Quina e mais. Atualizado após cada sorteio.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'pt-BR': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'Blog - Resultados, Previsões e Análises das Loterias',
    description:
      'Resultados detalhados e análises estatísticas de todas as loterias da Caixa. Mega-Sena, Lotofácil, Quina e mais. Atualizado após cada sorteio.',
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
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

// Main lotteries that get auto-generated result blog posts
const BLOG_LOTTERIES = ['mega-sena', 'lotofacil', 'quina'];

export default async function BlogPage() {
  const today = getTodayISO();

  const posts: BlogPost[] = [];

  // 1. Generate prediction posts for all games
  for (const slug of GAME_SLUGS) {
    posts.push(generatePredictionBlogPost(slug, today));
  }

  // 2. Fetch recent results for 3 main lotteries → auto-generate result blog posts
  const recentFetches = await Promise.allSettled(
    BLOG_LOTTERIES.map((slug) => fetchRecentResults(slug, 5)),
  );

  for (let i = 0; i < BLOG_LOTTERIES.length; i++) {
    const slug = BLOG_LOTTERIES[i];
    const settled = recentFetches[i];
    if (settled.status !== 'fulfilled' || !settled.value) continue;

    for (const result of settled.value) {
      posts.push(generateResultBlogPost(slug, result));
    }
  }

  // Sort by date descending, then by type (results first)
  posts.sort((a, b) => {
    const dateCmp = b.date.localeCompare(a.date);
    if (dateCmp !== 0) return dateCmp;
    if (a.type === 'resultado' && b.type !== 'resultado') return -1;
    if (b.type === 'resultado' && a.type !== 'resultado') return 1;
    return 0;
  });

  // Paginate: show first 30
  const displayPosts = posts.slice(0, 30);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
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

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <section className="mb-8">
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-gray-700 transition-colors">
                Início
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-1">Blog</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Blog — Resultados e Análises das Loterias
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          Resultados detalhados, análises estatísticas e previsões para os próximos sorteios de todas as loterias da Caixa.
        </p>
        <p className="text-sm text-gray-500">
          Atualizado automaticamente após cada sorteio &middot; Baseado em dados oficiais da Caixa
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
                {/* Game badge + type badge */}
                <div className="flex items-center gap-2 mb-3">
                  {game && <GameBadge game={game} size="sm" />}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    post.type === 'resultado'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {post.type === 'resultado' ? 'Resultado' : 'Análise'}
                  </span>
                </div>

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
          Sobre o Blog
        </h2>
        <p className="text-gray-600 mb-4">
          No nosso blog, publicamos dois tipos de conteúdo automaticamente:
          <strong className="text-gray-900"> resultados detalhados</strong> de cada sorteio
          e <strong className="text-gray-900">análises estatísticas</strong> com previsões para próximos concursos.
        </p>
        <p className="text-gray-600 mb-4">
          Os resultados são publicados automaticamente após cada sorteio da Mega-Sena, Lotofácil e Quina,
          com detalhamento completo de números, premiação, ganhadores e análise estatística.
          As previsões são geradas por algoritmos que analisam a frequência dos últimos 50+ concursos.
        </p>
        <p className="text-gray-600">
          Todos os dados são obtidos da API oficial da Caixa Econômica Federal.
          Para resultados oficiais completos, visite as páginas de resultados de cada loteria.
        </p>
      </SEOContent>
      </div>
    </>
  );
}
