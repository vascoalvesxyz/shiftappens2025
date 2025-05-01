'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function ThreeScene(): JSX.Element {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <gridHelper args={[10, 10]} />

      <OrbitControls />

      <mesh position={[4.5, 0.5, 4.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position={[-2, 0.5, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh position={[-1, 0.5, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </Canvas>
  )
}
