'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  CheckCircle2,
  Building2,
  Scale,
  Compass,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { insightsData } from '@/data/insightsData';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';

interface PageProps {
  params?: {
    slug?: string;
  };
}

export default function InsightArticleDetailPage({ params }: PageProps) {
  const router = useRouter();
  const routeParams = useParams();

  // Slug from routeParams or props
  const slug = (routeParams?.slug as string) || params?.slug || '';

  // Find matching article
  const article = insightsData.find((a) => a.slug === slug);

  // 404 Not Found State
  if (!article) {
    return (
      <div className="pt-32 sm:pt-40 pb-24 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            Article Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            The requested technical guide or property insight does not exist or may have been relocated.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              href="/insights"
              variant="primary"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Insights Hub
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Related articles (from same category, excluding current article; if fewer than 2, fill from other categories)
  const categoryRelated = insightsData.filter(
    (a) => a.category === article.category && a.id !== article.id
  );
  const otherRelated = insightsData.filter(
    (a) => a.category !== article.category && a.id !== article.id
  );
  const relatedArticles = [...categoryRelated, ...otherRelated].slice(0, 3);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-50 min-h-screen">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Knowledge Hub</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Guide</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 mb-8">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-navy-950 text-white text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Published {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Lead Summary */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal border-l-4 border-amber-500 pl-4 py-1 italic bg-amber-50/40 rounded-r-lg">
            {article.summary}
          </p>

          {/* Author Byline */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-navy-950 text-sm">
                  {article.author.name}
                </div>
                <div className="text-xs text-slate-500">
                  {article.author.role} • Kaltade Engineering Services
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Peer-Reviewed Engineering Guide</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-10 bg-slate-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-800 leading-relaxed text-base sm:text-lg">
          {article.content.map((paragraph, index) => {
            // Highlight numbered points or sub-headers if paragraph starts with a number
            const isNumberedHeader = /^[0-9]+\.\s/.test(paragraph);

            if (isNumberedHeader) {
              const colonIndex = paragraph.indexOf(':');
              if (colonIndex !== -1) {
                const titlePart = paragraph.substring(0, colonIndex + 1);
                const bodyPart = paragraph.substring(colonIndex + 1);
                return (
                  <div key={index} className="pt-2 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 leading-snug">
                      {titlePart}
                    </h3>
                    <p className="text-slate-700 leading-relaxed font-normal text-base sm:text-lg">
                      {bodyPart}
                    </p>
                  </div>
                );
              }
            }

            // Bullet points detection
            if (paragraph.startsWith('•')) {
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 pl-2 py-1 text-slate-700 font-normal"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                  <p className="leading-relaxed">{paragraph.replace(/^•\s*/, '')}</p>
                </div>
              );
            }

            return (
              <p key={index} className="text-slate-700 leading-relaxed font-normal">
                {paragraph}
              </p>
            );
          })}

          {/* Tags Section */}
          <div className="pt-8 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" />
                Key Topics:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-navy-50 hover:text-navy-900 transition-colors border border-slate-200/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Box: Need Professional Assistance */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-xl mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold tracking-wider uppercase border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              Professional Technical Services
            </div>

            <div className="space-y-3 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Need professional assistance? Contact Kaltade.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Whether you need on-site property boundary measurement, cadastral map verification, structural earthquake analysis, bank collateral valuation, or a Detailed Project Report (DPR), our licensed engineers are ready to assist you.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg"
              >
                Schedule Technical Consultation
              </Button>
              <Button
                href="/valuation"
                variant="white"
                size="lg"
                className="w-full sm:w-auto"
              >
                Request Property Valuation
              </Button>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Accredited for Bank Valuations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Nepal National Building Code Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Confidential & Objective Advisory
              </span>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 sm:mt-20 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Further Reading
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950">
                  Related Technical Guides
                </h3>
              </div>
              <Link
                href="/insights"
                className="text-xs font-bold text-navy-900 hover:text-amber-600 transition-colors flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-5 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-navy-900 bg-navy-50 px-2 py-0.5 rounded">
                        {rel.category}
                      </span>
                      <span>{rel.readTime}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-navy-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-bold text-navy-900 group-hover:text-amber-600 flex items-center justify-between border-t border-slate-100">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
