import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export function RateLimitError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Too Many Requests</AlertTitle>
          <AlertDescription className="mt-2">
            You&apos;ve exceeded the rate limit. This can happen when the page reloads multiple times quickly during development.
            <br /><br />
            Please wait a moment before continuing.
          </AlertDescription>
        </Alert>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4 w-full">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}


