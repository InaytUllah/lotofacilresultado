import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE_URL, SITE_NAME } from '@/lib/constants';
import BolaoCalculator from '@/components/BolaoCalculator';
import SEOContent from '@/components/ui/SEOContent';
import QuickAnswer from '@/components/ui/QuickAnswer';

const title = 'Calculadora de Bolão - Monte Seu Bolão';
const description =
  'Calcule o custo e as chances do seu bolão de loteria. Divida apostas entre participantes e veja quanto cada um paga na Mega-Sena, Lotofácil e outras.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/bolao',
    languages: {
      'pt-BR': `${SITE_URL}/bolao`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/bolao`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/api/og?title=Calculadora%20de%20Bol%C3%A3o&color=%23059669', width: 1200, height: 630 }],
  },
};

export default function BolaoPage() {
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
        name: 'Calculadora de Bolão',
        item: `${SITE_URL}/bolao`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é um bolão de loteria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Um bolão é um grupo de pessoas que se juntam para comprar apostas de loteria em conjunto. O custo é dividido entre os participantes e, caso haja prêmio, o valor também é dividido proporcionalmente. É uma forma acessível de aumentar as chances de ganhar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quantas pessoas podem participar de um bolão?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Segundo as regras da Caixa Econômica Federal, um bolão pode ter de 2 a 100 cotas (participantes). O número mínimo de apostas também varia conforme a loteria escolhida.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona o cálculo do custo do bolão?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O custo total do bolão depende da quantidade de apostas e de quantos números são selecionados em cada aposta. Selecionar mais números do que o mínimo aumenta o custo proporcionalmente ao número de combinações possíveis. O valor total é dividido igualmente entre os participantes.',
        },
      },
      {
        '@type': 'Question',
        name: 'O bolão aumenta as chances de ganhar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Cada aposta adicional no bolão representa combinações extras concorrendo ao prêmio. Se o bolão tem 10 apostas, por exemplo, as chances são 10 vezes maiores do que uma aposta individual. Apostar com mais números por jogo também multiplica as combinações cobertas.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Calculadora de Bolão</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Calculadora de Bolão
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Monte seu bolão de loteria, calcule o custo por pessoa e descubra
            quanto suas chances melhoram com apostas em grupo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <QuickAnswer question="Como funciona um bolão de loteria?" icon="👥">
          Um bolão é uma aposta coletiva onde várias pessoas dividem o custo
          e o eventual prêmio. Se 10 pessoas apostam R$ 50 cada (R$ 500 total),
          podem fazer uma aposta 100x maior que uma aposta simples — aumentando
          as chances proporcionalmente. Bolões podem ser organizados em lotéricas
          (com 70% de participação mínima) ou entre amigos.
        </QuickAnswer>

        <BolaoCalculator />

        {/* SEO Content */}
        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Como Funciona o Bolão de Loteria
          </h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-600">
              O bolão é uma das formas mais populares de jogar na loteria no
              Brasil. Ao reunir um grupo de pessoas, você divide o custo das
              apostas e aumenta as chances de acertar os números sorteados.
            </p>
            <p className="text-gray-600">
              Com a <strong className="text-gray-900">Calculadora de Bolão</strong>,
              você configura a loteria, a quantidade de números por aposta, o
              total de apostas e o número de participantes. O sistema calcula
              automaticamente o custo total, o valor que cada pessoa paga e a
              melhoria nas probabilidades de ganhar.
            </p>
            <p className="text-gray-600">
              Para loterias como a Mega-Sena, selecionar mais números do que o
              mínimo (6) aumenta as combinações cobertas em cada aposta. Por
              exemplo, uma aposta com 8 números na Mega-Sena cobre 28
              combinações diferentes, multiplicando suas chances por 28.
            </p>
            <p className="text-gray-600">
              Lembre-se: o bolão divide o custo, mas também divide o prêmio.
              Mesmo assim, as chances proporcionalmente melhores fazem do bolão
              uma opção atrativa para quem quer concorrer a prêmios maiores
              gastando menos individualmente.
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
              href="/conferidor"
              className="text-emerald-600 hover:underline font-medium"
            >
              Conferidor de Apostas
            </Link>
          </div>
        </SEOContent>

        {/* FAQ Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes sobre Bolão
          </h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="cursor-pointer text-gray-900 font-medium hover:text-emerald-600 transition">
                O que é um bolão de loteria?
              </summary>
              <p className="mt-2 text-gray-600 pl-4">
                Um bolão é um grupo de pessoas que se juntam para comprar
                apostas de loteria em conjunto. O custo é dividido entre os
                participantes e, caso haja prêmio, o valor também é dividido
                proporcionalmente. É uma forma acessível de aumentar as chances
                de ganhar.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-900 font-medium hover:text-emerald-600 transition">
                Quantas pessoas podem participar de um bolão?
              </summary>
              <p className="mt-2 text-gray-600 pl-4">
                Segundo as regras da Caixa Econômica Federal, um bolão pode ter
                de 2 a 100 cotas (participantes). O número mínimo de apostas
                também varia conforme a loteria escolhida.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-900 font-medium hover:text-emerald-600 transition">
                Como funciona o cálculo do custo do bolão?
              </summary>
              <p className="mt-2 text-gray-600 pl-4">
                O custo total do bolão depende da quantidade de apostas e de
                quantos números são selecionados em cada aposta. Selecionar
                mais números do que o mínimo aumenta o custo proporcionalmente
                ao número de combinações possíveis. O valor total é dividido
                igualmente entre os participantes.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-900 font-medium hover:text-emerald-600 transition">
                O bolão aumenta as chances de ganhar?
              </summary>
              <p className="mt-2 text-gray-600 pl-4">
                Sim. Cada aposta adicional no bolão representa combinações
                extras concorrendo ao prêmio. Se o bolão tem 10 apostas, por
                exemplo, as chances são 10 vezes maiores do que uma aposta
                individual. Apostar com mais números por jogo também multiplica
                as combinações cobertas.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
