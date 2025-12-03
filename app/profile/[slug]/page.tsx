import type { Metadata } from 'next';
import { publicApi } from '@/lib/api/client';
import { OperatorProfileClient } from './profile-client';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await publicApi.getPublicOperator(params.slug);
    return {
      title: `${data.operator.name} - Operator Profile - Cafaas`,
      description: `View public trust profile and audit history for ${data.operator.name}.`,
    };
  } catch (error) {
    return {
      title: 'Operator Not Found - Cafaas',
    };
  }
}

export default function OperatorProfilePage({ params }: Props) {
  return <OperatorProfileClient slug={params.slug} />;
}
