'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient, authApi } from '@/lib/api/client';
import { AlertCircle, Building2, CheckCircle2, Info, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OperatorRegisterPage() {
  const router = useRouter();
  const [operatorName, setOperatorName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});
    setLoading(true);

    try {
      const response = await authApi.register(operatorName, email, password, passwordConfirmation);
      
      if (response.access_token) {
        apiClient.setToken(response.access_token);
        router.push('/operator/dashboard');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Handle Laravel validation errors (422)
      if (err.status === 422 && err.validationErrors) {
        setValidationErrors(err.validationErrors);
        setError('Please fix the errors below.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-950 p-12 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-900/0 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute top-24 right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">CaaS Platform</span>
          </div>
          
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Join the Network
            </h1>
            <p className="text-lg text-muted-foreground">
              Create an operator account to start running fair, compliant, and audited competitions.
            </p>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                </div>
                <span>Instant compliance verification</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                </div>
                <span>Automated fairness audits</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-slate-500">
            &copy; 2025 CaaS Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left space-y-2">
             <div className="lg:hidden flex justify-center mb-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
             </div>
            <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
            <p className="text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          {/* Info Banner */}
          <Alert className="bg-blue-500/10 border-blue-500/20 text-blue-500">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              You'll get instant access to your operator dashboard.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operatorName">Organization Name</Label>
              <Input
                id="operatorName"
                type="text"
                placeholder="Acme Corporation Ltd"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                required
                disabled={loading}
                className={validationErrors.operator_name ? 'border-destructive bg-background/50' : 'bg-background/50'}
              />
              {validationErrors.operator_name && (
                <p className="text-xs text-destructive">{validationErrors.operator_name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={validationErrors.email ? 'border-destructive bg-background/50' : 'bg-background/50'}
              />
              {validationErrors.email && (
                <p className="text-xs text-destructive">{validationErrors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className={validationErrors.password ? 'border-destructive bg-background/50' : 'bg-background/50'}
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              {validationErrors.password && (
                <p className="text-xs text-destructive">{validationErrors.password[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                disabled={loading}
                className="bg-background/50"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              href="/operator/login"
              className="text-blue-500 hover:text-blue-400 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>
          
          <div className="text-xs text-center text-muted-foreground px-4">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
