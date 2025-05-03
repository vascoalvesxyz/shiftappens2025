"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import * as THREE from "three";
import { Object3D } from "three";

export default function Plant(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/tv_noise.glb");
  const [model, setModel] = useState<Object3D | undefined>(undefined);

  useEffect(() => {
    if (scene) {
      const newModel = scene.clone();
      setModel(newModel);
    }
  }, [scene]);

  if (!model) return null;

  return <primitive object={model} {...props} scale={[0.5, 0.5, 0.5]} />;
}
