import MainCanvas from "@/components/MainCanvas";

import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/Desktop";
import { LightingProvider } from "@/context/LightningContext";
import { ModelSelectorProvider } from "@/context/ModelSelectorContext";

export default function Home(): JSX.Element {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
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
