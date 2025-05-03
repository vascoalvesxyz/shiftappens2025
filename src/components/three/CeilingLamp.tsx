"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/celling_lamp.glb");

  return (
    <primitive
      object={scene}
      position={[0.4, 2.5, 0.5]}
      scale={[0.002, 0.002, 0.002]}
    />
  );
}

useGLTF.preload("/models/isometric_bricks.glb");
