// 'use client'; // Removed use client, splitting into client component if needed or moving metadata

import { Metadata } from 'next';
import ChainStatusClient from '@/components/chain-status-client'; // We will create this

export const metadata: Metadata = {
  title: 'Chain Integrity Status - Cafaas',
  description: 'Real-time verification of the Cafaas cryptographic chain. View system health and audit logs.',
};

export default function ChainStatusPage() {
  return <ChainStatusClient />;
}



