import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useRef, useEffect } from "react";
import {
  Group,
  Object3D,
  MeshStandardMaterial,
  Raycaster,
  Vector2,
} from "three";
import gsap from "gsap";

export default function MyModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { scene, camera, gl } = useThree();
  const { scene: modelScene } = useGLTF("/models/office_file_cabinet.glb");

  const drawers: Object3D[] = [];

  useEffect(() => {
    if (!modelScene) return;

    modelScene.traverse((child) => {
      if (/^\d{2}$/.test(child.name)) {
        child.position.y = 0;
        drawers.push(child);
      }

      if ((child as any).material) {
        const mat = (child as any).material as MeshStandardMaterial;
        mat.needsUpdate = true;
      }
    });

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleClick = (event: MouseEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(drawers, true);
      if (intersects.length > 0) {
        const target = drawers.find((d) =>
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
  }, [modelScene, camera, gl]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[2, 3, 2]} />
      <primitive ref={group} object={modelScene} {...props} />
    </>
  );
}
