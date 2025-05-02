"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/simple_room.glb");

  return (
    <primitive
      object={scene}
      position={[0, -0.6, 0]}
      scale={[0.25, 0.25, 0.25]}
    />
  );
}

useGLTF.preload("/models/simple_room.glb");
