'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'notification-pref';
const LAST_CHECK_KEY = 'notification-last-concurso';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function NotificationBell() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasNotification = 'Notification' in window;
    setSupported(hasNotification);
    if (hasNotification) {
      const pref = localStorage.getItem(STORAGE_KEY);
      setEnabled(pref === 'true' && Notification.permission === 'granted');
    }
  }, []);

  const checkForNewResults = useCallback(async () => {
    try {
      const res = await fetch('/api/results/mega-sena');
      if (!res.ok) return;
      const data = await res.json();
      const concurso = data.result?.concurso;
      if (!concurso) return;

      const lastSeen = localStorage.getItem(LAST_CHECK_KEY);
      if (lastSeen && parseInt(lastSeen, 10) >= concurso) return;

      localStorage.setItem(LAST_CHECK_KEY, String(concurso));

      if (lastSeen) {
        const numbers = data.result.dezenas?.join(', ') || '';
        new Notification('Novo resultado da Mega-Sena!', {
          body: `Concurso ${concurso}: ${numbers}`,
          icon: '/icon-192.png',
          tag: `result-${concurso}`,
        });
      }
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    checkForNewResults();
    const interval = setInterval(checkForNewResults, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [enabled, checkForNewResults]);

  const toggle = async () => {
    if (!supported) return;

    if (!enabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setEnabled(true);
        localStorage.setItem(STORAGE_KEY, 'true');
        new Notification('Notifica\u00e7\u00f5es ativadas!', {
          body: 'Voc\u00ea receber\u00e1 alertas quando novos resultados forem publicados.',
          icon: '/icon-192.png',
        });
      }
    } else {
      setEnabled(false);
      localStorage.setItem(STORAGE_KEY, 'false');
    }
  };

  if (!mounted || !supported) return null;

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Desativar notifica\u00e7\u00f5es' : 'Ativar notifica\u00e7\u00f5es'}
      title={enabled ? 'Notifica\u00e7\u00f5es ativadas' : 'Ativar notifica\u00e7\u00f5es de resultados'}
      className={`fixed bottom-4 left-16 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors ${
        enabled
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
      }`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {enabled && (
        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
      )}
    </button>
  );
}
