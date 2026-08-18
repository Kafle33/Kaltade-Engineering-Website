'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Tag,
  User,
  Calendar,
  Sparkles,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { insightsData } from '@/data/insightsData';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';

type CategoryFilter =
  | 'All'
  | 'Valuation'
  | 'Engineering'
  | 'Real Estate'
  | 'Land Development'
  | 'DPR & Feasibility'
  | 'Legal & Due Diligence';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Valuation',
  'Engineering',
  'Real Estate',
  'Land Development',
  'DPR & Feasibility',
  'Legal & Due Diligence',
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return insightsData.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article: first featured or first article
  const featuredArticle = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery) return null;
    return insightsData.find((a) => a.featured) || insightsData[0] || null;
  }, [selectedCategory, searchQuery]);

  // Remaining articles for grid
  const gridArticles = useMemo(() => {
    if (featuredArticle && selectedCategory === 'All' && !searchQuery) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-50 min-h-screen">
      {/* Header / Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-navy-100 text-navy-900 mb-4 border border-navy-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Knowledge & Advisory Hub
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Property Intelligence & Engineering Insights.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Authoritative technical guides on Nepal land laws, bank collateral valuation standards, structural engineering bylaws, and Detailed Project Reports (DPRs) prepared by Kaltade&apos;s chartered engineers and valuation consultants.
          </p>
        </div>

        {/* Search Bar & Category Filter Container */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by topic, keyword, or land unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy-950 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-xs font-semibold text-slate-500 self-end md:self-center">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? insightsData.length
                  : insightsData.filter((a) => a.category === category).length;

              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-navy-950 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Featured Editorial Article (Hero Layout) */}
        {featuredArticle && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] bg-slate-100 overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-amber-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    ★ Featured Guide
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-navy-100 text-navy-900 text-xs font-bold uppercase tracking-wide">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <Link href={`/insights/${featuredArticle.slug}`}>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy-950 hover:text-navy-700 transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {featuredArticle.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredArticle.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-7 h-7 rounded-full bg-navy-100 text-navy-900 flex items-center justify-center font-bold text-xs">
                      {featuredArticle.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-navy-950">{featuredArticle.author.name}</div>
                      <div className="text-[10px] text-slate-400">{featuredArticle.date}</div>
                    </div>
                  </div>

                  <Button
                    href={`/insights/${featuredArticle.slug}`}
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Read Full Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {gridArticles.length > 0 ? (
          <div>
            {featuredArticle && (
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-navy-950">
                  All Technical Articles & Guides
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-navy-900/30 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <Link
                    href={`/insights/${article.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-100 block"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-navy-950/85 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                      </div>

                      <Link href={`/insights/${article.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-navy-700 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                        {article.summary}
                      </p>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {article.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                        {article.author.name}
                      </span>

                      <Link
                        href={`/insights/${article.slug}`}
                        className="text-xs font-bold text-navy-900 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-navy-950">No Articles Found</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              No matching guides found for category &quot;{selectedCategory}&quot;
              {searchQuery ? ` matching "${searchQuery}"` : ''}. Try resetting your search filter.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              variant="secondary"
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Bottom Advisory Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 relative overflow-hidden mt-16 shadow-xl">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Technical Advisory Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Need a specific technical consultation or site boundary assessment?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
                Our team provides field boundary measurement, cadastral map verification, structural health checks, and institutional valuation reports across Dhangadhi and Kailali.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Button href="/contact" variant="accent" size="lg" className="w-full">
                Consult With Engineers
              </Button>
              <Button href="/valuation" variant="white" size="lg" className="w-full">
                Request Property Valuation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
