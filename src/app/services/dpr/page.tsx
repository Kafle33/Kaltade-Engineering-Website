'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  TrendingUp,
  Landmark,
  Building,
  CheckCircle2,
  ArrowRight,
  Calculator,
  PieChart,
  ShieldAlert,
  Calendar,
  Layers,
  Sparkles,
  Hotel,
  Snowflake,
  GraduationCap,
  Store,
  Factory,
  BarChart3,
  Coins,
  Check,
  Phone,
  FileCheck2,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';

export default function DPRPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    sector: 'Hospitality / Hotel / Resort',
    location: '',
    estimatedBudget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const newLead = saveLead({
      type: 'DPR Consultation',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: `DPR: ${formData.sector}`,
      propertyType: formData.sector,
      location: formData.location,
      budget: formData.estimatedBudget,
      message: formData.message,
      urgency: 'Standard',
    });

    sendInquiryNotification({
      leadId: newLead.id,
      type: 'DPR Consultation',
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
        sector: 'Hospitality / Hotel / Resort',
        location: '',
        estimatedBudget: '',
        message: '',
      });
    }, 2500);
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Project Concept & Objectives',
      desc: 'Defining core project objectives, target operational capacity, project location rationale, promoter profiles, and strategic market fit.',
      icon: Sparkles,
    },
    {
      step: '02',
      title: 'Technical & Engineering Analysis',
      desc: 'Architectural planning, structural specifications, civil engineering, machinery sizing, utility loads (water/power), and environmental safeguards.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Market & Demand Assessment',
      desc: 'Micro and macro market trends, competitive benchmarking, catchment demographics, pricing elasticity, and target customer segmentation.',
      icon: TrendingUp,
    },
    {
      step: '04',
      title: 'Cost Estimation & CapEx Budgeting',
      desc: 'Exhaustive Bill of Quantities (BOQ), civil construction estimates, equipment procurement costs, and pre-operational interest calculation.',
      icon: Calculator,
    },
    {
      step: '05',
      title: 'Financial Modeling & Projections',
      desc: '10-year projected financial statements (Balance Sheet, P&L, Cash Flow), debt amortization schedules, DSCR, IRR, NPV, and payback periods.',
      icon: BarChart3,
    },
    {
      step: '06',
      title: 'Feasibility & Viability Analysis',
      desc: 'Calculation of Break-Even Point (BEP), Return on Capital Employed (ROCE), sensitivity testing against cost overruns or revenue drops.',
      icon: PieChart,
    },
    {
      step: '07',
      title: 'Implementation & Procurement Plan',
      desc: 'Gantt-chart milestone schedule, civil execution phases, vendor contracting strategy, and commercial operations date (COD) targets.',
      icon: Calendar,
    },
    {
      step: '08',
      title: 'Risk Considerations & Mitigation',
      desc: 'Identification of technical, statutory, financial, and operational risks paired with concrete risk mitigation frameworks for bank credit committees.',
      icon: ShieldAlert,
    },
  ];

  const targetAudiences = [
    {
      title: 'Hotels, Resorts & Hospitality',
      tagline: 'Tourism & Leisure Infrastructure',
      icon: Hotel,
      desc: 'Comprehensive project reports for boutique hotels, highway resort complexes, banquet centers, and eco-lodges across Nepal.',
      metrics: [
        'Average Daily Rate (ADR) and Revenue Per Available Room (RevPAR) modeling',
        'Kitchen, MEP, and hospitality architectural zoning',
        'Occupancy rate sensitivity and seasonal cash flow buffers',
        'Consortium bank loan syndication documentation',
      ],
    },
    {
      title: 'Cold Storage & Agro-Processing',
      tagline: 'Agricultural Value-Chain Facilities',
      icon: Snowflake,
      desc: 'Technical and economic feasibility modeling for multi-chamber cold stores, grain silos, seed processing, and fruit/vegetable preservation units.',
      metrics: [
        'Insulation engineering and refrigeration power load calculations',
        'Catchment harvest yield and storage utilization cycles',
        'Government subsidy / interest grant alignment modeling',
        'Preservation loss minimization and revenue stream optimization',
      ],
    },
    {
      title: 'Commercial Complexes & Shopping Centers',
      tagline: 'Retail & Office Urban Hubs',
      icon: Store,
      desc: 'DPRs for multi-storey commercial towers, mixed-use retail/office hubs, and showroom parks in emerging urban corridors.',
      metrics: [
        'Leasable area efficiency and anchor tenant yield modeling',
        'Basement parking structural design and traffic flow analysis',
        'NBC-compliant fire safety and egress system integration',
        'Escalating rental cash flow and commercial valuation modeling',
      ],
    },
    {
      title: 'Educational & Healthcare Institutions',
      tagline: 'Social & Medical Infrastructure',
      icon: GraduationCap,
      desc: 'Feasibility studies and project reports for private hospitals, diagnostic centers, schools, colleges, and technical training institutes.',
      metrics: [
        'Statutory bed-capacity norms and medical zoning compliance',
        'Biomedical waste management and structural vibration safety',
        'Fee structure modeling, operational overheads, and student intake curves',
        'Long-term institutional expansion master planning',
      ],
    },
  ];

  const financialIndicators = [
    {
      acronym: 'DSCR',
      name: 'Debt Service Coverage Ratio',
      desc: 'Demonstrating ample operating cash flow to service principal and interest obligations with bank-mandated safety cushions.',
    },
    {
      acronym: 'IRR',
      name: 'Internal Rate of Return',
      desc: 'Evaluating project hurdle rates to prove capital efficiency across promoter equity and debt tranches.',
    },
    {
      acronym: 'NPV',
      name: 'Net Present Value',
      desc: 'Discounted multi-year cash flows calculated against weighted average cost of capital (WACC) to establish positive economic value.',
    },
    {
      acronym: 'BEP',
      name: 'Break-Even Point Analysis',
      desc: 'Precise capacity threshold modeling establishing the exact operational level needed to clear fixed and variable costs.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-20 transition-colors">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-950 dark:bg-dark-surface text-white py-16 sm:py-24 mb-16 border-b border-navy-800 dark:border-dark-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 dark:bg-dark-elevated text-blue-200 dark:text-sky-300 border border-white/15 dark:border-dark-border">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                DPR &amp; FEASIBILITY DIVISION
              </span>
              <Badge variant="warning" size="sm">
                Bankable Reports
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Turn an idea into a viable project.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Bankable Detailed Project Reports (DPR), rigorous financial viability modeling, and technical feasibility studies engineered to secure loan syndication, private equity, and institutional approvals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                size="lg"
              >
                Request DPR Consultation
              </Button>
              <Button
                href="/valuation"
                variant="white"
                size="lg"
              >
                Property Valuation Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* 8-Step DPR Workflow */}
        <section>
          <SectionHeader
            eyebrow="SYSTEMATIC METHODOLOGY"
            title="The 8-Step DPR Workflow"
            subtitle="Our end-to-end process transforms high-level concepts into bank-compliant, technically validated feasibility documents."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {workflowSteps.map((ws) => {
              const Icon = ws.icon;
              return (
                <div
                  key={ws.step}
                  className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-md hover:border-navy-900/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 dark:text-navy-700 group-hover:text-navy-900 dark:group-hover:text-sky-300 transition-colors">
                        {ws.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 dark:text-white mb-2 leading-snug">
                      {ws.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {ws.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center gap-1 text-[11px] font-semibold text-navy-800 dark:text-sky-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Target Audiences / Industry Verticals */}
        <section>
          <SectionHeader
            eyebrow="INDUSTRY VERTICALS"
            title="DPR Solutions Tailored for Key Sectors"
            subtitle="We develop domain-specific Detailed Project Reports for commercial ventures, industrial infrastructure, and institutional developers."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {targetAudiences.map((aud, idx) => {
              const Icon = aud.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-lg dark:hover:shadow-card-dark-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border flex items-center justify-center">
                        <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <Badge variant="navy" size="sm">
                        {aud.tagline}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                      {aud.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {aud.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-dark-border space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Specialized DPR Modeling:
                      </h4>
                      {aud.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-dark-border">
                    <Button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, sector: aud.title }));
                        setIsModalOpen(true);
                      }}
                      variant="secondary"
                      size="sm"
                      className="w-full justify-between"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Request DPR for this Sector
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bankable Financial Metrics Banner */}
        <section className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-8 sm:p-12 border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              INSTITUTIONAL ACCREDITATION
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Financial Modeling That Satisfies Commercial Banks &amp; BFIs
          </h2>
          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-3xl leading-relaxed mb-10">
            A project report is only as strong as its underlying financial model. Kaltade structures transparent multi-year financial statements with rigorous debt-servicing indicators expected by loan consortium committees.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialIndicators.map((ind) => (
              <div
                key={ind.acronym}
                className="p-5 rounded-2xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border hover:border-amber-400/40 transition-colors"
              >
                <span className="text-xl font-mono font-black text-amber-400 block mb-1">
                  {ind.acronym}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">
                  {ind.name}
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Checklist & CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
              Ready to Turn Your Business Idea into a Bankable Project?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Consult with our DPR specialists, structural engineers, and financial analysts in Dhangadhi. We build thorough reports designed for institutional approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Complete Bound DPR Dossier &amp; Executive Brief</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Full Financial Excel Model &amp; Sensitivity Analysis</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Architectural Master Plan &amp; Preliminary BOQ</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              size="lg"
            >
              Request DPR Consultation
            </Button>
            <a
              href="tel:+9779858425256"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-elevated text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-card text-base px-6 py-3.5 gap-2.5 shadow-xs"
            >
              <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Call +977-9858425256</span>
            </a>
          </div>
        </section>
      </div>

      {/* DPR Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request DPR & Feasibility Consultation"
        subtitle="Provide project parameters to arrange a consultation with our DPR team."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-navy-950 dark:text-white">
                DPR Inquiry Received!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Our project finance and engineering team has received your project summary.
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
              ✉️ Notification sent to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl({
                  leadId: 'DPR-REQ',
                  type: 'DPR Consultation',
                  fullName: formData.fullName,
                  phone: formData.phone,
                  email: formData.email,
                  serviceInterest: `DPR: ${formData.sector}`,
                  propertyType: formData.sector,
                  location: formData.location,
                  budgetOrArea: formData.estimatedBudget,
                  message: formData.message,
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
                  Full Name / Promoter Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Ganga Ram Joshi"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g. +977 98587XXXXX"
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
                  placeholder="e.g. project@example.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Industry / Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) =>
                    setFormData({ ...formData, sector: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                >
                  <option value="Hospitality / Hotel / Resort">Hotels, Resorts &amp; Hospitality</option>
                  <option value="Cold Storage / Agro-Processing">Cold Storage &amp; Agro-Processing</option>
                  <option value="Commercial Complex / Mall">Commercial Complex / Shopping Mall</option>
                  <option value="Educational / Healthcare Campus">Educational / Healthcare Institution</option>
                  <option value="Industrial / Manufacturing Plant">Industrial / Manufacturing Plant</option>
                  <option value="Other Project">Other Infrastructure / Venture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Proposed Location (District / Municipality)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Attariya Corridor, Kailali"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Project CapEx (NPR)
                </label>
                <input
                  type="text"
                  value={formData.estimatedBudget}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedBudget: e.target.value })
                  }
                  placeholder="e.g. NPR 5 Crore - 10 Crore"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Overview &amp; Specific Requirements
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Describe project capacity, land availability, whether bank financing is being sought, timeline..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Submit DPR Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
}
