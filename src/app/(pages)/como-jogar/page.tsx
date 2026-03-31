import { Metadata } from 'next';
import { GAMES, GAME_SLUGS, SITE_URL, SITE_NAME, DAYS_SHORT_PT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Como Jogar nas Loterias da Caixa - Guia Completo',
  description:
    'Aprenda como jogar em todas as loterias da Caixa: Mega-Sena, Lotofácil, Quina, Lotomania, +Milionária, Dia de Sorte, Super Sete, Dupla Sena e Timemania. Regras, dicas e probabilidades.',
  alternates: {
    canonical: `${SITE_URL}/como-jogar`,
    languages: {
      'pt-BR': `${SITE_URL}/como-jogar`,
    },
  },
  openGraph: {
    title: 'Como Jogar nas Loterias da Caixa - Guia Completo',
    description: 'Aprenda como jogar em todas as loterias da Caixa: Mega-Sena, Lotofácil, Quina, Lotomania, +Milionária, Dia de Sorte, Super Sete, Dupla Sena e Timemania. Regras, dicas e probabilidades.',
    url: `${SITE_URL}/como-jogar`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

const gameDetails: Record<
  string,
  {
    howTo: string[];
    odds: { category: string; odds: string }[];
  }
> = {
  'mega-sena': {
    howTo: [
      'Escolha de 6 a 20 números entre 1 e 60.',
      'Marque os números no volante ou faça uma Surpresinha (números aleatórios).',
      'A aposta mínima (6 números) custa R$ 5,00.',
      'Você pode fazer a Teimosinha para concorrer com a mesma aposta por 2, 3, 4, 5, 6, 9, 12 ou 18 concursos.',
      'Os sorteios acontecem às terça, quinta e sábado, às 21h.',
    ],
    odds: [
      { category: 'Sena (6 acertos)', odds: '1 em 50.063.860' },
      { category: 'Quina (5 acertos)', odds: '1 em 154.518' },
      { category: 'Quadra (4 acertos)', odds: '1 em 2.332' },
    ],
  },
  lotofacil: {
    howTo: [
      'Escolha de 15 a 20 números entre 1 e 25.',
      'Marque os números no volante ou utilize a Surpresinha.',
      'A aposta mínima (15 números) custa R$ 3,00.',
      'Ganha quem acertar 11, 12, 13, 14 ou 15 números.',
      'Sorteios de segunda a sábado, às 21h.',
    ],
    odds: [
      { category: '15 acertos', odds: '1 em 3.268.760' },
      { category: '14 acertos', odds: '1 em 21.792' },
      { category: '13 acertos', odds: '1 em 691' },
      { category: '12 acertos', odds: '1 em 59' },
      { category: '11 acertos', odds: '1 em 11' },
    ],
  },
  quina: {
    howTo: [
      'Escolha de 5 a 15 números entre 1 e 80.',
      'Marque os números no volante ou faça uma Surpresinha.',
      'A aposta mínima (5 números) custa R$ 2,50.',
      'Ganha quem acertar 2, 3, 4 ou 5 números.',
      'Sorteios de segunda a sábado, às 21h.',
    ],
    odds: [
      { category: 'Quina (5 acertos)', odds: '1 em 24.040.016' },
      { category: 'Quadra (4 acertos)', odds: '1 em 64.106' },
      { category: 'Terno (3 acertos)', odds: '1 em 866' },
      { category: 'Duque (2 acertos)', odds: '1 em 36' },
    ],
  },
  lotomania: {
    howTo: [
      'Escolha 50 números entre 00 e 99 (total de 100 números).',
      'Você pode marcar no volante ou usar a Surpresinha.',
      'A aposta única custa R$ 3,00.',
      'São sorteados 20 números por concurso.',
      'Ganha quem acertar 20, 19, 18, 17, 16, 15 ou 0 números.',
      'Sorteios na segunda, quarta e sexta, às 21h.',
    ],
    odds: [
      { category: '20 acertos', odds: '1 em 11.372.635' },
      { category: '19 acertos', odds: '1 em 244.140' },
      { category: '18 acertos', odds: '1 em 15.504' },
      { category: '17 acertos', odds: '1 em 2.011' },
      { category: '16 acertos', odds: '1 em 458' },
      { category: '15 acertos', odds: '1 em 161' },
      { category: '0 acertos', odds: '1 em 11.372.635' },
    ],
  },
  'mais-milionaria': {
    howTo: [
      'Escolha de 6 a 12 números entre 1 e 50 (números da sorte).',
      'Escolha de 2 a 6 trevos entre 1 e 6.',
      'A aposta mínima (6 números + 2 trevos) custa R$ 6,00.',
      'São sorteados 6 números e 2 trevos.',
      'Sorteios na quarta e sábado, às 21h.',
    ],
    odds: [
      { category: '6 acertos + 2 trevos', odds: '1 em 238.360.500' },
      { category: '6 acertos + 1 trevo', odds: '1 em 29.795.063' },
      { category: '6 acertos + 0 trevos', odds: '1 em 19.863.375' },
      { category: '5 acertos + 2 trevos', odds: '1 em 5.765.711' },
      { category: '5 acertos + 1 trevo', odds: '1 em 720.714' },
      { category: '5 acertos + 0 trevos', odds: '1 em 480.476' },
      { category: '4 acertos + 2 trevos', odds: '1 em 248.040' },
      { category: '4 acertos + 1 trevo', odds: '1 em 31.005' },
      { category: '4 acertos + 0 trevos', odds: '1 em 20.670' },
      { category: '3 acertos + 2 trevos', odds: '1 em 16.961' },
    ],
  },
  'dia-de-sorte': {
    howTo: [
      'Escolha de 7 a 15 números entre 1 e 31.',
      'Escolha 1 mês da sorte (janeiro a dezembro).',
      'A aposta mínima (7 números) custa R$ 3,00.',
      'São sorteados 7 números e 1 mês da sorte.',
      'Ganha quem acertar 4, 5, 6, 7 números ou o mês da sorte.',
      'Sorteios na terça, quinta e sábado, às 21h.',
    ],
    odds: [
      { category: '7 acertos', odds: '1 em 2.629.575' },
      { category: '6 acertos', odds: '1 em 15.415' },
      { category: '5 acertos', odds: '1 em 453' },
      { category: '4 acertos', odds: '1 em 30' },
      { category: 'Mês da Sorte', odds: '1 em 12' },
    ],
  },
  'super-sete': {
    howTo: [
      'O volante possui 7 colunas com números de 0 a 9.',
      'Escolha 1 número para cada coluna (7 números no total).',
      'Você pode marcar de 1 a 3 números por coluna.',
      'A aposta mínima (1 número por coluna) custa R$ 2,50.',
      'São sorteados 7 números, um para cada coluna.',
      'Sorteios na segunda, quarta e sexta, às 21h.',
    ],
    odds: [
      { category: '7 acertos', odds: '1 em 10.000.000' },
      { category: '6 acertos', odds: '1 em 476.190' },
      { category: '5 acertos', odds: '1 em 13.889' },
      { category: '4 acertos', odds: '1 em 277' },
      { category: '3 acertos', odds: '1 em 4' },
    ],
  },
  'dupla-sena': {
    howTo: [
      'Escolha de 6 a 15 números entre 1 e 50.',
      'A aposta mínima (6 números) custa R$ 2,50.',
      'Cada aposta dá direito a dois sorteios (Sorteio 1 e Sorteio 2).',
      'Ganha quem acertar 3, 4, 5 ou 6 números em qualquer sorteio.',
      'Sorteios na terça, quinta e sábado, às 21h.',
    ],
    odds: [
      { category: 'Sena (6 acertos)', odds: '1 em 15.890.700' },
      { category: 'Quina (5 acertos)', odds: '1 em 60.192' },
      { category: 'Quadra (4 acertos)', odds: '1 em 1.120' },
      { category: 'Terno (3 acertos)', odds: '1 em 60' },
    ],
  },
  timemania: {
    howTo: [
      'Escolha 10 números entre 1 e 80.',
      'Escolha 1 time do coração entre os participantes.',
      'A aposta única custa R$ 3,50.',
      'São sorteados 7 números e 1 time do coração.',
      'Ganha quem acertar 3, 4, 5, 6, 7 números ou o time do coração.',
      'Sorteios na terça, quinta e sábado, às 21h.',
    ],
    odds: [
      { category: '7 acertos', odds: '1 em 26.472.637' },
      { category: '6 acertos', odds: '1 em 216.040' },
      { category: '5 acertos', odds: '1 em 5.765' },
      { category: '4 acertos', odds: '1 em 297' },
      { category: '3 acertos', odds: '1 em 26' },
      { category: 'Time do Coração', odds: '1 em 80' },
    ],
  },
};

function getDrawDaysLabel(drawDays: number[]): string {
  return drawDays.map((d) => DAYS_SHORT_PT[d]).join(', ');
}

export default function ComoJogarPage() {
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
        name: 'Como Jogar',
        item: `${SITE_URL}/como-jogar`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Como Jogar nas Loterias da Caixa',
            description:
              'Guia completo com regras, dicas e probabilidades de todas as 9 loterias da Caixa Econômica Federal.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Escolha a loteria',
                text: 'Decida em qual das 9 loterias da Caixa você deseja apostar: Mega-Sena, Lotofácil, Quina, Lotomania, +Milionária, Dia de Sorte, Super Sete, Dupla Sena ou Timemania.',
              },
              {
                '@type': 'HowToStep',
                name: 'Selecione seus números',
                text: 'Marque os números no volante de acordo com as regras de cada loteria, ou utilize a opção Surpresinha para números aleatórios.',
              },
              {
                '@type': 'HowToStep',
                name: 'Faça sua aposta',
                text: 'Registre sua aposta em uma casa lotérica credenciada, pelo aplicativo Loterias Caixa ou pelo Internet Banking da Caixa.',
              },
              {
                '@type': 'HowToStep',
                name: 'Aguarde o sorteio',
                text: 'Os sorteios acontecem às 21h (horário de Brasília). Confira os resultados neste site logo após o sorteio.',
              },
              {
                '@type': 'HowToStep',
                name: 'Confira o resultado',
                text: 'Verifique se seus números foram sorteados. Prêmios de até R$ 2.259,20 podem ser resgatados em casas lotéricas. Valores maiores devem ser sacados em agências da Caixa.',
              },
            ],
          }),
        }}
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
            <li className="text-gray-900 font-medium">Como Jogar</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Como Jogar nas Loterias da Caixa
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Guia completo com regras, dicas e probabilidades de todas as 9 loterias da Caixa
          Econômica Federal. Aprenda a jogar e aumente suas chances de ganhar.
        </p>

        {/* Game sections */}
        {GAME_SLUGS.map((slug) => {
          const game = GAMES[slug];
          const details = gameDetails[slug];
          if (!details) return null;

          return (
            <section
              key={slug}
              id={slug}
              className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {game.emoji} {game.name}
              </h2>
              <p className="mb-4 text-gray-600">{game.description}</p>

              <div className="mb-6 grid gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Aposta mínima:</span>{' '}
                  {game.minBet}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Dias de sorteio:</span>{' '}
                  {getDrawDaysLabel(game.drawDays)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Horário:</span>{' '}
                  {game.drawTime} (horário de Brasília)
                </div>
              </div>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">Como jogar</h3>
              <ol className="mb-6 list-inside list-decimal space-y-2 text-gray-700">
                {details.howTo.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Probabilidades
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                        Faixa de Prêmio
                      </th>
                      <th className="bg-gray-50 p-3 text-left font-semibold text-gray-900">
                        Probabilidade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.odds.map((row, i) => (
                      <tr key={i}>
                        <td className="border-t border-gray-100 p-3 text-gray-700">
                          {row.category}
                        </td>
                        <td className="border-t border-gray-100 p-3 text-gray-700">
                          {row.odds}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {/* General tips */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Dicas Gerais para Jogar nas Loterias
          </h2>
          <ul className="space-y-3 text-gray-700">
            {[
              'Defina um orçamento mensal para apostas e nunca gaste mais do que pode perder.',
              'Considere participar de bolões para aumentar suas chances sem gastar muito.',
              'Diversifique suas apostas entre diferentes loterias.',
              'Verifique sempre seus bilhetes após os sorteios para não perder prêmios.',
              'Guarde seus comprovantes de aposta em local seguro.',
              'Lembre-se: loteria é entretenimento, não investimento.',
              'Apostas com mais números aumentam as chances, mas também o custo.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Where to buy */}
        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Onde Fazer Suas Apostas
          </h2>
          <p className="mb-4 text-gray-600">
            Existem diversas formas de apostar nas loterias da Caixa:
          </p>
          <div className="space-y-4 text-gray-700">
            <div>
              <strong className="text-gray-900">Casas Lotéricas</strong>
              <p>
                Você pode fazer suas apostas em qualquer casa lotérica credenciada pela
                Caixa Econômica Federal em todo o Brasil. Basta preencher o volante do
                jogo desejado e pagar na boca do caixa.
              </p>
            </div>
            <div>
              <strong className="text-gray-900">App Loterias Caixa</strong>
              <p>
                Baixe o aplicativo oficial Loterias Caixa, disponível para Android e iOS.
                Você pode apostar diretamente pelo celular com pagamento via cartão de
                crédito ou Pix. É necessário ter mais de 18 anos e cadastro no site da
                Caixa.
              </p>
            </div>
            <div>
              <strong className="text-gray-900">Internet Banking Caixa</strong>
              <p>
                Clientes da Caixa podem apostar pelo internet banking ou pelo app Caixa
                Tem. As apostas online têm valor mínimo de R$ 30,00 no carrinho (somando
                todas as apostas).
              </p>
            </div>
            <div>
              <strong className="text-gray-900">Bolões</strong>
              <p>
                Você pode participar de bolões organizados pelas casas lotéricas. O bolão
                permite apostar com mais números por um custo menor, dividindo o prêmio
                entre os participantes. A cota mínima é de R$ 3,00.
              </p>
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Tudo Sobre as Loterias da Caixa
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              As loterias da Caixa Econômica Federal são os jogos de azar mais populares
              do Brasil, oferecendo prêmios que podem chegar a centenas de milhões de
              reais. Atualmente, existem 9 modalidades de loterias, cada uma com suas
              regras e probabilidades específicas.
            </p>
            <p>
              A <strong className="text-gray-900">Mega-Sena</strong> é a mais conhecida,
              com prêmios recordes que já ultrapassaram R$ 500 milhões na Mega da Virada.
              Já a <strong className="text-gray-900">Lotofácil</strong> é considerada a
              loteria mais fácil de ganhar, com odds de 1 em 11 para o prêmio mínimo.
            </p>
            <p>
              A <strong className="text-gray-900">+Milionária</strong>, lançada em 2022, é
              a loteria com o prêmio mínimo garantido de R$ 10 milhões, mas também a com
              menor probabilidade de acerto na faixa principal. Já o{' '}
              <strong className="text-gray-900">Super Sete</strong> traz um formato único
              de colunas que diferencia essa modalidade das demais.
            </p>
            <p>
              Parte da arrecadação das loterias é destinada a programas sociais nas áreas
              de saúde, educação, esporte, segurança pública e cultura, tornando cada
              aposta também uma contribuição para a sociedade brasileira.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
