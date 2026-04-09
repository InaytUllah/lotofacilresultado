import Link from 'next/link';
import { GAMES, GAME_SLUGS } from '@/lib/constants';

const footerColumns = [
  {
    title: 'Resultados',
    links: GAME_SLUGS.map((slug) => ({
      href: `/${slug}`,
      label: GAMES[slug].name,
    })),
  },
  {
    title: 'Ferramentas',
    links: [
      { href: '/conferidor', label: 'Conferidor de Apostas' },
      { href: '/simulador', label: 'Simulador' },
      { href: '/previsoes', label: 'Previsões' },
      { href: '/numeros-quentes-frios', label: 'Números Quentes e Frios' },
      { href: '/gerador', label: 'Gerador de Números' },
      { href: '/historico', label: 'Histórico de Resultados' },
    ],
  },
  {
    title: 'Informações',
    links: [
      { href: '/como-jogar', label: 'Como Jogar' },
      { href: '/probabilidades', label: 'Probabilidades' },
      { href: '/faq', label: 'Perguntas Frequentes' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacidade', label: 'Política de Privacidade' },
      { href: '/termos', label: 'Termos de Uso' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/contato', label: 'Contato' },
      { href: '/jogo-responsavel', label: 'Jogo Responsável' },
      { href: '/aviso-legal', label: 'Aviso Legal' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sobre column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Resultados atualizados das loterias da Caixa Econômica Federal.
            </p>
            <span className="inline-flex bg-red-600 text-white rounded-lg px-3 py-1 font-bold text-lg">
              18+
            </span>
            <p className="text-gray-400 text-sm mt-3">
              Jogue com responsabilidade.{' '}
              <a
                href="https://jogadoresponsavel.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Saiba mais
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
            <p>&copy; {currentYear} lotofacilresultado.com. Todos os direitos reservados.</p>
            <p>
              Dados oficiais:{' '}
              <a
                href="https://loterias.caixa.gov.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Caixa Econômica Federal
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
