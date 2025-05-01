'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { useState } from 'react'
import Chest from './three/Chest'


export default function ThreeScene(): JSX.Element {

    return (
        <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <gridHelper args={[10, 5]} />
            <OrbitControls />
            <Chest position={[0, 0, 0]} />

        </Canvas>
    )
}
