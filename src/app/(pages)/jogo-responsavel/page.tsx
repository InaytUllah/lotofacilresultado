import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Jogo Responsavel - Informacoes e Recursos',
  description:
    'Informacoes sobre jogo responsavel, sinais de alerta para jogo problematico e recursos de ajuda. Jogue com consciencia e dentro dos seus limites.',
  alternates: {
    canonical: `${SITE_URL}/jogo-responsavel`,
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
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Jogo Responsavel',
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
                Inicio
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Jogo Responsavel</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Jogo Responsavel
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Jogar na loteria pode ser divertido, mas e fundamental faze-lo com
          responsabilidade. Confira informacoes importantes, sinais de alerta e recursos
          de apoio.
        </p>

        <div className="space-y-8">
          {/* 18+ Notice */}
          <WarningBox>
            <p className="font-bold text-base">
              Proibido para menores de 18 anos
            </p>
            <p className="mt-1">
              De acordo com a legislacao brasileira, a venda de bilhetes de loteria e
              apostas e proibida para menores de 18 anos. Jogue com responsabilidade e
              respeite os limites legais.
            </p>
          </WarningBox>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              O Que e Jogo Responsavel?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Jogo responsavel significa tratar as loterias e apostas como uma forma de{' '}
                <strong className="text-gray-900">entretenimento</strong>, nao como uma
                fonte de renda ou solucao para problemas financeiros. Envolve tomar
                decisoes conscientes sobre quanto, quando e com que frequencia jogar.
              </p>
              <p>
                A grande maioria dos apostadores joga de forma recreativa e saudavel. No
                entanto, para uma pequena parcela da populacao, o jogo pode se tornar um
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
                'Defina um orcamento fixo mensal para apostas e nunca ultrapasse esse limite.',
                'Nunca aposte dinheiro que voce precisa para despesas essenciais (aluguel, alimentacao, contas).',
                'Nunca tente recuperar perdas fazendo apostas maiores ou mais frequentes.',
                'Nao empreste dinheiro ou use credito para apostar.',
                'Estabeleca limites de tempo para atividades relacionadas a apostas.',
                'Lembre-se de que a loteria e um jogo de azar - nao existe estrategia que garanta ganhos.',
                'Mantenha outras atividades de lazer alem das apostas.',
                'Nao jogue quando estiver emocionalmente fragilizado, estressado ou sob efeito de alcool.',
                'Converse abertamente com familiares e amigos sobre seus habitos de jogo.',
                'Se perceber que esta perdendo o controle, procure ajuda imediatamente.',
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
              Sinais de Alerta do Jogo Problematico
            </h2>
            <p className="mb-4 text-gray-600">
              Se voce ou alguem que conhece apresenta um ou mais destes sinais, pode ser
              hora de procurar ajuda:
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                'Gastar mais dinheiro com apostas do que pode perder.',
                'Mentir para familiares ou amigos sobre quanto gasta com jogo.',
                'Apostar para tentar recuperar dinheiro perdido.',
                'Sentir necessidade de apostar quantias cada vez maiores para obter a mesma emocao.',
                'Negligenciar responsabilidades pessoais ou profissionais por causa do jogo.',
                'Pedir dinheiro emprestado ou vender bens para financiar apostas.',
                'Sentir-se irritado, ansioso ou deprimido quando nao pode jogar.',
                'Tentar parar de jogar sem sucesso.',
                'Usar o jogo como fuga de problemas pessoais ou emocoes negativas.',
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
              Se voce se identificou com algum dos sinais acima, procure ajuda profissional. Voce nao esta sozinho.
            </p>
          </WarningBox>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Recursos de Ajuda e Apoio
            </h2>
            <p className="mb-6 text-gray-600">
              Se voce ou alguem proximo precisa de ajuda com problemas relacionados ao
              jogo, os seguintes recursos estao disponiveis:
            </p>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  Jogadores Anonimos (JA)
                </h3>
                <p className="mb-2 text-gray-700">
                  Grupo de apoio mutuo para pessoas com problemas de jogo compulsivo.
                  Reunioes presenciais e online disponiveis em diversas cidades do Brasil.
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
                  CVV - Centro de Valorizacao da Vida
                </h3>
                <p className="mb-2 text-gray-700">
                  Apoio emocional e prevencao do suicidio. Atendimento 24 horas, gratuito
                  e sigiloso, por telefone, chat ou e-mail.
                </p>
                <p className="text-sm text-gray-600">
                  Telefone:{' '}
                  <strong className="text-gray-900 text-lg">188</strong> (ligacao
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
                  CAPS - Centro de Atencao Psicossocial
                </h3>
                <p className="mb-2 text-gray-700">
                  Servico publico de saude mental do SUS. Oferece atendimento
                  multiprofissional para pessoas com transtornos mentais, incluindo
                  dependencias comportamentais. Procure a unidade mais proxima da sua
                  cidade.
                </p>
                <p className="text-sm text-gray-600">
                  Informacoes: Ligue para o{' '}
                  <strong className="text-gray-900">136</strong> (Disque Saude)
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Autoexclusao</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se voce sente que precisa se afastar das apostas, considere as seguintes
                opcoes de autoexclusao:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong className="text-gray-900">App Loterias Caixa:</strong> Voce pode
                  desativar sua conta de apostas online entrando em contato com o suporte
                  da Caixa.
                </li>
                <li>
                  <strong className="text-gray-900">Bloqueio voluntario:</strong> Solicite
                  a um familiar ou pessoa de confianca que ajude a controlar seus acessos
                  a sites e aplicativos de apostas.
                </li>
                <li>
                  <strong className="text-gray-900">Aplicativos de controle:</strong>{' '}
                  Existem aplicativos que permitem bloquear o acesso a sites de apostas no
                  celular e computador.
                </li>
              </ul>
              <p>
                A decisao de parar e um ato de coragem e autocuidado. Nao hesite em
                procurar ajuda profissional se necessario.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Nosso Compromisso
            </h2>
            <p className="text-gray-700">
              O <strong className="text-gray-900">{SITE_NAME}</strong> e comprometido com
              a promocao do jogo responsavel. Nosso site e exclusivamente informativo e
              nao vende nem intermedia apostas. Incentivamos todos os nossos usuarios a
              jogar com consciencia, dentro de seus limites financeiros, e a buscar ajuda
              caso percebam qualquer sinal de jogo problematico.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
