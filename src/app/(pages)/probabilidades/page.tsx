import { Metadata } from 'next';
import { GAMES, GAME_SLUGS, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Probabilidades e Premios das Loterias da Caixa',
  description:
    'Tabela completa de probabilidades e faixas de premios de todas as loterias da Caixa: Mega-Sena, Lotofacil, Quina, Lotomania, +Milionaria, Dia de Sorte, Super Sete, Dupla Sena e Timemania.',
  alternates: {
    canonical: `${SITE_URL}/probabilidades`,
  },
};

interface OddsRow {
  category: string;
  odds: string;
  typicalPrize: string;
}

const oddsData: Record<string, OddsRow[]> = {
  'mega-sena': [
    { category: 'Sena (6 acertos)', odds: '1 em 50.063.860', typicalPrize: 'A partir de R$ 3 milhoes' },
    { category: 'Quina (5 acertos)', odds: '1 em 154.518', typicalPrize: 'R$ 30.000 a R$ 100.000' },
    { category: 'Quadra (4 acertos)', odds: '1 em 2.332', typicalPrize: 'R$ 500 a R$ 1.500' },
  ],
  lotofacil: [
    { category: '15 acertos', odds: '1 em 3.268.760', typicalPrize: 'A partir de R$ 1,5 milhao' },
    { category: '14 acertos', odds: '1 em 21.792', typicalPrize: 'R$ 1.000 a R$ 3.000' },
    { category: '13 acertos', odds: '1 em 691', typicalPrize: 'R$ 30 a R$ 50' },
    { category: '12 acertos', odds: '1 em 59', typicalPrize: 'R$ 12 a R$ 20' },
    { category: '11 acertos', odds: '1 em 11', typicalPrize: 'R$ 6 a R$ 8' },
  ],
  quina: [
    { category: 'Quina (5 acertos)', odds: '1 em 24.040.016', typicalPrize: 'A partir de R$ 1 milhao' },
    { category: 'Quadra (4 acertos)', odds: '1 em 64.106', typicalPrize: 'R$ 5.000 a R$ 15.000' },
    { category: 'Terno (3 acertos)', odds: '1 em 866', typicalPrize: 'R$ 100 a R$ 200' },
    { category: 'Duque (2 acertos)', odds: '1 em 36', typicalPrize: 'R$ 3 a R$ 7' },
  ],
  lotomania: [
    { category: '20 acertos', odds: '1 em 11.372.635', typicalPrize: 'A partir de R$ 1 milhao' },
    { category: '19 acertos', odds: '1 em 244.140', typicalPrize: 'R$ 20.000 a R$ 60.000' },
    { category: '18 acertos', odds: '1 em 15.504', typicalPrize: 'R$ 1.000 a R$ 3.000' },
    { category: '17 acertos', odds: '1 em 2.011', typicalPrize: 'R$ 100 a R$ 300' },
    { category: '16 acertos', odds: '1 em 458', typicalPrize: 'R$ 30 a R$ 50' },
    { category: '15 acertos', odds: '1 em 161', typicalPrize: 'R$ 6 a R$ 10' },
    { category: '0 acertos', odds: '1 em 11.372.635', typicalPrize: 'Mesmo premio dos 20 acertos' },
  ],
  'mais-milionaria': [
    { category: '6 acertos + 2 trevos', odds: '1 em 238.360.500', typicalPrize: 'A partir de R$ 10 milhoes' },
    { category: '6 acertos + 1 trevo', odds: '1 em 29.795.063', typicalPrize: 'R$ 50.000 a R$ 200.000' },
    { category: '6 acertos + 0 trevos', odds: '1 em 19.863.375', typicalPrize: 'R$ 10.000 a R$ 50.000' },
    { category: '5 acertos + 2 trevos', odds: '1 em 5.765.711', typicalPrize: 'R$ 5.000 a R$ 20.000' },
    { category: '5 acertos + 1 trevo', odds: '1 em 720.714', typicalPrize: 'R$ 500 a R$ 1.500' },
    { category: '5 acertos + 0 trevos', odds: '1 em 480.476', typicalPrize: 'R$ 200 a R$ 800' },
    { category: '4 acertos + 2 trevos', odds: '1 em 248.040', typicalPrize: 'R$ 100 a R$ 500' },
    { category: '4 acertos + 1 trevo', odds: '1 em 31.005', typicalPrize: 'R$ 30 a R$ 80' },
    { category: '4 acertos + 0 trevos', odds: '1 em 20.670', typicalPrize: 'R$ 12 a R$ 30' },
    { category: '3 acertos + 2 trevos', odds: '1 em 16.961', typicalPrize: 'R$ 12 a R$ 25' },
  ],
  'dia-de-sorte': [
    { category: '7 acertos', odds: '1 em 2.629.575', typicalPrize: 'A partir de R$ 300.000' },
    { category: '6 acertos', odds: '1 em 15.415', typicalPrize: 'R$ 1.000 a R$ 5.000' },
    { category: '5 acertos', odds: '1 em 453', typicalPrize: 'R$ 30 a R$ 60' },
    { category: '4 acertos', odds: '1 em 30', typicalPrize: 'R$ 4 a R$ 8' },
    { category: 'Mes da Sorte', odds: '1 em 12', typicalPrize: 'R$ 3 a R$ 6' },
  ],
  'super-sete': [
    { category: '7 acertos', odds: '1 em 10.000.000', typicalPrize: 'A partir de R$ 1 milhao' },
    { category: '6 acertos', odds: '1 em 476.190', typicalPrize: 'R$ 10.000 a R$ 50.000' },
    { category: '5 acertos', odds: '1 em 13.889', typicalPrize: 'R$ 500 a R$ 1.000' },
    { category: '4 acertos', odds: '1 em 277', typicalPrize: 'R$ 20 a R$ 50' },
    { category: '3 acertos', odds: '1 em 4', typicalPrize: 'R$ 3 a R$ 5' },
  ],
  'dupla-sena': [
    { category: 'Sena (6 acertos)', odds: '1 em 15.890.700', typicalPrize: 'A partir de R$ 500.000' },
    { category: 'Quina (5 acertos)', odds: '1 em 60.192', typicalPrize: 'R$ 3.000 a R$ 10.000' },
    { category: 'Quadra (4 acertos)', odds: '1 em 1.120', typicalPrize: 'R$ 50 a R$ 150' },
    { category: 'Terno (3 acertos)', odds: '1 em 60', typicalPrize: 'R$ 3 a R$ 6' },
  ],
  timemania: [
    { category: '7 acertos', odds: '1 em 26.472.637', typicalPrize: 'A partir de R$ 1 milhao' },
    { category: '6 acertos', odds: '1 em 216.040', typicalPrize: 'R$ 10.000 a R$ 50.000' },
    { category: '5 acertos', odds: '1 em 5.765', typicalPrize: 'R$ 500 a R$ 1.000' },
    { category: '4 acertos', odds: '1 em 297', typicalPrize: 'R$ 8 a R$ 15' },
    { category: '3 acertos', odds: '1 em 26', typicalPrize: 'R$ 3 a R$ 5' },
    { category: 'Time do Coracao', odds: '1 em 80', typicalPrize: 'R$ 8 a R$ 15' },
  ],
};

const bestOddsComparison = [
  { game: 'Lotofacil', bestOdds: '1 em 11 (11 acertos)', minBet: 'R$ 3,00' },
  { game: 'Super Sete', bestOdds: '1 em 4 (3 acertos)', minBet: 'R$ 2,50' },
  { game: 'Dia de Sorte', bestOdds: '1 em 12 (Mes da Sorte)', minBet: 'R$ 3,00' },
  { game: 'Timemania', bestOdds: '1 em 26 (3 acertos)', minBet: 'R$ 3,50' },
  { game: 'Quina', bestOdds: '1 em 36 (Duque)', minBet: 'R$ 2,50' },
  { game: 'Dia de Sorte', bestOdds: '1 em 30 (4 acertos)', minBet: 'R$ 3,00' },
  { game: 'Lotomania', bestOdds: '1 em 161 (15 acertos)', minBet: 'R$ 3,00' },
  { game: 'Dupla Sena', bestOdds: '1 em 60 (Terno)', minBet: 'R$ 2,50' },
  { game: 'Mega-Sena', bestOdds: '1 em 2.332 (Quadra)', minBet: 'R$ 5,00' },
  { game: '+Milionaria', bestOdds: '1 em 16.961 (3+2)', minBet: 'R$ 6,00' },
];

export default function ProbabilidadesPage() {
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
        name: 'Probabilidades',
        item: `${SITE_URL}/probabilidades`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-1">
            <li>
              <a href="/" className="hover:text-emerald-600">
                Inicio
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Probabilidades</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Probabilidades e Premios das Loterias da Caixa
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Tabelas completas com as probabilidades de acerto e faixas de premios tipicos de
          todas as 9 loterias da Caixa Economica Federal.
        </p>

        {/* Game odds tables */}
        {GAME_SLUGS.map((slug) => {
          const game = GAMES[slug];
          const rows = oddsData[slug];
          if (!rows) return null;

          return (
            <section
              key={slug}
              id={slug}
              className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {game.emoji} {game.name}
              </h2>
              <p className="mb-2 text-sm text-gray-600">
                Aposta minima: <strong className="text-gray-900">{game.minBet}</strong> |
                Numeros: escolha {game.selectNumbers} de {game.totalNumbers}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                        Faixa de Premio
                      </th>
                      <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                        Probabilidade
                      </th>
                      <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                        Premio Tipico
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td className="border-t border-gray-100 p-3 text-gray-700">
                          {row.category}
                        </td>
                        <td className="border-t border-gray-100 p-3 text-gray-700">
                          {row.odds}
                        </td>
                        <td className="border-t border-gray-100 p-3 text-gray-700">
                          {row.typicalPrize}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {/* Comparison */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Comparativo: Qual Loteria Tem as Melhores Chances?
          </h2>
          <p className="mb-4 text-gray-600">
            Ranking das loterias pela melhor probabilidade de ganhar qualquer premio
            (menor faixa premiada), ordenado da mais facil para a mais dificil:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                    Posicao
                  </th>
                  <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                    Loteria
                  </th>
                  <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                    Melhor Chance
                  </th>
                  <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                    Aposta Min.
                  </th>
                </tr>
              </thead>
              <tbody>
                {bestOddsComparison.map((row, i) => (
                  <tr key={i}>
                    <td className="border-t border-gray-100 p-3 font-medium text-gray-900">
                      {i + 1}o
                    </td>
                    <td className="border-t border-gray-100 p-3 text-gray-700">
                      {row.game}
                    </td>
                    <td className="border-t border-gray-100 p-3 text-gray-700">
                      {row.bestOdds}
                    </td>
                    <td className="border-t border-gray-100 p-3 text-gray-700">
                      {row.minBet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO content */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Entendendo as Probabilidades nas Loterias
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              As <strong className="text-gray-900">probabilidades</strong> nas loterias da
              Caixa sao calculadas com base em combinacoes matematicas. Quanto mais numeros
              disponiveis para escolha e menos numeros voce marca, menor a probabilidade de
              acertar todos. Cada sorteio e um evento independente, ou seja, os resultados
              anteriores nao influenciam os futuros.
            </p>
            <p>
              A <strong className="text-gray-900">+Milionaria</strong> tem a menor
              probabilidade de acerto na faixa principal (1 em 238 milhoes), mas oferece o
              maior premio minimo garantido (R$ 10 milhoes). Ja o{' '}
              <strong className="text-gray-900">Super Sete</strong> oferece a melhor chance
              de ganhar qualquer premio, com odds de 1 em 4 para acertar 3 colunas.
            </p>
            <p>
              Ao apostar com mais numeros (apostas ampliadas), voce aumenta suas chances
              proporcionalmente, mas o custo tambem cresce significativamente. Por exemplo,
              na Mega-Sena, apostar com 7 numeros custa R$ 35,00 e melhora a chance da
              sena para 1 em 7.151.980.
            </p>
            <p>
              Os valores dos premios variam a cada concurso, dependendo da arrecadacao e do
              numero de ganhadores em cada faixa. Os valores apresentados nesta pagina sao
              estimativas baseadas em premios recentes e podem variar.
            </p>
            <p>
              Para mais informacoes sobre como jogar cada loteria, visite nosso{' '}
              <a
                href="/como-jogar"
                className="text-emerald-600 hover:underline font-medium"
              >
                guia completo
              </a>
              . Duvidas frequentes sao respondidas na nossa pagina de{' '}
              <a
                href="/faq"
                className="text-emerald-600 hover:underline font-medium"
              >
                perguntas frequentes
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
