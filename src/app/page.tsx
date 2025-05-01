import Image from "next/image";
import styles from "./page.module.css";
import MainCanvas from '@/components/MainCanvas';

export default function Home(): JSX.Element {
  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <MainCanvas/>
    </main>
  );
}
