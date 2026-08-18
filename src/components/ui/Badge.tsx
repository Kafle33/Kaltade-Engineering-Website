import React from 'react';
import { cn } from '@/lib/utils';
import { PropertyStatus } from '@/types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'navy' | 'blue' | 'success' | 'warning' | 'danger' | 'outline' | 'slate';
  status?: PropertyStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  status,
  size = 'md',
  className,
}: BadgeProps) {
  let computedVariant = variant;

  if (status) {
    switch (status) {
      case 'Available':
        computedVariant = 'success';
        break;
      case 'Under Negotiation':
        computedVariant = 'warning';
        break;
      case 'Sold':
      case 'Rented':
      case 'Unavailable':
        computedVariant = 'slate';
        break;
      case 'Under Review':
        computedVariant = 'blue';
        break;
    }
  }

  const variants = {
    default: 'bg-slate-100 dark:bg-dark-elevated text-slate-800 dark:text-slate-200 border-slate-200 dark:border-dark-border',
    navy: 'bg-navy-900 dark:bg-navy-800 text-white border-navy-800 dark:border-navy-700',
    blue: 'bg-blue-50 dark:bg-sky-950/60 text-blue-800 dark:text-sky-300 border-blue-200 dark:border-sky-800/60',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    danger: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    outline: 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-dark-border',
    slate: 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-border',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border transition-colors',
        variants[computedVariant],
        sizes[size],
        className
      )}
    >
      {status === 'Available' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {children}
    </span>
  );
}
