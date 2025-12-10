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
import { Search, Loader2, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      <div className="min-h-screen bg-[var(--veristiq-slate)]">
        <SiteHeader />
        <main className="container mx-auto px-4 py-32 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--veristiq-snow)] font-sans text-[var(--veristiq-slate)] flex flex-col">
      <SiteHeader />
      
      {/* Hero Background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[var(--veristiq-slate)] z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <main className="flex-1 container mx-auto px-6 py-32 max-w-xl relative z-10 flex flex-col justify-center">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                    <ShieldCheck className="w-8 h-8 text-[var(--veristiq-teal)]" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Verify Your Ticket</h1>
                <p className="text-gray-300 text-lg">
                    Check the status of your entry and view independent audit proofs.
                </p>
            </div>

            <Card className="border-gray-200 shadow-2xl bg-white/95 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Ticket Search</CardTitle>
                    <CardDescription>Enter your ticket details below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-6">
                        {/* Operator Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="operator">1. Select Operator</Label>
                            <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                                <SelectTrigger id="operator" className="h-11">
                                    <SelectValue placeholder="Choose the competition operator..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {operators.map((op) => (
                                    <SelectItem key={op.id} value={op.id}>
                                        {op.name}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Competition Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="competition">2. Select Competition</Label>
                            <Select 
                                value={selectedCompetition} 
                                onValueChange={setSelectedCompetition}
                                disabled={!selectedOperator || loadingCompetitions}
                            >
                                <SelectTrigger id="competition" className="h-11">
                                    <SelectValue placeholder={
                                    !selectedOperator 
                                        ? "Select an operator first..." 
                                        : loadingCompetitions 
                                        ? "Loading competitions..." 
                                        : "Choose your competition..."
                                    } />
                                </SelectTrigger>
                                <SelectContent>
                                    {competitions.map((comp) => (
                                    <SelectItem key={comp.id} value={comp.id}>
                                        {comp.name}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Ticket Number */}
                        <div className="space-y-2">
                            <Label htmlFor="ticketNumber">3. Enter Ticket Number</Label>
                            <Input
                                id="ticketNumber"
                                type="text"
                                placeholder="e.g., 42 or TXN-12345"
                                value={ticketNumber}
                                onChange={(e) => setTicketNumber(e.target.value)}
                                disabled={!selectedCompetition}
                                className="h-11 font-mono"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-12 text-base bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white shadow-md transition-all mt-2" 
                            disabled={!canSearch}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            Verify Ticket
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <p className="text-center text-sm text-gray-500 mt-8 font-medium">
                Don't have your ticket number? Check your confirmation email or contact the competition operator directly.
            </p>
      </main>
      <SiteFooter />
    </div>
  );
}
