"use client";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";

export default function MyModel() {
  const { scene } = useGLTF("/models/celling_lamp.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).material) {
        const material = (child as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0;
        material.emissive = new THREE.Color(0x000000);
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[0.4, 1.5, 0.5]}
      scale={[0.002, 0.002, 0.002]}
    />
  );
}
