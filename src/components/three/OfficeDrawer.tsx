import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useWindowManager } from '@/context/WindowManagerContext'
import { useRef, useEffect, useState } from "react";
import {
  Group,
  Object3D,
  MeshStandardMaterial,
  Raycaster,
  Vector2,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import gsap from "gsap";

export default function MyModel(
  props: JSX.IntrinsicElements["group"] & {
    drawerIndex: number;
    onDrawerClick?: (id: string) => void;
  },
) {
  const group = useRef<Group>(null);
  const { camera, gl } = useThree();
  const { scene: originalScene } = useGLTF("/models/office_file_cabinet.glb");
  const [localScene] = useState(() => clone(originalScene));
  const drawersRef = useRef<{ object: Object3D; id: number }[]>([]);

  useEffect(() => {
    const drawers: { object: Object3D; id: number }[] = [];

    localScene.traverse((child) => {
      if (/^\d{2}$/.test(child.name)) {
        child.position.y = 0;
        var dridx: number = +props.drawerIndex;
        var gavidx: number = +child.name;
        const drawerId = dridx * 4 + gavidx;
        drawers.push({ object: child, id: drawerId });
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
      const intersects = raycaster.intersectObjects(
        drawersRef.current.map((d) => d.object),
        true,
      );

      if (intersects.length > 0) {
        const target = drawersRef.current.find((d) =>
          intersects[0].object.name.includes(d.object.name),
        );
        if (target) {
          const { openWindow } = useWindowManager()
          openWindow( 'NoteViewer', `Note #1`, { drawer: 1, noteId: 1 })
          const isOpen = target.object.position.y < -0.1;
          gsap.to(target.object.position, {
            y: isOpen ? 0 : -0.2,
            duration: 0.6,
            ease: "power2.inOut",
          });

          if (props.onDrawerClick) {
            props.onDrawerClick(target.id);
          }
        }
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [camera, gl, localScene, props.drawerIndex, props.onDrawerClick]);

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} position={[2, 3, 2]} />
      <primitive ref={group} object={localScene} {...props} />
    </>
  );
}
