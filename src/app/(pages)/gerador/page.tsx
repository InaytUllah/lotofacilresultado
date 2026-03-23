import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL } from '@/lib/constants';
import NumberGenerator from '@/components/NumberGenerator';
import SEOContent from '@/components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Gerador de Numeros - Gere Sua Aposta',
  description:
    'Gerador de numeros aleatorios para todas as loterias da Caixa. Gere combinacoes para Mega-Sena, Lotofacil, Quina, Lotomania e outras loterias.',
  alternates: {
    canonical: '/gerador',
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
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gerador de Numeros',
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
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span>Gerador de Numeros</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Gerador de Numeros
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Gere combinacoes aleatorias para todas as loterias da Caixa.
            Escolha o jogo, a quantidade de numeros e deixe a sorte decidir.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <NumberGenerator />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Usar o Gerador de Numeros
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O <strong className="text-gray-900">Gerador de Numeros</strong> e
              uma ferramenta gratuita que cria combinacoes aleatorias para todas
              as loterias da Caixa Economica Federal. Basta selecionar o jogo
              desejado e clicar em &quot;Gerar Numeros&quot; para obter uma
              combinacao valida.
            </p>
            <p className="text-gray-600">
              Para jogos que permitem selecao variavel de numeros, como a{' '}
              <strong className="text-gray-900">Mega-Sena</strong> (6 a 20
              numeros) e a{' '}
              <strong className="text-gray-900">Lotofacil</strong> (15 a 20
              numeros), voce pode escolher quantos numeros deseja gerar. Quanto
              mais numeros voce selecionar, maior sera o custo da aposta, mas
              tambem maiores serao suas chances de acertar.
            </p>
            <p className="text-gray-600">
              O gerador utiliza um algoritmo aleatorio para criar cada
              combinacao, garantindo que os numeros sejam distribuidos de forma
              justa dentro do intervalo valido de cada jogo. As ultimas 5
              combinacoes geradas ficam salvas para sua consulta.
            </p>
            <p className="text-gray-600">
              Lembre-se: os resultados das loterias sao{' '}
              <strong className="text-gray-900">puramente aleatorios</strong> e
              qualquer combinacao tem a mesma chance de ser sorteada. Jogue com
              responsabilidade.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:underline font-medium"
            >
              Ver Previsoes
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/numeros-quentes-frios"
              className="text-emerald-600 hover:underline font-medium"
            >
              Numeros Quentes e Frios
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
