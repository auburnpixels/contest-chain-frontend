'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient, authApi } from '@/lib/api/client';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, ShieldCheck, ArrowRight, Loader2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import * as React from "react";

export default function OperatorRegisterPage() {
  const router = useRouter();
  const { refresh } = useAuth();
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
        // Set token in storage
        apiClient.setToken(response.access_token);
        
        // CRITICAL: Update AuthContext state by calling refresh
        // This fetches user data and updates the context
        await refresh();
        
        // Now redirect - AuthContext has user data
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
      <div className="min-h-screen flex items-center justify-center bg-[var(--veristiq-slate)] relative overflow-hidden p-4">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-1 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-[var(--veristiq-primary-blue)]">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-[var(--veristiq-primary-blue)]">VERISTIQ</span>
            </Link>
        </div>

          <Card className="border-gray-800 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden px-5 py-10">
              <CardHeader className="space-y-1 pb-2 text-center border-b border-gray-100 bg-gray-50/50 gap-2">
            <CardTitle className="text-xl font-bold text-[var(--veristiq-slate)]">Create Account</CardTitle>
            <CardDescription>Join the network to run verifiable competitions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
                <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="operatorName">Organization Name</Label>
                <Input
                  id="operatorName"
                  type="text"
                  placeholder="Acme Corporation Ltd"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  required
                  disabled={loading}
                  className={validationErrors.operator_name ? 'border-destructive bg-white' : 'bg-white'}
                />
                {validationErrors.operator_name && (
                  <p className="text-xs text-destructive">{validationErrors.operator_name[0]}</p>
                )}
              </div>

                <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className={validationErrors.email ? 'border-destructive bg-white' : 'bg-white'}
                />
                {validationErrors.email && (
                  <p className="text-xs text-destructive">{validationErrors.email[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className={validationErrors.password ? 'border-destructive bg-white' : 'bg-white'}
                    />
                </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="passwordConfirmation">Confirm</Label>
                    <Input
                    id="passwordConfirmation"
                    type="password"
                    placeholder="••••••••"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-white"
                    />
                </div>
              </div>
              {validationErrors.password && (
                <p className="text-xs text-destructive mt-1">{validationErrors.password[0]}</p>
              )}
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>

              <Button type="submit" className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-medium h-10 transition-all shadow-md hover:shadow-lg mt-2" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 border-t border-gray-100 bg-gray-50/50 pt-6">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/operator/login" className="font-semibold text-[var(--veristiq-primary-blue)] hover:underline transition-all">
                Sign in
              </Link>
            </div>
            <div className="text-xs text-center text-gray-400 px-4">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
