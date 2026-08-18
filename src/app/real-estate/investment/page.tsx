'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  Search,
  Compass,
  Scale,
  BarChart3,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  MessageSquare,
  FileCheck,
  Check,
  HelpCircle,
  Building2,
  Users,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Modal } from '@/ui/Modal';
import { saveLead } from '@/lib/storage';

export default function RealEstateInvestmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    investorType: 'Individual Investor',
    budgetRange: 'NPR 50 Lakh - 1.5 Crore',
    targetLocation: 'Dhangadhi / Kailali',
    propertyInterest: 'Commercial Land',
    timeHorizon: 'Medium Term (1-3 Years)',
    message: '',
  });

  const advisoryProcess = [
    {
      step: '01',
      title: 'Property Identification',
      icon: Search,
      short: 'Target Screening',
      desc: 'Screening prospective land, commercial plots, and buildings in prime growth corridors matching client budget, risk profile, and spatial criteria.',
    },
    {
      step: '02',
      title: 'Location Assessment',
      icon: Compass,
      short: 'Micro-Market Audit',
      desc: 'Physical evaluation of road width, right-of-way expansion plans, municipal master plan zoning, utility connectivity, and neighborhood expansion trends.',
    },
    {
      step: '03',
      title: 'Valuation',
      icon: Scale,
      short: 'Engineering Appraisal',
      desc: 'Determining realistic Fair Market Value, replacement cost less depreciation for structures, and statutory government minimum rates to prevent overpaying.',
    },
    {
      step: '04',
      title: 'Market Assessment',
      icon: BarChart3,
      short: 'Supply & Yield Analysis',
      desc: 'Analyzing surrounding historical transactions, comparable sale metrics, commercial tenant absorption rates, and prevailing rental yields.',
    },
    {
      step: '05',
      title: 'Development Potential',
      icon: Building,
      short: 'Highest & Best Use',
      desc: 'Evaluating Floor Area Ratio (FAR), building height limits, parking requirements, and structural feasibility to maximize utilization of the plot.',
    },
    {
      step: '06',
      title: 'Feasibility',
      icon: FileCheck,
      short: 'CapEx & Viability Modeling',
      desc: 'Formulating preliminary capital expenditure budgets, infrastructure costs, cash flow timelines, and technical risk factors for the asset.',
    },
    {
      step: '07',
      title: 'Investment Decision',
      icon: CheckCircle2,
      short: 'Strategic Advisory Brief',
      desc: 'Delivering a comprehensive Technical Investment Memorandum empowering the client to negotiate and proceed with absolute clarity.',
    },
  ];

  const targetAudiences = [
    {
      title: 'Individual & Diaspora Investors',
      icon: Users,
      badge: 'Private Capital',
      desc: 'Individuals and Non-Resident Nepalese seeking secure, verified land and residential properties with clear cadastral boundaries, verified road access, and long-term capital appreciation potential.',
      highlights: [
        'Boundary & Cadastral Naksha verification',
        'Fair market pricing guidance',
        'Independent inspection without sales bias',
      ],
    },
    {
      title: 'Commercial Businesses',
      icon: Briefcase,
      badge: 'Corporate Expansion',
      desc: 'Companies expanding regional branches, retail showrooms, regional offices, or distribution centers requiring strategic commercial properties with verified road rights-of-way.',
      highlights: [
        'Highway frontage & vehicular turning radius check',
        'Structural integrity audit for built properties',
        'Municipal zoning & commercial permit clearance',
      ],
    },
    {
      title: 'Property Owners & Inheritors',
      icon: Building2,
      badge: 'Asset Monetization',
      desc: 'Landowners holding ancestral or undeveloped acreage seeking to assess commercial redevelopment potential, land subdivision feasibility, or optimal timing for monetization.',
      highlights: [
        'Highest and Best Use (HBU) study',
        'Land subdivision yield estimation',
        'Pre-sale engineering due diligence',
      ],
    },
    {
      title: 'Real Estate Developers',
      icon: Layers,
      badge: 'Project Syndicates',
      desc: 'Developers planning plotted residential communities, commercial complexes, or industrial warehousing requiring bankable Detailed Project Reports (DPR) and technical feasibility.',
      highlights: [
        'Topographical survey & master planning',
        'Infrastructure cost budgeting (BOQ)',
        'Bank-compliant DPR preparation',
      ],
    },
  ];

  const advisoryPillars = [
    {
      title: 'Cadastral & Physical Due Diligence',
      desc: 'We cross-verify physical land boundary lines against the Survey Department Cadastral Trace map, detecting encroachments, mismatching corner points, and irregular shapes before commitments are made.',
    },
    {
      title: 'Municipal Road & Setback Verification',
      desc: 'We inspect municipal right-of-way plans to ensure mandatory road widening setbacks will not adversely truncate your buildable land area in the future.',
    },
    {
      title: 'Engineered Asset Valuation',
      desc: 'Rather than relying on speculative broker claims, our valuations use certified civil engineering methods, comparable transaction benchmarks, and replacement cost formulas.',
    },
    {
      title: 'Highest & Best Use (HBU) Assessment',
      desc: 'We determine the legally permissible, physically possible, financially feasible, and maximally productive development option for any given land parcel.',
    },
    {
      title: 'Infrastructure & Site Constraints Audit',
      desc: 'We inspect overhead high-voltage power lines, river/drainage buffer corridors, soil bearing conditions, flood risk history, and utility availability on site.',
    },
    {
      title: 'Completely Independent & Objective',
      desc: 'Kaltade provides independent technical assessment. We are not driven by commission bias, ensuring our advice serves only your long-term capital security.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    saveLead({
      type: 'Property Inquiry',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: 'Real Estate Investment Consultancy',
      propertyType: formData.propertyInterest,
      location: formData.targetLocation,
      budget: formData.budgetRange,
      message: `[Investor Type: ${formData.investorType}] [Horizon: ${formData.timeHorizon}] ${formData.message}`,
      urgency: 'Standard',
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        investorType: 'Individual Investor',
        budgetRange: 'NPR 50 Lakh - 1.5 Crore',
        targetLocation: 'Dhangadhi / Kailali',
        propertyInterest: 'Commercial Land',
        timeHorizon: 'Medium Term (1-3 Years)',
        message: '',
      });
    }, 2500);
  };

  return (
    <div className="pt-28 sm:pt-32 bg-white min-h-screen text-navy-950">
      {/* 1. Breadcrumb & Page Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-200/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-400">Investment Consultancy</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-blue-200 border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Strategic Real Estate Advisory
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Make Better Property Investment Decisions.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Back your real estate investments with professional civil engineering scrutiny, cadastral trace verification, rigorous valuation methodologies, and development feasibility analysis in Dhangadhi, Kailali, and across Nepal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                size="lg"
                leftIcon={<TrendingUp className="w-4 h-4" />}
              >
                Request Investment Consultation
              </Button>
              <Button
                href="/real-estate/commercial"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Commercial Properties
              </Button>
            </div>

            {/* Quick Stat Badges */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Independent Due Diligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">Bank-Grade Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">Highest & Best Use Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Zero Sales Bias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mandatory Statutory Legal Disclaimer Banner */}
      <section className="bg-amber-50/90 border-b border-amber-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3 text-xs sm:text-sm text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong>Important Regulatory Notice:</strong> Investment consultancy provides technical, physical, and market-oriented assessment only. It does <strong>not</strong> constitute financial advice, securities advice, or legal counsel. Kaltade Engineering Services Pvt. Ltd. does <strong>not</strong> make financial guarantees, promises of capital returns, or assured rental yields. Property acquisitions carry inherent market risks.
          </div>
        </div>
      </section>

      {/* 3. The 7-Step Investment Advisory Process */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="STRUCTURED ADVISORY METHODOLOGY"
            title="The 7-Step Property Investment Process"
            subtitle="Our disciplined workflow takes you from initial property discovery to a data-backed investment decision with total technical transparency."
            align="center"
          />

          {/* Visual Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {advisoryProcess.map((proc, index) => {
              const Icon = proc.icon;
              return (
                <div
                  key={proc.step}
                  className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all flex flex-col justify-between group ${
                    index === 6 ? 'md:col-span-2 lg:col-span-4 bg-navy-950 text-white border-navy-800' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-2xl font-black font-mono ${
                          index === 6 ? 'text-amber-400' : 'text-navy-300 group-hover:text-navy-900'
                        } transition-colors`}
                      >
                        {proc.step}
                      </span>
                      <div
                        className={`p-2.5 rounded-xl ${
                          index === 6
                            ? 'bg-white/10 text-amber-400 border border-white/15'
                            : 'bg-navy-50 text-navy-900 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white'
                        } transition-colors`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          index === 6 ? 'text-blue-300' : 'text-amber-700'
                        }`}
                      >
                        {proc.short}
                      </span>
                      <h3
                        className={`text-lg font-bold leading-snug mt-1 ${
                          index === 6 ? 'text-white' : 'text-navy-950'
                        }`}
                      >
                        {proc.title}
                      </h3>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mt-2 ${
                        index === 6 ? 'text-slate-300 max-w-4xl' : 'text-slate-600'
                      }`}
                    >
                      {proc.desc}
                    </p>
                  </div>

                  {index < 6 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-navy-800">
                      <span>Step {index + 1} of 7</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Workflow Sequence Strip */}
          <div className="mt-12 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hidden lg:flex items-center justify-between text-xs font-bold text-navy-900 overflow-x-auto">
            <span>Property Identification</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Location Assessment</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Valuation</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Market Assessment</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Development Potential</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Feasibility</span>
            <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-amber-600 font-extrabold">Investment Decision</span>
          </div>
        </div>
      </section>

      {/* 4. Target Client Segments */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="WHO WE SERVE"
            title="Tailored Advisory for Every Property Stakeholder"
            subtitle="Whether buying your first commercial plot, developing multi-acre subdivisions, or structuring corporate assets, we provide targeted technical intelligence."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {targetAudiences.map((aud) => {
              const Icon = aud.icon;
              return (
                <div
                  key={aud.title}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-navy-900/40 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-white border border-slate-200 text-navy-900 shadow-sm">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <Badge variant="navy" size="sm">
                        {aud.badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-navy-950 mb-2">
                      {aud.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {aud.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block mb-1">
                        Key Advisory Focus:
                      </span>
                      {aud.highlights.map((hl) => (
                        <div key={hl} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          investorType: aud.title,
                        }));
                        setIsModalOpen(true);
                      }}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Consult for {aud.title.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Core Pillars of Kaltade Advisory */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="TECHNICAL ADVANTAGE"
            title="Why Invest with Engineering Diligence?"
            subtitle="The difference between speculative property buying and institutional-grade investing lies in engineering verification."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {advisoryPillars.map((pil, idx) => (
              <div
                key={pil.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-sm font-mono">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white leading-snug">
                  {pil.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Due Diligence Checklist */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                <ShieldCheck className="w-4 h-4" />
                <span>Pre-Acquisition Protection</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-navy-950 leading-tight">
                What We Audit Before You Commit Your Capital.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In Nepal, property mistakes are often irreversible once registration deeds (Lalpurja transfers) are executed at the Land Revenue Office (Malpot). Our technical audit ensures no hidden liabilities emerge.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Cadastral Naksha (Trace) vs. Physical Ground Boundary',
                    desc: 'Detecting boundary shifts, fence encroachments, and discrepancy in area calculations.',
                  },
                  {
                    title: 'Municipal Road Expansion Right-of-Way',
                    desc: 'Checking municipal master plan setbacks to verify exact usable plot area.',
                  },
                  {
                    title: 'Structural Safety & Depreciation',
                    desc: 'For built properties: seismic resilience review, column sizing, and crack propagation assessment.',
                  },
                  {
                    title: 'High-Tension & Environmental Setbacks',
                    desc: 'Screening buffer distances from electrical lines, irrigation canals, and flood zones.',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h5 className="text-xs sm:text-sm font-bold text-navy-950 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Need an Independent Opinion?
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Book an investment advisory briefing with our civil engineers & valuators.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Confidential & Direct</strong>
                    <span className="text-slate-400">
                      Your property requirements, target budgets, and discussions are kept strictly confidential.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">On-Site Field Surveys</strong>
                    <span className="text-slate-400">
                      Our engineers visit the parcel physically with electronic distance meters and GPS mapping tools.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Actionable Written Brief</strong>
                    <span className="text-slate-400">
                      Receive an executive summary covering fair valuation, site risks, and commercial viability.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="accent"
                  className="w-full"
                  size="lg"
                >
                  Schedule Investment Consultation
                </Button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Prefer direct phone conversation? Call{' '}
                  <a href="tel:+9779858420000" className="text-amber-400 font-semibold underline">
                    +977 98584-XXXXX
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive FAQ & Legal Notes */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Property Investment Advisory FAQs"
            subtitle="Clear answers on our role, scope of work, and professional boundaries."
            align="center"
          />

          <div className="space-y-4 mt-8">
            {[
              {
                q: 'Does Kaltade guarantee investment returns or rental yields?',
                a: 'No. Kaltade Engineering Services Pvt. Ltd. does NOT make financial guarantees, promises of capital appreciation, or fixed rental returns. We provide technical, architectural, and property valuation assessments to evaluate whether a property is physically sound, correctly measured, legally compliant in terms of municipal bylaws, and priced realistically relative to market norms.',
              },
              {
                q: 'How does Kaltade differ from traditional property brokers?',
                a: 'Traditional brokers typically work on transaction commissions and may prioritize completing a sale. Kaltade is an engineering and property valuation firm. We evaluate properties through physical survey, cadastral alignment, structural inspection, and mathematical valuation models, providing objective advice without sales pressure.',
              },
              {
                q: 'Can Kaltade verify property ownership titles at the Malpot office?',
                a: 'We review available documentation (Lalpurja, cadastral blueprints, approved municipal drawings, tax receipts) for technical consistency. However, formal legal title search and court dispute checks should be conducted by qualified legal advocates. Our due diligence focuses on physical, engineering, and municipal compliance.',
              },
              {
                q: 'Can Kaltade prepare Detailed Project Reports (DPR) for bank financing?',
                a: 'Yes. For investment projects such as hotels, commercial complexes, cold storage units, or land subdivisions, we prepare comprehensive, bank-compliant DPRs including architectural plans, CapEx costing (BOQ), and multi-year financial modeling.',
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm sm:text-base">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Badge variant="navy" size="md" className="bg-white/10 text-blue-200 border-white/20">
            START YOUR EVALUATION
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Evaluate Your Next Property Investment?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get in touch with Kaltade’s engineering and valuation team for an objective, comprehensive assessment of your target land or building asset.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              size="lg"
              leftIcon={<TrendingUp className="w-4 h-4" />}
            >
              Request Investment Consultation
            </Button>
            <Button
              href="/valuation"
              variant="white"
              size="lg"
              leftIcon={<Scale className="w-4 h-4" />}
            >
              Request Property Valuation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Contact Office
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Office in Dhangadhi, Kailali
            </span>
            <span>•</span>
            <span>Serving Sudurpashchim Province & All Nepal</span>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Investment Consultation"
        subtitle="Provide your target property parameters for professional engineering advisory."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-navy-950">
              Consultation Request Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you for reaching out. Our engineering and property advisory lead will review your specifications and contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Shyam Sundar Chaudhary"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Phone Number (Mobile / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g. +977 98584XXXXX"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. shyam@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Client Profile
                </label>
                <select
                  value={formData.investorType}
                  onChange={(e) =>
                    setFormData({ ...formData, investorType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Individual & Diaspora Investor">Individual / Diaspora Investor</option>
                  <option value="Commercial Business">Commercial Business / Corporate</option>
                  <option value="Property Owner / Inheritor">Property Owner / Landowner</option>
                  <option value="Real Estate Developer">Real Estate Developer / Builder</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Property Asset Interest
                </label>
                <select
                  value={formData.propertyInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyInterest: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Commercial Land">Commercial Land / Highway Plot</option>
                  <option value="Residential Land">Residential Land Plot</option>
                  <option value="Commercial Building / Complex">Commercial Building / Complex</option>
                  <option value="Development Land (Multi-Acre)">Development Land (Multi-Acre / Bigha)</option>
                  <option value="Industrial / Warehouse Property">Industrial / Warehouse Property</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Planned Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetRange: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Under NPR 50 Lakh">Under NPR 50 Lakh</option>
                  <option value="NPR 50 Lakh - 1.5 Crore">NPR 50 Lakh - 1.5 Crore</option>
                  <option value="NPR 1.5 Crore - 3 Crore">NPR 1.5 Crore - 3 Crore</option>
                  <option value="NPR 3 Crore - 7 Crore">NPR 3 Crore - 7 Crore</option>
                  <option value="Above NPR 7 Crore">Above NPR 7 Crore</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Location / Area
                </label>
                <input
                  type="text"
                  value={formData.targetLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, targetLocation: e.target.value })
                  }
                  placeholder="e.g. Dhangadhi Main Road / Attariya / Hasanpur"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Investment Horizon
                </label>
                <select
                  value={formData.timeHorizon}
                  onChange={(e) =>
                    setFormData({ ...formData, timeHorizon: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Immediate Acquisition (Within 1 Month)">Immediate Acquisition (Within 1 Month)</option>
                  <option value="Short Term (1-6 Months)">Short Term (1-6 Months)</option>
                  <option value="Medium Term (6-18 Months)">Medium Term (6-18 Months)</option>
                  <option value="Long Term Strategic Planning">Long Term Strategic Planning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Specific Objectives or Questions
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Mention specific requirements such as road access width, preferred facing, intended construction plans, or existing plot details..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500">
              Note: Information submitted is protected and used solely to schedule your technical consultation.
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Submit Investment Advisory Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
