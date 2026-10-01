import React, { memo } from 'react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { cn } from '../ui/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'teal' | 'gold';
  icon?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const GradientButton = memo(({ 
  children, 
  onClick, 
  className,
  variant = 'primary',
  icon,
  disabled = false,
  size = 'md'
}: GradientButtonProps) => {
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-blue to-primary-blue-dark hover:from-primary-blue-dark hover:to-blue-900',
    secondary: 'bg-gradient-to-r from-accent-cyan to-accent-teal hover:from-accent-cyan-dark hover:to-teal-700',
    teal: 'bg-gradient-to-r from-accent-teal to-accent-teal-dark hover:from-teal-700 hover:to-teal-800',
    gold: 'bg-gradient-to-r from-accent-gold to-accent-gold-dark hover:from-accent-gold-dark hover:to-yellow-600'
  };

  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-10 py-3 text-base',
    lg: 'px-12 py-4 text-lg'
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'gradient-btn text-white shadow-xl hover:shadow-2xl transition-all rounded-xl',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    </motion.div>
  );
});

GradientButton.displayName = 'GradientButton';

export default GradientButton;
