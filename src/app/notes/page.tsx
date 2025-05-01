'use client';

import "@/style/globals.css"
import MDXRender from '@/components/MDXRender';

export default function Page() {
  return (

    <div className="prose prose-lg max-w-none p-6">
      <h1>Hello</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <blockquote>
        <p>This is a blockquote</p>
      </blockquote>
      <p>This is a paragraph</p>
    </div>
  );
}
