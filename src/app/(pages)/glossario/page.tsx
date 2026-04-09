import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Glossário de Loteria - Termos e Definições',
  description:
    'Glossário completo com todos os termos das loterias da Caixa. Entenda o significado de acumulação, bolão, concurso, dezena, faixa de premiação, terno, quina e muito mais.',
  alternates: {
    canonical: '/glossario',
    languages: {
      'pt-BR': `${SITE_URL}/glossario`,
    },
  },
  openGraph: {
    title: 'Glossário de Loteria - Termos e Definições',
    description:
      'Glossário completo com todos os termos das loterias da Caixa. Significados de acumulação, bolão, concurso e mais.',
    url: `${SITE_URL}/glossario`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

const GLOSSARY_TERMS = [
  {
    term: 'Acumulação',
    definition: 'Quando ninguém acerta o prêmio principal de um concurso e o valor é somado ao próximo sorteio, criando prêmios maiores.',
  },
  {
    term: 'Aposta Simples',
    definition: 'Aposta com a quantidade mínima de números permitida para cada loteria. É a forma mais barata de jogar.',
  },
  {
    term: 'Aposta Múltipla (Desdobramento)',
    definition: 'Aposta com mais números que o mínimo, gerando múltiplas combinações. Aumenta as chances mas custa mais.',
  },
  {
    term: 'Bolão',
    definition: 'Aposta coletiva onde várias pessoas dividem o custo e o eventual prêmio. Pode ser organizado por lotéricas ou entre amigos.',
  },
  {
    term: 'Caixa Econômica Federal',
    definition: 'Banco público responsável por administrar, fiscalizar e operar todas as loterias federais do Brasil.',
  },
  {
    term: 'Concurso',
    definition: 'Cada sorteio individual de uma loteria, identificado por um número sequencial único (ex: Concurso 2.750).',
  },
  {
    term: 'Cota',
    definition: 'Fração de participação em um bolão. Cada cota dá direito a uma parte proporcional do prêmio.',
  },
  {
    term: 'Dezena',
    definition: 'Cada um dos números sorteados em um concurso. Apesar do nome, pode ser qualquer número dentro do universo numérico da loteria.',
  },
  {
    term: 'Faixa de Premiação',
    definition: 'Categoria de acerto que define o valor do prêmio. Cada loteria tem diferentes faixas (ex: Mega-Sena tem Sena, Quina e Quadra).',
  },
  {
    term: 'FIES',
    definition: 'Fundo de Financiamento Estudantil. Prêmios de loteria não resgatados dentro do prazo de 90 dias são destinados ao FIES.',
  },
  {
    term: 'Globo de Sorteio',
    definition: 'Equipamento mecânico certificado usado pela Caixa para sortear os números. Garante a aleatoriedade do resultado.',
  },
  {
    term: 'Imposto de Renda',
    definition: 'Taxa de 13,8% cobrada sobre prêmios de loteria acima de R$ 2.259,20. Descontada na fonte (o ganhador recebe o valor líquido).',
  },
  {
    term: 'Jogo Responsável',
    definition: 'Prática de apostar dentro de limites financeiros saudáveis, tratando a loteria como entretenimento e não como investimento.',
  },
  {
    term: 'Lotérica',
    definition: 'Casa lotérica autorizada pela Caixa para receber apostas e pagar prêmios de até R$ 2.259,20.',
  },
  {
    term: 'Mega-Sena da Virada',
    definition: 'Concurso especial da Mega-Sena realizado no dia 31 de dezembro, com prêmio acumulado ao longo do ano. O maior prêmio anual.',
  },
  {
    term: 'Número Quente',
    definition: 'Número que apareceu com frequência acima da média nos últimos sorteios. Usado em análise estatística, mas não garante resultado futuro.',
  },
  {
    term: 'Número Frio',
    definition: 'Número que apareceu com frequência abaixo da média nos últimos sorteios. Pode indicar que está "atrasado", mas cada sorteio é independente.',
  },
  {
    term: 'Prêmio Bruto',
    definition: 'Valor total arrecadado destinado à premiação, antes da divisão entre faixas e desconto de impostos.',
  },
  {
    term: 'Prêmio Líquido',
    definition: 'Valor que o ganhador efetivamente recebe, após o desconto do Imposto de Renda de 13,8%.',
  },
  {
    term: 'Prescrição',
    definition: 'Perda do direito ao prêmio após 90 dias do sorteio. Prêmios prescritos vão para o FIES.',
  },
  {
    term: 'Probabilidade',
    definition: 'Chance matemática de acertar um resultado. Varia conforme a loteria e o tipo de aposta (simples ou múltipla).',
  },
  {
    term: 'Quadra',
    definition: 'Na Mega-Sena, acertar 4 das 6 dezenas sorteadas. Terceira faixa de premiação.',
  },
  {
    term: 'Quina',
    definition: 'Na Mega-Sena, acertar 5 das 6 dezenas sorteadas. Segunda faixa de premiação. Também é o nome de outra loteria da Caixa.',
  },
  {
    term: 'Rateio',
    definition: 'Divisão do prêmio de uma faixa entre todos os ganhadores daquela faixa em um mesmo concurso.',
  },
  {
    term: 'Sena',
    definition: 'Acertar todas as 6 dezenas da Mega-Sena. Primeira faixa de premiação (prêmio principal).',
  },
  {
    term: 'Surpresinha',
    definition: 'Modalidade onde o sistema escolhe os números aleatoriamente para o apostador, sem necessidade de escolher manualmente.',
  },
  {
    term: 'Teimosinha',
    definition: 'Opção de repetir a mesma aposta por 2, 4, 8 ou até 12 concursos consecutivos automaticamente.',
  },
  {
    term: 'Terno',
    definition: 'Na Quina, acertar 3 das 5 dezenas sorteadas. Também usado em outras loterias para indicar 3 acertos.',
  },
  {
    term: 'Volante',
    definition: 'Formulário de papel (físico ou digital) usado para marcar os números da aposta em uma loteria.',
  },
];

export default function GlossarioPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Glossário',
        item: `${SITE_URL}/glossario`,
      },
    ],
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossário de Termos das Loterias da Caixa',
    description: 'Definições de termos usados nas loterias da Caixa Econômica Federal',
    hasDefinedTerm: GLOSSARY_TERMS.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.definition,
    })),
  };

  // Group terms by first letter
  const grouped = GLOSSARY_TERMS.reduce<Record<string, typeof GLOSSARY_TERMS>>((acc, item) => {
    const letter = item.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-indigo-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Glossário</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Glossário de Loteria
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Todos os termos e definições das loterias da Caixa em um
            só lugar. De acumulação a volante.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Letter Navigation */}
        <nav className="flex flex-wrap gap-2" aria-label="Navegação alfabética">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Terms by Letter */}
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2">
              {letter}
            </h2>
            <div className="space-y-4">
              {grouped[letter].map((item) => (
                <div
                  key={item.term}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <dt className="text-lg font-semibold text-gray-900">
                    {item.term}
                  </dt>
                  <dd className="text-gray-600 mt-1 leading-relaxed">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Entendendo o Vocabulário das Loterias
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O mundo das loterias tem um vocabulário próprio que pode
              confundir apostadores iniciantes. Termos como desdobramento,
              rateio, teimosinha e surpresinha são essenciais para
              entender como funcionam as apostas e maximizar sua
              experiência.
            </p>
            <p className="text-gray-600">
              Este glossário reúne os termos mais importantes das
              loterias da Caixa Econômica Federal. Use-o como referência
              sempre que encontrar uma palavra desconhecida ao consultar
              resultados ou fazer suas apostas.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/como-jogar" className="text-indigo-600 hover:underline font-medium">
              Como Jogar
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/probabilidades" className="text-indigo-600 hover:underline font-medium">
              Probabilidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/faq" className="text-indigo-600 hover:underline font-medium">
              Perguntas Frequentes
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/dicas-para-apostar" className="text-indigo-600 hover:underline font-medium">
              Dicas para Apostar
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
