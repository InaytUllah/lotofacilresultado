import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de uso do Lotofácil Resultado. Conheça as condições para utilização dos serviços, conteúdos e ferramentas de loterias disponibilizados. Leia agora.',
  alternates: {
    canonical: `${SITE_URL}/termos`,
    languages: {
      'pt-BR': `${SITE_URL}/termos`,
    },
  },
  openGraph: {
    title: 'Termos de Uso',
    description: 'Termos de uso do Lotofácil Resultado. Conheça as condições para utilização dos serviços, conteúdos e ferramentas de loterias disponibilizados. Leia agora.',
    url: `${SITE_URL}/termos`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function TermosPage() {
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
        name: 'Termos de Uso',
        item: `${SITE_URL}/termos`,
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
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Termos de Uso
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Última atualização: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Aceitação dos Termos
          </h2>
          <p className="text-gray-700">
            Ao acessar e utilizar o site{' '}
            <strong className="text-gray-900">{SITE_NAME}</strong> ({SITE_URL}
            ), você concorda integralmente com estes Termos de Uso. Caso não concorde com
            alguma disposição aqui estabelecida, pedimos que não utilize nossos serviços.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Uso do Site</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Este site tem caráter exclusivamente{' '}
              <strong className="text-gray-900">informativo</strong>. Disponibilizamos
              resultados de loterias, estatísticas, ferramentas de análise e conteúdos
              educativos sobre as loterias da Caixa Econômica Federal.
            </p>
            <p>O usuário se compromete a:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Utilizar o site de forma lícita e de boa-fé.</li>
              <li>Não tentar acessar áreas restritas ou sistemas do servidor.</li>
              <li>Não utilizar o conteúdo do site para fins ilegais.</li>
              <li>
                Não reproduzir, distribuir ou modificar o conteúdo sem autorização prévia.
              </li>
              <li>
                Não utilizar robôs, scrapers ou ferramentas automatizadas para acessar o
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
              O {SITE_NAME} é um site{' '}
              <strong className="text-gray-900">
                informativo e independente
              </strong>
              . Não somos afiliados, patrocinados ou endossados pela Caixa Econômica
              Federal ou qualquer órgão governamental.
            </p>
            <p>
              Os resultados, estatísticas e previsões apresentados neste site são baseados
              em dados publicamente disponíveis e algoritmos estatísticos. Nenhuma
              informação aqui apresentada constitui garantia de acerto ou recomendação de
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
              Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, ícones,
              imagens, código-fonte e software, é protegido por leis de propriedade
              intelectual e pertence ao {SITE_NAME} ou a seus licenciadores.
            </p>
            <p>
              É permitido o compartilhamento de links para nossas páginas, desde que não
              haja alteração do conteúdo original. A reprodução total ou parcial do conteúdo
              sem autorização expressa é proibida.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Limitação de Responsabilidade
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>O {SITE_NAME} não se responsabiliza por:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Eventuais imprecisões, erros ou atrasos na publicação dos resultados.
              </li>
              <li>
                Perdas financeiras decorrentes de apostas baseadas em informações do site.
              </li>
              <li>
                Decisões tomadas pelo usuário com base em previsões, análises ou
                estatísticas apresentadas.
              </li>
              <li>
                Indisponibilidade temporária do site por motivos técnicos ou de
                manutenção.
              </li>
              <li>
                Danos causados por vírus ou elementos nocivos que possam afetar o
                equipamento do usuário.
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
                Caixa Econômica Federal
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Links Externos</h2>
          <p className="text-gray-700">
            Nosso site pode conter links para sites de terceiros. Esses links são
            fornecidos apenas para conveniência e não implicam endosso ou
            responsabilidade sobre o conteúdo, políticas de privacidade ou práticas
            desses sites. Recomendamos que você leia os termos e políticas de cada site
            externo que visitar.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Modificações dos Termos
          </h2>
          <p className="text-gray-700">
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, sem
            aviso prévio. As alterações entram em vigor imediatamente após sua publicação
            nesta página. O uso continuado do site após quaisquer modificações constitui
            sua aceitação dos novos termos.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Legislação Aplicável
          </h2>
          <p className="text-gray-700">
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
            Qualquer disputa será submetida ao foro da comarca de domicílio do usuário,
            conforme o Código de Defesa do Consumidor.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail:{' '}
            <a
              href="mailto:contato@lotofacilresultado.com"
              className="text-emerald-600 hover:underline font-medium"
            >
              contato@lotofacilresultado.com
            </a>
          </p>
        </section>
        {/* Documentos Relacionados */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Documentos Relacionados
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/privacidade" className="text-emerald-600 hover:underline font-medium">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="text-emerald-600 hover:underline font-medium">
                Aviso Legal
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-emerald-600 hover:underline font-medium">
                Contato
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
    </>
  );
}
