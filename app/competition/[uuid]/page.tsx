import type { Metadata } from 'next';
import { publicApi } from '@/lib/api/client';
import PublicCompetitionClientPage from './client-page';

type Props = {
  params: { uuid: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await publicApi.getPublicCompetition(params.uuid);
    return {
      title: `${data.competition.name} - Cafaas`,
      description: `View competition details and draw audits for ${data.competition.name}. Operated by ${data.operator.name}.`,
    };
  } catch (error) {
    return {
      title: 'Competition Not Found - Cafaas',
    };
  }
}

export default function PublicCompetitionPage() {
  return <PublicCompetitionClientPage />;
}
