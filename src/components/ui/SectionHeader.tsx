import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className,
  children,
}: SectionHeaderProps) {
  const isForcedDark = theme === 'dark';

  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div
      className={cn(
        'flex flex-col max-w-3xl mb-12 sm:mb-16',
        alignments[align],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase mb-3 transition-colors',
            isForcedDark
              ? 'bg-white/10 text-blue-200 border border-white/15'
              : 'bg-navy-50 dark:bg-dark-elevated text-navy-800 dark:text-sky-300 border border-navy-100 dark:border-dark-border'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight transition-colors',
          isForcedDark ? 'text-white' : 'text-navy-950 dark:text-white'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed font-normal transition-colors',
            isForcedDark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
          )}
        >
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
