'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { publicApi } from '@/lib/api/client';
import { Search, Loader2 } from 'lucide-react';

interface Operator {
  id: string;
  name: string;
  slug: string;
}

interface Competition {
  id: string;
  name: string;
  external_id: string;
  status: string;
}

export default function VerifySearchClient() {
  const router = useRouter();
  const [operators, setOperators] = useState<Operator[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingCompetitions, setLoadingCompetitions] = useState(false);

  useEffect(() => {
    loadOperators();
  }, []);

  useEffect(() => {
    if (selectedOperator) {
      loadCompetitions(selectedOperator);
    } else {
      setCompetitions([]);
      setSelectedCompetition('');
    }
  }, [selectedOperator]);

  const loadOperators = async () => {
    try {
      const data = await publicApi.getOperators();
      setOperators(data.operators);
    } catch (error) {
      console.error('Failed to load operators', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompetitions = async (operatorId: string) => {
    setLoadingCompetitions(true);
    try {
      const data = await publicApi.getCompetitionsByOperator(operatorId);
      setCompetitions(data.competitions);
    } catch (error) {
      console.error('Failed to load competitions', error);
    } finally {
      setLoadingCompetitions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompetition || !ticketNumber) return;
    
    router.push(`/verify/${selectedCompetition}/${encodeURIComponent(ticketNumber)}`);
  };

  const canSearch = selectedCompetition && ticketNumber.trim();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-cobalt" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-cobalt/20 selection:text-brand-cobalt">
      <SiteHeader />
      <main className="container mx-auto px-6 py-24 max-w-2xl min-h-[80vh] flex flex-col justify-center">
        
        <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Verify Your Ticket</h1>
            <p className="text-xl text-zinc-400">
              Search for your competition entry to verify its status and see if you won.
            </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSearch} className="space-y-8">
              {/* Operator Selection */}
              <div className="space-y-3">
                <Label htmlFor="operator" className="text-base font-medium text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cobalt/20 text-brand-cobalt text-xs border border-brand-cobalt/30">1</span>
                    Select Operator
                </Label>
                <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                  <SelectTrigger id="operator" className="h-12 bg-black/50 border-white/10 text-white focus:ring-brand-cobalt/50">
                    <SelectValue placeholder="Choose the competition operator..." />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {operators.map((op) => (
                      <SelectItem key={op.id} value={op.id} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        {op.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Competition Selection */}
              <div className="space-y-3">
                <Label htmlFor="competition" className="text-base font-medium text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cobalt/20 text-brand-cobalt text-xs border border-brand-cobalt/30">2</span>
                    Select Competition
                </Label>
                <Select 
                  value={selectedCompetition} 
                  onValueChange={setSelectedCompetition}
                  disabled={!selectedOperator || loadingCompetitions}
                >
                  <SelectTrigger id="competition" className="h-12 bg-black/50 border-white/10 text-white focus:ring-brand-cobalt/50 disabled:opacity-50">
                    <SelectValue placeholder={
                      !selectedOperator 
                        ? "Select an operator first..." 
                        : loadingCompetitions 
                        ? "Loading competitions..." 
                        : "Choose your competition..."
                    } />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {competitions.map((comp) => (
                      <SelectItem key={comp.id} value={comp.id} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ticket Number Input */}
              <div className="space-y-3">
                <Label htmlFor="ticketNumber" className="text-base font-medium text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cobalt/20 text-brand-cobalt text-xs border border-brand-cobalt/30">3</span>
                    Enter Ticket Number
                </Label>
                <Input
                  id="ticketNumber"
                  type="text"
                  placeholder="e.g., 42 or TXN-12345"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  disabled={!selectedCompetition}
                  className="h-12 bg-black/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-brand-cobalt focus:ring-brand-cobalt/50"
                />
                <p className="text-sm text-zinc-500 pl-1">
                  This is the ticket ID you received when entering the competition
                </p>
              </div>

              {/* Search Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-brand-cobalt hover:bg-brand-cobalt/90 text-white shadow-lg shadow-brand-cobalt/20 transition-all hover:scale-[1.02]" 
                disabled={!canSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Verify Ticket
              </Button>
            </form>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>
            Don&apos;t have your ticket number? Check your confirmation email or contact the competition operator.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}









