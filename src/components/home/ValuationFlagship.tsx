'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  FileCheck2,
  MapPin,
  Ruler,
  TrendingUp,
  FileSpreadsheet,
  Building,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Check,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { Modal } from '@/ui/Modal';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';

export function ValuationFlagship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Land & Building',
    location: '',
    approxArea: '',
    purpose: 'Bank Financing / Mortgage',
    message: '',
  });

  const steps = [
    {
      num: '01',
      title: 'Document Review',
      desc: 'Audit of Lalpurja, Cadastral Blueprint (Trace Naksha), municipal building approvals, and tax receipts.',
      icon: FileCheck2,
    },
    {
      num: '02',
      title: 'Site Inspection',
      desc: 'Physical on-site verification of property location, orientation, neighborhood infrastructure, and road access.',
      icon: MapPin,
    },
    {
      num: '03',
      title: 'Measurement & Assessment',
      desc: 'Electronic distance survey of land boundaries, setbacks, building dimensions, and structural depreciation.',
      icon: Ruler,
    },
    {
      num: '04',
      title: 'Market & Technical Analysis',
      desc: 'Cross-referencing verified local transactions, replacement cost formulas, and government minimum valuation tables.',
      icon: TrendingUp,
    },
    {
      num: '05',
      title: 'Professional Valuation Report',
      desc: 'Issuance of comprehensive valuation dossier specifying Fair Market Value, Distress Value, and Government Rates.',
      icon: FileSpreadsheet,
    },
  ];

  const useCases = [
    { label: 'Bank & BFI Financing', desc: 'Required collateral appraisal for commercial and personal loan facilities.' },
    { label: 'Mortgage / Security Assessment', desc: 'Institutional risk evaluation of immovable land and building assets.' },
    { label: 'Property Buying & Selling', desc: 'Objective market valuation to prevent financial loss during transactions.' },
    { label: 'Corporate & Asset Accounting', desc: 'Balance sheet asset revaluation, mergers, and financial audit reports.' },
    { label: 'Investment & Feasibility', desc: 'Pre-acquisition financial return assessment and land development modeling.' },
    { label: 'Dispute & Family Settlement', desc: 'Neutral, mathematically verified asset appraisal for property division.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const newLead = saveLead({
      type: 'Valuation Request',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: `Valuation: ${formData.purpose}`,
      propertyType: formData.propertyType,
      location: formData.location,
      budget: formData.approxArea,
      message: formData.message,
      urgency: 'Standard',
    });

    sendInquiryNotification({
      leadId: newLead.id,
      type: 'Valuation Request',
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
  };

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-dark-bg relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FLAGSHIP DISCIPLINE"
          title="Institutional Property Valuation Methodology"
          subtitle="Accredited engineering assessments bridging technical asset condition, cadastral alignment, and verifiable market data."
          align="center"
        />

        {/* 5-Step Process Cards */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="relative p-6 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/90 dark:border-dark-border flex flex-col justify-between hover:shadow-md dark:hover:shadow-card-dark hover:border-navy-900/30 dark:hover:border-sky-500/30 transition-all group"
                >
                  {/* Step number badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 dark:text-navy-700 group-hover:text-navy-900 dark:group-hover:text-sky-300 transition-colors">
                        {st.num}
                      </span>
                      <div className="p-2 rounded-lg bg-white dark:bg-dark-elevated border border-slate-200 dark:border-dark-border text-navy-900 dark:text-sky-300 group-hover:bg-navy-900 dark:group-hover:bg-navy-800 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-navy-950 dark:text-white mb-2 leading-snug">
                      {st.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-navy-900 dark:bg-navy-700 text-white flex items-center justify-center text-[10px]">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Valuation Applications & Direct CTA Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-navy-950 dark:bg-dark-surface text-white border border-navy-800 dark:border-dark-border">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Landmark className="w-4 h-4" />
              <span>Valuation Applications & Institutional Trust</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Why clients, financial institutions, and investors rely on Kaltade Valuations.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
              {useCases.map((uc) => (
                <div key={uc.label} className="p-3 rounded-xl bg-white/5 dark:bg-dark-elevated/50 border border-white/10 dark:border-dark-border">
                  <strong className="block text-white text-sm font-semibold mb-0.5">
                    {uc.label}
                  </strong>
                  <span className="text-slate-300 dark:text-slate-400">{uc.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-dark-card text-navy-950 dark:text-white p-6 sm:p-8 rounded-2xl shadow-xl dark:shadow-card-dark border border-transparent dark:border-dark-border space-y-4">
            <div className="flex items-center gap-2 text-navy-900 dark:text-white">
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h4 className="text-lg font-bold">Request a Property Valuation</h4>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Initiate a formal valuation inquiry for residential, commercial, or industrial land and buildings. Our valuation engineers will contact you promptly.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>On-site electronic measurement and photography</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Bank-compliant distress and fair market valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Fast turnaround with strict confidential handling</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                className="w-full"
                size="md"
              >
                Start Valuation Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Valuation Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request a Property Valuation"
        subtitle="Please provide property details to start the valuation process."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-navy-950 dark:text-white">
                Valuation Request Received!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Our engineering valuation department has logged your request.
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
              📲 Redirecting to WhatsApp to send your inquiry directly to our team.
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl({
                  leadId: 'VAL-HOME-REQ',
                  type: 'Valuation Request',
                  fullName: formData.fullName,
                  phone: formData.phone,
                  email: formData.email,
                  serviceInterest: `Valuation: ${formData.purpose}`,
                  propertyType: formData.propertyType,
                  location: formData.location,
                  budgetOrArea: formData.approxArea,
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Ramesh Chaudhary"
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
                  placeholder="e.g. ramesh@example.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

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
                  <option value="Land Only">Land Only</option>
                  <option value="Residential Building & Land">Residential Building & Land</option>
                  <option value="Commercial Building / Complex">Commercial Building / Complex</option>
                  <option value="Industrial Land / Factory Shed">Industrial Land / Factory Shed</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Other Immovable Property">Other Immovable Property</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location (Municipality / Ward / Landmark)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Dhangadhi Ward 1, Main Road"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Approximate Land / Built Area
                </label>
                <input
                  type="text"
                  value={formData.approxArea}
                  onChange={(e) =>
                    setFormData({ ...formData, approxArea: e.target.value })
                  }
                  placeholder="e.g. 2 Katha or 4,500 sq.ft."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Valuation Purpose
              </label>
              <select
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              >
                <option value="Bank Financing / Mortgage">Bank Financing / Mortgage Credit</option>
                <option value="Property Buying / Selling">Property Buying / Selling Decision</option>
                <option value="Corporate / Balance Sheet Audit">Corporate / Balance Sheet Audit</option>
                <option value="Family / Settlement Division">Family / Settlement Division</option>
                <option value="Investment Assessment">Investment Assessment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Additional Notes / Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Mention any urgent deadlines, available documents (Lalpurja, Naksha Trace), or specific requests..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:outline-none bg-white dark:bg-dark-card text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">Submit via WhatsApp</Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
