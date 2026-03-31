import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import TicketChecker from '@/components/TicketChecker';
import SEOContent from '@/components/ui/SEOContent';

const title = 'Conferidor de Apostas - Confira Seu Jogo das Loterias da Caixa';
const description =
  'Confira se seus números foram sorteados nas loterias da Caixa. Insira sua aposta e verifique os resultados da Mega-Sena, Lotofácil, Quina e mais.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/conferidor',
    languages: {
      'pt-BR': `${SITE_URL}/conferidor`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/conferidor`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function ConferidorPage() {
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
        name: 'Conferidor de Apostas',
        item: `${SITE_URL}/conferidor`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Conferidor de Apostas</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Conferidor de Apostas
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Confira se seus números foram sorteados. Selecione o jogo, escolha
            seus números e descubra se você ganhou.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <TicketChecker />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Usar o Conferidor de Apostas
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O <strong className="text-gray-900">Conferidor de Apostas</strong>{' '}
              permite que você verifique rapidamente se seus números foram
              sorteados em qualquer loteria da Caixa Econômica Federal. Basta
              selecionar o jogo, marcar seus números e clicar em
              &quot;Conferir Resultado&quot;.
            </p>
            <p className="text-gray-600">
              Por padrão, o conferidor verifica sua aposta contra os{' '}
              <strong className="text-gray-900">10 últimos sorteios</strong>.
              Se você deseja conferir um concurso específico, basta informar o
              número do concurso no campo opcional antes de conferir.
            </p>
            <p className="text-gray-600">
              Os números acertados são destacados em{' '}
              <strong className="text-gray-900">verde</strong> e os que não
              foram sorteados aparecem em cinza. O sistema também indica
              automaticamente a faixa de premiação correspondente ao número
              de acertos.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Números
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/simulador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Simulador de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/probabilidades"
              className="text-emerald-600 hover:underline font-medium"
            >
              Probabilidades
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
