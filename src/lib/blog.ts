import { GAMES } from './constants';
import { BlogPost } from './types';

// Generate slug for a result blog post (kept for redirect logic)
export function getResultBlogSlug(gameSlug: string, concurso: number): string {
  return `resultado-${gameSlug}-concurso-${concurso}`;
}

// Generate slug for a prediction blog post
export function getPredictionBlogSlug(gameSlug: string, date: string): string {
  return `previsoes-${gameSlug}-${date}`;
}

// Generate blog post data for predictions
export function generatePredictionBlogPost(gameSlug: string, date: string): BlogPost {
  const game = GAMES[gameSlug];

  // Build a unique description per game using its configuration
  const gameDescriptions: Record<string, string> = {
    'mega-sena': `Análise estatística da Mega-Sena para ${formatDatePT(date)}. Escolha ${game.selectNumbers} números de 1 a ${game.maxNumber} com inteligência e concorra a prêmios milionários.`,
    'lotofacil': `Análise estatística da Lotofácil para ${formatDatePT(date)}. Marque ${game.selectNumbers} números de 1 a ${game.maxNumber} na loteria com maior chance de ganhar.`,
    'quina': `Análise estatística da Quina para ${formatDatePT(date)}. Acerte ${game.selectNumbers} números de 1 a ${game.maxNumber} e leve o prêmio principal.`,
    'lotomania': `Análise estatística da Lotomania para ${formatDatePT(date)}. Escolha ${game.selectNumbers} números de 00 a 99 e acompanhe as tendências.`,
    'mais-milionaria': `Análise estatística da +Milionária para ${formatDatePT(date)}. Selecione ${game.selectNumbers} números de 1 a ${game.maxNumber} mais 2 trevos e dispute os maiores prêmios do Brasil.`,
    'dia-de-sorte': `Análise estatística do Dia de Sorte para ${formatDatePT(date)}. Escolha ${game.selectNumbers} números de 1 a ${game.maxNumber} e seu mês da sorte.`,
    'super-sete': `Análise estatística do Super Sete para ${formatDatePT(date)}. Preencha ${game.selectNumbers} colunas com números de 0 a ${game.maxNumber}.`,
    'dupla-sena': `Análise estatística da Dupla Sena para ${formatDatePT(date)}. Marque ${game.selectNumbers} números de 1 a ${game.maxNumber} e tenha duas chances de ganhar.`,
    'timemania': `Análise estatística da Timemania para ${formatDatePT(date)}. Escolha ${game.selectNumbers} números de 1 a ${game.maxNumber} e torça pelo seu time do coração.`,
  };

  const description = gameDescriptions[gameSlug]
    ?? `Análise estatística e previsões para o próximo sorteio da ${game.name}. Escolha ${game.selectNumbers} números de 1 a ${game.maxNumber} — confira números quentes, frios e combinações sugeridas.`;

  return {
    slug: getPredictionBlogSlug(gameSlug, date),
    title: `Previsões ${game.name} - ${formatDatePT(date)}`,
    description,
    date,
    type: 'previsao',
    gameSlug,
  };
}

function formatDatePT(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}
