"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges, Environment } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { Leva, useControls } from "leva";
import OfficeDrawer from "./three/OfficeDrawer";
import Rug from "./three/Rug";
import SimpleRoom from "./three/SimpleRoom";
import CeilingLamp from "./three/CeilingLamp";
import TvNoise from "./three/TvNoise";
import Plant from "./three/Plant";
import * as THREE from "three";
import { FileSelector } from "./file-selector";
import { LightControlsPanel } from "./LightControlsPanel";
import { useLighting } from "@/context/LightningContext";

export default function ThreeScene(): JSX.Element {
  const [selectedDrawerId, setSelectedDrawerId] = useState<number | null>(null);
  const { lightColor, lightIntensity, ambientIntensity, lightPosition } = useLighting()
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const lightTargetRef = useRef<THREE.Object3D>(null);

  const handleDrawerClick = (drawerId: string) => {
    setSelectedDrawerId(parseInt(drawerId));
  };

  const positions = [
    [-0.9, -0.6, -1.5],
    [-0.3, -0.6, -1.5],
    [0.3, -0.6, -1.5],
    [0.9, -0.6, -1.5],
    [-1.5, -0.6, -0.9],
    [-1.5, -0.6, -0.3],
    [-1.5, -0.6, 0.3],
    [-1.5, -0.6, 0.9],
  ];

  // Atualiza o target da luz quando a posição muda
  useEffect(() => {
    if (lightRef.current && lightTargetRef.current) {
      lightRef.current.target = lightTargetRef.current;
    }
  }, []);

  return (
    <div className="relative w-full h-full">

      <Canvas
        camera={{ position: [7, 12, 7], fov: 30 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5, // Reduzido para ambiente mais escuro
        }}
        style={{
          background: "#111111", // Fundo mais escuro
        }}
      >
        {/* Luz ambiente reduzida */}
        <ambientLight intensity={ambientIntensity} color={0xffffff} />

        {/* Removemos o hemisphereLight para mais contraste */}

        {/* Luz direcional principal */}
        <directionalLight
          ref={lightRef}
          color={lightColor}
          intensity={lightIntensity}
          position={[lightPosition.x, lightPosition.y, lightPosition.z]}
          castShadow // Ativa sombras
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />

        {/* Alvo da luz direcional */}
        <primitive
          object={new THREE.Object3D()}
          ref={lightTargetRef}
          position={[0, 0, 0]} // Mirando no centro da cena
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={0}
          minPolarAngle={Math.PI / 2 - Math.PI / 8}
          maxPolarAngle={Math.PI / 2}
        />

        <SimpleRoom />
        {positions.map((position, index) => (
          <OfficeDrawer
            key={index}
            position={position as [number, number, number]}
            rotation-y={position[0] <= -1.5 ? Math.PI / 2 : 0}
            drawerIndex={index}
            onDrawerClick={handleDrawerClick}
          />
        ))}
        <CeilingLamp />
        <Plant />
        <Rug />
        <TvNoise />
      </Canvas>

      {selectedDrawerId !== null && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[400px]">
          <FileSelector
            drawer={selectedDrawerId}
            onClose={() => setSelectedDrawerId(null)}
          />
        </div>
      )}
    </div>
  );
}
