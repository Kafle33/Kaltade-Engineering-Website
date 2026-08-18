'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Store,
  Building,
  Landmark,
  Scale,
  FileSpreadsheet,
  Compass,
  HardHat,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Ruler,
  ArrowRight,
  Check,
  FileCheck2,
  Sparkles,
  Phone,
  Briefcase,
  Layers,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Modal } from '@/ui/Modal';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { propertiesData } from '@/data/propertiesData';
import { Property } from '@/types';
import { saveLead } from '@/lib/storage';

export default function CommercialRealEstatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    commercialCategory: 'Commercial Land',
    transactionType: 'Buying / Acquisition',
    budget: 'NPR 1 Crore - 3 Crore',
    preferredLocation: 'Dhangadhi Main Highway / Central Market',
    message: '',
  });

  // Filter commercial properties from dataset
  const commercialProperties = propertiesData.filter(
    (p) =>
      p.category === 'Commercial' ||
      p.category === 'Industrial' ||
      p.type.includes('Commercial') ||
      p.type === 'Showroom' ||
      p.type === 'Development Land'
  );

  // 8 Commercial Property Focus Areas (as specified in brief)
  const commercialAssetTypes = [
    {
      title: 'Commercial Land',
      icon: MapPin,
      desc: 'Prime parcels on national highways, primary arterials, and intersection junctions with wide frontage for retail or corporate campuses.',
      tag: 'Strategic Plots',
    },
    {
      title: 'Office Properties & Spaces',
      icon: Briefcase,
      desc: 'Dedicated commercial spaces designed for commercial bank regional offices, corporate headquarters, and IT service centers.',
      tag: 'Corporate Workspaces',
    },
    {
      title: 'Retail Shops',
      icon: Store,
      desc: 'Ground-floor and multi-level shopping spaces in high-density urban shopping streets and commercial crossroads.',
      tag: 'High Footfall',
    },
    {
      title: 'Showrooms',
      icon: Sparkles,
      desc: 'Expansive front-glazed showrooms with high load-bearing floors suitable for automobile dealerships, electronics, and lifestyle brands.',
      tag: 'Glazed Frontage',
    },
    {
      title: 'Rental Buildings',
      icon: Building,
      desc: 'Multi-tenant income-generating commercial buildings with established cash flow or turnkey lease-ready floors.',
      tag: 'Income Generating',
    },
    {
      title: 'Commercial Complexes & Malls',
      icon: Building2,
      desc: 'Multi-storey mixed-use developments integrating basement parking, retail plazas, food courts, and executive suites.',
      tag: 'Integrated Hubs',
    },
    {
      title: 'Development Sites',
      icon: Layers,
      desc: 'Contiguous multi-Katha/Bigha tracts zoned for commercial, hospitality, institutional, or mixed-use township development.',
      tag: 'Scale Projects',
    },
    {
      title: 'Investment Property',
      icon: TrendingUp,
      desc: 'Assets vetted for steady capitalization rates, long-term institutional lease covenants, and strong capital preservation.',
      tag: 'Yield Focused',
    },
  ];

  // 6 Engineering Diligence Value-Add Pillars (Connecting to valuation, feasibility, DPR, design, etc.)
  const engineeringValuePillars = [
    {
      title: '1. Certified Property Valuation',
      icon: Scale,
      connectedService: '/valuation',
      serviceName: 'Property Valuation',
      desc: 'We calculate precise Fair Market Value, replacement cost less depreciation, and distress liquidation value so you never overpay or miscalculate credit security.',
    },
    {
      title: '2. Commercial Feasibility & Yield Modeling',
      icon: TrendingUp,
      connectedService: '/real-estate/investment',
      serviceName: 'Investment Feasibility',
      desc: 'We analyze footfall catchment, vehicular turning access, competitive rental rates, and tenant absorption curves to establish true economic viability.',
    },
    {
      title: '3. Land & Site Development Potential',
      icon: Layers,
      connectedService: '/real-estate/land-development',
      serviceName: 'Land Development',
      desc: 'We evaluate Floor Area Ratio (FAR), maximum permissible ground coverage, municipal setbacks, and parking requirements to maximize usable commercial square footage.',
    },
    {
      title: '4. Bankable DPR Preparation',
      icon: FileSpreadsheet,
      connectedService: '/services/dpr',
      serviceName: 'DPR & Financial Studies',
      desc: 'Formulating detailed project reports with 10-year financial forecasts (IRR, NPV, DSCR) and CapEx budgets for commercial loans and consortium financing.',
    },
    {
      title: '5. Architectural & Structural Design',
      icon: Compass,
      connectedService: '/services/engineering',
      serviceName: 'Engineering & Design',
      desc: 'Modern NBC 105:2020 seismic design, column-free commercial display spans, basement parking layouts, and municipal building permit approval (Naxa Paas).',
    },
    {
      title: '6. Technical & Cadastral Diligence',
      icon: ShieldCheck,
      connectedService: '/services/engineering',
      serviceName: 'Technical Due Diligence',
      desc: 'On-site boundary measurement against Survey Department Cadastral Trace maps, verifying right-of-way expansion lines, and screening utility corridors.',
    },
  ];

  const handleInquireProperty = (property: Property) => {
    setSelectedProperty(property);
    setFormData((prev) => ({
      ...prev,
      commercialCategory: property.type,
      preferredLocation: `${property.location.address}, ${property.location.city}`,
      message: `Inquiring about property: ${property.title} (${property.id})`,
    }));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    saveLead({
      type: 'Property Inquiry',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: `Commercial Real Estate: ${formData.commercialCategory}`,
      propertyId: selectedProperty ? selectedProperty.id : undefined,
      propertyType: formData.commercialCategory,
      location: formData.preferredLocation,
      budget: formData.budget,
      message: `[Transaction: ${formData.transactionType}] ${formData.message}`,
      urgency: 'Standard',
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setSelectedProperty(null);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        commercialCategory: 'Commercial Land',
        transactionType: 'Buying / Acquisition',
        budget: 'NPR 1 Crore - 3 Crore',
        preferredLocation: 'Dhangadhi Main Highway / Central Market',
        message: '',
      });
    }, 2500);
  };

  return (
    <div className="pt-28 sm:pt-32 bg-white min-h-screen text-navy-950">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-blue-200/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/real-estate" className="hover:text-white transition-colors">
              Real Estate
            </Link>
            <span>/</span>
            <span className="text-amber-400">Commercial Real Estate</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-blue-200 border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Institutional & Enterprise Property Solutions
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Commercial Real Estate Backed by Engineering Diligence.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Acquire, assess, and develop prime commercial land, office buildings, retail showrooms, complexes, and industrial sites with total structural, valuation, and municipal certainty.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => {
                  setSelectedProperty(null);
                  setIsModalOpen(true);
                }}
                variant="accent"
                size="lg"
                leftIcon={<Building2 className="w-4 h-4" />}
              >
                Request Commercial Consultation
              </Button>
              <Button
                href="/valuation"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                rightIcon={<Scale className="w-4 h-4" />}
              >
                Commercial Property Valuation
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Verified Road Right-of-Way</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">Certified Asset Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">Bankable DPR & Feasibility</span>
              </div>
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Structural NBC Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Commercial Property Asset Focus (8 Areas) */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="ASSET SPECIALIZATION"
            title="Commercial Real Estate Segments We Cover"
            subtitle="Tailored technical and transaction consultancy across all major commercial and industrial property classes in Far-Western Nepal."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {commercialAssetTypes.map((asset) => {
              const Icon = asset.icon;
              return (
                <div
                  key={asset.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-navy-50 text-navy-900 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 text-amber-600 group-hover:text-amber-400" />
                      </div>
                      <Badge variant="navy" size="sm">
                        {asset.tag}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-navy-950 mb-2 leading-snug">
                      {asset.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {asset.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          commercialCategory: asset.title,
                        }));
                        setIsModalOpen(true);
                      }}
                      className="text-xs font-bold text-navy-900 hover:text-navy-700 flex items-center gap-1 group/link"
                    >
                      <span>Inquire for {asset.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How Kaltade Adds Value Through Engineering Diligence */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="THE KALTADE ADVANTAGE"
            title="How Engineering Diligence Protects Commercial Transactions"
            subtitle="Commercial real estate involves substantial capital. We bridge brokerage with civil engineering, structural auditing, valuation, and feasibility modeling."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {engineeringValuePillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <div
                  key={pil.title}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-navy-900/40 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 w-fit rounded-2xl bg-white border border-slate-200 text-navy-900 shadow-sm mb-6">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>

                    <h3 className="text-xl font-bold text-navy-950 mb-3">
                      {pil.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {pil.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      href={pil.connectedService}
                      className="text-xs font-bold text-navy-900 hover:text-navy-700 flex items-center justify-between group/svc"
                    >
                      <span>Explore {pil.serviceName}</span>
                      <ArrowRight className="w-4 h-4 group-hover/svc:translate-x-1 transition-transform text-amber-600" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Live Commercial Listings Showcase */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-navy-50 px-3 py-1 rounded-md border border-navy-100 mb-3 inline-block">
                MARKETPLACE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 tracking-tight">
                Verified Commercial Properties
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Commercial plots, corporate buildings, logistics land, and showroom spaces in Dhangadhi and Kailali, verified by Kaltade engineers.
              </p>
            </div>

            <Button href="/properties" variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Properties
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onInquire={handleInquireProperty}
              />
            ))}
          </div>

          {/* Quick Listing Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-navy-950">
                  Own a Commercial Land Parcel or Building?
                </h4>
                <p className="text-xs text-slate-500">
                  List your property with engineering verification to attract serious institutional buyers and corporate tenants.
                </p>
              </div>
            </div>
            <Button href="/properties/list" variant="primary" size="sm">
              List Your Commercial Property
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Institutional & Case Study Spotlight */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Landmark className="w-4 h-4" />
                <span>Commercial Project Case Study</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Architectural & Structural Engineering of 5-Storey Commercial Complex
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Kaltade executed complete structural modeling (NBC 105:2020 seismic code), architectural planning with column-free ground retail showrooms, basement parking layout, and municipal permit processing for an 18,500 sq.ft. complex in Dhangadhi.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Built-up Area</span>
                  <strong className="text-white text-sm">18,500 sq.ft.</strong>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Structure</span>
                  <strong className="text-white text-sm">Basement + 5 Floors</strong>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Standard</span>
                  <strong className="text-white text-sm">NBC Seismic Code</strong>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="accent"
                  size="md"
                  leftIcon={<Building2 className="w-4 h-4" />}
                >
                  Consult on Commercial Building Design
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white text-navy-950 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-navy-950">
                  Looking for Commercial Property in Dhangadhi?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell our team your spatial, budget, and location requirements.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Access to off-market highway commercial plots</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Engineering review of road widths & setbacks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bankable valuation reports for mortgage financing</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedProperty(null);
                  setIsModalOpen(true);
                }}
                variant="primary"
                className="w-full"
                size="lg"
              >
                Submit Commercial Acquisition Brief
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="py-20 sm:py-28 bg-slate-100 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="navy" size="md">
            ENTERPRISE PROPERTY PARTNERS
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Schedule a Commercial Property Discussion
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you represent a commercial bank, retail brand, hospital, corporate enterprise, or private investor, Kaltade provides dependable engineering intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => {
                setSelectedProperty(null);
                setIsModalOpen(true);
              }}
              variant="accent"
              size="lg"
              leftIcon={<Building2 className="w-4 h-4" />}
            >
              Request Commercial Consultation
            </Button>
            <Button href="/contact" variant="primary" size="lg">
              Contact Our Dhangadhi Team
            </Button>
          </div>
        </div>
      </section>

      {/* Commercial Inquiry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedProperty
            ? `Inquire About ${selectedProperty.title}`
            : 'Commercial Real Estate Consultation'
        }
        subtitle="Provide your commercial property criteria for a tailored technical consultation."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-navy-950">
              Commercial Inquiry Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Our commercial property and engineering advisory desk has received your brief. We will contact you shortly with matched properties and technical specifications.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Ramesh Chaudhary / ABC Trading"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
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
                  placeholder="e.g. ramesh@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={formData.transactionType}
                  onChange={(e) =>
                    setFormData({ ...formData, transactionType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Buying / Acquisition">Buying / Acquisition</option>
                  <option value="Long-term Commercial Lease">Long-term Commercial Lease</option>
                  <option value="Selling Commercial Asset">Selling Commercial Asset</option>
                  <option value="Feasibility & Development Advisory">Feasibility & Development Advisory</option>
                  <option value="Property Valuation Request">Property Valuation Request</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Commercial Property Type
                </label>
                <select
                  value={formData.commercialCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, commercialCategory: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Commercial Land">Commercial Land / Highway Plot</option>
                  <option value="Office Property">Office Property / Corporate Space</option>
                  <option value="Retail Shop">Retail Shop</option>
                  <option value="Showroom Space">Showroom Space</option>
                  <option value="Rental Building">Rental Building / Multi-Unit</option>
                  <option value="Commercial Complex / Mall">Commercial Complex / Mall</option>
                  <option value="Development Land">Development Land / Site</option>
                  <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Budget Parameter
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Under NPR 50 Lakh">Under NPR 50 Lakh</option>
                  <option value="NPR 50 Lakh - 1.5 Crore">NPR 50 Lakh - 1.5 Crore</option>
                  <option value="NPR 1.5 Crore - 3.5 Crore">NPR 1.5 Crore - 3.5 Crore</option>
                  <option value="NPR 3.5 Crore - 8 Crore">NPR 3.5 Crore - 8 Crore</option>
                  <option value="Above NPR 8 Crore">Above NPR 8 Crore</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Preferred Location / Neighborhood
              </label>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={(e) =>
                  setFormData({ ...formData, preferredLocation: e.target.value })
                }
                placeholder="e.g. Dhangadhi Chauraha / Main Highway / Attariya / Campus Road"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Commercial Requirements & Spatial Details
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Specify minimum road access (e.g. 30ft+), frontage, parking requirements, ceiling height, target business use..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Submit Commercial Inquiry
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
