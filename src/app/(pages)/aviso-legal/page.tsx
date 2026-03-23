import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal do site Resultados Mega Sena. Informacoes sobre a natureza informativa do site, limitacoes de responsabilidade e isenções.',
  alternates: {
    canonical: `${SITE_URL}/aviso-legal`,
  },
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Aviso Legal
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Ultima atualizacao: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Natureza Informativa
          </h2>
          <p className="text-gray-700">
            O <strong className="text-gray-900">{SITE_NAME}</strong> ({SITE_URL}) e um
            site de carater exclusivamente informativo, dedicado a divulgacao de
            resultados, estatisticas e informacoes sobre as loterias administradas pela
            Caixa Economica Federal.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Independencia e Nao Afiliacao
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Este site e <strong className="text-gray-900">independente</strong> e nao
              possui qualquer vinculo, afiliacao, patrocinio ou endosso da Caixa Economica
              Federal, do Governo Federal ou de qualquer outro orgao publico ou privado.
            </p>
            <p>
              Os nomes das loterias (Mega-Sena, Lotofacil, Quina, entre outros) sao marcas
              registradas da Caixa Economica Federal e sao utilizados neste site apenas
              para fins informativos.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Precisao das Informacoes
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Embora nos esforcemos para manter as informacoes deste site atualizadas e
              precisas, <strong className="text-gray-900">nao garantimos</strong> a
              exatidao, integridade ou atualidade de qualquer conteudo publicado, incluindo
              resultados de sorteios, valores de premios e estatisticas.
            </p>
            <p>
              Os resultados oficiais das loterias devem ser sempre conferidos nos canais
              oficiais da Caixa Economica Federal, incluindo o site{' '}
              <a
                href="https://loterias.caixa.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                loterias.caixa.gov.br
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Previsoes e Analises Estatisticas
          </h2>
          <p className="text-gray-700">
            As previsoes, analises de numeros quentes e frios, e quaisquer ferramentas
            estatisticas disponibilizadas neste site sao baseadas em dados historicos e
            algoritmos matematicos. Elas{' '}
            <strong className="text-gray-900">nao constituem garantia de resultados</strong>{' '}
            futuros. Cada sorteio e um evento independente e aleatorio, e resultados
            anteriores nao influenciam sorteios futuros.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Responsabilidade do Usuario
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              O usuario e inteiramente responsavel por suas decisoes de aposta. O{' '}
              {SITE_NAME} nao se responsabiliza por quaisquer perdas financeiras ou danos
              decorrentes do uso das informacoes, ferramentas ou previsoes disponibilizadas
              neste site.
            </p>
            <p>
              Recomendamos que todos os usuarios joguem com responsabilidade, dentro de
              seus limites financeiros, e consultem nossa pagina de{' '}
              <a
                href="/jogo-responsavel"
                className="text-emerald-600 hover:underline font-medium"
              >
                Jogo Responsavel
              </a>{' '}
              para informacoes e recursos de apoio.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Limitacao de Responsabilidade
          </h2>
          <p className="text-gray-700">
            Em nenhuma circunstancia o {SITE_NAME}, seus proprietarios, administradores
            ou colaboradores serao responsaveis por danos diretos, indiretos, incidentais,
            consequenciais ou punitivos decorrentes do acesso ou uso deste site, incluindo
            mas nao se limitando a perdas financeiras, perda de dados ou interrupcao de
            servicos.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Legislacao Aplicavel
          </h2>
          <p className="text-gray-700">
            Este Aviso Legal e regido pelas leis da Republica Federativa do Brasil.
            Quaisquer disputas serao submetidas a jurisdicao dos tribunais brasileiros
            competentes.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Para duvidas sobre este Aviso Legal, entre em contato pelo e-mail:{' '}
            <a
              href="mailto:contato@resultadosmegasena.com.br"
              className="text-emerald-600 hover:underline font-medium"
            >
              contato@resultadosmegasena.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
