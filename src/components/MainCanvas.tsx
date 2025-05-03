"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useLighting } from "@/context/LightningContext";
import OfficeDrawer from "./three/OfficeDrawer";
import Rug from "./three/Rug";
import SimpleRoom from "./three/SimpleRoom";
import CeilingLamp from "./three/CeilingLamp";
import TvNoise from "./three/TvNoise";
import Plant from "./three/Plant";
import { FileSelector } from "./file-selector";
import { useModelSelector } from "@/context/ModelSelectorContext";

interface ModelSelectorProps {
  placingModel: string | null;
  setPlacingModel: (model: string | null) => void;
}
function ModelSelector({ placingModel, setPlacingModel }: ModelSelectorProps) {
  const { toggleModelSelector } = useModelSelector();
  return (
    <div className="absolute top-20 left-4 z-10 bg-white p-2 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold">Adicionar Item:</p>
        <button
          onClick={() => toggleModelSelector()}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      {["Plant", "Radio"].map((model) => (
        <button
          key={model}
          onClick={() => setPlacingModel(model)}
          className="block my-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 w-full text-left"
        >
          {model}
        </button>
      ))}
      {placingModel && (
        <p className="text-sm text-black-600 mt-2">
          Clique no chão para colocar: <strong>{placingModel}</strong>
        </p>
      )}
    </div>
  );
}

export default function ThreeScene() {
  const [selectedDrawerId, setSelectedDrawerId] = useState<number | null>(null);
  const [placingModel, setPlacingModel] = useState<string | null>(null);
  const { showModelSelector } = useModelSelector();
  const [addedItems, setAddedItems] = useState<
    { id: number; type: string; position: [number, number, number] }[]
  >([]);

  const { lightColor, lightIntensity, ambientIntensity, lightPosition } =
    useLighting();
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const lightTargetRef = useRef<THREE.Object3D>(null);

  const handleDrawerClick = (drawerId: string) => {
    setSelectedDrawerId(parseInt(drawerId));
  };

  const positions = [
    [-0.9, -1.6, -1.5],
    [-0.3, -1.6, -1.5],
    [0.3, -1.6, -1.5],
    [0.9, -1.6, -1.5],
    [-1.5, -1.6, -0.9],
    [-1.5, -1.6, -0.3],
    [-1.5, -1.6, 0.3],
    [-1.5, -1.6, 0.9],
  ];

  useEffect(() => {
    if (lightRef.current && lightTargetRef.current) {
      lightRef.current.target = lightTargetRef.current;
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {showModelSelector == true && (
        <ModelSelector
          placingModel={placingModel}
          setPlacingModel={setPlacingModel}
        />
      )}
      <Canvas
        camera={{ position: [5, 10, 5], fov: 30 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        style={{
          background: "#111111",
        }}
        shadows
      >
        <ambientLight intensity={ambientIntensity} color={0xffffff} />
        <directionalLight
          ref={lightRef}
          color={lightColor}
          intensity={lightIntensity}
          position={[lightPosition.x, lightPosition.y, lightPosition.z]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <primitive
          object={new THREE.Object3D()}
          ref={lightTargetRef}
          position={[0, 0, 0]}
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
        <Plant position={[-1.5, -0.39, 0.3]} />
        <Rug />
        <TvNoise position={[0.3, -0.4, -1.5]} />

        <mesh
          rotation-x={-Math.PI / 2}
          position={[0, -1.6, 0]}
          onClick={(e) => {
            if (!placingModel) return;
            const { x, y, z } = e.point;
            setAddedItems((prev) => [
              ...prev,
              {
                id: Date.now(),
                type: placingModel,
                position: [x, y, z],
              },
            ]);
            setPlacingModel(null);
          }}
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>

        {addedItems.map((item) => {
          const props = { key: item.id, position: item.position };
          switch (item.type) {
            case "Plant":
              return <Plant key={item.id} position={item.position} />;
            case "Radio":
              return <TvNoise key={item.id} position={item.position} />;
            default:
              return null;
          }
        })}
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
