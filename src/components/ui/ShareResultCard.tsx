'use client';

import { useState, useCallback } from 'react';

interface ShareResultCardProps {
  gameName: string;
  gameColor: string;
  gameEmoji: string;
  concurso: number;
  data: string;
  dezenas: string[];
  acumulado: boolean;
  valorEstimado: number;
  premiacoes?: { descricao: string; ganhadores: number; valorPremio: number }[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function generateCanvas(props: ShareResultCardProps): HTMLCanvasElement {
  const {
    gameName,
    gameColor,
    concurso,
    data,
    dezenas,
    acumulado,
    valorEstimado,
    premiacoes,
  } = props;

  const canvas = document.createElement('canvas');
  const W = 1080;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0, 0, W, H);

  // Header bar
  const headerH = 200;
  ctx.fillStyle = gameColor;
  ctx.fillRect(0, 0, W, headerH);

  // Game name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Resultado ${gameName}`, W / 2, 80);

  // Concurso and date
  ctx.font = '32px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText(`Concurso ${concurso} — ${data}`, W / 2, 140);

  // Acumulado badge
  if (acumulado) {
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('ACUMULADO', W / 2, 180);
  }

  // Balls section
  const ballRadius = dezenas.length > 10 ? 32 : 40;
  const ballGap = dezenas.length > 10 ? 12 : 20;
  const ballDiameter = ballRadius * 2;
  const maxPerRow = Math.min(dezenas.length, dezenas.length > 10 ? 10 : 8);
  const rows = Math.ceil(dezenas.length / maxPerRow);
  const ballsStartY = headerH + 60;

  for (let i = 0; i < dezenas.length; i++) {
    const row = Math.floor(i / maxPerRow);
    const col = i % maxPerRow;
    const dezenasInRow = Math.min(maxPerRow, dezenas.length - row * maxPerRow);
    const rowWidth = dezenasInRow * ballDiameter + (dezenasInRow - 1) * ballGap;
    const startX = (W - rowWidth) / 2 + ballRadius;
    const x = startX + col * (ballDiameter + ballGap);
    const y = ballsStartY + row * (ballDiameter + ballGap) + ballRadius;

    // Ball shadow
    ctx.beginPath();
    ctx.arc(x, y + 3, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();

    // Ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = gameColor;
    ctx.fill();

    // Number
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${ballRadius > 32 ? 32 : 26}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dezenas[i], x, y + 1);
  }

  // Prize info section
  const prizeY = ballsStartY + rows * (ballDiameter + ballGap) + 50;
  ctx.textBaseline = 'alphabetic';

  if (valorEstimado > 0) {
    ctx.fillStyle = '#374151';
    ctx.font = '28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      acumulado ? 'Próximo prêmio estimado:' : 'Prêmio principal:',
      W / 2,
      prizeY,
    );
    ctx.fillStyle = gameColor;
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.fillText(formatCurrency(valorEstimado), W / 2, prizeY + 60);
  }

  // Top prize tier info
  if (premiacoes && premiacoes.length > 0) {
    const top = premiacoes[0];
    const tierY = prizeY + (valorEstimado > 0 ? 120 : 0);
    ctx.fillStyle = '#6b7280';
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    if (top.ganhadores > 0) {
      ctx.fillText(
        `${top.descricao}: ${top.ganhadores} ganhador(es) — ${formatCurrency(top.valorPremio)} cada`,
        W / 2,
        tierY,
      );
    } else {
      ctx.fillText(`${top.descricao}: Nenhum ganhador`, W / 2, tierY);
    }
  }

  // Footer
  const footerH = 80;
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, H - footerH, W, footerH);
  ctx.fillStyle = '#9ca3af';
  ctx.font = '24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('lotofacilresultado.com', W / 2, H - footerH / 2 + 8);

  return canvas;
}

export default function ShareResultCard(props: ShareResultCardProps) {
  const [sharing, setSharing] = useState(false);

  const handleShare = useCallback(async () => {
    setSharing(true);
    try {
      const canvas = generateCanvas(props);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (!blob) return;

      const file = new File(
        [blob],
        `resultado-${props.gameName.toLowerCase().replace(/\s+/g, '-')}-${props.concurso}.png`,
        { type: 'image/png' },
      );

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Resultado ${props.gameName} - Concurso ${props.concurso}`,
          text: `Confira o resultado da ${props.gameName} concurso ${props.concurso}: ${props.dezenas.join(', ')}`,
          files: [file],
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // User cancelled share or error
    }
    setSharing(false);
  }, [props]);

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
      aria-label="Compartilhar resultado"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      {sharing ? 'Gerando...' : 'Compartilhar'}
    </button>
  );
}
