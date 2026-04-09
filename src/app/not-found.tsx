import Link from "next/link";
import { GAMES, GAME_SLUGS } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <p className="text-8xl font-bold text-emerald-600 mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Página Inicial
          </Link>
          <Link
            href="/acumulados"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Loterias Acumuladas
          </Link>
        </div>

        {/* Lottery Quick Links */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <p className="text-sm text-gray-500 mb-4">
            Resultados das loterias:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {GAME_SLUGS.map((slug) => {
              const game = GAMES[slug];
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                >
                  <span>{game.emoji}</span>
                  <span>{game.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tool Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">
            Ferramentas populares:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/conferidor', label: 'Conferidor' },
              { href: '/gerador', label: 'Gerador' },
              { href: '/simulador', label: 'Simulador' },
              { href: '/historico', label: 'Histórico' },
              { href: '/quando-e-o-proximo-sorteio', label: 'Próximo Sorteio' },
              { href: '/maiores-premios', label: 'Maiores Prêmios' },
              { href: '/dicas-para-apostar', label: 'Dicas' },
              { href: '/glossario', label: 'Glossário' },
              { href: '/como-resgatar-premio', label: 'Resgatar Prêmio' },
              { href: '/blog', label: 'Blog' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
