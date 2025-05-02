"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges, Environment } from "@react-three/drei";
import { useState } from "react";
import OfficeDrawer from "./three/OfficeDrawer";
import SimpleRoom from "./three/SimpleRoom";
import * as THREE from "three";
import { FileSelector } from "./file-selector";

export default function ThreeScene(): JSX.Element {
  const [selectedDrawerId, setSelectedDrawerId] = useState<number | null>(null);

  const handleDrawerClick = (drawerId: string) => {
    console.log("Clicked on drawer:", drawerId);
    setSelectedDrawerId(parseInt(drawerId));
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

   <div className="relative w-full h-full">
    <Canvas
      camera={{ position: [-5, 1, -5], fov: 30 }}
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

       {selectedDrawerId !== null && (
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[400px]">
           <FileSelector drawer={selectedDrawerId} onClose={()=>setSelectedDrawerId(null)} />
         </div>
       )}
     </div>
  );
}
