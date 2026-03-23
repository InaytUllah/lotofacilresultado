import type { GameConfig } from '@/lib/types';

interface GameBadgeProps {
  game: GameConfig;
  size?: 'sm' | 'md';
}

export default function GameBadge({ game, size = 'md' }: GameBadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`${sizeClasses} rounded-full font-medium inline-flex items-center gap-1 text-white`}
      style={{ backgroundColor: game.color }}
    >
      {game.emoji} {game.name}
    </span>
  );
}
