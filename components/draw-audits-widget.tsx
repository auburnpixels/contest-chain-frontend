'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { publicApi } from '@/lib/api/client';
import { Hash } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';
import { TablePagination } from '@/components/table-pagination';
import { DrawAuditsTable, DrawAudit } from '@/components/operator/draw-audits-table';
import { DrawAuditDetailsDialog } from '@/components/operator/draw-audit-details-dialog';
import { OperatorActionsMenu } from '@/components/operator-actions-menu';
import { SearchableSelect, SearchableSelectOption } from '@/components/ui/searchable-select';
import { Label } from '@/components/ui/label';

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
  const [operators, setOperators] = useState<SearchableSelectOption[]>([]);
  const [operatorsLoading, setOperatorsLoading] = useState(false);
  const [competitions, setCompetitions] = useState<SearchableSelectOption[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string>(operatorId || 'all');
  const [selectedCompetition, setSelectedCompetition] = useState<string>(competitionId || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(pageSize);
  const dialog = useDialog<DrawAudit>();

  // Callback functions for loading data (defined before useEffects)
  const loadOperators = useCallback(async (search: string = '') => {
    try {
      setOperatorsLoading(true);
      const response = await publicApi.getDrawAuditOperators(search || undefined);
      const options: SearchableSelectOption[] = (response.data || []).map((op: any) => ({
        value: op.uuid,
        label: op.name,
      }));
      setOperators(options);
    } catch (error) {
      console.error('Failed to load operators:', error);
    } finally {
      setOperatorsLoading(false);
    }
  }, []);

  const loadCompetitions = useCallback(async (search: string = '') => {
    try {
      setCompetitionsLoading(true);
      const effectiveOperator = operatorId || (selectedOperator !== 'all' ? selectedOperator : undefined);
      const response = await publicApi.getPublicCompetitions(effectiveOperator, search || undefined);
      const options: SearchableSelectOption[] = (response.data || []).map((c: any) => ({
        value: c.id,
        label: c.name,
      }));
      setCompetitions(options);
    } catch (error) {
      console.error('Failed to load competitions:', error);
    } finally {
      setCompetitionsLoading(false);
    }
  }, [operatorId, selectedOperator]);

  // Load operators on mount (only if no operatorId is provided)
  useEffect(() => {
    if (!operatorId && showFilters) {
      loadOperators();
    }
  }, [operatorId, showFilters, loadOperators]);

  // Load competitions when we have an effective operator (from prop or selection)
  useEffect(() => {
    const effectiveOperator = operatorId || (selectedOperator !== 'all' ? selectedOperator : null);
    
    if (effectiveOperator) {
      // Reset competition selection when operator changes (unless competitionId is fixed)
      if (!competitionId) {
        setSelectedCompetition('all');
      }
      loadCompetitions();
    } else {
      setCompetitions([]);
      if (!competitionId) {
        setSelectedCompetition('all');
      }
    }
  }, [operatorId, selectedOperator, competitionId, loadCompetitions]);

  // Load audits when filters or page change
  useEffect(() => {
    loadAudits();
  }, [selectedOperator, selectedCompetition, currentPage, operatorId, competitionId]);

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
          {showTitle && (
              <CardHeader>
                  <div className="flex flex-col border-b pb-4 gap-1.5">
                      <CardTitle className="leading-none font-semibold !text-base">{title}</CardTitle>
                      {description && (
                          <CardDescription className="text-muted-foreground text-sm">
                              {description}
                          </CardDescription>
                      )}
                  </div>
              </CardHeader>
          )}

          {showFilters && (
              <div className="px-6">
                  <div className="border-b pb-4">
                      <div className="flex gap-4">
                          {/* Only show operator filter if no operatorId prop is provided */}
                          {!operatorId && (
                              <div className="flex flex-col gap-1.5 flex-1">
                                  <Label className="text-sm font-medium">Operator</Label>
                                  <SearchableSelect
                                      value={selectedOperator}
                                      onValueChange={setSelectedOperator}
                                      onSearch={loadOperators}
                                      options={operators}
                                      placeholder="All operators"
                                      searchPlaceholder="Search operators..."
                                      emptyText="No operators found."
                                      loading={operatorsLoading}
                                      allOptionLabel="All operators"
                                  />
                              </div>
                          )}

                          {/* Only show competition filter if no competitionId prop is provided */}
                          {!competitionId && (
                              <div className="flex flex-col gap-1.5 flex-1">
                                  <Label className="text-sm font-medium">Competition</Label>
                                  <SearchableSelect
                                      value={selectedCompetition}
                                      onValueChange={setSelectedCompetition}
                                      onSearch={loadCompetitions}
                                      options={competitions}
                                      placeholder="All competitions"
                                      searchPlaceholder="Search competitions..."
                                      emptyText="No competitions found."
                                      loading={competitionsLoading}
                                      disabled={!operatorId && (!selectedOperator || selectedOperator === 'all')}
                                      allOptionLabel="All competitions"
                                  />
                              </div>
                          )}

                          <div className="flex flex-col gap-1.5 justify-end">
                              {hasActiveFilters && (
                                  <button
                                      onClick={handleReset}
                                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                                  >
                                      Reset filters
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
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
                                ...(audit.operator
                                  ? [{
                                      label: 'View operator',
                                      href: `/profile/${audit.operator.slug}`,
                                    }]
                                  : [])
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

