import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
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
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">
            Ou visite uma dessas páginas:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/mega-sena"
              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
            >
              Mega-Sena
            </Link>
            <Link
              href="/lotofacil"
              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
            >
              Lotofácil
            </Link>
            <Link
              href="/quina"
              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
            >
              Quina
            </Link>
            <Link
              href="/previsoes"
              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
            >Previsões</Link>
            <Link
              href="/blog"
              className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
