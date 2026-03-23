import { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes sobre Loterias da Caixa',
  description:
    'Respostas para as principais duvidas sobre loterias da Caixa: como jogar, como resgatar premios, impostos, probabilidades, apostas online e muito mais.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

const faqItems: { question: string; answer: string }[] = [
  {
    question: 'Como jogar nas loterias da Caixa?',
    answer:
      'Voce pode apostar nas loterias da Caixa de tres formas: presencialmente em qualquer casa loterica credenciada, pelo aplicativo Loterias Caixa (disponivel para Android e iOS) ou pelo internet banking da Caixa Economica Federal. Para apostas online, e necessario ter mais de 18 anos e cadastro no site da Caixa. O valor minimo do carrinho online e de R$ 30,00.',
  },
  {
    question: 'Como resgatar premios das loterias?',
    answer:
      'Premios de ate R$ 2.259,20 podem ser resgatados em qualquer casa loterica. Valores acima de R$ 2.259,20 devem ser resgatados exclusivamente em agencias da Caixa Economica Federal, com apresentacao de documento de identidade e CPF. O prazo para resgate e de 90 dias corridos apos a data do sorteio. Premios brutos acima de R$ 2.259,20 tem desconto de imposto de renda na fonte.',
  },
  {
    question: 'Qual o imposto sobre premios de loteria?',
    answer:
      'Premios de loterias acima de R$ 2.259,20 sao tributados em 30% de Imposto de Renda na fonte, de acordo com a legislacao brasileira. Esse desconto e feito automaticamente antes do pagamento do premio. Premios ate R$ 2.259,20 sao isentos de impostos.',
  },
  {
    question: 'Quais sao os dias e horarios dos sorteios das loterias?',
    answer:
      'A maioria dos sorteios acontece as 20h (horario de Brasilia). A Mega-Sena, Dupla Sena, Dia de Sorte e Timemania tem sorteios na terca, quinta e sabado. A Lotofacil e a Quina tem sorteios de segunda a sabado. A Lotomania e o Super Sete sorteiam na segunda, quarta e sexta. A +Milionaria sorteia na quarta e sabado. Os sorteios sao transmitidos ao vivo pela TV e internet.',
  },
  {
    question: 'Qual loteria tem as melhores chances de ganhar?',
    answer:
      'A Lotofacil e considerada a loteria com as melhores chances de premiacao. A probabilidade de acertar 11 numeros (menor faixa premiada) e de 1 em 11. Ja para o premio principal (15 acertos), a chance e de 1 em 3.268.760. O Super Sete tambem oferece boas chances na faixa de 3 acertos (1 em 4). No entanto, loterias com melhores odds geralmente oferecem premios menores.',
  },
  {
    question: 'Onde comprar apostas de loteria online?',
    answer:
      'As apostas online oficiais podem ser feitas pelo aplicativo Loterias Caixa ou pelo site loterias.caixa.gov.br. E necessario criar uma conta com CPF valido e ter mais de 18 anos. O pagamento pode ser feito por cartao de credito, debito ou Pix. O valor minimo do carrinho de apostas e de R$ 30,00 (somando todas as apostas).',
  },
  {
    question: 'O que e a Mega da Virada?',
    answer:
      'A Mega da Virada e um concurso especial da Mega-Sena realizado no ultimo dia de cada ano (31 de dezembro). E o maior premio do ano e nao acumula: caso nenhum apostador acerte as 6 dezenas, o premio e dividido entre os acertadores de 5 numeros, e assim por diante. Os premios ja superaram R$ 500 milhoes. As apostas ficam disponiveis a partir de novembro.',
  },
  {
    question: 'O que acontece quando a loteria acumula?',
    answer:
      'Quando ninguem acerta a faixa principal de um concurso, o premio acumula para o proximo sorteio, somando-se ao valor estimado. A acumulacao pode ocorrer varias vezes seguidas, gerando premios milionarios. Porem, na Lotofacil e na Lotomania, apos um certo numero de acumulacoes, ha regras especificas de rateio.',
  },
  {
    question: 'Qual o valor minimo de uma aposta?',
    answer:
      'O valor minimo varia por modalidade: Mega-Sena custa R$ 5,00 (6 numeros), Lotofacil R$ 3,00 (15 numeros), Quina R$ 2,50 (5 numeros), Lotomania R$ 3,00 (50 numeros), +Milionaria R$ 6,00 (6 numeros + 2 trevos), Dia de Sorte R$ 3,00 (7 numeros), Super Sete R$ 2,50 (7 numeros), Dupla Sena R$ 2,50 (6 numeros) e Timemania R$ 3,50 (10 numeros).',
  },
  {
    question: 'Existe limite de idade para jogar na loteria?',
    answer:
      'Sim. E proibida a venda de bilhetes de loteria para menores de 18 anos, conforme a legislacao brasileira (Estatuto da Crianca e do Adolescente). Essa regra vale tanto para apostas presenciais em casas lotericas quanto para apostas online pelo aplicativo ou site da Caixa.',
  },
  {
    question: 'Estrangeiros podem jogar nas loterias da Caixa?',
    answer:
      'Sim, estrangeiros podem apostar presencialmente em casas lotericas sem restricoes. Para apostas online, e necessario ter CPF brasileiro. Para resgatar premios, o estrangeiro deve apresentar documento de identidade valido (passaporte) e, se o valor for alto, comparecer a uma agencia da Caixa.',
  },
  {
    question: 'Quando saem os resultados dos sorteios?',
    answer:
      'Os resultados sao divulgados imediatamente apos os sorteios, que geralmente ocorrem as 20h (horario de Brasilia). Voce pode conferir os resultados no nosso site, que e atualizado automaticamente minutos apos cada sorteio, ou pela transmissao ao vivo no canal da Caixa no YouTube.',
  },
  {
    question: 'O que sao numeros quentes e frios?',
    answer:
      'Numeros quentes sao aqueles que foram sorteados com maior frequencia nos ultimos concursos, enquanto numeros frios sao os que menos apareceram. Embora cada sorteio seja independente e aleatorio, muitos apostadores utilizam essas estatisticas como estrategia para montar suas apostas. Nosso site oferece ferramentas de analise de numeros quentes e frios para todas as loterias.',
  },
  {
    question: 'E possivel melhorar as chances de ganhar na loteria?',
    answer:
      'Matematicamente, a unica forma de aumentar suas chances e apostando com mais numeros (apostas ampliadas), o que tambem aumenta o custo. Participar de boloes e outra estrategia popular, pois permite apostar com mais numeros por um custo menor por pessoa. Nao existe formula magica ou sistema que garanta ganhos, pois os sorteios sao completamente aleatorios.',
  },
  {
    question: 'O que e um bolao de loteria?',
    answer:
      'Bolao e uma aposta coletiva onde varias pessoas dividem o custo de uma ou mais apostas e, em caso de premiacao, dividem o premio proporcionalmente ao numero de cotas adquiridas. As casas lotericas organizam boloes oficiais com cota minima de R$ 3,00. Tambem e possivel criar boloes entre amigos. O organizador pode cobrar uma taxa de administracao de ate 35% do valor da cota.',
  },
  {
    question: 'Qual a diferenca entre Surpresinha e Teimosinha?',
    answer:
      'Na Surpresinha, o sistema seleciona numeros aleatorios para voce, sem que voce precise escolher. Na Teimosinha, voce concorre com a mesma aposta por varios concursos consecutivos (2, 3, 4, 5, 6, 9, 12 ou 18 concursos). As duas opcoes podem ser combinadas: voce pode pedir uma Surpresinha com Teimosinha.',
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
        name: 'Inicio',
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
                Inicio
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Perguntas Frequentes</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Perguntas Frequentes sobre Loterias da Caixa
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Encontre respostas para as duvidas mais comuns sobre as loterias da Caixa
          Economica Federal, incluindo como jogar, resgatar premios, impostos e muito
          mais.
        </p>

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

        {/* SEO content */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Guia Completo das Loterias da Caixa
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              As loterias da Caixa Economica Federal sao uma das formas de entretenimento
              mais populares do Brasil. Com 9 modalidades diferentes, ha opcoes para todos
              os perfis de apostadores, desde quem busca premios modestos com melhores
              chances ate quem sonha com os jackpots milionarios.
            </p>
            <p>
              E fundamental jogar com{' '}
              <strong className="text-gray-900">responsabilidade</strong>, definindo um
              orcamento para apostas e nunca comprometendo recursos essenciais. As loterias
              devem ser vistas como uma forma de diversao, nao como investimento ou fonte
              de renda.
            </p>
            <p>
              Para mais informacoes sobre como jogar, visite nossa pagina{' '}
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
