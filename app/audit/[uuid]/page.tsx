import type { Metadata } from 'next';
import { AuditClient } from './audit-client';

type Props = {
  params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  return {
    title: `Draw Audit ${uuid} - Veristiq`,
    description: `View cryptographically verified draw audit details including signature hashes, RNG seed, and chain verification data.`,
  };
}

export default async function AuditPage({ params }: Props) {
  const { uuid } = await params;
  return <AuditClient uuid={uuid} />;
}
