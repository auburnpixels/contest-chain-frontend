import type { Metadata } from 'next';
import { AuditClient } from './audit-client';

type Props = {
  params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Draw Audit ${params.uuid} - Cafaas`,
    description: `View cryptographically verified draw audit details including signature hashes, RNG seed, and chain verification data.`,
  };
}

export default function AuditPage({ params }: Props) {
  return <AuditClient uuid={params.uuid} />;
}
