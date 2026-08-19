'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Check,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  CheckSquare2,
  TableProperties
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { projectsData } from '@/data/projectsData';
import { ProjectCaseStudy } from '@/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const rawId = params?.id as string | undefined;

  const project = useMemo(() => {
    if (!rawId) return null;
    const decoded = decodeURIComponent(rawId).toLowerCase();
    return (
      projectsData.find(
        (p) => p.slug.toLowerCase() === decoded || p.id.toLowerCase() === decoded
      ) || null
    );
  }, [rawId]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projectsData
      .filter((p) => p.id !== project.id)
      .slice(0, 2);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
              Case Study Not Found
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The project case study you requested could not be located in our engineering archives.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button href="/projects" variant="primary" size="md">
              Back to Projects Dossier
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-dark-bg text-navy-950 dark:text-dark-text pt-28 sm:pt-32 pb-24 transition-colors">
      {/* Back Navigation Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-navy-900 dark:text-sky-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Case Studies &amp; Track Record</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section */}
        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-md bg-navy-950 dark:bg-dark-elevated text-white dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-md bg-navy-50 dark:bg-dark-surface text-navy-900 dark:text-slate-200 text-xs font-semibold">
              Client: {project.clientType}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {project.year}
            </span>
            <span className="px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200/60 dark:border-amber-800/60 ml-auto font-mono">
              {project.id}
            </span>
          </div>

          {/* Project Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 dark:text-white leading-tight">
            {project.title}
          </h1>

          {/* Location & Summary */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pb-4 border-b border-slate-100 dark:border-dark-border">
            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{project.location}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Featured Image & Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-lg dark:shadow-card-dark border border-slate-200 dark:border-dark-border">
            <Image
              src={
                project.images[0] ||
                'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=1200&q=80'
              }
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {project.images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border shadow-xs bg-slate-100 dark:bg-dark-surface"
                >
                  <Image
                    src={img}
                    alt={`${project.title} secondary view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editorial Narrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Narrative Column (2 cols) */}
          <div className="md:col-span-2 space-y-8">
            {/* Section 1: The Challenge */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="flex items-center gap-2.5 text-navy-950 dark:text-white font-extrabold text-xl">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2>The Challenge</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                {project.challenge}
              </p>
            </div>

            {/* Section 2: Our Approach */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="flex items-center gap-2.5 text-navy-950 dark:text-white font-extrabold text-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h2>Our Engineering Approach</h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                {project.approach}
              </p>
            </div>

            {/* Section 3: The Outcome */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/30 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-950 dark:text-emerald-300 font-extrabold text-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2>The Outcome &amp; Impact</h2>
              </div>
              <p className="text-emerald-950/90 dark:text-emerald-200 leading-relaxed text-sm sm:text-base font-medium">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Sidebar Column: Services & Specifications (1 col) */}
          <div className="space-y-8">
            {/* Services Delivered */}
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-dark-border">
                <CheckSquare2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                  Services Delivered
                </h3>
              </div>

              <ul className="space-y-2.5">
                {project.servicesDelivered.map((svc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            {project.specifications && project.specifications.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-dark-border">
                  <TableProperties className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-base font-extrabold text-navy-950 dark:text-white">
                    Project Specifications
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-dark-border text-xs">
                  {project.specifications.map((spec, sIdx) => (
                    <div key={sIdx} className="py-2.5 flex flex-col space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <strong className="text-navy-950 dark:text-white font-bold text-xs sm:text-sm">
                        {spec.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inquire for Similar Project Card */}
            <div className="bg-navy-950 dark:bg-dark-surface rounded-3xl p-6 text-white space-y-4 border border-navy-900 dark:border-dark-border shadow-xl dark:shadow-card-dark">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Need Similar Expertise?</span>
              </div>
              <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed">
                Consult with our engineering team for bankable DPR formulation, municipal structural designs, or collateral asset valuation.
              </p>
              <div className="pt-2">
                <Button
                  href="/properties/find"
                  variant="accent"
                  size="sm"
                  className="w-full"
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Case Studies */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-slate-200 dark:border-dark-border space-y-6">
            <h3 className="text-xl font-extrabold text-navy-950 dark:text-white">
              Explore More Case Studies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug || rel.id}`}
                  className="group p-6 rounded-3xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-lg dark:hover:shadow-card-dark-hover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-navy-50 dark:bg-dark-elevated text-navy-900 dark:text-sky-300 text-[11px] font-bold uppercase">
                        {rel.category}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                        {rel.year} â€¢ {rel.location}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-navy-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs font-bold text-navy-900 dark:text-sky-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
