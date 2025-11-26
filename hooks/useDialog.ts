import { useState, useCallback } from 'react';

/**
 * Custom hook for managing dialog state
 * 
 * @example
 * ```typescript
 * const dialog = useDialog<Competition>();
 * 
 * // Open dialog with item
 * <Button onClick={() => dialog.open(competition)}>View</Button>
 * 
 * // Use in Dialog component
 * <Dialog open={dialog.isOpen} onOpenChange={(open) => !open && dialog.close()}>
 *   {dialog.item && <CompetitionDetails competition={dialog.item} />}
 * </Dialog>
 * ```
 */
export function useDialog<T = any>() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<T | null>(null);

  const open = useCallback((selectedItem: T) => {
    setItem(selectedItem);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clearing the item to allow exit animations to complete
    setTimeout(() => setItem(null), 150);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    item,
    open,
    close,
    toggle,
  };
}
