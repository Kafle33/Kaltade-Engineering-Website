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
  CheckCircle2,
  Coins,
  Warehouse,
  Home,
  Store,
  Tractor,
  Layers,
  Phone,
  MessageSquare,
  AlertCircle,
  FileText,
  Clock,
  Check,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';

export default function ValuationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential Land & Building',
    location: '',
    approxArea: '',
    purpose: 'Bank Financing / Mortgage Credit',
    message: '',
  });

  const methodologySteps = [
    {
      step: '01',
      title: 'Document Review & Legal Title Screening',
      desc: 'Thorough scrutiny of Lalpurja (Land Ownership Certificate), Cadastral Blueprint (Trace Naksha), municipal approved drawings, building completion certificates, and land tax receipts.',
      icon: FileCheck2,
    },
    {
      step: '02',
      title: 'On-Site Field Inspection & Boundary Check',
      desc: 'Physical field visit to cross-verify site coordinates, actual orientation, four boundaries (Charkilla), surrounding neighborhood developments, and municipal road right-of-way.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Electronic Measurement & Depreciation Audit',
      desc: 'Precision electronic distance measurement of plot frontage, depth, building plinth area, floor-wise dimensions, structural framing condition, and scientific age depreciation calculation.',
      icon: Ruler,
    },
    {
      step: '04',
      title: 'Market Analysis & Government Benchmark Comparison',
      desc: 'Rigorous comparative analysis combining prevailing real market transactions, official government minimum valuation rates (Malpot rates), and replacement cost formulas.',
      icon: TrendingUp,
    },
    {
      step: '05',
      title: 'Formal Engineering Valuation Report & Certification',
      desc: 'Issuance of the authoritative valuation dossier specifying Fair Market Value (FMV), Distress Value (DV), and Government Value, accompanied by site photography and engineer certification.',
      icon: FileSpreadsheet,
    },
  ];

  const propertyTypes = [
    {
      title: 'Land Parcels',
      icon: Layers,
      types: ['Residential Plots', 'Commercial Land', 'Development Land', 'Agricultural Acreage'],
      desc: 'Boundary assessment, frontage-to-depth ratio analysis, access road right-of-way evaluation, and elevation / flood risk inspection.',
    },
    {
      title: 'Residential Buildings',
      icon: Home,
      types: ['Independent Houses', 'Villas', 'Residential Apartments', 'Housing Colonies'],
      desc: 'RCC structural frame evaluation, plinth area calculation, architectural finish grading, and depreciation based on building age.',
    },
    {
      title: 'Commercial Assets',
      icon: Store,
      types: ['Commercial Complexes', 'Shopping Centers', 'Office Towers', 'Hotels & Motels'],
      desc: 'Rental yield appraisal, capitalized income approach, tenant layout efficiency, and commercial corridor footfall value.',
    },
    {
      title: 'Industrial & Warehouses',
      icon: Warehouse,
      types: ['Industrial Factory Sheds', 'Logistics Depots', 'Cold Storage Plants', 'Processing Mills'],
      desc: 'Heavy structural steel appraisal, ceiling height clearance, three-phase power infrastructure, and transport logistics access.',
    },
    {
      title: 'Agricultural & Agro-Industrial',
      icon: Tractor,
      types: ['Farming Land Parcels', 'Fishery Farms', 'Orchards', 'Agro-processing sites'],
      desc: 'Soil fertility, road connectivity, irrigation canal proximity, and long-term land conversion potential.',
    },
  ];

  const valuationApplications = [
    {
      title: 'Bank Financing & Mortgage Credit',
      icon: Landmark,
      desc: 'Mandatory collateral valuation accepted by Commercial Banks, Development Banks, and BFIs for loan sanctioning and credit limits.',
    },
    {
      title: 'Property Transactions (Buy / Sell)',
      icon: Coins,
      desc: 'Objective third-party fair market valuation ensuring buyers do not overpay and sellers do not underestimate asset value.',
    },
    {
      title: 'Corporate Balance Sheets & Audits',
      icon: FileText,
      desc: 'Asset revaluation for corporate reporting, statutory financial audits, mergers, acquisitions, and asset transfer compliance.',
    },
    {
      title: 'Investment & Feasibility Appraisals',
      icon: TrendingUp,
      desc: 'Pre-acquisition financial assessment to benchmark expected return on investment (ROI) and development viability.',
    },
    {
      title: 'Family Settlement & Partition',
      icon: Scale,
      desc: 'Neutral, mathematically verified asset appraisal providing equitable division for family inheritances and legal settlements.',
    },
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

    setCreatedLeadId(newLead.id);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCreatedLeadId('');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyType: 'Residential Land & Building',
      location: '',
      approxArea: '',
      purpose: 'Bank Financing / Mortgage Credit',
      message: '',
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 sm:pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-16 sm:py-24 mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/15">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                FLAGSHIP DISCIPLINE
              </span>
              <Badge variant="warning" size="sm">
                Bank Accepted
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Authoritative Property Valuation & Asset Assessment
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Know what your property is truly worth. Standardized, bankable engineering valuations for land, residential, commercial, and industrial assets across Dhangadhi, Kailali, and throughout Nepal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#request-valuation"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-amber-600 text-white hover:bg-amber-700 text-base px-6 py-3.5 gap-2.5 shadow-sm hover:shadow-md"
              >
                Submit Valuation Request
              </a>
              <Button href="/contact" variant="white" size="lg">
                Contact Our Evaluators
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* The 5-Step Methodology */}
        <section>
          <SectionHeader
            eyebrow="STANDARDIZED METHODOLOGY"
            title="The 5-Step Engineering Valuation Process"
            subtitle="Every valuation report prepared by Kaltade follows strict institutional appraisal protocols to ensure unquestionable bank acceptance and legal defensibility."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {methodologySteps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-navy-900/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300 group-hover:text-navy-900 transition-colors">
                        {st.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {st.desc}
                    </p>
                  </div>

                  {idx < methodologySteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-bold">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Property Types Covered */}
        <section>
          <SectionHeader
            eyebrow="VALUATION ASSET CLASSES"
            title="Property Types We Assess"
            subtitle="Our valuation engineers are qualified to assess diverse classes of immovable real estate across urban, semi-urban, and agricultural sectors."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {propertyTypes.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>

                    <h3 className="text-lg font-bold text-navy-950">
                      {pt.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pt.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {pt.types.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Valuation Applications */}
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              PURPOSES & APPLICATIONS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Institutional Applications of Kaltade Valuations
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-10">
            Our valuation dossiers are meticulously structured to satisfy the credit review boards of Nepal’s commercial banks, corporate audit standards, and court proceedings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuationApplications.map((app, idx) => {
              const Icon = app.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {app.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Valuation Request Form & Legal Note */}
        <section id="request-valuation" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Instructions & Legal Note */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                eyebrow="FAST-TRACK REQUEST"
                title="Initiate a Valuation Assessment"
                subtitle="Fill out the property particulars below. Our valuation team will review the submitted details and contact you to coordinate document collection and on-site inspection."
                align="left"
              />

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>Documents to Keep Ready:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-900 mt-1.5 shrink-0" />
                      <span>Land Ownership Certificate (Lalpurja) photocopy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-900 mt-1.5 shrink-0" />
                      <span>Cadastral Blueprint Map (Napi Trace / Naksha)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-900 mt-1.5 shrink-0" />
                      <span>Municipal Building Permit & Approved Drawing (if built)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-navy-900 mt-1.5 shrink-0" />
                      <span>Latest Land Tax / Property Tax Receipt (Tiro Tireko Rasid)</span>
                    </li>
                  </ul>
                </div>

                {/* Important Legal Note */}
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Professional Engineering Assessment Notice</span>
                  </div>
                  <p className="leading-relaxed text-amber-900/90">
                    Property valuations issued by Kaltade Engineering Services Pvt. Ltd. represent independent professional engineering evaluations based on physical inspection, structural depreciation formulas, municipal records, and empirical market transactions at the date of inspection. Valuations do not constitute a commercial guarantee of future liquidation prices or legal title ownership guarantee.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: The Full Valuation Request Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-md bg-navy-50 text-navy-900 font-mono text-xs font-bold border border-navy-100">
                      Tracking ID: {createdLeadId}
                    </span>
                    <h3 className="text-2xl font-bold text-navy-950">
                      Valuation Request Logged Successfully!
                    </h3>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 max-w-md mx-auto text-xs text-emerald-800 text-center">
                      ✉️ Notification sent to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppUrl({
                        leadId: createdLeadId,
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
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Instant Copy via WhatsApp</span>
                    </a>
                    <Button onClick={handleReset} variant="outline" size="sm">
                      Submit Another Property
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-amber-600" />
                      <span>Property Valuation Application Form</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">* Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Name / Applicant Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Shyam Sundar Chaudhary"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
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
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
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
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Property Type *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                      >
                        <option value="Residential Land & Building">Residential Land & Building</option>
                        <option value="Commercial Complex / Building">Commercial Complex / Building</option>
                        <option value="Vacant Residential Land">Vacant Residential Land</option>
                        <option value="Vacant Commercial Land">Vacant Commercial Land</option>
                        <option value="Industrial Land & Factory Shed">Industrial Land & Factory Shed</option>
                        <option value="Agricultural Land Acreage">Agricultural Land Acreage</option>
                        <option value="Hospital / School / Institution">Hospital / School / Institution</option>
                        <option value="Other Immovable Property">Other Immovable Property</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Property Location (Municipality, Ward, Landmark) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. Dhangadhi Ward-1, Main Highway Road"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Land Area / Built-up Area
                      </label>
                      <input
                        type="text"
                        value={formData.approxArea}
                        onChange={(e) =>
                          setFormData({ ...formData, approxArea: e.target.value })
                        }
                        placeholder="e.g. 2 Katha 5 Dhur / 3,500 sq.ft. RCC"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Valuation Purpose *
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                    >
                      <option value="Bank Financing / Mortgage Credit">Bank Financing / Mortgage Credit</option>
                      <option value="Property Buying / Transaction Verification">Property Buying / Transaction Verification</option>
                      <option value="Property Selling Price Discovery">Property Selling Price Discovery</option>
                      <option value="Balance Sheet / Financial Audit">Balance Sheet / Financial Audit</option>
                      <option value="Family Inheritance / Partition Settlement">Family Inheritance / Partition Settlement</option>
                      <option value="Investment / Feasibility Decision">Investment / Feasibility Decision</option>
                      <option value="Other">Other Purpose</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Additional Details / Urgency / Bank Name
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Specify if a specific bank has requested the report, deadline urgency, road width, or current document status..."
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full" size="lg">
                      Submit Valuation Request
                    </Button>
                    <p className="text-[11px] text-slate-500 text-center mt-2">
                      All submitted property details are handled strictly under client confidentiality.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
