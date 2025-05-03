"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/plant.glb");
  return (
    <primitive
      object={scene}
      position={[-1.5, -0.39, 0.3]}
      scale={[0.1, 0.1, 0.1]}
    />
  );
}
