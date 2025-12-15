import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DrawEvent, DrawEventDetails } from '@/components/draw-event-details';

interface DrawEventDetailsDialogProps {
  event: DrawEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DrawEventDetailsDialog({
  event,
  open,
  onOpenChange,
}: DrawEventDetailsDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">
            Draw event details
          </DialogTitle>
        </DialogHeader>

        <DrawEventDetails event={event} />
      </DialogContent>
    </Dialog>
  );
}

