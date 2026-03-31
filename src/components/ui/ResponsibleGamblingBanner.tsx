'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gambling-banner-dismissed';

export default function ResponsibleGamblingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage unavailable
    }
  };

  if (!visible) return null;

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 flex items-start sm:items-center justify-between gap-3">
      <p className="text-sm text-amber-900 flex-1">
        <span aria-hidden="true">&#x1F51E;</span>{' '}
        Jogue com responsabilidade. As loterias são um entretenimento. Nunca aposte mais do que pode perder.{' '}
        <a
          href="https://jogadoresponsavel.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium text-amber-800 hover:text-amber-700"
        >
          Saiba mais
        </a>
      </p>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 text-amber-700 hover:text-amber-900 transition-colors p-1"
        aria-label="Fechar aviso"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
