import { GAMES } from './constants';
import { LotteryResult, BlogPost } from './types';

// Generate slug for a result blog post
export function getResultBlogSlug(gameSlug: string, concurso: number): string {
  return `resultado-${gameSlug}-concurso-${concurso}`;
}

// Generate slug for a prediction blog post
export function getPredictionBlogSlug(gameSlug: string, date: string): string {
  return `previsoes-${gameSlug}-${date}`;
}

// Generate blog post data for a result
export function generateResultBlogPost(gameSlug: string, result: LotteryResult): BlogPost {
  const game = GAMES[gameSlug];
  return {
    slug: getResultBlogSlug(gameSlug, result.concurso),
    title: `Resultado ${game.name} Concurso ${result.concurso} - ${result.data}`,
    description: `Confira os números sorteados no concurso ${result.concurso} da ${game.name}: ${result.dezenas.join(', ')}. Veja a premiação completa e se houve ganhadores.`,
    date: convertBRDateToISO(result.data),
    type: 'resultado',
    gameSlug,
    concurso: result.concurso,
  };
}

// Generate blog post data for predictions
export function generatePredictionBlogPost(gameSlug: string, date: string): BlogPost {
  const game = GAMES[gameSlug];
  return {
    slug: getPredictionBlogSlug(gameSlug, date),
    title: `Previsões ${game.name} - ${formatDatePT(date)}`,
    description: `Análise estatística e previsões para o próximo sorteio da ${game.name}. Números quentes, frios e combinações sugeridas.`,
    date,
    type: 'previsao',
    gameSlug,
  };
}

function convertBRDateToISO(brDate: string): string {
  const [day, month, year] = brDate.split('/');
  return `${year}-${month}-${day}`;
}

function formatDatePT(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

// Get all recent blog posts (from results)
export async function getRecentBlogPosts(count: number = 20): Promise<BlogPost[]> {
  // This will be called from pages that already have results data
  // Returns mock structure - actual data comes from the page
  return [];
}
