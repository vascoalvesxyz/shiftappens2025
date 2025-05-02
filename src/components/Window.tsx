'use client';

import { Rnd } from 'react-rnd';
import { useWindowManager } from '../context/WindowManagerContext';
import registry from '../registry';
import { WindowData } from '../context/WindowManagerContext';

export default function Window({ data }: { data: WindowData }) {
    const { id, x, y, width, height, zIndex, key, title, props } = data;
    const { closeWindow, bringToFront, updateWindow } = useWindowManager();
    const Component = registry[key];

    return (
        <Rnd
            size={{ width, height }}
            position={{ x, y }}
            style={{
                zIndex,
                position: 'absolute',
                background: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
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
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#f0f0f0',
                    padding: '4px',
                    cursor: 'move',
                }}
                onMouseDown={() => bringToFront(id)}
            >
                <span>{title}</span>
                <button onClick={() => closeWindow(id)}>✕</button>
            </div>
            <div style={{ padding: '8px', height: 'calc(100% - 32px)', overflow: 'auto' }}>
                <Component {...props} />
            </div>
        </Rnd>
    );
}
