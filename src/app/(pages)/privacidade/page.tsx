import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Politica de Privacidade',
  description:
    'Politica de privacidade do site Resultados Mega Sena. Saiba como coletamos, usamos e protegemos seus dados pessoais.',
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
  },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Politica de Privacidade
      </h1>
      <p className="mb-10 text-sm text-gray-500">
        Ultima atualizacao: 1 de janeiro de 2025
      </p>

      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Introducao</h2>
          <p className="text-gray-700">
            O <strong className="text-gray-900">{SITE_NAME}</strong> (
            {SITE_URL}) valoriza a privacidade de seus visitantes. Esta Politica de
            Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas
            informacoes quando voce acessa nosso site. Ao utilizar nossos servicos, voce
            concorda com as praticas descritas neste documento.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Coleta de Dados</h2>
          <div className="space-y-4 text-gray-700">
            <p>Nosso site pode coletar os seguintes tipos de informacoes:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <strong className="text-gray-900">Dados de navegacao:</strong> endereco
                IP, tipo de navegador, sistema operacional, paginas visitadas, tempo de
                permanencia e URLs de referencia.
              </li>
              <li>
                <strong className="text-gray-900">Dados de cookies:</strong> utilizamos
                cookies e tecnologias semelhantes para melhorar a experiencia do usuario,
                lembrar preferencias e gerar estatisticas de acesso.
              </li>
              <li>
                <strong className="text-gray-900">Dados fornecidos voluntariamente:</strong>{' '}
                informacoes que voce fornece ao entrar em contato conosco, como nome e
                endereco de e-mail.
              </li>
            </ul>
            <p>
              Nao coletamos dados sensiveis como CPF, dados bancarios ou informacoes de
              pagamento.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Uso de Cookies</h2>
          <div className="space-y-4 text-gray-700">
            <p>Utilizamos cookies para:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Analisar o trafego e o comportamento dos visitantes no site.</li>
              <li>Personalizar a experiencia de navegacao.</li>
              <li>Exibir anuncios relevantes por meio de parceiros publicitarios.</li>
              <li>Lembrar suas preferencias e configuracoes.</li>
            </ul>
            <p>
              Voce pode desativar os cookies nas configuracoes do seu navegador, mas isso
              pode afetar a funcionalidade de algumas areas do site.
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
              para coletar informacoes sobre como os visitantes usam nosso site. Esses
              dados nos ajudam a entender quais paginas sao mais acessadas e como melhorar
              nosso conteudo. O Google Analytics utiliza cookies para coletar informacoes
              de forma anonima, sem identificar visitantes individuais.
            </p>
            <p>
              Tambem utilizamos o <strong className="text-gray-900">Google AdSense</strong>{' '}
              para exibir anuncios. O Google AdSense pode utilizar cookies e tecnologias
              semelhantes para exibir anuncios baseados em visitas anteriores ao nosso site
              e a outros sites. Voce pode personalizar as configuracoes de anuncios
              visitando as{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium"
              >
                Configuracoes de Anuncios do Google
              </a>
              .
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Direitos do Usuario
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Em conformidade com a Lei Geral de Protecao de Dados (LGPD), voce tem os
              seguintes direitos:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Confirmar a existencia de tratamento de dados pessoais.</li>
              <li>Acessar os dados pessoais que possuimos sobre voce.</li>
              <li>
                Solicitar a correcao de dados incompletos, inexatos ou desatualizados.
              </li>
              <li>
                Solicitar a anonimizacao, bloqueio ou eliminacao de dados desnecessarios.
              </li>
              <li>
                Solicitar a portabilidade dos dados a outro fornecedor de servicos.
              </li>
              <li>
                Solicitar a eliminacao de dados pessoais tratados com seu consentimento.
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
            Nao vendemos, alugamos ou compartilhamos suas informacoes pessoais com
            terceiros, exceto quando necessario para o funcionamento do site (como
            servicos de analytics e publicidade mencionados acima) ou quando exigido por
            lei.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Seguranca dos Dados
          </h2>
          <p className="text-gray-700">
            Adotamos medidas de seguranca tecnicas e administrativas para proteger seus
            dados pessoais contra acessos nao autorizados, destruicao, perda, alteracao ou
            qualquer forma de tratamento inadequado. Nosso site utiliza protocolo HTTPS
            para garantir a seguranca na transmissao de dados.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Contato</h2>
          <p className="text-gray-700">
            Se voce tiver duvidas sobre esta Politica de Privacidade ou desejar exercer
            seus direitos, entre em contato conosco pelo e-mail:{' '}
            <a
              href="mailto:contato@resultadosmegasena.com.br"
              className="text-emerald-600 hover:underline font-medium"
            >
              contato@resultadosmegasena.com.br
            </a>
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Alteracoes nesta Politica
          </h2>
          <p className="text-gray-700">
            Reservamo-nos o direito de modificar esta Politica de Privacidade a qualquer
            momento. Quaisquer alteracoes serao publicadas nesta pagina com a data de
            atualizacao revisada. Recomendamos que voce revise esta politica
            periodicamente.
          </p>
        </section>
      </div>
    </div>
  );
}
