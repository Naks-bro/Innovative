import React, { memo } from 'react';
import { motion } from 'motion/react';
import GlassCard from './GlassCard';
import { cn } from '../ui/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'teal' | 'gold';
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
  progress?: number;
  delay?: number;
  onHover?: (isHovered: boolean) => void;
}

const StatsCard = memo(({ 
  title,
  value,
  subtitle,
  icon,
  variant = 'blue',
  trend,
  progress,
  delay = 0,
  onHover
}: StatsCardProps) => {
  
  const colors = {
    blue: {
      border: 'border-primary-blue/30',
      bg: 'bg-primary-blue/10',
      text: 'text-primary-blue',
      gradient: 'from-primary-blue to-primary-blue-dark'
    },
    cyan: {
      border: 'border-accent-cyan/30',
      bg: 'bg-accent-cyan/10',
      text: 'text-accent-cyan',
      gradient: 'from-accent-cyan to-accent-cyan-dark'
    },
    teal: {
      border: 'border-accent-teal/30',
      bg: 'bg-accent-teal/10',
      text: 'text-accent-teal',
      gradient: 'from-accent-teal to-tisap-teal-dark'
    },
    gold: {
      border: 'border-accent-gold/30',
      bg: 'bg-accent-gold/10',
      text: 'text-accent-gold',
      gradient: 'from-accent-gold to-accent-gold-dark'
    }
  };

  const color = colors[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => onHover?.(true)}
      onHoverEnd={() => onHover?.(false)}
    >
      <GlassCard className={cn('p-6 transition-all duration-300', color.border)} hover>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{value}</span>
              {trend && (
                <span className={cn(
                  'text-sm font-medium',
                  trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
                )}>
                  {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
                </span>
              )}
            </div>
          </div>
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br',
            color.gradient
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
        
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', color.gradient)}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        
        {!progress && subtitle && (
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        )}
      </GlassCard>
    </motion.div>
  );
});

StatsCard.displayName = 'StatsCard';

export default StatsCard;
