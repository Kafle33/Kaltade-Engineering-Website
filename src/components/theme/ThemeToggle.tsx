'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'labeled' | 'pill';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({
  className,
  variant = 'icon',
  size = 'md',
}: ThemeToggleProps) {
  const { theme, toggleTheme, isMounted } = useTheme();

  // Guard against SSR hydration mismatch for icon state
  const isDark = isMounted ? theme === 'dark' : false;

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={cn(
          'relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
          'border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2',
          isDark
            ? 'bg-dark-card border-dark-border text-slate-200 hover:bg-dark-elevated'
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs',
          className
        )}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          <Sun
            className={cn(
              'w-3.5 h-3.5 text-amber-500 transition-all duration-300 absolute',
              isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            )}
          />
          <Moon
            className={cn(
              'w-3.5 h-3.5 text-sky-400 transition-all duration-300 absolute',
              isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            )}
          />
        </span>
        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    );
  }

  if (variant === 'labeled') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
          isDark
            ? 'bg-dark-card/60 text-slate-200 hover:bg-dark-elevated'
            : 'bg-slate-100/80 text-slate-800 hover:bg-slate-200/80',
          className
        )}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
              isDark ? 'bg-navy-900/60 text-sky-400' : 'bg-white text-amber-500 shadow-xs'
            )}
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <span>Theme Mode</span>
        </div>
        <span
          className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-md border',
            isDark
              ? 'bg-dark-elevated border-dark-border text-sky-300'
              : 'bg-white border-slate-200 text-slate-700'
          )}
        >
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden',
        'border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2',
        sizeClasses[size],
        isDark
          ? 'bg-dark-card/90 border-dark-border text-slate-200 hover:bg-dark-elevated hover:border-slate-600 hover:text-white'
          : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-navy-950 shadow-xs',
        className
      )}
    >
      {/* Animated Sun Icon */}
      <Sun
        className={cn(
          iconSizes[size],
          'text-amber-500 transition-all duration-500 transform absolute',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100 hover:rotate-45'
        )}
      />
      {/* Animated Moon Icon */}
      <Moon
        className={cn(
          iconSizes[size],
          'text-sky-400 transition-all duration-500 transform absolute',
          isDark
            ? 'rotate-0 scale-100 opacity-100 hover:-rotate-12'
            : '-rotate-90 scale-0 opacity-0'
        )}
      />
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
