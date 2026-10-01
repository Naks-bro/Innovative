import React, { memo } from 'react';
import { Card } from '../ui/card';
import { motion } from 'motion/react';
import { cn } from '../ui/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'neon' | 'light';
  hover?: boolean;
  onClick?: () => void;
  delay?: number;
}

const GlassCard = memo(({ 
  children, 
  className, 
  variant = 'default',
  hover = false,
  onClick,
  delay = 0 
}: GlassCardProps) => {
  const baseClasses = 'glass-panel backdrop-blur-xl';
  
  const variantClasses = {
    default: 'border-2 border-primary/30',
    neon: 'neon-border border-2',
    light: 'light-mode-card border-2'
  };

  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses,
          className
        )}
        onClick={onClick}
      >
        {children}
      </Card>
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
