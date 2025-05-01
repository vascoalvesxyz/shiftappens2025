import Image from "next/image";
import styles from "./page.module.css";
import ThreeTest from '@/components/ThreeTest'

export default function Home() {
  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <ThreeTest />
    </main>
  )
}
