'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { regulatorApi } from '@/lib/api/client';
import { Building2, Calendar, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Input } from '@/components/ui/input';
import { useRegulatorAuth } from '@/hooks/useRegulatorAuth';
import { regulatorNavItems } from '@/lib/navigation/regulator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

export default function OperatorsPage() {
  const { isReady, handleLogout } = useRegulatorAuth();
  const [loading, setLoading] = useState(true);
  const [operators, setOperators] = useState<any[]>([]);
  const [regulatorName, setRegulatorName] = useState('');

  useEffect(() => {
    if (isReady) {
      loadOperators();
    }
  }, [isReady]);

  const loadOperators = async () => {
    try {
      setLoading(true);
      const [data, dashboardData] = await Promise.all([
        regulatorApi.getOperators(),
        regulatorApi.getDashboard(),
      ]);
      setOperators(data.data || data || []);
      setRegulatorName(dashboardData?.user?.name || '');
      setLoading(false);
    } catch (error: any) {
      console.error('Failed to load operators:', error);
      if (error.status === 401) {
        await handleLogout();
      }
    }
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading operators..." />;
  }

  return (
    <DashboardShell
      navItems={regulatorNavItems}
      userRole="regulator"
      userName={regulatorName}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">All Operators</h1>
            <p className="text-muted-foreground mt-1">
              View and monitor all operators on the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm px-3 py-1 h-9">
              {operators.length} Total
            </Badge>
          </div>
        </div>

        {/* Operators Card */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registered Operators</CardTitle>
                <CardDescription className="mt-1">
                  Monitor compliance and activity across all operators
                </CardDescription>
              </div>
              <div className="relative w-64">
                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input placeholder="Search operators..." className="pl-8 h-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {operators.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-900/50 border-slate-800">
                    <TableHead>Operator</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operators.map((operator: any) => (
                    <TableRow key={operator.id} className="hover:bg-slate-900/50 border-slate-800">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{operator.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: {operator.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                          {operator.slug}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {operator.is_active ? (
                            <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">Active</Badge>
                          ) : (
                            <Badge variant="destructive">Inactive</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(operator.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/regulator/operators/${operator.id}`}>
                          <Button variant="ghost" size="sm" className="hover:bg-slate-800">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2 text-foreground">No operators found</h3>
                <p className="text-sm text-muted-foreground">
                  No operators have registered on the platform yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
