import type { Metadata } from 'next';
import { publicApi } from '@/lib/api/client';
import { OperatorProfileClient } from './profile-client';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const data = await publicApi.getPublicOperator(slug);
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

export default async function OperatorProfilePage({ params }: Props) {
  const { slug } = await params;
  return <OperatorProfileClient slug={slug} />;
}
