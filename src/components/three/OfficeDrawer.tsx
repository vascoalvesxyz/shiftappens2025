import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useRef, useEffect, useState } from "react";
import {
  Group,
  Object3D,
  MeshStandardMaterial,
  Raycaster,
  Vector2,
  Skeleton,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import gsap from "gsap";

export default function MyModel(props: JSX.IntrinsicElements["group"],  ) {
  const group = useRef<Group>(null);
  const { camera, gl } = useThree();
  const { scene: originalScene } = useGLTF("/models/office_file_cabinet.glb");
  const [localScene] = useState(() => clone(originalScene));
  const drawersRef = useRef<Object3D[]>([]);

  useEffect(() => {
    const drawers: Object3D[] = [];

    localScene.traverse((child) => {
      if (/^\d{2}$/.test(child.name)) {
        child.position.y = 0;
        drawers.push(child);
      }

      if ((child as any).material) {
        const mat = (child as any).material as MeshStandardMaterial;
        mat.needsUpdate = true;
      }
    });

    drawersRef.current = drawers;

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleClick = (event: MouseEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(drawersRef.current, true);

      if (intersects.length > 0) {
        const target = drawersRef.current.find((d) =>
          intersects[0].object.name.includes(d.name),
        );
        if (target) {
          const isOpen = target.position.y < -0.1;
          gsap.to(target.position, {
            y: isOpen ? 0 : -0.2,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [camera, gl, localScene]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[2, 3, 2]} />
      <primitive ref={group} object={localScene} {...props} />
    </>
  );
}
