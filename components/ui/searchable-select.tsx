'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (search: string) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  /** Include an "All" option at the top */
  includeAllOption?: boolean;
  allOptionLabel?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  onSearch,
  options,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  loading = false,
  disabled = false,
  className,
  includeAllOption = true,
  allOptionLabel = 'All',
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedSearch = useDebouncedValue(searchValue, 300);
  
  // Track initial mount to prevent onSearch call on mount
  const isInitialMount = React.useRef(true);

  // Call onSearch when debounced value changes (but not on initial mount)
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  // Sort options A-Z by label (filter out any malformed options)
  const sortedOptions = React.useMemo(() => {
    return [...options]
      .filter((opt) => opt && opt.value != null && opt.label != null)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [options]);

  // Find the selected option label
  const selectedLabel = React.useMemo(() => {
    if (!value || value === 'all') {
      return includeAllOption ? allOptionLabel : null;
    }
    const option = options.find((opt) => opt.value === value);
    return option?.label || null;
  }, [value, options, includeAllOption, allOptionLabel]);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue === value ? '' : selectedValue);
    setOpen(false);
    setSearchValue('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className="truncate">
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {includeAllOption && (
                    <CommandItem
                      value="all"
                      onSelect={() => handleSelect('all')}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === 'all' || !value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {allOptionLabel}
                    </CommandItem>
                  )}
                  {sortedOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

