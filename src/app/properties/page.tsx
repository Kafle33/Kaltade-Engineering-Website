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
  Check
} from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { getProperties, saveLead } from '@/lib/storage';
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

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // 1. Text Search (title, id, address, description, landmark)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesId = property.id.toLowerCase().includes(query);
        const matchesAddress = property.location.address.toLowerCase().includes(query);
        const matchesCity = property.location.city.toLowerCase().includes(query);
        const matchesLandmark = property.location.landmark?.toLowerCase().includes(query) || false;
        const matchesDesc = property.description.toLowerCase().includes(query);

        if (!matchesTitle && !matchesId && !matchesAddress && !matchesCity && !matchesLandmark && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter Tab
      if (selectedCategory !== 'All' && property.category !== selectedCategory) {
        return false;
      }

      // 3. Specific Property Type
      if (selectedType !== 'All' && property.type !== selectedType) {
        return false;
      }

      // 4. Transaction Type (Sale / Rent / Lease)
      if (selectedTransaction !== 'All' && property.transactionType !== selectedTransaction) {
        return false;
      }

      // 5. Status
      if (selectedStatus !== 'All' && property.status !== selectedStatus) {
        return false;
      }

      // 6. Price Range
      const parsedMinPrice = minPrice ? parseFloat(minPrice) : null;
      const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

      if (parsedMinPrice !== null && !isNaN(parsedMinPrice) && property.price < parsedMinPrice) {
        return false;
      }
      if (parsedMaxPrice !== null && !isNaN(parsedMaxPrice) && property.price > parsedMaxPrice) {
        return false;
      }

      // 7. Location text query
      if (locationQuery.trim()) {
        const locQuery = locationQuery.toLowerCase().trim();
        const fullLoc = `${property.location.address} ${property.location.city} ${property.location.district} ${property.location.landmark || ''}`.toLowerCase();
        if (!fullLoc.includes(locQuery)) {
          return false;
        }
      }

      // 8. Road Width
      const requiredRoadWidth = parseFloat(minRoadWidth);
      if (requiredRoadWidth > 0) {
        const roadWidth = property.specifications.roadWidthFt || 0;
        if (roadWidth < requiredRoadWidth) {
          return false;
        }
      }

      // 9. Facing Direction
      if (selectedFacing !== 'All' && property.specifications.facing !== selectedFacing) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'area-desc') {
        const areaA = a.specifications.landAreaSqFt || a.specifications.buildingAreaSqFt || 0;
        const areaB = b.specifications.landAreaSqFt || b.specifications.buildingAreaSqFt || 0;
        return areaB - areaA;
      }
      // 'newest' default (sort by publishedDate or id desc)
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

  const handleInquireOpen = (property: Property) => {
    setInquiryProperty(property);
    setInquiryName('');
    setInquiryPhone('');
    setInquiryEmail('');
    setInquiryMessage(`Hello, I am interested in inquiring about "${property.title}" (ID: ${property.id}). Please share further specifications and site visit availability.`);
    setInquirySubmitted(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryProperty) return;

    setInquiryLoading(true);
    try {
      saveLead({
        type: 'Property Inquiry',
        fullName: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail || undefined,
        propertyId: inquiryProperty.id,
        propertyType: inquiryProperty.type,
        location: `${inquiryProperty.location.address}, ${inquiryProperty.location.city}`,
        budget: inquiryProperty.priceLabel || formatNPR(inquiryProperty.price),
        message: inquiryMessage,
        urgency: 'Standard',
        status: 'New',
      });
      setInquirySubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 sm:pt-32 pb-24">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-navy-900">
          <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Verified Real Estate Marketplace
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Verified Properties & Land Parcels.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
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
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, road width, keyword, or Property ID (e.g. KAL-RE-0001)..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
                className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-navy-950 rounded-xl text-sm font-semibold transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-navy-900" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-xs font-semibold text-slate-500">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort properties"
                  className="px-3 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                    selectedCategory === cat
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-950'
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
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 shrink-0 ml-2"
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
              'lg:block bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 lg:sticky lg:top-28 transition-all',
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            )}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-navy-900" />
                <h3 className="text-base font-extrabold text-navy-950">Refine Search</h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset all
                </button>
              )}
            </div>

            {/* Transaction Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Transaction Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                {['All', 'Sale', 'Rent'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTransaction(t)}
                    className={cn(
                      'py-1.5 rounded-lg transition-all text-center',
                      selectedTransaction === t
                        ? 'bg-white text-navy-950 shadow-sm font-bold'
                        : 'hover:text-navy-950'
                    )}
                  >
                    {t === 'All' ? 'Any' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Specific Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Location / Ward / Area
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="e.g. Hasanpur, Chauraha, Attariya"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Price Range (NPR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block mb-1">Min Price</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="e.g. 5000000"
                    className="w-full px-2.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block mb-1">Max Price</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g. 50000000"
                    className="w-full px-2.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>
              </div>
            </div>

            {/* Road Width */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Road Access Width
              </label>
              <select
                value={minRoadWidth}
                onChange={(e) => setMinRoadWidth(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Facing Orientation
              </label>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
              <label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                Listing Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Guarantee badge in sidebar */}
            <div className="p-4 rounded-xl bg-navy-50 border border-navy-100 text-navy-950 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                <span>Kaltade Verified</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                All properties are vetted for cadastral match, municipal road width compliance, and clear title history.
              </p>
            </div>
          </aside>

          {/* Property Grid (3 columns on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status Header */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium px-1">
              <span>
                Showing <strong className="text-navy-950 font-bold">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'}
                {activeFiltersCount > 0 && ` with active filters`}
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-amber-700 hover:text-amber-800 font-bold text-xs flex items-center gap-1"
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
              <div className="bg-white rounded-3xl p-10 sm:p-16 border border-slate-200 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-navy-950">
                    No properties found.
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
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
            <div className="mt-12 bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tailored Property Search
                </div>
                <h4 className="text-lg font-bold">
                  Looking for a specific parcel or off-market commercial property?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
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
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-navy-950">Thank You!</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your inquiry for <strong className="text-navy-950">{inquiryProperty?.title}</strong> has been logged with our property desk. A licensed consultant will contact you shortly.
              </p>
            </div>
            <div className="pt-3">
              <Button
                onClick={() => setInquiryProperty(null)}
                variant="primary"
                size="sm"
                className="w-full"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            {inquiryProperty && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Listing Price
                  </span>
                  <strong className="text-navy-950 font-bold">
                    {inquiryProperty.priceLabel || formatNPR(inquiryProperty.price)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Location
                  </span>
                  <span className="text-navy-950 font-medium">
                    {inquiryProperty.location.city}, {inquiryProperty.location.district}
                  </span>
                </div>
                <Badge status={inquiryProperty.status} size="sm">
                  {inquiryProperty.status}
                </Badge>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 block">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 block">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={inquiryPhone}
                onChange={(e) => setInquiryPhone(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 block">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-950 block">
                Message / Inquiries
              </label>
              <textarea
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900"
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
