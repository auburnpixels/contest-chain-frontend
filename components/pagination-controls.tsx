import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationData {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

interface PaginationControlsProps {
  pagination: PaginationData;
  page: number;
  pageSize: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function PaginationControls({
  pagination,
  page,
  pageSize,
  loading = false,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 25, 50, 100, 250],
}: PaginationControlsProps) {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const lastPage = pagination.last_page;

    if (lastPage <= maxVisible + 2) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      } else if (page >= lastPage - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = lastPage - maxVisible + 1; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(lastPage);
      }
    }

    return pages;
  };

  const handlePageSizeChange = (value: string) => {
    onPageSizeChange(parseInt(value));
    onPageChange(1); // Reset to first page when changing page size
  };

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        {pagination.total > 0 
          ? `Showing ${Number(pagination.from).toLocaleString()} to ${Number(pagination.to).toLocaleString()} of ${Number(pagination.total).toLocaleString()} results`
          : 'No results'}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="page-size" className="text-sm whitespace-nowrap">
            Per page:
          </Label>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger id="page-size" className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                    ...
                  </span>
                );
              }
              return (
                <Button
                  key={`page-${pageNum}`}
                  variant={page === pageNum ? 'ghost' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(pageNum as number)}
                  disabled={loading}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pagination.last_page || loading}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}




