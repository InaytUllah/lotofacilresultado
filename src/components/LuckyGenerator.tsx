'use client';

import { useState } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import LotteryBall from '@/components/ui/LotteryBall';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

function generateNumbers(
  name: string,
  birthday: string,
  gameSlug: string,
  salt: number,
): number[] {
  const game = GAMES[gameSlug];
  const seed = hashString(`${name.toLowerCase().trim()}|${birthday}|${gameSlug}|${salt}`);
  const rng = seededRandom(seed);

  const startNum = gameSlug === 'lotomania' ? 0 : 1;
  const endNum = gameSlug === 'lotomania' ? 99 : game.maxNumber;
  const count = game.selectNumbers;

  const pool: number[] = [];
  for (let i = startNum; i <= endNum; i++) pool.push(i);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count).sort((a, b) => a - b);
}

export default function LuckyGenerator() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [salt, setSalt] = useState(0);
  const [numbers, setNumbers] = useState<number[] | null>(null);
  const [copied, setCopied] = useState(false);

  const game = GAMES[selectedGame];

  const handleGenerate = () => {
    if (!name.trim() || !birthday) return;
    const result = generateNumbers(name, birthday, selectedGame, salt);
    setNumbers(result);
    setCopied(false);
  };

  const handleRegenerate = () => {
    setSalt((s) => s + 1);
    if (name.trim() && birthday) {
      const result = generateNumbers(name, birthday, selectedGame, salt + 1);
      setNumbers(result);
      setCopied(false);
    }
  };

  const handleCopy = () => {
    if (!numbers) return;
    const text = numbers.map((n) => String(n).padStart(2, '0')).join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Gere Seus N{'\u00fa'}meros da Sorte
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lucky-name" className="block text-sm font-medium text-gray-700 mb-1">
              Seu Nome
            </label>
            <input
              id="lucky-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>

          <div>
            <label htmlFor="lucky-birthday" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              id="lucky-birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="lucky-game" className="block text-sm font-medium text-gray-700 mb-1">
              Loteria
            </label>
            <select
              id="lucky-game"
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e.target.value);
                setNumbers(null);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            >
              {GAME_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {GAMES[slug].emoji} {GAMES[slug].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!name.trim() || !birthday}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Gerar N{'\u00fa'}meros da Sorte
        </button>
      </div>

      {numbers && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-gray-900">
            Seus N{'\u00fa'}meros da Sorte {'\u2014'} {game.name}
          </h3>

          <div className="flex flex-wrap gap-2 justify-center py-4">
            {numbers.map((num, idx) => (
              <LotteryBall
                key={idx}
                number={String(num).padStart(2, '0')}
                color={game.ballColor}
                textColor={game.ballTextColor}
                size="md"
                delay={idx * 80}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleRegenerate}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Gerar Novamente
            </button>
            <button
              onClick={handleCopy}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {copied ? 'Copiado!' : 'Copiar N\u00fameros'}
            </button>
          </div>

          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
            Os n{'\u00fa'}meros s{'\u00e3'}o gerados para divers{'\u00e3'}o. N{'\u00e3'}o h{'\u00e1'} garantia de acerto.
            Cada sorteio {'\u00e9'} independente e aleat{'\u00f3'}rio.
          </div>
        </div>
      )}
    </div>
  );
}
