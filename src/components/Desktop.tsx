"use client"
import { useWindowManager } from '../context/WindowManagerContext';
import Window from './Window';

import '../style/desktop.css'

export default function Desktop() {
    const { windows, openWindow } = useWindowManager();

    return (
        <div className='desktop'>
            {windows.map(w => (
                <Window className="desktop-window" key={w.id} data={w} />
            ))}
            <div className='desktop-nav'>
                <button onClick={() => openWindow('Notes', 'Notes')}>Open Notes</button>
            </div>
        </div>
    );
}
