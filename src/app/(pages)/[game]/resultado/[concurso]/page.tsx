import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME } from '@/lib/constants';
import { fetchResultByConcurso } from '@/lib/api/lottery';
import LotteryBall from '@/components/ui/LotteryBall';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; concurso: string }>;
}): Promise<Metadata> {
  const { game: gameSlug, concurso } = await params;
  const game = GAMES[gameSlug];
  if (!game) return {};

  // Fetch result to include drawn numbers in OG title
  const concursoNum = parseInt(concurso, 10);
  let numbersStr = '';
  if (!isNaN(concursoNum) && concursoNum > 0) {
    try {
      const result = await fetchResultByConcurso(game.slug, concursoNum);
      if (result && result.dezenas.length > 0) {
        numbersStr = result.dezenas.join(', ');
      }
    } catch {
      // Fallback: metadata without numbers is still valid
    }
  }

  const title = numbersStr
    ? `${game.name} Concurso ${concurso} — ${numbersStr} | Resultado Oficial`
    : `Resultado ${game.name} Concurso ${concurso} - Números Sorteados`;
  const description = numbersStr
    ? `Resultado oficial do Concurso ${concurso} da ${game.name}. Números sorteados: ${numbersStr}. Confira premiação completa e ganhadores.`
    : `Confira o resultado do concurso ${concurso} da ${game.name}. Veja os números sorteados, premiação completa e ganhadores.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${game.slug}/resultado/${concurso}`,
      languages: {
        'pt-BR': `${SITE_URL}/${game.slug}/resultado/${concurso}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${game.slug}/resultado/${concurso}`,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'article',
    },
  };
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default async function ConcursoPage({
  params,
}: {
  params: Promise<{ game: string; concurso: string }>;
}) {
  const { game: gameSlug, concurso: concursoParam } = await params;
  const game = GAMES[gameSlug];

  if (!game || !GAME_SLUGS.includes(gameSlug)) {
    notFound();
  }

  const concurso = parseInt(concursoParam, 10);
  if (isNaN(concurso) || concurso <= 0) {
    notFound();
  }

  const result = await fetchResultByConcurso(game.slug, concurso);

  if (!result) {
    notFound();
  }

  const prevConcurso = concurso - 1;
  const nextConcurso = concurso + 1;

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
        name: game.name,
        item: `${SITE_URL}/${game.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Concurso ${concurso}`,
        item: `${SITE_URL}/${game.slug}/resultado/${concurso}`,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Resultado ${game.name} Concurso ${concurso}`,
    description: `Números sorteados e premiação do concurso ${concurso} da ${game.name}.`,
    datePublished: result.data,
    publisher: {
      '@type': 'Organization',
      name: 'Lotofácil Resultado',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${game.slug}/resultado/${concurso}`,
    },
  };

  // Convert DD/MM/YYYY date to ISO format with BRT offset (-03:00)
  const dateParts = result.data.split('/');
  const isoDate = dateParts.length === 3
    ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T21:00:00-03:00`
    : new Date().toISOString();

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${game.name} Concurso ${concurso}`,
    startDate: isoDate,
    location: {
      '@type': 'Place',
      name: result.localSorteio || 'Espaço da Sorte',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        addressCountry: 'BR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Caixa Econômica Federal',
      url: 'https://loterias.caixa.gov.br',
    },
    description: `Resultado oficial do Concurso ${concurso} da ${game.name}. Números sorteados: ${result.dezenas.join(', ')}.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema, eventSchema]),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Início
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1">
            <Link
              href={`/${game.slug}`}
              className="hover:text-gray-700 transition-colors"
            >
              {game.name}
            </Link>
          </li>
          <li className="before:content-['/'] before:mx-1 text-gray-700 font-medium">
            Concurso {concurso}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <section
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${game.color}, ${game.color}dd)`,
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Resultado {game.name} - Concurso {concurso}
        </h1>
        <p className="text-white/80">
          Data do sorteio: {result.data}
          {result.localSorteio && ` | ${result.localSorteio}`}
        </p>
        {result.acumulado && (
          <span className="inline-block mt-2 text-sm font-semibold px-3 py-1 rounded-full bg-white/20">
            Acumulado
          </span>
        )}
      </section>

      {/* Lottery Balls */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Números Sorteados
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {result.dezenas.map((dezena, index) => (
            <LotteryBall
              key={`${dezena}-${index}`}
              number={dezena}
              color={game.ballColor}
              textColor={game.ballTextColor}
              size="lg"
              delay={index * 100}
            />
          ))}
        </div>

        {/* Dia de Sorte - Month */}
        {result.mesSorte && (
          <p className="text-center mt-4 text-gray-600">
            Mês da Sorte:{' '}
            <span className="font-bold" style={{ color: game.color }}>
              {result.mesSorte}
            </span>
          </p>
        )}

        {/* Timemania - Team */}
        {result.timeCoracao && (
          <p className="text-center mt-4 text-gray-600">
            Time do Coração:{' '}
            <span className="font-bold" style={{ color: game.color }}>
              {result.timeCoracao}
            </span>
          </p>
        )}

        {/* Draw order */}
        {result.dezenasOrdemSorteio && result.dezenasOrdemSorteio.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2 text-center">
              Ordem de sorteio
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.dezenasOrdemSorteio.map((dezena, index) => (
                <span
                  key={`ordem-${dezena}-${index}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-semibold"
                  style={{ borderColor: game.color, color: game.color }}
                >
                  {dezena}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Accumulated Value */}
      {result.acumulado && result.valorAcumulado > 0 && (
        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-gray-700 mb-1">
            Ninguém acertou. O prêmio acumulou para:
          </p>
          <p className="text-3xl font-bold text-amber-600">
            {formatCurrency(result.valorAcumulado)}
          </p>
          {result.valorEstimadoProximoConcurso > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Estimativa próximo concurso:{' '}
              {formatCurrency(result.valorEstimadoProximoConcurso)}
            </p>
          )}
        </section>
      )}

      {/* Prize Table */}
      {result.premiacoes.length > 0 && (
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Premiação Completa
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-gray-200">
                  <th className="pb-3 font-semibold text-gray-700">Faixa</th>
                  <th className="pb-3 font-semibold text-gray-700 text-center">
                    Ganhadores
                  </th>
                  <th className="pb-3 font-semibold text-gray-700 text-right">
                    Prêmio
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.premiacoes.map((premio) => (
                  <tr
                    key={premio.faixa}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 text-gray-800 font-medium">
                      {premio.descricao}
                    </td>
                    <td className="py-3 text-center">
                      {premio.ganhadores > 0 ? (
                        <span className="font-semibold" style={{ color: game.color }}>
                          {premio.ganhadores}
                        </span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="py-3 text-right text-gray-800">
                      {formatCurrency(premio.valorPremio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* YouTube Draw Video */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Transmissão Oficial do Sorteio
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          Assista à transmissão oficial do sorteio do Concurso {concurso} da {game.name} no canal da Caixa Econômica Federal.
        </p>
        <a
          href={`https://www.youtube.com/results?search_query=resultado+${game.apiName}+concurso+${concurso}+caixa`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Assistir no YouTube
        </a>
      </div>

      {/* Previous / Next Navigation */}
      <section className="mb-8 flex items-center justify-between gap-4">
        {prevConcurso > 0 ? (
          <Link
            href={`/${game.slug}/resultado/${prevConcurso}`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <span aria-hidden="true">&larr;</span>
            Concurso {prevConcurso}
          </Link>
        ) : (
          <div />
        )}
        <Link
          href={`/${game.slug}/resultado/${nextConcurso}`}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          Concurso {nextConcurso}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      {/* Share Section */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          Compartilhe este resultado
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Envie o resultado do concurso {concurso} da {game.name} para seus amigos
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href={`https://wa.me/?text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')} - Confira em ${SITE_URL}/${game.slug}/resultado/${concurso}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=${SITE_URL}/${game.slug}/resultado/${concurso}&text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
          >
            Telegram
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=Resultado ${game.name} Concurso ${concurso}: ${result.dezenas.join(', ')}&url=${SITE_URL}/${game.slug}/resultado/${concurso}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
          >
            X / Twitter
          </a>
        </div>
      </section>

      {/* Back to game link */}
      <div className="text-center">
        <Link
          href={`/${game.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: game.color }}
        >
          &larr; Ver todos os resultados da {game.name}
        </Link>
      </div>
      </div>
    </>
  );
}
