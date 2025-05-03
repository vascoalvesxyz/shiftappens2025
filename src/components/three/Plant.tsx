"use client";
import { useGLTF } from "@react-three/drei";

export default function MyModel() {
  const { scene } = useGLTF("/models/plant.glb");
  return (
    <primitive
      object={scene}
      position={[-1.5, -0.39, 0.3]}
      scale={[0.1, 0.1, 0.1]}
    />
  );
}
