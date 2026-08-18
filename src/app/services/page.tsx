'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Scale,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Ruler,
  Layers,
  FileSpreadsheet,
  Award,
  BookOpen,
  Users,
  Target,
  Building,
  HardHat,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ServicesPage() {
  const [activeDivision, setActiveDivision] = useState<'all' | 'engineering' | 'valuation' | 'real-estate'>('all');

  const divisions = [
    {
      id: 'engineering',
      name: 'Engineering & Technical Services',
      shortName: 'Engineering',
      badge: 'Technical Rigor',
      icon: Compass,
      description:
        'Civil and structural engineering, architectural planning, seismic analysis under Nepal National Building Code (NBC), municipal permit dossiers, and construction quality supervision.',
      subPages: [
        {
          title: 'Building Design & Architectural Drawings',
          href: '/services/engineering',
          desc: 'Comprehensive architectural layouts, 3D elevations, MEP design, and functional planning.',
        },
        {
          title: 'Structural Analysis & NBC Code Compliance',
          href: '/services/engineering',
          desc: 'Seismic modeling (NBC 105:2020), RCC and steel structural calculations, and construction details.',
        },
        {
          title: 'Detailed Project Reports (DPR)',
          href: '/services/dpr',
          desc: 'Bankable DPRs, technical feasibility, CapEx/OpEx breakdown, and multi-year financial modeling.',
        },
        {
          title: 'Site Inspection & Structural Audits',
          href: '/services/engineering',
          desc: 'Structural integrity screening, reinforcement verification, and building health evaluations.',
        },
        {
          title: 'Municipal Drawing Approval (Naxa Paas)',
          href: '/services/engineering',
          desc: 'Statutory compliance dossiers, bylaw verification, and municipal submission documentation.',
        },
      ],
      ctaText: 'Explore Engineering Services',
      ctaHref: '/services/engineering',
      accentColor: 'from-blue-600 to-navy-900',
    },
    {
      id: 'valuation',
      name: 'Property Valuation & Asset Assessment',
      shortName: 'Valuation',
      badge: 'Flagship Discipline',
      icon: Scale,
      description:
        'Standardized, authoritative property valuation for commercial banks, financial institutions, corporate enterprises, and property owners across Far-Western Nepal.',
      subPages: [
        {
          title: 'Bank Collateral & Mortgage Valuation',
          href: '/valuation',
          desc: 'Institutional valuation reports adhering to NRB directives and commercial banking standards.',
        },
        {
          title: 'Fair Market & Distress Value Analysis',
          href: '/valuation',
          desc: 'Objective valuation models separating distress liquidation value from fair market appreciation.',
        },
        {
          title: 'Land & Building Asset Appraisal',
          href: '/valuation',
          desc: 'Field verification of residential, commercial, industrial, and agricultural properties.',
        },
        {
          title: 'Structural Condition & Depreciation Assessment',
          href: '/valuation',
          desc: 'Engineering evaluation of built age, material degradation, and residual lifespan calculation.',
        },
        {
          title: 'Electronic Cadastral Boundary Survey',
          href: '/valuation',
          desc: 'Precise electronic distance measurement and cadastral trace map boundary verification.',
        },
      ],
      ctaText: 'Explore Valuation Services',
      ctaHref: '/valuation',
      accentColor: 'from-amber-600 to-navy-900',
    },
    {
      id: 'real-estate',
      name: 'Real Estate Consultancy & Due Diligence',
      shortName: 'Real Estate',
      badge: 'Market Intelligence',
      icon: Building2,
      description:
        'Professional real estate consultancy providing engineering-backed pre-purchase due diligence, land subdivision planning, and commercial advisory.',
      subPages: [
        {
          title: 'Property Due Diligence Assessment',
          href: '/real-estate/due-diligence',
          desc: 'On-site technical due diligence, cadastral alignment, municipal setback checks, and feasibility audits.',
        },
        {
          title: 'Property Investment Consultancy',
          href: '/real-estate/investment',
          desc: 'Data-driven market assessment, commercial yield modeling, and strategic acquisition guidance.',
        },
        {
          title: 'Commercial Real Estate Advisory',
          href: '/real-estate/commercial',
          desc: 'Commercial plots, office spaces, showroom locations, and high-yield rental assets.',
        },
        {
          title: 'Land Development & Master Planning',
          href: '/real-estate/land-development',
          desc: 'Subdivision design, internal road and drainage layout, and plot yield optimization.',
        },
      ],
      ctaText: 'Explore Real Estate Advisory',
      ctaHref: '/real-estate',
      accentColor: 'from-emerald-600 to-navy-900',
    },
  ];

  const whyChooseCards = [
    {
      title: 'Professional Expertise',
      icon: Award,
      desc: 'Led by accredited civil and structural engineers with extensive field training in structural dynamics, valuation standards, and local municipality bylaws.',
    },
    {
      title: 'Property Knowledge',
      icon: BookOpen,
      desc: 'Unrivaled regional intelligence in Kailali, Kanchanpur, and Far-Western Nepal—spanning micro-market price trends, soil conditions, and infrastructure corridors.',
    },
    {
      title: 'Comprehensive Services',
      icon: Layers,
      desc: 'A unified single-window platform delivering structural design, DPR modeling, bankable valuations, and real estate diligence without fragmented handoffs.',
    },
    {
      title: 'Institutional Experience',
      icon: Building,
      desc: 'Trusted partner for commercial banks, development banks, cooperatives, corporate developers, and institutional investors requiring audit-grade rigor.',
    },
    {
      title: 'Accurate & Transparent',
      icon: Target,
      desc: 'Strict mathematical models, electronic distance surveying, and empirical market cross-checking. Zero speculation, zero inflated claims.',
    },
    {
      title: 'Client Focused',
      icon: Users,
      desc: 'We protect our clients’ capital and structural safety with objective advice, rapid response times, and clear, actionable documentation.',
    },
  ];

  const filteredDivisions = activeDivision === 'all'
    ? divisions
    : divisions.filter((d) => d.id === activeDivision);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-20 transition-colors">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-950 dark:bg-dark-surface text-white py-16 sm:py-24 mb-16 border-b border-navy-800 dark:border-dark-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 dark:bg-dark-elevated text-blue-200 dark:text-sky-300 border border-white/15 dark:border-dark-border mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              OUR CAPABILITIES
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Integrated Engineering, Valuation &amp; Property Solutions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Kaltade Engineering Services bridges the gap between technical engineering precision, institutional property valuation, and transparent real estate advisory in Nepal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/valuation" variant="accent" size="md">
                Request Property Valuation
              </Button>
              <Button href="/services/engineering" variant="white" size="md">
                Engineering Consultancy
              </Button>
              <Button href="/contact" variant="outline" size="md" className="bg-white/10 dark:bg-dark-card text-white border-white/20 dark:border-dark-border hover:bg-white/20">
                Get Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Division Filter Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs">
            <button
              onClick={() => setActiveDivision('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDivision === 'all'
                  ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-elevated'
              }`}
            >
              All Capabilities
            </button>
            <button
              onClick={() => setActiveDivision('engineering')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDivision === 'engineering'
                  ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-elevated'
              }`}
            >
              Engineering &amp; Design
            </button>
            <button
              onClick={() => setActiveDivision('valuation')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDivision === 'valuation'
                  ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-elevated'
              }`}
            >
              Property Valuation
            </button>
            <button
              onClick={() => setActiveDivision('real-estate')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeDivision === 'real-estate'
                  ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-elevated'
              }`}
            >
              Real Estate Advisory
            </button>
          </div>
        </div>

        {/* Divisions List */}
        <div className="space-y-12">
          {filteredDivisions.map((division) => {
            const Icon = division.icon;
            return (
              <div
                key={division.id}
                id={division.id}
                className="bg-white dark:bg-dark-card rounded-3xl border border-slate-200/90 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-md transition-all overflow-hidden"
              >
                {/* Division Header Banner */}
                <div className="p-6 sm:p-8 md:p-10 border-b border-slate-100 dark:border-dark-border bg-gradient-to-r from-navy-950 to-navy-900 dark:from-dark-surface dark:to-dark-card text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-amber-400 shrink-0 border border-white/15 dark:border-dark-border">
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="warning" size="md">
                          {division.badge}
                        </Badge>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        {division.name}
                      </h2>
                      <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-3xl leading-relaxed">
                        {division.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <Button
                        href={division.ctaHref}
                        variant="accent"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {division.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sub-services Grid */}
                <div className="p-6 sm:p-8 md:p-10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
                    Specialized Offerings &amp; Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {division.subPages.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="group p-5 rounded-2xl bg-slate-50/70 dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border hover:border-navy-900/30 dark:hover:border-sky-500/40 hover:bg-white dark:hover:bg-dark-elevated hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold font-mono text-navy-400 dark:text-sky-400 group-hover:text-navy-900 dark:group-hover:text-white transition-colors">
                              0{idx + 1}
                            </span>
                            <span className="w-6 h-6 rounded-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-navy-900 dark:group-hover:text-white group-hover:border-navy-900 dark:group-hover:border-sky-400 transition-all">
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-navy-950 dark:text-white group-hover:text-navy-800 dark:group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                            {sub.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {sub.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-dark-border flex items-center text-xs font-semibold text-navy-900 dark:text-sky-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          <span>View service details</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Kaltade Section */}
        <section className="mt-24 sm:mt-32 pt-16 border-t border-slate-200 dark:border-dark-border">
          <SectionHeader
            eyebrow="THE KALTADE ADVANTAGE"
            title="Why Choose Kaltade Engineering Services"
            subtitle="We integrate engineering accuracy with deep local property intelligence to deliver uncompromised value, risk protection, and institutional trust."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {whyChooseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/90 dark:border-dark-border hover:border-navy-900/40 dark:hover:border-sky-500/40 hover:shadow-lg dark:hover:shadow-card-dark transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border flex items-center justify-center mb-5 group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Consultation CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-navy-950 dark:bg-dark-surface text-white relative overflow-hidden border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                NEED PROFESSIONAL GUIDANCE?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Let&apos;s discuss your engineering, valuation, or real estate requirement.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                Reach out to our engineering consultants in Dhangadhi. We review your requirements and provide clear technical guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button href="/contact" variant="accent" size="lg">
                Get Free Consultation
              </Button>
              <a
                href="tel:+9779858425256"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border border-white/20 bg-white/10 dark:bg-dark-elevated text-white hover:bg-white/20 text-base px-6 py-3.5 gap-2.5 shadow-xs"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call +977-9858425256</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
