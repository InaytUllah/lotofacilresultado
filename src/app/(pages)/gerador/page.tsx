import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import NumberGenerator from '@/components/NumberGenerator';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Gerador de Números - Gere Sua Aposta',
  description:
    'Gerador de números aleatórios para todas as loterias da Caixa. Gere combinações para Mega-Sena, Lotofácil, Quina, Lotomania e outras loterias.',
  alternates: {
    canonical: '/gerador',
    languages: {
      'pt-BR': `${SITE_URL}/gerador`,
    },
  },
  openGraph: {
    title: 'Gerador de Números - Gere Sua Aposta',
    description: 'Gerador de números aleatórios para todas as loterias da Caixa. Gere combinações para Mega-Sena, Lotofácil, Quina, Lotomania e outras loterias.',
    url: `${SITE_URL}/gerador`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function GeradorPage() {
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
        name: 'Gerador de Números',
        item: `${SITE_URL}/gerador`,
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
            <span>Gerador de Números</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Gerador de Números
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Gere combinações aleatórias para todas as loterias da Caixa.
            Escolha o jogo, a quantidade de números e deixe a sorte decidir.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <NumberGenerator />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Usar o Gerador de Números
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O <strong className="text-gray-900">Gerador de Números</strong> é
              uma ferramenta gratuita que cria combinações aleatórias para todas
              as loterias da Caixa Econômica Federal. Basta selecionar o jogo
              desejado e clicar em &quot;Gerar Números&quot; para obter uma
              combinação válida.
            </p>
            <p className="text-gray-600">
              Para jogos que permitem seleção variável de números, como a{' '}
              <strong className="text-gray-900">Mega-Sena</strong> (6 a 20
              números) e a{' '}
              <strong className="text-gray-900">Lotofácil</strong> (15 a 20
              números), você pode escolher quantos números deseja gerar. Quanto
              mais números você selecionar, maior será o custo da aposta, mas
              também maiores serão suas chances de acertar.
            </p>
            <p className="text-gray-600">
              O gerador utiliza um algoritmo aleatório para criar cada
              combinação, garantindo que os números sejam distribuídos de forma
              justa dentro do intervalo válido de cada jogo. As últimas 5
              combinações geradas ficam salvas para sua consulta.
            </p>
            <p className="text-gray-600">
              Lembre-se: os resultados das loterias são{' '}
              <strong className="text-gray-900">puramente aleatórios</strong> e
              qualquer combinação tem a mesma chance de ser sorteada. Jogue com
              responsabilidade.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Ver Previsões
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Números Quentes e Frios
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
