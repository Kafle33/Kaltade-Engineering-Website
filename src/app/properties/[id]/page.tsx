import { propertiesData } from '@/data/propertiesData';
import PropertyDetailPageClient from './PropertyDetailPageClient';

export function generateStaticParams() {
  return propertiesData.map((property) => ({ id: property.slug || property.id }));
}

interface PropertyDetailPageProps {
  params: { id: string };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  return <PropertyDetailPageClient id={params.id} />;
}
