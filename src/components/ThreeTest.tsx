'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { useState } from 'react'

export default function ThreeScene(): JSX.Element {

    const test = () => { console.log('Red cube clicked') }

    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <gridHelper args={[10, 5]} />

            <OrbitControls />

      {[ // you could also map over a list
        { id: 1, position: [4, 0.5, -2] },
        { id: 2, position: [4, 0.5, 0] },
        { id: 3, position: [4, 0.5, -4] },
        { id: 4, position: [4, 0.5, 2] },
        { id: 5, position: [4, 0.5, 4] },
        { id: 11, position: [2, 0.5, 4] },
        { id: 12, position: [2, 0.5, 2] },
        { id: 13, position: [0, 0.5, 4] },
        { id: 15, position: [0, 0.5, -2] },
        { id: 14, position: [0, 0.5, 0] },
        { id: 16, position: [0, 0.5, -4] },
        { id: 17, position: [0, 0.5, 2] },
        { id: 18, position: [2, 0.5, 0] },
        { id: 19, position: [2, 0.5, -2] },
        { id: 20, position: [2, 0.5, -4] },
                { id: 21, position: [-2, 0.5, -4] },
        { id: 22, position: [-2, 0.5, -2] },
        { id: 23, position: [-2, 0.5, 0] },
        { id: 24, position: [-2, 0.5, 2] },
        { id: 25, position: [-2, 0.5, 4] },
      ].map(({ id, position, color }) => (
        <mesh
          key={id}
          position={position}
          onClick={() => setSelectedId(id)}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={selectedId === id ? 'green' : 'black'} />
                        <Edges scale={1.05} color="white" />
        </mesh>
      ))}

        </Canvas>
    )
}
