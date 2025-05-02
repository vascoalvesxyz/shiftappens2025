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
    //[-1.0, -1, -1.5],
    [-1.0, -0.6, -1.5],

    //  [-0.5, -0.5, -1.5],
    // [0.0, -0.5, -1.5],
    // [0.5, -0.5, -1.5],
    // [1.0, -0.5, -1.5],
    // [1.5, -0.5, -1.5],
    // [1.5, -0.5, -1.5],
    // [1.5, -0.5, -1.5],
  ];

  return (
    <Canvas
      camera={{ position: [4.5, 1, 4], fov: 30 }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.5,
      }}
    >
      <ambientLight intensity={1} color={0xffffff} />
      <hemisphereLight color={0xffffff} groundColor={0xffffff} intensity={1} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxAzimuthAngle={Math.PI / 2}
        minAzimuthAngle={0}
        minPolarAngle={Math.PI / 2 - Math.PI / 8} // 45° upward from straight ahead
        maxPolarAngle={Math.PI / 2} // straight ahead
      />
      <SimpleRoom />
      {positions.map((position, index) => (
        <OfficeDrawer
          key={index}
          position={position as [number, number, number]}
          rotation-y={
            position[0] <= -3.5
              ? Math.PI / 2
              : position[0] >= 4.5
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
