import MainCanvas from "@/components/MainCanvas";

import { WindowManagerProvider } from "@/context/WindowManagerContext";
import Desktop from "@/components/Desktop";

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
