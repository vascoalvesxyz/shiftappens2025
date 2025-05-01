import Image from "next/image";
import styles from "./page.module.css";
import MainCanvas from '@/components/MainCanvas';

import WindowCard   from '@/components/WindowCard'

export default function Home(): JSX.Element {

    return (
        <main style={{ height: '100vh', width: '100vw' }}>

            <MainCanvas/>

            <WindowCard title="My App Window">
                <p>This is a draggable window.</p>
            </WindowCard>


        </main>
    );
}
