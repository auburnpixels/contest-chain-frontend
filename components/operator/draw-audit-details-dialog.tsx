import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {DrawAudit} from './draw-audits-table';
import {DrawAuditDetails} from '@/components/draw-audit-details';

interface DrawAuditDetailsDialogProps {
    audit: DrawAudit | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    showOperator?: boolean;
}

export function DrawAuditDetailsDialog({
                                           audit,
                                           open,
                                           onOpenChange,
                                           showOperator = false,
                                       }: DrawAuditDetailsDialogProps) {
    if (!audit) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="border-b pb-4">
                        Draw audit details
                    </DialogTitle>
                </DialogHeader>

                <DrawAuditDetails audit={audit} showOperator={showOperator} />
            </DialogContent>
        </Dialog>
    );
}



