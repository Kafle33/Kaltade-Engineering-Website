'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Briefcase,
  Layers,
  Sparkles,
  PhoneCall,
  Check,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { projectsData } from '@/data/projectsData';
import { ProjectCaseStudy } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  'All',
  'Valuation',
  'Engineering',
  'Design',
  'DPR',
  'Commercial Real Estate',
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Engineering') {
          // If Engineering is chosen, match Engineering or Design or DPR
          if (
            project.category !== 'Engineering' &&
            project.category !== 'Design' &&
            project.category !== 'DPR'
          ) {
            return false;
          }
        } else if (project.category !== selectedCategory) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesLoc = project.location.toLowerCase().includes(q);
        const matchesDesc = project.shortDescription.toLowerCase().includes(q);
        const matchesServices = project.servicesDelivered.some((s) =>
          s.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesServices) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 sm:pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-navy-900">
          <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
              <Briefcase className="w-4 h-4 text-amber-400" />
              Proven Track Record & Case Studies
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Engineering Projects & Landmark Valuations.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Explore our portfolio of institutional property valuations for commercial banks, bankable Detailed Project Reports (DPR), structural building designs, and commercial real estate master plans executed across Sudurpashchim and Nepal.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
                  100+
                </div>
                <div className="text-[11px] text-slate-300">
                  Institutional Valuations
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
                  NBC 105
                </div>
                <div className="text-[11px] text-slate-300">
                  Seismic Code Design
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
                  Bankable
                </div>
                <div className="text-[11px] text-slate-300">
                  CapEx DPR Formulation
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono">
                  100%
                </div>
                <div className="text-[11px] text-slate-300">
                  Cadastral Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all',
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-950'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <Link
                    href={`/projects/${project.slug || project.id}`}
                    className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={
                        project.images[0] ||
                        'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-navy-950/85 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-navy-950 text-xs font-extrabold">
                          {project.year}
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-md bg-navy-950/80 backdrop-blur-md text-amber-300 font-mono text-[11px] font-bold">
                        {project.id}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-navy-900/90 backdrop-blur-md text-slate-200 text-xs font-semibold">
                        Client: {project.clientType}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/projects/${project.slug || project.id}`}
                      className="block"
                    >
                      <h3 className="text-lg sm:text-xl font-extrabold text-navy-950 group-hover:text-amber-600 transition-colors leading-snug">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>

                    {/* Services Delivered Pills */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.servicesDelivered.slice(0, 3).map((svc, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{svc}</span>
                        </span>
                      ))}
                      {project.servicesDelivered.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-[11px] font-medium">
                          +{project.servicesDelivered.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Detailed Case Study
                  </span>
                  <Link
                    href={`/projects/${project.slug || project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-900 group-hover:text-amber-600 transition-colors"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
            <h3 className="text-lg font-bold text-navy-950">
              No projects found matching &apos;{selectedCategory}&apos;
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your category selection or clearing your search keywords to view our complete project dossier.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              variant="primary"
              size="sm"
            >
              Show All Projects
            </Button>
          </div>
        )}

        {/* Consultation Callout Banner */}
        <div className="mt-16 bg-navy-950 rounded-3xl p-8 sm:p-12 text-white border border-navy-900 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Engineering & DPR Consultancy
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Planning a commercial development or need a certified property valuation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our registered civil engineers, structural consultants, and licensed valuators are ready to discuss your project scope in Dhangadhi or anywhere in Nepal.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Button
              href="/properties/find"
              variant="accent"
              size="lg"
            >
              Discuss Your Project
            </Button>
            <Button
              href="tel:+9779858421098"
              variant="white"
              size="lg"
              leftIcon={<PhoneCall className="w-4 h-4" />}
            >
              +977 9858421098
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
