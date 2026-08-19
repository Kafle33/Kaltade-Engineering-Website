'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Compass,
  Ruler,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  MapPin,
  Clock,
  Briefcase,
  FileCheck2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';

const PROPERTY_TYPES = [
  'Any Property Type',
  'Land (General)',
  'Residential Land',
  'Commercial Land',
  'Agricultural Land',
  'Development Land',
  'House / Bungalow',
  'Commercial Building',
  'Office Space',
  'Showroom',
  'Industrial Property / Warehouse'
];

const BUDGET_RANGES = [
  'Under NPR 50 Lakh',
  'NPR 50 Lakh - 1.0 Crore',
  'NPR 1.0 Crore - 2.5 Crore',
  'NPR 2.5 Crore - 5.0 Crore',
  'Above NPR 5.0 Crore',
  'Flexible / Based on Land Value'
];

const PURPOSES = [
  'Self-Residential Home Construction',
  'Commercial Complex / Office Setup',
  'Long-Term Capital Investment / Land Banking',
  'Industrial Warehouse or Factory Facility',
  'Hotel / Hospitality / Healthcare Setup',
  'Rental Income / Yield Generation'
];

const ROAD_REQUIREMENTS = [
  'Any Motorable Access (12+ ft)',
  'Standard Paved Road (16+ ft)',
  'Wide Residential Road (20+ ft)',
  'Double-Lane / Commercial Road (30+ ft)',
  'Main Highway Corridor (40+ ft / Highway Frontage)'
];

const FACING_OPTIONS = [
  'Any / No Preference',
  'East',
  'South',
  'North',
  'West',
  'North-East',
  'South-East',
  'North-West',
  'South-West'
];

const TIMEFRAMES = [
  'Immediate (Within 30 Days)',
  '1 to 3 Months',
  '3 to 6 Months',
  'Just Exploring Opportunities'
];

export default function FindPropertyPage() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Commercial Land');
  const [budget, setBudget] = useState('NPR 1.0 Crore - 2.5 Crore');
  const [requiredArea, setRequiredArea] = useState('');
  const [purpose, setPurpose] = useState('Commercial Complex / Office Setup');
  const [roadRequirement, setRoadRequirement] = useState('Wide Residential Road (20+ ft)');
  const [facingPreference, setFacingPreference] = useState('Any / No Preference');
  const [timeframe, setTimeframe] = useState('1 to 3 Months');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !location.trim() || !requiredArea.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const detailedMessage = `[BUYER REQUIREMENT DETAILS]
Target Location: ${location}
Required Area: ${requiredArea}
Property Type: ${propertyType}
Budget Range: ${budget}
Acquisition Purpose: ${purpose}
Road Access Requirement: ${roadRequirement}
Facing Preference: ${facingPreference}
Purchase Timeframe: ${timeframe}
Additional Notes: ${additionalRequirements || 'None provided.'}`;

      const newLead = saveLead({
        type: 'Buyer Requirement',
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        propertyType: propertyType,
        location: location.trim(),
        budget: budget,
        message: detailedMessage,
        urgency: timeframe.includes('Immediate') ? 'Urgent' : 'Standard',
        status: 'New',
      });

      sendInquiryNotification({
        leadId: newLead.id,
        type: 'Buyer Requirement',
        fullName: newLead.fullName,
        phone: newLead.phone,
        email: newLead.email,
        serviceInterest: `Buyer Requirement: ${propertyType} in ${location}`,
        propertyType: propertyType,
        location: location,
        budgetOrArea: `${budget} | Area: ${requiredArea}`,
        message: detailedMessage,
      });

      setSubmittedLeadId(newLead.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLeadId(null);
    setLocation('');
    setRequiredArea('');
    setAdditionalRequirements('');
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-24 transition-colors">
      {/* Top Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/real-estate"
          className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 dark:text-sky-300 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Real Estate Consultancy</span>
        </Link>

        <div className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl dark:shadow-card-dark border border-navy-900 dark:border-dark-border">
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 bottom-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-dark-elevated text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-white/15 dark:border-dark-border">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tailored Buyer Requirement Desk
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Tell us what you&apos;re looking for.
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Whether you need a commercial plot along the highway, residential acreage, or an industrial site in Kailali, our engineers will survey off-market properties to match your exact spatial and budget criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedLeadId ? (
          /* Success Screen */
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="px-3 py-1 rounded-full bg-navy-50 dark:bg-dark-elevated text-navy-950 dark:text-sky-300 text-xs font-mono font-bold tracking-wider">
                Requirement Reference: {submittedLeadId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                Requirement Successfully Logged!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you, <strong className="text-navy-950 dark:text-white">{name}</strong>. Our real estate and valuation engineers have received your acquisition requirement for <strong className="text-navy-950 dark:text-white">{location}</strong>.
              </p>
            </div>

            {/* Requirement Summary Box */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-dark-border">
                <div>
                  <span className="text-[11px] uppercase text-slate-400 dark:text-slate-400 font-bold block">
                    Property Type
                  </span>
                  <strong className="text-navy-950 dark:text-white">{propertyType}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 dark:text-slate-400 font-bold block">
                    Budget Range
                  </span>
                  <strong className="text-navy-950 dark:text-white">{budget}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 dark:text-slate-400 font-bold block">
                    Target Area
                  </span>
                  <strong className="text-navy-950 dark:text-white">{requiredArea}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 dark:text-slate-400 font-bold block">
                    Target Road Access
                  </span>
                  <strong className="text-navy-950 dark:text-white">{roadRequirement}</strong>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed pt-1">
                Our property consultants will cross-reference off-market cadastral parcels and contact you at <strong className="text-navy-950 dark:text-white">{phone}</strong>.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 max-w-xl mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
              📲 Redirecting to WhatsApp to send your inquiry directly to our team.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={generateWhatsAppUrl({
                  leadId: submittedLeadId || 'FIND-REQ',
                  type: 'Buyer Requirement',
                  fullName: name,
                  phone: phone,
                  email: email,
                  location: location,
                  propertyType: propertyType,
                  budgetOrArea: `${budget} (${requiredArea})`,
                  message: `Acquisition Purpose: ${purpose}. Road: ${roadRequirement}. Facing: ${facingPreference}. Notes: ${additionalRequirements || 'N/A'}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue to WhatsApp</span>
              </a>
              <Button
                href="/real-estate"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Real Estate Services
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="md"
              >
                Submit Another Requirement
              </Button>
            </div>
          </div>
        ) : (
          /* Buyer Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-8"
          >
            {/* Section 1: Property Requirements */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
                <span className="w-6 h-6 rounded-full bg-navy-900 dark:bg-navy-700 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                  Target Property Criteria
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Preferred Location / Neighborhoods <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhangadhi Ward 1-5, Campus Road, Hasanpur, Attariya, Highway Corridor"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Required Area / Dimensions <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requiredArea}
                    onChange={(e) => setRequiredArea(e.target.value)}
                    placeholder="e.g. 2 to 4 Katha, 1 Bigha, or min 5,000 sq.ft."
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Primary Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Minimum Road Width Requirement
                  </label>
                  <select
                    value={roadRequirement}
                    onChange={(e) => setRoadRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {ROAD_REQUIREMENTS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Facing Preference
                  </label>
                  <select
                    value={facingPreference}
                    onChange={(e) => setFacingPreference(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {FACING_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Purchase Timeline
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                  >
                    {TIMEFRAMES.map((tf) => (
                      <option key={tf} value={tf}>
                        {tf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Specific Requirements Notes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
                <span className="w-6 h-6 rounded-full bg-navy-900 dark:bg-navy-700 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                  Custom Requirements &amp; Specific Preferences
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                  Additional Notes (Frontage, Drainage, Commercial Zoning, Soil Type, etc.)
                </label>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Specify any special needs such as required front width, high-tension line clearance, corner plot preference, or proximity to specific schools/hospitals..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Section 3: Buyer Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-dark-border">
                <span className="w-6 h-6 rounded-full bg-navy-900 dark:bg-navy-700 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                  Your Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Binita Shrestha"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Free advisory matching service provided by Kaltade Engineering Services.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<Search className="w-4 h-4" />}
              >Submit via WhatsApp</Button>
            </div>
          </form>
        )}

        {/* Benefits Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-dark-border space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-navy-950 dark:text-white">
              Why Source Properties Through Kaltade?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Protect your investment capital with engineering-grade site screening and institutional valuation integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-navy-950 dark:text-white">Zero Commission Traps</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct seller engagement with transparent pricing. No artificial middlemen markups or inflated unofficial commissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-navy-950 dark:text-white">Engineering Due Diligence</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Every recommended property is screened for road width conformity, soil viability, flood safety, and municipal setback rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-base font-bold text-navy-950 dark:text-white">Cadastral &amp; Legal Purity</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Physical boundary verification against Land Revenue (Malpot) trace maps ensuring what you see matches official records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
