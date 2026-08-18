'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Building2,
  MapPin,
  Sparkles,
  PlusCircle,
  Compass,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  ShieldCheck,
  X,
  FileCheck2,
  PhoneCall,
  Home,
  Briefcase,
  Layers,
  Check,
  MessageSquare
} from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { getProperties, saveLead } from '@/lib/storage';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';
import { formatNPR, cn } from '@/lib/utils';
import { Property, PropertyType, PropertyStatus, TransactionType } from '@/types';

const CATEGORIES = ['All', 'Land', 'Residential', 'Commercial', 'Industrial'] as const;

const PROPERTY_TYPES: { label: string; value: string }[] = [
  { label: 'All Property Types', value: 'All' },
  { label: 'Land', value: 'Land' },
  { label: 'Residential Land', value: 'Residential Land' },
  { label: 'Commercial Land', value: 'Commercial Land' },
  { label: 'Agricultural Land', value: 'Agricultural Land' },
  { label: 'Development Land', value: 'Development Land' },
  { label: 'House / Bungalow', value: 'House' },
  { label: 'Commercial Building', value: 'Commercial Building' },
  { label: 'Office Space', value: 'Office Space' },
  { label: 'Showroom', value: 'Showroom' },
  { label: 'Industrial Property', value: 'Industrial Property' },
  { label: 'Rental Property', value: 'Rental Property' },
];

const ROAD_WIDTH_OPTIONS = [
  { label: 'Any Road Width', value: '0' },
  { label: '16+ ft (Standard)', value: '16' },
  { label: '20+ ft (Wide Paved)', value: '20' },
  { label: '30+ ft (Double Lane)', value: '30' },
  { label: '40+ ft (Highway/Main)', value: '40' },
];

const FACING_OPTIONS = [
  { label: 'Any Facing', value: 'All' },
  { label: 'East', value: 'East' },
  { label: 'West', value: 'West' },
  { label: 'North', value: 'North' },
  { label: 'South', value: 'South' },
  { label: 'North-East', value: 'North-East' },
  { label: 'North-West', value: 'North-West' },
  { label: 'South-East', value: 'South-East' },
  { label: 'South-West', value: 'South-West' },
];

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Available Only', value: 'Available' },
  { label: 'Under Negotiation', value: 'Under Negotiation' },
  { label: 'Sold', value: 'Sold' },
  { label: 'Rented', value: 'Rented' },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTransaction, setSelectedTransaction] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [minRoadWidth, setMinRoadWidth] = useState<string>('0');
  const [selectedFacing, setSelectedFacing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'area-desc'>('newest');

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick inquiry modal state
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProperties(getProperties());
  }, []);

  // Compute Active Filter Count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (selectedCategory !== 'All') count++;
    if (selectedType !== 'All') count++;
    if (selectedTransaction !== 'All') count++;
    if (selectedStatus !== 'All') count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (locationQuery.trim()) count++;
    if (minRoadWidth !== '0') count++;
    if (selectedFacing !== 'All') count++;
    return count;
  }, [
    searchTerm,
    selectedCategory,
    selectedType,
    selectedTransaction,
    selectedStatus,
    minPrice,
    maxPrice,
    locationQuery,
    minRoadWidth,
    selectedFacing,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedTransaction('All');
    setSelectedStatus('All');
    setMinPrice('');
    setMaxPrice('');
    setLocationQuery('');
    setMinRoadWidth('0');
    setSelectedFacing('All');
    setSortBy('newest');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Keyword / ID / Title / Location Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesId = p.id.toLowerCase().includes(q);
          const matchesAddress = p.location.address.toLowerCase().includes(q);
          const matchesCity = p.location.city.toLowerCase().includes(q);
          const matchesDistrict = p.location.district.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          if (
            !matchesTitle &&
            !matchesId &&
            !matchesAddress &&
            !matchesCity &&
            !matchesDistrict &&
            !matchesDesc
          ) {
            return false;
          }
        }

        // Category Tab Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Specific Type Filter
        if (selectedType !== 'All' && p.type !== selectedType) {
          return false;
        }

        // Transaction Type (Sale vs Rent)
        if (selectedTransaction !== 'All' && p.transactionType !== selectedTransaction) {
          return false;
        }

        // Status Filter
        if (selectedStatus !== 'All' && p.status !== selectedStatus) {
          return false;
        }

        // Location Query
        if (locationQuery.trim()) {
          const lq = locationQuery.toLowerCase();
          const inCity = p.location.city.toLowerCase().includes(lq);
          const inAddr = p.location.address.toLowerCase().includes(lq);
          const inDist = p.location.district.toLowerCase().includes(lq);
          if (!inCity && !inAddr && !inDist) return false;
        }

        // Min Price Filter
        if (minPrice && p.price < parseFloat(minPrice)) {
          return false;
        }

        // Max Price Filter
        if (maxPrice && p.price > parseFloat(maxPrice)) {
          return false;
        }

        // Road Width Filter
        if (minRoadWidth !== '0') {
          const requiredWidth = parseFloat(minRoadWidth);
          if (!p.specifications.roadWidthFt || p.specifications.roadWidthFt < requiredWidth) {
            return false;
          }
        }

        // Facing Direction Filter
        if (selectedFacing !== 'All' && p.specifications.facing !== selectedFacing) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'area-desc') {
          const aArea = a.specifications.landAreaSqFt || a.specifications.buildingAreaSqFt || 0;
          const bArea = b.specifications.landAreaSqFt || b.specifications.buildingAreaSqFt || 0;
          return bArea - aArea;
        }
        // Newest / Featured priority
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      });
  }, [
    properties,
    searchTerm,
    selectedCategory,
    selectedType,
    selectedTransaction,
    selectedStatus,
    minPrice,
    maxPrice,
    locationQuery,
    minRoadWidth,
    selectedFacing,
    sortBy,
  ]);

  const [inquiryLeadId, setInquiryLeadId] = useState<string>('');

  const handleInquireOpen = (property: Property) => {
    setInquiryProperty(property);
    setInquiryName('');
    setInquiryPhone('');
    setInquiryEmail('');
    setInquiryMessage(`Hello, I am interested in inquiring about "${property.title}" (ID: ${property.id}). Please share further specifications and site visit availability.`);
    setInquirySubmitted(false);
    setInquiryLeadId('');
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryProperty) return;

    setInquiryLoading(true);
    try {
      const newLead = saveLead({
        type: 'Property Inquiry',
        fullName: inquiryName.trim(),
        phone: inquiryPhone.trim(),
        email: inquiryEmail.trim() || undefined,
        propertyId: inquiryProperty.id,
        propertyType: inquiryProperty.type,
        location: `${inquiryProperty.location.address}, ${inquiryProperty.location.city}`,
        budget: inquiryProperty.priceLabel || formatNPR(inquiryProperty.price),
        message: inquiryMessage.trim(),
        urgency: 'Standard',
        status: 'New',
      });

      await sendInquiryNotification({
        leadId: newLead.id,
        type: 'Property Inquiry',
        fullName: newLead.fullName,
        phone: newLead.phone,
        email: newLead.email,
        serviceInterest: `Property ${inquiryProperty.id}: ${inquiryProperty.title}`,
        propertyType: inquiryProperty.type,
        location: `${inquiryProperty.location.address}, ${inquiryProperty.location.city}`,
        budgetOrArea: inquiryProperty.priceLabel || formatNPR(inquiryProperty.price),
        message: newLead.message,
      });

      setInquiryLeadId(newLead.id);
      setInquirySubmitted(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-24 transition-colors">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl dark:shadow-card-dark border border-navy-900 dark:border-dark-border">
          <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-dark-elevated text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15 dark:border-dark-border">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Verified Real Estate Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Verified Properties &amp; Land Parcels.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 dark:text-slate-400 leading-relaxed font-normal">
              Every listing on Kaltade undergoes boundary review, cadastral trace verification, and engineering due diligence. Explore prime commercial, residential, and development opportunities in Dhangadhi and Kailali.
            </p>

            {/* Top Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
              <Button
                href="/properties/list"
                variant="accent"
                size="sm"
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                List Your Property
              </Button>
              <Button
                href="/properties/find"
                variant="white"
                size="sm"
                leftIcon={<Search className="w-4 h-4" />}
              >
                Submit Buyer Requirement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Search & Filter Bar */}
        <div className="bg-white dark:bg-dark-card rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, road width, keyword, or Property ID (e.g. KAL-RE-0001)..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 focus:bg-white dark:focus:bg-dark-surface transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-elevated text-navy-950 dark:text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-navy-900 dark:text-sky-300" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-navy-900 dark:bg-sky-400 text-white dark:text-navy-950 text-[11px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort properties"
                  className="px-3 py-3 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm font-semibold text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
                    selectedCategory === cat
                      ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-elevated hover:text-navy-950 dark:hover:text-white'
                  )}
                >
                  {cat === 'All' ? 'All Categories' : `${cat} Properties`}
                </button>
              ))}
            </div>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 shrink-0 ml-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar / Mobile Collapsible Drawer */}
          <aside
            className={cn(
              'lg:block bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-6 lg:sticky lg:top-28 transition-all',
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-dark-border">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-navy-900 dark:text-sky-300" />
                <h3 className="text-base font-extrabold text-navy-950 dark:text-white">Refine Search</h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset all
                </button>
              )}
            </div>

            {/* Transaction Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Transaction Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-dark-surface rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
                {['All', 'Sale', 'Rent'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTransaction(t)}
                    className={cn(
                      'py-1.5 rounded-lg transition-all text-center cursor-pointer',
                      selectedTransaction === t
                        ? 'bg-white dark:bg-dark-card text-navy-950 dark:text-white shadow-xs font-bold'
                        : 'hover:text-navy-950 dark:hover:text-white'
                    )}
                  >
                    {t === 'All' ? 'Any' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Specific Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Query */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Location / Ward / Area
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="e.g. Hasanpur, Chauraha, Attariya"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Price Range (NPR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block mb-1">Min Price</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="e.g. 5000000"
                    className="w-full px-2.5 py-2 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block mb-1">Max Price</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g. 50000000"
                    className="w-full px-2.5 py-2 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* Road Width */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Road Access Width
              </label>
              <select
                value={minRoadWidth}
                onChange={(e) => setMinRoadWidth(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
              >
                {ROAD_WIDTH_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Facing Direction */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Facing Orientation
              </label>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
              >
                {FACING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 uppercase tracking-wider block">
                Listing Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs font-semibold text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400 cursor-pointer"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Guarantee badge in sidebar */}
            <div className="p-4 rounded-xl bg-navy-50 dark:bg-dark-elevated border border-navy-100 dark:border-dark-border text-navy-950 dark:text-white space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-sky-300">
                <FileCheck2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Kaltade Verified</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                All properties are vetted for cadastral match, municipal road width compliance, and clear title history.
              </p>
            </div>
          </aside>

          {/* Property Grid (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status Header */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium px-1">
              <span>
                Showing <strong className="text-navy-950 dark:text-white font-bold">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'}
                {activeFiltersCount > 0 && ` with active filters`}
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear all filters
                </button>
              )}
            </div>

            {/* Grid of Property Cards */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onInquire={handleInquireOpen}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white dark:bg-dark-card rounded-3xl p-10 sm:p-16 border border-slate-200 dark:border-dark-border text-center space-y-6 shadow-xs dark:shadow-card-dark">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                    No properties found.
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    We couldn&apos;t find any verified listings matching your selected filter criteria. Try adjusting your filters or submit a custom requirement.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    onClick={resetFilters}
                    variant="primary"
                    size="sm"
                    leftIcon={<RotateCcw className="w-4 h-4" />}
                  >
                    Reset Filters
                  </Button>
                  <Button
                    href="/properties/find"
                    variant="accent"
                    size="sm"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    Submit Custom Requirement
                  </Button>
                </div>
              </div>
            )}

            {/* Bottom Support Banner */}
            <div className="mt-12 bg-gradient-to-r from-navy-900 to-navy-950 dark:from-dark-surface dark:to-dark-card rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800 dark:border-dark-border shadow-xl dark:shadow-card-dark">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tailored Property Search
                </div>
                <h4 className="text-lg font-bold">
                  Looking for a specific parcel or off-market commercial property?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 max-w-xl">
                  Tell our engineering and valuation advisory desk your required area, road access, and budget. We match you with verified, unadvertised opportunities.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Button
                  href="/properties/find"
                  variant="accent"
                  size="md"
                  rightIcon={<Search className="w-4 h-4" />}
                >
                  Tell Us What You Need
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      <Modal
        isOpen={!!inquiryProperty}
        onClose={() => setInquiryProperty(null)}
        title={inquirySubmitted ? 'Inquiry Sent Successfully' : 'Inquire About Property'}
        subtitle={
          inquiryProperty && !inquirySubmitted
            ? `${inquiryProperty.title} (${inquiryProperty.id})`
            : undefined
        }
        maxWidth="md"
      >
        {inquirySubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              {inquiryLeadId && (
                <span className="inline-block px-3 py-1 rounded-md bg-navy-50 dark:bg-dark-surface text-navy-900 dark:text-sky-300 font-mono text-xs font-bold border border-navy-100 dark:border-dark-border">
                  Tracking ID: {inquiryLeadId}
                </span>
              )}
              <h4 className="text-xl font-bold text-navy-950 dark:text-white">Inquiry Logged Successfully!</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your inquiry for <strong className="text-navy-950 dark:text-white">{inquiryProperty?.title}</strong> has been received by our engineering and property consultancy desk.
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-800 dark:text-emerald-300 text-center max-w-sm mx-auto">
                ✉️ Notification dispatched to official desk &amp; WhatsApp channel.
              </div>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              {inquiryProperty && (
                <a
                  href={generateWhatsAppUrl({
                    leadId: inquiryLeadId,
                    type: 'Property Inquiry',
                    fullName: inquiryName,
                    phone: inquiryPhone,
                    email: inquiryEmail || undefined,
                    serviceInterest: `Property ${inquiryProperty.id}: ${inquiryProperty.title}`,
                    propertyType: inquiryProperty.type,
                    location: `${inquiryProperty.location.address}, ${inquiryProperty.location.city}`,
                    budgetOrArea: inquiryProperty.priceLabel || formatNPR(inquiryProperty.price),
                    message: inquiryMessage,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Instant Copy via WhatsApp</span>
                </a>
              )}
              <Button
                onClick={() => setInquiryProperty(null)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            {inquiryProperty && (
              <div className="p-3 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">
                    Listing Price
                  </span>
                  <strong className="text-navy-950 dark:text-white font-bold">
                    {inquiryProperty.priceLabel || formatNPR(inquiryProperty.price)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">
                    Location
                  </span>
                  <span className="text-navy-950 dark:text-white font-medium">
                    {inquiryProperty.location.city}, {inquiryProperty.location.district}
                  </span>
                </div>
                <Badge status={inquiryProperty.status} size="sm">
                  {inquiryProperty.status}
                </Badge>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-surface rounded-lg border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-surface rounded-lg border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-surface rounded-lg border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                Message / Inquiries
              </label>
              <textarea
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-dark-surface rounded-lg border border-slate-200 dark:border-dark-border text-xs text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setInquiryProperty(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={inquiryLoading}
              >
                Submit Inquiry
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
