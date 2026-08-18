'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Building2, Scale, CalendarCheck } from 'lucide-react';

export function MobileActionBar() {
  return (
    <aside aria-label="Mobile quick actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-2 sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-5 gap-1 text-center">
        <a
          href="tel:+9779858425256"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 hover:text-navy-950 active:bg-slate-100"
        >
          <Phone className="w-4 h-4 text-navy-800" />
          <span className="text-[10px] font-semibold mt-1">Call</span>
        </a>

        <a
          href="https://wa.me/9779858425256"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 hover:text-emerald-700 active:bg-slate-100"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
        </a>

        <Link
          href="/properties"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 hover:text-navy-950 active:bg-slate-100"
        >
          <Building2 className="w-4 h-4 text-blue-700" />
          <span className="text-[10px] font-semibold mt-1">Properties</span>
        </Link>

        <Link
          href="/valuation"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 hover:text-navy-950 active:bg-slate-100"
        >
          <Scale className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] font-semibold mt-1">Valuation</span>
        </Link>

        <Link
          href="/contact"
          className="flex flex-col items-center justify-center p-1 rounded-lg text-slate-700 hover:text-navy-950 active:bg-slate-100"
        >
          <CalendarCheck className="w-4 h-4 text-indigo-700" />
          <span className="text-[10px] font-semibold mt-1">Inquire</span>
        </Link>
      </div>
    </aside>
  );
}
