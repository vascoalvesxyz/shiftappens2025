"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/rug/rug.glb");

  return (
    <primitive
      object={scene}
      position={[0.05, -0.58, 0.15]}
      scale={[0.7, 0.7, 0.7]}
    />
  );
}
