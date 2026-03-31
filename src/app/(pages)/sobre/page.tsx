import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre Nós - Lotofácil Resultado',
  description:
    'Conheça o Lotofácil Resultado: sua fonte confiável para resultados atualizados, estatísticas e ferramentas gratuitas de todas as loterias da Caixa. Saiba mais.',
  alternates: {
    canonical: `${SITE_URL}/sobre`,
    languages: {
      'pt-BR': `${SITE_URL}/sobre`,
    },
  },
  openGraph: {
    title: 'Sobre Nós - Lotofácil Resultado',
    description: 'Conheça o Lotofácil Resultado: sua fonte confiável para resultados atualizados, estatísticas e ferramentas gratuitas de todas as loterias da Caixa. Saiba mais.',
    url: `${SITE_URL}/sobre`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function SobrePage() {
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
        name: 'Sobre Nós',
        item: `${SITE_URL}/sobre`,
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
            <li className="text-gray-900 font-medium">Sobre Nós</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Sobre o {SITE_NAME}
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Sua fonte confiável para resultados, estatísticas e ferramentas de todas as
          loterias da Caixa Econômica Federal.
        </p>

        <div className="space-y-8">
          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Nossa Missão</h2>
            <p className="text-gray-700">
              O <strong className="text-gray-900">{SITE_NAME}</strong> foi criado com o
              objetivo de fornecer resultados rápidos, precisos e atualizados de todas as
              loterias da Caixa Econômica Federal. Acreditamos que todo apostador merece
              acesso fácil e gratuito às informações dos sorteios, sem complicações.
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">O Que Oferecemos</h2>
            <ul className="space-y-3 text-gray-700">
              {[
                'Resultados atualizados de todas as 9 loterias da Caixa (Mega-Sena, Lotofácil, Quina, Lotomania, +Milionária, Dia de Sorte, Super Sete, Dupla Sena e Timemania).',
                'Estatísticas detalhadas e análise de frequência de números.',
                'Previsões baseadas em algoritmos estatísticos avançados.',
                'Gerador de números aleatórios para suas apostas.',
                'Histórico completo de todos os concursos anteriores.',
                'Informações sobre probabilidades e prêmios de cada loteria.',
                'Guia completo de como jogar em cada modalidade.',
                'Blog com artigos, dicas e análises sobre loterias.',
              ].map((item, i) => (
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Nosso Compromisso
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nos comprometemos a oferecer informações precisas e atualizadas. Nosso
                sistema é atualizado automaticamente minutos após cada sorteio,
                garantindo que você tenha acesso rápido aos resultados.
              </p>
              <p>
                Também nos preocupamos com o{' '}
                <strong className="text-gray-900">jogo responsável</strong>. Acreditamos
                que as loterias devem ser uma forma de entretenimento, não uma fonte de
                estresse ou problemas financeiros. Por isso, incentivamos todos os nossos
                usuários a apostar com consciência e dentro de seus limites.
              </p>
              <p>
                Para mais informações sobre práticas saudáveis de jogo, visite nossa
                página de{' '}
                <a
                  href="/jogo-responsavel"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Jogo Responsável
                </a>
                .
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Aviso Importante</h2>
            <p className="text-gray-700">
              O {SITE_NAME} é um site informativo e independente. Não somos afiliados,
              patrocinados ou endossados pela Caixa Econômica Federal. Os resultados
              oficiais devem ser sempre conferidos no site oficial da Caixa. Nossas
              previsões e análises estatísticas são ferramentas de apoio e não garantem
              resultados. Para mais detalhes, consulte nosso{' '}
              <a
                href="/aviso-legal"
                className="text-emerald-600 hover:underline font-medium"
              >
                Aviso Legal
              </a>
              .
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Entre em Contato</h2>
            <p className="text-gray-700">
              Tem sugestões, dúvidas ou encontrou algum problema? Adoraríamos ouvir você.
              Entre em contato conosco pela nossa{' '}
              <a
                href="/contato"
                className="text-emerald-600 hover:underline font-medium"
              >
                página de contato
              </a>{' '}
              ou envie um e-mail para{' '}
              <a
                href="mailto:contato@lotofacilresultado.com"
                className="text-emerald-600 hover:underline font-medium"
              >
                contato@lotofacilresultado.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
