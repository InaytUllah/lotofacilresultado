import { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contato - Resultados Mega Sena',
  description:
    'Entre em contato com o Resultados Mega Sena. Envie suas duvidas, sugestoes ou reportes sobre resultados de loterias da Caixa.',
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
};

export default function ContatoPage() {
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
        name: 'Contato',
        item: `${SITE_URL}/contato`,
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
            <li className="text-gray-900 font-medium">Contato</li>
          </ol>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Entre em Contato
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Tem duvidas, sugestoes ou encontrou algum problema? Estamos aqui para ajudar.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Informacoes de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">E-mail</p>
                    <a
                      href="mailto:contato@resultadosmegasena.com.br"
                      className="text-emerald-600 hover:underline font-medium"
                    >
                      contato@resultadosmegasena.com.br
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Redes Sociais</h2>
              <p className="mb-4 text-gray-600">
                Siga-nos nas redes sociais para receber atualizacoes dos resultados:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">𝕏</span>
                  <span>@resultadosmegasena</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">📘</span>
                  <span>facebook.com/resultadosmegasena</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-lg">📸</span>
                  <span>@resultadosmegasena</span>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Tempo de Resposta
              </h2>
              <p className="text-gray-700">
                Respondemos todos os e-mails em ate 48 horas uteis. Para assuntos
                urgentes relacionados a correcao de resultados, indicamos no assunto do
                e-mail a palavra &quot;URGENTE&quot;.
              </p>
            </section>
          </div>

          {/* Contact form (visual only) */}
          <div>
            <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Envie sua Mensagem
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Este formulario e apenas ilustrativo. Para entrar em contato, envie um
                e-mail para{' '}
                <a
                  href="mailto:contato@resultadosmegasena.com.br"
                  className="text-emerald-600 hover:underline font-medium"
                >
                  contato@resultadosmegasena.com.br
                </a>
                .
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    disabled
                    placeholder="Seu nome completo"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-400 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-400 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Assunto
                  </label>
                  <select
                    id="subject"
                    disabled
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-400"
                  >
                    <option>Selecione um assunto</option>
                    <option>Duvida sobre resultados</option>
                    <option>Sugestao</option>
                    <option>Reportar erro</option>
                    <option>Parcerias</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    disabled
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-400 placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  disabled
                  className="w-full rounded-lg bg-gray-300 px-6 py-3 font-semibold text-white cursor-not-allowed"
                >
                  Enviar Mensagem
                </button>
                <p className="text-center text-xs text-gray-400">
                  Formulario indisponivel. Envie um e-mail diretamente.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
