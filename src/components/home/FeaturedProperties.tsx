'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, PlusCircle, Search } from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { getProperties } from '@/lib/storage';
import { Property } from '@/types';

export function FeaturedProperties() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const allProperties = getProperties();

  const categories = ['All', 'Commercial', 'Residential', 'Land', 'Industrial'];

  const filtered = selectedCategory === 'All'
    ? allProperties.slice(0, 3)
    : allProperties.filter((p) => p.category === selectedCategory).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="PROPERTY MARKETPLACE"
            title="Featured verified property opportunities."
            subtitle="Explore legally screened and technically audited land, commercial buildings, and residences in Dhangadhi, Kailali, and Sudurpashchim Province."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/properties/list"
              variant="secondary"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              List Your Property
            </Button>
            <Button
              href="/properties"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse All Properties
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-elevated'
              }`}
            >
              {cat} Properties
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bottom Banner for Custom Requirement */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 dark:from-dark-surface dark:to-dark-card text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">
              Looking for a specific parcel or commercial space not listed here?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400">
              Submit your exact budget, road width, and area criteria to our property advisory team.
            </p>
          </div>
          <div className="shrink-0">
            <Button
              href="/properties/find"
              variant="accent"
              size="md"
              leftIcon={<Search className="w-4 h-4" />}
            >
              Tell Us What You Need
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
