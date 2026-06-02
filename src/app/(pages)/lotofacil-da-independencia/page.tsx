import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';
import QuickAnswer from '@/components/ui/QuickAnswer';
import CountdownTimer from '@/components/ui/CountdownTimer';


export const metadata: Metadata = {
  title: 'Lotofácil da Independência — Resultado, Histórico e Próximo Sorteio',
  description:
    'Lotofácil da Independência: o sorteio especial de setembro com prêmio que não acumula. Confira resultados, histórico, regras e contagem regressiva.',
  alternates: {
    canonical: '/lotofacil-da-independencia',
    languages: {
      'pt-BR': `${SITE_URL}/lotofacil-da-independencia`,
    },
  },
  openGraph: {
    title: 'Lotofácil da Independência — Resultado e Histórico',
    description: 'O sorteio especial de setembro da Lotofácil. Prêmio milionário que não acumula.',
    url: `${SITE_URL}/lotofacil-da-independencia`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Lotof%C3%A1cil%20da%20Independ%C3%AAncia&color=%237C3AED', width: 1200, height: 630 }],
  },
};

const HISTORY = [
  { year: 2025, concurso: 3266, totalPrize: 'R$ 220.000.000,00', winners: 96, prizePerWinner: 'R$ 2.291.666,67', date: '06/09/2025' },
  { year: 2024, concurso: 3197, totalPrize: 'R$ 175.500.000,00', winners: 119, prizePerWinner: 'R$ 1.475.087,18', date: '07/09/2024' },
  { year: 2023, concurso: 2935, totalPrize: 'R$ 168.213.115,76', winners: 195, prizePerWinner: 'R$ 862.631,36', date: '09/09/2023' },
  { year: 2022, concurso: 2640, totalPrize: 'R$ 119.029.428,16', winners: 39, prizePerWinner: 'R$ 3.052.036,62', date: '10/09/2022' },
  { year: 2021, concurso: 2330, totalPrize: 'R$ 162.038.961,71', winners: 45, prizePerWinner: 'R$ 3.601.084,71', date: '11/09/2021' },
  { year: 2020, concurso: 2030, totalPrize: 'R$ 122.270.107,08', winners: 38, prizePerWinner: 'R$ 3.217.634,40', date: '12/09/2020' },
  { year: 2019, concurso: 1864, totalPrize: 'R$ 98.000.000,00', winners: 91, prizePerWinner: 'R$ 1.076.923,07', date: '07/09/2019' },
  { year: 2018, concurso: 1700, totalPrize: 'R$ 130.000.000,00', winners: 30, prizePerWinner: 'R$ 4.333.333,33', date: '08/09/2018' },
];

export default function LotofacilDaIndependenciaPage() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const drawDate = new Date(currentYear, 8, 6, 20, 0, 0); // Sept 6
  const nextDraw = now > drawDate ? new Date(currentYear + 1, 8, 6, 20, 0, 0) : drawDate;
  const nextYear = nextDraw.getFullYear();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Lotofácil da Independência',
        item: `${SITE_URL}/lotofacil-da-independencia`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'O que é a Lotofácil da Independência?',
      answer:
        'A Lotofácil da Independência é um sorteio especial da Lotofácil realizado anualmente no início de setembro, próximo ao feriado da Independência do Brasil (7 de setembro). Tem prêmio milionário e não acumula.',
    },
    {
      question: 'Quando é a Lotofácil da Independência ' + nextYear + '?',
      answer:
        `A Lotofácil da Independência ${nextYear} está prevista para ocorrer no início de setembro de ${nextYear}, em geral no sábado mais próximo do feriado de 7 de setembro.`,
    },
    {
      question: 'A Lotofácil da Independência acumula?',
      answer:
        'Não. Se nenhum apostador acertar as 15 dezenas, o prêmio é dividido entre os acertadores da segunda faixa (14 acertos), garantindo que alguém leve o prêmio principal.',
    },
    {
      question: 'Quanto custa apostar na Lotofácil da Independência?',
      answer:
        'O preço é o mesmo da Lotofácil normal: R$ 3,00 para a aposta simples (15 números). É possível apostar até 20 números, com custos progressivamente mais altos.',
    },
    {
      question: 'Qual foi o maior prêmio da Lotofácil da Independência?',
      answer:
        'O maior prêmio total da história foi o de 2025 (concurso 3266), que pagou R$ 220 milhões — distribuídos entre 96 ganhadores, com R$ 2,29 milhões para cada um.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
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

      {/* Hero — Independence theme: green, yellow, blue */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span>Lotofácil da Independência</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🇧🇷</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Concurso Especial
            </span>
          </div>
          <h1 className="speakable text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Lotofácil da Independência {nextYear}
          </h1>
          <p className="speakable text-lg text-purple-100 max-w-2xl mb-6">
            O sorteio especial de setembro da Lotofácil. Prêmio milionário
            que não acumula — se ninguém acertar 15 dezenas, vai para a
            faixa de 14 acertos.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-xl p-4 inline-block">
            <p className="text-purple-100 text-sm mb-2">Próximo sorteio: setembro de {nextYear}</p>
            <CountdownTimer targetDate={nextDraw} label="Faltam" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <QuickAnswer question="O que é a Lotofácil da Independência?" icon="🇧🇷">
          É o <strong>sorteio especial da Lotofácil</strong> realizado anualmente
          em <strong>setembro</strong>, próximo ao feriado da Independência. Em 2025
          pagou <strong>R$ 220 milhões</strong> divididos entre 96 ganhadores.
          O prêmio principal <strong>não acumula</strong> — se ninguém acertar
          15 dezenas, o valor vai para a faixa de 14 acertos.
        </QuickAnswer>

        {/* Last result highlight */}
        <section className="rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Última Edição — 2025
            </h2>
            <span className="text-sm text-gray-500">Concurso {HISTORY[0].concurso}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Prêmio total:</p>
              <p className="text-2xl font-bold text-purple-700">
                {HISTORY[0].totalPrize}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ganhadores:</p>
              <p className="font-bold text-gray-900">
                {HISTORY[0].winners} apostas premiadas
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {HISTORY[0].prizePerWinner} para cada
              </p>
            </div>
          </div>
          <Link
            href="/lotofacil"
            className="inline-flex items-center gap-2 mt-4 text-purple-700 hover:text-purple-800 font-medium"
          >
            Ver últimos resultados da Lotofácil →
          </Link>
        </section>

        {/* Quick info cards */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm text-gray-500 mb-1">Mês do sorteio</p>
            <p className="font-bold text-gray-900">Setembro</p>
            <p className="text-xs text-gray-500">Próximo ao 7 de setembro</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm text-gray-500 mb-1">Aposta mínima</p>
            <p className="font-bold text-gray-900">R$ 3,00</p>
            <p className="text-xs text-gray-500">15 números (mesma da Lotofácil)</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm text-gray-500 mb-1">Recorde</p>
            <p className="font-bold text-gray-900">R$ 220 milhões</p>
            <p className="text-xs text-gray-500">2025 (96 ganhadores)</p>
          </div>
        </section>

        {/* History */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Histórico da Lotofácil da Independência
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Ano</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Concurso</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Data</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Prêmio Total</th>
                  <th scope="col" className="text-center py-3 px-4 font-semibold text-gray-900">Ganhadores</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Por Ganhador</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((item) => (
                  <tr key={item.year} className="border-b border-gray-100 hover:bg-purple-50">
                    <td className="py-3 px-4 font-bold text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-gray-700 font-mono">{item.concurso}</td>
                    <td className="py-3 px-4 text-gray-700">{item.date}</td>
                    <td className="py-3 px-4 text-purple-700 font-semibold">{item.totalPrize}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{item.winners}</td>
                    <td className="py-3 px-4 text-gray-700">{item.prizePerWinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            Sobre a Lotofácil da Independência
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              A Lotofácil da Independência é o concurso especial mais aguardado
              da modalidade. Realizado anualmente no início de setembro, em
              homenagem ao feriado da Independência do Brasil, oferece prêmios
              milionários e regras especiais que garantem ganhador a cada edição.
            </p>
            <p className="text-gray-600">
              Por ter probabilidades melhores que a Mega-Sena (1 em 3,2 milhões
              vs. 1 em 50 milhões), e pelo prêmio principal não acumular,
              concentra grande volume de apostas e dezenas de ganhadores por edição.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/lotofacil" className="text-purple-700 hover:underline font-medium">
              Lotofácil
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/mega-da-virada" className="text-purple-700 hover:underline font-medium">
              Mega da Virada
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-purple-700 hover:underline font-medium">
              Maiores Prêmios
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dicas-para-apostar" className="text-purple-700 hover:underline font-medium">
              Dicas
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
