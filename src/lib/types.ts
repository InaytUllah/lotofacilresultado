export interface LotteryResult {
  concurso: number;
  data: string; // DD/MM/YYYY
  dezenas: string[];
  dezenasOrdemSorteio?: string[];
  premiacoes: Prize[];
  acumulado: boolean;
  valorAcumulado: number;
  valorEstimadoProximoConcurso: number;
  dataProximoConcurso?: string;
  localSorteio?: string;
  mesSorte?: string; // Dia de Sorte
  timeCoracao?: string; // Timemania
  tpiConcurso?: number;
}

export interface Prize {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

export interface GameConfig {
  slug: string;
  name: string;
  apiName: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  ballColor: string;
  ballTextColor: string;
  totalNumbers: number;
  selectNumbers: number;
  maxNumber: number;
  drawDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  drawTime: string; // HH:MM BRT
  emoji: string;
  description: string;
  metaDescription: string;
  odds: string;
  minBet: string;
  prizeCategories: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  type: 'resultado' | 'previsao';
  gameSlug?: string;
  concurso?: number;
}

export interface NumberStats {
  number: number;
  frequency: number;
  lastDrawn: number;
  percentage: number;
  isHot: boolean;
}
