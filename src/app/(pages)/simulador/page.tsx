import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import Simulator from '@/components/Simulator';
import SEOContent from '@/components/ui/SEOContent';

const title = 'Simulador de Apostas - Teste Seus Números nas Loterias';
const description =
  'Simule sua aposta nas loterias da Caixa. Descubra quantas vezes seus números teriam sido sorteados nos últimos concursos da Mega-Sena, Lotofácil e mais.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/simulador',
    languages: {
      'pt-BR': `${SITE_URL}/simulador`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/simulador`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function SimuladorPage() {
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
        name: 'Simulador de Apostas',
        item: `${SITE_URL}/simulador`,
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
            <span>Simulador de Apostas</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Simulador de Apostas
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Descubra como seus números da sorte teriam se saído nos últimos
            50 sorteios. Teste sua estratégia sem gastar nada.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <Simulator />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Funciona o Simulador de Apostas
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O{' '}
              <strong className="text-gray-900">Simulador de Apostas</strong>{' '}
              permite que você teste seus números favoritos contra os{' '}
              <strong className="text-gray-900">últimos 50 sorteios</strong>{' '}
              de qualquer loteria da Caixa Econômica Federal. É a maneira
              perfeita de avaliar sua estratégia de jogo sem apostar dinheiro.
            </p>
            <p className="text-gray-600">
              Após a simulação, você verá um relatório completo com o{' '}
              <strong className="text-gray-900">número total de sorteios analisados</strong>,
              quantas vezes seus números teriam sido premiados, o melhor
              resultado obtido e uma tabela detalhada com o desempenho em cada
              concurso.
            </p>
            <p className="text-gray-600">
              Lembre-se que resultados passados{' '}
              <strong className="text-gray-900">
                não garantem resultados futuros
              </strong>
              . Cada sorteio é independente e todos os números têm a mesma
              probabilidade de serem sorteados. Use o simulador como uma
              ferramenta de análise e diversão.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/conferidor"
              className="text-emerald-600 hover:underline font-medium"
            >
              Conferidor de Apostas
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/gerador"
              className="text-emerald-600 hover:underline font-medium"
            >
              Gerador de Números
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Números Quentes e Frios
            </Link>
          </div>
        </SEOContent>
      </div>
    </>
  );
}
