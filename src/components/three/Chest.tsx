import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Chest(props: JSX.IntrinsicElements['group']) {
    const group = useRef<Group>(null)
    const { scene, animations } = useGLTF('/models/chest.glb')
    const { actions } = useAnimations(animations, group)

    const handleClick = () => {
        if (actions && actions['ArmatureAction']) {
            const a = actions['ArmatureAction']
            a.clampWhenFinished = true
            a.reset().fadeIn(0.5).play()
        }
    }

  return <primitive onClick={handleClick} ref={group} object={scene} {...props} />
}

