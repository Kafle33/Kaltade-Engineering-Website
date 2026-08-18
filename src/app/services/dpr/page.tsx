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
      desc: 'Topographical site evaluation, civil & structural master planning, utility requirements (water, power, drainage), and technology selection.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Market & Demand Assessment',
      desc: 'Comprehensive market sizing, competitor capacity benchmarking, regional consumer demand analysis, pricing dynamics, and revenue channels.',
      icon: BarChart3,
    },
    {
      step: '04',
      title: 'Project Requirements & Capacity',
      desc: 'Detailed operational resource planning: raw materials, machinery specs, staffing schedules, supply chain logistics, and environmental mandates.',
      icon: Factory,
    },
    {
      step: '05',
      title: 'Cost Estimation & CapEx Breakdown',
      desc: 'Civil construction bill of quantities (BOQ), machinery/equipment procurement costs, pre-operating expenses, working capital, and contingency allocations.',
      icon: Calculator,
    },
    {
      step: '06',
      title: 'Financial Modeling & Projections',
      desc: 'Multi-year financial modeling (5–10 years): projected Profit & Loss statements, Cash Flow forecasts, Balance Sheets, and Debt-Equity structuring.',
      icon: PieChart,
    },
    {
      step: '07',
      title: 'Feasibility & Viability Metrics',
      desc: 'Bankable financial indicators: Internal Rate of Return (IRR), Net Present Value (NPV), Debt Service Coverage Ratio (DSCR), Break-Even Point, and Payback Period.',
      icon: TrendingUp,
    },
    {
      step: '08',
      title: 'Implementation Plan & Risk Framework',
      desc: 'Gantt chart execution milestones, statutory approval sequencing, sensitivity testing under varying revenue scenarios, and operational risk mitigation.',
      icon: ShieldAlert,
    },
  ];

  const targetAudiences = [
    {
      title: 'Hotels, Resorts & Hospitality',
      icon: Hotel,
      tagline: 'Tourism & Accommodations',
      desc: 'Feasibility studies and bankable DPRs for star-category hotels, luxury resorts, conference centers, and highway motels in Western Nepal.',
      metrics: ['Room inventory & occupancy forecasting', 'F&B banquet revenue modeling', 'Service infrastructure & amenities CapEx'],
    },
    {
      title: 'Cold Storage & Agro-Processing',
      icon: Snowflake,
      tagline: 'Agri-Infrastructure & Logistics',
      desc: 'Bankable reports for controlled atmosphere cold storage units, grain silos, seed processing plants, and food packaging industries.',
      metrics: ['Multi-chamber thermal load modeling', 'Government subsidy & concessional loan alignment', 'Seasonal commodity inflow & storage turnover'],
    },
    {
      title: 'Commercial Complexes & Malls',
      icon: Store,
      tagline: 'Retail & Mixed-Use Developments',
      desc: 'Feasibility, footfall modeling, and tenant revenue projections for multi-storey shopping complexes, corporate office towers, and multiplexes.',
      metrics: ['Leaseable area optimization (carpet vs. super built)', 'Rental yield & tenant revenue share models', 'Parking capacity & traffic circulation'],
    },
    {
      title: 'Educational & Healthcare Institutions',
      icon: GraduationCap,
      tagline: 'Social & Institutional Infrastructure',
      desc: 'DPR preparation for private schools, engineering/medical colleges, multi-specialty hospitals, diagnostic centers, and nursing homes.',
      metrics: ['Student enrollment / bed capacity projections', 'Regulatory board & university accreditation standards', 'Medical equipment procurement & CapEx amortization'],
    },
  ];

  const financialIndicators = [
    {
      acronym: 'IRR',
      name: 'Internal Rate of Return',
      desc: 'Demonstrates the annualized return generated by the project, exceeding institutional cost of capital hurdle rates.',
    },
    {
      acronym: 'NPV',
      name: 'Net Present Value',
      desc: 'Calculates discounted future cash flows against initial CapEx to establish net financial value creation.',
    },
    {
      acronym: 'DSCR',
      name: 'Debt Service Coverage Ratio',
      desc: 'Crucial metric for commercial banks verifying that operating cash flows comfortably cover principal and interest repayments.',
    },
    {
      acronym: 'BEP & PBP',
      name: 'Break-Even & Payback Period',
      desc: 'Clear timeline on when initial capital investment is fully recovered and project begins generating net surplus.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-16 sm:py-24 mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/15">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                DPR & FEASIBILITY DIVISION
              </span>
              <Badge variant="warning" size="sm">
                Bankable Reports
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Turn an idea into a viable project.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
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
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-navy-900/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 group-hover:text-navy-900 transition-colors">
                        {ws.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                      {ws.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {ws.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <Badge variant="navy" size="sm">
                        {aud.tagline}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-navy-950">
                      {aud.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {aud.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Specialized DPR Modeling:
                      </h4>
                      {aud.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
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
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              INSTITUTIONAL ACCREDITATION
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Financial Modeling That Satisfies Commercial Banks & BFIs
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-10">
            A project report is only as strong as its underlying financial model. Kaltade structures transparent multi-year financial statements with rigorous debt-servicing indicators expected by loan consortium committees.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialIndicators.map((ind) => (
              <div
                key={ind.acronym}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <span className="text-xl font-mono font-black text-amber-400 block mb-1">
                  {ind.acronym}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">
                  {ind.name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Checklist & CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              Ready to Turn Your Business Idea into a Bankable Project?
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Consult with our DPR specialists, structural engineers, and financial analysts in Dhangadhi. We build thorough reports designed for institutional approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Complete Bound DPR Dossier & Executive Brief</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Full Financial Excel Model & Sensitivity Analysis</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Architectural Master Plan & Preliminary BOQ</span>
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
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 text-base px-6 py-3.5 gap-2.5 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" />
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
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-navy-950">
                DPR Inquiry Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Our project finance and engineering team has received your project summary.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-800 text-center">
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
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
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
                  placeholder="e.g. project@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Project Industry / Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) =>
                    setFormData({ ...formData, sector: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Hospitality / Hotel / Resort">Hotels, Resorts & Hospitality</option>
                  <option value="Cold Storage / Agro-Processing">Cold Storage & Agro-Processing</option>
                  <option value="Commercial Complex / Mall">Commercial Complex / Shopping Mall</option>
                  <option value="Educational / Healthcare Campus">Educational / Healthcare Institution</option>
                  <option value="Industrial / Manufacturing Plant">Industrial / Manufacturing Plant</option>
                  <option value="Other Project">Other Infrastructure / Venture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Proposed Location (District / Municipality)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Attariya Corridor, Kailali"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Estimated Project CapEx (NPR)
                </label>
                <input
                  type="text"
                  value={formData.estimatedBudget}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedBudget: e.target.value })
                  }
                  placeholder="e.g. NPR 5 Crore - 10 Crore"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project Overview & Specific Requirements
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Describe project capacity, land availability, whether bank financing is being sought, timeline..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
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
