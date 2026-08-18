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
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    navy: 'bg-navy-900 text-white border-navy-800',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    outline: 'bg-transparent text-slate-700 border-slate-300',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border',
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
