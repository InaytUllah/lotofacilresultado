import Link from 'next/link';
import { GAMES, GAME_SLUGS, DAYS_PT } from '@/lib/constants';
import { fetchMultipleLatestResults } from '@/lib/api/lottery';
import ResultCard from '@/components/ui/ResultCard';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function buildLiveContextParagraph(
  results: Record<string, import('@/lib/types').LotteryResult | null>,
) {
  const now = new Date();
  const weekday = DAYS_PT[now.getDay()];
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const todayDow = now.getDay();

  const todayLotteries = GAME_SLUGS.filter((slug) =>
    GAMES[slug].drawDays.includes(todayDow),
  ).map((slug) => GAMES[slug].name);

  let maxPrize = 0;
  let maxPrizeName = '';
  for (const slug of GAME_SLUGS) {
    const r = results[slug];
    if (r && r.valorEstimadoProximoConcurso > maxPrize) {
      maxPrize = r.valorEstimadoProximoConcurso;
      maxPrizeName = GAMES[slug].name;
    }
  }

  if (todayLotteries.length === 0) {
    return `Hoje, ${weekday.toLowerCase()} ${dateStr}, não há sorteios programados. ${maxPrizeName && maxPrize > 0 ? `O maior prêmio estimado é da ${maxPrizeName} com ${formatCurrency(maxPrize)} acumulados. ` : ''}Os resultados são atualizados automaticamente minutos após cada sorteio oficial da Caixa.`;
  }

  const lotteriesList =
    todayLotteries.length <= 2
      ? todayLotteries.join(' e ')
      : todayLotteries.slice(0, -1).join(', ') + ' e ' + todayLotteries[todayLotteries.length - 1];

  const prizeText = maxPrizeName && maxPrize > 0
    ? ` O maior prêmio estimado do dia é da ${maxPrizeName} com ${formatCurrency(maxPrize)} acumulados.`
    : '';

  return `Hoje, ${weekday.toLowerCase()} ${dateStr}, acontecem sorteios da ${lotteriesList}.${prizeText} Os resultados são atualizados automaticamente minutos após cada sorteio oficial da Caixa.`;
}

// ---------------------------------------------------------------------------
// Async Server Component — fetches data and renders results
// ---------------------------------------------------------------------------

export default async function HomepageResults() {
  let results: Record<string, import('@/lib/types').LotteryResult | null> = {};

  try {
    results = await fetchMultipleLatestResults();
  } catch {
    // API failed — show placeholders
  }

  const liveContext = buildLiveContextParagraph(results);

  // Quick stats
  let totalConcursos = 0;
  for (const slug of GAME_SLUGS) {
    const r = results[slug];
    if (r) totalConcursos += r.concurso;
  }

  return (
    <>
      {/* Live Context */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
        <p className="text-sm text-gray-600 leading-relaxed bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          {liveContext}
        </p>
      </div>

      {/* Featured Jackpot */}
      {(() => {
        let maxPrize = 0;
        let jackpotSlug = '';
        for (const slug of GAME_SLUGS) {
          const r = results[slug];
          if (r && r.valorEstimadoProximoConcurso > maxPrize) {
            maxPrize = r.valorEstimadoProximoConcurso;
            jackpotSlug = slug;
          }
        }
        if (!jackpotSlug || maxPrize <= 0) return null;
        const jackpotGame = GAMES[jackpotSlug];
        const jackpotResult = results[jackpotSlug]!;
        return (
          <section className="max-w-7xl mx-auto px-4 mb-8">
            <Link
              href={`/${jackpotSlug}`}
              className="block rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-200 rounded-full px-3 py-1 mb-3">
                    Maior Prêmio Estimado
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {jackpotGame.emoji} {jackpotGame.name} — Concurso {jackpotResult.concurso + 1}
                  </h2>
                  <p className="text-gray-600 mt-1">Próximo sorteio estimado em</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">{formatCurrency(maxPrize)}</p>
                  <p className="text-sm text-emerald-700 font-medium mt-1">Ver detalhes &rarr;</p>
                </div>
              </div>
            </Link>
          </section>
        );
      })()}

      {/* Latest Results Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Últimos Resultados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_SLUGS.map((slug) => {
            const game = GAMES[slug];
            const result = results[slug];

            if (!result) {
              return (
                <div
                  key={slug}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                      style={{ backgroundColor: game.color }}
                    >
                      {game.emoji} {game.name}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Resultado indisponível no momento.
                  </p>
                </div>
              );
            }

            return (
              <ResultCard
                key={slug}
                result={result}
                game={game}
                showLink={true}
              />
            );
          })}
        </div>
      </section>

      {/* Jackpot Ranking */}
      {(() => {
        const accumulated = GAME_SLUGS
          .map((slug) => ({
            slug,
            game: GAMES[slug],
            result: results[slug],
            prize: results[slug]?.valorEstimadoProximoConcurso || 0,
          }))
          .filter((item) => item.prize > 0)
          .sort((a, b) => b.prize - a.prize);

        if (accumulated.length === 0) return null;

        return (
          <section className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ranking de Prêmios Acumulados
            </h2>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              {accumulated.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={`flex items-center gap-4 p-4 sm:p-5 hover:bg-gray-50 transition-colors ${
                    index < accumulated.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-amber-100 text-amber-700' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}º
                  </span>
                  <span className="text-xl">{item.game.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.game.name}</p>
                    <p className="text-xs text-gray-500">Concurso {(item.result?.concurso || 0) + 1}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-emerald-600 text-lg">{formatCurrency(item.prize)}</p>
                    {item.result?.acumulado && (
                      <span className="text-xs font-medium text-amber-600">Acumulado</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Quick Tools */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ferramentas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { href: '/conferidor', emoji: '✅', title: 'Conferidor', desc: 'Confira sua aposta' },
            { href: '/gerador', emoji: '🎲', title: 'Gerador', desc: 'Gere números aleatórios' },
            { href: '/simulador', emoji: '🧪', title: 'Simulador', desc: 'Teste seus números' },
            { href: '/estatisticas', emoji: '📈', title: 'Estatísticas', desc: 'Gráficos e análises' },
            { href: '/numeros-quentes-frios', emoji: '🔥', title: 'Quentes e Frios', desc: 'Frequência dos números' },
            { href: '/meus-numeros', emoji: '💾', title: 'Meus Números', desc: 'Salve suas apostas' },
            { href: '/comparar', emoji: '🔄', title: 'Comparar', desc: 'Compare dois sorteios' },
            { href: '/acumulados', emoji: '💰', title: 'Acumulados', desc: 'Prêmios acumulados' },
            { href: '/bolao', emoji: '🤝', title: 'Bolão', desc: 'Calcule cotas e custos' },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <span className="text-2xl block mb-2">{tool.emoji}</span>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{tool.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Estatísticas Rápidas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">
                {totalConcursos.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total de concursos realizados</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">9</p>
              <p className="text-sm text-gray-600 mt-1">Loterias disponíveis</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">21h</p>
              <p className="text-sm text-gray-600 mt-1">Horário dos sorteios (BRT)</p>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">Diário</p>
              <p className="text-sm text-gray-600 mt-1">Frequência de sorteios</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
