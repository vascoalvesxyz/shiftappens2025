import Image from "next/image";
import MainCanvas from '@/components/MainCanvas';

import MDXRender from '@/components/MDXRender'
import WindowCard from '@/components/WindowCard'
import { CreateNoteModal } from "@/components/create-note-modal";
import { FileSelector } from "@/components/file-selector";

export default function Home(): JSX.Element {

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
    <FileSelector drawer={1} />

    <MainCanvas/>

    <WindowCard title="My App Window">
      <p>This is a draggable window.</p>
    </WindowCard>


    </main>
  );
}
