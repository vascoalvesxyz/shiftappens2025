'use client';

import { Rnd } from 'react-rnd';
import { useWindowManager } from '../context/WindowManagerContext';
import registry from '../registry';
import { WindowData } from '../context/WindowManagerContext';

import '../style/globals.css'
import '../style/desktop.css'

export default function Window({ data }: { data: WindowData }) {
    const { id, x, y, width, height, zIndex, key, title, props } = data;
    const { closeWindow, bringToFront, updateWindow } = useWindowManager();
    const Component = registry[key];

    return (
        <Rnd
            className="card"
            dragHandleClassName="card-header"
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
            <button className="card-close hover:text-destructive" onClick={() => closeWindow(id)}>✕</button>
            <div 
                className="card-header"
                style={{ cursor: 'move', }}
                onMouseDown={() => bringToFront(id)}
            >
                <span>{title}</span>
            </div>
            <div className="card-content">
                <Component {...props} />
            </div>
        </Rnd>
    );
}
