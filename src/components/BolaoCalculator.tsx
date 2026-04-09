'use client';

import { useState } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';

interface CalculationResult {
  totalCost: number;
  costPerPerson: number;
  totalBets: number;
  oddsImprovement: number;
}

/**
 * Iterative combination C(n, k) to avoid overflow.
 * C(n, k) = n! / (k! * (n-k)!)
 */
function combination(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k > n - k) k = n - k; // optimization: C(n, k) === C(n, n-k)
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

/**
 * Parse Brazilian currency string like "R$ 5,00" to number 5.00
 */
function parseMinBet(minBet: string): number {
  return parseFloat(
    minBet.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')
  );
}

/**
 * Format number as Brazilian currency
 */
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

// Games with fixed cost (no variable number selection)
const FIXED_COST_GAMES = ['lotomania', 'timemania', 'super-sete'];

function getMaxNumbers(slug: string): number {
  const game = GAMES[slug];
  switch (slug) {
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
    case 'mais-milionaria':
      return 12;
    case 'lotomania':
      return 50; // fixed
    case 'timemania':
      return 10; // fixed
    case 'super-sete':
      return 7; // fixed
    default:
      return Math.min(game.selectNumbers * 2, game.maxNumber);
  }
}

export default function BolaoCalculator() {
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [numbersPerBet, setNumbersPerBet] = useState<number>(GAMES['mega-sena'].selectNumbers);
  const [totalBets, setTotalBets] = useState<number>(10);
  const [participants, setParticipants] = useState<number>(10);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const game = GAMES[selectedGame];
  const isFixedCost = FIXED_COST_GAMES.includes(selectedGame);
  const minNumbers = game.selectNumbers;
  const maxNumbers = getMaxNumbers(selectedGame);

  const handleGameChange = (slug: string) => {
    setSelectedGame(slug);
    setNumbersPerBet(GAMES[slug].selectNumbers);
    setResult(null);
  };

  const calculate = () => {
    const baseCost = parseMinBet(game.minBet);

    // Cost per single bet: baseCost * C(n, k) / C(k, k) = baseCost * C(n, k)
    // since C(k, k) = 1
    let costPerBet: number;
    if (isFixedCost) {
      costPerBet = baseCost;
    } else {
      const combos = combination(numbersPerBet, game.selectNumbers);
      costPerBet = baseCost * combos;
    }

    const totalCost = costPerBet * totalBets;
    const costPerPerson = totalCost / participants;

    // Odds improvement: each bet with more numbers covers more combinations
    // Single bet covers 1 combination (if min numbers) or C(n,k) combinations
    const combosPerBet = isFixedCost ? 1 : combination(numbersPerBet, game.selectNumbers);
    const oddsImprovement = combosPerBet * totalBets;

    setResult({
      totalCost,
      costPerPerson,
      totalBets,
      oddsImprovement,
    });
  };

  return (
    <div className="space-y-6">
      {/* Calculator Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Configure Seu Bolão
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Game Selection */}
          <div className="sm:col-span-2">
            <label
              htmlFor="game-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Loteria
            </label>
            <select
              id="game-select"
              value={selectedGame}
              onChange={(e) => handleGameChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            >
              {GAME_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {GAMES[slug].emoji} {GAMES[slug].name}
                </option>
              ))}
            </select>
          </div>

          {/* Numbers per bet */}
          <div>
            <label
              htmlFor="numbers-per-bet"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantidade de números por aposta
            </label>
            <input
              id="numbers-per-bet"
              type="number"
              min={minNumbers}
              max={maxNumbers}
              value={numbersPerBet}
              onChange={(e) => setNumbersPerBet(Number(e.target.value))}
              disabled={isFixedCost}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition disabled:bg-gray-100 disabled:text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {isFixedCost
                ? `${game.name}: aposta fixa com ${minNumbers} números`
                : `Mínimo: ${minNumbers} | Máximo: ${maxNumbers}`}
            </p>
          </div>

          {/* Total bets */}
          <div>
            <label
              htmlFor="total-bets"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantidade de apostas no bolão
            </label>
            <input
              id="total-bets"
              type="number"
              min={1}
              max={100}
              value={totalBets}
              onChange={(e) => setTotalBets(Math.min(100, Math.max(1, Number(e.target.value))))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
            <p className="text-xs text-gray-500 mt-1">De 1 a 100 apostas</p>
          </div>

          {/* Participants */}
          <div>
            <label
              htmlFor="participants"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de participantes
            </label>
            <input
              id="participants"
              type="number"
              min={2}
              max={100}
              value={participants}
              onChange={(e) => setParticipants(Math.min(100, Math.max(2, Number(e.target.value))))}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
            <p className="text-xs text-gray-500 mt-1">De 2 a 100 participantes</p>
          </div>

          {/* Game info */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <span className="text-2xl">{game.emoji}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{game.name}</p>
              <p className="text-xs text-gray-500">
                Aposta mínima: {game.minBet} | Probabilidade: {game.odds}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Calcular Bolão
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Custo Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(result.totalCost)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {totalBets} aposta{totalBets > 1 ? 's' : ''} de{' '}
                {formatCurrency(result.totalCost / totalBets)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Custo por Pessoa</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(result.costPerPerson)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Dividido entre {participants} participantes
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Apostas no Bolão</p>
              <p className="text-2xl font-bold text-gray-900">{result.totalBets}</p>
              <p className="text-xs text-gray-400 mt-1">
                {numbersPerBet} números por aposta
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Melhoria nas Chances</p>
              <p className="text-2xl font-bold text-emerald-600">
                {result.oddsImprovement.toLocaleString('pt-BR')}x mais chances
              </p>
              <p className="text-xs text-gray-400 mt-1">Em relação a uma aposta simples</p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhamento</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Loteria</span>
                <span className="font-medium text-gray-900">
                  {game.emoji} {game.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Números por aposta</span>
                <span className="font-medium text-gray-900">{numbersPerBet}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Custo por aposta</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(result.totalCost / totalBets)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Quantidade de apostas</span>
                <span className="font-medium text-gray-900">{totalBets}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Participantes</span>
                <span className="font-medium text-gray-900">{participants}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Custo total do bolão</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(result.totalCost)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">
                  Valor por participante
                </span>
                <span className="font-bold text-emerald-600 text-lg">
                  {formatCurrency(result.costPerPerson)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
