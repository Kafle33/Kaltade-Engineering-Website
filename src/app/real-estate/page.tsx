'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  FileCheck2,
  TrendingUp,
  MapPin,
  Compass,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Check,
  Layers,
  Store,
  Home,
  Phone,
  Briefcase,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function RealEstatePage() {
  const advisoryStreams = [
    {
      id: 'buying-consultancy',
      title: 'Property Buying Consultancy',
      tagline: 'Technical Precision For Buyers',
      icon: Search,
      desc: 'Avoid costly surprises and unverified property claims. We act on the buyer’s behalf to evaluate land boundaries, access road widths, flood risks, and fair market price before you commit hard-earned capital.',
      benefits: [
        'Electronic boundary & Cadastral Naksha cross-verification',
        'Municipal setback & road widening expansion confirmation',
        'Independent Fair Market Valuation to prevent overpaying',
        'Building structural assessment for ready-built houses/commercial spaces',
      ],
      ctaText: 'Submit Buyer Requirement',
      ctaHref: '/properties/find',
    },
    {
      id: 'selling-consultancy',
      title: 'Property Selling Consultancy',
      tagline: 'Objective Valuation & Verified Matchmaking',
      icon: Building2,
      desc: 'Sell your land or commercial property faster with transparent engineering credibility. We verify documentation, establish realistic market benchmarks, and connect you with serious, vetted buyers.',
      benefits: [
        'Professional pre-sale property valuation report',
        'Complete property technical datasheet with dimensions and maps',
        'Direct connection to vetted individual & corporate buyers',
        'Zero commission speculation—clear, transparent advisory process',
      ],
      ctaText: 'List Your Property With Us',
      ctaHref: '/properties/list',
    },
    {
      id: 'acquisition-consultancy',
      title: 'Property Acquisition Consultancy',
      tagline: 'Institutional & Corporate Sourcing',
      icon: Briefcase,
      desc: 'Strategic property acquisition for commercial enterprises, bank branch expansions, hospital networks, hotels, and industrial warehouses looking for high-connectivity parcels in Sudurpashchim Province.',
      benefits: [
        'Targeted corridor scouting along major highway and arterial routes',
        'Multi-parcel land aggregation and consolidation feasibility',
        'Utility infrastructure readiness (High-power grid, drainage, logistics)',
        'Comprehensive technical & municipal due diligence dossier',
      ],
      ctaText: 'Inquire About Strategic Acquisition',
      ctaHref: '/contact',
    },
  ];

  const subPages = [
    {
      title: 'Property Due Diligence',
      href: '/real-estate/due-diligence',
      tagline: 'Verify Before You Invest',
      desc: 'Our flagship 10-point technical check: field measurement, cadastral trace audit, municipal road setback verification, and building structural screening.',
      icon: ShieldCheck,
      badge: 'Critical Check',
    },
    {
      title: 'Land Development & Master Planning',
      href: '/real-estate/land-development',
      tagline: 'Plotting & Subdivision Design',
      desc: 'Transform raw acreage into profitable plotted layouts with optimized internal road networks, drainage engineering, and maximum sellable plot ratio.',
      icon: Layers,
      badge: 'Development',
    },
    {
      title: 'Commercial Real Estate',
      href: '/real-estate/commercial',
      tagline: 'Complexes, Showrooms & Offices',
      desc: 'High-visibility commercial land, office buildings, banking retail spaces, and warehouse logistics parks across Far-Western Nepal.',
      icon: Store,
      badge: 'High Yield',
    },
    {
      title: 'Property Investment Consultancy',
      href: '/real-estate/investment',
      tagline: 'Capital Growth & Risk Control',
      desc: 'Strategic property investment modeling: rental yield calculation, highway expansion corridors, and macro property growth dynamics in Sudurpashchim.',
      icon: TrendingUp,
      badge: 'Investment',
    },
  ];

  const intelligencePillars = [
    {
      title: 'Accredited Valuation',
      desc: 'No arbitrary asking prices. We appraise land and buildings against verified transactions and structural cost standards.',
    },
    {
      title: 'Cadastral Alignment',
      desc: 'We cross-reference government trace maps (Naksha) with physical electronic boundary measurements.',
    },
    {
      title: 'Municipal Bylaw Screening',
      desc: 'We verify road right-of-ways, front/side setbacks, FAR limits, and planned municipal road expansions.',
    },
    {
      title: 'Document Legality Check',
      desc: 'We review ownership documentation and coordinate with qualified legal practitioners for statutory conveyancing.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-20 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 dark:bg-dark-surface text-white py-16 sm:py-24 mb-16 border-b border-navy-800 dark:border-dark-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-white/10 dark:bg-dark-elevated text-blue-200 dark:text-sky-300 border border-white/15 dark:border-dark-border">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                REAL ESTATE ADVISORY DIVISION
              </span>
              <Badge variant="warning" size="sm">
                Engineering Backed
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Find property with professional perspective.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Navigating property in Nepal requires more than classified ads. Kaltade combines civil engineering diligence, boundary surveying, and transparent market valuations to protect buyers and assist sellers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/properties/find" variant="accent" size="lg">
                Find a Property
              </Button>
              <Button href="/properties/list" variant="white" size="lg">
                List Your Property
              </Button>
              <Button href="/properties" variant="outline" size="lg" className="bg-white/10 dark:bg-dark-card text-white border-white/20 dark:border-dark-border hover:bg-white/20">
                Browse Marketplace
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Core Advisory Streams (Buying, Selling, Acquisition) */}
        <section>
          <SectionHeader
            eyebrow="ADVISORY PILLARS"
            title="Real Estate Consultancy Services"
            subtitle="Whether you are buying a family home, selling commercial land, or acquiring an institutional campus, our engineers provide complete transparency."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {advisoryStreams.map((stream) => {
              const Icon = stream.icon;
              return (
                <div
                  key={stream.id}
                  className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-xl dark:hover:shadow-card-dark-hover transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border flex items-center justify-center group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="navy" size="sm">
                        {stream.tagline}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                      {stream.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {stream.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 dark:border-dark-border space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        What We Deliver:
                      </h4>
                      {stream.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-dark-border">
                    <Button
                      href={stream.ctaHref}
                      variant="secondary"
                      size="sm"
                      className="w-full justify-between group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {stream.ctaText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Specialized Sub-Divisions */}
        <section>
          <SectionHeader
            eyebrow="SPECIALIZED PRACTICES"
            title="Explore Specialized Property Services"
            subtitle="Deep-dive into our technical due diligence, land subdivision planning, and commercial real estate solutions."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {subPages.map((sub, idx) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={idx}
                  href={sub.href}
                  className="p-7 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:border-navy-900/40 dark:hover:border-sky-500/40 hover:shadow-lg dark:hover:shadow-card-dark-hover transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 border border-navy-100 dark:border-dark-border group-hover:bg-navy-900 dark:group-hover:bg-navy-700 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="warning" size="sm">
                        {sub.badge}
                      </Badge>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                        {sub.tagline}
                      </span>
                      <h3 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-navy-700 dark:group-hover:text-sky-300 transition-colors">
                        {sub.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {sub.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs font-semibold text-navy-900 dark:text-sky-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    <span>Read practice details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* The Property Intelligence Framework */}
        <section className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-8 sm:p-12 border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
          <div className="flex items-center gap-2 mb-3">
            <BadgeCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              THE KALTADE METHOD
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            The Property Intelligence Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400 max-w-3xl leading-relaxed mb-10">
            How we bring institutional discipline and structural engineering accountability into Nepal&apos;s real estate transactions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {intelligencePillars.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border hover:border-amber-400/40 transition-colors"
              >
                <span className="text-amber-400 font-mono font-bold text-xs block mb-2">
                  PILLAR 0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dual Multi-Action CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Take Your Next Property Step with Confidence
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tell us the exact property you are seeking, or list your property with verified technical documentation and reach genuine buyers.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/properties/find" variant="accent" size="lg">
              Find a Property
            </Button>
            <Button href="/properties/list" variant="primary" size="lg">
              List Your Property
            </Button>
            <Button href="/real-estate/due-diligence" variant="outline" size="lg">
              Request Due Diligence
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
