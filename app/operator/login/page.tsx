'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Building2, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OperatorLoginPage() {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      
      if (user.role !== 'operator') {
        setError('You do not have operator access. Please use the regulator login if you are a regulator.');
        await logout();
        setLoading(false);
        return;
      }
      
      // Navigate to dashboard
      router.push('/operator/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-black p-12 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cobalt/20 to-black/0 z-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cobalt/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-cobalt/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-xl bg-brand-cobalt flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Veristiq</span>
          </div>
          
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Operator Portal
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your competitions with confidence. Ensure fairness, transparency, and compliance with our automated tools.
            </p>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-brand-cobalt/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-brand-cobalt" />
                </div>
                <span>Automated compliance audits</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-brand-cobalt/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-brand-cobalt" />
                </div>
                <span>Real-time fair draw engine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-zinc-500">
            &copy; 2025 Veristiq. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left space-y-2">
             <div className="lg:hidden flex justify-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-cobalt flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
             </div>
            <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-muted-foreground">
              Enter your email below to access your dashboard
            </p>
          </div>

          {/* Demo Alert */}
          <Alert className="bg-brand-cobalt/10 border-brand-cobalt/20 text-brand-cobalt">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Demo:</strong> raffaly@operator.local / password
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="px-0 text-xs text-muted-foreground" type="button">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-background/50"
              />
            </div>

            <Button type="submit" className="w-full bg-brand-cobalt hover:bg-brand-cobalt/90" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link 
              href="/operator/register"
              className="text-brand-cobalt hover:text-brand-cobalt/80 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-background px-2 text-muted-foreground">Or</span>
             </div>
          </div>
          
           <div className="text-center text-sm">
             <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/regulator/login')}
              type="button"
            >
              Sign in as Regulator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
