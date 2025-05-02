"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const { scene } = useGLTF("/models/isometric_bricks.glb");

  return (
    <primitive
      object={scene}
      position={[0, -0.6, 0]}
      scale={[0.15, 0.15, 0.15]}
    />
  );
}

useGLTF.preload("/models/simple_room.glb");
