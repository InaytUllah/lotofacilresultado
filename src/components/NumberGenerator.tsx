'use client';

import { useState, useCallback } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import LotteryBall from '@/components/ui/LotteryBall';

interface GeneratedCombination {
  numbers: number[];
  timestamp: number;
}

export default function NumberGenerator() {
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [generated, setGenerated] = useState<number[] | null>(null);
  const [history, setHistory] = useState<GeneratedCombination[]>([]);

  const game = GAMES[selectedGame];

  // Determine min/max selectable numbers for games that allow variable selection
  const minSelect = game.selectNumbers;
  const maxSelect = (() => {
    // Some games allow selecting more numbers for a higher bet
    switch (selectedGame) {
      case 'mega-sena':
        return 20;
      case 'lotofacil':
        return 20;
      case 'quina':
        return 15;
      case 'dupla-sena':
        return 15;
      case 'dia-de-sorte':
        return 15;
      case 'timemania':
        return 10;
      case 'lotomania':
        return 50;
      case 'mais-milionaria':
        return 12;
      case 'super-sete':
        return 7;
      default:
        return game.selectNumbers;
    }
  })();

  const hasVariableSelection = maxSelect > minSelect;
  const effectiveQuantity = quantity ?? minSelect;

  const generateNumbers = useCallback(() => {
    const nums = new Set<number>();
    while (nums.size < effectiveQuantity) {
      const randomNum = Math.floor(Math.random() * game.maxNumber) + 1;
      nums.add(randomNum);
    }
    const sorted = Array.from(nums).sort((a, b) => a - b);
    setGenerated(sorted);

    setHistory((prev) => {
      const newHistory = [
        { numbers: sorted, timestamp: Date.now() },
        ...prev,
      ];
      return newHistory.slice(0, 5);
    });
  }, [effectiveQuantity, game.maxNumber]);

  const handleGameChange = (slug: string) => {
    setSelectedGame(slug);
    setGenerated(null);
    setQuantity(null);
  };

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

      {/* Generator Controls */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{game.emoji}</span>
            <h2 className="text-xl font-bold text-gray-900">{game.name}</h2>
          </div>
          <p className="text-sm text-gray-500">
            {game.selectNumbers} a {game.maxNumber} números de 01 a{' '}
            {String(game.maxNumber).padStart(2, '0')}
          </p>
        </div>

        {/* Variable number selection */}
        {hasVariableSelection && (
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantos números deseja gerar?
            </label>
            <select
              id="quantity"
              value={effectiveQuantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {Array.from(
                { length: maxSelect - minSelect + 1 },
                (_, i) => minSelect + i,
              ).map((n) => (
                <option key={n} value={n}>
                  {n} números
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generateNumbers}
          className="bg-emerald-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-emerald-700 transition-colors"
        >
          {generated ? 'Gerar Novamente' : 'Gerar Números'}
        </button>

        {/* Generated Numbers */}
        {generated && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Números Gerados:
            </h3>
            <div className="flex flex-wrap gap-2">
              {generated.map((num, idx) => (
                <LotteryBall
                  key={num}
                  number={String(num).padStart(2, '0')}
                  color={game.ballColor}
                  textColor={game.ballTextColor}
                  size="lg"
                  delay={idx * 80}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Últimas Combinações Geradas
          </h2>
          <div className="space-y-3">
            {history.map((combo, idx) => (
              <div
                key={combo.timestamp}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  idx === 0 ? 'bg-emerald-50' : 'bg-gray-50'
                }`}
              >
                <span className="text-xs text-gray-400 w-6 flex-shrink-0">
                  #{idx + 1}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {combo.numbers.map((num) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
