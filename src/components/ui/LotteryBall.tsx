'use client';

interface LotteryBallProps {
  number: string;
  color?: string;
  textColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  delay?: number;
}

const sizeClasses = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-8 h-8 text-xs sm:text-sm',
  md: 'w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-base',
  lg: 'w-9 h-9 text-sm sm:w-12 sm:h-12 sm:text-lg',
} as const;

export default function LotteryBall({
  number,
  color = 'bg-emerald-600',
  textColor = 'text-white',
  size = 'md',
  delay = 0,
}: LotteryBallProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${color} ${textColor} font-bold flex items-center justify-center rounded-full shadow-md animate-bounceIn flex-shrink-0`}
      style={{ animationDelay: `${delay}ms` }}
      role="img"
      aria-label={`Número sorteado ${number}`}
    >
      {number}
    </div>
  );
}
