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
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      action: 'Value',
      title: 'Property Valuation & Assessment',
      desc: 'Accredited land and building valuation reports for banks, BFIs, mortgage credit, transactions, and corporate accounting.',
      href: '/valuation',
      icon: Scale,
      tag: 'Valuation',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      action: 'Plan',
      title: 'DPR & Feasibility Studies',
      desc: 'Bankable Detailed Project Reports, commercial feasibility modeling, CapEx budgeting, and risk mitigation frameworks.',
      href: '/services/dpr',
      icon: FileSpreadsheet,
      tag: 'Planning & Feasibility',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      action: 'Buy',
      title: 'Property Acquisition & Due Diligence',
      desc: 'Identify verified land parcels, houses, and commercial buildings with on-ground technical due diligence and boundary checks.',
      href: '/properties/find',
      icon: Search,
      tag: 'Real Estate',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      action: 'Sell',
      title: 'Property Consultancy & Listing',
      desc: 'Market and sell your land or building through structured engineering verification and transparent buyer outreach.',
      href: '/properties/list',
      icon: UploadCloud,
      tag: 'Listing',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      action: 'Invest',
      title: 'Real Estate Investment Advisory',
      desc: 'Strategic guidance on land development, commercial rentals, market growth corridors, and development yield optimization.',
      href: '/real-estate/investment',
      icon: TrendingUp,
      tag: 'Investment',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80 relative">
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
                className="group relative bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-navy-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-navy-50 text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                    >
                      {card.action}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-navy-700 transition-colors leading-snug mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-navy-900 group-hover:text-navy-700">
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
