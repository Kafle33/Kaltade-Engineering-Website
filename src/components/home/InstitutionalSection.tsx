'use client';

import React from 'react';
import Link from 'next/link';
import {
  Landmark,
  Briefcase,
  Building,
  ShieldCheck,
  FileSpreadsheet,
  Scale,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';

export function InstitutionalSection() {
  const stakeholderGroups = [
    {
      title: 'Commercial Banks & BFIs',
      icon: Landmark,
      desc: 'Accredited property valuation reports, collateral inspections, cadastral boundary verification, and technical asset screening conforming to Nepal Rastra Bank directives.',
      deliverables: ['Bank-Format Valuation Dossiers', 'Distress & Fair Market Assessment', 'Boundary & Setback Verification'],
    },
    {
      title: 'Corporate Developers & Builders',
      icon: Building,
      desc: 'Subdivision master planning, NBC-compliant structural engineering, municipal drawing packages (Naxa Paas), and construction quality supervision.',
      deliverables: ['Detailed Project Reports (DPR)', 'Earthquake-Resistant Structural Design', 'Infrastructure Cost Estimation (BOQ)'],
    },
    {
      title: 'Private & Institutional Investors',
      icon: Briefcase,
      desc: 'Independent technical due diligence, commercial corridor demand analysis, rental yield projections, and land acquisition advisory.',
      deliverables: ['Property Due Diligence Reports', 'Investment Feasibility Models', 'Comparative Market Analytics'],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="INSTITUTIONAL & BFI SOLUTIONS"
          title="Technical expertise for decisions that matter."
          subtitle="We partner with financial institutions, corporate enterprises, and developers to deliver objective engineering diligence and verified valuation reports."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {stakeholderGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:shadow-lg hover:border-navy-900/30 transition-all duration-300 group"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-navy-900 w-fit mb-6 shadow-sm group-hover:bg-navy-900 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 mb-3 leading-snug">
                    {group.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {group.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Engagements:
                  </div>
                  {group.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-navy-950 text-white border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold">
              Require an accredited valuation or engineering appraisal for your institution?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Our registered engineering valuators and technical consultants provide prompt, confidential, and mathematically rigorous reports across Far-Western Nepal.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="accent" size="md">
              Initiate Institutional Request
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
