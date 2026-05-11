'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const queryParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const switchPage = (page: number) => {
    const params = new URLSearchParams(queryParams.toString());
    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="outline"
        disabled={isFirstPage}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
        onClick={() => switchPage(currentPage - 1)}
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
        onClick={() => switchPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
