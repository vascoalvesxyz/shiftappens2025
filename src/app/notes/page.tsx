'use client';

import NoteMDXFromLS from '@/components/NoteMDXFromLS';

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">MDX from localStorage</h1>
      <NoteMDXFromLS localStorageKey="my-mdx-content" />
    </div>
  );
}
