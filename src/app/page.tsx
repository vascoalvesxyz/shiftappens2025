import MainCanvas from "@/components/MainCanvas";

import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/Desktop";
import { LightingProvider } from "@/context/LightningContext";

export default function Home() {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <LightingProvider>
        <MainCanvas />
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </LightingProvider>
    </main>
  );
}
