import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

export default function MyModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/chest.glb");

  return <primitive ref={group} object={scene} {...props} />;
}
