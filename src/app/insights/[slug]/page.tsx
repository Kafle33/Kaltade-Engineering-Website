import { insightsData } from '@/data/insightsData';
import InsightArticleDetailPageClient from './InsightArticleDetailPageClient';

export function generateStaticParams() {
  return insightsData.map((insight) => ({ slug: insight.slug }));
}

interface InsightArticleDetailPageProps {
  params: { slug: string };
}

export default function InsightArticleDetailPage({ params }: InsightArticleDetailPageProps) {
  return <InsightArticleDetailPageClient slug={params.slug} />;
}
