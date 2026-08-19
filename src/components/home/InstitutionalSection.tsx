'use client';

import React from 'react';
import Link from 'next/link';
import {
  Landmark,
  Briefcase,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { MotionReveal, MotionItem } from '@/components/ui/MotionReveal';

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
    <section className="py-20 sm:py-28 bg-white dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="INSTITUTIONAL & BFI SOLUTIONS"
            title="Technical expertise for decisions that matter."
            subtitle="We partner with financial institutions, corporate enterprises, and developers to deliver objective engineering diligence and verified valuation reports."
            align="center"
          />
        </MotionReveal>

        <MotionReveal staggerChildren={0.08} delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {stakeholderGroups.map((group) => {
            const Icon = group.icon;
            return (
              <MotionItem key={group.title} className="h-full">
                <div
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-dark-card border border-slate-200/90 dark:border-dark-border flex flex-col justify-between hover:shadow-lg dark:hover:shadow-card-dark hover:border-navy-900/30 dark:hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300 group h-full"
                >
                  <div>
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-dark-elevated border border-slate-200 dark:border-dark-border text-navy-900 dark:text-sky-300 w-fit mb-6 shadow-xs group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-3 leading-snug">
                      {group.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                      {group.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-dark-border space-y-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Key Engagements:
                    </div>
                    {group.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </MotionReveal>

        {/* Institutional Callout */}
        <MotionReveal delay={0.15} yOffset={16}>
          <div className="p-8 sm:p-10 rounded-3xl bg-navy-950 dark:bg-dark-surface text-white border border-navy-800 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-card-dark">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold">
                Require an accredited valuation or engineering appraisal for your institution?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 max-w-2xl">
                Our registered engineering valuators and technical consultants provide prompt, confidential, and mathematically rigorous reports across Far-Western Nepal.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="accent" size="md">
                Initiate Institutional Request
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
