import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Maiores Prêmios das Loterias da Caixa - Recordes Históricos',
  description:
    'Conheça os maiores prêmios já pagos pelas loterias da Caixa. Recordes da Mega-Sena, Mega da Virada, Lotofácil, Quina e mais. Valores, datas e curiosidades.',
  alternates: {
    canonical: '/maiores-premios',
    languages: {
      'pt-BR': `${SITE_URL}/maiores-premios`,
    },
  },
  openGraph: {
    title: 'Maiores Prêmios das Loterias da Caixa - Recordes Históricos',
    description:
      'Conheça os maiores prêmios já pagos pelas loterias da Caixa. Recordes da Mega-Sena, Mega da Virada, Lotofácil, Quina e mais.',
    url: `${SITE_URL}/maiores-premios`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

interface BigPrize {
  rank: number;
  game: string;
  gameSlug: string;
  concurso: number | string;
  date: string;
  prize: string;
  prizeValue: number;
  winners: number;
  location: string;
  note?: string;
}

const BIGGEST_PRIZES: BigPrize[] = [
  {
    rank: 1,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: '2696 (Mega da Virada 2024)',
    date: '31/12/2024',
    prize: 'R$ 635.486.511,39',
    prizeValue: 635486511.39,
    winners: 1,
    location: 'Curitiba/PR',
    note: 'Maior prêmio da história das loterias brasileiras',
  },
  {
    rank: 2,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: '2525 (Mega da Virada 2022)',
    date: '31/12/2022',
    prize: 'R$ 541.967.592,09',
    prizeValue: 541967592.09,
    winners: 2,
    location: 'Diversos',
  },
  {
    rank: 3,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: '2607 (Mega da Virada 2023)',
    date: '31/12/2023',
    prize: 'R$ 518.544.822,44',
    prizeValue: 518544822.44,
    winners: 5,
    location: 'Diversos',
  },
  {
    rank: 4,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: 2150,
    date: '11/05/2019',
    prize: 'R$ 289.420.865,00',
    prizeValue: 289420865,
    winners: 1,
    location: 'São Paulo/SP',
  },
  {
    rank: 5,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: 2237,
    date: '27/02/2020',
    prize: 'R$ 211.652.717,00',
    prizeValue: 211652717,
    winners: 1,
    location: 'Aracaju/SE',
  },
  {
    rank: 6,
    game: '+Milionária',
    gameSlug: 'mais-milionaria',
    concurso: 18,
    date: '26/11/2022',
    prize: 'R$ 162.625.108,22',
    prizeValue: 162625108.22,
    winners: 1,
    location: 'São Paulo/SP',
    note: 'Maior prêmio da +Milionária',
  },
  {
    rank: 7,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: 1764,
    date: '25/11/2015',
    prize: 'R$ 205.329.753,89',
    prizeValue: 205329753.89,
    winners: 1,
    location: 'Matinhos/PR',
  },
  {
    rank: 8,
    game: 'Mega-Sena',
    gameSlug: 'mega-sena',
    concurso: 2463,
    date: '19/05/2022',
    prize: 'R$ 189.381.872,15',
    prizeValue: 189381872.15,
    winners: 2,
    location: 'Diversos',
  },
  {
    rank: 9,
    game: 'Lotofácil',
    gameSlug: 'lotofacil',
    concurso: 2702,
    date: '01/01/2023',
    prize: 'R$ 159.162.281,16',
    prizeValue: 159162281.16,
    winners: 3,
    location: 'Diversos',
    note: 'Lotofácil da Independência 2022',
  },
  {
    rank: 10,
    game: 'Quina',
    gameSlug: 'quina',
    concurso: 6063,
    date: '24/06/2023',
    prize: 'R$ 220.873.082,84',
    prizeValue: 220873082.84,
    winners: 1,
    location: 'Vitória/ES',
    note: 'Quina de São João 2023',
  },
];

function getMedalColor(rank: number): string {
  if (rank === 1) return 'bg-amber-100 text-amber-700 border-amber-300';
  if (rank === 2) return 'bg-gray-100 text-gray-600 border-gray-300';
  if (rank === 3) return 'bg-orange-100 text-orange-700 border-orange-300';
  return 'bg-gray-50 text-gray-500 border-gray-200';
}

export default function MaioresPremiosPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Maiores Prêmios',
        item: `${SITE_URL}/maiores-premios`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-amber-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Maiores Prêmios</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Maiores Prêmios das Loterias da Caixa
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl">
            Os maiores prêmios já pagos na história das loterias brasileiras.
            Valores, datas, ganhadores e curiosidades dos recordes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Prize Ranking */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Top 10 Maiores Prêmios
          </h2>
          <div className="space-y-4">
            {BIGGEST_PRIZES.map((prize) => {
              const game = GAMES[prize.gameSlug];
              return (
                <div
                  key={`${prize.gameSlug}-${prize.concurso}`}
                  className={`rounded-xl border bg-white p-5 sm:p-6 ${
                    prize.rank === 1 ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Rank badge */}
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border ${getMedalColor(prize.rank)}`}
                    >
                      {prize.rank}º
                    </span>

                    {/* Game info */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-2xl">{game?.emoji || '🎰'}</span>
                      <div>
                        <p className="font-bold text-gray-900">{prize.game}</p>
                        <p className="text-xs text-gray-500">Concurso {prize.concurso}</p>
                      </div>
                    </div>

                    {/* Prize value */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
                        {prize.prize}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-gray-500">{prize.date}</span>
                        <span className="text-xs text-gray-500">
                          {prize.winners} ganhador{prize.winners > 1 ? 'es' : ''}
                        </span>
                        <span className="text-xs text-gray-500">{prize.location}</span>
                      </div>
                      {prize.note && (
                        <p className="text-xs font-medium text-amber-600 mt-1">{prize.note}</p>
                      )}
                    </div>

                    {/* Link to game */}
                    <Link
                      href={`/${prize.gameSlug}`}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex-shrink-0"
                    >
                      Ver resultados &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Records by game */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recorde por Loteria
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              const biggest = BIGGEST_PRIZES.find((p) => p.gameSlug === slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{game.emoji}</span>
                    <span className="font-semibold text-gray-900 text-sm">{game.name}</span>
                  </div>
                  {biggest ? (
                    <>
                      <p className="text-lg font-bold text-emerald-600">{biggest.prize}</p>
                      <p className="text-xs text-gray-500">Concurso {biggest.concurso}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Dados indisponíveis</p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Sobre os Maiores Prêmios das Loterias
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              A Mega da Virada é responsável pelos maiores prêmios da
              história das loterias brasileiras. O concurso especial acontece
              todo dia 31 de dezembro e não acumula — se ninguém acertar as
              6 dezenas, o prêmio é rateado entre os acertadores de 5 números.
            </p>
            <p className="text-gray-600">
              Desde 2009, a Mega da Virada já pagou mais de R$ 4 bilhões em
              prêmios. A Lotofácil da Independência e a Quina de São João
              também são concursos especiais com prêmios acima da média.
            </p>
            <p className="text-gray-600">
              Os valores aqui apresentados são os prêmios brutos anunciados
              no momento do sorteio. Sobre prêmios acima de R$ 2.259,20
              incide imposto de renda de 13,8% retido na fonte.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/acumulados" className="text-emerald-600 hover:underline font-medium">
              Loterias Acumuladas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/probabilidades" className="text-emerald-600 hover:underline font-medium">
              Probabilidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/historico" className="text-emerald-600 hover:underline font-medium">
              Histórico de Resultados
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-emerald-600 hover:underline font-medium">
              Como Jogar
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
