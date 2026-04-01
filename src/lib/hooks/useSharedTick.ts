'use client';

import { useSyncExternalStore } from 'react';

// Single global tick that all countdown timers share
let tick = 0;
let listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function startTicking() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    tick++;
    listeners.forEach((l) => l());
  }, 1000);
}

function stopTicking() {
  if (intervalId === null) return;
  clearInterval(intervalId);
  intervalId = null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) startTicking();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stopTicking();
  };
}

function getSnapshot() {
  return tick;
}

function getServerSnapshot() {
  return 0;
}

/** Returns a tick counter that increments every second. All consumers share one setInterval. */
export function useSharedTick() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
