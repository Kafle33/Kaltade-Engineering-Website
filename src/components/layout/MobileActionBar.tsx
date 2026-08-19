'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Building2, Scale, CalendarCheck } from 'lucide-react';

export function MobileActionBar() {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg border-t border-slate-200 dark:border-dark-border px-2 py-2 sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.4)]"
    >
      <div className="grid grid-cols-5 gap-1 text-center">
        <a
          href="tel:+9779858425256"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white active:bg-slate-100 dark:active:bg-dark-card transition-colors"
        >
          <Phone className="w-4 h-4 text-navy-800 dark:text-sky-400" />
          <span className="text-[10px] font-semibold mt-1">Call</span>
        </a>

        <a
          href="https://wa.me/9779858425256"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 active:bg-slate-100 dark:active:bg-dark-card transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
        </a>

        <Link
          href="/properties/find"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white active:bg-slate-100 dark:active:bg-dark-card transition-colors"
        >
          <Building2 className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <span className="text-[10px] font-semibold mt-1">Find Property</span>
        </Link>

        <Link
          href="/valuation"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white active:bg-slate-100 dark:active:bg-dark-card transition-colors"
        >
          <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-[10px] font-semibold mt-1">Valuation</span>
        </Link>

        <Link
          href="/contact"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white active:bg-slate-100 dark:active:bg-dark-card transition-colors"
        >
          <CalendarCheck className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
          <span className="text-[10px] font-semibold mt-1">Inquire</span>
        </Link>
      </div>
    </aside>
  );
}
