import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Leia o aviso legal do Lotofácil Resultado. Saiba sobre a natureza informativa do site, limitações de responsabilidade e isenções legais. Confira antes de usar.',
  alternates: {
    canonical: `${SITE_URL}/aviso-legal`,
    languages: {
      'pt-BR': `${SITE_URL}/aviso-legal`,
    },
  },
  openGraph: {
    title: 'Aviso Legal',
    description: 'Leia o aviso legal do Lotofácil Resultado. Saiba sobre a natureza informativa do site, limitações de responsabilidade e isenções legais. Confira antes de usar.',
    url: `${SITE_URL}/aviso-legal`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function AvisoLegalPage() {
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
        name: 'Aviso Legal',
        item: `${SITE_URL}/aviso-legal`,
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
        Aviso Legal
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Última atualização: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Natureza Informativa
          </h2>
          <p className="text-gray-700">
            O <strong className="text-gray-900">{SITE_NAME}</strong> ({SITE_URL}) é um
            site de caráter exclusivamente informativo, dedicado à divulgação de
            resultados, estatísticas e informações sobre as loterias administradas pela
            Caixa Econômica Federal.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Independência e Não Afiliação
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Este site é <strong className="text-gray-900">independente</strong> e não
              possui qualquer vínculo, afiliação, patrocínio ou endosso da Caixa Econômica
              Federal, do Governo Federal ou de qualquer outro órgão público ou privado.
            </p>
            <p>
              Os nomes das loterias (Mega-Sena, Lotofácil, Quina, entre outros) são marcas
              registradas da Caixa Econômica Federal e são utilizados neste site apenas
              para fins informativos.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Precisão das Informações
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Embora nos esforcemos para manter as informações deste site atualizadas e
              precisas, <strong className="text-gray-900">não garantimos</strong> a
              exatidão, integridade ou atualidade de qualquer conteúdo publicado, incluindo
              resultados de sorteios, valores de prêmios e estatísticas.
            </p>
            <p>
              Os resultados oficiais das loterias devem ser sempre conferidos nos canais
              oficiais da Caixa Econômica Federal, incluindo o site{' '}
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
            Previsões e Análises Estatísticas
          </h2>
          <p className="text-gray-700">
            As previsões, análises de números quentes e frios, e quaisquer ferramentas
            estatísticas disponibilizadas neste site são baseadas em dados históricos e
            algoritmos matemáticos. Elas{' '}
            <strong className="text-gray-900">não constituem garantia de resultados</strong>{' '}
            futuros. Cada sorteio é um evento independente e aleatório, e resultados
            anteriores não influenciam sorteios futuros.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Responsabilidade do Usuário
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              O usuário é inteiramente responsável por suas decisões de aposta. O{' '}
              {SITE_NAME} não se responsabiliza por quaisquer perdas financeiras ou danos
              decorrentes do uso das informações, ferramentas ou previsões disponibilizadas
              neste site.
            </p>
            <p>
              Recomendamos que todos os usuários joguem com responsabilidade, dentro de
              seus limites financeiros, e consultem nossa página de{' '}
              <a
                href="/jogo-responsavel"
                className="text-emerald-600 hover:underline font-medium"
              >
                Jogo Responsável
              </a>{' '}
              para informações e recursos de apoio.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Limitação de Responsabilidade
          </h2>
          <p className="text-gray-700">
            Em nenhuma circunstância o {SITE_NAME}, seus proprietários, administradores
            ou colaboradores serão responsáveis por danos diretos, indiretos, incidentais,
            consequenciais ou punitivos decorrentes do acesso ou uso deste site, incluindo
            mas não se limitando a perdas financeiras, perda de dados ou interrupção de
            serviços.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Legislação Aplicável
          </h2>
          <p className="text-gray-700">
            Este Aviso Legal é regido pelas leis da República Federativa do Brasil.
            Quaisquer disputas serão submetidas à jurisdição dos tribunais brasileiros
            competentes.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Para dúvidas sobre este Aviso Legal, entre em contato pelo e-mail:{' '}
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
              <Link href="/termos" className="text-emerald-600 hover:underline font-medium">
                Termos de Uso
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
