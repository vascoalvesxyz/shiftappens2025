"use client";
import { useGLTF } from "@react-three/drei";

export default function MyModel() {
  const { scene } = useGLTF("/models/isometric_bricks.glb");

  return (
    <primitive
      object={scene}
      position={[0, -1.6, 0]}
      scale={[0.15, 0.15, 0.15]}
      rotation-y={Math.PI / 2}
    />
  );
}

useGLTF.preload("/models/isometric_bricks.glb");
