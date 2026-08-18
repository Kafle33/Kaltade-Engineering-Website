import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building,
  Scale,
  Compass,
  FileText,
  Clock,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 dark:bg-dark-surface text-white pt-16 pb-28 sm:pb-16 border-t border-navy-800 dark:border-dark-border transition-colors">
      {/* JSON-LD Local Business & Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EngineeringConsultancy',
            name: 'Kaltade Engineering Services Pvt. Ltd.',
            description:
              'Professional engineering consultancy, institutional property valuation, DPR preparation, and real estate advisory based in LN. Chowk, Dhangadhi, Kailali, Nepal.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'LN. Chowk',
              addressLocality: 'Dhangadhi',
              addressRegion: 'Kailali, Sudurpashchim Province',
              addressCountry: 'NP',
            },
            areaServed: 'Nepal',
            serviceArea: ['Far-Western Nepal', 'Sudurpashchim Province', 'National'],
            telephone: '+977-9858425256',
            email: 'kaltadeengineeringservices@gmail.com',
            priceRange: '$$',
            knowsAbout: [
              'Civil Engineering',
              'Structural Design',
              'Property Valuation',
              'Detailed Project Reports',
              'Real Estate Consultancy',
              'Property Due Diligence',
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800 dark:border-dark-border">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white p-0.5 border border-white/20">
                <Image
                  src="/logo.jpeg"
                  alt="Kaltade Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight block text-white leading-tight">
                  KALTADE
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-300 dark:text-sky-400 block leading-tight">
                  Engineering Services Pvt. Ltd.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed max-w-sm">
              Engineering Expertise. Property Intelligence. Real Estate Solutions.
              Combining technical rigor with deep property insight to guide banks,
              developers, businesses, and property owners.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>LN. Chowk, Dhangadhi, Kailali, Nepal</span>
              </div>
              <a href="tel:+9779858425256" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+977-9858425256 (Mobile / WhatsApp)</span>
              </a>
              <a href="tel:091521256" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>091-521256 (Office Tel.)</span>
              </a>
              <a href="mailto:kaltadeengineeringservices@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>kaltadeengineeringservices@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sun – Fri: 9:30 AM – 5:30 PM (NPT)</span>
              </div>
            </div>
          </div>

          {/* Engineering & Valuation Division */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 dark:text-sky-400 mb-4">
              Engineering &amp; Valuation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 dark:text-slate-400">
              <li>
                <Link
                  href="/services/engineering"
                  className="hover:text-white transition-colors"
                >
                  Engineering Consultancy
                </Link>
              </li>
              <li>
                <Link
                  href="/valuation"
                  className="hover:text-white transition-colors"
                >
                  Property Valuation (Banks)
                </Link>
              </li>
              <li>
                <Link
                  href="/services/dpr"
                  className="hover:text-white transition-colors"
                >
                  DPR Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/engineering"
                  className="hover:text-white transition-colors"
                >
                  Building Design &amp; Drawings
                </Link>
              </li>
              <li>
                <Link
                  href="/services/engineering"
                  className="hover:text-white transition-colors"
                >
                  NBC Seismic Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Projects &amp; Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Estate Advisory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 dark:text-sky-400 mb-4">
              Real Estate Advisory
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 dark:text-slate-400">
              <li>
                <Link
                  href="/properties"
                  className="hover:text-white transition-colors"
                >
                  Verified Property Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate/investment"
                  className="hover:text-white transition-colors"
                >
                  Investment Consultancy
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate/due-diligence"
                  className="hover:text-white transition-colors"
                >
                  Property Due Diligence
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate/land-development"
                  className="hover:text-white transition-colors"
                >
                  Land Development Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate/commercial"
                  className="hover:text-white transition-colors"
                >
                  Commercial Real Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Action & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 dark:text-sky-400 mb-4">
              Client Actions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 dark:text-slate-400">
              <li>
                <Link
                  href="/valuation"
                  className="hover:text-white transition-colors font-medium flex items-center gap-1.5 text-amber-400"
                >
                  <span>Request Valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/find"
                  className="hover:text-white transition-colors"
                >
                  Submit Property Requirement
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/list"
                  className="hover:text-white transition-colors"
                >
                  List Your Property with Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services/dpr"
                  className="hover:text-white transition-colors"
                >
                  Request DPR Consultation
                </Link>
              </li>
              <li className="pt-3 border-t border-navy-800 dark:border-dark-border">
                <Link
                  href="/admin"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Internal Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Compliance */}
        <div className="py-6 border-b border-navy-800 dark:border-dark-border text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
          <p className="max-w-5xl">
            <strong className="text-slate-200 dark:text-slate-300">Legal &amp; Advisory Disclaimer:</strong>{' '}
            Kaltade Engineering Services Pvt. Ltd. provides professional technical
            consultancy, structural engineering design, institutional property
            valuation, DPR preparation, and property assessment services. Technical
            due diligence and property assessments do not substitute for official
            government land revenue title conveyance or legal opinions provided by
            licensed advocates. All property listings undergo internal verification
            prior to publication.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>
            © {currentYear} Kaltade Engineering Services Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Dhangadhi, Kailali, Nepal</span>
            <span>Engineering • Valuation • Real Estate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
