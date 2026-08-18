'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';

export function EngineeringDprSection() {
  const dprWorkflow = [
    { step: '01', title: 'Project Concept', desc: 'Promoter vision, market niche & site rationale' },
    { step: '02', title: 'Technical Analysis', desc: 'Civil, structural, MEP & capacity planning' },
    { step: '03', title: 'Market & Demand', desc: 'Target demographic & competitive curve' },
    { step: '04', title: 'Cost Estimation', desc: 'Exhaustive CapEx & civil BOQ estimation' },
    { step: '05', title: 'Financial Modeling', desc: '10-yr cash flows, DSCR, IRR, NPV & payback' },
    { step: '06', title: 'Feasibility Analysis', desc: 'Commercial viability & break-even points' },
    { step: '07', title: 'Implementation Plan', desc: 'Milestone Gantt chart & procurement road' },
    { step: '08', title: 'Risk Considerations', desc: 'Sensitivity testing & mitigation protocols' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ENGINEERING & PROJECT CONSULTANCY"
          title="From concept to technical documentation."
          subtitle="Engineering rigor and commercial acumen to transform bold ideas into viable, bankable infrastructure and building projects."
          align="center"
        />

        {/* Top Grid: Engineering Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy-100 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-navy-800 dark:text-sky-400" />
              <span>Full-Spectrum Civil &amp; Building Engineering</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
              Earthquake-resistant design, precision municipal drawings, and technical site supervision.
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Whether you are developing a private residence, a 5-storey commercial complex, a private medical center, or an industrial warehouse, our engineering team ensures that every drawing conforms to the Nepal National Building Code (NBC 105:2020) and municipal bylaws.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Architectural Planning &amp; 3D Visualizations:</strong> Functional space zoning, climate-responsive ventilation, and contemporary facades.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Structural Seismic Analysis:</strong> Finite element modeling for high-seismic Terai and hilly soil strata.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Municipal Approval Dossiers:</strong> Complete architectural, structural, and sanitary drawing packages ready for municipal permits (Naxa Paas).
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button
                href="/services/engineering"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Engineering Services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-xl dark:shadow-card-dark bg-white dark:bg-dark-card aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Engineering Architectural Blueprint and Drafting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-mono uppercase text-blue-200">
                  NBC Compliant Engineering
                </div>
                <div className="text-base font-bold">
                  Precision in Structural Design &amp; Municipal Compliance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: DPR Dedicated Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 dark:bg-dark-surface text-white border border-navy-800 dark:border-dark-border shadow-2xl dark:shadow-card-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10 dark:border-dark-border">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Detailed Project Report (DPR) Formulation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  Turn an idea into a viable, bankable project.
                </h3>
                <p className="text-sm text-slate-300 dark:text-slate-400">
                  We formulate comprehensive DPRs required by commercial banking consortia, development finance institutions, and private investors for capital loans.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  href="/services/dpr"
                  variant="accent"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request DPR Consultation
                </Button>
              </div>
            </div>

            {/* 8-Step DPR Workflow Grid */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-300 dark:text-sky-300 mb-4">
                Structured DPR Formulation Workflow:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {dprWorkflow.map((item) => (
                  <div
                    key={item.step}
                    className="p-3.5 rounded-xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border flex flex-col justify-between hover:bg-white/10 dark:hover:bg-dark-elevated transition-colors"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                        {item.step}
                      </span>
                      <h5 className="text-xs font-bold text-white mb-1 leading-snug">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
