import { Metadata } from 'next';
import VerifySearchClient from '@/components/verify-search-client';

export const metadata: Metadata = {
  title: 'Verify Ticket - Veristiq',
  description: 'Verify your competition entry status and check draw results on the Veristiq public ledger.',
};

export default function VerifySearchPage() {
  return <VerifySearchClient />;
}



