import { NoteViewer } from './components/note-viewer';

import About from './components/windows/About'
import Settings from './components/windows/Settings'

const registry: Record<string, React.ComponentType<any>> = {
    About,
    Settings,
    NoteViewer,
};

export default registry;
