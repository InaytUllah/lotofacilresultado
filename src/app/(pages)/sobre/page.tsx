import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre Nos - Resultados Mega Sena',
  description:
    'Conheca o Resultados Mega Sena: sua fonte confiavel para resultados atualizados, estatisticas e ferramentas de todas as loterias da Caixa.',
  alternates: {
    canonical: `${SITE_URL}/sobre`,
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
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sobre Nos',
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
                Inicio
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Sobre Nos</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Sobre o {SITE_NAME}
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Sua fonte confiavel para resultados, estatisticas e ferramentas de todas as
          loterias da Caixa Economica Federal.
        </p>

        <div className="space-y-8">
          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Nossa Missao</h2>
            <p className="text-gray-700">
              O <strong className="text-gray-900">{SITE_NAME}</strong> foi criado com o
              objetivo de fornecer resultados rapidos, precisos e atualizados de todas as
              loterias da Caixa Economica Federal. Acreditamos que todo apostador merece
              acesso facil e gratuito as informacoes dos sorteios, sem complicacoes.
            </p>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">O Que Oferecemos</h2>
            <ul className="space-y-3 text-gray-700">
              {[
                'Resultados atualizados de todas as 9 loterias da Caixa (Mega-Sena, Lotofacil, Quina, Lotomania, +Milionaria, Dia de Sorte, Super Sete, Dupla Sena e Timemania).',
                'Estatisticas detalhadas e analise de frequencia de numeros.',
                'Previsoes baseadas em algoritmos estatisticos avancados.',
                'Gerador de numeros aleatorios para suas apostas.',
                'Historico completo de todos os concursos anteriores.',
                'Informacoes sobre probabilidades e premios de cada loteria.',
                'Guia completo de como jogar em cada modalidade.',
                'Blog com artigos, dicas e analises sobre loterias.',
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
                Nos comprometemos a oferecer informacoes precisas e atualizadas. Nosso
                sistema e atualizado automaticamente minutos apos cada sorteio,
                garantindo que voce tenha acesso rapido aos resultados.
              </p>
              <p>
                Tambem nos preocupamos com o{' '}
                <strong className="text-gray-900">jogo responsavel</strong>. Acreditamos
                que as loterias devem ser uma forma de entretenimento, nao uma fonte de
                estresse ou problemas financeiros. Por isso, incentivamos todos os nossos
                usuarios a apostar com consciencia e dentro de seus limites.
              </p>
              <p>
                Para mais informacoes sobre praticas saudaveis de jogo, visite nossa
                pagina de{' '}
                <a
                  href="/jogo-responsavel"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Jogo Responsavel
                </a>
                .
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Aviso Importante</h2>
            <p className="text-gray-700">
              O {SITE_NAME} e um site informativo e independente. Nao somos afiliados,
              patrocinados ou endossados pela Caixa Economica Federal. Os resultados
              oficiais devem ser sempre conferidos no site oficial da Caixa. Nossas
              previsoes e analises estatisticas sao ferramentas de apoio e nao garantem
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
              Tem sugestoes, duvidas ou encontrou algum problema? Adorariamos ouvir voce.
              Entre em contato conosco pela nossa{' '}
              <a
                href="/contato"
                className="text-emerald-600 hover:underline font-medium"
              >
                pagina de contato
              </a>{' '}
              ou envie um e-mail para{' '}
              <a
                href="mailto:contato@resultadosmegasena.com.br"
                className="text-emerald-600 hover:underline font-medium"
              >
                contato@resultadosmegasena.com.br
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
