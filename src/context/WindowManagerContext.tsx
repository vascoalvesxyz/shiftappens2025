"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
import { nanoid } from 'nanoid';

export type WindowData = {
    id: string;
    key: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    props: Record<string, any>;
};

type WindowManagerContextType = {
    windows: WindowData[];
    openWindow: (key: string, title: string, initialProps?: Record<string, any>) => void;
    closeWindow: (id: string) => void;
    bringToFront: (id: string) => void;
    updateWindow: (id: string, data: Partial<WindowData>) => void;
};

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);
export const useWindowManager = () => {
    const context = useContext(WindowManagerContext);
    if (!context) throw new Error('useWindowManager must be used within WindowManagerProvider');
    return context;
};

export function WindowManagerProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [zCounter, setZCounter] = useState(1);

    const openWindow = (key: string, title: string, initialProps: Record<string, any> = {}) => {
        const id = nanoid();
        const win: WindowData = {
            id,
            key,
            title,
            x: 100,
            y: 100,
            width: 400,
            height: 300,
            zIndex: zCounter,
            props: initialProps,
        };
        setZCounter(z => z + 1);
        setWindows(ws => [...ws, win]);
    };

    const closeWindow = (id: string) => {
        setWindows(ws => ws.filter(w => w.id !== id));
    };

    const bringToFront = (id: string) => {
        setWindows(ws => ws.map(w => (w.id === id ? { ...w, zIndex: zCounter } : w)));
        setZCounter(z => z + 1);
    };

    const updateWindow = (id: string, data: Partial<WindowData>) => {
        setWindows(ws => ws.map(w => (w.id === id ? { ...w, ...data } : w)));
    };

    return (
        <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, bringToFront, updateWindow }}>
        {children}
        </WindowManagerContext.Provider>
    );
}
