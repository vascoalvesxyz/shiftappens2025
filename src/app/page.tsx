import Image from "next/image";
import MainCanvas from "@/components/MainCanvas";

import MDXRender from "@/components/MDXRender";

import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/Desktop";

import WindowCard from "@/components/WindowCard";
import { CreateNoteModal } from "@/components/create-note-modal";
import { FileSelector } from "@/components/file-selector";

export default function Home(): JSX.Element {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <MainCanvas />

      <WindowManagerProvider>
        <Desktop />
      </WindowManagerProvider>
    </main>
  );
}
