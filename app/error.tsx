'use client';

import { Button } from '@/shared/ui/button';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          {error.message}
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <Button size="lg" className="mt-6 px-6" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
