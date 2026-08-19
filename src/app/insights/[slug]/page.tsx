import { insightsData } from '@/data/insightsData';
import InsightDetailView from './InsightDetailView';

export function generateStaticParams() {
  return insightsData.map((a) => ({ slug: a.slug }));
}

export default function Page() {
  return <InsightDetailView />;
}
