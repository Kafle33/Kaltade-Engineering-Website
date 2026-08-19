'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Compass,
  Ruler,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  Car,
  BedDouble,
  Bath,
  FileCheck,
  Clock,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Landmark,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { getProperties, saveLead } from '@/lib/storage';
import { formatNPR, formatAreaSqFt, sqFtToTeraiUnits, cn } from '@/lib/utils';
import { sendInquiryNotification, generateWhatsAppUrl } from '@/lib/email';
import { Property } from '@/types';

export default function PropertyDetailPage() {
  const params = useParams();
  const rawId = params?.id as string | undefined;

  const [properties, setProperties] = useState<Property[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Inquiry Form State
  const [formMode, setFormMode] = useState<'inquiry' | 'visit'>('inquiry');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProperties(getProperties());
  }, []);

  const property = useMemo(() => {
    if (!rawId || properties.length === 0) return null;
    const decoded = decodeURIComponent(rawId).toLowerCase();
    return (
      properties.find(
        (p) => p.id.toLowerCase() === decoded || p.slug.toLowerCase() === decoded
      ) || null
    );
  }, [properties, rawId]);

  const relatedProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.category === property.category || p.type === property.type)
      )
      .slice(0, 3);
  }, [properties, property]);

  const nextImage = () => {
    if (!property || property.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property || property.images.length <= 1) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !property) return;

    setIsSubmitting(true);
    try {
      const newLead = saveLead({
        type: 'Property Inquiry',
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        propertyId: property.id,
        propertyType: property.type,
        location: `${property.location.address}, ${property.location.city}`,
        budget: property.priceLabel || formatNPR(property.price),
        message: `${formMode === 'visit' ? `[Site Visit Date: ${preferredDate || 'Flexible'}] ` : ''}${message.trim() || 'Inquiring for verified documents & site inspection.'}`,
        urgency: 'Standard',
        status: 'New',
      });

      sendInquiryNotification({
        leadId: newLead.id,
        type: formMode === 'visit' ? 'Site Visit Request' : 'Property Inquiry',
        fullName: newLead.fullName,
        phone: newLead.phone,
        email: newLead.email,
        serviceInterest: `Property ${property.id}: ${property.title}`,
        propertyType: property.type,
        location: `${property.location.address}, ${property.location.city}`,
        budgetOrArea: property.priceLabel || formatNPR(property.price),
        message: newLead.message,
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-bg pt-32 pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-900 dark:border-sky-400" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-bg pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-dark-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-dark-border text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-navy-950 dark:text-white">
              Property Not Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              The property with ID &quot;{rawId}&quot; could not be located or may have been unlisted.
            </p>
          </div>
          <Button href="/properties" variant="primary" size="md" className="w-full">
            Return to Property Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const teraiArea = property.specifications.landAreaSqFt
    ? sqFtToTeraiUnits(property.specifications.landAreaSqFt)
    : null;

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 dark:text-sky-300 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedUrl ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Badges Bar */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge status={property.status} size="md">
                    {property.status}
                  </Badge>
                  <span className="px-3 py-1 rounded-md bg-navy-100 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 text-xs font-mono font-bold border border-navy-200 dark:border-dark-border">
                    ID: {property.id}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 text-xs font-bold">
                    {property.transactionType === 'Sale' ? 'For Sale' : 'For Rent'}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 text-xs font-medium">
                    {property.type}
                  </span>
                </div>

                {property.documentsVerified && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Technical Due Diligence Complete</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 dark:text-white leading-tight">
                {property.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-dark-border">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    {property.location.address}, {property.location.city},{' '}
                    {property.location.district}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase text-slate-400 dark:text-slate-500 block font-semibold">
                    Listing Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                    {property.priceLabel || formatNPR(property.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery Carousel */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={
                    property.images[currentImageIndex] ||
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt={`${property.title} image ${currentImageIndex + 1}`}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                />

                {/* Carousel Controls */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-xs font-semibold">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Verified Watermark Tag */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-navy-950/85 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Kaltade Verified Listing</span>
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        'relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer',
                        currentImageIndex === idx
                          ? 'border-amber-600 scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-dark-border">
                <Ruler className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                  Engineering &amp; Physical Specifications
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Land Area */}
                {(property.specifications.landArea || property.specifications.landAreaSqFt) && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Land Area
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.landArea || teraiArea?.label}
                    </strong>
                    {property.specifications.landAreaSqFt && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">
                        ({formatAreaSqFt(property.specifications.landAreaSqFt)})
                      </span>
                    )}
                  </div>
                )}

                {/* Built-up Area */}
                {property.specifications.buildingAreaSqFt && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Built-up Area
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {formatAreaSqFt(property.specifications.buildingAreaSqFt)}
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Total usable space</span>
                  </div>
                )}

                {/* Road Width & Type */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Road Access
                  </span>
                  <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                    {property.specifications.roadWidthFt
                      ? `${property.specifications.roadWidthFt} Feet`
                      : 'Motorable Access'}
                  </strong>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                    {property.specifications.roadType || 'Paved Road'}
                  </span>
                </div>

                {/* Facing Orientation */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                    Facing Direction
                  </span>
                  <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                    {property.specifications.facing || 'East'}
                  </strong>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Optimal orientation</span>
                </div>

                {/* Frontage */}
                {property.specifications.frontageFt && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Frontage Width
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.frontageFt} Feet
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Road facing length</span>
                  </div>
                )}

                {/* Floors */}
                {property.specifications.floors && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Storeys / Floors
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.floors} Storey
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">RCC Structure</span>
                  </div>
                )}

                {/* Bedrooms */}
                {property.specifications.bedrooms && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Bedrooms
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.bedrooms} Bedrooms
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      {property.specifications.bathrooms ? `${property.specifications.bathrooms} Bathrooms` : 'Family layout'}
                    </span>
                  </div>
                )}

                {/* Parking */}
                {property.specifications.parkingSpaces && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Parking Capacity
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.parkingSpaces} Vehicles
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Covered &amp; surface</span>
                  </div>
                )}

                {/* Year Built */}
                {property.specifications.yearBuilt && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      Construction Year
                    </span>
                    <strong className="text-navy-950 dark:text-white text-sm sm:text-base font-extrabold block">
                      {property.specifications.yearBuilt}
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">NBC Compliant</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <h2 className="text-xl font-bold text-navy-950 dark:text-white">Property Description</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-6">
                <h2 className="text-xl font-bold text-navy-950 dark:text-white">Key Features &amp; Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Highlights (Engineering Due Diligence) */}
            {property.technicalHighlights && property.technicalHighlights.length > 0 && (
              <div className="bg-navy-950 dark:bg-dark-surface text-white rounded-3xl p-6 sm:p-8 border border-navy-900 dark:border-dark-border shadow-lg dark:shadow-card-dark space-y-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Technical Highlights &amp; Engineering Audit
                    </h2>
                    <p className="text-xs text-slate-300 dark:text-slate-400 mt-0.5">
                      Professional site assessment conducted by Kaltade Engineering Services
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.technicalHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 dark:bg-dark-elevated/60 border border-white/10 dark:border-dark-border space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <FileCheck className="w-4 h-4 text-amber-400" />
                        <span>Technical Parameter {idx + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 leading-relaxed font-normal">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Potential */}
            {property.specifications.developmentPotential && (
              <div className="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 dark:border-amber-800/60 rounded-3xl p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-lg">
                  <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Development Potential &amp; Advisory Recommendation</span>
                </div>
                <p className="text-sm sm:text-base text-amber-950/90 dark:text-amber-200 leading-relaxed">
                  {property.specifications.developmentPotential}
                </p>
              </div>
            )}

            {/* Location & Neighborhood Info */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-dark-border">
                <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-xl font-bold text-navy-950 dark:text-white">Location &amp; Accessibility</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block uppercase">
                    Address / Ward
                  </span>
                  <p className="text-navy-950 dark:text-white font-bold">
                    {property.location.address}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block uppercase">
                    City &amp; District
                  </span>
                  <p className="text-navy-950 dark:text-white font-bold">
                    {property.location.city}, {property.location.district} ({property.location.province})
                  </p>
                </div>
                {property.location.landmark && (
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block uppercase">
                      Nearby Landmark
                    </span>
                    <p className="text-navy-950 dark:text-white font-semibold">
                      {property.location.landmark}
                    </p>
                  </div>
                )}
                {property.location.coordinates && (
                  <div className="space-y-1 sm:col-span-2 pt-2">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 block uppercase">
                      GPS Coordinates
                    </span>
                    <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      Lat: {property.location.coordinates.lat}, Lng: {property.location.coordinates.lng}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Due Diligence Disclaimer */}
            <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-navy-950 dark:text-white">
                <Info className="w-4 h-4 text-navy-900 dark:text-sky-300 shrink-0" />
                <span>Kaltade Due Diligence &amp; Statutory Disclaimer</span>
              </div>
              <p>
                All property listings curated by Kaltade Engineering Services Pvt. Ltd. undergo preliminary physical site inspection and land ownership trace verification. Prospective buyers are advised to complete formal statutory registry checks prior to financial commitment. Valuation figures represent professional market estimations.
              </p>
            </div>
          </div>

          {/* Sticky Inquiry & Site Visit Sidebar (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-dark-border shadow-xl dark:shadow-card-dark space-y-6">
              {/* Form Toggle: Inquiry vs Site Visit */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-dark-surface rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setFormMode('inquiry');
                    setSubmitSuccess(false);
                  }}
                  className={cn(
                    'py-2.5 rounded-xl transition-all cursor-pointer',
                    formMode === 'inquiry'
                      ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white'
                  )}
                >
                  Inquire
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormMode('visit');
                    setSubmitSuccess(false);
                  }}
                  className={cn(
                    'py-2.5 rounded-xl transition-all cursor-pointer',
                    formMode === 'visit'
                      ? 'bg-navy-900 dark:bg-navy-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white'
                  )}
                >
                  Schedule Visit
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                      {formMode === 'visit' ? 'Site Visit Requested!' : 'Inquiry Submitted!'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Our engineering property consultant in Dhangadhi will contact you within 24 hours.
                    </p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 max-w-sm mx-auto text-xs text-emerald-800 dark:text-emerald-300 text-center">
                    âœ‰ï¸ Notification sent to <strong>kaltadeengineeringservices@gmail.com</strong> &amp; <strong>ai.antigravity11@gmail.com</strong>
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={generateWhatsAppUrl({
                        leadId: property.id,
                        type: formMode === 'visit' ? 'Site Visit Request' : 'Property Inquiry',
                        fullName,
                        phone,
                        email,
                        serviceInterest: `Inquiry on Property ${property.id}`,
                        propertyType: property.type,
                        location: `${property.location.address}, ${property.location.city}`,
                        budgetOrArea: `${property.priceLabel || formatNPR(property.price)} (${property.specifications.landArea})`,
                        message: `${formMode === 'visit' ? `[Visit Date: ${preferredDate || 'Flexible'}] ` : ''}${message || 'Inquiring for details & verified trace copies.'}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFullName('');
                        setPhone('');
                        setEmail('');
                        setMessage('');
                        setPreferredDate('');
                      }}
                      className="text-xs font-bold text-navy-900 dark:text-sky-400 underline hover:text-amber-600 dark:hover:text-amber-400 py-1 cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                      {formMode === 'visit' ? 'Book a Guided Site Inspection' : 'Direct Property Inquiry'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formMode === 'visit'
                        ? 'Inspect cadastral boundaries and road width on-site with our engineer.'
                        : 'Receive certified trace copies and seller negotiation guidance.'}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Bahadur"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                    />
                  </div>

                  {formMode === 'visit' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-950 dark:text-slate-300 block">
                      Specific Inquiries / Remarks
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        formMode === 'visit'
                          ? 'Specify your preferred timing or questions regarding boundaries/road width...'
                          : 'Ask for valuation report summary, cadastral trace copy, or owner negotiation...'
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border text-xs sm:text-sm text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-900 dark:focus:ring-sky-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant={formMode === 'visit' ? 'accent' : 'primary'}
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    {formMode === 'visit' ? 'Confirm Site Visit Request' : 'Send Property Inquiry'}
                  </Button>

                  <div className="text-center pt-2">
                    <span className="text-[11px] text-slate-400 dark:text-slate-400">
                      Direct Hotline:{' '}
                      <a
                        href="tel:+9779858425256"
                        className="text-navy-950 dark:text-sky-300 font-bold hover:underline"
                      >
                        +977-9858425256
                      </a>
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Contact Card */}
            <div className="bg-navy-950 dark:bg-dark-surface rounded-3xl p-6 text-white space-y-4 border border-navy-900 dark:border-dark-border shadow-xl dark:shadow-card-dark">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Landmark className="w-4 h-4" />
                <span>Kaltade Dhangadhi Office</span>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed">
                Meet our civil engineers and licensed property valuators in person at our office in LN. Chowk, Dhangadhi, Kailali for Lalpurja verification and title history review.
              </p>
              <div className="pt-2 border-t border-white/10 dark:border-dark-border space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>+977-9858425256 / 091-521256</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>kaltadeengineeringservices@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar / Related Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-dark-border space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  Similar Verified Opportunities
                </span>
                <h3 className="text-2xl font-extrabold text-navy-950 dark:text-white">
                  Other Properties You May Consider
                </h3>
              </div>
              <Button href="/properties" variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
