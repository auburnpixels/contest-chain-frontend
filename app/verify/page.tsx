import { Metadata } from 'next';
import VerifySearchClient from '@/components/verify-search-client';

export const metadata: Metadata = {
  title: 'Verify Ticket - Cafaas',
  description: 'Verify your competition entry status and check draw results on the Cafaas public ledger.',
};

export default function VerifySearchPage() {
  return <VerifySearchClient />;
}



