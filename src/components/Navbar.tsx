"use client";

import { useWindowManager } from "../context/WindowManagerContext";
import { useModelSelector } from "../context/ModelSelectorContext";

export default function Navbar() {
  const { openWindow } = useWindowManager();
  const { toggleModelSelector } = useModelSelector();

  return (
    <div className="desktop-nav">
      <nav className="border-b border-border bg-background text-foreground shadow-sm px-4 py-2 flex items-center justify-between">
        <div className="text-lg font-semibold">Mindplace</div>
        <details className="relative sm:hidden">
          <summary></summary>
          <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-popover shadow-md flex flex-col z-50">
            <button
              className="hover:text-primary transition-colors"
              onClick={() => openWindow("Settings", "Settings")}
            >
              Settings
            </button>
            <button
              className="hover:text-primary transition-colors"
              onClick={() => openWindow("About", "About")}
            >
              About
            </button>
            <button
              className="hover:text-primary transition-colors"
              onClick={toggleModelSelector}
            >
              Add Item
            </button>
          </div>
        </details>
        <div className="hidden sm:flex gap-6 text-sm">
          <button
            className="hover:text-primary transition-colors"
            onClick={() => openWindow("Settings", "Settings")}
          >
            Settings
          </button>
          <button
            className="hover:text-primary transition-colors"
            onClick={() => openWindow("About", "About")}
          >
            About
          </button>
          <button
            className="hover:text-primary transition-colors"
            onClick={toggleModelSelector}
          >
            Add Item
          </button>
        </div>
      </nav>
    </div>
  );
}
