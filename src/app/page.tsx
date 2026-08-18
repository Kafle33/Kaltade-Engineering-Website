'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Building2, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/ui/Button';
import { SectionHeader } from '@/ui/SectionHeader';

import { HeroSection } from '@/components/home/HeroSection';
import { ClientIntentSection } from '@/components/home/ClientIntentSection';
import { ThreeDisciplinesSection } from '@/components/home/ThreeDisciplinesSection';
import { PropertyIntelligence } from '@/components/home/PropertyIntelligence';
import { ValuationFlagship } from '@/components/home/ValuationFlagship';
import { EngineeringDprSection } from '@/components/home/EngineeringDprSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { LandConverterWidget } from '@/components/home/LandConverterWidget';
import { InstitutionalSection } from '@/components/home/InstitutionalSection';
import { InsightsPreview } from '@/components/home/InsightsPreview';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Client Intent Navigator */}
      <ClientIntentSection />

      {/* 3. Three Disciplines */}
      <ThreeDisciplinesSection />

      {/* 4. Property Intelligence Framework */}
      <PropertyIntelligence />

      {/* 5. Valuation Flagship */}
      <ValuationFlagship />

      {/* 6. Engineering & DPR Section */}
      <EngineeringDprSection />

      {/* 7. Featured Properties Marketplace */}
      <FeaturedProperties />

      {/* 8. Land Area Converter Widget */}
      <LandConverterWidget />

      {/* 9. Institutional & BFI Solutions */}
      <InstitutionalSection />

      {/* 10. Property & Engineering Insights */}
      <InsightsPreview />

      {/* 11. Final Multi-Path CTA */}
      <section className="py-20 sm:py-28 bg-navy-950 dark:bg-dark-bg text-white relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="GET STARTED TODAY"
            title="Looking for Engineering, Valuation, or Property Services?"
            subtitle="Whether you need a professional property valuation, engineering consultancy, DPR, technical assessment, or assistance with a real-estate decision — Kaltade is here to help."
            theme="dark"
            align="center"
          />

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
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
              variant="white"
              size="lg"
              leftIcon={<Building2 className="w-4 h-4" />}
            >
              Find a Property
            </Button>
            <Button
              href="/properties/list"
              variant="outline"
              size="lg"
              className="bg-white/10 dark:bg-dark-card/60 text-white border-white/20 dark:border-dark-border hover:bg-white/20"
            >
              List Your Property
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="bg-white/10 dark:bg-dark-card/60 text-white border-white/20 dark:border-dark-border hover:bg-white/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Consultation
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-300 dark:text-slate-400">
            <a
              href="tel:+9779858425256"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+977-9858425256</span>
            </a>
            <a
              href="https://wa.me/9779858425256"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
