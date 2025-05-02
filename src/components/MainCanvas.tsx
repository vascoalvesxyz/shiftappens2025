"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useState } from "react";
import OfficeDrawer from "./three/OfficeDrawer";

import * as THREE from 'three'

import PI from "Math"

export default function ThreeScene(): JSX.Element {

  return (
    <>
            <Canvas
                className="canvas"
                camera={{ position: [0, 0, 7], fov: 22 }}
                gl={{ antialias: true }}
            >
          <ambientLight intensity={2} />
          <OrbitControls />
                <OfficeDrawer position={[-1.5, -0.5, -0]} rotation-y={Math.PI/2} />
                <OfficeDrawer position={[-1.5, -0.5, -0.5]} rotation-y={Math.PI/2} />
                <OfficeDrawer position={[-1.5, -0.5, -1]} rotation-y={Math.PI/2} />
                <OfficeDrawer position={[-1.0, -0.5, -1.5]} />
                <OfficeDrawer position={[-0.5, -0.5, -1.5]} />
                <OfficeDrawer position={[ 0.0, -0.5, -1.5]} />
                <OfficeDrawer position={[ 0.5, -0.5, -1.5]} />
                <OfficeDrawer position={[ 1.0, -0.5, -1.5]} />
                <OfficeDrawer position={[ 1.5, -0.5, -1]} rotation-y={-Math.PI/2} />
                <OfficeDrawer position={[ 1.5, -0.5, -0.5]} rotation-y={-Math.PI/2} />
                <OfficeDrawer position={[ 1.5, -0.5, -0]} rotation-y={-Math.PI/2} />
        </Canvas>
    </>
  );
}
