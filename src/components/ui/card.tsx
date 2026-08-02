import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  elevation?: 1 | 2 | 3;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  elevation = 1,
  hoverable = false,
  className = '',
  ...props
}, ref) => {
  const shadows: Record<number, string> = {
    1: 'shadow-[var(--shadow-1)]',
    2: 'shadow-[var(--shadow-2)]',
    3: 'shadow-[var(--shadow-3)]'
  };

  return (
    <motion.div
      ref={ref}
      whileHover={hoverable ? { y: -2, boxShadow: 'var(--shadow-2)' } : undefined}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`
        bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-xl p-5
        transition-colors duration-200 ${shadows[elevation]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';
