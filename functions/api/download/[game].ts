// Cloudflare Pages Function — /api/download/{game}
// Returns the last 50 results as a downloadable CSV.

import { fetchRecent, getApiName } from '../../_lottery';

interface Env {}

export const onRequestGet: PagesFunction<Env> = async ({ params }) => {
  const gameSlug = String(params.game);
  if (!getApiName(gameSlug)) {
    return jsonError('Jogo não encontrado', 404);
  }

  let results;
  try {
    results = await fetchRecent(gameSlug, 50);
  } catch {
    return jsonError('Erro ao buscar resultados', 500);
  }
  if (!results || results.length === 0) {
    return jsonError('Nenhum resultado disponível', 404);
  }

  const header = 'Concurso,Data,Números,Acumulou,Prêmio Principal';
  const rows = results.map((r) => {
    const numeros = r.dezenas.join('-');
    const acumulou = r.acumulado ? 'Sim' : 'Não';
    let premioPrincipal = '0';
    if (r.premiacoes && r.premiacoes.length > 0) {
      premioPrincipal = r.premiacoes[0].valorPremio.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return `${r.concurso},${r.data},"${numeros}",${acumulou},"R$ ${premioPrincipal}"`;
  });
  const csv = [header, ...rows].join('\n');

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="resultados-${gameSlug}-lotofacilresultado.csv"`,
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
};

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
