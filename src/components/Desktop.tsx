"use client";
import { useWindowManager } from "../context/WindowManagerContext";
import Window from "./Window";
import Navbar from "./Navbar.tsx"

import "../style/desktop.css";

export default function Desktop() {
  const { windows } = useWindowManager();

  return (
    <div className="desktop">

      {windows.map((w) => (
        <Window key={w.id} data={w} />
      ))}

      <Navbar />

    </div>
  );
}
