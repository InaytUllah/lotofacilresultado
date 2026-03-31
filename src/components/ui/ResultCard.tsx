import Link from 'next/link';
import type { LotteryResult, GameConfig } from '@/lib/types';
import GameBadge from './GameBadge';
import LotteryBall from './LotteryBall';

interface ResultCardProps {
  result: LotteryResult;
  game: GameConfig;
  showPrizes?: boolean;
  showLink?: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function ResultCard({
  result,
  game,
  showPrizes = false,
  showLink = false,
}: ResultCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <GameBadge game={game} size="sm" />
        <span className="text-sm font-medium text-gray-700">
          Concurso {result.concurso}
        </span>
        <span className="text-sm text-gray-500">{result.data}</span>
        {result.acumulado && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
            Acumulado
          </span>
        )}
      </div>

      {/* Balls */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
        {result.dezenas.map((dezena, index) => (
          <LotteryBall
            key={`${dezena}-${index}`}
            number={dezena}
            color={game.ballColor}
            textColor={game.ballTextColor}
            size={result.dezenas.length > 10 ? 'sm' : 'md'}
            delay={index * 80}
          />
        ))}
      </div>

      {/* Acumulado value */}
      {result.acumulado && result.valorAcumulado > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          Acumulou para{' '}
          <span className="font-bold text-amber-600">
            {formatCurrency(result.valorAcumulado)}
          </span>
        </p>
      )}

      {/* Estimated next prize */}
      {result.valorEstimadoProximoConcurso > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          Próximo prêmio estimado:{' '}
          <span className="font-bold text-emerald-600">
            {formatCurrency(result.valorEstimadoProximoConcurso)}
          </span>
        </p>
      )}

      {/* Prize table */}
      {showPrizes && result.premiacoes.length > 0 && (
        <div className="border-t border-gray-100 pt-4 mt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Premiação</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-1 font-medium">Faixa</th>
                  <th className="pb-1 font-medium text-center">Ganhadores</th>
                  <th className="pb-1 font-medium text-right">Prêmio</th>
                </tr>
              </thead>
              <tbody>
                {result.premiacoes.map((premio) => (
                  <tr key={premio.faixa} className="border-t border-gray-50">
                    <td className="py-1 text-gray-700">{premio.descricao}</td>
                    <td className="py-1 text-center text-gray-700">{premio.ganhadores}</td>
                    <td className="py-1 text-right text-gray-700">
                      {formatCurrency(premio.valorPremio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Link */}
      {showLink && (
        <div className="mt-4 pt-2 border-t border-gray-100">
          <Link
            href={`/${game.slug}/resultado/${result.concurso}`}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Ver detalhes &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
