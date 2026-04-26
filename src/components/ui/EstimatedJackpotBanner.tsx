import Link from 'next/link';
import { LotteryResult, GameConfig } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';

interface EstimatedJackpotBannerProps {
  result: LotteryResult;
  game: GameConfig;
}

/**
 * Prominent "next jackpot" banner — competitor parity feature.
 *
 * Caixa, MegaLoterias, ResultadoFácil all show this above the fold on game
 * pages. It's the single most important conversion + retention element.
 */
export default function EstimatedJackpotBanner({
  result,
  game,
}: EstimatedJackpotBannerProps) {
  const estimated = result.valorEstimadoProximoConcurso ?? 0;
  if (estimated <= 0) return null;

  const nextConcurso = result.concurso + 1;
  const nextDate = result.dataProximoConcurso ?? null;
  const isAccumulated = result.acumulado;

  return (
    <section
      aria-labelledby="jackpot-banner-title"
      className="mb-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-white shadow-lg overflow-hidden"
    >
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl sm:text-4xl">
            💰
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-amber-50 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">
            {isAccumulated ? 'Acumulou! Próximo prêmio estimado' : 'Próximo prêmio estimado'}
          </p>
          <p
            id="jackpot-banner-title"
            className="speakable text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums tracking-tight"
          >
            {formatCurrency(estimated)}
          </p>
          <p className="text-amber-50 text-sm mt-1">
            Concurso {nextConcurso}{nextDate ? ` • Sorteio ${nextDate}` : ''} •{' '}
            <span className="font-medium">{game.drawTime}h (Brasília)</span>
          </p>
        </div>

        <div className="flex-shrink-0 w-full sm:w-auto">
          <a
            href="https://www.loteriasonline.caixa.gov.br/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-amber-700 px-5 py-2.5 rounded-lg font-bold hover:bg-amber-50 transition-colors shadow-sm"
          >
            Apostar na Caixa →
          </a>
        </div>
      </div>
    </section>
  );
}
