'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const STORAGE_KEY = 'pwa-install-dismissed';
const DISMISS_DAYS = 14;

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden until we check

  useEffect(() => {
    // Check if previously dismissed
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ts = parseInt(stored, 10);
        if (Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000) {
          return; // still in cooldown
        }
      }
    } catch {}

    // Detect iOS Safari (no beforeinstallprompt support)
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (iOS && !standalone) {
      setIsIOS(true);
      setDismissed(false);
      return;
    }

    // Android/desktop: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      setInstallEvent(null);
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setDismissed(true);
    setShowIOSInstructions(false);
  };

  if (dismissed) return null;

  // iOS instructions modal
  if (isIOS && showIOSInstructions) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-install-title"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
        onClick={handleDismiss}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="ios-install-title" className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Instalar no iPhone/iPad
          </h2>
          <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600">1.</span>
              <span>Toque no botão <strong>Compartilhar</strong> (□↑) na barra inferior do Safari.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600">2.</span>
              <span>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-emerald-600">3.</span>
              <span>Toque em <strong>"Adicionar"</strong> no canto superior direito.</span>
            </li>
          </ol>
          <button
            type="button"
            onClick={handleDismiss}
            className="mt-5 w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    );
  }

  // Banner (Android + iOS prompt)
  return (
    <div
      role="region"
      aria-label="Instalar aplicativo"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100%-2rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 flex items-center gap-3 animate-fadeInDown"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center flex-shrink-0 font-bold">
        LR
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 dark:text-white">
          Instalar no celular
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Acesso rápido + notificações de resultados
        </p>
      </div>
      <button
        type="button"
        onClick={isIOS ? () => setShowIOSInstructions(true) : handleInstall}
        className="bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex-shrink-0"
      >
        Instalar
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dispensar"
        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
