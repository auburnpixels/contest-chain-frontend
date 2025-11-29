export interface CompetitionWithDrawDate {
    draw_at?: string | null;
    is_draw_overdue?: boolean;
}

export const formatDrawDate = (competition: CompetitionWithDrawDate) => {
    const {draw_at} = competition;

    if (!draw_at) {
        return <span className="text-muted-foreground text-sm">—</span>;
    }

    return <span>{dateFormatters.shortDateTime(draw_at)}</span>;
};

/**
 * Common date formatting utilities
 */
export const dateFormatters = {
    /**
     * Format date to short date string (e.g., "26 Nov 2025")
     */
    shortDate: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    },

    /**
     * Format date to short date and time (e.g., "26 Nov 2025, 14:30")
     */
    shortDateTime: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        const d = new Date(date);
        const dateStr = d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
        const timeStr = d.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
        return `${dateStr}, ${timeStr}`;
    },

    /**
     * Format date to time only (e.g., "14:30")
     */
    time: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        return new Date(date).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    },

    /**
     * Format date to relative time (e.g., "2 hours ago", "3 days ago")
     */
    relativeTime: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
        
        // Future dates
        if (diffMs < 0) {
            const futureDiffMs = Math.abs(diffMs);
            const seconds = Math.floor(futureDiffMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (days > 0) return `in ${days} day${days !== 1 ? 's' : ''}`;
            if (hours > 0) return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
            if (minutes > 0) return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            return 'in a few seconds';
        }
        
        // Past dates
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
        
        if (years > 0) return `${years} year${years !== 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months !== 1 ? 's' : ''} ago`;
        if (weeks > 0) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        return 'just now';
    },

    /**
     * Format date to ISO string (e.g., "2025-11-26T14:30:00.000Z")
     */
    iso: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        return new Date(date).toISOString();
    },

    /**
     * Format date to full date and time (e.g., "Tuesday, 26 November 2025 at 14:30:00")
     */
    fullDateTime: (date: Date | string | null | undefined): string => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    },
};

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string): boolean {
    return new Date(date).getTime() < new Date().getTime();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string): boolean {
    return new Date(date).getTime() > new Date().getTime();
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
}

