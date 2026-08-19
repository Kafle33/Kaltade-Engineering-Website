import { projectsData } from '@/data/projectsData';
import ProjectDetailPageClient from './ProjectDetailPageClient';

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.slug || project.id }));
}

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailPageClient id={params.id} />;
}
