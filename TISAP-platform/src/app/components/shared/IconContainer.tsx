import React, { memo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../ui/utils';

interface IconContainerProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blue' | 'cyan' | 'teal' | 'gold' | 'gradient';
  className?: string;
  animate?: boolean;
}

const IconContainer = memo(({ 
  icon, 
  size = 'md', 
  variant = 'gradient',
  className,
  animate = true 
}: IconContainerProps) => {
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const variantClasses = {
    blue: 'bg-gradient-to-br from-primary-blue to-primary-blue-dark',
    cyan: 'bg-gradient-to-br from-accent-cyan to-accent-cyan-dark',
    teal: 'bg-gradient-to-br from-accent-teal to-tisap-teal-dark',
    gold: 'bg-gradient-to-br from-accent-gold to-accent-gold-dark',
    gradient: 'bg-gradient-to-br from-primary-blue via-accent-cyan to-accent-teal'
  };

  const Container = animate ? motion.div : 'div';

  const animationProps = animate ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  } : {};

  return (
    <Container
      className={cn(
        'icon-container-light rounded-2xl flex items-center justify-center shadow-2xl',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...animationProps}
    >
      <div className="text-white">
        {icon}
      </div>
    </Container>
  );
});

IconContainer.displayName = 'IconContainer';

export default IconContainer;
