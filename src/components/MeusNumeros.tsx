'use client';

import { useState, useEffect, useCallback } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import type { LotteryResult } from '@/lib/types';
import LotteryBall from '@/components/ui/LotteryBall';

interface SavedBet {
  id: string;
  gameSlug: string;
  numbers: string[];
  createdAt: string;
}

interface CheckResultData {
  betId: string;
  concurso: number;
  matchCount: number;
  matchedNumbers: string[];
  prizeTier: string | null;
}

const STORAGE_KEY = 'meus-numeros';
const MAX_BETS = 20;

function getPrizeTier(gameSlug: string, matchCount: number): string | null {
  switch (gameSlug) {
    case 'mega-sena':
      if (matchCount >= 4) return `${matchCount} acertos`;
      return null;
    case 'dupla-sena':
      if (matchCount >= 3) return `${matchCount} acertos`;
      return null;
    case 'lotofacil':
      if (matchCount >= 11) return `${matchCount} acertos`;
      return null;
    case 'quina':
      if (matchCount >= 2) return `${matchCount} acertos`;
      return null;
    case 'lotomania':
      if (matchCount >= 15 || matchCount === 0) return `${matchCount} acertos`;
      return null;
    case 'mais-milionaria':
      if (matchCount >= 3) return `${matchCount} acertos`;
      return null;
    case 'dia-de-sorte':
      if (matchCount >= 4) return `${matchCount} acertos`;
      return null;
    case 'super-sete':
      if (matchCount >= 3) return `${matchCount} acertos`;
      return null;
    case 'timemania':
      if (matchCount >= 3) return `${matchCount} acertos`;
      return null;
    default:
      return null;
  }
}

function getMinPrizeMatch(gameSlug: string): number {
  switch (gameSlug) {
    case 'mega-sena': return 4;
    case 'dupla-sena': return 3;
    case 'lotofacil': return 11;
    case 'quina': return 2;
    case 'lotomania': return 15;
    case 'mais-milionaria': return 3;
    case 'dia-de-sorte': return 4;
    case 'super-sete': return 3;
    case 'timemania': return 3;
    default: return 999;
  }
}

function loadBets(): SavedBet[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveBets(bets: SavedBet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bets));
}

export default function MeusNumeros() {
  const [bets, setBets] = useState<SavedBet[]>([]);
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [checkResults, setCheckResults] = useState<Record<string, CheckResultData>>({});
  const [autoCheckResults, setAutoCheckResults] = useState<CheckResultData[]>([]);
  const [checkingId, setCheckingId] = useState<string | null>(null);
  const [autoChecking, setAutoChecking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const game = GAMES[selectedGame];
  const startNumber = selectedGame === 'lotomania' ? 0 : 1;
  const endNumber = selectedGame === 'lotomania' ? 99 : game.maxNumber;

  useEffect(() => {
    setBets(loadBets());
    setMounted(true);
  }, []);

  const autoCheckAll = useCallback(async (currentBets: SavedBet[]) => {
    if (currentBets.length === 0) return;
    setAutoChecking(true);
    const winners: CheckResultData[] = [];
    const resultsCache: Record<string, LotteryResult> = {};

    for (const bet of currentBets) {
      try {
        if (!resultsCache[bet.gameSlug]) {
          const res = await fetch(`/api/results/${bet.gameSlug}`);
          if (!res.ok) continue;
          const data = await res.json();
          resultsCache[bet.gameSlug] = data.result;
        }
        const result = resultsCache[bet.gameSlug];
        if (!result) continue;

        const matched = bet.numbers.filter((n) => result.dezenas.includes(n));
        const prizeTier = getPrizeTier(bet.gameSlug, matched.length);

        if (prizeTier) {
          winners.push({
            betId: bet.id,
            concurso: result.concurso,
            matchCount: matched.length,
            matchedNumbers: matched,
            prizeTier,
          });
        }
      } catch {
        // skip failed checks
      }
    }

    setAutoCheckResults(winners);
    setAutoChecking(false);
  }, []);

  useEffect(() => {
    if (mounted && bets.length > 0) {
      autoCheckAll(bets);
    }
  }, [mounted, bets.length, autoCheckAll]);

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) return prev.filter((n) => n !== num);
      if (prev.length >= game.selectNumbers) return prev;
      return [...prev, num];
    });
  };

  const handleGameChange = (slug: string) => {
    setSelectedGame(slug);
    setSelectedNumbers([]);
  };

  const handleSave = () => {
    if (selectedNumbers.length !== game.selectNumbers) return;
    if (bets.length >= MAX_BETS) return;

    const sorted = [...selectedNumbers].sort((a, b) => a - b);
    const formatted = sorted.map((n) => String(n).padStart(2, '0'));

    const newBet: SavedBet = {
      id: crypto.randomUUID(),
      gameSlug: selectedGame,
      numbers: formatted,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBet, ...bets];
    setBets(updated);
    saveBets(updated);
    setSelectedNumbers([]);
  };

  const handleDelete = (id: string) => {
    const updated = bets.filter((b) => b.id !== id);
    setBets(updated);
    saveBets(updated);
    setCheckResults((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setAutoCheckResults((prev) => prev.filter((r) => r.betId !== id));
  };

  const handleCheck = async (bet: SavedBet) => {
    setCheckingId(bet.id);
    try {
      const res = await fetch(`/api/results/${bet.gameSlug}`);
      if (!res.ok) throw new Error('Falha ao buscar resultado');
      const data = await res.json();
      const result: LotteryResult = data.result;

      const matched = bet.numbers.filter((n) => result.dezenas.includes(n));
      const prizeTier = getPrizeTier(bet.gameSlug, matched.length);

      setCheckResults((prev) => ({
        ...prev,
        [bet.id]: {
          betId: bet.id,
          concurso: result.concurso,
          matchCount: matched.length,
          matchedNumbers: matched,
          prizeTier,
        },
      }));
    } catch {
      // silently fail
    }
    setCheckingId(null);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getMatchColor = (betGameSlug: string, matchCount: number): string => {
    const minPrize = getMinPrizeMatch(betGameSlug);
    if (matchCount >= minPrize) return 'text-green-600 bg-green-50';
    if (matchCount >= minPrize - 1) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Auto-check Banner */}
      {autoChecking && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-emerald-700 font-medium">Verificando suas apostas...</p>
        </div>
      )}

      {autoCheckResults.length > 0 && (
        <div className="rounded-xl border border-green-300 bg-green-50 p-4 sm:p-6 space-y-2">
          {autoCheckResults.map((r) => {
            const betGame = GAMES[bets.find((b) => b.id === r.betId)?.gameSlug || ''];
            if (!betGame) return null;
            return (
              <p key={r.betId} className="text-green-800 font-semibold">
                Parabéns! Sua aposta na {betGame.name} acertou {r.matchCount} números
                no concurso {r.concurso}!
              </p>
            );
          })}
        </div>
      )}

      {/* Add Bet Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Salvar Nova Aposta
        </h2>

        {bets.length >= MAX_BETS && (
          <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-700">
            Limite de {MAX_BETS} apostas atingido. Exclua uma aposta para salvar outra.
          </div>
        )}

        {/* Game Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Escolha o Jogo
          </label>
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
                  aria-label={`Selecionar ${g.name}`}
                  aria-pressed={isSelected}
                >
                  <span aria-hidden="true">{g.emoji}</span>
                  <span className="truncate">{g.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Number Grid */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Selecione {game.selectNumbers} números
            </span>
            <span className="text-sm text-gray-500">
              {selectedNumbers.length}/{game.selectNumbers}
            </span>
          </div>
          <div
            className={`grid gap-1.5 ${
              game.maxNumber <= 31
                ? 'grid-cols-7 sm:grid-cols-10'
                : game.maxNumber <= 50
                  ? 'grid-cols-8 sm:grid-cols-10'
                  : 'grid-cols-8 sm:grid-cols-10 lg:grid-cols-15'
            }`}
          >
            {Array.from({ length: endNumber - startNumber + 1 }, (_, i) => startNumber + i).map(
              (num) => {
                const isSelected = selectedNumbers.includes(num);
                const isFull = selectedNumbers.length >= game.selectNumbers && !isSelected;
                return (
                  <button
                    key={num}
                    onClick={() => toggleNumber(num)}
                    disabled={isFull}
                    className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                      isSelected
                        ? 'text-white shadow-md scale-105'
                        : isFull
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                    style={isSelected ? { backgroundColor: game.color } : undefined}
                    aria-label={`Número ${String(num).padStart(2, '0')}`}
                    aria-pressed={isSelected}
                  >
                    {String(num).padStart(2, '0')}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={selectedNumbers.length !== game.selectNumbers || bets.length >= MAX_BETS}
            className="bg-emerald-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Salvar Aposta
          </button>
          {selectedNumbers.length > 0 && (
            <button
              onClick={() => setSelectedNumbers([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Saved Bets */}
      {bets.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Apostas Salvas ({bets.length}/{MAX_BETS})
          </h2>
          <div className="space-y-4">
            {bets.map((bet) => {
              const betGame = GAMES[bet.gameSlug];
              if (!betGame) return null;
              const checkResult = checkResults[bet.id];

              return (
                <div
                  key={bet.id}
                  className="rounded-xl border border-gray-200 p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" aria-hidden="true">
                        {betGame.emoji}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {betGame.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDate(bet.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCheck(bet)}
                        disabled={checkingId === bet.id}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                      >
                        {checkingId === bet.id ? 'Verificando...' : 'Conferir'}
                      </button>
                      <button
                        onClick={() => handleDelete(bet.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                        aria-label="Excluir aposta"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {bet.numbers.map((num, idx) => {
                      const isMatched = checkResult?.matchedNumbers.includes(num);
                      return (
                        <LotteryBall
                          key={idx}
                          number={num}
                          color={isMatched ? 'bg-green-500' : betGame.ballColor}
                          textColor={betGame.ballTextColor}
                          size="sm"
                        />
                      );
                    })}
                  </div>

                  {checkResult && (
                    <div
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${getMatchColor(
                        bet.gameSlug,
                        checkResult.matchCount,
                      )}`}
                    >
                      <span>
                        Concurso {checkResult.concurso}: {checkResult.matchCount} acerto
                        {checkResult.matchCount !== 1 ? 's' : ''}
                      </span>
                      {checkResult.prizeTier && (
                        <span className="font-bold">
                          — {checkResult.prizeTier}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {bets.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500 text-lg mb-2">
            Nenhuma aposta salva ainda
          </p>
          <p className="text-gray-400 text-sm">
            Selecione um jogo e seus números favoritos para começar.
          </p>
        </div>
      )}
    </div>
  );
}
