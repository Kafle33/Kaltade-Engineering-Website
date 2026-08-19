'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { MotionReveal } from '@/components/ui/MotionReveal';

export function ThreeDisciplinesSection() {
  const disciplines = [
    {
      num: '01',
      title: 'ENGINEERING & TECHNICAL SERVICES',
      motto: 'Design. Assess. Plan.',
      desc: 'Rigorous architectural planning, structural seismic design conforming to Nepal Building Codes, comprehensive technical inspections, and municipal drawing approvals.',
      services: [
        'Civil & Structural Engineering',
        'Building Architectural Design & 3D Drawings',
        'Detailed Project Reports (DPR)',
        'Technical Feasibility Studies',
        'Site Quality Inspection & Construction Supervision',
        'Municipal Drawing Packages (Naxa Paas)',
      ],
      href: '/services/engineering',
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'PROPERTY VALUATION',
      motto: 'Measure. Assess. Understand.',
      desc: 'Standardized, authoritative property valuation and physical assessment of land, buildings, commercial properties, and industrial complexes for banks, BFIs, and owners.',
      services: [
        'Commercial Bank & BFI Collateral Valuation',
        'Land & Contiguous Parcel Valuation',
        'Residential & Commercial Building Valuation',
        'Industrial Asset & Warehouse Assessment',
        'Depreciation & Replacement Cost Analysis',
        'Fair Market & Distress Value Determination',
      ],
      href: '/valuation',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'REAL ESTATE SERVICES',
      motto: 'Find. Evaluate. Decide.',
      desc: 'Strategic property consultancy delivering engineering-backed due diligence, property buying/selling assistance, commercial real estate advisory, and land subdivision planning.',
      services: [
        'Property Buying & Selling Consultancy',
        'Independent Technical Due Diligence',
        'Cadastral Map vs. Field Boundary Verification',
        'Land Development & Plotted Subdivision Planning',
        'Commercial Real Estate Advisory',
        'Property Investment Feasibility Analysis',
      ],
      href: '/real-estate',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-dark-bg relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="CORE BUSINESS DIVISIONS"
            title="Three disciplines. One professional perspective."
            subtitle="Kaltade unites structural engineering, accredited property valuation, and property advisory to offer end-to-end clarity across the lifecycle of land and buildings."
            align="center"
          />
        </MotionReveal>

        <div className="space-y-12 lg:space-y-16">
          {disciplines.map((item, index) => {
            const isReversed = index % 2 === 1;
            return (
              <MotionReveal
                key={item.num}
                delay={index * 0.08}
                yOffset={20}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-dark-card/90 hover:bg-slate-50 dark:hover:bg-dark-card hover:border-slate-300 dark:hover:border-dark-border transition-all duration-300 shadow-xs dark:shadow-card-dark hover:shadow-lg dark:hover:shadow-card-dark-hover ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Side (Col 7) */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-navy-200 dark:text-navy-800">
                        {item.num}
                      </span>
                      <div className="h-8 w-px bg-slate-300 dark:bg-dark-border" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 tracking-wide">
                          &ldquo;{item.motto}&rdquo;
                        </p>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {item.services.map((svc) => (
                        <div
                          key={svc}
                          className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Button
                        href={item.href}
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore Division
                      </Button>
                    </div>
                  </div>

                  {/* Visual Side (Col 5) */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-md dark:shadow-card-dark aspect-[4/3] group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-xs font-mono uppercase tracking-wider text-blue-200 mb-0.5">
                          Kaltade Division {item.num}
                        </div>
                        <div className="text-sm font-bold truncate">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
