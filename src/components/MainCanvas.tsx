"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges, Environment } from "@react-three/drei";
import { useState } from "react";
import OfficeDrawer from "./three/OfficeDrawer";
import SimpleRoom from "./three/SimpleRoom";
import * as THREE from "three";

export default function ThreeScene(): JSX.Element {
  const [selectedDrawerId, setSelectedDrawerId] = useState<string | null>(null);

  const handleDrawerClick = (drawerId: string) => {
    console.log("Clicked on drawer:", drawerId);
    setSelectedDrawerId(drawerId);
  };

  const positions = [
    [-1.5, -0.5, -0],
    [-1.5, -0.5, -0.5],
    [-1.5, -0.5, -1],
    [-1.0, -0.5, -1.5],
    [-0.5, -0.5, -1.5],
    [0.0, -0.5, -1.5],
    [0.5, -0.5, -1.5],
    [1.0, -0.5, -1.5],
    [1.5, -0.5, -1],
    [1.5, -0.5, -0.5],
    [1.5, -0.5, -0],
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 22 }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.5,
      }}
    >
      <ambientLight intensity={1} color={0xffffff} />
      <hemisphereLight color={0xffffff} groundColor={0xffffff} intensity={1} />
      <OrbitControls />
      <Environment preset="city" />
      <SimpleRoom />
      {positions.map((position, index) => (
        <OfficeDrawer
          key={index}
          position={position as [number, number, number]}
          rotation-y={
            position[0] === -1.5
              ? Math.PI / 2
              : position[0] === 1.5
                ? -Math.PI / 2
                : 0
          }
          drawerIndex={index}
          onDrawerClick={handleDrawerClick}
        />
      ))}
    </Canvas>
  );
}
