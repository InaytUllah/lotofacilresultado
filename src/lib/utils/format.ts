import { GAMES, MONTHS_PT, DAYS_PT } from '../constants';

// ---------------------------------------------------------------------------
// Currency
// ---------------------------------------------------------------------------

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Parse a DD/MM/YYYY string into a Date object.
 */
export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format DD/MM/YYYY to a short formatted date string (e.g. "15/01/2025").
 * Returns the original string if already in the right format.
 */
export function formatDate(dateStr: string): string {
  try {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format DD/MM/YYYY to long form: "15 de Janeiro de 2025".
 */
export function formatDateLong(dateStr: string): string {
  try {
    const date = parseDate(dateStr);
    const day = date.getDate();
    const month = MONTHS_PT[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// Draw date calculation
// ---------------------------------------------------------------------------

/**
 * Get the current date/time in BRT (UTC-3).
 */
function nowBRT(): Date {
  const now = new Date();
  // Offset to BRT (UTC-3): getTimezoneOffset gives minutes from UTC,
  // so we shift to UTC then subtract 3 hours.
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utc - 3 * 60 * 60_000);
}

/**
 * Calculate the next draw date/time considering BRT timezone.
 * drawDays: array of day-of-week numbers (0=Sun .. 6=Sat).
 * drawTime: "HH:MM" string in BRT.
 */
export function getNextDrawDate(
  drawDays: number[],
  drawTime: string,
): Date {
  const brt = nowBRT();
  const [drawHour, drawMinute] = drawTime.split(':').map(Number);

  // Try today and the next 7 days
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(brt);
    candidate.setDate(candidate.getDate() + offset);

    if (!drawDays.includes(candidate.getDay())) continue;

    candidate.setHours(drawHour, drawMinute, 0, 0);

    // If today but draw time already passed, skip
    if (offset === 0 && candidate <= brt) continue;

    return candidate;
  }

  // Fallback: should never reach here with valid drawDays
  return brt;
}

/**
 * Returns the date that predictions should target for a given game.
 * This is the next draw day. If today is a draw day and results
 * have not yet been drawn (before draw time), it targets today;
 * otherwise it targets the following draw day.
 */
export function getPredictionDate(gameSlug: string): Date {
  const config = GAMES[gameSlug];
  if (!config) return new Date();
  return getNextDrawDate(config.drawDays, config.drawTime);
}

// ---------------------------------------------------------------------------
// Deterministic random
// ---------------------------------------------------------------------------

/**
 * Generate a deterministic pseudo-random number between 0 and 1 from a seed string.
 * Uses a simple hash-based approach (not cryptographic).
 */
export function generateSeededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // Map to 0..1 range
  return (((hash >>> 0) % 10000) / 10000);
}

// ---------------------------------------------------------------------------
// Slug / text
// ---------------------------------------------------------------------------

/**
 * Create a URL-friendly slug from arbitrary text.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Day names
// ---------------------------------------------------------------------------

/**
 * Return draw day names in Portuguese for an array of day-of-week numbers.
 */
export function getDrawDayNames(drawDays: number[]): string[] {
  return drawDays.map((d) => DAYS_PT[d]);
}
