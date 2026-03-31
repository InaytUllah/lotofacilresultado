'use client';

import { useState, useCallback, useMemo } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import type { LotteryResult, GameConfig } from '@/lib/types';
import LotteryBall from '@/components/ui/LotteryBall';

interface SimulationResult {
  draw: LotteryResult;
  matchedNumbers: string[];
  matchCount: number;
  prizeTier: string | null;
}

interface PrizeSummary {
  tier: string;
  count: number;
}

function getPrizeTier(game: GameConfig, matchCount: number): string | null {
  const slug = game.slug;

  switch (slug) {
    case 'mega-sena':
    case 'dupla-sena':
      if (matchCount === 6) return 'Sena (6 acertos)';
      if (matchCount === 5) return 'Quina (5 acertos)';
      if (matchCount === 4) return 'Quadra (4 acertos)';
      if (slug === 'dupla-sena' && matchCount === 3) return 'Terno (3 acertos)';
      return null;

    case 'lotofacil':
      if (matchCount >= 11 && matchCount <= 15) return `${matchCount} acertos`;
      return null;

    case 'quina':
      if (matchCount === 5) return 'Quina (5 acertos)';
      if (matchCount === 4) return 'Quadra (4 acertos)';
      if (matchCount === 3) return 'Terno (3 acertos)';
      if (matchCount === 2) return 'Duque (2 acertos)';
      return null;

    case 'lotomania':
      if (matchCount === 20) return '20 acertos';
      if (matchCount >= 15 && matchCount <= 19) return `${matchCount} acertos`;
      if (matchCount === 0) return '0 acertos (premiado!)';
      return null;

    case 'mais-milionaria':
      if (matchCount >= 3) return `${matchCount} acertos (sem trevos)`;
      return null;

    case 'dia-de-sorte':
      if (matchCount >= 4 && matchCount <= 7) return `${matchCount} acertos`;
      return null;

    case 'super-sete':
      if (matchCount >= 3 && matchCount <= 7) return `${matchCount} acertos`;
      return null;

    case 'timemania':
      if (matchCount >= 3 && matchCount <= 7) return `${matchCount} acertos`;
      return null;

    default:
      return null;
  }
}

export default function Simulator() {
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSimulated, setHasSimulated] = useState(false);

  const game = GAMES[selectedGame];
  const startNumber = selectedGame === 'lotomania' ? 0 : 1;
  const endNumber = selectedGame === 'lotomania' ? 99 : game.maxNumber;
  const totalGridNumbers = endNumber - startNumber + 1;

  const canSimulate = selectedNumbers.length === game.selectNumbers;

  const handleGameChange = useCallback((slug: string) => {
    setSelectedGame(slug);
    setSelectedNumbers([]);
    setResults([]);
    setError(null);
    setHasSimulated(false);
  }, []);

  const toggleNumber = useCallback(
    (num: number) => {
      setSelectedNumbers((prev) => {
        if (prev.includes(num)) {
          return prev.filter((n) => n !== num);
        }
        if (prev.length >= game.selectNumbers) {
          return prev;
        }
        return [...prev, num].sort((a, b) => a - b);
      });
    },
    [game.selectNumbers],
  );

  const clearSelection = useCallback(() => {
    setSelectedNumbers([]);
    setResults([]);
    setError(null);
    setHasSimulated(false);
  }, []);

  const simulate = useCallback(async () => {
    if (!canSimulate) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(
        `/api/results/${selectedGame}/recent?count=50`,
      );
      if (!res.ok) throw new Error('Erro ao buscar resultados');
      const data = await res.json();
      const draws: LotteryResult[] = data.results || [];

      if (draws.length === 0) {
        setError('Nenhum resultado encontrado para simular.');
        setHasSimulated(true);
        setLoading(false);
        return;
      }

      const userNums = selectedNumbers.map((n) =>
        String(n).padStart(2, '0'),
      );

      const simResults: SimulationResult[] = draws.map((draw) => {
        const drawnSet = new Set(draw.dezenas);
        const matched = userNums.filter((n) => drawnSet.has(n));
        const matchCount = matched.length;
        const prizeTier = getPrizeTier(game, matchCount);

        return {
          draw,
          matchedNumbers: matched,
          matchCount,
          prizeTier,
        };
      });

      setResults(simResults);
      setHasSimulated(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao simular aposta.');
      setHasSimulated(true);
    } finally {
      setLoading(false);
    }
  }, [canSimulate, selectedGame, selectedNumbers, game]);

  const bestResult = useMemo(() => {
    if (results.length === 0) return null;
    return results.reduce((best, r) =>
      r.matchCount > best.matchCount ? r : best,
    );
  }, [results]);

  const prizeSummary = useMemo((): PrizeSummary[] => {
    if (results.length === 0) return [];
    const tierMap = new Map<string, number>();
    for (const r of results) {
      if (r.prizeTier) {
        tierMap.set(r.prizeTier, (tierMap.get(r.prizeTier) || 0) + 1);
      }
    }
    return Array.from(tierMap.entries())
      .map(([tier, count]) => ({ tier, count }))
      .sort((a, b) => b.count - a.count);
  }, [results]);

  const averageMatches = useMemo(() => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, r) => sum + r.matchCount, 0);
    return (total / results.length).toFixed(1);
  }, [results]);

  const gridCols = totalGridNumbers > 50
    ? 'grid-cols-10'
    : totalGridNumbers > 31
      ? 'grid-cols-8 sm:grid-cols-10'
      : 'grid-cols-6 sm:grid-cols-8';

  return (
    <div className="space-y-6">
      {/* Game Selection */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Escolha o Jogo
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {GAME_SLUGS.map((slug) => {
            const g = GAMES[slug];
            const isSelected = slug === selectedGame;
            return (
              <button
                key={slug}
                onClick={() => handleGameChange(slug)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={isSelected ? { backgroundColor: g.color } : undefined}
              >
                <span>{g.emoji}</span>
                <span className="truncate">{g.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Number Selection */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{game.emoji}</span>
              <h2 className="text-xl font-bold text-gray-900">{game.name}</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Selecione {game.selectNumbers} números de{' '}
              {String(startNumber).padStart(2, '0')} a{' '}
              {String(endNumber).padStart(2, '0')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: canSimulate ? game.color : '#e5e7eb',
                color: canSimulate ? 'white' : '#6b7280',
              }}
            >
              {selectedNumbers.length}/{game.selectNumbers}
            </span>
            {selectedNumbers.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Selected Numbers Display */}
        {selectedNumbers.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Seus números:</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedNumbers.map((num) => (
                <LotteryBall
                  key={num}
                  number={String(num).padStart(2, '0')}
                  color={game.ballColor}
                  textColor={game.ballTextColor}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Number Grid */}
        <div className={`grid ${gridCols} gap-1.5 sm:gap-2`}>
          {Array.from({ length: totalGridNumbers }, (_, i) => {
            const num = startNumber + i;
            const isSelected = selectedNumbers.includes(num);
            const isDisabled =
              !isSelected && selectedNumbers.length >= game.selectNumbers;

            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={isDisabled}
                className={`aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isSelected
                    ? 'text-white shadow-lg scale-110'
                    : isDisabled
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:scale-105'
                }`}
                style={isSelected ? { backgroundColor: game.color } : undefined}
                aria-label={`Número ${String(num).padStart(2, '0')}${isSelected ? ' selecionado' : ''}`}
              >
                {String(num).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* Simulate Button */}
        <div className="mt-6">
          <button
            onClick={simulate}
            disabled={!canSimulate || loading}
            className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-colors ${
              canSimulate && !loading
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Simulando...
              </span>
            ) : (
              'Simular nos Últimos 50 Sorteios'
            )}
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Verifica seus números contra os últimos 50 concursos da {game.name}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {hasSimulated && results.length > 0 && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Resultado da Simulação
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: game.color }}>
                  {results.length}
                </p>
                <p className="text-sm text-gray-500">Sorteios analisados</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: game.color }}>
                  {prizeSummary.reduce((sum, p) => sum + p.count, 0)}
                </p>
                <p className="text-sm text-gray-500">Vezes premiado</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: game.color }}>
                  {bestResult?.matchCount || 0}
                </p>
                <p className="text-sm text-gray-500">Máximo de acertos</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold" style={{ color: game.color }}>
                  {averageMatches}
                </p>
                <p className="text-sm text-gray-500">Média de acertos</p>
              </div>
            </div>
          </div>

          {/* Prize Breakdown */}
          {prizeSummary.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Premiações Encontradas
              </h2>
              <div className="space-y-2">
                {prizeSummary.map((p) => (
                  <div
                    key={p.tier}
                    className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-3"
                  >
                    <span className="font-medium text-emerald-800">
                      {p.tier}
                    </span>
                    <span className="font-bold text-emerald-600">
                      {p.count}x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Result Highlight */}
          {bestResult && bestResult.matchCount > 0 && (
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-emerald-800 mb-2">
                Melhor Resultado
              </h2>
              <p className="text-sm text-emerald-600 mb-3">
                Concurso {bestResult.draw.concurso} - {bestResult.draw.data}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-emerald-700">
                  {bestResult.matchCount} acerto{bestResult.matchCount !== 1 ? 's' : ''}
                </span>
                {bestResult.prizeTier && (
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {bestResult.prizeTier}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bestResult.draw.dezenas.map((num) => {
                  const isMatched = bestResult.matchedNumbers.includes(num);
                  return (
                    <div
                      key={num}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        isMatched
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white text-gray-400 border border-gray-200'
                      }`}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timeline Table */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Histórico Detalhado
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      Concurso
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      Data
                    </th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-600">
                      Acertos
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      Números Acertados
                    </th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-600">
                      Prêmio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.draw.concurso}
                      className={`border-b border-gray-50 ${
                        r.prizeTier ? 'bg-emerald-50' : ''
                      }`}
                    >
                      <td className="py-2.5 px-2 font-medium text-gray-900">
                        {r.draw.concurso}
                      </td>
                      <td className="py-2.5 px-2 text-gray-500">
                        {r.draw.data}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold"
                          style={{
                            backgroundColor:
                              r.matchCount > 0 ? game.color : '#d1d5db',
                          }}
                        >
                          {r.matchCount}
                        </span>
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex flex-wrap gap-1">
                          {r.matchedNumbers.length > 0 ? (
                            r.matchedNumbers.map((num) => (
                              <span
                                key={num}
                                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold"
                              >
                                {num}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-2">
                        {r.prizeTier ? (
                          <span className="text-emerald-600 font-semibold text-xs">
                            {r.prizeTier}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* No results */}
      {hasSimulated && results.length === 0 && !error && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          Nenhum resultado encontrado para simular.
        </div>
      )}
    </div>
  );
}
