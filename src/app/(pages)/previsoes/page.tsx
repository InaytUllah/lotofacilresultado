import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import WarningBox from '@/components/ui/WarningBox';
import SEOContent from '@/components/ui/SEOContent';
import ToolContentSections from '@/components/ui/ToolContentSections';
import { TOOL_CONTENT } from '@/lib/lotteryContent';
import ResponsibleGamblingBanner from '@/components/ui/ResponsibleGamblingBanner';
import PredictionCards from '@/components/ui/PredictionCards';

export const metadata: Metadata = {
  title: 'Análise Estatística das Loterias',
  description:
    'Análise estatística para os próximos sorteios das loterias da Caixa. Tendências e números frequentes da Mega-Sena, Lotofácil, Quina e mais.',
  alternates: {
    canonical: '/previsoes',
    languages: { 'pt-BR': `${SITE_URL}/previsoes` },
  },
  openGraph: {
    title: 'Análise Estatística das Loterias',
    description: 'Análise estatística para os próximos sorteios das loterias da Caixa.',
    url: `${SITE_URL}/previsoes`,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PrevisoesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Análise Estatística', item: `${SITE_URL}/previsoes` },
            ],
          }),
        }}
      />

      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span>Análise Estatística</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Análise Estatística das Loterias
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Sugestões de números para os próximos sorteios das loterias da Caixa Econômica Federal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <ResponsibleGamblingBanner />

        <WarningBox title="Aviso Importante">
          <p>
            Estas previsões são baseadas em análise estatística e não garantem
            resultados. Cada sorteio é independente. Jogue com responsabilidade.
          </p>
        </WarningBox>

        <PredictionCards />

        <SEOContent>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Como Funcionam as Previsões?</h2>
          <p className="text-gray-600 mb-4">
            As previsões são geradas por um algoritmo que cruza estatísticas
            dos resultados anteriores com um gerador de números determinístico.
          </p>
          <p className="text-gray-600 mb-4">
            Loterias são jogos de azar. Cada sorteio é independente dos
            anteriores. As previsões são sugestões baseadas em padrões
            estatísticos, não garantias.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/numeros-quentes-frios" className="text-emerald-600 hover:underline font-medium">Números Quentes e Frios</Link>
            <span className="text-gray-300">|</span>
            <Link href="/gerador" className="text-emerald-600 hover:underline font-medium">Gerador de Números</Link>
            <span className="text-gray-300">|</span>
            <Link href="/probabilidades" className="text-emerald-600 hover:underline font-medium">Probabilidades</Link>
          </div>
        </SEOContent>

        <ToolContentSections toolName="Análise Estatística" content={TOOL_CONTENT.previsoes} />
      </div>
    </>
  );
}
