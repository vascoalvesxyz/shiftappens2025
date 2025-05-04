import MainCanvas from "@/components/MainCanvas";

import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/Desktop";
import { LightingProvider } from "@/context/LightningContext";
import { ModelSelectorProvider } from "@/context/ModelSelectorContext";

import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={raleway.className} style={{ height: "100vh", width: "100vw" }}>
      <LightingProvider>
        <ModelSelectorProvider>
          <MainCanvas />
          <WindowManagerProvider>
            <Desktop />
          </WindowManagerProvider>
        </ModelSelectorProvider>
      </LightingProvider>
    </main>
  );
}
