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
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-50 dark:bg-dark-bg min-h-screen text-navy-950 dark:text-dark-text transition-colors">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-navy-100 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 mb-4 border border-navy-200 dark:border-dark-border">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
            Let&apos;s discuss your next property or engineering requirement.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Whether you need bank collateral property valuation, structural engineering designs, a bankable DPR, or strategic real estate guidance in Dhangadhi and Far-Western Nepal, our technical team is here to assist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-navy-950 dark:bg-dark-surface text-white rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-card-dark border border-navy-800 dark:border-dark-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>Head Office &amp; Contact</span>
              </h2>

              <div className="space-y-6 text-sm text-slate-300 dark:text-slate-400">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-amber-400 shrink-0 border border-white/10 dark:border-dark-border">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Office Location</div>
                    <p className="mt-0.5 text-slate-300 dark:text-slate-400 leading-relaxed">
                      LN. Chowk, Dhangadhi<br />
                      Kailali District, Sudurpashchim Province, Nepal
                    </p>
                  </div>
                </div>

                {/* MD Contact */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-purple-400 shrink-0 border border-white/10 dark:border-dark-border">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Managing Director</div>
                    <p className="mt-0.5 text-slate-300 dark:text-slate-400">
                      <span className="text-white font-semibold">Er. Laxit Pathak</span><br />
                      <span className="text-xs text-slate-400">Managing Director, Kaltade Engineering Services Pvt. Ltd.</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-blue-400 dark:text-sky-400 shrink-0 border border-white/10 dark:border-dark-border">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Telephone &amp; WhatsApp</div>
                    <p className="mt-0.5 text-slate-300 dark:text-slate-400">
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
                  <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-emerald-400 shrink-0 border border-white/10 dark:border-dark-border">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Official Email</div>
                    <p className="mt-0.5 text-slate-300 dark:text-slate-400">
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
                <div className="flex items-start gap-4 pt-2 border-t border-white/10 dark:border-dark-border">
                  <div className="p-2.5 rounded-xl bg-white/10 dark:bg-dark-elevated text-amber-300 shrink-0 border border-white/10 dark:border-dark-border">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Working Hours</div>
                    <p className="mt-0.5 text-slate-300 dark:text-slate-400">
                      <span className="font-medium text-white">Sunday – Friday:</span> 9:30 AM – 5:30 PM (NPT)
                      <br />
                      <span className="text-xs text-slate-400">Saturday &amp; Public Holidays: Closed (Emergency field inspection by appointment)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Badges / Specialties */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <h3 className="font-bold text-navy-950 dark:text-white text-sm uppercase tracking-wider">
                Direct Consultation Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/valuation"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface hover:bg-navy-50 dark:hover:bg-dark-elevated border border-slate-100 dark:border-dark-border text-xs font-semibold text-navy-900 dark:text-sky-300 group transition-all"
                >
                  <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Property Valuation Form</span>
                </Link>

                <Link
                  href="/services/dpr"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface hover:bg-navy-50 dark:hover:bg-dark-elevated border border-slate-100 dark:border-dark-border text-xs font-semibold text-navy-900 dark:text-sky-300 group transition-all"
                >
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>DPR Inquiry Desk</span>
                </Link>

                <Link
                  href="/services/engineering"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface hover:bg-navy-50 dark:hover:bg-dark-elevated border border-slate-100 dark:border-dark-border text-xs font-semibold text-navy-900 dark:text-sky-300 group transition-all"
                >
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Building &amp; Structural</span>
                </Link>

                <Link
                  href="/properties/find"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface hover:bg-navy-50 dark:hover:bg-dark-elevated border border-slate-100 dark:border-dark-border text-xs font-semibold text-navy-900 dark:text-sky-300 group transition-all"
                >
                  <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Property Sourcing</span>
                </Link>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>All client communications and property documents are handled with strict institutional confidentiality.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form / Success State (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-dark-border shadow-md dark:shadow-card-dark">
              {submittedLead ? (
                /* Success Confirmation State */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800/60 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold tracking-wide">
                      Inquiry Received • Ref: {submittedLead.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                      Thank You, {submittedLead.fullName}!
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your inquiry regarding{' '}
                      <strong className="text-navy-900 dark:text-white font-semibold">{submittedLead.serviceInterest}</strong> has been assigned to our engineering &amp; valuation advisory team.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-xl p-5 max-w-lg mx-auto text-left text-xs space-y-2.5 text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-dark-border">
                      <span className="text-slate-500 dark:text-slate-400">Inquiry Reference ID:</span>
                      <span className="font-bold text-navy-950 dark:text-white">{submittedLead.id}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-dark-border">
                      <span className="text-slate-500 dark:text-slate-400">Primary Contact Phone:</span>
                      <span className="font-semibold text-navy-950 dark:text-white">{submittedLead.phone}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-dark-border">
                      <span className="text-slate-500 dark:text-slate-400">Expected Response Time:</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">Within 24 Business Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Service Division:</span>
                      <span className="font-semibold text-navy-950 dark:text-white">{submittedLead.serviceInterest}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 max-w-lg mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
                    📲 Redirecting to WhatsApp to send your inquiry directly to our team.
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
                      <span>Continue to WhatsApp</span>
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
                    <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                      Send a Message or Consultation Request
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Fill out the form below. Our consultants will review your requirement and reach out with technical feedback.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-xs sm:text-sm text-rose-700 dark:text-rose-300 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                          Your Full Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Er. Rajesh Joshi"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 transition-all bg-white dark:bg-dark-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +977 98XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 transition-all bg-white dark:bg-dark-surface"
                        />
                      </div>
                    </div>

                    {/* Email & Service Required */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. rajesh@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 transition-all bg-white dark:bg-dark-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                          Service Required <span className="text-rose-600">*</span>
                        </label>
                        <select
                          value={formData.serviceRequired}
                          onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-sm text-navy-950 dark:text-white bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 transition-all cursor-pointer"
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
                      <label className="block text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Requirement Details / Message <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe your property location, land area, engineering requirement, or bank valuation timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-dark-border text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 transition-all bg-white dark:bg-dark-surface resize-y"
                      />
                    </div>

                    {/* Preferred Contact Timing */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
                            className={`px-3 py-2 text-xs rounded-lg border transition-all text-left cursor-pointer ${
                              formData.preferredTime === time
                                ? 'border-navy-900 dark:border-sky-400 bg-navy-50 dark:bg-dark-elevated text-navy-950 dark:text-white font-bold'
                                : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
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
                      >Submit via WhatsApp</Button>
                      <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-3">
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
          <div className="bg-white dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-dark-border shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-dark-elevated/40">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Find Our Office
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white mt-1">
                  Kaltade Engineering Services Office Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Conveniently situated along the central commercial corridor of Dhangadhi, Kailali.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://maps.app.goo.gl/WPNmqQy5RcBoZFTj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900 dark:bg-navy-700 text-white text-xs font-bold hover:bg-navy-800 dark:hover:bg-navy-600 transition-colors shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Map Visual Container */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-100 dark:bg-dark-surface overflow-hidden">
              {/* Map background styling representation */}
              <div className="absolute inset-0 bg-[#e5e3df] dark:bg-[#131d2e] flex items-center justify-center overflow-hidden">
                {/* SVG Map Grid Aesthetic */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20"
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
                <div className="absolute top-12 left-1/4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-dark-border text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-xs hidden sm:block">
                  🏛️ Sub-Metropolitan City Office Corridor
                </div>
                <div className="absolute bottom-12 right-1/4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-dark-border text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-xs hidden sm:block">
                  🏦 Dhangadhi Commercial Banking Hub
                </div>

                {/* Central Office Marker Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-navy-950 dark:bg-dark-surface text-white px-4 py-2 rounded-xl shadow-2xl border border-amber-500/40 text-center animate-bounce">
                    <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      KALTADE ENGINEERING SERVICES
                    </div>
                    <div className="text-[10px] text-blue-200 dark:text-sky-300 mt-0.5">
                      LN. Chowk, Dhangadhi, Kailali
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-navy-950 dark:bg-dark-surface rotate-45 -mt-2.5 border-r border-b border-amber-500/40" />
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg mt-1" />
                </div>
              </div>

              {/* Map Footer Overlay Box */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-dark-border shadow-lg text-xs space-y-1.5 z-20">
                <div className="font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>LN. Chowk, Dhangadhi, Kailali, Nepal</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our office is located at LN. Chowk, Dhangadhi. Contact us at <strong>+977-9858425256</strong> for directions or to confirm your visit.
                </p>
                <a
                  href="https://maps.app.goo.gl/WPNmqQy5RcBoZFTj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-navy-700 dark:text-sky-400 font-bold hover:underline"
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
