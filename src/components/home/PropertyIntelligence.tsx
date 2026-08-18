'use client';

import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  TrendingUp,
  Scale,
  ShieldCheck,
  Building,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';

export function PropertyIntelligence() {
  const [activeNode, setActiveNode] = useState<number>(0);

  const dimensions = [
    {
      id: 'location',
      title: 'Location & Orientation',
      icon: MapPin,
      summary: 'Municipal jurisdiction, road connectivity, surrounding amenities, and facing direction.',
      details:
        'In Nepal, a property\'s true potential begins with orientation (East/South facing advantages) and proximity to municipal commercial arteries, hospital corridors, and future urban expansions.',
    },
    {
      id: 'access',
      title: 'Access & Right-of-Way',
      icon: Compass,
      summary: 'Physical road width, official right-of-way setbacks, and planned road widening.',
      details:
        'A road on the ground may not match municipal plans. We verify official right-of-way corridors to ensure future widening does not compromise buildable square footage.',
    },
    {
      id: 'market',
      title: 'Market & Economic Context',
      icon: TrendingUp,
      summary: 'Prevailing transaction rates, liquidity dynamics, and commercial demand trends.',
      details:
        'Going beyond subjective asking prices, we analyze verifiable comparable transaction records and commercial footfall patterns to determine fair market value.',
    },
    {
      id: 'condition',
      title: 'Physical & Structural Condition',
      icon: Building,
      summary: 'Soil bearing stability, NBC earthquake compliance, structural age, and depreciation.',
      details:
        'For built structures, we evaluate concrete rebar specifications, foundation depth, and maintenance health to calculate accurate depreciated replacement cost.',
    },
    {
      id: 'development',
      title: 'Development Potential',
      icon: Layers,
      summary: 'Floor Area Ratio (FAR), maximum permissible height, and optimal land utilization.',
      details:
        'We determine whether a parcel can support high-yield commercial complexes, hospital infrastructure, plotted subdivisions, or multi-family residential setups.',
    },
    {
      id: 'valuation',
      title: 'Valuation & Technical Due Diligence',
      icon: Scale,
      summary: 'Cadastral trace map audit, distress value, fair market value, and bank compliance.',
      details:
        'Our licensed engineering valuators produce authoritative valuation reports accepted across commercial banks and BFIs for loan syndication and asset verification.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-navy opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="PROPERTY INTELLIGENCE FRAMEWORK"
          title="A property is more than land and a building."
          subtitle="Sound decisions require understanding the multidimensional forces that govern land and physical structures."
          theme="dark"
          align="center"
        />

        {/* Interactive Dimensional Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Left / Top selector list (Col 5) */}
          <div className="lg:col-span-5 space-y-3">
            {dimensions.map((dim, idx) => {
              const Icon = dim.icon;
              const isActive = activeNode === idx;
              return (
                <button
                  key={dim.id}
                  onClick={() => setActiveNode(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? 'bg-white text-navy-950 border-white shadow-lg scale-[1.02]'
                      : 'bg-navy-900/80 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isActive
                        ? 'bg-navy-900 text-white'
                        : 'bg-white/10 text-blue-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold leading-tight">
                      {dim.title}
                    </div>
                    <div
                      className={`text-xs mt-1 leading-snug line-clamp-1 ${
                        isActive ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {dim.summary}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right / Bottom Active Deep-Dive Panel (Col 7) */}
          <div className="lg:col-span-7">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-navy-900 border border-white/15 shadow-2xl overflow-hidden">
              {/* Subtle background blueprint watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
                <Scale className="w-64 h-64" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                  Dimension 0{activeNode + 1} of 06
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {dimensions[activeNode].title}
                </h3>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                  {dimensions[activeNode].details}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-blue-200 space-y-1">
                  <div className="font-semibold text-white">
                    How Kaltade Assesses This:
                  </div>
                  <p className="text-slate-300">
                    We synthesize CAD drafting, survey measurements, municipal setback bylaws, and market transactional metrics to ensure zero ambiguity before you commit capital.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button
                    href="/valuation"
                    variant="accent"
                    size="md"
                    leftIcon={<Scale className="w-4 h-4" />}
                  >
                    Request Valuation Assessment
                  </Button>
                  <Button
                    href="/real-estate/due-diligence"
                    variant="white"
                    size="md"
                  >
                    Learn Due Diligence
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
