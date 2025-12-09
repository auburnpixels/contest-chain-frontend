'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { publicApi } from '@/lib/api/client';
import { Hash, RefreshCw, ArrowRight } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { TablePagination } from '@/components/table-pagination';
import { DrawAuditsTable, DrawAudit } from '@/components/operator/draw-audits-table';
import { DrawAuditDetailsDialog } from '@/components/operator/draw-audit-details-dialog';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';

interface Operator {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  url: string;
}

interface Competition {
  id: string;
  name: string;
  operator_id: number;
}

export interface DrawAuditsWidgetProps {
  operatorId?: string;           // Filter to specific operator (hides operator filter)
  competitionId?: string;        // Filter to specific competition (pre-selects competition)
  showOperator?: boolean;         // Show operator column (default: false)
  title?: string;                 // Section title (default: "Draw Audits")
  description?: string;           // Section description
  showFilters?: boolean;          // Show filter section (default: true)
  showTitle?: boolean;            // Show title section (default: true)
  pageSize?: number;              // Initial page size (default: 50)
  publicView?: boolean;           // Public view mode (default: false)
}

export function DrawAuditsWidget({
  operatorId,
  competitionId,
  showOperator = false,
  title = 'Draw Audits',
  description = 'Cryptographically verified draw results',
  showFilters = true,
  showTitle = true,
  pageSize = 50,
  publicView = false,
}: DrawAuditsWidgetProps) {
  const [loading, setLoading] = useState(true);
  const [audits, setAudits] = useState<DrawAudit[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<string>(operatorId || 'all');
  const [selectedCompetition, setSelectedCompetition] = useState<string>(competitionId || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(pageSize);
  const dialog = useDialog<DrawAudit>();

  // Load operators on mount (only if no operatorId is provided)
  useEffect(() => {
    if (!operatorId && showFilters) {
      loadOperators();
    }
  }, [operatorId, showFilters]);

  // Load competitions when operatorId prop is provided and competitionId is also provided
  useEffect(() => {
    if (operatorId && competitionId) {
      // Auto-load competitions list for the operator so the competition filter shows correctly
      loadCompetitions(operatorId);
    }
  }, [operatorId, competitionId]);

  // Load audits when filters or page change
  useEffect(() => {
    loadAudits();
  }, [selectedOperator, selectedCompetition, currentPage, operatorId, competitionId]);

  // Load competitions when operator is selected
  useEffect(() => {
    if (selectedOperator && selectedOperator !== 'all' && !operatorId) {
      loadCompetitions(selectedOperator);
    } else if (!operatorId) {
      setCompetitions([]);
      setSelectedCompetition('all');
    }
  }, [selectedOperator, operatorId]);

  const loadOperators = async () => {
    try {
      const response = await publicApi.getDrawAuditOperators();
      setOperators(response.data || []);
    } catch (error) {
      console.error('Failed to load operators:', error);
    }
  };

  const loadCompetitions = async (operatorUuid: string) => {
    try {
      const response = await publicApi.getPublicCompetitions(operatorUuid);
      setCompetitions(response.data || []);
    } catch (error) {
      console.error('Failed to load competitions:', error);
    }
  };

  const loadAudits = async () => {
    setLoading(true);
    try {
      // Use operatorId prop if provided, otherwise use selectedOperator
      const effectiveOperator = operatorId || (selectedOperator !== 'all' ? selectedOperator : undefined);
      const effectiveCompetition = selectedCompetition !== 'all' ? selectedCompetition : undefined;

      const response = await publicApi.getDrawAudits(
        effectiveOperator,
        effectiveCompetition,
        undefined,
        currentPage
      );

      setAudits(response.data || []);
      setTotalPages(response.meta?.last_page || 1);
      setTotalItems(response.meta?.total || 0);
      setPerPage(response.meta?.per_page || pageSize);
    } catch (error) {
      console.error('Failed to load audits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (!operatorId) {
      setSelectedOperator('all');
    }
    if (!competitionId) {
      setSelectedCompetition('all');
    }
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    (!operatorId && selectedOperator !== 'all') || 
    (!competitionId && selectedCompetition !== 'all');

  if (loading && audits.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading draw audits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Section */}
      <Card>
          {showFilters && (
              <div className="px-6">
                  <div className="flex flex-col gap-4 border-b pb-4">
                      <div className="flex gap-2">
                          {/* Only show operator filter if no operatorId prop is provided */}
                          {!operatorId && (
                              <div className="flex flex-col gap-1.5 flex-1">
                                  <label className="text-sm font-medium">Operator</label>
                                  <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                                      <SelectTrigger className="w-full">
                                          <SelectValue placeholder="All" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="all">All Operators</SelectItem>
                                          {operators.map((operator) => (
                                              <SelectItem key={operator.uuid} value={operator.uuid}>
                                                  {operator.name}
                                              </SelectItem>
                                          ))}
                                      </SelectContent>
                                  </Select>
                              </div>
                          )}

                          {/* Only show competition filter if no competitionId prop is provided */}
                          {!competitionId && (
                              <div className="flex flex-col gap-1.5 flex-1">
                                  <label className="text-sm font-medium">Competition</label>
                                  <Select
                                      value={selectedCompetition}
                                      onValueChange={setSelectedCompetition}
                                      disabled={!operatorId && (!selectedOperator || selectedOperator === 'all')}
                                  >
                                      <SelectTrigger className="w-full">
                                          <SelectValue placeholder="All" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="all">All Competitions</SelectItem>
                                          {competitions.map((competition) => (
                                              <SelectItem key={competition.id} value={competition.id}>
                                                  {competition.name}
                                              </SelectItem>
                                          ))}
                                      </SelectContent>
                                  </Select>
                              </div>
                          )}

                          <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleReset}
                              disabled={!hasActiveFilters}
                              className="w-full gap-2 flex flex-1"
                          >
                              <RefreshCw className="h-3 w-3" />
                              Reset Filters
                          </Button>
                      </div>
                  </div>
              </div>
          )}

        {showTitle && (
          <CardHeader>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="leading-none font-semibold !text-base">{title}</CardTitle>
              {description && (
                <CardDescription className="text-muted-foreground text-sm">
                  {description}
                </CardDescription>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent>
          {audits.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <DrawAuditsTable
                  audits={audits}
                  showOperator={showOperator}
                  renderActions={(audit) => (
                    <OperatorActionsMenu
                      actions={
                        !publicView
                          ? [
                              {
                                label: 'View details',
                                onSelect: () => dialog.open(audit),
                              },
                                {
                                    label: 'View public audit',
                                    href: `/audit/${audit.id}`,
                                },
                            ]
                          : [
                              {
                                label: 'View audit',
                                href: `/audit/${audit.id}`,
                              },
                              ...(audit.competition
                                ? [
                                    {
                                      label: 'View competition audits',
                                      href: `/competition/${audit.competition.id}`,
                                    },
                                  ]
                                : []),
                                {

                                    label: 'View operator',
                                    href: `/profile/${audit.operator.slug}`,
                                }
                            ]
                      }
                    />
                  )}
                />
              </div>

              <div>
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={perPage}
                  totalItems={totalItems}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(newSize) => {
                    setPerPage(newSize);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Hash className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No audit records found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {hasActiveFilters
                  ? 'Try adjusting your filters to see more results.'
                  : 'The audit chain is currently empty or initializing.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <DrawAuditDetailsDialog
        audit={dialog.item}
        open={dialog.isOpen}
        onOpenChange={(open) => !open && dialog.close()}
        showOperator={showOperator}
      />
    </div>
  );
}

