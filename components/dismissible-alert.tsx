'use client';

import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DismissibleAlertProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export function DismissibleAlert({ 
  id, 
  title, 
  description, 
  icon,
  variant = 'default'
}: DismissibleAlertProps) {
  const [dismissed, setDismissed] = useLocalStorage(`dismissed-alert-${id}`, false);
  const [isVisible, setIsVisible] = useState(!dismissed);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Alert variant={variant} className="relative pr-12">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-8 w-8 p-0"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  );
}

