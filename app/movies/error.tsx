'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="py-10 text-center">
      <p>Something went wrong!</p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
