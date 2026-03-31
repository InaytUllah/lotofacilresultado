'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TOAST_TITLE = 'Jogo Responsável';
const TOAST_TEXT = 'Loterias são jogos de azar. Jogue com moderação e nunca aposte mais do que pode perder.';

export default function ResponsibleGamingToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('rg-toast-shown')) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem('rg-toast-shown', '1');
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const dismissTimer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(dismissTimer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto max-w-sm z-50">
      <div className="bg-white shadow-xl rounded-xl p-4 relative">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="font-bold text-gray-800 mb-1">
          🎰 {TOAST_TITLE}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          {TOAST_TEXT}
        </p>
        <Link
          href="/jogo-responsavel"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Saiba mais &rarr;
        </Link>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-1 bg-emerald-500 rounded-full animate-shrink" />
        </div>
      </div>
    </div>
  );
}
