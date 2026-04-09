'use client';

import { Button } from '../ui/button';

type Props = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: Props) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        disabled={isFirstPage}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={isLastPage}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
}
