'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Ruler,
  Compass,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Check,
  Calculator,
  Building2,
  TreePine,
  Sparkles,
  Zap,
  Phone,
  HelpCircle,
  BarChart,
  HardHat,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';
import { sqFtToTeraiUnits, sqFtToHillyUnits, formatAreaSqFt } from '@/lib/utils';

export default function LandDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quick Land Calculator state for landowners
  const [calcInput, setCalcInput] = useState<string>('72900'); // 1 Bigha default
  const [calcUnit, setCalcUnit] = useState<'sqft' | 'katha' | 'bigha' | 'ropani'>('sqft');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    landArea: '',
    landLocation: 'Dhangadhi / Kailali',
    developmentIntent: 'Residential Plotted Subdivision',
    estimatedBudget: 'Under NPR 50 Lakh (Infrastructure)',
    message: '',
  });

  // 9-Step Visual Process (as specified in brief)
  const visualProcess = [
    {
      step: '01',
      title: 'Site',
      short: 'Identification & Perimeter',
      desc: 'Topographical boundary surveying, GPS coordinate mapping, and total station perimeter verification.',
    },
    {
      step: '02',
      title: 'Assessment',
      short: 'Physical & Cadastral Audit',
      desc: 'Cross-verifying Survey Department Cadastral Trace maps (Naksha) with physical field occupation.',
    },
    {
      step: '03',
      title: 'Feasibility',
      short: 'Economic Viability',
      desc: 'Demand modeling, local plot absorption rates, competition benchmarking, and revenue projections.',
    },
    {
      step: '04',
      title: 'Planning',
      short: 'Master Layout & Zoning',
      desc: 'Architectural subdivision design adhering to Nepal National Building Code and municipal plotting bylaws.',
    },
    {
      step: '05',
      title: 'Access',
      short: 'Road Network Design',
      desc: 'Internal road hierarchy planning (20ft, 24ft, 30ft widths) with turning radii and cul-de-sacs.',
    },
    {
      step: '06',
      title: 'Area Utilization',
      short: 'Maximizing Sellable Ratio',
      desc: 'Optimizing geometry to achieve high sellable plot yield (up to 70%+) while reserving mandatory open space.',
    },
    {
      step: '07',
      title: 'Cost Estimation',
      short: 'Infrastructure BOQ',
      desc: 'Accurate Bill of Quantities for earth filling, sub-base graveling, blacktopping, drainage, and electricity.',
    },
    {
      step: '08',
      title: 'DPR',
      short: 'Bankable Project Report',
      desc: 'Detailed Project Report (DPR) formulation for municipal approval and institutional bank financing.',
    },
    {
      step: '09',
      title: 'Engineering Consultancy',
      short: 'Execution Supervision',
      desc: 'On-site civil engineering supervision ensuring roads, storm drains, and utilities match design drawings.',
    },
  ];

  // 10 Detailed Services (as specified in brief)
  const servicesList = [
    {
      title: 'Preliminary Site Assessment',
      icon: Compass,
      desc: 'Initial site walkthrough, elevation survey, natural drainage slope analysis, and high-tension line screening.',
    },
    {
      title: 'Land Development Feasibility Studies',
      icon: TrendingUp,
      desc: 'Micro-market demand evaluation, pricing benchmarking, and financial IRR modeling across multi-phase sales.',
    },
    {
      title: 'Site Planning & Master Layout Design',
      icon: Layers,
      desc: 'Comprehensive architectural master planning balancing plot dimensions, aspect orientation, and public greens.',
    },
    {
      title: 'Access & Road Network Assessment',
      icon: MapPin,
      desc: 'Municipal right-of-way connectivity planning, internal road cross-sections, and heavy vehicle turning geometry.',
    },
    {
      title: 'Area Utilization & Yield Optimization',
      icon: Calculator,
      desc: 'Mathematical geometry modeling to convert maximum land area into prime marketable frontages without dead spaces.',
    },
    {
      title: 'Development Potential Evaluation',
      icon: Building2,
      desc: 'Analyzing municipal Ground Coverage (GC), Floor Area Ratio (FAR), and building typology allowances per plot.',
    },
    {
      title: 'Infrastructure Cost Estimation & BOQ',
      icon: FileSpreadsheet,
      desc: 'Exhaustive Bill of Quantities for site levelling, road construction, RCC box culverts, and electrical poles.',
    },
    {
      title: 'Feasibility Studies & Market Validation',
      icon: BarChart,
      desc: 'Competitive supply pipeline auditing, target buyer persona profiling, and phased cash flow forecasting.',
    },
    {
      title: 'Detailed Project Report (DPR) Preparation',
      icon: ShieldCheck,
      desc: 'Bankable DPR dossier complete with municipal compliance schedules and bank consortium loan presentations.',
    },
    {
      title: 'Civil & Structural Engineering Consultancy',
      icon: HardHat,
      desc: 'Engineering oversight for retaining walls, stormwater drainage outfalls, soil stabilization, and quality control.',
    },
  ];

  // Calculate Sq.Ft based on input & unit
  const parseAreaInputToSqFt = (val: string, unit: string): number => {
    const num = parseFloat(val) || 0;
    if (unit === 'sqft') return num;
    if (unit === 'katha') return num * 3645;
    if (unit === 'bigha') return num * 72900;
    if (unit === 'ropani') return num * 5476;
    return num;
  };

  const calculatedSqFt = parseAreaInputToSqFt(calcInput, calcUnit);
  const teraiResult = sqFtToTeraiUnits(calculatedSqFt);
  const hillyResult = sqFtToHillyUnits(calculatedSqFt);

  // Estimated sellable yield (~70% benchmark in well-planned layouts)
  const estimatedSellableArea = Math.round(calculatedSqFt * 0.7);
  const estimatedPlots = Math.max(1, Math.floor(estimatedSellableArea / 3645)); // ~1 Katha average plot size

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const newLead = saveLead({
      type: 'Buyer Requirement',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: 'Land Development Consultancy',
      propertyType: 'Development Land / Acreage',
      location: formData.landLocation,
      budget: formData.landArea,
      message: `[Intent: ${formData.developmentIntent}] [Est Budget: ${formData.estimatedBudget}] ${formData.message}`,
      urgency: 'Standard',
    });

    sendInquiryNotification({
      leadId: newLead.id,
      type: 'Land Development Inquiry',
      fullName: newLead.fullName,
      phone: newLead.phone,
      email: newLead.email,
      serviceInterest: newLead.serviceInterest,
      propertyType: newLead.propertyType,
      location: newLead.location,
      budgetOrArea: newLead.budget,
      message: newLead.message,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        landArea: '',
        landLocation: 'Dhangadhi / Kailali',
        developmentIntent: 'Residential Plotted Subdivision',
        estimatedBudget: 'Under NPR 50 Lakh (Infrastructure)',
        message: '',
      });
    }, 2500);
  };

  return (
    <div className="pt-28 sm:pt-32 bg-white dark:bg-dark-bg min-h-screen text-navy-950 dark:text-dark-text transition-colors">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 dark:from-dark-surface dark:via-dark-card dark:to-dark-surface text-white py-16 sm:py-24 relative overflow-hidden border-b border-navy-800 dark:border-dark-border">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-blue-200/80 dark:text-sky-300/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-amber-400">Land Development</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 dark:bg-dark-elevated text-blue-200 dark:text-sky-300 border border-white/15 dark:border-dark-border text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Master Planning &amp; Subdivision Engineering
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Maximize land value through intelligent planning.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Transform raw acreage and agricultural land parcels into high-yield, legally compliant, and beautifully engineered residential or commercial subdivisions in Dhangadhi, Kailali, and across Nepal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                size="lg"
                leftIcon={<Compass className="w-4 h-4" />}
              >
                Request Land Development Consultation
              </Button>
              <Button
                href="/projects"
                variant="outline"
                size="lg"
                className="bg-white/10 dark:bg-dark-card text-white border-white/20 dark:border-dark-border hover:bg-white/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Subdivision Projects
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 dark:border-dark-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">Municipal Bylaw Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">70%+ Sellable Ratio Target</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400 dark:text-sky-400 shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">Bankable DPR &amp; BOQ</span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">Civil Engineering Oversight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual 9-Step Process */}
      <section className="py-20 sm:py-28 bg-slate-50 dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="END-TO-END METHODOLOGY"
            title="The 9-Stage Land Development Lifecycle"
            subtitle="From raw site inspection to master layout approval and infrastructure execution, we engineer every meter for peak valuation."
            align="center"
          />

          {/* Process Flow Overview Ribbon */}
          <div className="mb-12 p-4 rounded-2xl bg-navy-950 dark:bg-dark-surface text-white border border-navy-800 dark:border-dark-border shadow-md flex items-center justify-between text-[11px] sm:text-xs font-bold overflow-x-auto whitespace-nowrap gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-600 text-white">1. Site</span>
            <span>→</span>
            <span>2. Assessment</span>
            <span>→</span>
            <span>3. Feasibility</span>
            <span>→</span>
            <span>4. Planning</span>
            <span>→</span>
            <span>5. Access</span>
            <span>→</span>
            <span>6. Area Utilization</span>
            <span>→</span>
            <span>7. Cost Estimation</span>
            <span>→</span>
            <span>8. DPR</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-emerald-600 text-white">9. Engineering Consultancy</span>
          </div>

          {/* 9 Process Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualProcess.map((item, index) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-xl dark:hover:shadow-card-dark-hover hover:border-navy-900/30 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-navy-300 dark:text-navy-700 group-hover:text-navy-900 dark:group-hover:text-sky-300 transition-colors">
                      {item.step}
                    </span>
                    <Badge variant="navy" size="sm">
                      Stage {index + 1}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                      {item.short}
                    </span>
                    <h3 className="text-xl font-bold text-navy-950 dark:text-white mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs font-semibold text-navy-800 dark:text-sky-400">
                  <span className="text-slate-400 dark:text-slate-500">Phase {index + 1} of 9</span>
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Comprehensive 10 Core Services */}
      <section className="py-20 sm:py-28 bg-white dark:bg-dark-card border-b border-slate-200/80 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="SPECIALIZED CAPABILITIES"
            title="Our Land Development Services"
            subtitle="Full-spectrum technical and advisory solutions engineered to convert raw acreage into profitable plotted communities."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {servicesList.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border hover:border-navy-900/30 dark:hover:border-sky-500/40 hover:shadow-lg dark:hover:shadow-card-dark-hover transition-all flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-navy-900 dark:text-white shadow-xs shrink-0 group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white mb-1.5">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Land Area & Plotting Yield Estimator */}
      <section className="py-20 sm:py-28 bg-navy-950 dark:bg-dark-surface text-white relative overflow-hidden border-b border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Calculator className="w-4 h-4" />
                <span>Subdivision Yield Estimator</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Estimate the Plot Potential of Your Land Parcel.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
                Enter your total land parcel area below. See instant conversion across Terai units (Bigha-Katha-Dhur), Hilly units (Ropani-Aana), and estimated plotted subdivision yield.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Enter Land Area Value
                    </label>
                    <input
                      type="number"
                      value={calcInput}
                      onChange={(e) => setCalcInput(e.target.value)}
                      placeholder="e.g. 72900"
                      className="w-full px-3 py-2.5 rounded-lg bg-navy-900 dark:bg-dark-surface border border-white/20 dark:border-dark-border text-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Select Unit
                    </label>
                    <select
                      value={calcUnit}
                      onChange={(e) => setCalcUnit(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-lg bg-navy-900 dark:bg-dark-surface border border-white/20 dark:border-dark-border text-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-semibold cursor-pointer"
                    >
                      <option value="sqft">Square Feet (sq.ft.)</option>
                      <option value="katha">Katha (3,645 sq.ft.)</option>
                      <option value="bigha">Bigha (72,900 sq.ft.)</option>
                      <option value="ropani">Ropani (5,476 sq.ft.)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400">
                  Total computed area: <strong className="text-white font-mono">{formatAreaSqFt(calculatedSqFt)}</strong>
                </div>
              </div>
            </div>

            {/* Live Estimation Output Card */}
            <div className="lg:col-span-6 bg-white dark:bg-dark-card text-navy-950 dark:text-white p-8 rounded-3xl shadow-2xl dark:shadow-card-dark border border-slate-200 dark:border-dark-border space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-border pb-4">
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  Subdivision Modeling Output
                </h3>
                <Badge variant="navy" size="sm">
                  Preliminary Metric
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                  <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    Terai Units (Dhangadhi/Kailali)
                  </span>
                  <span className="text-base sm:text-lg font-black text-navy-950 dark:text-white mt-1 block">
                    {teraiResult.label}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border">
                  <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    Hilly Units (Kathmandu/Hills)
                  </span>
                  <span className="text-base sm:text-lg font-black text-navy-950 dark:text-white mt-1 block">
                    {hillyResult.label}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                    Est. Sellable Plot Area (~70% ratio)
                  </span>
                  <span className="font-mono text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {formatAreaSqFt(estimatedSellableArea)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                    Est. Residential Plots (~1 Katha each)
                  </span>
                  <span className="font-mono text-base font-black text-amber-900 dark:text-amber-300">
                    ~{estimatedPlots} Plots
                  </span>
                </div>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 pt-1 leading-snug">
                  *Assumes 30% area allocation for 20-24ft internal roads, drainage corridors, and municipal open green space.
                </p>
              </div>

              <Button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    landArea: `${calcInput} ${calcUnit} (${teraiResult.label})`,
                  }));
                  setIsModalOpen(true);
                }}
                variant="primary"
                className="w-full"
                size="lg"
              >
                Request Master Plan for this Parcel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Case Study Highlight */}
      <section className="py-20 sm:py-28 bg-white dark:bg-dark-card border-b border-slate-200/80 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-3 py-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Subdivision Case Study</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
                  8-Bigha Residential Subdivision Master Plan (Kailali District)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Kaltade provided full-phase topographical contour surveying, plotted subdivision layout design, internal road network modeling (24ft primary &amp; 20ft secondary), and stormwater drainage engineering for an 8-Bigha raw parcel.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">Total Area</span>
                    <strong className="text-sm font-bold text-navy-950 dark:text-white">8 Bigha (5.83L sqft)</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">Plot Yield</span>
                    <strong className="text-sm font-bold text-navy-950 dark:text-white">64 Residential Plots</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border text-center">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">Sellable Efficiency</span>
                    <strong className="text-sm font-bold text-emerald-700 dark:text-emerald-400">72% Net Sellable</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border space-y-3 shadow-xs">
                  <h4 className="text-sm font-bold text-navy-950 dark:text-white">
                    Services Delivered in Project:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Total Station boundary &amp; contour survey</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Municipal plotting bylaw compliance dossier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Culvert drainage &amp; road cross-section engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Infrastructure BOQ &amp; phasing budget</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      variant="primary"
                      className="w-full"
                      size="sm"
                    >
                      Inquire About Subdivision Planning
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="py-20 sm:py-28 bg-navy-950 dark:bg-dark-surface text-white relative overflow-hidden border-t border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Badge variant="navy" size="md" className="bg-white/10 dark:bg-dark-elevated text-blue-200 dark:text-sky-300 border-white/20 dark:border-dark-border">
            LANDOWNERS &amp; DEVELOPERS
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Unlock the Peak Potential of Your Land.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Contact Kaltade Engineering Services today to discuss preliminary site assessments, subdivision master plans, and feasibility studies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              size="lg"
              leftIcon={<Compass className="w-4 h-4" />}
            >
              Request Land Development Consultation
            </Button>
            <Button
              href="/services/dpr"
              variant="white"
              size="lg"
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              Explore DPR Preparation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="bg-white/10 dark:bg-dark-card text-white border-white/20 dark:border-dark-border hover:bg-white/20"
            >
              Contact Dhangadhi Office
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Land Development Consultation"
        subtitle="Submit your parcel specifications for an engineered master planning consultation."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-navy-950 dark:text-white">
                Consultation Request Received!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Our land development and survey engineers will review your parcel details.
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
              📲 Redirecting to WhatsApp to send your inquiry directly to our team.
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl({
                  leadId: 'LAND-DEV-REQ',
                  type: 'Land Development Consultancy',
                  fullName: formData.fullName,
                  phone: formData.phone,
                  email: formData.email,
                  serviceInterest: 'Land Development Consultancy',
                  propertyType: 'Development Land / Acreage',
                  location: formData.landLocation,
                  budgetOrArea: formData.landArea,
                  message: `[Intent: ${formData.developmentIntent}] [Est Budget: ${formData.estimatedBudget}] ${formData.message}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-elevated text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Bikash Rana"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. bikash@example.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Total Land Area
                </label>
                <input
                  type="text"
                  value={formData.landArea}
                  onChange={(e) =>
                    setFormData({ ...formData, landArea: e.target.value })
                  }
                  placeholder="e.g. 4 Bigha or 10 Katha"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Land Location / Municipality
                </label>
                <input
                  type="text"
                  value={formData.landLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, landLocation: e.target.value })
                  }
                  placeholder="e.g. Dhangadhi Ward 7 / Attariya / Godawari"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Development Intent
                </label>
                <select
                  value={formData.developmentIntent}
                  onChange={(e) =>
                    setFormData({ ...formData, developmentIntent: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                >
                  <option value="Residential Plotted Subdivision">Residential Plotted Subdivision</option>
                  <option value="Commercial Land Subdivision">Commercial Land Subdivision</option>
                  <option value="Industrial / Warehouse Park">Industrial / Warehouse Park</option>
                  <option value="Mixed-Use Integrated Township">Mixed-Use Integrated Township</option>
                  <option value="Preliminary Site & Bylaw Audit Only">Preliminary Site &amp; Bylaw Audit Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Infrastructure Budget
              </label>
              <select
                value={formData.estimatedBudget}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedBudget: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              >
                <option value="Under NPR 50 Lakh">Under NPR 50 Lakh</option>
                <option value="NPR 50 Lakh - 1.5 Crore">NPR 50 Lakh - 1.5 Crore</option>
                <option value="NPR 1.5 Crore - 3 Crore">NPR 1.5 Crore - 3 Crore</option>
                <option value="Above NPR 3 Crore">Above NPR 3 Crore</option>
                <option value="To Be Determined Based on Feasibility">To Be Determined Based on Feasibility</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Specifics or Current Status
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Mention current land state (agricultural, vacant, filled), existing road access width, available Cadastral Trace map (Naksha), or target completion timeline..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Submit Land Development Inquiry
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
