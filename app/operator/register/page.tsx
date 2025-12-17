'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OperatorRegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/access');
  }, [router]);

  // Return null while redirecting
  return null;
}
