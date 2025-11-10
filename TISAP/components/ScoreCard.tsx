'use client';

import { cn } from '@/lib/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  className?: string;
}

export function ScoreCard({ title, score, subtitle, className }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className={cn('mt-4 rounded-md border-2 p-4 text-center', getScoreBg(score))}>
        <div className={cn('text-4xl font-bold', getScoreColor(score))}>
          {score}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">out of 100</div>
      </div>
      {subtitle && (
        <p className="mt-3 text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
