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

Additional Notes & Custom Preferences:
${additionalRequirements || 'No specific custom preferences noted.'}`;

      const saved = saveLead({
        type: 'Buyer Requirement',
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim(),
        propertyType: propertyType === 'Any Property Type' ? undefined : propertyType,
        budget: budget,
        message: detailedMessage,
        urgency: timeframe.includes('Immediate') ? 'Urgent' : 'Standard',
        status: 'New'
      });

      sendInquiryNotification({
        leadId: saved.id,
        type: 'Buyer Requirement',
        fullName: saved.fullName,
        phone: saved.phone,
        email: saved.email,
        location: saved.location,
        propertyType: saved.propertyType,
        budgetOrArea: saved.budget,
        message: saved.message,
      });

      setSubmittedLeadId(saved.id);
    } catch (err) {
      console.error('Failed to submit requirement:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setLocation('');
    setPropertyType('Commercial Land');
    setBudget('NPR 1.0 Crore - 2.5 Crore');
    setRequiredArea('');
    setPurpose('Commercial Complex / Office Setup');
    setRoadRequirement('Wide Residential Road (20+ ft)');
    setFacingPreference('Any / No Preference');
    setTimeframe('1 to 3 Months');
    setAdditionalRequirements('');
    setName('');
    setPhone('');
    setEmail('');
    setSubmittedLeadId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 sm:pt-32 pb-24">
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-navy-900">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tailored Property Acquisition
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Tell us what you&apos;re looking for.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Looking for a specific land parcel, commercial footprint, or residential plot in Kailali or Sudurpashchim? Share your exact criteria and our engineering advisory team will source and verify matching properties for you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedLeadId ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="px-3 py-1 rounded-full bg-navy-50 text-navy-950 text-xs font-mono font-bold tracking-wider">
                Requirement Reference: {submittedLeadId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Requirement Successfully Logged!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <strong className="text-navy-950">{name}</strong>. Our real estate and valuation engineers have received your acquisition requirement for <strong className="text-navy-950">{location}</strong>.
              </p>
            </div>

            {/* Requirement Summary Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-xl mx-auto space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[11px] uppercase text-slate-400 font-bold block">
                    Property Type
                  </span>
                  <strong className="text-navy-950">{propertyType}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 font-bold block">
                    Budget Range
                  </span>
                  <strong className="text-navy-950">{budget}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 font-bold block">
                    Target Area
                  </span>
                  <strong className="text-navy-950">{requiredArea}</strong>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-slate-400 font-bold block">
                    Target Road Access
                  </span>
                  <strong className="text-navy-950">{roadRequirement}</strong>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed pt-1">
                Our property consultants will cross-reference off-market cadastral parcels and contact you at <strong className="text-navy-950">{phone}</strong>.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 max-w-xl mx-auto text-xs text-emerald-800 text-center">
              ✉️ Notification dispatched to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
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
                <span>Send Instant Copy via WhatsApp</span>
              </a>
              <Button
                href="/properties"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Browse Current Listings
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
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8"
          >
            {/* Section 1: Property Requirements */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-extrabold text-navy-950">
                  Target Property Criteria
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-navy-950 block">
                    Preferred Location / Neighborhoods <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhangadhi Ward 1-5, Campus Road, Hasanpur, Attariya, Highway Corridor"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Required Area / Dimensions <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requiredArea}
                    onChange={(e) => setRequiredArea(e.target.value)}
                    placeholder="e.g. 2 to 4 Katha, 1 Bigha, or min 5,000 sq.ft."
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Primary Purpose
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Minimum Road Width Requirement
                  </label>
                  <select
                    value={roadRequirement}
                    onChange={(e) => setRoadRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  >
                    {ROAD_REQUIREMENTS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Facing Preference
                  </label>
                  <select
                    value={facingPreference}
                    onChange={(e) => setFacingPreference(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  >
                    {FACING_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-navy-950 block">
                    Purchase Timeline
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-extrabold text-navy-950">
                  Custom Requirements & Specific Preferences
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-950 block">
                  Additional Notes (Frontage, Drainage, Commercial Zoning, Soil Type, etc.)
                </label>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Specify any special needs such as required front width, high-tension line clearance, corner plot preference, or proximity to specific schools/hospitals..."
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>
            </div>

            {/* Section 3: Buyer Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-extrabold text-navy-950">
                  Your Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Binita Shrestha"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 text-center sm:text-left">
                Free advisory matching service provided by Kaltade Engineering Services.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<Search className="w-4 h-4" />}
              >
                Submit Buyer Requirement
              </Button>
            </div>
          </form>
        )}

        {/* Benefits Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-navy-950">
              Why Source Properties Through Kaltade?
            </h3>
            <p className="text-sm text-slate-600">
              Protect your investment capital with engineering-grade site screening and institutional valuation integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Zero Commission Traps</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct seller engagement with transparent pricing. No artificial middlemen markups or inflated unofficial commissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Engineering Due Diligence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every recommended property is screened for road width conformity, soil viability, flood safety, and municipal setback rules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Cadastral & Legal Purity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physical boundary verification against Land Revenue (Malpot) trace maps ensuring what you see matches official records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
