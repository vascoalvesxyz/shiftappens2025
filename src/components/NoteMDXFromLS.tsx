'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkSmartypants from 'remark-smartypants';

type Props = {
  localStorageKey: string;
};

export default function NoteMDXFromLS({ localStorageKey }: Props) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const mdxString = localStorage.getItem(localStorageKey);
    if (mdxString) {
      serialize(mdxString, {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks, remarkSmartypants],
          format: 'md',
        },
      })
        .then(serialized => setMdxSource(serialized))
        .catch(err => console.error('MDX Serialization Error:', err));
    }
  }, [localStorageKey]);

  if (!mdxSource) return <p>Loading MDX content...</p>;

  return(
    <div className="prose prose-lg max-w-none">
    <MDXRemote {...mdxSource} />
    </div>
  );
}
