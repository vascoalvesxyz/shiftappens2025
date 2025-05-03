"use client";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import type {JSX} from 'react';

export default function MyModel() {
  const { scene } = useGLTF("/models/rug/rug.glb");
  return (
    <primitive
      object={scene}
      position={[0.05, -1.58, 0.15]}
      scale={[0.7, 0.7, 0.7]}
    />
  );
}
