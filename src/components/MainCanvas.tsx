"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useState } from "react";
import OfficeDrawer from "./three/OfficeDrawer";

import PI from "Math"

export default function ThreeScene(): JSX.Element {

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 22 }}>
      <ambientLight intensity={2} />
      <OrbitControls />

            <OfficeDrawer position={[-1.5, -0.5, -0]} rotation-y={Math.PI/2} />
            <OfficeDrawer position={[-1.5, -0.5, -0.5]} rotation-y={Math.PI/2} />
            <OfficeDrawer position={[-1.5, -0.5, -1]} rotation-y={Math.PI/2} />
            <OfficeDrawer position={[-1.0, -0.5, -1.5]} />
            <OfficeDrawer position={[-0.5, -0.5, -1.5]} />
            <OfficeDrawer position={[ 0.0, -0.5, -1.5]} />
            <OfficeDrawer position={[ 0.5, -0.5, -1.5]} />
            <OfficeDrawer position={[ 1.0, -0.5, -1.5]} />
            <OfficeDrawer position={[ 1.5, -0.5, -1]} rotation-y={-Math.PI/2} />
            <OfficeDrawer position={[ 1.5, -0.5, -0.5]} rotation-y={-Math.PI/2} />
            <OfficeDrawer position={[ 1.5, -0.5, -0]} rotation-y={-Math.PI/2} />
    </Canvas>
  );
}
