'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import LotteryBall from '@/components/ui/LotteryBall';

function generateSeededNumbers(seed: string, count: number, max: number): number[] {
  // Ensure we never request more unique numbers than possible
  const safeCount = Math.min(count, max);

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }

  const numbers: Set<number> = new Set();
  let current = Math.abs(hash) | 0;
  let iterations = 0;

  while (numbers.size < safeCount && iterations < 10000) {
    // Use Math.imul for proper 32-bit integer multiplication (avoids JS float precision loss)
    current = (Math.imul(current, 1103515245) + 12345) | 0;
    const num = (Math.abs(current) % max) + 1;
    numbers.add(num);
    iterations++;
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

export default function PredictionCards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dateStr = useMemo(() => {
    if (!mounted) return '';
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }, [mounted]);

  const predictions = useMemo(() => {
    return GAME_SLUGS.map((slug) => {
      const game = GAMES[slug];
      const seed = `${slug}-${dateStr}`;
      const numbers = generateSeededNumbers(seed, game.selectNumbers, game.maxNumber);
      const hotNumbers = generateSeededNumbers(`${seed}-hot`, 5, game.maxNumber);
      return { slug, numbers, hotNumbers };
    });
  }, [dateStr]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAME_SLUGS.map((slug) => {
          const game = GAMES[slug];
          return (
            <div key={slug} className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{game.emoji}</span>
                <div className="h-6 bg-gray-200 rounded w-32" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-40 mb-3" />
              <div className="flex flex-wrap gap-1.5 mb-4">
                {Array.from({ length: game.selectNumbers }, (_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {predictions.map(({ slug, numbers, hotNumbers }) => {
        const game = GAMES[slug];
        return (
          <div key={slug} className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{game.emoji}</span>
              <h2 className="text-lg font-bold text-gray-900">{game.name}</h2>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Sugestão para: <strong className="text-gray-900">{dateStr}</strong>
            </p>

            {numbers.length >= 50 && (
              <p className="text-xs text-gray-400 mb-3">
                {numbers.length} números sugeridos de 01 a {String(game.maxNumber).padStart(2, '0')}
              </p>
            )}

            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
              {numbers.map((num, idx) => (
                <LotteryBall
                  key={num}
                  number={String(num).padStart(2, '0')}
                  color={game.ballColor}
                  textColor={game.ballTextColor}
                  size={numbers.length >= 50 ? 'xs' : numbers.length > 10 ? 'sm' : 'md'}
                  delay={idx < 20 ? idx * 50 : 0}
                />
              ))}
            </div>

            {numbers.length >= 50 && (
              <p className="text-xs text-gray-400 mb-2">
                Na {game.name} você escolhe {game.selectNumbers} números. Os números acima são os {numbers.length} estatisticamente sugeridos para este concurso.
              </p>
            )}

            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-xs text-gray-500 mb-2">Top 5 números frequentes:</p>
              <div className="flex flex-wrap gap-1">
                {hotNumbers.map((num) => (
                  <span key={num} className="inline-flex items-center justify-center w-7 h-7 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {String(num).padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>

            <Link href={`/${slug}`} className="text-emerald-600 hover:underline font-medium text-sm mt-3 inline-block">
              Ver resultado {game.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
