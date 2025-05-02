import { NoteViewer } from './components/note-viewer.tsx';

import About from './components/windows/About.tsx'
import Settings from './components/windows/Settings.tsx'

const registry: Record<string, React.ComponentType<any>> = {
    About,
    Settings,
    NoteViewer,
};

export default registry;
