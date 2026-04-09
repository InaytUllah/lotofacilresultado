import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Como Resgatar Prêmio de Loteria - Guia Completo',
  description:
    'Saiba como resgatar seu prêmio de loteria da Caixa. Prazos, documentos necessários, valores por faixa, impostos e passo a passo para receber o dinheiro.',
  alternates: {
    canonical: '/como-resgatar-premio',
    languages: {
      'pt-BR': `${SITE_URL}/como-resgatar-premio`,
    },
  },
  openGraph: {
    title: 'Como Resgatar Prêmio de Loteria - Guia Completo',
    description:
      'Saiba como resgatar seu prêmio de loteria da Caixa. Prazos, documentos, impostos e passo a passo.',
    url: `${SITE_URL}/como-resgatar-premio`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Como%20Resgatar%20Pr%C3%AAmio&color=%23059669', width: 1200, height: 630 }],
  },
};

export default function ComoResgatarPremioPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Como Resgatar Prêmio',
        item: `${SITE_URL}/como-resgatar-premio`,
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Resgatar Prêmio de Loteria da Caixa',
    description:
      'Passo a passo para resgatar seu prêmio de loteria da Caixa Econômica Federal.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Confira o resultado',
        text: 'Verifique se seus números foram sorteados no site lotofacilresultado.com ou no app da Caixa.',
      },
      {
        '@type': 'HowToStep',
        name: 'Identifique a faixa de prêmio',
        text: 'Prêmios até R$ 2.259,20 podem ser resgatados em casas lotéricas. Acima disso, somente em agências da Caixa.',
      },
      {
        '@type': 'HowToStep',
        name: 'Reúna os documentos',
        text: 'Leve o bilhete premiado original, documento de identidade com foto e CPF.',
      },
      {
        '@type': 'HowToStep',
        name: 'Dirija-se ao local de resgate',
        text: 'Vá a uma casa lotérica (prêmios pequenos) ou agência da Caixa (prêmios grandes). Prêmios acima de R$ 10.000 exigem agendamento.',
      },
      {
        '@type': 'HowToStep',
        name: 'Receba o prêmio',
        text: 'O valor é pago em dinheiro ou transferido para conta da Caixa. Sobre prêmios acima de R$ 2.259,20 incide imposto de renda de 13,8%.',
      },
    ],
  };

  const faqItems = [
    {
      question: 'Qual o prazo para resgatar um prêmio de loteria?',
      answer:
        'O prazo é de 90 dias corridos a partir da data do sorteio. Após esse período, o prêmio prescreve e é destinado ao FIES (Fundo de Financiamento Estudantil).',
    },
    {
      question: 'Preciso pagar imposto sobre o prêmio?',
      answer:
        'Sim. Prêmios acima de R$ 2.259,20 têm desconto de 13,8% de Imposto de Renda retido na fonte. Você recebe o valor líquido.',
    },
    {
      question: 'Posso resgatar o prêmio em qualquer lotérica?',
      answer:
        'Apenas prêmios de até R$ 2.259,20 podem ser resgatados em casas lotéricas. Acima desse valor, é necessário ir a uma agência da Caixa.',
    },
    {
      question: 'Perdi o bilhete, ainda posso resgatar?',
      answer:
        'Se a aposta foi feita pelo app ou internet banking, o prêmio é creditado automaticamente na sua conta. Para apostas em papel, o bilhete é o comprovante obrigatório.',
    },
    {
      question: 'Quanto tempo demora para receber o prêmio?',
      answer:
        'Em casas lotéricas, o pagamento é imediato em dinheiro. Em agências da Caixa, prêmios até R$ 10.000 são pagos no mesmo dia. Acima disso, pode levar 2 dias úteis após o agendamento.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Como Resgatar Prêmio</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Como Resgatar Prêmio de Loteria
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Guia completo para resgatar seu prêmio das loterias da Caixa.
            Prazos, documentos, impostos e passo a passo.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Step by Step */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Passo a Passo para Resgatar
          </h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Confira o resultado',
                desc: 'Verifique se seus números foram sorteados. Use nosso Conferidor de Apostas para comparar automaticamente.',
                icon: '🔍',
              },
              {
                step: 2,
                title: 'Identifique a faixa do prêmio',
                desc: 'O local de resgate depende do valor. Até R$ 2.259,20: casas lotéricas. Acima: agências da Caixa.',
                icon: '💰',
              },
              {
                step: 3,
                title: 'Reúna os documentos',
                desc: 'Bilhete premiado original (ou app/internet banking), documento de identidade com foto e CPF.',
                icon: '📄',
              },
              {
                step: 4,
                title: 'Vá ao local de resgate',
                desc: 'Prêmios até R$ 10.000: dirija-se diretamente. Acima de R$ 10.000: agende pelo telefone 0800 726 0101.',
                icon: '🏦',
              },
              {
                step: 5,
                title: 'Receba o prêmio',
                desc: 'Pagamento em dinheiro (lotéricas) ou transferência para conta Caixa. Imposto de 13,8% é retido na fonte para prêmios acima de R$ 2.259,20.',
                icon: '✅',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span>{item.icon}</span> {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prize Tiers Table */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Onde Resgatar por Faixa de Valor
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Valor do Prêmio</th>
                  <th scope="col" className="text-left py-3 pr-4 font-semibold text-gray-900">Local de Resgate</th>
                  <th scope="col" className="text-left py-3 font-semibold text-gray-900">Observação</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Até R$ 2.259,20</td>
                  <td className="py-3 pr-4 text-gray-700">Casas lotéricas</td>
                  <td className="py-3 text-gray-500">Pagamento imediato, sem imposto</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">R$ 2.259,21 a R$ 10.000</td>
                  <td className="py-3 pr-4 text-gray-700">Agências da Caixa</td>
                  <td className="py-3 text-gray-500">IR 13,8%, sem agendamento</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">Acima de R$ 10.000</td>
                  <td className="py-3 pr-4 text-gray-700">Agências da Caixa</td>
                  <td className="py-3 text-gray-500">IR 13,8%, com agendamento prévio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Important Info */}
        <section className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚠️</span> Informações Importantes
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span><strong>Prazo:</strong> 90 dias corridos a partir do sorteio. Após esse período, o prêmio prescreve.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span><strong>Bilhete:</strong> guarde o bilhete em local seguro. Sem ele, não há resgate (exceto apostas digitais).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span><strong>Menores de 18 anos:</strong> não podem receber prêmios de loteria, mesmo com autorização dos responsáveis.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span><strong>Apostas digitais:</strong> prêmios do app ou internet banking são creditados automaticamente na conta.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span><strong>Bolão:</strong> cada cotista deve comparecer pessoalmente com documento para receber sua parte.</span>
            </li>
          </ul>
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
            Resgatando Prêmios das Loterias da Caixa
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              Ganhar na loteria é só o começo. Resgatar o prêmio exige
              atenção aos prazos e documentos. O prazo de 90 dias é
              improrrogável — depois disso, o dinheiro vai para o FIES.
            </p>
            <p className="text-gray-600">
              Para prêmios muito grandes (acima de R$ 1 milhão), é
              recomendável consultar um advogado e um consultor financeiro
              antes de resgatar. Planejamento tributário e financeiro pode
              fazer diferença significativa no valor líquido recebido.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/conferidor" className="text-emerald-600 hover:underline font-medium">
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/maiores-premios" className="text-emerald-600 hover:underline font-medium">
              Maiores Prêmios
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/como-jogar" className="text-emerald-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/probabilidades" className="text-emerald-600 hover:underline font-medium">
              Probabilidades
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
