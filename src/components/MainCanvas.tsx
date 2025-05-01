"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useState } from "react";
import Chest from "./three/Chest";
import OfficeDrawer from "./three/OfficeDrawer";

export default function ThreeScene(): JSX.Element {
  const test = () => {
    console.log("Red cube clicked");
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
      <ambientLight intensity={1} />
      <gridHelper args={[10, 5]} />
      <OrbitControls />

      <OfficeDrawer position={[0, 0, 0]} />
    </Canvas>
  );
}
