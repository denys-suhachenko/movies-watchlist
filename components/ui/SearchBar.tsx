'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const newParams = new URLSearchParams(params);
    newParams.set('query', value);

    router.push(`?${newParams.toString()}`);
  }

  return <input onChange={onChange} />;
}
