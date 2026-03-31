import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Jogo Responsável - Informações e Recursos',
  description:
    'Informações sobre jogo responsável, sinais de alerta para jogo problemático e recursos de ajuda. Jogue com consciência e dentro dos seus limites.',
  alternates: {
    canonical: `${SITE_URL}/jogo-responsavel`,
    languages: {
      'pt-BR': `${SITE_URL}/jogo-responsavel`,
    },
  },
  openGraph: {
    title: 'Jogo Responsável - Informações e Recursos',
    description: 'Informações sobre jogo responsável, sinais de alerta para jogo problemático e recursos de ajuda. Jogue com consciência e dentro dos seus limites.',
    url: `${SITE_URL}/jogo-responsavel`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <div className="text-sm text-amber-800">{children}</div>
      </div>
    </div>
  );
}

export default function JogoResponsavelPage() {
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
        name: 'Jogo Responsável',
        item: `${SITE_URL}/jogo-responsavel`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <li className="text-gray-900 font-medium">Jogo Responsável</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Jogo Responsável
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Jogar na loteria pode ser divertido, mas é fundamental fazê-lo com
          responsabilidade. Confira informações importantes, sinais de alerta e recursos
          de apoio.
        </p>

        <div className="space-y-8">
          {/* 18+ Notice */}
          <WarningBox>
            <p className="font-bold text-base">
              Proibido para menores de 18 anos
            </p>
            <p className="mt-1">
              De acordo com a legislação brasileira, a venda de bilhetes de loteria e
              apostas é proibida para menores de 18 anos. Jogue com responsabilidade e
              respeite os limites legais.
            </p>
          </WarningBox>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              O Que é Jogo Responsável?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Jogo responsável significa tratar as loterias e apostas como uma forma de{' '}
                <strong className="text-gray-900">entretenimento</strong>, não como uma
                fonte de renda ou solução para problemas financeiros. Envolve tomar
                decisões conscientes sobre quanto, quando e com que frequência jogar.
              </p>
              <p>
                A grande maioria dos apostadores joga de forma recreativa e saudável. No
                entanto, para uma pequena parcela da população, o jogo pode se tornar um
                problema que afeta a vida pessoal, profissional e financeira.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Dicas para Jogar com Responsabilidade
            </h2>
            <ul className="space-y-3 text-gray-700">
              {[
                'Defina um orçamento fixo mensal para apostas e nunca ultrapasse esse limite.',
                'Nunca aposte dinheiro que você precisa para despesas essenciais (aluguel, alimentação, contas).',
                'Nunca tente recuperar perdas fazendo apostas maiores ou mais frequentes.',
                'Não empreste dinheiro ou use crédito para apostar.',
                'Estabeleça limites de tempo para atividades relacionadas a apostas.',
                'Lembre-se de que a loteria é um jogo de azar - não existe estratégia que garanta ganhos.',
                'Mantenha outras atividades de lazer além das apostas.',
                'Não jogue quando estiver emocionalmente fragilizado, estressado ou sob efeito de álcool.',
                'Converse abertamente com familiares e amigos sobre seus hábitos de jogo.',
                'Se perceber que está perdendo o controle, procure ajuda imediatamente.',
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

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Sinais de Alerta do Jogo Problemático
            </h2>
            <p className="mb-4 text-gray-600">
              Se você ou alguém que conhece apresenta um ou mais destes sinais, pode ser
              hora de procurar ajuda:
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                'Gastar mais dinheiro com apostas do que pode perder.',
                'Mentir para familiares ou amigos sobre quanto gasta com jogo.',
                'Apostar para tentar recuperar dinheiro perdido.',
                'Sentir necessidade de apostar quantias cada vez maiores para obter a mesma emoção.',
                'Negligenciar responsabilidades pessoais ou profissionais por causa do jogo.',
                'Pedir dinheiro emprestado ou vender bens para financiar apostas.',
                'Sentir-se irritado, ansioso ou deprimido quando não pode jogar.',
                'Tentar parar de jogar sem sucesso.',
                'Usar o jogo como fuga de problemas pessoais ou emoções negativas.',
                'Comprometer relacionamentos importantes por causa do jogo.',
              ].map((sign, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </section>

          <WarningBox>
            <p className="font-bold text-base">
              Se você se identificou com algum dos sinais acima, procure ajuda profissional. Você não está sozinho.
            </p>
          </WarningBox>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Recursos de Ajuda e Apoio
            </h2>
            <p className="mb-6 text-gray-600">
              Se você ou alguém próximo precisa de ajuda com problemas relacionados ao
              jogo, os seguintes recursos estão disponíveis:
            </p>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Jogadores Anônimos (JA)
                </h3>
                <p className="mb-2 text-gray-700">
                  Grupo de apoio mútuo para pessoas com problemas de jogo compulsivo.
                  Reuniões presenciais e online disponíveis em diversas cidades do Brasil.
                </p>
                <p className="text-sm text-gray-600">
                  Site:{' '}
                  <a
                    href="https://www.jogadoresanonimos.org.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    www.jogadoresanonimos.org.br
                  </a>
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  CVV - Centro de Valorização da Vida
                </h3>
                <p className="mb-2 text-gray-700">
                  Apoio emocional e prevenção do suicídio. Atendimento 24 horas, gratuito
                  e sigiloso, por telefone, chat ou e-mail.
                </p>
                <p className="text-sm text-gray-600">
                  Telefone:{' '}
                  <strong className="text-gray-900 text-lg">188</strong> (ligação
                  gratuita)
                </p>
                <p className="text-sm text-gray-600">
                  Site:{' '}
                  <a
                    href="https://www.cvv.org.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    www.cvv.org.br
                  </a>
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  CAPS - Centro de Atenção Psicossocial
                </h3>
                <p className="mb-2 text-gray-700">
                  Serviço público de saúde mental do SUS. Oferece atendimento
                  multiprofissional para pessoas com transtornos mentais, incluindo
                  dependências comportamentais. Procure a unidade mais próxima da sua
                  cidade.
                </p>
                <p className="text-sm text-gray-600">
                  Informações: Ligue para o{' '}
                  <strong className="text-gray-900">136</strong> (Disque Saúde)
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Autoexclusão</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você sente que precisa se afastar das apostas, considere as seguintes
                opções de autoexclusão:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong className="text-gray-900">App Loterias Caixa:</strong> Você pode
                  desativar sua conta de apostas online entrando em contato com o suporte
                  da Caixa.
                </li>
                <li>
                  <strong className="text-gray-900">Bloqueio voluntário:</strong> Solicite
                  a um familiar ou pessoa de confiança que ajude a controlar seus acessos
                  a sites e aplicativos de apostas.
                </li>
                <li>
                  <strong className="text-gray-900">Aplicativos de controle:</strong>{' '}
                  Existem aplicativos que permitem bloquear o acesso a sites de apostas no
                  celular e computador.
                </li>
              </ul>
              <p>
                A decisão de parar é um ato de coragem e autocuidado. Não hesite em
                procurar ajuda profissional se necessário.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Nosso Compromisso
            </h2>
            <p className="text-gray-700">
              O <strong className="text-gray-900">{SITE_NAME}</strong> é comprometido com
              a promoção do jogo responsável. Nosso site é exclusivamente informativo e
              não vende nem intermedia apostas. Incentivamos todos os nossos usuários a
              jogar com consciência, dentro de seus limites financeiros, e a buscar ajuda
              caso percebam qualquer sinal de jogo problemático.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
