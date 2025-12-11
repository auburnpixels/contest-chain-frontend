'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, ShieldCheck, Info, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

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
    <div className="min-h-screen flex items-center justify-center bg-[var(--veristiq-slate)] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-3 mb-2 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--veristiq-primary-blue)] text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="font-sans font-bold text-2xl text-white tracking-tight">Veristiq</span>
            </Link>
        </div>

        <Card className="border-gray-800 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden px-5 py-10">
          <CardHeader className="space-y-1 pb-2 text-center border-b border-gray-100 bg-gray-50/50 gap-2">
            <CardTitle className="text-xl font-bold text-[var(--veristiq-slate)] mb-0">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
                <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-white"
                />
              </div>
                <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="bg-white"
                        />
                        <Link href="/operator/forgot-password">
                            <Button variant="link" className="px-0 text-xs text-[var(--veristiq-primary-blue)]" type="button">
                                Forgot password?
                            </Button>
                        </Link>
                    </div>

              </div>
              <Button type="submit" className="w-full bg-[var(--veristiq-primary-blue)] hover:bg-[var(--veristiq-primary-blue-dark)] text-white font-medium h-10 transition-all shadow-md hover:shadow-lg" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/50 pt-6">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/operator/register" className="font-semibold text-[var(--veristiq-primary-blue)] hover:underline transition-all">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
