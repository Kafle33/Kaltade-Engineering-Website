'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Compass,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-navy-950 text-white flex items-center pt-24 pb-16 lg:py-28 overflow-hidden">
      {/* Background Architectural Blueprint Grid & Precision Linework */}
      <div className="absolute inset-0 bg-grid-navy opacity-30 pointer-events-none" />
      
      {/* Subtle radial ambient glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Actions (Col 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>ENGINEERING • PROPERTY VALUATION • REAL ESTATE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-balance">
              Engineering Expertise.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-100 to-blue-300">
                Property Intelligence.
              </span>{' '}
              Real Estate Solutions.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Kaltade Engineering Services Pvt. Ltd. integrates civil & structural
              engineering, institutional property valuation, Detailed Project Reports
              (DPR), and professional property advisory into one trusted corporate
              consultancy based in Dhangadhi, Kailali, Nepal.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                href="/services"
                variant="white"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Services
              </Button>
              <Button
                href="/valuation"
                variant="accent"
                size="lg"
                leftIcon={<Scale className="w-4 h-4" />}
              >
                Request Valuation
              </Button>
              <Button
                href="/properties"
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
              >
                Find a Property
              </Button>
            </div>

            {/* Core Verification & Credential Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Institutional Grade</strong>
                  <span>Valuations accepted by major Banks & BFIs</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">NBC Code Compliant</strong>
                  <span>Earthquake-resistant structural designs</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Technical Due Diligence</strong>
                  <span>Verified cadastral and site boundaries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural & Technical Visual Composition (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-navy-900 aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Architectural Engineering & Property Valuation"
                  fill
                  className="object-cover opacity-85"
                  priority
                />
                
                {/* Architectural Drafting Linework Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                
                {/* Overlay Metadata Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-navy-950/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-blue-200">
                    KES • FAR-WEST REGION
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                    Active Operations
                  </span>
                </div>

                {/* Bottom Technical Caption Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-navy-950/90 backdrop-blur-md border border-white/15 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-sm">
                      Dhangadhi • Kailali • Sudurpashchim
                    </span>
                    <span className="text-amber-400 font-mono text-[10px]">
                      REG: DHN-NP
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-snug">
                    Providing multi-disciplinary technical assessments, bank-format property valuations, and engineering designs across Nepal.
                  </p>
                </div>
              </div>

              {/* Floating Floating Stat Cards for Architectural Rigor */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-white text-navy-950 shadow-xl border border-slate-200">
                <div className="p-2.5 rounded-lg bg-navy-50 text-navy-900">
                  <Scale className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Standardized Practice
                  </div>
                  <div className="text-sm font-extrabold text-navy-950">
                    Certified Valuation
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-white text-navy-950 shadow-xl border border-slate-200">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900">
                  <Compass className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    NBC Code Compliant
                  </div>
                  <div className="text-sm font-extrabold text-navy-950">
                    Structural Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
