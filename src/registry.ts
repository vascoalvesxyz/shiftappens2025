import Notes from './components/Notes';
import { NoteViewer } from './components/note-viewer.tsx';

const registry: Record<string, React.ComponentType<any>> = {
  Notes,
  NoteViewer,
};

export default registry;
