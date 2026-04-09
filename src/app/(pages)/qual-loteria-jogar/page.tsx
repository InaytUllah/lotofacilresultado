import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME, GAMES, GAME_SLUGS } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Qual Loteria Jogar? Comparativo Completo das Loterias da Caixa',
  description:
    'Compare todas as loterias da Caixa lado a lado. Probabilidades, prêmios médios, custo da aposta, frequência de sorteios e recomendações para cada perfil de apostador.',
  alternates: {
    canonical: '/qual-loteria-jogar',
    languages: {
      'pt-BR': `${SITE_URL}/qual-loteria-jogar`,
    },
  },
  openGraph: {
    title: 'Qual Loteria Jogar? Comparativo Completo',
    description:
      'Compare todas as loterias da Caixa lado a lado. Probabilidades, prêmios, custos e recomendações.',
    url: `${SITE_URL}/qual-loteria-jogar`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Qual%20Loteria%20Jogar%3F&color=%239333ea', width: 1200, height: 630 }],
  },
};

const LOTTERY_PROFILES = [
  {
    profile: 'Quer a maior chance de ganhar',
    recommendation: 'lotofacil',
    reason: 'A Lotofácil tem a melhor probabilidade: 1 em 3,2 milhões. Chances reais de acerto, prêmios consistentes.',
  },
  {
    profile: 'Quer o maior prêmio possível',
    recommendation: 'mega-sena',
    reason: 'A Mega-Sena tem os maiores prêmios do Brasil, frequentemente ultrapassando R$ 100 milhões quando acumula.',
  },
  {
    profile: 'Quer apostar barato',
    recommendation: 'quina',
    reason: 'A Quina tem a aposta mais barata (R$ 2,50) com sorteios 6x por semana e prêmios relevantes.',
  },
  {
    profile: 'Gosta de sorteios frequentes',
    recommendation: 'lotofacil',
    reason: 'A Lotofácil sorteia 6 vezes por semana (segunda a sábado), maximizando suas oportunidades.',
  },
  {
    profile: 'Prefere formatos diferentes',
    recommendation: 'super-sete',
    reason: 'O Super Sete usa colunas em vez de dezenas, trazendo uma experiência de jogo única.',
  },
  {
    profile: 'Quer prêmio mínimo garantido',
    recommendation: 'mais-milionaria',
    reason: 'A +Milionária garante R$ 10 milhões na segunda faixa, independente da arrecadação.',
  },
];

const COMPARISON_DATA = [
  { slug: 'mega-sena', odds: '1 : 50.063.860', cost: 'R$ 5,00', avgPrize: 'R$ 3–300M', drawsWeek: 3, numbers: '6/60', rating: 3 },
  { slug: 'lotofacil', odds: '1 : 3.268.760', cost: 'R$ 3,00', avgPrize: 'R$ 1–5M', drawsWeek: 6, numbers: '15/25', rating: 5 },
  { slug: 'quina', odds: '1 : 24.040.016', cost: 'R$ 2,50', avgPrize: 'R$ 2–15M', drawsWeek: 6, numbers: '5/80', rating: 4 },
  { slug: 'lotomania', odds: '1 : 11.372.635', cost: 'R$ 3,00', avgPrize: 'R$ 1–5M', drawsWeek: 3, numbers: '50/100', rating: 4 },
  { slug: 'timemania', odds: '1 : 26.472.637', cost: 'R$ 3,50', avgPrize: 'R$ 1–10M', drawsWeek: 3, numbers: '10/80', rating: 3 },
  { slug: 'dupla-sena', odds: '1 : 15.890.700', cost: 'R$ 3,00', avgPrize: 'R$ 500K–5M', drawsWeek: 3, numbers: '6/50 (×2)', rating: 4 },
  { slug: 'dia-de-sorte', odds: '1 : 2.629.575', cost: 'R$ 3,00', avgPrize: 'R$ 500K–3M', drawsWeek: 3, numbers: '7/31', rating: 4 },
  { slug: 'super-sete', odds: '1 : 10.000.000', cost: 'R$ 3,00', avgPrize: 'R$ 500K–5M', drawsWeek: 3, numbers: '7 col.', rating: 3 },
  { slug: 'mais-milionaria', odds: '1 : 238.360.500', cost: 'R$ 6,00', avgPrize: 'R$ 10M+', drawsWeek: 2, numbers: '6/50+2/6', rating: 2 },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500" aria-label={`${rating} de 5 estrelas`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function QualLoteriaJogarPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Qual Loteria Jogar',
        item: `${SITE_URL}/qual-loteria-jogar`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Qual loteria da Caixa tem mais chance de ganhar?',
      answer:
        'O Dia de Sorte tem a melhor probabilidade no prêmio principal (1 em 2,6 milhões). A Lotofácil vem logo atrás com 1 em 3,2 milhões. Para comparação, a Mega-Sena tem chance de 1 em 50 milhões.',
    },
    {
      question: 'Qual loteria paga o maior prêmio?',
      answer:
        'A Mega-Sena tem os maiores prêmios históricos, com recordes acima de R$ 500 milhões na Mega da Virada. A +Milionária pode acumular indefinidamente e garante R$ 10 milhões na segunda faixa.',
    },
    {
      question: 'Qual a loteria mais barata para apostar?',
      answer:
        'A Quina é a mais barata com aposta simples de R$ 2,50. A Lotofácil, Lotomania, Dupla Sena, Dia de Sorte e Super Sete custam R$ 3,00 cada.',
    },
    {
      question: 'É melhor apostar em uma ou várias loterias?',
      answer:
        'Diversificar entre loterias com boas probabilidades (como Lotofácil e Dia de Sorte) pode ser mais eficiente do que concentrar todo o orçamento em uma única modalidade com baixa probabilidade.',
    },
    {
      question: 'Qual loteria sorteia mais vezes por semana?',
      answer:
        'Lotofácil e Quina sorteiam 6 vezes por semana (segunda a sábado). A +Milionária sorteia apenas 2 vezes (quarta e sábado).',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Qual Loteria Jogar</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Qual Loteria Jogar?
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            Comparativo completo entre todas as 9 loterias da Caixa.
            Encontre a melhor opção para o seu perfil e orçamento.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Comparison Table */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Comparativo Geral
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Loteria</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Probabilidade</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Aposta</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Prêmio</th>
                  <th scope="col" className="text-center py-3 px-4 font-semibold text-gray-900">Sorteios/Sem.</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Formato</th>
                  <th scope="col" className="text-center py-3 px-4 font-semibold text-gray-900">Nota</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row) => {
                  const game = GAMES[row.slug];
                  return (
                    <tr key={row.slug} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Link
                          href={`/${row.slug}`}
                          className="font-medium hover:underline"
                          style={{ color: game.color }}
                        >
                          {game.emoji} {game.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-mono text-xs">{row.odds}</td>
                      <td className="py-3 px-4 text-gray-700">{row.cost}</td>
                      <td className="py-3 px-4 text-gray-700">{row.avgPrize}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{row.drawsWeek}×</td>
                      <td className="py-3 px-4 text-gray-700 font-mono text-xs">{row.numbers}</td>
                      <td className="py-3 px-4 text-center"><RatingStars rating={row.rating} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommendations by Profile */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recomendação por Perfil
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {LOTTERY_PROFILES.map((item, index) => {
              const game = GAMES[item.recommendation];
              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    {item.profile}
                  </p>
                  <Link
                    href={`/${item.recommendation}`}
                    className="text-lg font-bold hover:underline flex items-center gap-2 mb-2"
                    style={{ color: game.color }}
                  >
                    {game.emoji} {game.name}
                  </Link>
                  <p className="text-gray-600 text-sm">{item.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Insights */}
        <section className="rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4">
            Resumo Rápido
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-purple-200 text-sm mb-1">Melhor chance</p>
              <p className="font-bold text-lg">Dia de Sorte</p>
              <p className="text-purple-200 text-sm">1 em 2,6 milhões</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-purple-200 text-sm mb-1">Maior prêmio</p>
              <p className="font-bold text-lg">Mega-Sena</p>
              <p className="text-purple-200 text-sm">Até R$ 500+ milhões</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-purple-200 text-sm mb-1">Mais barata</p>
              <p className="font-bold text-lg">Quina</p>
              <p className="text-purple-200 text-sm">R$ 2,50 por aposta</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group rounded-xl border border-gray-200 bg-white transition-colors hover:border-gray-300"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-gray-800 [&::-webkit-details-marker]:hidden list-none">
                  <span>{item.question}</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Escolhendo a Loteria Certa para Você
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Cada loteria da Caixa tem características próprias que a
              tornam mais adequada para diferentes perfis de apostadores.
              Enquanto a Mega-Sena atrai pela promessa de prêmios
              milionários, loterias como Lotofácil e Dia de Sorte
              oferecem chances significativamente melhores de acerto.
            </p>
            <p className="text-gray-600">
              A decisão deve considerar não apenas o tamanho do prêmio,
              mas também o custo da aposta, a frequência dos sorteios e
              principalmente a probabilidade. Um bom equilíbrio entre
              esses fatores, aliado a um orçamento controlado, é a base
              de uma experiência positiva com loterias.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/probabilidades" className="text-purple-600 hover:underline font-medium">
              Probabilidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dicas-para-apostar" className="text-purple-600 hover:underline font-medium">
              Dicas para Apostar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-purple-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/bolao" className="text-purple-600 hover:underline font-medium">
              Calculadora de Bolão
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/glossario" className="text-purple-600 hover:underline font-medium">
              Glossário
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
