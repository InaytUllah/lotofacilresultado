import Link from 'next/link';
import { LotteryResult, GameConfig } from '@/lib/types';

interface LastResultsTableProps {
  results: LotteryResult[];
  game: GameConfig;
  limit?: number;
}

/**
 * Compact table showing the last N draws — competitor parity feature.
 * Caixa, MegaLoterias, ResultadoFácil all show this prominently.
 */
export default function LastResultsTable({
  results,
  game,
  limit = 10,
}: LastResultsTableProps) {
  if (!results || results.length === 0) return null;

  const rows = results.slice(0, limit);

  return (
    <section
      className="rounded-xl border border-gray-200 bg-white overflow-hidden"
      aria-labelledby="last-results-title"
    >
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 id="last-results-title" className="text-lg font-bold text-gray-900">
            Últimos {rows.length} Resultados — {game.name}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tabela rápida com concursos, datas e dezenas sorteadas
          </p>
        </div>
        <Link
          href={`/${game.slug}/resultados/${new Date().getFullYear()}`}
          className="text-xs font-medium hover:underline whitespace-nowrap"
          style={{ color: game.color }}
        >
          Ver todos →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th scope="col" className="text-left py-2.5 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Concurso
              </th>
              <th scope="col" className="text-left py-2.5 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Data
              </th>
              <th scope="col" className="text-left py-2.5 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Dezenas
              </th>
              <th scope="col" className="text-center py-2.5 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider hidden sm:table-cell">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const topTier = r.premiacoes?.[0];
              const winners = topTier?.ganhadores ?? 0;
              return (
                <tr key={r.concurso} className="border-b border-gray-100 hover:bg-gray-50 last:border-b-0">
                  <td className="py-2.5 px-4">
                    <Link
                      href={`/${game.slug}/resultado/${r.concurso}`}
                      className="font-semibold hover:underline"
                      style={{ color: game.color }}
                    >
                      {r.concurso}
                    </Link>
                  </td>
                  <td className="py-2.5 px-4 text-gray-700 whitespace-nowrap">{r.data}</td>
                  <td className="py-2.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {r.dezenas.map((dez, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: game.color }}
                        >
                          {dez}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-center hidden sm:table-cell">
                    {winners > 0 ? (
                      <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">
                        {winners} ganhador{winners > 1 ? 'es' : ''}
                      </span>
                    ) : (
                      <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded">
                        Acumulou
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
