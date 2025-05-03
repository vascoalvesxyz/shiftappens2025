"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Rug(
  props: JSX.IntrinsicElements["group"],
): JSX.Element {
  const { scene } = useGLTF("/models/tv_noise.glb");

  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (scene) {
      const newModel = scene.clone();
      setModel(newModel);
    }
  }, [scene]);

  return model ? (
    <primitive
      object={model}
      {...props}
      scale={[0.5, 0.5, 0.5]}
      rotation-y={Math.PI / 2}
    />
  ) : null;
}
