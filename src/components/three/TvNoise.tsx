"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/tv_noise.glb");

  return (
    <primitive
      object={scene}
      position={[0.3, -0.4, -1.5]}
      scale={[0.5, 0.5, 0.5]}
      rotation-y={Math.PI / 2}
    />
  );
}
