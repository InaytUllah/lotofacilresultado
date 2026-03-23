'use client';

interface LotteryBallProps {
  number: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
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
      className={`${sizeClasses[size]} ${color} ${textColor} font-bold flex items-center justify-center rounded-full shadow-md animate-bounceIn`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {number}
    </div>
  );
}
