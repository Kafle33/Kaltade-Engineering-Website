'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Scale,
  Compass,
  FileSpreadsheet,
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Landmark,
  FileCheck2,
  Check,
  Layers,
  MapPin,
  Briefcase,
  HelpCircle,
  Mail,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Modal } from '@/ui/Modal';
import { saveLead } from '@/lib/storage';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: 'General Inquiry',
    message: '',
  });

  // 3 Core Divisions
  const divisions = [
    {
      title: 'A. Engineering & Technical Services',
      tagline: 'Design. Assess. Plan.',
      icon: Compass,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      desc: 'Delivering end-to-end civil and structural engineering consultancy, modern architectural planning, seismic analysis (NBC 105:2020), municipal permit documentation (Naxa Paas), and bankable Detailed Project Reports (DPR).',
      capabilities: [
        'Building Design & Structural Seismic Modeling',
        'Detailed Project Reports (DPR) & Feasibility Studies',
        'Municipal Drawing Approval (Naxa Paas)',
        'Bill of Quantities (BOQ) & Rate Analysis',
        'On-site Construction Quality Supervision',
      ],
      href: '/services/engineering',
    },
    {
      title: 'B. Property Valuation',
      tagline: 'Measure. Assess. Understand.',
      icon: Scale,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      desc: 'Independent, standardized property valuation for commercial banks, financial institutions (BFIs), corporate entities, and property owners following rigorous engineering and market valuation methodologies.',
      capabilities: [
        'Bank Collateral & Mortgage Valuation',
        'Land, Residential, Commercial & Industrial Valuation',
        'Fair Market Value & Distress Liquidation Value',
        'Replacement Cost Less Depreciation Analysis',
        'Field Boundary Measurement & Setback Verification',
      ],
      href: '/valuation',
    },
    {
      title: 'C. Real Estate Services',
      tagline: 'Find. Evaluate. Decide.',
      icon: Building2,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      desc: 'Professional real-estate consultancy providing pre-acquisition technical due diligence, land development and plotted subdivision planning, commercial advisory, and buyer/seller facilitation.',
      capabilities: [
        'Property Due Diligence & Cadastral Naksha Audit',
        'Land Subdivision Master Planning & Yield Optimization',
        'Commercial Land & Building Acquisition Advisory',
        'Real Estate Investment Feasibility Studies',
        'Highway Corridor & Development Site Advisory',
      ],
      href: '/real-estate',
    },
  ];

  // 4 Pillars of Our Approach
  const approachPillars = [
    {
      title: '1. Technical Expertise',
      icon: Compass,
      desc: 'Our team comprises licensed civil engineers, structural designers, and accredited valuators applying modern engineering principles and Nepal National Building Codes (NBC).',
    },
    {
      title: '2. Field Inspection',
      icon: MapPin,
      desc: 'We never evaluate properties from behind a desk. Every assignment involves physical on-site measurement with electronic distance meters and direct boundary verification.',
    },
    {
      title: '3. Property Assessment',
      icon: Scale,
      desc: 'We evaluate structural health, materials depreciation, municipal setbacks, road right-of-way expansion lines, and environmental buffer zones.',
    },
    {
      title: '4. Practical Understanding',
      icon: Layers,
      desc: 'Deep rooted understanding of local land tenure, cadastral map trace systems (Naksha), Terai (Bigha-Katha-Dhur) & Hilly (Ropani-Aana) measurement units, and market realities.',
    },
  ];

  // 7 Core Values (as specified in brief)
  const coreValues = [
    {
      title: 'Professionalism',
      desc: 'Maintaining the highest standards of corporate ethics, structured technical communication, punctuality, and accountability in every client engagement.',
      icon: Briefcase,
    },
    {
      title: 'Integrity',
      desc: 'Delivering honest, unbiased assessments with zero conflict of interest and strict adherence to client confidentiality and data security.',
      icon: ShieldCheck,
    },
    {
      title: 'Accuracy',
      desc: 'Precision in physical surveying, structural mathematical calculations, cost estimations (BOQ), and certified valuation figures.',
      icon: Target,
    },
    {
      title: 'Transparency',
      desc: 'Clear disclosure of evaluation criteria, market comparison benchmarks, statutory bylaws, and transparent advisory recommendations.',
      icon: Eye,
    },
    {
      title: 'Technical Excellence',
      desc: 'Continuous adoption of modern surveying technology, seismic engineering codes, advanced 3D architectural tools, and financial modeling frameworks.',
      icon: Sparkles,
    },
    {
      title: 'Reliability',
      desc: 'Dependable turnaround times and bank-accepted technical reports that clients, investors, and financial institutions can count on with certainty.',
      icon: CheckCircle2,
    },
    {
      title: 'Client Satisfaction',
      desc: 'Crafting practical, customized solutions centered on the specific goals, budgets, and operational timelines of each individual or corporate client.',
      icon: Award,
    },
  ];

  // Team Section with Placeholder Structure (Strict Rule: Do NOT fabricate individual person names)
  const teamStructure = [
    {
      role: 'Principal Structural & Civil Engineer',
      department: 'Engineering & Structural Design',
      qualifications: 'M.Sc. Structural Engineering / B.E. Civil Engineering',
      desc: 'Oversees structural analysis, seismic resilience modeling under Nepal Building Codes (NBC 105:2020), municipal drawing clearances, and complex engineering DPRs.',
    },
    {
      role: 'Senior Property Valuator & Technical Lead',
      department: 'Property Valuation & Asset Assessment',
      qualifications: 'B.E. Civil Engineering / Accredited Valuator',
      desc: 'Leads institutional property valuation dossiers, collateral risk audits for Commercial Banks & BFIs, fair market value modeling, and distress appraisals.',
    },
    {
      role: 'Cadastral Survey & Geospatial Specialist',
      department: 'Survey & Due Diligence Division',
      qualifications: 'Diploma / B.Sc. Geomatics & Survey Engineering',
      desc: 'Specializes in precision Total Station field measurements, GPS boundary mapping, cadastral trace (Naksha) reconciliation, and municipal road right-of-way audits.',
    },
    {
      role: 'Land Development & Master Planning Consultant',
      department: 'Real Estate & Urban Planning',
      qualifications: 'B.Arch / B.E. Civil & Urban Planning',
      desc: 'Guides large-scale acreage subdivisions, plotted community master layouts, sellable area maximization, and infrastructure drainage engineering.',
    },
    {
      role: 'Architectural & MEP Design Engineer',
      department: 'Building Architecture & MEP',
      qualifications: 'B.Arch / B.E. MEP Engineering',
      desc: 'Coordinates modern functional architectural floor planning, 3D visualization, electrical, plumbing, sanitation (MEP), and climate-responsive design.',
    },
    {
      role: 'Client Relations & Advisory Coordinator',
      department: 'Client Advisory Desk',
      qualifications: 'B.B.A / Management & Property Operations',
      desc: 'Facilitates seamless communication between clients, banking loan officers, property owners, and technical field engineers.',
    },
  ];

  // Institutional Sectors Served
  const institutionalSectors = [
    {
      title: 'Commercial Banks & Development Banks',
      desc: 'Authoritative property valuation dossiers, credit collateral technical audits, and asset condition inspections.',
      icon: Landmark,
    },
    {
      title: 'Corporate Developers & Builders',
      desc: 'Detailed Project Reports (DPR), plotted subdivision master planning, and structural design.',
      icon: Building2,
    },
    {
      title: 'Commercial Enterprises & Retailers',
      desc: 'Highway commercial plot identification, warehouse logistics site assessment, and showroom design.',
      icon: Briefcase,
    },
    {
      title: 'Private Investors & Property Owners',
      desc: 'Independent pre-purchase technical due diligence, boundary verification, and market valuation.',
      icon: Users,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    saveLead({
      type: 'General Contact',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceInterest: `About Us Inquiry: ${formData.serviceInterest}`,
      message: formData.message,
      urgency: 'Standard',
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        serviceInterest: 'General Inquiry',
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
            <span className="text-amber-400">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-blue-200 border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              About Kaltade Engineering Services
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Engineering Expertise. Property Intelligence. Real Estate Solutions.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Kaltade Engineering Services Pvt. Ltd. is an integrated engineering, property valuation, and real-estate consultancy based in Dhangadhi, Kailali, Nepal. We combine professional technical rigor with practical property intelligence to deliver transparent, bankable, and actionable solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="accent"
                size="lg"
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Get in Touch
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section: Who We Are */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                eyebrow="WHO WE ARE"
                title="A Multi-Disciplinary Engineering & Property Platform"
                align="left"
                className="mb-0"
              />

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Headquartered at <strong>LN. Chowk, Dhangadhi, Kailali</strong>, <strong>Kaltade Engineering Services Pvt. Ltd.</strong> is a premier consultancy established to bridge the gap between pure civil engineering consultancy and on-the-ground real estate practice in Nepal.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Led by Managing Director <strong>Er. Laxit Pathak</strong>, we combine deep technical engineering principles with practical knowledge of land parcels, building construction, cadastral survey mapping, and regional market economics. Our company provides clients with reliable, objective, and professionally prepared solutions across engineering design, bank-grade property valuation, DPR preparation, and real-estate advisory.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xl sm:text-2xl font-black text-navy-950 font-mono">LN. Chowk</span>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">
                    Dhangadhi, Kailali HQ
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-black text-amber-600 font-mono">6 Core</span>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">
                    Practice Disciplines
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-navy-950 border-b border-slate-200 pb-3">
                Key Professional Competencies
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                {[
                  'Engineering consultancy & building design drawings (NBC compliant)',
                  'Institutional property valuation for Banks, BFIs & private clients',
                  'Detailed Project Reports (DPR) & bankable feasibility modeling',
                  'Comprehensive pre-acquisition technical due diligence',
                  'Land development & plotted subdivision master planning',
                  'Commercial property acquisition & transaction advisory',
                  'Physical on-site surveying and cadastral trace (Naksha) auditing',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Badge variant="navy" size="md">
                  Corporate Registration • Sudurpashchim Province
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: What We Do (3 Divisions) */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="THREE PILLARS OF EXCELLENCE"
            title="What We Do: Our Core Business Divisions"
            subtitle="An integrated ecosystem delivering comprehensive technical, appraisal, and property advisory capabilities under one roof."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {divisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.title}
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 w-fit rounded-2xl bg-navy-50 text-navy-900 mb-6 border border-navy-100">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                      {div.tagline}
                    </span>

                    <h3 className="text-xl font-bold text-navy-950 mb-3">
                      {div.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {div.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Core Capabilities:
                      </span>
                      {div.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button href={div.href} variant="outline" className="w-full" size="sm">
                      Explore Division Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Section: Our Approach */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="OUR METHODOLOGY"
            title="Our Integrated Approach"
            subtitle="We blend certified civil engineering with on-site field surveys, property assessment, and local land intelligence."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {approachPillars.map((app, index) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.title}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-navy-900/40 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-navy-300">
                        0{index + 1}
                      </span>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-navy-900">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                      {app.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Section: Vision & Mission */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="PURPOSE & DIRECTION"
            title="Vision & Mission"
            subtitle="Guiding principles driving Kaltade's commitment to Nepal's engineering and property ecosystem."
            theme="dark"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5" />
                <span>Our Vision</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                To become a trusted and professionally recognized engineering, property valuation and real-estate consultancy platform in Nepal.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                We aspire to set the benchmark for technical integrity, modern engineering methodologies, and transparent property advisory throughout Sudurpashchim Province and nationwide.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:border-white/20 transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Our Mission</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                To provide accurate, transparent and practical engineering and property-related solutions by combining professional technical expertise with a strong understanding of land and real estate.
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                We dedicate ourselves to protecting our clients&apos; assets, empowering investors with uncompromised data, and delivering bankable engineering reports on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Core Values (7 Elegant Cards) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="OUR PRINCIPLES"
            title="Our Core Values"
            subtitle="The fundamental standards that shape our client interactions, engineering calculations, and professional deliverables."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className={`p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-navy-900/30 hover:shadow-lg transition-all flex flex-col justify-between ${
                    idx === 6 ? 'md:col-span-2 lg:col-span-3 xl:col-span-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-navy-900 shadow-sm">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 mb-2">
                      {val.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Section: Team Structure */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="LEADERSHIP & TALENT"
            title="Company Leadership & Professional Structure"
            subtitle="Led by experienced engineering leadership and powered by licensed civil engineers, accredited valuators, survey technicians, and property analysts."
            align="center"
          />

          {/* Managing Director Leadership Spotlight Card */}
          <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive Leadership</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                  Er. Laxit Pathak
                </h3>
                <p className="text-sm font-bold text-amber-700 tracking-wide uppercase">
                  Managing Director
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed pt-1">
                  Leading Kaltade Engineering Services Pvt. Ltd. with a dedication to engineering precision, certified property valuation standards, and transparent client advisory across Sudurpashchim Province and beyond.
                </p>
              </div>

              <div className="shrink-0 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 min-w-[240px]">
                <div className="flex items-center gap-2 text-navy-950 font-bold">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>LN. Chowk, Dhangadhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href="tel:+9779858425256" className="hover:text-navy-950 font-semibold">
                    +977-9858425256
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href="tel:091521256" className="hover:text-navy-950">
                    091-521256
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="mailto:kaltadeengineeringservices@gmail.com" className="hover:text-navy-950 break-all text-[11px]">
                    kaltadeengineeringservices@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {teamStructure.map((member) => (
              <div
                key={member.role}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-navy-900/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {member.department}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <h3 className="text-base font-bold text-navy-950 leading-snug">
                    {member.role}
                  </h3>

                  <div className="text-[11px] font-semibold text-navy-700 mt-1 mb-3">
                    {member.qualifications}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Accredited Practice</span>
                  <span className="text-navy-900 font-semibold">Kaltade Team</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-navy-50 border border-navy-100 text-center text-xs text-navy-800 max-w-2xl mx-auto">
            Our multi-disciplinary team operates in strict compliance with the Nepal Engineering Council (NEC), municipal building bylaws, and institutional banking valuation guidelines.
          </div>
        </div>
      </section>

      {/* 8. Section: Institutional Experience */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="TRUSTED COLLABORATION"
            title="Institutional & Banking Experience"
            subtitle="Kaltade has established a track record of delivering technical excellence and rigorous property valuations to financial institutions, corporate enterprises, and developers."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {institutionalSectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.title}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 w-fit rounded-xl bg-white border border-slate-200 text-navy-900 shadow-sm mb-4">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="text-base font-bold text-navy-950 mb-2 leading-snug">
                      {sector.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-600 max-w-3xl mx-auto">
            <span className="font-semibold text-navy-950">Confidentiality Note:</span> In accordance with banking regulations and client privacy covenants, Kaltade does not publish individual borrower identities, confidential loan amounts, or proprietary valuation figures publicly.
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <Badge variant="navy" size="md" className="bg-white/10 text-blue-200 border-white/20">
            CONNECT WITH OUR TEAM
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Let&apos;s Discuss Your Engineering & Property Requirements.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need a property valuation, engineering building design, DPR study, or strategic real estate advice in Dhangadhi or across Nepal, Kaltade is ready to assist.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              size="lg"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Get in Touch
            </Button>
            <Button
              href="/valuation"
              variant="white"
              size="lg"
              leftIcon={<Scale className="w-4 h-4" />}
            >
              Request Valuation
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Contact Office
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation / Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get in Touch with Kaltade"
        subtitle="Submit your inquiry to connect directly with our engineering and property consultancy team."
        maxWidth="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-navy-950">
              Message Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you for contacting Kaltade Engineering Services. A member of our technical advisory team will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Shyam Sundar Chaudhary"
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
                  placeholder="e.g. shyam@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Service Interest
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceInterest: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none bg-white"
                >
                  <option value="Property Valuation">Property Valuation</option>
                  <option value="Engineering Consultancy & Building Design">Engineering Consultancy & Building Design</option>
                  <option value="Detailed Project Report (DPR)">Detailed Project Report (DPR)</option>
                  <option value="Real Estate Investment Advisory">Real Estate Investment Advisory</option>
                  <option value="Land Development & Master Planning">Land Development & Master Planning</option>
                  <option value="Commercial Real Estate Advisory">Commercial Real Estate Advisory</option>
                  <option value="Property Due Diligence">Property Due Diligence</option>
                  <option value="General Inquiry / Institutional Partnership">General Inquiry / Institutional Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                How Can We Help You?
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Share project details, location, timeline, or specific questions you'd like to discuss..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md">
                Send Message
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
