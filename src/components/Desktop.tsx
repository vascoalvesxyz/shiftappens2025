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
            <nav className="border-b border-border bg-background text-foreground shadow-sm px-4 py-2 flex items-center justify-between">
                <div className="text-lg font-semibold">Balmr</div>
                <details className="relative sm:hidden">
                    <div
                        className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-popover shadow-md flex flex-col z-50">
                        <a href="#" className="px-4 py-2 hover:bg-muted transition-colors">Home</a>
                        <a href="#" className="px-4 py-2 hover:bg-muted transition-colors">Features</a>
                        <a href="#" className="px-4 py-2 hover:bg-muted transition-colors">Contact</a>
                    </div>
                </details>

                    <div className="hidden sm:flex gap-6 text-sm">
                        <button 
                            className="hover:text-primary transition-colors"
                            onClick={() => openWindow('Settings', 'Settings')}
                            >Settings
                        </button>
                        <button 
                            className="hover:text-primary transition-colors"
                            onClick={() => openWindow('About', 'About')}
                            >About
                        </button>
                    </div>
            </nav>

            </div>
        </div>
    );
}
