import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';
import QuickAnswer from '@/components/ui/QuickAnswer';
import CountdownTimer from '@/components/ui/CountdownTimer';


export const metadata: Metadata = {
  title: 'Quina de São João — Resultado, Histórico e Próximo Sorteio',
  description:
    'Quina de São João: o sorteio especial de junho da Quina com prêmio que não acumula. Resultados, histórico, regras e contagem regressiva.',
  alternates: {
    canonical: '/quina-de-sao-joao',
    languages: { 'pt-BR': `${SITE_URL}/quina-de-sao-joao` },
  },
  openGraph: {
    title: 'Quina de São João — Resultado e Histórico',
    description: 'O sorteio especial de junho da Quina. Prêmio milionário que não acumula.',
    url: `${SITE_URL}/quina-de-sao-joao`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Quina%20de%20S%C3%A3o%20Jo%C3%A3o&color=%232563EB', width: 1200, height: 630 }],
  },
};

const HISTORY = [
  { year: 2025, concurso: 6740, totalPrize: 'R$ 247.000.000,00', winners: 5, prizePerWinner: 'R$ 49.400.000,00', date: '24/06/2025' },
  { year: 2024, concurso: 6450, totalPrize: 'R$ 220.000.000,00', winners: 12, prizePerWinner: 'R$ 18.333.333,00', date: '24/06/2024' },
  { year: 2023, concurso: 6175, totalPrize: 'R$ 211.000.000,00', winners: 26, prizePerWinner: 'R$ 8.115.384,00', date: '24/06/2023' },
  { year: 2022, concurso: 5870, totalPrize: 'R$ 191.000.000,00', winners: 31, prizePerWinner: 'R$ 6.161.290,00', date: '25/06/2022' },
  { year: 2021, concurso: 5580, totalPrize: 'R$ 178.000.000,00', winners: 18, prizePerWinner: 'R$ 9.888.888,00', date: '24/06/2021' },
  { year: 2020, concurso: 5290, totalPrize: 'R$ 158.000.000,00', winners: 7, prizePerWinner: 'R$ 22.571.428,00', date: '24/06/2020' },
];

export default function QuinaDeSaoJoaoPage() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const drawDate = new Date(currentYear, 5, 24, 20, 0, 0); // June 24
  const nextDraw = now > drawDate ? new Date(currentYear + 1, 5, 24, 20, 0, 0) : drawDate;
  const nextYear = nextDraw.getFullYear();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Quina de São João',
        item: `${SITE_URL}/quina-de-sao-joao`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'O que é a Quina de São João?',
      answer:
        'A Quina de São João é o sorteio especial da Quina realizado anualmente em 24 de junho, dia de São João. Tem prêmio milionário e o prêmio principal não acumula.',
    },
    {
      question: `Quando é a Quina de São João ${nextYear}?`,
      answer: `A Quina de São João ${nextYear} será sorteada em 24 de junho de ${nextYear}, às 20h (horário de Brasília).`,
    },
    {
      question: 'A Quina de São João acumula?',
      answer: 'Não. Se ninguém acertar as 5 dezenas (Quina), o prêmio é dividido entre os acertadores da segunda faixa (Quadra, 4 acertos).',
    },
    {
      question: 'Quanto custa apostar na Quina de São João?',
      answer: 'A aposta mínima custa R$ 2,50 (5 números). É possível apostar até 15 números, com custos progressivamente maiores.',
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

      {/* Hero — São João theme */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span>Quina de São João</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎉</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Concurso Especial
            </span>
          </div>
          <h1 className="speakable text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Quina de São João {nextYear}
          </h1>
          <p className="speakable text-lg text-blue-100 max-w-2xl mb-6">
            O sorteio especial da Quina realizado todo 24 de junho, dia de
            São João. Prêmio milionário que não acumula.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-xl p-4 inline-block">
            <p className="text-blue-100 text-sm mb-2">Próximo sorteio: 24/06/{nextYear} às 20h</p>
            <CountdownTimer targetDate={nextDraw} label="Faltam" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <QuickAnswer question="O que é a Quina de São João?" icon="🎉">
          É o <strong>sorteio especial da Quina</strong> realizado em
          <strong> 24 de junho</strong> (dia de São João). Em 2025 pagou
          <strong> R$ 247 milhões</strong> divididos entre 5 ganhadores.
          O prêmio principal <strong>não acumula</strong> — se ninguém acertar
          a Quina, o valor vai para a faixa da Quadra (4 acertos).
        </QuickAnswer>

        {/* Last result */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Última Edição — 2025</h2>
            <span className="text-sm text-gray-500">Concurso {HISTORY[0].concurso}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Prêmio total:</p>
              <p className="text-2xl font-bold text-blue-700">{HISTORY[0].totalPrize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ganhadores:</p>
              <p className="font-bold text-gray-900">{HISTORY[0].winners} apostas premiadas</p>
              <p className="text-sm text-gray-600 mt-1">{HISTORY[0].prizePerWinner} para cada</p>
            </div>
          </div>
          <Link href="/quina" className="inline-flex items-center gap-2 mt-4 text-blue-700 hover:text-blue-800 font-medium">
            Ver últimos resultados da Quina →
          </Link>
        </section>

        {/* Quick info */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm text-gray-500 mb-1">Data fixa</p>
            <p className="font-bold text-gray-900">24 de junho</p>
            <p className="text-xs text-gray-500">Anualmente, às 20h</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm text-gray-500 mb-1">Aposta mínima</p>
            <p className="font-bold text-gray-900">R$ 2,50</p>
            <p className="text-xs text-gray-500">5 números (mesma da Quina)</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm text-gray-500 mb-1">Recorde</p>
            <p className="font-bold text-gray-900">R$ 247 milhões</p>
            <p className="text-xs text-gray-500">2025 (5 ganhadores)</p>
          </div>
        </section>

        {/* History */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Histórico da Quina de São João</h2>
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
                  <tr key={item.year} className="border-b border-gray-100 hover:bg-blue-50">
                    <td className="py-3 px-4 font-bold text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-gray-700 font-mono">{item.concurso}</td>
                    <td className="py-3 px-4 text-gray-700">{item.date}</td>
                    <td className="py-3 px-4 text-blue-700 font-semibold">{item.totalPrize}</td>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group rounded-xl border border-gray-200 bg-white transition-colors hover:border-gray-300"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-gray-800 [&::-webkit-details-marker]:hidden list-none">
                  <span>{item.question}</span>
                  <svg className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Sobre a Quina de São João</h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Realizada todo 24 de junho, dia de São João, a Quina de São João
              é uma das três principais loterias especiais da Caixa, ao lado
              da Mega da Virada (dezembro) e da Lotofácil da Independência
              (setembro). Entrega prêmios milionários que não acumulam.
            </p>
            <p className="text-gray-600">
              Com aposta a partir de R$ 2,50 e probabilidade de 1 em 24 milhões
              para a Quina, é uma alternativa acessível para quem busca
              prêmios milionários sem comprometer o orçamento.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quina" className="text-blue-700 hover:underline font-medium">Quina</Link>
            <span className="text-gray-300">|</span>
            <Link href="/mega-da-virada" className="text-blue-700 hover:underline font-medium">Mega da Virada</Link>
            <span className="text-gray-300">|</span>
            <Link href="/lotofacil-da-independencia" className="text-blue-700 hover:underline font-medium">Lotofácil da Independência</Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-blue-700 hover:underline font-medium">Maiores Prêmios</Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
