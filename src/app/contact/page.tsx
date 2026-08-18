'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Scale,
  Compass,
  FileText,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';
import { Lead } from '@/types';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: 'Property Valuation',
    message: '',
    preferredTime: 'Anytime during office hours',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Property Valuation',
    'Engineering Consultancy',
    'Building Design',
    'DPR',
    'Real Estate Consultancy',
    'Buy Property',
    'Sell Property',
    'Property Investment',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please provide some details in your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newLead = saveLead({
        type: 'General Contact',
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        serviceInterest: formData.serviceRequired,
        message: `${formData.message.trim()} (Preferred Contact Time: ${formData.preferredTime})`,
        urgency: 'Standard',
        internalRemarks: `Received from website contact form. Inquiring about ${formData.serviceRequired}.`,
      });

      // Dispatch email notification to kaltadeengineeringservices@gmail.com and roshankafle33@gmail.com
      sendInquiryNotification({
        leadId: newLead.id,
        type: 'General Contact',
        fullName: newLead.fullName,
        phone: newLead.phone,
        email: newLead.email,
        serviceInterest: newLead.serviceInterest,
        message: newLead.message,
      });

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedLead(newLead);
      }, 400);
    } catch (err) {
      console.error('Error saving lead:', err);
      setIsSubmitting(false);
      setErrorMessage('Failed to submit inquiry. Please try again or call us directly.');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceRequired: 'Property Valuation',
      message: '',
      preferredTime: 'Anytime during office hours',
    });
    setSubmittedLead(null);
    setErrorMessage('');
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-navy-100 text-navy-900 mb-4 border border-navy-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Let&apos;s discuss your next property or engineering requirement.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you need bank collateral property valuation, structural engineering designs, a bankable DPR, or strategic real estate guidance in Dhangadhi and Far-Western Nepal, our technical team is here to assist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-navy-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>Head Office &amp; Contact</span>
              </h2>

              <div className="space-y-6 text-sm text-slate-300">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-amber-400 shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Office Location</div>
                    <p className="mt-0.5 text-slate-300 leading-relaxed">
                      LN. Chowk, Dhangadhi<br />
                      Kailali District, Sudurpashchim Province, Nepal
                    </p>
                  </div>
                </div>

                {/* MD Contact */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-purple-400 shrink-0 border border-white/10">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Managing Director</div>
                    <p className="mt-0.5 text-slate-300">
                      <span className="text-white font-semibold">Er. Laxit Pathak</span><br />
                      <span className="text-xs text-slate-400">Managing Director, Kaltade Engineering Services Pvt. Ltd.</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-blue-400 shrink-0 border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Telephone &amp; WhatsApp</div>
                    <p className="mt-0.5 text-slate-300">
                      Mobile / WhatsApp:{' '}
                      <a href="tel:+9779858425256" className="text-white font-semibold hover:text-amber-300 transition-colors">
                        +977-9858425256
                      </a>
                      <br />
                      Office Tel:{' '}
                      <a href="tel:091521256" className="text-white font-semibold hover:text-amber-300 transition-colors">
                        091-521256
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-emerald-400 shrink-0 border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Official Email</div>
                    <p className="mt-0.5 text-slate-300">
                      <a
                        href="mailto:kaltadeengineeringservices@gmail.com"
                        className="text-white font-semibold hover:text-amber-300 transition-colors break-all"
                      >
                        kaltadeengineeringservices@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-white/10">
                  <div className="p-2.5 rounded-xl bg-white/10 text-amber-300 shrink-0 border border-white/10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Working Hours</div>
                    <p className="mt-0.5 text-slate-300">
                      <span className="font-medium text-white">Sunday – Friday:</span> 9:30 AM – 5:30 PM (NPT)
                      <br />
                      <span className="text-xs text-slate-400">Saturday &amp; Public Holidays: Closed (Emergency field inspection by appointment)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Badges / Specialties */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-navy-950 text-sm uppercase tracking-wider text-slate-700">
                Direct Consultation Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/valuation"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-navy-50 border border-slate-100 hover:border-navy-200 transition-all text-xs font-semibold text-navy-900 group"
                >
                  <Scale className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span>Property Valuation Form</span>
                </Link>

                <Link
                  href="/services/dpr"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-navy-50 border border-slate-100 hover:border-navy-200 transition-all text-xs font-semibold text-navy-900 group"
                >
                  <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span>DPR Inquiry Desk</span>
                </Link>

                <Link
                  href="/services/engineering"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-navy-50 border border-slate-100 hover:border-navy-200 transition-all text-xs font-semibold text-navy-900 group"
                >
                  <Compass className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Building & Structural</span>
                </Link>

                <Link
                  href="/properties/find"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-navy-50 border border-slate-100 hover:border-navy-200 transition-all text-xs font-semibold text-navy-900 group"
                >
                  <Building2 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span>Property Sourcing</span>
                </Link>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All client communications and property documents are handled with strict institutional confidentiality.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form / Success State (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md">
              {submittedLead ? (
                /* Success Confirmation State */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold tracking-wide">
                      Inquiry Received • Ref: {submittedLead.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                      Thank You, {submittedLead.fullName}!
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your inquiry regarding{' '}
                      <strong className="text-navy-900 font-semibold">{submittedLead.serviceInterest}</strong> has been assigned to our engineering & valuation advisory team.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left text-xs space-y-2.5 text-slate-700">
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Inquiry Reference ID:</span>
                      <span className="font-bold text-navy-950">{submittedLead.id}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Primary Contact Phone:</span>
                      <span className="font-semibold text-navy-950">{submittedLead.phone}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Expected Response Time:</span>
                      <span className="font-semibold text-emerald-700">Within 24 Business Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service Division:</span>
                      <span className="font-semibold text-navy-950">{submittedLead.serviceInterest}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 max-w-lg mx-auto text-xs text-emerald-800 text-center">
                    ✉️ Notification dispatched to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateWhatsAppUrl({
                        leadId: submittedLead.id,
                        type: submittedLead.type,
                        fullName: submittedLead.fullName,
                        phone: submittedLead.phone,
                        email: submittedLead.email,
                        serviceInterest: submittedLead.serviceInterest,
                        message: submittedLead.message,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Instant Copy via WhatsApp</span>
                    </a>
                    <Button onClick={handleReset} variant="outline" size="md">
                      Send Another Message
                    </Button>
                    <Button
                      href="/properties"
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Browse Properties
                    </Button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950">
                      Send a Message or Consultation Request
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill out the form below. Our consultants will review your requirement and reach out with technical feedback.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                          Your Full Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Er. Rajesh Joshi"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +977 98XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Email & Service Required */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. rajesh@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                          Service Required <span className="text-rose-600">*</span>
                        </label>
                        <select
                          value={formData.serviceRequired}
                          onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-navy-950 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-all cursor-pointer"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                        Requirement Details / Message <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe your property location, land area, engineering requirement, or bank valuation timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-all bg-white resize-y"
                      />
                    </div>

                    {/* Preferred Contact Timing */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Call Back Time
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Morning (9:30 AM - 12 PM)',
                          'Afternoon (12 PM - 3 PM)',
                          'Late Afternoon (3 PM - 5:30 PM)',
                        ].map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setFormData({ ...formData, preferredTime: time })}
                            className={`px-3 py-2 text-xs rounded-lg border transition-all text-left ${
                              formData.preferredTime === time
                                ? 'border-navy-900 bg-navy-50 text-navy-950 font-bold'
                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isSubmitting}
                        className="w-full shadow-lg"
                        leftIcon={<Send className="w-4 h-4" />}
                      >
                        Submit Consultation Request
                      </Button>
                      <p className="text-center text-[11px] text-slate-400 mt-3">
                        By submitting, you agree to receive professional contact regarding your engineering or property inquiry. No spam.
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Office Location & Map Section */}
        <div className="mt-16 sm:mt-24">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Find Our Office
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 mt-1">
                  Kaltade Engineering Services Office Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Conveniently situated along the central commercial corridor of Dhangadhi, Kailali.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Dhangadhi+Kailali+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Map Visual Container */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-100 overflow-hidden">
              {/* Map background styling representation */}
              <div className="absolute inset-0 bg-[#e5e3df] flex items-center justify-center overflow-hidden">
                {/* SVG Map Grid Aesthetic */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94a3b8" strokeWidth="0.75" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  {/* Highway Line representation */}
                  <path
                    d="M-50,180 Q300,160 600,220 T1400,190"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M-50,180 Q300,160 600,220 T1400,190"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeDasharray="10,10"
                  />
                  <path
                    d="M380,-50 L420,450"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="8"
                  />
                  <path
                    d="M720,-50 L680,450"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="8"
                  />
                </svg>

                {/* Landmarks in map graphic */}
                <div className="absolute top-12 left-1/4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-300 text-[11px] font-bold text-slate-700 shadow-sm hidden sm:block">
                  🏛️ Sub-Metropolitan City Office Corridor
                </div>
                <div className="absolute bottom-12 right-1/4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-300 text-[11px] font-bold text-slate-700 shadow-sm hidden sm:block">
                  🏦 Dhangadhi Commercial Banking Hub
                </div>

                {/* Central Office Marker Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-navy-950 text-white px-4 py-2 rounded-xl shadow-2xl border border-amber-500/40 text-center animate-bounce">
                    <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      KALTADE ENGINEERING SERVICES
                    </div>
                    <div className="text-[10px] text-blue-200 mt-0.5">
                      LN. Chowk, Dhangadhi, Kailali
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-navy-950 rotate-45 -mt-2.5 border-r border-b border-amber-500/40" />
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg mt-1" />
                </div>
              </div>

              {/* Map Footer Overlay Box */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1.5 z-20">
                <div className="font-bold text-navy-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>LN. Chowk, Dhangadhi, Kailali, Nepal</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Our office is located at LN. Chowk, Dhangadhi. Contact us at <strong>+977-9858425256</strong> for directions or to confirm your visit.
                </p>
                <a
                  href="https://maps.google.com/?q=LN+Chowk+Dhangadhi+Kailali+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-navy-700 font-bold hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
