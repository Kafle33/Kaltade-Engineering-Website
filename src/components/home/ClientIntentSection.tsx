'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Scale,
  FileSpreadsheet,
  Search,
  UploadCloud,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';

export function ClientIntentSection() {
  const intentCards = [
    {
      action: 'Build',
      title: 'Engineering & Building Design',
      desc: 'Architectural planning, structural analysis (NBC compliant), MEP layouts, and municipal drawing approvals (Naxa Paas).',
      href: '/services/engineering',
      icon: Compass,
      tag: 'Engineering',
      badgeColor: 'bg-blue-50 dark:bg-sky-950/60 text-blue-800 dark:text-sky-300 border-blue-200 dark:border-sky-800/60',
    },
    {
      action: 'Value',
      title: 'Property Valuation & Assessment',
      desc: 'Accredited land and building valuation reports for banks, BFIs, mortgage credit, transactions, and corporate accounting.',
      href: '/valuation',
      icon: Scale,
      tag: 'Valuation',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    },
    {
      action: 'Plan',
      title: 'DPR & Feasibility Studies',
      desc: 'Bankable Detailed Project Reports, commercial feasibility modeling, CapEx budgeting, and risk mitigation frameworks.',
      href: '/services/dpr',
      icon: FileSpreadsheet,
      tag: 'Planning & Feasibility',
      badgeColor: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
    },
    {
      action: 'Buy',
      title: 'Property Acquisition & Due Diligence',
      desc: 'Identify verified land parcels, houses, and commercial buildings with on-ground technical due diligence and boundary checks.',
      href: '/properties/find',
      icon: Search,
      tag: 'Real Estate',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    },
    {
      action: 'Sell',
      title: 'Property Consultancy & Listing',
      desc: 'Market and sell your land or building through structured engineering verification and transparent buyer outreach.',
      href: '/properties/list',
      icon: UploadCloud,
      tag: 'Listing',
      badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
    },
    {
      action: 'Invest',
      title: 'Real Estate Investment Advisory',
      desc: 'Strategic guidance on land development, commercial rentals, market growth corridors, and development yield optimization.',
      href: '/real-estate/investment',
      icon: TrendingUp,
      tag: 'Investment',
      badgeColor: 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/60',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CLIENT INTENT NAVIGATOR"
          title="What can we help you with?"
          subtitle="Select your specific requirement to explore how our integrated engineering and property capabilities serve your goals."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intentCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.action}
                href={card.href}
                className="group relative bg-white dark:bg-dark-card p-7 rounded-2xl border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-xl dark:hover:shadow-card-dark-hover hover:border-navy-900/40 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-navy-900 dark:bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 group-hover:bg-navy-900 group-hover:text-white dark:group-hover:bg-navy-800 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                    >
                      {card.action}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-navy-700 dark:group-hover:text-sky-300 transition-colors leading-snug mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-sm font-semibold text-navy-900 dark:text-sky-400 group-hover:text-navy-700 dark:group-hover:text-sky-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
