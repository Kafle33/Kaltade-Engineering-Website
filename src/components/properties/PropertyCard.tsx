'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Ruler,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/ui/Badge';
import { formatNPR } from '@/lib/utils';

export interface PropertyCardProps {
  property: Property;
  onInquire?: (property: Property) => void;
}

export function PropertyCard({ property, onInquire }: PropertyCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Property Image Container */}
      <Link
        href={`/properties/${property.id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-navy-950/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase">
              {property.type}
            </span>
            <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-md text-navy-950 text-[11px] font-extrabold uppercase">
              FOR {property.transactionType}
            </span>
          </div>

          <Badge status={property.status} size="sm">
            {property.status}
          </Badge>
        </div>

        {/* Bottom Property ID badge */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-navy-950/80 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold tracking-wider">
            {property.id}
          </span>
        </div>
      </Link>

      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">
              {property.location.address}, {property.location.city}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-navy-700 transition-colors line-clamp-2 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="pt-1">
            <span className="text-lg sm:text-xl font-extrabold text-navy-950">
              {property.priceLabel || formatNPR(property.price)}
            </span>
          </div>
        </div>

        {/* Key Specs Pill Bar */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl">
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-medium">
              Area
            </span>
            <strong className="text-navy-950 font-bold truncate block">
              {property.specifications.landArea || `${property.specifications.buildingAreaSqFt} sq.ft.` || 'N/A'}
            </strong>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-medium">
              Road Access
            </span>
            <strong className="text-navy-950 font-bold truncate block">
              {property.specifications.roadWidthFt
                ? `${property.specifications.roadWidthFt} ft road`
                : 'Paved'}
            </strong>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-medium">
              Facing
            </span>
            <strong className="text-navy-950 font-bold truncate block">
              {property.specifications.facing || 'East/North'}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <Link
            href={`/properties/${property.id}`}
            className="text-xs font-bold text-navy-900 hover:text-navy-700 flex items-center gap-1 group/btn"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {onInquire && (
            <button
              type="button"
              onClick={() => onInquire(property)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-50 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors"
            >
              Inquire
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
