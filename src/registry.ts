import Calculator from './components/Calculator';
import Notes from './components/Notes';

const registry: Record<string, React.ComponentType<any>> = {
  Calculator,
  Notes,
};
export default registry;
