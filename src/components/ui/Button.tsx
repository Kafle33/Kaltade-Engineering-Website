'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 select-none active:scale-[0.99] cursor-pointer';

    const variants = {
      primary:
        'bg-navy-900 dark:bg-navy-700 text-white hover:bg-navy-800 dark:hover:bg-navy-600 focus-visible:ring-navy-900 dark:focus-visible:ring-sky-400 shadow-sm hover:shadow-md border border-navy-800 dark:border-navy-600',
      secondary:
        'bg-navy-50 dark:bg-dark-card text-navy-900 dark:text-sky-300 hover:bg-navy-100 dark:hover:bg-dark-elevated focus-visible:ring-navy-500 border border-navy-200/80 dark:border-dark-border shadow-xs hover:shadow-sm',
      accent:
        'bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 focus-visible:ring-amber-500 shadow-sm hover:shadow-md border border-amber-600 dark:border-amber-500',
      outline:
        'border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-elevated hover:border-slate-400 dark:hover:border-slate-600 focus-visible:ring-navy-900 shadow-xs hover:shadow-sm',
      ghost:
        'text-navy-900 dark:text-slate-200 hover:bg-navy-50 dark:hover:bg-dark-card focus-visible:ring-navy-500 hover:translate-y-0',
      white:
        'bg-white text-navy-950 hover:bg-slate-100 focus-visible:ring-white shadow-md hover:shadow-lg font-semibold border border-slate-100',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
      icon: 'p-2.5',
    };

    const content = (
      <>
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
