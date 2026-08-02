import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<React.ComponentProps<typeof motion.button>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}, ref) => {

  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[var(--ink-900)] dark:bg-[var(--ink-100)] text-white dark:text-[var(--ink-950)] hover:bg-[var(--ink-800)] dark:hover:bg-white shadow-[var(--shadow-1)]",
    accent: "bg-[var(--accent-500)] text-white hover:bg-[var(--accent-600)] shadow-[var(--shadow-accent-glow)] active:bg-[var(--accent-700)]",
    secondary: "bg-[var(--bg-element-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-element-active)] border border-[var(--border-subtle)]",
    outline: "border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-element-hover)] hover:border-[var(--border-strong)]",
    ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-element-hover)]",
    destructive: "bg-[var(--danger-solid)] text-white hover:opacity-90 shadow-sm"
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5 min-h-[32px]",
    md: "px-4 py-2 text-sm gap-2 min-h-[40px]",
    lg: "px-6 py-2.5 text-base gap-2.5 min-h-[48px]",
    icon: "p-2 text-sm w-9 h-9 min-h-[36px]"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
