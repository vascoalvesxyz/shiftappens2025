"use client";
import { useGLTF } from "@react-three/drei";

export default function MyModel() {
  const { scene } = useGLTF("/models/celling_lamp.glb");

  return (
    <primitive
      object={scene}
      position={[0.4, 1.5, 0.5]}
      scale={[0.002, 0.002, 0.002]}
    />
  );
}

useGLTF.preload("/models/isometric_bricks.glb");
