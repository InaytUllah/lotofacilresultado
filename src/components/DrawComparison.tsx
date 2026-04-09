'use client';

import { useState } from 'react';
import { GAMES, GAME_SLUGS } from '@/lib/constants';
import LotteryBall from '@/components/ui/LotteryBall';

interface DrawResult {
  concurso: number;
  data: string;
  dezenas: string[];
}

export default function DrawComparison() {
  const [selectedGame, setSelectedGame] = useState('mega-sena');
  const [concursoA, setConcursoA] = useState('');
  const [concursoB, setConcursoB] = useState('');
  const [resultA, setResultA] = useState<DrawResult | null>(null);
  const [resultB, setResultB] = useState<DrawResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const game = GAMES[selectedGame];

  const fetchDraw = async (concurso: number): Promise<DrawResult | null> => {
    try {
      const res = await fetch(
        `https://loteriascaixa-api.herokuapp.com/api/${game.apiName}/${concurso}`,
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || (!data.numero && !data.concurso)) return null;
      return {
        concurso: data.numero ?? data.concurso,
        data: data.dataApuracao ?? data.data ?? '',
        dezenas: (data.listaDezenas ?? data.dezenas ?? []).map((d: string) =>
          String(d).padStart(2, '0'),
        ),
      };
    } catch {
      return null;
    }
  };

  const handleCompare = async () => {
    const numA = parseInt(concursoA, 10);
    const numB = parseInt(concursoB, 10);

    if (!numA || !numB) {
      setError('Informe os dois n\u00fameros de concurso.');
      return;
    }
    if (numA === numB) {
      setError('Os concursos devem ser diferentes.');
      return;
    }

    setError('');
    setLoading(true);
    setResultA(null);
    setResultB(null);

    const [a, b] = await Promise.all([fetchDraw(numA), fetchDraw(numB)]);

    if (!a || !b) {
      setError(
        !a && !b
          ? 'Nenhum dos concursos foi encontrado. Verifique os n\u00fameros.'
          : !a
            ? `Concurso ${numA} n\u00e3o encontrado.`
            : `Concurso ${numB} n\u00e3o encontrado.`,
      );
    } else {
      setResultA(a);
      setResultB(b);
    }

    setLoading(false);
  };

  const commonNumbers =
    resultA && resultB
      ? resultA.dezenas.filter((d) => resultB.dezenas.includes(d))
      : [];

  const getSum = (dezenas: string[]) =>
    dezenas.reduce((s, d) => s + parseInt(d, 10), 0);

  const getOddEven = (dezenas: string[]) => {
    let odd = 0;
    let even = 0;
    for (const d of dezenas) {
      if (parseInt(d, 10) % 2 === 0) even++;
      else odd++;
    }
    return { odd, even };
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Selecione os Concursos
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="compare-game" className="block text-sm font-medium text-gray-700 mb-1">
              Loteria
            </label>
            <select
              id="compare-game"
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e.target.value);
                setResultA(null);
                setResultB(null);
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

          <div>
            <label htmlFor="concurso-a" className="block text-sm font-medium text-gray-700 mb-1">
              Concurso A
            </label>
            <input
              id="concurso-a"
              type="number"
              value={concursoA}
              onChange={(e) => setConcursoA(e.target.value)}
              placeholder="Ex: 2750"
              min={1}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>

          <div>
            <label htmlFor="concurso-b" className="block text-sm font-medium text-gray-700 mb-1">
              Concurso B
            </label>
            <input
              id="concurso-b"
              type="number"
              value={concursoB}
              onChange={(e) => setConcursoB(e.target.value)}
              placeholder="Ex: 2751"
              min={1}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleCompare}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Buscando...' : 'Comparar'}
        </button>
      </div>

      {resultA && resultB && (
        <div className="space-y-6">
          <div
            className="rounded-xl p-4 text-center text-white font-semibold"
            style={{ backgroundColor: game.color }}
          >
            {commonNumbers.length > 0
              ? `${commonNumbers.length} n\u00famero${commonNumbers.length > 1 ? 's' : ''} em comum: ${commonNumbers.join(', ')}`
              : 'Nenhum n\u00famero em comum entre os dois sorteios'}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[resultA, resultB].map((result, idx) => {
              const oe = getOddEven(result.dezenas);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">
                      Concurso {result.concurso}
                    </h3>
                    <span className="text-sm text-gray-500">{result.data}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {result.dezenas.map((num, i) => {
                      const isCommon = commonNumbers.includes(num);
                      return (
                        <LotteryBall
                          key={i}
                          number={num}
                          color={isCommon ? 'bg-green-600' : game.ballColor}
                          textColor={game.ballTextColor}
                          size="sm"
                        />
                      );
                    })}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Soma</span>
                      <span className="font-medium text-gray-900">
                        {getSum(result.dezenas)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{'\u00cd'}mpares / Pares</span>
                      <span className="font-medium text-gray-900">
                        {oe.odd} / {oe.even}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo da Compara\u00e7\u00e3o</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="pb-2 font-semibold text-gray-700">M\u00e9trica</th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Concurso {resultA.concurso}
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Concurso {resultB.concurso}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-600">Data</td>
                    <td className="py-2 text-center text-gray-900">{resultA.data}</td>
                    <td className="py-2 text-center text-gray-900">{resultB.data}</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-600">Soma dos n\u00fameros</td>
                    <td className="py-2 text-center font-medium text-gray-900">
                      {getSum(resultA.dezenas)}
                    </td>
                    <td className="py-2 text-center font-medium text-gray-900">
                      {getSum(resultB.dezenas)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-600">{'\u00cd'}mpares / Pares</td>
                    <td className="py-2 text-center text-gray-900">
                      {getOddEven(resultA.dezenas).odd} / {getOddEven(resultA.dezenas).even}
                    </td>
                    <td className="py-2 text-center text-gray-900">
                      {getOddEven(resultB.dezenas).odd} / {getOddEven(resultB.dezenas).even}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">N\u00fameros em comum</td>
                    <td className="py-2 text-center font-bold text-gray-900" colSpan={2}>
                      {commonNumbers.length > 0
                        ? commonNumbers.join(', ')
                        : 'Nenhum'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
