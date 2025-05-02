import Image from "next/image";
import MainCanvas from '@/components/MainCanvas';

import MDXRender from '@/components/MDXRender'
<<<<<<< HEAD

import { WindowManagerProvider } from '@/context/WindowManagerContext';
import Desktop from '@/components/Desktop';
=======
import WindowCard from '@/components/WindowCard'
import { CreateNoteModal } from "@/components/create-note-modal";
import { FileSelector } from "@/components/file-selector";
>>>>>>> 866e44dc362b1c038bf136f59224f6d8c3a9e705

export default function Home(): JSX.Element {

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
<<<<<<< HEAD
            <MainCanvas/>

            <WindowManagerProvider>
                <Desktop />
            </WindowManagerProvider>
        </main>
    );
=======
    <FileSelector drawer={1} />

    <MainCanvas/>

    <WindowCard title="My App Window">
      <p>This is a draggable window.</p>
    </WindowCard>


    </main>
  );
>>>>>>> 866e44dc362b1c038bf136f59224f6d8c3a9e705
}
