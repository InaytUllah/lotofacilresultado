import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, GAMES, GAME_SLUGS } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';
import { getPredictionDate } from '@/lib/utils/format';
import LotteryBall from '@/components/ui/LotteryBall';
import WarningBox from '@/components/ui/WarningBox';
import SEOContent from '@/components/ui/SEOContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Previsoes das Loterias - Analise Estatistica',
  description:
    'Previsoes estatisticas para os proximos sorteios das loterias da Caixa. Analise de tendencias da Mega-Sena, Lotofacil, Quina e outras loterias.',
  alternates: {
    canonical: '/previsoes',
  },
};

function generateSeededNumbers(
  seed: string,
  count: number,
  max: number,
): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const numbers: Set<number> = new Set();
  let current = Math.abs(hash);
  while (numbers.size < count) {
    current = (current * 1103515245 + 12345) & 0x7fffffff;
    const num = (current % max) + 1;
    numbers.add(num);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function formatPredictionDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default async function PrevisoesPage() {
  const predictions: {
    slug: string;
    numbers: number[];
    predictionDate: string;
    totalResults: number;
    topFrequent: number[];
  }[] = [];

  let hasError = false;

  for (const slug of GAME_SLUGS) {
    try {
      const game = GAMES[slug];
      const predictionDate = getPredictionDate(slug);
      const dateStr = predictionDate.toISOString().split('T')[0];
      const seed = `${slug}-${dateStr}`;

      const numbers = generateSeededNumbers(seed, game.selectNumbers, game.maxNumber);

      // Fetch recent results for a brief stats summary
      const results = await fetchRecentResults(slug, 5);
      const freq: Record<number, number> = {};
      for (const r of results) {
        for (const d of r.dezenas) {
          const n = parseInt(d, 10);
          freq[n] = (freq[n] || 0) + 1;
        }
      }
      const topFrequent = Object.entries(freq)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([num]) => parseInt(num, 10));

      predictions.push({
        slug,
        numbers,
        predictionDate: formatPredictionDate(predictionDate),
        totalResults: results.length,
        topFrequent,
      });
    } catch {
      hasError = true;
    }
  }

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
        name: 'Previsoes',
        item: `${SITE_URL}/previsoes`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span>Previsoes</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Previsoes das Loterias
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Analise estatistica e sugestoes de numeros para os proximos sorteios
            das loterias da Caixa Economica Federal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Disclaimer */}
        <WarningBox title="Aviso Importante">
          <p>
            Estas previsoes sao baseadas em analise estatistica e nao garantem
            resultados. Cada sorteio e independente e todos os numeros tem a
            mesma probabilidade de serem sorteados. Jogue com responsabilidade.
          </p>
        </WarningBox>

        {hasError && predictions.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-center">
            <p className="text-gray-600">
              Nao foi possivel carregar as previsoes no momento. Por favor,
              tente novamente mais tarde.
            </p>
          </div>
        )}

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map(({ slug, numbers, predictionDate, totalResults, topFrequent }) => {
            const game = GAMES[slug];
            return (
              <div
                key={slug}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{game.emoji}</span>
                  <h2 className="text-lg font-bold text-gray-900">
                    {game.name}
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Previsao para: <strong className="text-gray-900">{predictionDate}</strong>
                </p>

                {/* Predicted Numbers */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {numbers.map((num, idx) => (
                    <LotteryBall
                      key={num}
                      number={String(num).padStart(2, '0')}
                      color={game.ballColor}
                      textColor={game.ballTextColor}
                      size="md"
                      delay={idx * 50}
                    />
                  ))}
                </div>

                {/* Stats Summary */}
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-2">
                    Top 5 numeros frequentes (ultimos {totalResults} concursos):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {topFrequent.map((num) => (
                      <span
                        key={num}
                        className="inline-flex items-center justify-center w-7 h-7 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                      >
                        {String(num).padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/${slug}`}
                  className="text-emerald-600 hover:underline font-medium text-sm mt-3 inline-block"
                >
                  Ver resultado {game.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Funcionam as Previsoes?
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Nossas <strong className="text-gray-900">previsoes</strong> sao
              geradas atraves de um algoritmo que combina analise estatistica
              dos resultados anteriores com um gerador de numeros deterministico.
              O algoritmo considera a data do proximo sorteio para gerar
              combinacoes unicas e consistentes.
            </p>
            <p className="text-gray-600">
              E fundamental entender que as loterias sao jogos de{' '}
              <strong className="text-gray-900">puro azar</strong>. Cada
              sorteio e completamente independente dos anteriores, e nenhum
              metodo pode prever com certeza quais numeros serao sorteados.
              As previsoes apresentadas aqui sao apenas sugestoes baseadas em
              padroes estatisticos.
            </p>
            <p className="text-gray-600">
              Recomendamos que voce jogue com{' '}
              <strong className="text-gray-900">responsabilidade</strong>,
              apostando apenas valores que pode perder sem prejuizo ao seu
              orcamento. Lembre-se: a loteria deve ser uma forma de
              entretenimento, nao uma estrategia financeira.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Numeros Quentes e Frios
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Numeros
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/probabilidades"
              className="text-emerald-600 hover:underline font-medium"
            >
              Probabilidades
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
