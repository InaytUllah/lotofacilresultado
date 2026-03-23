import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de uso do site Resultados Mega Sena. Condicoes para utilizacao dos servicos e conteudos disponibilizados.',
  alternates: {
    canonical: `${SITE_URL}/termos`,
  },
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Termos de Uso
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Ultima atualizacao: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Aceitacao dos Termos
          </h2>
          <p className="text-gray-700">
            Ao acessar e utilizar o site{' '}
            <strong className="text-gray-900">{SITE_NAME}</strong> ({SITE_URL}
            ), voce concorda integralmente com estes Termos de Uso. Caso nao concorde com
            alguma disposicao aqui estabelecida, pedimos que nao utilize nossos servicos.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Uso do Site</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Este site tem carater exclusivamente{' '}
              <strong className="text-gray-900">informativo</strong>. Disponibilizamos
              resultados de loterias, estatisticas, ferramentas de analise e conteudos
              educativos sobre as loterias da Caixa Economica Federal.
            </p>
            <p>O usuario se compromete a:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Utilizar o site de forma licita e de boa-fe.</li>
              <li>Nao tentar acessar areas restritas ou sistemas do servidor.</li>
              <li>Nao utilizar o conteudo do site para fins ilegais.</li>
              <li>
                Nao reproduzir, distribuir ou modificar o conteudo sem autorizacao previa.
              </li>
              <li>
                Nao utilizar robos, scrapers ou ferramentas automatizadas para acessar o
                site de forma massiva.
              </li>
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Natureza Informativa
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              O {SITE_NAME} e um site{' '}
              <strong className="text-gray-900">
                informativo e independente
              </strong>
              . Nao somos afiliados, patrocinados ou endossados pela Caixa Economica
              Federal ou qualquer orgao governamental.
            </p>
            <p>
              Os resultados, estatisticas e previsoes apresentados neste site sao baseados
              em dados publicamente disponiveis e algoritmos estatisticos. Nenhuma
              informacao aqui apresentada constitui garantia de acerto ou recomendacao de
              aposta.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Propriedade Intelectual
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Todo o conteudo deste site, incluindo textos, graficos, logotipos, icones,
              imagens, codigo-fonte e software, e protegido por leis de propriedade
              intelectual e pertence ao {SITE_NAME} ou a seus licenciadores.
            </p>
            <p>
              E permitido o compartilhamento de links para nossas paginas, desde que nao
              haja alteracao do conteudo original. A reproducao total ou parcial do conteudo
              sem autorizacao expressa e proibida.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Limitacao de Responsabilidade
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>O {SITE_NAME} nao se responsabiliza por:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Eventuais imprecisoes, erros ou atrasos na publicacao dos resultados.
              </li>
              <li>
                Perdas financeiras decorrentes de apostas baseadas em informacoes do site.
              </li>
              <li>
                Decisoes tomadas pelo usuario com base em previsoes, analises ou
                estatisticas apresentadas.
              </li>
              <li>
                Indisponibilidade temporaria do site por motivos tecnicos ou de
                manutencao.
              </li>
              <li>
                Danos causados por virus ou elementos nocivos que possam afetar o
                equipamento do usuario.
              </li>
            </ul>
            <p>
              Os resultados oficiais devem ser sempre conferidos no site da{' '}
              <a
                href="https://loterias.caixa.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                Caixa Economica Federal
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Links Externos</h2>
          <p className="text-gray-700">
            Nosso site pode conter links para sites de terceiros. Esses links sao
            fornecidos apenas para conveniencia e nao implicam endosso ou
            responsabilidade sobre o conteudo, politicas de privacidade ou praticas
            desses sites. Recomendamos que voce leia os termos e politicas de cada site
            externo que visitar.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Modificacoes dos Termos
          </h2>
          <p className="text-gray-700">
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, sem
            aviso previo. As alteracoes entram em vigor imediatamente apos sua publicacao
            nesta pagina. O uso continuado do site apos quaisquer modificacoes constitui
            sua aceitacao dos novos termos.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Legislacao Aplicavel
          </h2>
          <p className="text-gray-700">
            Estes Termos de Uso sao regidos pelas leis da Republica Federativa do Brasil.
            Qualquer disputa sera submetida ao foro da comarca de domicilio do usuario,
            conforme o Codigo de Defesa do Consumidor.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Em caso de duvidas sobre estes Termos de Uso, entre em contato pelo e-mail:{' '}
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
