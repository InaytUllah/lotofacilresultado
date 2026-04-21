import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import QuickAnswer from '@/components/ui/QuickAnswer';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes sobre Loterias da Caixa',
  description:
    'Respostas para as principais dúvidas sobre loterias da Caixa: como jogar, como resgatar prêmios, impostos, probabilidades, apostas online e muito mais.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
    languages: {
      'pt-BR': `${SITE_URL}/faq`,
    },
  },
  openGraph: {
    title: 'Perguntas Frequentes sobre Loterias da Caixa',
    description: 'Respostas para as principais dúvidas sobre loterias da Caixa: como jogar, como resgatar prêmios, impostos, probabilidades, apostas online e muito mais.',
    url: `${SITE_URL}/faq`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Perguntas%20Frequentes&color=%23059669', width: 1200, height: 630 }],
  },
};

const faqItems: { question: string; answer: string }[] = [
  {
    question: 'Como jogar nas loterias da Caixa?',
    answer:
      'Você pode apostar nas loterias da Caixa de três formas: presencialmente em qualquer casa lotérica credenciada, pelo aplicativo Loterias Caixa (disponível para Android e iOS) ou pelo internet banking da Caixa Econômica Federal. Para apostas online, é necessário ter mais de 18 anos e cadastro no site da Caixa. O valor mínimo do carrinho online é de R$ 30,00.',
  },
  {
    question: 'Como resgatar prêmios das loterias?',
    answer:
      'Prêmios de até R$ 2.259,20 podem ser resgatados em qualquer casa lotérica. Valores acima de R$ 2.259,20 devem ser resgatados exclusivamente em agências da Caixa Econômica Federal, com apresentação de documento de identidade e CPF. O prazo para resgate é de 90 dias corridos após a data do sorteio. Prêmios brutos acima de R$ 2.259,20 têm desconto de imposto de renda na fonte.',
  },
  {
    question: 'Qual o imposto sobre prêmios de loteria?',
    answer:
      'Prêmios de loterias acima de R$ 2.259,20 são tributados em 30% de Imposto de Renda na fonte, de acordo com a legislação brasileira. Esse desconto é feito automaticamente antes do pagamento do prêmio. Prêmios até R$ 2.259,20 são isentos de impostos.',
  },
  {
    question: 'Quais são os dias e horários dos sorteios das loterias?',
    answer:
      'A maioria dos sorteios acontece às 21h (horário de Brasília). A Mega-Sena, Dupla Sena, Dia de Sorte e Timemania têm sorteios na terça, quinta e sábado. A Lotofácil e a Quina têm sorteios de segunda a sábado. A Lotomania e o Super Sete sorteiam na segunda, quarta e sexta. A +Milionária sorteia na quarta e sábado. Os sorteios são transmitidos ao vivo pela TV e internet.',
  },
  {
    question: 'Qual loteria tem as melhores chances de ganhar?',
    answer:
      'A Lotofácil é considerada a loteria com as melhores chances de premiação. A probabilidade de acertar 11 números (menor faixa premiada) é de 1 em 11. Já para o prêmio principal (15 acertos), a chance é de 1 em 3.268.760. O Super Sete também oferece boas chances na faixa de 3 acertos (1 em 4). No entanto, loterias com melhores odds geralmente oferecem prêmios menores.',
  },
  {
    question: 'Onde comprar apostas de loteria online?',
    answer:
      'As apostas online oficiais podem ser feitas pelo aplicativo Loterias Caixa ou pelo site loterias.caixa.gov.br. É necessário criar uma conta com CPF válido e ter mais de 18 anos. O pagamento pode ser feito por cartão de crédito, débito ou Pix. O valor mínimo do carrinho de apostas é de R$ 30,00 (somando todas as apostas).',
  },
  {
    question: 'O que é a Mega da Virada?',
    answer:
      'A Mega da Virada é um concurso especial da Mega-Sena realizado no último dia de cada ano (31 de dezembro). É o maior prêmio do ano e não acumula: caso nenhum apostador acerte as 6 dezenas, o prêmio é dividido entre os acertadores de 5 números, e assim por diante. Os prêmios já superaram R$ 500 milhões. As apostas ficam disponíveis a partir de novembro.',
  },
  {
    question: 'O que acontece quando a loteria acumula?',
    answer:
      'Quando ninguém acerta a faixa principal de um concurso, o prêmio acumula para o próximo sorteio, somando-se ao valor estimado. A acumulação pode ocorrer várias vezes seguidas, gerando prêmios milionários. Porém, na Lotofácil e na Lotomania, após um certo número de acumulações, há regras específicas de rateio.',
  },
  {
    question: 'Qual o valor mínimo de uma aposta?',
    answer:
      'O valor mínimo varia por modalidade: Mega-Sena custa R$ 5,00 (6 números), Lotofácil R$ 3,00 (15 números), Quina R$ 2,50 (5 números), Lotomania R$ 3,00 (50 números), +Milionária R$ 6,00 (6 números + 2 trevos), Dia de Sorte R$ 3,00 (7 números), Super Sete R$ 2,50 (7 números), Dupla Sena R$ 2,50 (6 números) e Timemania R$ 3,50 (10 números).',
  },
  {
    question: 'Existe limite de idade para jogar na loteria?',
    answer:
      'Sim. É proibida a venda de bilhetes de loteria para menores de 18 anos, conforme a legislação brasileira (Estatuto da Criança e do Adolescente). Essa regra vale tanto para apostas presenciais em casas lotéricas quanto para apostas online pelo aplicativo ou site da Caixa.',
  },
  {
    question: 'Estrangeiros podem jogar nas loterias da Caixa?',
    answer:
      'Sim, estrangeiros podem apostar presencialmente em casas lotéricas sem restrições. Para apostas online, é necessário ter CPF brasileiro. Para resgatar prêmios, o estrangeiro deve apresentar documento de identidade válido (passaporte) e, se o valor for alto, comparecer a uma agência da Caixa.',
  },
  {
    question: 'Quando saem os resultados dos sorteios?',
    answer:
      'Os resultados são divulgados imediatamente após os sorteios, que geralmente ocorrem às 21h (horário de Brasília). Você pode conferir os resultados no nosso site, que é atualizado automaticamente minutos após cada sorteio, ou pela transmissão ao vivo no canal da Caixa no YouTube.',
  },
  {
    question: 'O que são números quentes e frios?',
    answer:
      'Números quentes são aqueles que foram sorteados com maior frequência nos últimos concursos, enquanto números frios são os que menos apareceram. Embora cada sorteio seja independente e aleatório, muitos apostadores utilizam essas estatísticas como estratégia para montar suas apostas. Nosso site oferece ferramentas de análise de números quentes e frios para todas as loterias.',
  },
  {
    question: 'É possível melhorar as chances de ganhar na loteria?',
    answer:
      'Matematicamente, a única forma de aumentar suas chances é apostando com mais números (apostas ampliadas), o que também aumenta o custo. Participar de bolões é outra estratégia popular, pois permite apostar com mais números por um custo menor por pessoa. Não existe fórmula mágica ou sistema que garanta ganhos, pois os sorteios são completamente aleatórios.',
  },
  {
    question: 'O que é um bolão de loteria?',
    answer:
      'Bolão é uma aposta coletiva onde várias pessoas dividem o custo de uma ou mais apostas e, em caso de premiação, dividem o prêmio proporcionalmente ao número de cotas adquiridas. As casas lotéricas organizam bolões oficiais com cota mínima de R$ 3,00. Também é possível criar bolões entre amigos. O organizador pode cobrar uma taxa de administração de até 35% do valor da cota.',
  },
  {
    question: 'Qual a diferença entre Surpresinha e Teimosinha?',
    answer:
      'Na Surpresinha, o sistema seleciona números aleatórios para você, sem que você precise escolher. Na Teimosinha, você concorre com a mesma aposta por vários concursos consecutivos (2, 3, 4, 5, 6, 9, 12 ou 18 concursos). As duas opções podem ser combinadas: você pode pedir uma Surpresinha com Teimosinha.',
  },
];

export default function FAQPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Perguntas Frequentes',
        item: `${SITE_URL}/faq`,
      },
    ],
  };

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

      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-1">
            <li>
              <a href="/" className="hover:text-emerald-600">
                Início
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Perguntas Frequentes</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl speakable">
          Perguntas Frequentes sobre Loterias da Caixa
        </h1>
        <p className="mb-6 text-lg text-gray-600 speakable">
          Encontre respostas para as dúvidas mais comuns sobre as loterias da Caixa
          Econômica Federal, incluindo como jogar, resgatar prêmios, impostos e muito
          mais.
        </p>

        <QuickAnswer question="Como consultar o resultado da loteria?" icon="🎯">
          Você pode consultar o resultado de qualquer loteria da Caixa
          Econômica Federal no site oficial{' '}
          <a href="https://loterias.caixa.gov.br" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">loterias.caixa.gov.br</a>,
          no aplicativo Loterias Caixa ou aqui no{' '}
          <a href="/" className="text-emerald-600 hover:underline">Lotofácil Resultado</a>,
          onde os resultados aparecem minutos após cada sorteio.
        </QuickAnswer>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border border-gray-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 text-left font-semibold text-gray-900 sm:p-8 [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{item.question}</span>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <div className="border-t border-gray-100 px-6 pb-6 pt-4 text-gray-700 sm:px-8 sm:pb-8">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Related questions / topic cluster */}
        <section aria-labelledby="related-topics" className="mt-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 id="related-topics" className="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
            <span aria-hidden="true">🔗</span> Tópicos Relacionados
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Explore guias completos sobre os principais assuntos das loterias:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: '/como-jogar', title: 'Como Jogar nas Loterias', desc: 'Guia completo com regras de cada modalidade' },
              { href: '/como-resgatar-premio', title: 'Como Resgatar Prêmio', desc: 'Prazos, documentos e passo a passo' },
              { href: '/probabilidades', title: 'Probabilidades de Acerto', desc: 'Chances reais em cada loteria' },
              { href: '/dicas-para-apostar', title: 'Dicas para Apostar', desc: 'Estratégias e erros comuns' },
              { href: '/qual-loteria-jogar', title: 'Qual Loteria Jogar?', desc: 'Comparativo completo' },
              { href: '/glossario', title: 'Glossário de Termos', desc: '29 termos explicados' },
              { href: '/bolao', title: 'Calculadora de Bolão', desc: 'Custos e chances do bolão' },
              { href: '/jogo-responsavel', title: 'Jogo Responsável', desc: 'Orientações e ajuda' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-gray-200 p-4 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
              >
                <p className="font-semibold text-gray-900 text-sm">{item.title} →</p>
                <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Guia Completo das Loterias da Caixa
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              As loterias da Caixa Econômica Federal são uma das formas de entretenimento
              mais populares do Brasil. Com 9 modalidades diferentes, há opções para todos
              os perfis de apostadores, desde quem busca prêmios modestos com melhores
              chances até quem sonha com os jackpots milionários.
            </p>
            <p>
              Jogue com responsabilidade: defina um orçamento para apostas e não comprometa
              recursos essenciais. Loteria é diversão, não investimento.
            </p>
            <p>
              Para mais informações sobre como jogar, visite nossa página{' '}
              <a
                href="/como-jogar"
                className="text-emerald-600 hover:underline font-medium"
              >
                Como Jogar
              </a>
              . Para entender melhor as probabilidades de cada jogo, acesse{' '}
              <a
                href="/probabilidades"
                className="text-emerald-600 hover:underline font-medium"
              >
                Probabilidades
              </a>
              . Confira também nossas{' '}
              <a
                href="/dicas-para-apostar"
                className="text-emerald-600 hover:underline font-medium"
              >
                Dicas para Apostar
              </a>
              , o{' '}
              <a
                href="/glossario"
                className="text-emerald-600 hover:underline font-medium"
              >
                Glossário de Loteria
              </a>
              {' '}e saiba{' '}
              <a
                href="/como-resgatar-premio"
                className="text-emerald-600 hover:underline font-medium"
              >
                como resgatar seu prêmio
              </a>
              . E lembre-se de jogar com{' '}
              <a
                href="/jogo-responsavel"
                className="text-emerald-600 hover:underline font-medium"
              >
                responsabilidade
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
