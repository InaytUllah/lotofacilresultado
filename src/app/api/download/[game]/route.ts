import { NextRequest, NextResponse } from 'next/server';
import { GAMES } from '@/lib/constants';
import { fetchRecentResults } from '@/lib/api/lottery';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ game: string }> },
) {
  const { game: gameSlug } = await params;
  const game = GAMES[gameSlug];

  if (!game) {
    return NextResponse.json({ error: 'Jogo não encontrado' }, { status: 404 });
  }

  let results;
  try {
    results = await fetchRecentResults(gameSlug, 50);
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar resultados' },
      { status: 500 },
    );
  }

  if (!results || results.length === 0) {
    return NextResponse.json(
      { error: 'Nenhum resultado disponível' },
      { status: 404 },
    );
  }

  // Build CSV
  const header = 'Concurso,Data,Números,Acumulou,Prêmio Principal';
  const rows = results.map((r) => {
    const numeros = r.dezenas.join('-');
    const acumulou = r.acumulado ? 'Sim' : 'Não';

    // Get main prize value
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

  const filename = `resultados-${gameSlug}-lotofacilresultado.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
