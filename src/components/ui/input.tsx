import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isTabularNums?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  isTabularNums = false,
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label 
          htmlFor={generatedId} 
          className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[var(--text-tertiary)] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={generatedId}
          className={`
            w-full rounded-lg border bg-[var(--bg-surface-raised)] px-3.5 py-2.5 text-sm 
            text-[var(--text-primary)] placeholder-[var(--ink-500)]
            transition-all duration-150 ease-out
            focus:outline-none focus:border-[var(--border-accent)] focus:ring-2 focus:ring-[rgba(224,90,71,0.25)]
            disabled:opacity-50 disabled:bg-[var(--bg-element-hover)]
            ${leftIcon ? 'pl-9' : ''}
            ${rightIcon ? 'pr-9' : ''}
            ${error ? 'border-[var(--danger-solid)] focus:border-[var(--danger-solid)] focus:ring-red-500/20' : 'border-[var(--border-default)]'}
            ${isTabularNums ? 'tabular-nums font-mono' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-[var(--text-tertiary)] flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-xs text-[var(--danger-text)] font-medium flex items-center gap-1 mt-0.5">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
