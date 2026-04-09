'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LotteryResult, GameConfig } from '@/lib/types';
import { GAMES, GAME_SLUGS } from '@/lib/constants';

interface NumberFreq {
  number: number;
  frequency: number;
}

interface SumRange {
  label: string;
  count: number;
}

interface DecadeDistribution {
  label: string;
  count: number;
}

interface StatsVisualizerProps {
  results: LotteryResult[];
  game: GameConfig;
}

// ---------------------------------------------------------------------------
// Computation helpers
// ---------------------------------------------------------------------------

function computeNumberFrequency(results: LotteryResult[], maxNumber: number): NumberFreq[] {
  const freq: Record<number, number> = {};
  for (let i = 1; i <= maxNumber; i++) freq[i] = 0;

  for (const r of results) {
    for (const d of r.dezenas) {
      const n = parseInt(d, 10);
      if (n >= 1 && n <= maxNumber) freq[n]++;
    }
  }

  return Object.entries(freq)
    .map(([num, count]) => ({ number: parseInt(num, 10), frequency: count }))
    .sort((a, b) => b.frequency - a.frequency || a.number - b.number);
}

function computeOddEven(results: LotteryResult[]): { odd: number; even: number } {
  let odd = 0;
  let even = 0;
  for (const r of results) {
    for (const d of r.dezenas) {
      const n = parseInt(d, 10);
      if (n % 2 === 0) even++;
      else odd++;
    }
  }
  return { odd, even };
}

function computeSumRanges(results: LotteryResult[]): SumRange[] {
  const sums = results.map((r) =>
    r.dezenas.reduce((acc, d) => acc + parseInt(d, 10), 0),
  );
  if (sums.length === 0) return [];

  const minSum = Math.min(...sums);
  const maxSum = Math.max(...sums);

  // Build ranges of 20
  const rangeStart = Math.floor(minSum / 20) * 20;
  const rangeEnd = Math.ceil((maxSum + 1) / 20) * 20;

  const ranges: SumRange[] = [];
  for (let s = rangeStart; s < rangeEnd; s += 20) {
    const label = `${s + 1}-${s + 20}`;
    const count = sums.filter((v) => v >= s + 1 && v <= s + 20).length;
    ranges.push({ label, count });
  }

  return ranges.filter((r) => r.count > 0);
}

function computeConsecutive(results: LotteryResult[]): { withConsecutive: number; without: number } {
  let withConsecutive = 0;
  for (const r of results) {
    const nums = r.dezenas.map((d) => parseInt(d, 10)).sort((a, b) => a - b);
    let hasConsec = false;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] - nums[i - 1] === 1) {
        hasConsec = true;
        break;
      }
    }
    if (hasConsec) withConsecutive++;
  }
  return { withConsecutive, without: results.length - withConsecutive };
}

function computeDecades(results: LotteryResult[], maxNumber: number): DecadeDistribution[] {
  const decades: Record<string, number> = {};
  const maxDecade = Math.ceil(maxNumber / 10);
  for (let d = 0; d < maxDecade; d++) {
    const low = d * 10 + 1;
    const high = Math.min((d + 1) * 10, maxNumber);
    decades[`${String(low).padStart(2, '0')}-${String(high).padStart(2, '0')}`] = 0;
  }

  for (const r of results) {
    for (const dez of r.dezenas) {
      const n = parseInt(dez, 10);
      const d = Math.floor((n - 1) / 10);
      const low = d * 10 + 1;
      const high = Math.min((d + 1) * 10, maxNumber);
      const key = `${String(low).padStart(2, '0')}-${String(high).padStart(2, '0')}`;
      if (decades[key] !== undefined) decades[key]++;
    }
  }

  return Object.entries(decades).map(([label, count]) => ({ label, count }));
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function FrequencyChart({ data, color }: { data: NumberFreq[]; color: string }) {
  const maxFreq = data[0]?.frequency || 1;

  return (
    <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
      {data.map(({ number, frequency }) => (
        <div key={number} className="flex items-center gap-2">
          <span className="text-sm font-mono text-gray-600 w-7 text-right">
            {String(number).padStart(2, '0')}
          </span>
          <div className="flex-1 bg-gray-100 rounded h-5 overflow-hidden">
            <div
              className="h-full rounded transition-all"
              style={{
                width: `${Math.max((frequency / maxFreq) * 100, 2)}%`,
                backgroundColor: color,
                opacity: 0.8,
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 w-8 text-right">
            {frequency}
          </span>
        </div>
      ))}
    </div>
  );
}

function OddEvenChart({ odd, even, color }: { odd: number; even: number; color: string }) {
  const total = odd + even || 1;
  const oddPct = ((odd / total) * 100).toFixed(1);
  const evenPct = ((even / total) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg overflow-hidden h-10">
        <div
          className="flex items-center justify-center text-white text-sm font-medium transition-all"
          style={{ width: `${oddPct}%`, backgroundColor: color }}
        >
          {oddPct}%
        </div>
        <div
          className="flex items-center justify-center text-white text-sm font-medium bg-gray-500 transition-all"
          style={{ width: `${evenPct}%` }}
        >
          {evenPct}%
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
          <span className="text-gray-700">
            {'\u00CD'}mpares: <strong>{odd}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gray-500" />
          <span className="text-gray-700">
            Pares: <strong>{even}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function BarChart({ data, color }: { data: { label: string; count: number }[]; color: string }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-2">
      {data.map(({ label, count }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-sm text-gray-600 w-16 text-right shrink-0">{label}</span>
          <div className="flex-1 bg-gray-100 rounded h-6 overflow-hidden">
            <div
              className="h-full rounded flex items-center px-2 transition-all"
              style={{
                width: `${Math.max((count / maxCount) * 100, 4)}%`,
                backgroundColor: color,
                opacity: 0.75,
              }}
            >
              <span className="text-xs text-white font-medium">{count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConsecutiveChart({
  withConsecutive,
  without,
  total,
  color,
}: {
  withConsecutive: number;
  without: number;
  total: number;
  color: string;
}) {
  const pctWith = total > 0 ? ((withConsecutive / total) * 100).toFixed(1) : '0';
  const pctWithout = total > 0 ? ((without / total) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-4">
      <div className="flex rounded-lg overflow-hidden h-10">
        <div
          className="flex items-center justify-center text-white text-sm font-medium transition-all"
          style={{
            width: `${pctWith}%`,
            backgroundColor: color,
            minWidth: withConsecutive > 0 ? '40px' : '0',
          }}
        >
          {pctWith}%
        </div>
        <div
          className="flex items-center justify-center text-white text-sm font-medium bg-gray-400 transition-all"
          style={{
            width: `${pctWithout}%`,
            minWidth: without > 0 ? '40px' : '0',
          }}
        >
          {pctWithout}%
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
          <span className="text-gray-700">
            Com consecutivos: <strong>{withConsecutive}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gray-400" />
          <span className="text-gray-700">
            Sem consecutivos: <strong>{without}</strong>
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Em {total} sorteios analisados, {withConsecutive} tiveram pelo menos um
        par de n{'\u00FA'}meros consecutivos.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function StatsVisualizer({ results, game }: StatsVisualizerProps) {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState(game.slug);

  const handleGameChange = (slug: string) => {
    setSelectedSlug(slug);
    router.push(`/estatisticas?jogo=${slug}`);
  };

  const freqData = computeNumberFrequency(results, game.maxNumber);
  const oddEven = computeOddEven(results);
  const sumRanges = computeSumRanges(results);
  const consecutive = computeConsecutive(results);
  const decades = computeDecades(results, game.maxNumber);

  return (
    <div className="space-y-6">
      {/* Game Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label htmlFor="game-selector" className="text-sm font-medium text-gray-700">
          Selecionar jogo:
        </label>
        <select
          id="game-selector"
          value={selectedSlug}
          onChange={(e) => handleGameChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          {GAME_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {GAMES[slug].emoji} {GAMES[slug].name}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">
          {results.length} sorteios analisados
        </span>
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">
            Nenhum resultado dispon{'\u00ED'}vel para {game.name} no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Number Frequency */}
          <SectionCard title={`Frequ\u00EAncia dos N\u00FAmeros`}>
            <p className="text-sm text-gray-500 mb-3">
              Vezes que cada n{'\u00FA'}mero apareceu nos {'\u00FA'}ltimos {results.length} sorteios,
              ordenado por frequ{'\u00EA'}ncia.
            </p>
            <FrequencyChart data={freqData} color={game.color} />
          </SectionCard>

          {/* Odd/Even */}
          <SectionCard title={`Distribui\u00E7\u00E3o Par/\u00CDmpar`}>
            <p className="text-sm text-gray-500 mb-3">
              Propor{'\u00E7\u00E3'}o de n{'\u00FA'}meros pares e {'\u00ED'}mpares em todos os sorteios analisados.
            </p>
            <OddEvenChart odd={oddEven.odd} even={oddEven.even} color={game.color} />
          </SectionCard>

          {/* Sum Range */}
          <SectionCard title={`Distribui\u00E7\u00E3o por Soma`}>
            <p className="text-sm text-gray-500 mb-3">
              Faixas de soma dos n{'\u00FA'}meros sorteados em cada concurso.
            </p>
            <BarChart data={sumRanges} color={game.color} />
          </SectionCard>

          {/* Consecutive Analysis */}
          <SectionCard title={`N\u00FAmeros Consecutivos`}>
            <p className="text-sm text-gray-500 mb-3">
              Frequ{'\u00EA'}ncia de sorteios que contiveram n{'\u00FA'}meros consecutivos (ex: 12 e 13).
            </p>
            <ConsecutiveChart
              withConsecutive={consecutive.withConsecutive}
              without={consecutive.without}
              total={results.length}
              color={game.color}
            />
          </SectionCard>

          {/* Decade Distribution */}
          <div className="lg:col-span-2">
            <SectionCard title={`Distribui\u00E7\u00E3o por Dezena`}>
              <p className="text-sm text-gray-500 mb-3">
                Quantidade de n{'\u00FA'}meros sorteados por faixa de dezena.
              </p>
              <BarChart data={decades} color={game.color} />
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
}
