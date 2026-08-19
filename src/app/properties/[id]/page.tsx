import { propertiesData } from '@/data/propertiesData';
import PropertyDetailView from './PropertyDetailView';

export function generateStaticParams() {
  return propertiesData.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <PropertyDetailView />;
}
