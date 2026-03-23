'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center">
        {label && <p className="text-sm text-gray-600 mb-2">{label}</p>}
        <p className="text-lg font-semibold text-emerald-600 animate-pulse-dot">
          Sorteio em andamento...
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' },
  ];

  return (
    <div className="text-center">
      {label && <p className="text-sm text-gray-600 mb-2">{label}</p>}
      <div className="flex items-center justify-center gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="bg-gray-100 rounded-lg p-2 min-w-[60px] text-center"
          >
            <span className="text-2xl font-bold text-emerald-600">
              {String(unit.value).padStart(2, '0')}
            </span>
            <p className="text-xs text-gray-500">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
