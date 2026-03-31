'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface LiveResultPollerProps {
  /** Draw time in HH:MM format (BRT) */
  drawTime: string;
  /** Draw days (0=Sun, 1=Mon, ..., 6=Sat) */
  drawDays: number[];
  /** Polling interval in ms during draw window (default 10s) */
  pollInterval?: number;
  /** How many minutes before draw time to start polling (default 5) */
  preDrawMinutes?: number;
  /** How many minutes after draw time to keep polling (default 30) */
  postDrawMinutes?: number;
}

export default function LiveResultPoller({
  drawTime,
  drawDays,
  pollInterval = 10000,
  preDrawMinutes = 5,
  postDrawMinutes = 30,
}: LiveResultPollerProps) {
  const router = useRouter();
  const [isPolling, setIsPolling] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const isInDrawWindow = useCallback(() => {
    const now = new Date();
    // Convert to BRT (UTC-3)
    const brt = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const day = brt.getDay();

    if (!drawDays.includes(day)) return false;

    const [drawHour, drawMin] = drawTime.split(':').map(Number);
    const drawMinutes = drawHour * 60 + drawMin;
    const currentMinutes = brt.getHours() * 60 + brt.getMinutes();

    return (
      currentMinutes >= drawMinutes - preDrawMinutes &&
      currentMinutes <= drawMinutes + postDrawMinutes
    );
  }, [drawTime, drawDays, preDrawMinutes, postDrawMinutes]);

  useEffect(() => {
    // Check every 30 seconds if we should be polling
    const checkInterval = setInterval(() => {
      setIsPolling(isInDrawWindow());
    }, 30000);

    // Initial check
    setIsPolling(isInDrawWindow());

    return () => clearInterval(checkInterval);
  }, [isInDrawWindow]);

  useEffect(() => {
    if (!isPolling) return;

    const pollTimer = setInterval(() => {
      router.refresh();
      setLastRefresh(new Date());
    }, pollInterval);

    // Immediate first refresh
    router.refresh();
    setLastRefresh(new Date());

    return () => clearInterval(pollTimer);
  }, [isPolling, pollInterval, router]);

  if (!isPolling) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-pulse">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
      </span>
      AO VIVO — Atualizando resultados...
      {lastRefresh && (
        <span className="text-white/70 text-xs">
          {lastRefresh.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      )}
    </div>
  );
}
