import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';
import QuickAnswer from '@/components/ui/QuickAnswer';

export const metadata: Metadata = {
  title: 'Para Onde Vai o Dinheiro das Loterias da Caixa?',
  description:
    'Entenda o destino do dinheiro arrecadado pelas loterias da Caixa. Repasses para educação, saúde, esporte, segurança pública, cultura e mais. Detalhamento por programa.',
  alternates: {
    canonical: '/onde-vai-o-dinheiro',
    languages: {
      'pt-BR': `${SITE_URL}/onde-vai-o-dinheiro`,
    },
  },
  openGraph: {
    title: 'Para Onde Vai o Dinheiro das Loterias da Caixa?',
    description:
      'Repasses sociais das loterias: educação, saúde, esporte, segurança e mais.',
    url: `${SITE_URL}/onde-vai-o-dinheiro`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Onde%20Vai%20o%20Dinheiro%20das%20Loterias&color=%23059669', width: 1200, height: 630 }],
  },
};

const DESTINATIONS = [
  {
    pct: 17.32,
    color: 'bg-blue-500',
    name: 'Esporte',
    desc: 'Recursos para Comitê Olímpico Brasileiro (COB), Comitê Paralímpico Brasileiro (CPB), Confederações Esportivas, clubes de futebol e Lei de Incentivo ao Esporte.',
    icon: '⚽',
    examples: ['Time Brasil nas Olimpíadas', 'Apoio a atletas paralímpicos', 'Repasse a clubes de futebol'],
  },
  {
    pct: 17.32,
    color: 'bg-emerald-500',
    name: 'Educação',
    desc: 'Fundo de Financiamento Estudantil (FIES), apoiando o ensino superior e técnico em instituições privadas.',
    icon: '🎓',
    examples: ['Bolsas universitárias FIES', 'Apoio a estudantes de baixa renda', 'Investimento em ensino técnico'],
  },
  {
    pct: 7.86,
    color: 'bg-red-500',
    name: 'Segurança Pública',
    desc: 'Fundo Nacional de Segurança Pública (FNSP), modernização das forças policiais e sistema penitenciário.',
    icon: '🚓',
    examples: ['Equipamentos policiais', 'Capacitação de agentes', 'Combate ao crime organizado'],
  },
  {
    pct: 4.07,
    color: 'bg-purple-500',
    name: 'Cultura',
    desc: 'Fundo Nacional de Cultura (FNC), apoiando produções culturais, eventos e preservação do patrimônio.',
    icon: '🎭',
    examples: ['Editais de fomento cultural', 'Restauração de patrimônio', 'Apoio a artistas independentes'],
  },
  {
    pct: 3.0,
    color: 'bg-pink-500',
    name: 'Saúde',
    desc: 'Programas de saúde pública, ações de combate ao câncer e doenças graves.',
    icon: '🏥',
    examples: ['Combate ao câncer', 'Equipamentos hospitalares', 'Programas de prevenção'],
  },
  {
    pct: 2.16,
    color: 'bg-indigo-500',
    name: 'Cruz Vermelha',
    desc: 'Apoio à Cruz Vermelha Brasileira em ações humanitárias, voluntariado e atendimento de emergências.',
    icon: '➕',
    examples: ['Atendimento a desastres', 'Voluntariado humanitário', 'Cursos de primeiros socorros'],
  },
  {
    pct: 0.27,
    color: 'bg-amber-500',
    name: 'Custos Operacionais Caixa',
    desc: 'Manutenção do sistema de loterias, lotéricas credenciadas e operação dos sorteios.',
    icon: '🏦',
    examples: ['Comissão de lotéricas', 'Sistemas de TI', 'Operação de sorteios'],
  },
];

const TOTAL_PRIZE_PCT = 47.0; // approximate

export default function OndeVaiODinheiroPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Para Onde Vai o Dinheiro',
        item: `${SITE_URL}/onde-vai-o-dinheiro`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'Quanto do dinheiro das loterias vai para premiação?',
      answer:
        'Aproximadamente 47% da arrecadação total das loterias da Caixa é destinada à premiação dos apostadores. O restante (cerca de 53%) é dividido entre repasses sociais, custos operacionais e impostos.',
    },
    {
      question: 'A Caixa lucra com as loterias?',
      answer:
        'A Caixa Econômica Federal recebe apenas 0,27% para cobrir custos operacionais. Não é uma fonte de lucro privado — todo o restante vai para prêmios, programas sociais e impostos.',
    },
    {
      question: 'Para onde vai o dinheiro de prêmios não resgatados?',
      answer:
        'Prêmios não resgatados em até 90 dias são automaticamente destinados ao Fundo de Financiamento Estudantil (FIES), apoiando estudantes do ensino superior privado.',
    },
    {
      question: 'Como sei se o dinheiro realmente é repassado?',
      answer:
        'A Caixa publica balanços anuais detalhando os repasses para cada programa social. O Tribunal de Contas da União (TCU) fiscaliza esses repasses periodicamente.',
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
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-100 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span>Para Onde Vai o Dinheiro</span>
          </nav>
          <h1 className="speakable text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Para Onde Vai o Dinheiro das Loterias?
          </h1>
          <p className="speakable text-lg text-emerald-100 max-w-2xl">
            Cada aposta também é uma contribuição para programas sociais.
            Veja exatamente como a arrecadação das loterias da Caixa é dividida
            entre prêmios, educação, saúde, esporte e mais.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <QuickAnswer question="Para onde vai o dinheiro das loterias da Caixa?" icon="💰">
          Em média, <strong>47% vai para a premiação</strong> dos apostadores.
          Os outros 53% são divididos: <strong>17,32% para Esporte</strong>,
          <strong> 17,32% para Educação (FIES)</strong>, <strong>7,86% para Segurança Pública</strong>,
          <strong> 4,07% para Cultura</strong>, <strong>3% para Saúde</strong>,
          <strong> 2,16% para Cruz Vermelha</strong>, e o restante para impostos
          e custos operacionais.
        </QuickAnswer>

        {/* Visual breakdown bar */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Distribuição da Arrecadação
          </h2>

          {/* Stacked bar */}
          <div className="mb-6">
            <div className="flex h-6 rounded-lg overflow-hidden">
              <div className="bg-emerald-600" style={{ width: `${TOTAL_PRIZE_PCT}%` }} title={`Prêmios: ${TOTAL_PRIZE_PCT}%`} />
              {DESTINATIONS.map((d) => (
                <div key={d.name} className={d.color} style={{ width: `${d.pct}%` }} title={`${d.name}: ${d.pct}%`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600" /> Prêmios ({TOTAL_PRIZE_PCT}%)
              </span>
              {DESTINATIONS.map((d) => (
                <span key={d.name} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded ${d.color}`} /> {d.name} ({d.pct}%)
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed cards */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detalhamento por Destinação
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DESTINATIONS.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                    <h3 className="font-bold text-gray-900">{d.name}</h3>
                  </div>
                  <span
                    className={`${d.color} text-white text-sm font-bold px-2.5 py-1 rounded-full`}
                  >
                    {d.pct}%
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{d.desc}</p>
                <ul className="space-y-1">
                  {d.examples.map((ex) => (
                    <li key={ex} className="text-xs text-gray-500 flex gap-1.5">
                      <span className="text-gray-400">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Annual impact callout */}
        <section className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span aria-hidden="true">📊</span> Impacto Real
          </h2>
          <p className="text-emerald-50 mb-4">
            Em 2024, as loterias da Caixa repassaram aproximadamente
            <strong className="text-white"> R$ 11 bilhões </strong>
            para programas sociais — recurso fundamental para esporte,
            educação, saúde e segurança pública no Brasil.
          </p>
          <a
            href="https://www.caixa.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            Balanço oficial da Caixa →
          </a>
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
            A Loteria como Instrumento de Política Social
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              As loterias da Caixa Econômica Federal são reguladas por leis
              federais que determinam a destinação obrigatória de parte da
              arrecadação a programas sociais. Isso transforma cada aposta em
              uma forma indireta de financiar áreas críticas como educação,
              esporte, segurança pública e saúde.
            </p>
            <p className="text-gray-600">
              Esse modelo é uma das principais justificativas legais e éticas
              para a manutenção do monopólio da Caixa sobre as loterias federais —
              parte significativa do dinheiro retorna para a sociedade na forma
              de programas e investimentos públicos.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/sobre" className="text-emerald-600 hover:underline font-medium">
              Sobre Nós
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/jogo-responsavel" className="text-emerald-600 hover:underline font-medium">
              Jogo Responsável
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-emerald-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-emerald-600 hover:underline font-medium">
              Maiores Prêmios
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
