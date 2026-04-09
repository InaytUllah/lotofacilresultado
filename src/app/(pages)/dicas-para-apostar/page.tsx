import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Dicas para Apostar na Loteria - Estratégias e Orientações',
  description:
    'Dicas práticas para apostar nas loterias da Caixa. Estratégias de escolha de números, bolões, gestão de orçamento e erros comuns. Guia completo para apostadores.',
  alternates: {
    canonical: '/dicas-para-apostar',
    languages: {
      'pt-BR': `${SITE_URL}/dicas-para-apostar`,
    },
  },
  openGraph: {
    title: 'Dicas para Apostar na Loteria - Estratégias e Orientações',
    description:
      'Dicas práticas para apostar nas loterias da Caixa. Estratégias, bolões, gestão de orçamento e erros comuns.',
    url: `${SITE_URL}/dicas-para-apostar`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Dicas%20para%20Apostar&color=%232563eb', width: 1200, height: 630 }],
  },
};

export default function DicasParaApostarPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dicas para Apostar',
        item: `${SITE_URL}/dicas-para-apostar`,
      },
    ],
  };

  const tips = [
    {
      title: 'Diversifique seus números',
      desc: 'Evite apostar sempre nos mesmos números. Distribua entre baixos (1-30) e altos (31-60), pares e ímpares. Análise estatística mostra que sorteios tendem a ter equilíbrio entre essas categorias.',
      icon: '🎯',
    },
    {
      title: 'Aposte em bolões',
      desc: 'Bolões aumentam significativamente suas chances sem aumentar o investimento individual. Um bolão de 10 cotas na Mega-Sena multiplica suas chances por 10 com custo dividido.',
      icon: '👥',
    },
    {
      title: 'Defina um orçamento mensal',
      desc: 'Estabeleça um valor fixo por mês para apostas e nunca ultrapasse. Loteria é entretenimento, não investimento. Aposte apenas o que pode perder sem comprometer suas finanças.',
      icon: '💰',
    },
    {
      title: 'Evite sequências óbvias',
      desc: 'Números como 1-2-3-4-5-6 ou datas de aniversário (limitadas a 31) são muito populares. Se ganhar, dividirá o prêmio com mais pessoas. Prefira combinações menos comuns.',
      icon: '🔢',
    },
    {
      title: 'Considere a Lotofácil',
      desc: 'Com chance de 1 em 3,2 milhões (vs 1 em 50 milhões da Mega-Sena), a Lotofácil oferece probabilidades muito melhores. Prêmios menores, mas chances reais de ganhar.',
      icon: '📊',
    },
    {
      title: 'Use o desdobramento',
      desc: 'Apostar com mais números que o mínimo (ex: 7 na Mega-Sena em vez de 6) aumenta exponencialmente suas chances. Custa mais, mas a relação custo-benefício pode valer.',
      icon: '📈',
    },
    {
      title: 'Acompanhe os resultados',
      desc: 'Confira sempre seus bilhetes. Milhões em prêmios prescrevem todo ano porque apostadores não conferem. Use nosso conferidor automático para nunca perder um prêmio.',
      icon: '✅',
    },
    {
      title: 'Aproveite concursos acumulados',
      desc: 'Quando o prêmio acumula, a relação entre investimento e retorno potencial melhora. Muitos apostadores concentram seus recursos nos concursos com prêmios maiores.',
      icon: '🏆',
    },
  ];

  const commonMistakes = [
    {
      mistake: 'Apostar apenas em datas de aniversário',
      why: 'Limita seus números a 1-31, ignorando metade do universo numérico. Diminui o prêmio em caso de acerto por ser muito popular.',
    },
    {
      mistake: 'Gastar mais do que pode',
      why: 'A probabilidade de ganhar é baixíssima. Comprometer o orçamento familiar com apostas é um erro financeiro grave.',
    },
    {
      mistake: 'Não conferir os resultados',
      why: 'O prazo para resgate é de 90 dias. Milhões em prêmios expiram anualmente por falta de conferência.',
    },
    {
      mistake: 'Acreditar em "números quentes"',
      why: 'Cada sorteio é independente. Um número ter saído mais vezes no passado não aumenta sua chance de sair novamente.',
    },
    {
      mistake: 'Jogar sempre os mesmos números',
      why: 'Não há vantagem estatística. A chance é a mesma a cada sorteio, independentemente dos números escolhidos.',
    },
  ];

  const faqItems = [
    {
      question: 'Existe alguma estratégia garantida para ganhar na loteria?',
      answer:
        'Não. Loterias são jogos de azar e nenhuma estratégia garante vitória. As dicas servem para otimizar suas apostas e evitar erros comuns, mas a probabilidade permanece a mesma.',
    },
    {
      question: 'É melhor apostar sempre nos mesmos números ou variar?',
      answer:
        'Estatisticamente, não faz diferença. Cada sorteio é independente. Porém, variar pode ser mais divertido e evita a frustração de ver "seus números" saírem quando você não jogou.',
    },
    {
      question: 'Quantos números devo apostar além do mínimo?',
      answer:
        'Depende do seu orçamento. Na Mega-Sena, apostar 7 números (em vez de 6) multiplica suas chances por 7 mas custa 7x mais. Avalie se a relação custo-benefício vale para você.',
    },
    {
      question: 'Bolão realmente aumenta as chances?',
      answer:
        'Sim. Um bolão de 20 cotas na Mega-Sena com 7 números tem 140x mais chances que uma aposta simples, e cada cota custa uma fração do total.',
    },
    {
      question: 'Qual a melhor loteria para apostar?',
      answer:
        'Depende do que você procura. A Lotofácil tem as melhores chances (1 em 3,2 milhões). A Mega-Sena paga mais, mas a chance é de 1 em 50 milhões. A +Milionária oferece prêmio fixo de R$ 10 milhões na segunda faixa.',
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Dicas para Apostar</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Dicas para Apostar na Loteria
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Orientações práticas para apostar de forma inteligente nas
            loterias da Caixa. Estratégias, erros comuns e gestão de
            orçamento.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Tips Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            8 Dicas Essenciais
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                  <span>{tip.icon}</span> {tip.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="rounded-xl border-2 border-red-200 bg-red-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>❌</span> Erros Comuns a Evitar
          </h2>
          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">
                  {index + 1}.
                </span>
                <div>
                  <p className="font-medium text-gray-900">{item.mistake}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Odds Comparison */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Comparativo de Chances
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Loteria</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Chance (aposta simples)</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Custo mínimo</th>
                  <th scope="col" className="text-left py-3 font-semibold text-gray-900">Prêmio médio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Lotofácil', odds: '1 em 3,2 milhões', cost: 'R$ 3,00', prize: 'R$ 1-5 milhões' },
                  { name: 'Quina', odds: '1 em 24 milhões', cost: 'R$ 2,50', prize: 'R$ 2-10 milhões' },
                  { name: 'Lotomania', odds: '1 em 11,3 milhões', cost: 'R$ 3,00', prize: 'R$ 1-5 milhões' },
                  { name: 'Mega-Sena', odds: '1 em 50 milhões', cost: 'R$ 5,00', prize: 'R$ 3-300 milhões' },
                  { name: '+Milionária', odds: '1 em 238 milhões', cost: 'R$ 6,00', prize: 'R$ 10+ milhões' },
                ].map((game) => (
                  <tr key={game.name} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-gray-700">{game.name}</td>
                    <td className="py-3 pr-4 text-gray-700">{game.odds}</td>
                    <td className="py-3 pr-4 text-gray-700">{game.cost}</td>
                    <td className="py-3 text-gray-700">{game.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Responsible Gaming Banner */}
        <section className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>🛡️</span> Jogue com Responsabilidade
          </h2>
          <p className="text-emerald-100 mb-4">
            Loteria é entretenimento, não investimento. Defina um
            orçamento, respeite seus limites e nunca aposte dinheiro que
            você não pode perder. Se sentir que está perdendo o controle,
            procure ajuda.
          </p>
          <Link
            href="/jogo-responsavel"
            className="inline-flex items-center px-4 py-2 bg-white text-emerald-700 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            Saiba mais sobre jogo responsável →
          </Link>
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
            Apostando com Inteligência nas Loterias da Caixa
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Apostar na loteria faz parte da cultura brasileira. Milhões
              de pessoas fazem suas apostas toda semana, sonhando com a
              chance de mudar de vida. Embora não exista fórmula mágica
              para ganhar, seguir boas práticas pode tornar a experiência
              mais agradável e segura.
            </p>
            <p className="text-gray-600">
              O mais importante é tratar a loteria como entretenimento.
              Defina um orçamento mensal fixo, diversifique suas apostas
              entre diferentes modalidades e sempre confira seus
              resultados. Use nossas ferramentas para facilitar o
              acompanhamento.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/probabilidades" className="text-blue-600 hover:underline font-medium">
              Probabilidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/gerador" className="text-blue-600 hover:underline font-medium">
              Gerador de Números
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/bolao" className="text-blue-600 hover:underline font-medium">
              Calculadora de Bolão
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/conferidor" className="text-blue-600 hover:underline font-medium">
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-blue-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/jogo-responsavel" className="text-blue-600 hover:underline font-medium">
              Jogo Responsável
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
