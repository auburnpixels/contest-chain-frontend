'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient, operatorApi, authApi } from '@/lib/api/client';
import { DashboardShell } from '@/components/dashboard-shell';
import { LayoutDashboard, Trophy, Activity, ShieldCheck, AlertTriangle, Key, FileText, Settings, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {DashboardHeader} from "@/components/dashboard-header";

interface OperatorData {
  id: number;
  name: string;
  url?: string;
  is_active: boolean;
}

export default function OperatorDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
  });
  const [errors, setErrors] = useState<{ name?: string; url?: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navItems = [
    { href: '/operator/dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/competitions', title: 'Competitions', icon: Trophy },
    { href: '/operator/draw-events', title: 'Events', icon: Activity },
    { href: '/operator/compliance', title: 'Compliance', icon: ShieldCheck },
    { href: '/operator/complaints', title: 'Complaints', icon: AlertTriangle },
    { href: '/operator/api-keys', title: 'API Keys', icon: Key },
    { href: '/operator/details', title: 'Settings', icon: Settings },
    { href: '/docs', title: 'Documentation', icon: FileText },
  ];

  useEffect(() => {
    loadOperatorData();
  }, []);

  const loadOperatorData = async () => {
    try {
      const data = await operatorApi.getDashboard();
      const operator = data.operator;
      setOperatorData(operator);
      setFormData({
        name: operator.name || '',
        url: operator.url || '',
      });
    } catch (error: any) {
      console.error('Failed to load operator data:', error);
      
      // For authentication errors, the API client will handle token refresh automatically
      // Only show error state, don't redirect - let AuthContext handle authentication
      setErrorMessage('Failed to load operator details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    apiClient.clearToken();
    router.push('/operator/login');
  };

  const validateForm = () => {
    const newErrors: { name?: string; url?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Operator name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Operator name must be at least 3 characters.';
    } else if (formData.name.length > 255) {
      newErrors.name = 'Operator name must not exceed 255 characters.';
    }

    if (formData.url.trim()) {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = 'Website must be a valid URL (e.g., https://example.com).';
      }
      
      if (formData.url.length > 255) {
        newErrors.url = 'Website URL must not exceed 255 characters.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await operatorApi.updateDetails(
        formData.name,
        formData.url || undefined
      );
      
      setOperatorData(response.operator);
      setSuccessMessage('Operator details updated successfully!');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      console.error('Failed to update operator details:', error);
      
      // Handle validation errors from backend
      if (error.validationErrors) {
        setErrors(error.validationErrors);
        setErrorMessage('Please fix the validation errors and try again.');
      } else {
        setErrorMessage(error.message || 'Failed to update operator details. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell 
      navItems={navItems} 
      userRole="operator" 
      userName={operatorData?.name}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
          <DashboardHeader title="Settings" />


          <div className="px-4 lg:px-6">
              <Card>
                  {successMessage && (
                      <div className="px-6">
                          <Alert className="bg-green-500/10 border-green-500/50">
                              <AlertDescription className="text-green-500">
                                  {successMessage}
                              </AlertDescription>
                          </Alert>
                      </div>
                  )}

                  {errorMessage && (
                      <div className="px-6">
                          <Alert className="bg-red-500/10 border-red-500/50">
                              <AlertDescription className="text-red-500">
                                  {errorMessage}
                              </AlertDescription>
                          </Alert>
                      </div>
                  )}

                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">Operator Details</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  Update your operator name and website information.
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Operator Name */}
                          <div className="space-y-2">
                              <Label htmlFor="name" className="text-foreground">
                                  Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                  id="name"
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => {
                                      setFormData({ ...formData, name: e.target.value });
                                      if (errors.name) setErrors({ ...errors, name: undefined });
                                  }}
                                  placeholder="Enter your operator name"
                                  className={`bg-card border-border text-foreground ${
                                      errors.name ? 'border-red-500' : ''
                                  }`}
                                  disabled={saving}
                              />
                              {errors.name && (
                                  <p className="text-sm text-red-500">{errors.name}</p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                  The name of your organization or business.
                              </p>
                          </div>

                          {/* Website URL */}
                          <div className="space-y-2">
                              <Label htmlFor="url" className="text-foreground">
                                  Website
                              </Label>
                              <Input
                                  id="url"
                                  type="text"
                                  value={formData.url}
                                  onChange={(e) => {
                                      setFormData({ ...formData, url: e.target.value });
                                      if (errors.url) setErrors({ ...errors, url: undefined });
                                  }}
                                  placeholder="https://example.com"
                                  className={`bg-card border-border text-foreground ${
                                      errors.url ? 'border-red-500' : ''
                                  }`}
                                  disabled={saving}
                              />
                              {errors.url && (
                                  <p className="text-sm text-red-500">{errors.url}</p>
                              )}
                              <p className="text-sm text-muted-foreground">
                                  Your company website.
                              </p>
                          </div>

                          {/* Submit Button */}
                          <div className="flex items-center gap-4 pt-4">
                              <Button
                                  type="submit"
                                  disabled={saving}
                                  variant="outline"
                              >
                                  {saving ? (
                                      <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Saving...
                                      </>
                                  ) : (
                                      'Save Changes'
                                  )}
                              </Button>
                          </div>
                      </form>
                  </CardContent>
              </Card>

          </div>
        {/* Details Form */}
      </div>
    </DashboardShell>
  );
}






