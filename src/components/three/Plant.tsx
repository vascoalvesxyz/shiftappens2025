"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Plant(
  props: JSX.IntrinsicElements["group"],
): JSX.Element {
  const { scene } = useGLTF("/models/plant.glb");

  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (scene) {
      const newModel = scene.clone();
      setModel(newModel);
    }
  }, [scene]);

  return model ? (
    <primitive object={model} {...props} scale={[0.1, 0.1, 0.1]} />
  ) : null;
}
