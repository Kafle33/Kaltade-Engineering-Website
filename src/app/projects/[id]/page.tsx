import { projectsData } from '@/data/projectsData';
import ProjectDetailView from './ProjectDetailView';

export function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <ProjectDetailView />;
}
