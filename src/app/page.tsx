import Image from "next/image";
import styles from "./page.module.css";
import MainCanvas from '@/components/MainCanvas';

import Note from '@/components/NoteMDXFromLS.tsx'
import WindowCard from '@/components/WindowCard'

export default function Home(): JSX.Element {

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
        <Note localStorageKey="my-mdx-content" />

        <MainCanvas/>

      <WindowCard title="My App Window">
        <p>This is a draggable window.</p>
      </WindowCard>


    </main>
  );
}
