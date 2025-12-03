// 'use client'; // Removed use client, splitting into client component if needed or moving metadata

import { Metadata } from 'next';
import ChainStatusClient from '@/components/chain-status-client'; // We will create this

export const metadata: Metadata = {
  title: 'Draw Audit Integrity - Cafaas',
  description: 'Real-time verification of all competition draw audits. View the cryptographic chain status of public draw results.',
};

export default function ChainStatusPage() {
  return <ChainStatusClient />;
}



