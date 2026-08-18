'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  MapPin,
  Ruler,
  Building,
  TrendingUp,
  Scale,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Phone,
  Check,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';

export default function DueDiligencePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyLocation: '',
    propertyType: 'Land Parcel for Acquisition',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const newLead = saveLead({
      type: 'Buyer Requirement',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: 'Property Due Diligence Assessment',
      propertyType: formData.propertyType,
      location: formData.propertyLocation,
      message: formData.message,
      urgency: 'Urgent',
    });

    sendInquiryNotification({
      leadId: newLead.id,
      type: 'Due Diligence Assessment',
      fullName: newLead.fullName,
      phone: newLead.phone,
      email: newLead.email,
      serviceInterest: newLead.serviceInterest,
      propertyType: newLead.propertyType,
      location: newLead.location,
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
        propertyLocation: '',
        propertyType: 'Land Parcel for Acquisition',
        message: '',
      });
    }, 2500);
  };

  const tenChecks = [
    {
      num: '01',
      title: 'Property Identification & Parcel Match',
      desc: 'Confirming the physical site matches the Kitta number (Plot number) on the Lalpurja and Cadastral sheet.',
      icon: MapPin,
    },
    {
      num: '02',
      title: 'Physical Field Inspection',
      desc: 'Direct examination of terrain, natural ground levels, orientation/facing, neighborhood developments, and drainage.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Electronic Field Measurement',
      desc: 'High-precision boundary measurement verifying whether on-ground dimensions match Lalpurja area.',
      icon: Ruler,
    },
    {
      num: '04',
      title: 'Building Structural Assessment',
      desc: 'Inspecting RCC framing integrity, load-bearing walls, crack patterns, built age, and material soundness.',
      icon: Building,
    },
    {
      num: '05',
      title: 'Road Access & Right-of-Way Verification',
      desc: 'Checking municipal road categorization, actual physical width, statutory setbacks, and expansion plans.',
      icon: Layers,
    },
    {
      num: '06',
      title: 'Municipal & Regulatory Document Review',
      desc: 'Review of municipal building approval (Naxa Paas), completion certificate (Nirman Sampanna), and tax receipts.',
      icon: FileCheck2,
    },
    {
      num: '07',
      title: 'Development Potential & Zoning Check',
      desc: 'Analyzing maximum permissible Ground Coverage, Floor Area Ratio (FAR), height limits, and future zoning.',
      icon: TrendingUp,
    },
    {
      num: '08',
      title: 'Technical & Utility Feasibility',
      desc: 'Verifying high-tension power line clearances, river/canal buffer setbacks, and storm water disposal outfalls.',
      icon: Zap,
    },
    {
      num: '09',
      title: 'Engineering Valuation & Price Check',
      desc: 'Calculating fair market value vs government rate (Malpot rate) to ensure you are not overpaying.',
      icon: Scale,
    },
    {
      num: '10',
      title: 'Micro-Market & Liquidity Assessment',
      desc: 'Analyzing recent transactions in the immediate neighborhood to evaluate resale liquidity and rental potential.',
      icon: FileSpreadsheet,
    },
  ];

  const commonRisksPrevented = [
    {
      title: 'Encroachment & Kitta Mismatch',
      desc: 'Buying a plot that is physically different or overlapping neighboring boundaries due to unverified trace maps.',
    },
    {
      title: 'Undisclosed Road Expansion Setbacks',
      desc: 'Losing 3 to 10 meters of valuable frontage to upcoming municipality or highway right-of-way expansions.',
    },
    {
      title: 'Illegal / Unapproved Floor Additions',
      desc: 'Purchasing a building with unapproved floors that cannot be mortgaged or legally transferred.',
    },
    {
      title: 'High-Tension Wire & River Buffer Restrictions',
      desc: 'Parcels rendered unbuildable due to mandatory statutory clearances for electricity corridors or irrigation canals.',
    },
    {
      title: 'Severe Artificial Price Inflation',
      desc: 'Overpaying up to 40% above fair market value due to speculative broker hype without empirical valuation.',
    },
    {
      title: 'Waterlogging & Low-Lying Fill Pitfalls',
      desc: 'Unforeseen land filling and foundation stabilization expenses running into millions of rupees.',
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
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                PRE-PURCHASE RISK AUDIT
              </span>
              <Badge variant="warning" size="sm">
                10-Point Technical Check
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Verify before you invest.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Property purchases in Nepal represent major capital investments. Kaltade conducts comprehensive on-ground technical due diligence, boundary verification, municipal setback audits, and structural inspections before you sign.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                size="lg"
              >
                Request Due Diligence Assessment
              </Button>
              <Button
                href="/valuation"
                variant="white"
                size="lg"
              >
                Property Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* PROMINENT MANDATORY LEGAL DISCLAIMER BANNER */}
        <section className="p-6 sm:p-8 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300/80 dark:border-amber-800/60 shadow-xs text-amber-950 dark:text-amber-300">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-extrabold text-amber-900 dark:text-amber-200 tracking-tight">
                Important Notice on Technical Due Diligence &amp; Legal Title Verification
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-300/90 leading-relaxed font-medium">
                Technical/property due diligence does not replace legal title verification or advice from qualified legal professionals. Legal and government-record verification shall be carried out through the appropriate authorities and professionals.
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                Kaltade Engineering Services Pvt. Ltd. provides physical, structural, setback, Cadastral trace discrepancy, and market valuation assessments. Official land title ownership history, court litigation checks, encumbrances (Rokka/Dharauti), and formal conveyancing should be conducted in coordination with licensed Advocates and the Land Revenue Office (Malpot Karyalaya).
              </p>
            </div>
          </div>
        </section>

        {/* The 10 Technical Checks */}
        <section>
          <SectionHeader
            eyebrow="10-POINT TECHNICAL AUDIT"
            title="What Our Due Diligence Covers"
            subtitle="We thoroughly evaluate 10 critical technical, spatial, and financial parameters before you execute a property purchase."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {tenChecks.map((check) => {
              const Icon = check.icon;
              return (
                <div
                  key={check.num}
                  className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-md hover:border-navy-900/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 dark:text-navy-700 group-hover:text-navy-900 dark:group-hover:text-sky-300 transition-colors">
                        {check.num}
                      </span>
                      <div className="p-2.5 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 dark:text-white mb-2 leading-snug">
                      {check.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {check.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Included in Report</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Common Risks Prevented */}
        <section className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-8 sm:p-12 border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              PROTECTING YOUR CAPITAL
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Costly Property Risks Prevented by Technical Diligence
          </h2>
          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-3xl leading-relaxed mb-10">
            Real estate disputes in Nepal often arise from unverified boundaries, undisclosed municipal setbacks, and unapproved buildings. Here is what our diligence safeguards you against:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonRisksPrevented.map((risk, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border hover:border-amber-400/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center mb-3 font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {risk.title}
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
                  {risk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What You Receive / Deliverables */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark max-w-4xl mx-auto space-y-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            The Technical Due Diligence Deliverable
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upon completing field inspection and document review, you receive a bound and signed Technical Due Diligence Memorandum complete with survey drawings, photographic proof, setback clearance status, and fair market valuation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              size="lg"
            >
              Request Due Diligence Assessment
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

      {/* Due Diligence Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Property Due Diligence"
        subtitle="Provide property details to schedule a field inspection and technical review."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-navy-950 dark:text-white">
                Due Diligence Request Received!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Our engineering team has logged your verification request.
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
              ✉️ Notification sent to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl({
                  leadId: 'DUE-DILIGENCE-REQ',
                  type: 'Due Diligence Assessment',
                  fullName: formData.fullName,
                  phone: formData.phone,
                  email: formData.email,
                  serviceInterest: 'Property Due Diligence Assessment',
                  propertyType: formData.propertyType,
                  location: formData.propertyLocation,
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
                placeholder="e.g. Ramesh Bahadur Singh"
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="e.g. +977 98480XXXXX"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

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
                  placeholder="e.g. ramesh@example.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                >
                  <option value="Land Parcel for Acquisition">Land Parcel for Acquisition</option>
                  <option value="Residential House / Villa">Residential House / Villa</option>
                  <option value="Commercial Building / Complex">Commercial Building / Complex</option>
                  <option value="Industrial / Warehouse Property">Industrial / Warehouse Property</option>
                  <option value="Large Acreage for Plotting">Large Acreage for Plotting</option>
                  <option value="Other Property">Other Property</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Property Location (Ward / Landmark) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.propertyLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyLocation: e.target.value })
                  }
                  placeholder="e.g. Hasanpur, Dhangadhi-5"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Transaction Status &amp; Specific Concerns
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Mention whether negotiation is ongoing, if you suspect boundary discrepancy, road width questions, or need urgent report..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-[11px] text-slate-600 dark:text-slate-300">
              <strong>Notice:</strong> Technical due diligence focuses on physical, engineering, setback, and valuation assessment. Legal title conveyancing is carried out through licensed legal professionals and the Land Revenue Office.
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Submit Due Diligence Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
}
