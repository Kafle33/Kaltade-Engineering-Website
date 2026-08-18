'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileCheck2,
  PhoneCall,
  MapPin,
  Compass,
  Ruler,
  DollarSign,
  Info,
  ArrowRight,
  PlusCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';
import { PropertyType } from '@/types';

const PROPERTY_TYPES: PropertyType[] = [
  'Land',
  'Residential Land',
  'Commercial Land',
  'Agricultural Land',
  'Development Land',
  'House',
  'Apartment',
  'Residential Building',
  'Commercial Building',
  'Office Space',
  'Showroom',
  'Industrial Property',
  'Rental Property',
  'Investment Property'
];

const FACING_OPTIONS = [
  'East',
  'West',
  'North',
  'South',
  'North-East',
  'North-West',
  'South-East',
  'South-West'
];

const CONTACT_METHODS = [
  'Phone Call',
  'WhatsApp',
  'Email',
  'In-Person Meeting at Dhangadhi Office'
];

export default function ListPropertyPage() {
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential Land');
  const [area, setArea] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [roadAccess, setRoadAccess] = useState('');
  const [facing, setFacing] = useState('East');
  const [description, setDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState('Phone Call');
  const [hasLalpurja, setHasLalpurja] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !phone.trim() || !location.trim() || !area.trim() || !askingPrice.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const detailedMessage = `[PROPERTY LISTING SUBMISSION]
Area: ${area}
Asking Price: NPR ${askingPrice}
Road Access: ${roadAccess || 'Not specified'}
Facing: ${facing}
Document Status: ${hasLalpurja ? 'Possesses clear Lalpurja & Tax Clearance' : 'Under process'}
Preferred Contact Method: ${preferredContact}

Description & Remarks:
${description || 'No additional remarks provided.'}`;

      const saved = saveLead({
        type: 'Property Listing Submission',
        fullName: ownerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim(),
        propertyType: propertyType,
        budget: `Asking: NPR ${askingPrice}`,
        message: detailedMessage,
        urgency: 'Standard',
        status: 'New'
      });

      sendInquiryNotification({
        leadId: saved.id,
        type: 'Property Listing Submission',
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
      console.error('Failed to submit listing:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOwnerName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setPropertyType('Residential Land');
    setArea('');
    setAskingPrice('');
    setRoadAccess('');
    setFacing('East');
    setDescription('');
    setPreferredContact('Phone Call');
    setHasLalpurja(true);
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
          <div className="absolute -right-10 -top-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Verified Listing Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              List Your Property with Kaltade.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Showcase your land parcel or building to genuine institutional investors, commercial developers, and pre-vetted buyers. Backed by professional engineering verification and fair market valuation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedLeadId ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="px-3 py-1 rounded-full bg-navy-50 text-navy-950 text-xs font-mono font-bold tracking-wider">
                Submission Reference: {submittedLeadId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Property Submission Received!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <strong className="text-navy-950">{ownerName}</strong>. Your property details in <strong className="text-navy-950">{location}</strong> have been submitted to Kaltade Engineering Services for preliminary verification.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-xl mx-auto space-y-4">
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                What Happens Next?
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-700 list-decimal list-inside leading-relaxed font-medium">
                <li>
                  <strong className="text-navy-950">Document & Cadastral Verification:</strong> Our valuation team cross-references your land location and road width against municipal GIS/cadastral survey maps.
                </li>
                <li>
                  <strong className="text-navy-950">Direct Consultation:</strong> We contact you via <strong className="text-navy-950">{preferredContact}</strong> to discuss valuation benchmarks and schedule a physical site inspection.
                </li>
                <li>
                  <strong className="text-navy-950">Marketplace Publication:</strong> Verified listings are published on our digital marketplace and matched with our network of institutional and individual buyers.
                </li>
              </ol>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 max-w-xl mx-auto text-xs text-emerald-800 text-center">
              ✉️ Notification dispatched to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={generateWhatsAppUrl({
                  leadId: submittedLeadId || 'LIST-REQ',
                  type: 'Property Listing Submission',
                  fullName: ownerName,
                  phone: phone,
                  email: email,
                  location: location,
                  propertyType: propertyType,
                  budgetOrArea: `Asking: NPR ${askingPrice} (${area})`,
                  message: `Road Access: ${roadAccess}. Facing: ${facing}. Lalpurja: ${hasLalpurja ? 'Yes' : 'Pending'}. Remarks: ${description || 'N/A'}`,
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
                Browse Marketplace
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="md"
              >
                Submit Another Property
              </Button>
            </div>
          </div>
        ) : (
          /* Listing Form */
          <div className="space-y-8">
            {/* Required Verification Notice Box */}
            <div className="bg-amber-50 border-2 border-amber-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 text-amber-950">
              <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                  Verification Notice
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
                  Submitted properties undergo internal verification before publication. Kaltade reviews all submissions to ensure accuracy and document authenticity.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8"
            >
              {/* Section 1: Owner Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base font-extrabold text-navy-950">
                    Owner & Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Owner / Representative Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Shyam Sundar Chaudhary"
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Phone / Mobile Number <span className="text-rose-500">*</span>
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
                      placeholder="owner@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Preferred Contact Method
                    </label>
                    <select
                      value={preferredContact}
                      onChange={(e) => setPreferredContact(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Property Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-extrabold text-navy-950">
                    Property Location & Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-navy-950 block">
                      Property Location / Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Ward No. 4, Campus Road / Hasanpur, Dhangadhi, Kailali"
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Property Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    >
                      {PROPERTY_TYPES.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Total Area <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. 4 Katha, or 2 Katha 5 Dhur, or 10,000 sq.ft."
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Asking Price (NPR) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      placeholder="e.g. 1.2 Crore total or 40 Lakh per Katha"
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Road Access & Width
                    </label>
                    <input
                      type="text"
                      value={roadAccess}
                      onChange={(e) => setRoadAccess(e.target.value)}
                      placeholder="e.g. 20 ft Paved / Blacktopped Road"
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 block">
                      Facing Direction
                    </label>
                    <select
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    >
                      {FACING_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Description & Document Readiness */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base font-extrabold text-navy-950">
                    Property Description & Authenticity
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-950 block">
                    Property Description & Special Features
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe surrounding developments, nearby landmarks, shape of the plot, electricity/water provisions, building age/condition, or reason for selling..."
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLalpurja}
                      onChange={(e) => setHasLalpurja(e.target.checked)}
                      className="w-4 h-4 rounded text-navy-900 focus:ring-navy-900 mt-0.5 shrink-0"
                    />
                    <div className="text-xs text-slate-700">
                      <strong className="text-navy-950 font-bold block">
                        Clear Ownership & Document Status
                      </strong>
                      <span>
                        I confirm that the property has an authentic Lalpurja (Land Ownership Certificate) without conflicting disputes, and I am authorized to list it.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Our engineering team will call you to confirm your submission within 24 hours.
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={<PlusCircle className="w-4 h-4" />}
                >
                  Submit Property for Review
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Value Proposition Grid: Why List with Kaltade? */}
        <div className="mt-16 pt-12 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-navy-950">
              Why List Your Property with Kaltade?
            </h3>
            <p className="text-sm text-slate-600">
              We combine professional civil engineering standards with certified property valuation to give sellers unmatched credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Cadastral Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We verify boundary lines and cadastral trace maps to eliminate buyer uncertainty and prevent disputes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Scientific Valuation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive accurate, data-backed pricing guidance derived from actual registered transactions in Kailali.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Institutional Outreach</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct exposure to commercial banks, corporate developers, and high-net-worth investors across Nepal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-navy-950">Zero Fraud Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every transaction is backed by licensed engineers ensuring legal clarity and transparent settlements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
