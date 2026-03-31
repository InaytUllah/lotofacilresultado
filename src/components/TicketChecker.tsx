'use client';

import { useState, useCallback, useMemo } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import type { LotteryResult, GameConfig } from '@/lib/types';
import LotteryBall from '@/components/ui/LotteryBall';

interface CheckResult {
  draw: LotteryResult;
  matchedNumbers: string[];
  missedNumbers: string[];
  matchCount: number;
  prizeTier: string | null;
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

export default function TicketChecker() {
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [concursoInput, setConcursoInput] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const game = GAMES[selectedGame];
  const startNumber = selectedGame === 'lotomania' ? 0 : 1;
  const endNumber = selectedGame === 'lotomania' ? 99 : game.maxNumber;
  const totalGridNumbers = endNumber - startNumber + 1;

  const canCheck = selectedNumbers.length === game.selectNumbers;

  const handleGameChange = useCallback((slug: string) => {
    setSelectedGame(slug);
    setSelectedNumbers([]);
    setResults([]);
    setError(null);
    setHasChecked(false);
    setConcursoInput('');
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
    setHasChecked(false);
  }, []);

  const checkTicket = useCallback(async () => {
    if (!canCheck) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      let draws: LotteryResult[] = [];

      if (concursoInput.trim()) {
        // Fetch specific concurso
        const res = await fetch(
          `/api/results/${selectedGame}?concurso=${concursoInput.trim()}`,
        );
        if (!res.ok) throw new Error('Concurso nao encontrado');
        const data = await res.json();
        if (data.result) {
          draws = [data.result];
        }
      } else {
        // Fetch recent results
        const res = await fetch(
          `/api/results/${selectedGame}/recent?count=10`,
        );
        if (!res.ok) throw new Error('Erro ao buscar resultados');
        const data = await res.json();
        draws = data.results || [];
      }

      if (draws.length === 0) {
        setError('Nenhum resultado encontrado.');
        setHasChecked(true);
        setLoading(false);
        return;
      }

      const userNums = selectedNumbers.map((n) =>
        String(n).padStart(2, '0'),
      );

      const checkResults: CheckResult[] = draws.map((draw) => {
        const drawnSet = new Set(draw.dezenas);
        const matched = userNums.filter((n) => drawnSet.has(n));
        const missed = userNums.filter((n) => !drawnSet.has(n));
        const matchCount = matched.length;
        const prizeTier = getPrizeTier(game, matchCount);

        return {
          draw,
          matchedNumbers: matched,
          missedNumbers: missed,
          matchCount,
          prizeTier,
        };
      });

      setResults(checkResults);
      setHasChecked(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao conferir aposta.');
      setHasChecked(true);
    } finally {
      setLoading(false);
    }
  }, [canCheck, concursoInput, selectedGame, selectedNumbers, game]);

  const bestResult = useMemo(() => {
    if (results.length === 0) return null;
    return results.reduce((best, r) =>
      r.matchCount > best.matchCount ? r : best,
    );
  }, [results]);

  // Grid columns based on game
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
                backgroundColor: canCheck ? game.color : '#e5e7eb',
                color: canCheck ? 'white' : '#6b7280',
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

        {/* Concurso Input + Check Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <div className="flex-1 max-w-xs">
            <label
              htmlFor="concurso"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Concurso (opcional)
            </label>
            <input
              id="concurso"
              type="number"
              value={concursoInput}
              onChange={(e) => setConcursoInput(e.target.value)}
              placeholder="Ex: 2750"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Deixe vazio para conferir os 10 últimos sorteios
            </p>
          </div>
          <button
            onClick={checkTicket}
            disabled={!canCheck || loading}
            className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-colors ${
              canCheck && !loading
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
                Conferindo...
              </span>
            ) : (
              'Conferir Resultado'
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {hasChecked && results.length > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          {bestResult && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Resumo da Conferencia
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold" style={{ color: game.color }}>
                    {results.length}
                  </p>
                  <p className="text-sm text-gray-500">
                    {results.length === 1 ? 'Sorteio conferido' : 'Sorteios conferidos'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold" style={{ color: game.color }}>
                    {bestResult.matchCount}
                  </p>
                  <p className="text-sm text-gray-500">Melhor resultado (acertos)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-bold" style={{ color: bestResult.prizeTier ? '#059669' : '#6b7280' }}>
                    {bestResult.prizeTier || 'Nenhum premio'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {bestResult.prizeTier ? 'Parabens!' : 'Continue tentando!'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Individual Draw Results */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Detalhes por Sorteio
            </h2>
            <div className="space-y-4">
              {results.map((r) => (
                <div
                  key={r.draw.concurso}
                  className="border border-gray-100 rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="font-bold text-gray-900">
                        Concurso {r.draw.concurso}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {r.draw.data}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: r.matchCount > 0 ? game.color : '#9ca3af' }}
                      >
                        {r.matchCount} acerto{r.matchCount !== 1 ? 's' : ''}
                      </span>
                      {r.prizeTier && (
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {r.prizeTier}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Drawn numbers with highlights */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Números sorteados:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.draw.dezenas.map((num) => {
                        const isMatched = r.matchedNumbers.includes(num);
                        return (
                          <div
                            key={num}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                              isMatched
                                ? 'bg-emerald-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {num}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* User numbers status */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Sua aposta:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[...r.matchedNumbers, ...r.missedNumbers]
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map((num) => {
                          const isMatched = r.matchedNumbers.includes(num);
                          return (
                            <div
                              key={num}
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                                isMatched
                                  ? 'bg-emerald-500 text-white shadow-md'
                                  : 'bg-gray-200 text-gray-400 line-through'
                              }`}
                            >
                              {num}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {hasChecked && results.length === 0 && !error && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          Nenhum resultado encontrado para conferir.
        </div>
      )}
    </div>
  );
}
