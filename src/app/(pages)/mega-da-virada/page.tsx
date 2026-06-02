import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';
import QuickAnswer from '@/components/ui/QuickAnswer';
import CountdownTimer from '@/components/ui/CountdownTimer';


export const metadata: Metadata = {
  title: 'Mega da Virada — Resultado, Próximo Sorteio e Histórico',
  description:
    'Mega da Virada: maior prêmio da Mega-Sena, sorteado em 31 de dezembro. Confira resultados, prêmios históricos, como apostar e contagem regressiva.',
  alternates: {
    canonical: '/mega-da-virada',
    languages: {
      'pt-BR': `${SITE_URL}/mega-da-virada`,
    },
  },
  openGraph: {
    title: 'Mega da Virada — Resultado, Próximo Sorteio e Histórico',
    description:
      'Maior prêmio da Mega-Sena. Resultados, prêmios históricos e contagem regressiva.',
    url: `${SITE_URL}/mega-da-virada`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Mega%20da%20Virada&color=%23ca8a04', width: 1200, height: 630 }],
  },
};

const VIRADA_HISTORY = [
  { year: 2025, concurso: 2820, totalPrize: 'R$ 1.091.357.286,54', winners: 6, prizePerWinner: 'R$ 181.892.881,09', date: '31/12/2025', numbers: ['08', '17', '24', '31', '46', '57'] },
  { year: 2024, concurso: 2670, totalPrize: 'R$ 635.819.745,00', winners: 5, prizePerWinner: 'R$ 127.163.949,00', date: '31/12/2024' },
  { year: 2023, concurso: 2670, totalPrize: 'R$ 588.891.021,68', winners: 5, prizePerWinner: 'R$ 117.778.204,33', date: '31/12/2023' },
  { year: 2022, concurso: 2550, totalPrize: 'R$ 541.957.224,67', winners: 4, prizePerWinner: 'R$ 135.489.306,16', date: '31/12/2022' },
  { year: 2021, concurso: 2440, totalPrize: 'R$ 378.124.282,00', winners: 5, prizePerWinner: 'R$ 75.624.856,40', date: '31/12/2021' },
  { year: 2020, concurso: 2330, totalPrize: 'R$ 325.246.516,00', winners: 2, prizePerWinner: 'R$ 162.625.258,00', date: '31/12/2020' },
  { year: 2019, concurso: 2220, totalPrize: 'R$ 304.218.388,99', winners: 3, prizePerWinner: 'R$ 101.406.129,66', date: '31/12/2019' },
  { year: 2018, concurso: 2110, totalPrize: 'R$ 302.536.382,00', winners: 4, prizePerWinner: 'R$ 75.634.095,50', date: '31/12/2018' },
  { year: 2017, concurso: 2000, totalPrize: 'R$ 306.718.743,57', winners: 17, prizePerWinner: 'R$ 18.042.279,00', date: '31/12/2017' },
  { year: 2016, concurso: 1890, totalPrize: 'R$ 220.948.319,46', winners: 4, prizePerWinner: 'R$ 55.237.079,80', date: '31/12/2016' },
];

export default function MegaDaViradaPage() {
  // Next Mega da Virada draw (December 31 of current or next year)
  const now = new Date();
  const currentYear = now.getFullYear();
  const viradaThisYear = new Date(currentYear, 11, 31, 20, 0, 0);
  const nextVirada = now > viradaThisYear
    ? new Date(currentYear + 1, 11, 31, 20, 0, 0)
    : viradaThisYear;
  const nextViradaYear = nextVirada.getFullYear();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mega da Virada',
        item: `${SITE_URL}/mega-da-virada`,
      },
    ],
  };

  const faqItems = [
    {
      question: 'O que é a Mega da Virada?',
      answer:
        'A Mega da Virada é o concurso especial da Mega-Sena realizado todo dia 31 de dezembro. Tem o maior prêmio do ano e, por regra, o prêmio principal não acumula — se ninguém acertar a Sena, o valor é dividido entre os acertadores da Quina.',
    },
    {
      question: 'Quando é a Mega da Virada 2026?',
      answer:
        `A Mega da Virada ${nextViradaYear} será sorteada no dia 31 de dezembro de ${nextViradaYear}, às 20h (horário de Brasília). As apostas geralmente abrem em meados de novembro.`,
    },
    {
      question: 'Qual foi o maior prêmio da Mega da Virada?',
      answer:
        'O maior prêmio da história da Mega da Virada foi o de 2025 (concurso 2820), que pagou R$ 1.091.357.286,54 — distribuídos entre 6 ganhadores, com R$ 181.892.881,09 para cada.',
    },
    {
      question: 'A Mega da Virada acumula?',
      answer:
        'Não. Diferente da Mega-Sena tradicional, o prêmio principal da Mega da Virada não acumula. Se ninguém acertar as 6 dezenas, o valor é dividido entre os acertadores da segunda faixa (Quina, 5 acertos).',
    },
    {
      question: 'Quanto custa apostar na Mega da Virada?',
      answer:
        'O preço é o mesmo da Mega-Sena normal: R$ 5,00 por aposta simples (6 números). É possível apostar até 20 números (custo de R$ 193.800,00) ou participar de bolões com cotas a partir de R$ 6,00.',
    },
    {
      question: 'Até que dia posso apostar na Mega da Virada?',
      answer:
        `As apostas para a Mega da Virada ${nextViradaYear} fecham no dia 31 de dezembro às 17h (horário de Brasília), três horas antes do sorteio. Recomenda-se apostar com antecedência para evitar filas.`,
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

      {/* Hero — gold/celebration theme */}
      <section className="bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-yellow-100 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span>Mega da Virada</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎆</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Concurso Especial
            </span>
          </div>
          <h1 className="speakable text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Mega da Virada {nextViradaYear}
          </h1>
          <p className="speakable text-lg text-yellow-50 max-w-2xl mb-6">
            O maior prêmio do ano da Mega-Sena, sorteado todo 31 de dezembro.
            Não acumula — se ninguém acertar, o prêmio é dividido entre os
            acertadores da Quina.
          </p>

          {/* Countdown */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 inline-block">
            <p className="text-yellow-100 text-sm mb-2">Próximo sorteio: 31/12/{nextViradaYear} às 20h</p>
            <CountdownTimer targetDate={nextVirada} label="Faltam" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <QuickAnswer question="O que é a Mega da Virada?" icon="🎆">
          A <strong>Mega da Virada</strong> é o sorteio especial da Mega-Sena
          realizado em <strong>31 de dezembro</strong>, com o <strong>maior prêmio do ano</strong>.
          Em 2025, pagou <strong>R$ 1,09 bilhão</strong> dividido entre 6 ganhadores.
          O prêmio principal <strong>não acumula</strong> — se ninguém acertar a
          Sena, o valor vai para a faixa da Quina.
        </QuickAnswer>

        {/* Last Result Highlight */}
        <section className="rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Último Resultado — Mega da Virada 2025
            </h2>
            <span className="text-sm text-gray-500">Concurso 2820</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Números sorteados:</p>
              <div className="flex flex-wrap gap-2">
                {VIRADA_HISTORY[0].numbers?.map((num) => (
                  <div
                    key={num}
                    className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Prêmio total:</p>
              <p className="text-2xl font-bold text-emerald-700 mb-3">
                {VIRADA_HISTORY[0].totalPrize}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">{VIRADA_HISTORY[0].winners} ganhadores</strong>
                {' '}— {VIRADA_HISTORY[0].prizePerWinner} para cada
              </p>
            </div>
          </div>
          <Link
            href="/mega-sena"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Ver últimos resultados da Mega-Sena →
          </Link>
        </section>

        {/* Key Info Cards */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm text-gray-500 mb-1">Data do sorteio</p>
            <p className="font-bold text-gray-900">31 de dezembro</p>
            <p className="text-xs text-gray-500">Anualmente, às 20h (BRT)</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm text-gray-500 mb-1">Aposta mínima</p>
            <p className="font-bold text-gray-900">R$ 5,00</p>
            <p className="text-xs text-gray-500">6 números (mesmo da Mega-Sena)</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm text-gray-500 mb-1">Recorde</p>
            <p className="font-bold text-gray-900">R$ 1,09 bilhão</p>
            <p className="text-xs text-gray-500">Mega da Virada 2025</p>
          </div>
        </section>

        {/* History Table */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Histórico da Mega da Virada
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              10 últimos sorteios com prêmios totais e ganhadores
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Ano</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Concurso</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Prêmio Total</th>
                  <th scope="col" className="text-center py-3 px-4 font-semibold text-gray-900">Ganhadores</th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold text-gray-900">Por Ganhador</th>
                </tr>
              </thead>
              <tbody>
                {VIRADA_HISTORY.map((item) => (
                  <tr key={item.year} className="border-b border-gray-100 hover:bg-amber-50">
                    <td className="py-3 px-4 font-bold text-gray-900">{item.year}</td>
                    <td className="py-3 px-4 text-gray-700 font-mono">{item.concurso}</td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">{item.totalPrize}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{item.winners}</td>
                    <td className="py-3 px-4 text-gray-700">{item.prizePerWinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rules / How it Works */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Regras Especiais da Mega da Virada
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Prêmio principal não acumula',
                desc: 'Se ninguém acertar a Sena (6 dezenas), o prêmio é dividido entre quem acertar 5 números (Quina). Esse é o principal diferencial da Mega da Virada.',
              },
              {
                title: 'Acumula durante o ano',
                desc: 'Parte da arrecadação dos concursos da Mega-Sena ao longo do ano é destinada à formação do prêmio especial da Virada.',
              },
              {
                title: 'Mesmo formato de aposta',
                desc: 'As regras de jogo são idênticas à Mega-Sena tradicional: escolha de 6 a 20 números entre 1 e 60.',
              },
              {
                title: 'Apostas começam em novembro',
                desc: `As apostas para a Mega da Virada ${nextViradaYear} começam geralmente na segunda quinzena de novembro, dando aproximadamente 6 semanas para apostar.`,
              },
              {
                title: 'Limite final de apostas',
                desc: 'As apostas fecham no dia 31 de dezembro, às 17h (horário de Brasília), 3 horas antes do sorteio.',
              },
            ].map((rule, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-bold text-amber-600 flex-shrink-0">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-gray-900">{rule.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategy section */}
        <section className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4">
            Dicas para Apostar na Mega da Virada
          </h2>
          <ul className="space-y-2 text-emerald-50">
            <li className="flex gap-2"><span>✓</span> Aposte com antecedência — as filas em 31/12 são longas</li>
            <li className="flex gap-2"><span>✓</span> Considere o bolão — divide custos e multiplica chances</li>
            <li className="flex gap-2"><span>✓</span> Diversifique entre números altos e baixos, pares e ímpares</li>
            <li className="flex gap-2"><span>✓</span> Evite sequências óbvias (1-2-3-4-5-6) que dividem o prêmio</li>
            <li className="flex gap-2"><span>✓</span> Defina um orçamento e respeite — loteria é entretenimento</li>
          </ul>
          <Link
            href="/dicas-para-apostar"
            className="inline-flex items-center gap-2 mt-4 bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            Ver guia completo de dicas →
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes — Mega da Virada
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
            Mega da Virada: o Sorteio Mais Esperado do Ano
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Realizada anualmente em 31 de dezembro, a Mega da Virada se
              consolidou como o maior evento das loterias brasileiras. Atrai
              milhões de apostadores e movimenta bilhões de reais a cada
              edição — em 2025, foram <strong>R$ 1,09 bilhão</strong> distribuídos
              entre 6 sortudos.
            </p>
            <p className="text-gray-600">
              A regra que torna a Mega da Virada única é a impossibilidade de
              acumulação no prêmio principal. Diferente dos concursos
              regulares da Mega-Sena, se nenhum apostador acertar as 6
              dezenas, o prêmio é redirecionado para os acertadores da Quina
              (5 acertos), garantindo que alguém leve o prêmio principal todo ano.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/mega-sena" className="text-amber-700 hover:underline font-medium">
              Mega-Sena
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-amber-700 hover:underline font-medium">
              Maiores Prêmios
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/probabilidades" className="text-amber-700 hover:underline font-medium">
              Probabilidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dicas-para-apostar" className="text-amber-700 hover:underline font-medium">
              Dicas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-resgatar-premio" className="text-amber-700 hover:underline font-medium">
              Como Resgatar
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
