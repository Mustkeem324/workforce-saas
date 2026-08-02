import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'danger' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--success-solid)]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[var(--warning-solid)]" />,
    danger: <AlertCircle className="w-5 h-5 text-[var(--danger-solid)]" />,
    info: <Info className="w-5 h-5 text-[var(--info-solid)]" />
  };

  const borders: Record<ToastType, string> = {
    success: 'border-l-4 border-l-[var(--success-solid)]',
    warning: 'border-l-4 border-l-[var(--warning-solid)]',
    danger: 'border-l-4 border-l-[var(--danger-solid)]',
    info: 'border-l-4 border-l-[var(--info-solid)]'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 rounded-xl
              bg-[var(--bg-surface-overlay)] border border-[var(--border-default)]
              shadow-[var(--shadow-4)] ${borders[toast.type]}
            `}
          >
            <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
