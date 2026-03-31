import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de privacidade do Lotofácil Resultado. Entenda como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD. Leia e fique tranquilo.',
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
    languages: {
      'pt-BR': `${SITE_URL}/privacidade`,
    },
  },
  openGraph: {
    title: 'Política de Privacidade',
    description: 'Política de privacidade do Lotofácil Resultado. Entenda como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD. Leia e fique tranquilo.',
    url: `${SITE_URL}/privacidade`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function PrivacidadePage() {
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
        name: 'Política de Privacidade',
        item: `${SITE_URL}/privacidade`,
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
        Política de Privacidade
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Última atualização: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Introdução</h2>
          <p className="text-gray-700">
            O <strong className="text-gray-900">{SITE_NAME}</strong> (
            {SITE_URL}) valoriza a privacidade de seus visitantes. Esta Política de
            Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas
            informações quando você acessa nosso site. Ao utilizar nossos serviços, você
            concorda com as práticas descritas neste documento.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Coleta de Dados</h2>
          <div className="space-y-4 text-gray-700">
            <p>Nosso site pode coletar os seguintes tipos de informações:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-gray-900">Dados de navegação:</strong> endereço
                IP, tipo de navegador, sistema operacional, páginas visitadas, tempo de
                permanência e URLs de referência.
              </li>
              <li>
                <strong className="text-gray-900">Dados de cookies:</strong> utilizamos
                cookies e tecnologias semelhantes para melhorar a experiência do usuário,
                lembrar preferências e gerar estatísticas de acesso.
              </li>
              <li>
                <strong className="text-gray-900">Dados fornecidos voluntariamente:</strong>{' '}
                informações que você fornece ao entrar em contato conosco, como nome e
                endereço de e-mail.
              </li>
            </ul>
            <p>
              Não coletamos dados sensíveis como CPF, dados bancários ou informações de
              pagamento.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Uso de Cookies</h2>
          <div className="space-y-4 text-gray-700">
            <p>Utilizamos cookies para:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Analisar o tráfego e o comportamento dos visitantes no site.</li>
              <li>Personalizar a experiência de navegação.</li>
              <li>Exibir anúncios relevantes por meio de parceiros publicitários.</li>
              <li>Lembrar suas preferências e configurações.</li>
            </ul>
            <p>
              Você pode desativar os cookies nas configurações do seu navegador, mas isso
              pode afetar a funcionalidade de algumas áreas do site.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Google Analytics e Google AdSense
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Utilizamos o <strong className="text-gray-900">Google Analytics</strong>{' '}
              para coletar informações sobre como os visitantes usam nosso site. Esses
              dados nos ajudam a entender quais páginas são mais acessadas e como melhorar
              nosso conteúdo. O Google Analytics utiliza cookies para coletar informações
              de forma anônima, sem identificar visitantes individuais.
            </p>
            <p>
              Também utilizamos o <strong className="text-gray-900">Google AdSense</strong>{' '}
              para exibir anúncios. O Google AdSense pode utilizar cookies e tecnologias
              semelhantes para exibir anúncios baseados em visitas anteriores ao nosso site
              e a outros sites. Você pode personalizar as configurações de anúncios
              visitando as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                Configurações de Anúncios do Google
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Direitos do Usuário
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem os
              seguintes direitos:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Confirmar a existência de tratamento de dados pessoais.</li>
              <li>Acessar os dados pessoais que possuímos sobre você.</li>
              <li>
                Solicitar a correção de dados incompletos, inexatos ou desatualizados.
              </li>
              <li>
                Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.
              </li>
              <li>
                Solicitar a portabilidade dos dados a outro fornecedor de serviços.
              </li>
              <li>
                Solicitar a eliminação de dados pessoais tratados com seu consentimento.
              </li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Compartilhamento de Dados
          </h2>
          <p className="text-gray-700">
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com
            terceiros, exceto quando necessário para o funcionamento do site (como
            serviços de analytics e publicidade mencionados acima) ou quando exigido por
            lei.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Segurança dos Dados
          </h2>
          <p className="text-gray-700">
            Adotamos medidas de segurança técnicas e administrativas para proteger seus
            dados pessoais contra acessos não autorizados, destruição, perda, alteração ou
            qualquer forma de tratamento inadequado. Nosso site utiliza protocolo HTTPS
            para garantir a segurança na transmissão de dados.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer
            seus direitos, entre em contato conosco pelo e-mail:{' '}
            <a
              href="mailto:contato@lotofacilresultado.com"
              className="text-emerald-600 hover:underline font-medium"
            >
              contato@lotofacilresultado.com
            </a>
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Alterações nesta Política
          </h2>
          <p className="text-gray-700">
            Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer
            momento. Quaisquer alterações serão publicadas nesta página com a data de
            atualização revisada. Recomendamos que você revise esta política
            periodicamente.
          </p>
        </section>
        {/* Documentos Relacionados */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Documentos Relacionados
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/termos" className="text-emerald-600 hover:underline font-medium">
                Termos de Uso
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
