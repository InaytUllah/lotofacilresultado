import { Metadata } from 'next';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME } from '@/lib/constants';
import { generatePredictionBlogPost } from '@/lib/blog';
import { BlogPost } from '@/lib/types';
import GameBadge from '@/components/ui/GameBadge';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog - Previsões e Análises das Loterias',
  description:
    'Previsões estatísticas e análises de todas as loterias da Caixa. Números quentes, frios, tendências e combinações sugeridas baseadas em dados históricos.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      'pt-BR': `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: 'Blog - Previsões e Análises das Loterias',
    description:
      'Previsões estatísticas e análises de todas as loterias da Caixa. Números quentes, frios, tendências e combinações sugeridas baseadas em dados históricos.',
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

export default async function BlogPage() {
  const today = getTodayISO();

  const posts: BlogPost[] = [];

  // Generate prediction posts for all games (no result posts)
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
          Blog de Análise Estatística das Loterias
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          Análises estatísticas e previsões para os próximos sorteios de todas as loterias da Caixa.
        </p>
        <p className="text-sm text-gray-500">
          Por Equipe Lotofácil Resultado &middot; Baseado em análise de 50+ concursos recentes
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
          Sobre o Blog de Previsões
        </h2>
        <p className="text-gray-600 mb-4">
          No nosso blog, publicamos análises estatísticas e previsões para os próximos sorteios
          de todas as loterias da Caixa Econômica Federal, incluindo Mega-Sena, Lotofácil, Quina,
          Lotomania, +Milionária, Dia de Sorte, Super Sete, Dupla Sena e Timemania.
        </p>
        <p className="text-gray-600 mb-4">
          Nossas previsões são baseadas em análise de frequência dos últimos 50+ concursos,
          identificando números quentes (com maior frequência recente) e números frios
          (com menor frequência). Cada artigo inclui análise de tendências, metodologia
          estatística e combinações sugeridas.
        </p>
        <p className="text-gray-600">
          Para os resultados oficiais de cada sorteio, visite as páginas de resultados
          individuais de cada loteria. Este blog foca exclusivamente em análise preditiva
          e conteúdo estatístico original.
        </p>
      </SEOContent>
      </div>
    </>
  );
}
