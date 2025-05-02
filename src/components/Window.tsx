'use client';

import { Rnd } from 'react-rnd';
import { useWindowManager } from '../context/WindowManagerContext';
import registry from '../registry';
import { WindowData } from '../context/WindowManagerContext';

import '../style/note.css'

export default function Window({ data }: { data: WindowData }) {
    const { id, x, y, width, height, zIndex, key, title, props } = data;
    const { closeWindow, bringToFront, updateWindow } = useWindowManager();
    const Component = registry[key];

    return (
        <Rnd
            className="bg-card text-card-foreground border border-border rounded-md shadow-md w-[400px]"
            size={{ width, height }}
            position={{ x, y }}
            onDragStart={() => bringToFront(id)}
            onDragStop={(e, d) => updateWindow(id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => {
                updateWindow(id, {
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    x: pos.x,
                    y: pos.y,
                });
            }}
        >
            <div 
                className="card flex items-center justify-between p-2 bg-muted text-muted-foreground border-b border-border rounded-t-md"
                style={{ cursor: 'move', }}
                onMouseDown={() => bringToFront(id)}
            >
                <span className="font-semibold">{title}</span>
                <button className="hover:text-destructive" onClick={() => closeWindow(id)}>✕</button>
            </div>
            <div style={{ padding: '8px', height: 'calc(100% - 32px)', overflow: 'auto' }}>
                <Component {...props} />
            </div>
        </Rnd>
    );
}
