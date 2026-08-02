import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant | string;
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  dot = true,
  children,
  className = '',
  ...props
}) => {
  const styles: Record<BadgeVariant, { bg: string; text: string; border: string; dotColor: string }> = {
    success: {
      bg: 'bg-[var(--success-bg)]',
      text: 'text-[var(--success-text)]',
      border: 'border-[var(--success-border)]',
      dotColor: 'bg-[var(--success-solid)]'
    },
    warning: {
      bg: 'bg-[var(--warning-bg)]',
      text: 'text-[var(--warning-text)]',
      border: 'border-[var(--warning-border)]',
      dotColor: 'bg-[var(--warning-solid)]'
    },
    danger: {
      bg: 'bg-[var(--danger-bg)]',
      text: 'text-[var(--danger-text)]',
      border: 'border-[var(--danger-border)]',
      dotColor: 'bg-[var(--danger-solid)]'
    },
    info: {
      bg: 'bg-[var(--info-bg)]',
      text: 'text-[var(--info-text)]',
      border: 'border-[var(--info-border)]',
      dotColor: 'bg-[var(--info-solid)]'
    },
    neutral: {
      bg: 'bg-[var(--bg-element-hover)]',
      text: 'text-[var(--text-secondary)]',
      border: 'border-[var(--border-subtle)]',
      dotColor: 'bg-[var(--text-tertiary)]'
    },
    accent: {
      bg: 'bg-[var(--accent-50)] dark:bg-[rgba(224,90,71,0.15)]',
      text: 'text-[var(--accent-500)] dark:text-[var(--accent-400)]',
      border: 'border-[var(--accent-200)] dark:border-[rgba(240,126,109,0.3)]',
      dotColor: 'bg-[var(--accent-500)]'
    }
  };

  // Safely extract variant key and extra classes if variant contains spaces (e.g., "neutral font-mono")
  const parts = typeof variant === 'string' ? variant.trim().split(/\s+/) : ['neutral'];
  const variantKey = (parts[0] in styles ? parts[0] : 'neutral') as BadgeVariant;
  const extraClasses = parts.slice(1).join(' ');

  const current = styles[variantKey];

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide select-none
        ${current.bg} ${current.text} ${current.border} ${extraClasses} ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dotColor}`} />
      )}
      <span>{children}</span>
    </div>
  );
};
