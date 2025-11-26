'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { regulatorApi } from '@/lib/api/client';
import { Shield, Building2, AlertTriangle, CheckCircle2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DashboardShell } from '@/components/dashboard-shell';
import { useRegulatorAuth } from '@/hooks/useRegulatorAuth';
import { regulatorNavItems } from '@/lib/navigation/regulator-nav';
import { DashboardLoading } from '@/components/dashboard-loading';

export default function RegulatorDashboardPage() {
  const { isReady, handleLogout } = useRegulatorAuth();
  const [loading, setLoading] = useState(true);
  const [regulator, setRegulator] = useState<any>(null);
  const [operators, setOperators] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (isReady) {
      loadDashboardData();
    }
  }, [isReady]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [regulatorData, operatorsData] = await Promise.all([
        regulatorApi.getDashboard(),
        regulatorApi.getOperators(),
      ]);

      setRegulator(regulatorData.user);
      setStats(regulatorData.stats);
      setOperators(operatorsData.operators || []);
    } catch (error: any) {
      console.error('Failed to load dashboard:', error);
      if (error.status === 401) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  if (!isReady || loading) {
    return <DashboardLoading message="Loading oversight portal..." />;
  }

  return (
    <DashboardShell
      navItems={regulatorNavItems}
      userRole="regulator"
      userName={regulator?.name}
      onLogout={handleLogout}
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Oversight Portal</h1>
            <p className="text-muted-foreground mt-1">
              Monitor ecosystem health and operator compliance.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search operators..." className="pl-8" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Operators</CardTitle>
              <Building2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{operators.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered entities
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">98.5%</div>
              <p className="text-xs text-blue-500 mt-1">
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Operators Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Operator Status</CardTitle>
            <CardDescription>
              Real-time compliance monitoring of all registered operators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {operators.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No operators found</h3>
                <p className="text-sm text-muted-foreground">
                  The ecosystem is currently empty.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-900/50 border-slate-800">
                    <TableHead>Operator</TableHead>
                    <TableHead>License ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Last Audit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operators.map((op) => (
                    <TableRow key={op.id} className="hover:bg-slate-900/50 border-slate-800">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{op.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {op.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{op.license_id || 'PENDING'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-500 text-blue-500">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span className="text-sm font-medium">98/100</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        2 mins ago
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:bg-slate-800">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
