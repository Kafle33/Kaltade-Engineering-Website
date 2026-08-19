'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/ui/SectionHeader';
import { Button } from '@/ui/Button';
import { MotionReveal, MotionItem } from '@/components/ui/MotionReveal';
import { insightsData } from '@/data/insightsData';

export function InsightsPreview() {
  const featuredArticles = insightsData.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-dark-bg border-b border-slate-200/80 dark:border-dark-border relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="KNOWLEDGE & ADVISORY"
              title="Property & Engineering Insights."
              subtitle="Essential guides on Nepal land laws, property valuation standards, building bylaws, and DPR preparation written by our technical consultants."
              align="left"
              className="mb-0 max-w-2xl"
            />

            <div className="shrink-0">
              <Button
                href="/insights"
                variant="secondary"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore All Articles
              </Button>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal staggerChildren={0.08} delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((art) => (
            <MotionItem key={art.id} className="h-full">
              <Link
                href={`/insights/${art.slug}`}
                className="group bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border shadow-xs dark:shadow-card-dark hover:shadow-xl dark:hover:shadow-card-dark-hover hover:border-navy-900/30 dark:hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-dark-elevated">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-navy-950/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wide">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white group-hover:text-navy-700 dark:group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs font-bold text-navy-900 dark:text-sky-400 group-hover:text-navy-700 dark:group-hover:text-sky-300">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </MotionItem>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
