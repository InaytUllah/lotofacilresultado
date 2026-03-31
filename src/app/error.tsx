"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-bold text-emerald-600 mb-4">!</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Algo deu errado
        </h1>
        <p className="text-gray-600 mb-8">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
