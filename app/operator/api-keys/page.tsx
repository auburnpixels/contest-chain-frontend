'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { operatorApi } from '@/lib/api/client';
import { Key, Copy, Trash2, Plus, Eye, EyeOff, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardShell } from '@/components/dashboard-shell';
import {DashboardHeader} from "@/components/dashboard-header";
import {IndicatorBadge} from "@/components/ui/indicator-badge";
import { useOperatorAuth } from '@/hooks/useOperatorAuth';
import { operatorNavItems } from '@/lib/navigation/operator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

export default function ApiKeysPage() {
  const { isReady, handleLogout } = useOperatorAuth();
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [operatorName, setOperatorName] = useState('');
  const [creatingKey, setCreatingKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newCreatedKey, setNewCreatedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      loadApiKeys();
    }
  }, [isReady]);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const [keysData, dashboardData] = await Promise.all([
        operatorApi.getApiKeys(),
        operatorApi.getDashboard(),
      ]);
      setApiKeys(keysData.data || keysData || []);
      setOperatorName(dashboardData?.operator?.name || dashboardData?.user?.name || '');
      setLoading(false);
    } catch (error: any) {
      console.error('[API Keys] Failed to load API keys:', error);
      if (error.status === 401) {
        await handleLogout();
      }
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    setCreatingKey(true);
    try {
      const response = await operatorApi.createApiKey(newKeyName);
      const newKey = response.data?.key || response.key;
      
      if (newKey) {
        setNewCreatedKey(newKey);
        toast.success('API Key created successfully!');
        await loadApiKeys();
        // Don't close dialog yet, user needs to see the key
      } else {
        // Fallback if key is not returned directly
        setIsCreateDialogOpen(false);
        setNewKeyName('');
        toast.success('API Key created successfully!');
        await loadApiKeys();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create API key');
    } finally {
      setCreatingKey(false);
    }
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setNewKeyName('');
    setNewCreatedKey(null);
  };

  const handleRevokeKey = async (keyId: number) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }
    
    try {
      await operatorApi.revokeApiKey(keyId);
      toast.success('API Key revoked successfully');
      await loadApiKeys();
    } catch (error: any) {
      toast.error(error.message || 'Failed to revoke API key');
    }
  };

  const handleCopyKey = (key: string) => {
    // If the key is masked (starts with asterisks or dots), we can't copy the real value unless it's visible
    // The backend only returns the full key ONCE upon creation. 
    // Subsequent fetches return a masked key.
    // For the UI, we might be dealing with the masked version from the list.
    
    // Check if key looks masked (simple check for asterisks or bullets)
    if (key.includes('*') || key.includes('•')) {
       toast.error('Cannot copy masked key. Key is only available at creation.');
       return;
    }

    navigator.clipboard.writeText(key);
    toast.success('API Key copied to clipboard');
  };

  const toggleKeyVisibility = (keyId: number) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const maskKey = (key: string, visible: boolean) => {
    if (visible) return key;
    // Assuming standard 64 char key length, but handle any length
    if (key.length < 10) return '•'.repeat(key.length);
    return '•'.repeat(key.length - 4) + key.substring(key.length - 4);
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading API keys..." />;
  }

  return (
    <DashboardShell
      navItems={operatorNavItems}
      userRole="operator"
      userName={operatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
          <DashboardHeader title="API Keys">
              <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
                  if (!open) handleCloseDialog();
                  else setIsCreateDialogOpen(true);
              }}>
                  <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                          Create API Key
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                          <DialogTitle>{newCreatedKey ? 'API Key Created' : 'Create New API Key'}</DialogTitle>
                          <DialogDescription>
                              {newCreatedKey
                                  ? 'Copy this key now. You won\'t be able to see it again!'
                                  : 'Enter a name for your new API key to identify it later.'}
                          </DialogDescription>
                      </DialogHeader>

                      {newCreatedKey ? (
                          <div className="space-y-4 py-4">
                              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg break-all font-mono text-sm text-zinc-300 relative group">
                                  {newCreatedKey}
                                  <Button
                                      size="icon"
                                      variant="ghost"
                                      className="absolute top-2 right-2 h-8 w-8 hover:bg-zinc-800"
                                      onClick={() => {
                                          navigator.clipboard.writeText(newCreatedKey);
                                          toast.success('Copied to clipboard');
                                      }}
                                  >
                                      <Copy className="h-4 w-4" />
                                  </Button>
                              </div>
                              <div className="flex items-start gap-2 text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded">
                                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                                  <p>Store this key securely. It cannot be recovered if lost.</p>
                              </div>
                          </div>
                      ) : (
                          <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                  <Label htmlFor="name">Key Name</Label>
                                  <Input
                                      id="name"
                                      placeholder="e.g. Production Website, Mobile App"
                                      value={newKeyName}
                                      onChange={(e) => setNewKeyName(e.target.value)}
                                      onKeyDown={(e) => {
                                          if (e.key === 'Enter' && newKeyName.trim()) {
                                              handleCreateKey();
                                          }
                                      }}
                                  />
                              </div>
                          </div>
                      )}

                      <DialogFooter>
                          {newCreatedKey ? (
                              <Button onClick={handleCloseDialog} className="w-full">
                                  Done
                              </Button>
                          ) : (
                              <div className="flex gap-2 justify-end w-full">
                                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                      Cancel
                                  </Button>
                                  <Button onClick={handleCreateKey} variant="outline" disabled={creatingKey || !newKeyName.trim()}>
                                      {creatingKey ? 'Creating...' : 'Create Key'}
                                  </Button>
                              </div>
                          )}
                      </DialogFooter>
                  </DialogContent>
              </Dialog>
          </DashboardHeader>


          <div className="px-4 lg:px-6">
              <Card>
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">API Keys</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  {apiKeys.filter(k => !k.revoked_at).length} active key(s)
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent>
                      {apiKeys.length > 0 ? (
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Name</TableHead>
                                      <TableHead>API Key</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead>Last Used</TableHead>
                                      <TableHead>Created</TableHead>
                                      <TableHead></TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {apiKeys.map((apiKey: any) => {
                                      const isRevoked = !!apiKey.revoked_at;
                                      const isVisible = visibleKeys.has(apiKey.id);

                                      return (
                                          <TableRow key={apiKey.id} className={isRevoked ? 'opacity-60' : ''}>
                                              <TableCell className="font-medium">
                                                  <span className="text-foreground">{apiKey.name || 'Unnamed Key'}</span>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="flex items-center gap-2">
                                                      <code className="px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                                                          {maskKey(apiKey.key, isVisible)}
                                                      </code>
                                                      {apiKey.is_revealed && (
                                                          <Button
                                                              variant="ghost"
                                                              size="icon"
                                                              className="h-8 w-8"
                                                              onClick={() => toggleKeyVisibility(apiKey.id)}
                                                          >
                                                              {isVisible ? (
                                                                  <EyeOff className="h-4 w-4" />
                                                              ) : (
                                                                  <Eye className="h-4 w-4" />
                                                              )}
                                                          </Button>
                                                      )}
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  <IndicatorBadge text={isRevoked ? 'Revoked' : 'Active'} color={isRevoked ? 'red' : 'green'} />
                                              </TableCell>
                                              <TableCell>
                                                  {apiKey.last_used_at ? (
                                                      <div>
                                                          {new Date(apiKey.last_used_at).toLocaleDateString('en-GB', {
                                                              day: '2-digit',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })}
                                                      </div>
                                                  ) : (
                                                      <span>Never</span>
                                                  )}
                                              </TableCell>
                                              <TableCell>
                                                  <div>
                                                      {new Date(apiKey.created_at).toLocaleDateString('en-GB', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })}
                                                  </div>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="flex items-center justify-end gap-2">
                                                      {!isRevoked && (
                                                          <>
                                                              {apiKey.is_revealed && (
                                                                  <Button
                                                                      variant="ghost"
                                                                      size="sm"
                                                                      onClick={() => handleCopyKey(apiKey.key)}
                                                                      className="gap-1 hover:bg-slate-800"
                                                                  >
                                                                      <Copy className="h-4 w-4" />
                                                                      Copy
                                                                  </Button>
                                                              )}
                                                              <Button
                                                                  variant="ghost"
                                                                  size="sm"
                                                                  onClick={() => handleRevokeKey(apiKey.id)}
                                                                  className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                              >
                                                                  <Trash2 className="h-4 w-4" />
                                                                  Revoke
                                                              </Button>
                                                          </>
                                                      )}
                                                  </div>
                                              </TableCell>
                                          </TableRow>
                                      );
                                  })}
                              </TableBody>
                          </Table>
                      ) : (
                          <div className="text-center py-12">
                              <h3 className="text-lg font-medium mb-2 text-foreground">No API keys yet</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                  Create your first API key to start integrating with the CaaS platform
                              </p>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </div>

          <div className="px-4 lg:px-6">
              <Card className="mt-6 bg-card border-border">
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1.5">
                              <CardTitle className="leading-none font-semibold !text-base">Usage</CardTitle>
                              <CardDescription className="text-muted-foreground text-sm">
                                  Quick integration guide
                              </CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <h4 className=" mb-2 text-sm">1. Include in request headers</h4>
                          <pre className="bg-muted text-slate-300 p-4 rounded-md text-xs overflow-x-auto">
                            <code>{`curl -H "X-API-KEY: your_api_key_here" \\ https://api.caas-platform.com/api/v1/operator/competitions`}</code>
                            </pre>
                      </div>
                      <div>
                          <h4 className=" mb-2 text-sm">2. Store securely</h4>
                          <p className="text-sm text-muted-foreground">
                              Use environment variables in your application:
                          </p>
                          <pre className="bg-muted text-slate-300 p-4 rounded-md text-xs overflow-x-auto mt-2">
                <code>CAAS_API_KEY=your_api_key_here</code>
              </pre>
                      </div>
                      <div>
                          <h4 className=" mb-2 text-sm">2. Store securely</h4>
                          <p className="text-sm text-muted-foreground">
                              For security best practices, create a new key and revoke the old one periodically.
                          </p>
                      </div>
                  </CardContent>
              </Card>
          </div>

      </div>
    </DashboardShell>
  );
}
