// app/components/ui.tsx (or wherever you keep your shared components)
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

// Utility types
type BaseProps = React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
};

// Heading
export function Heading({
  asChild,
  className = '',
  ...props
}: BaseProps & { level?: 1 | 2 | 3 }) {
  const Comp = asChild ? Slot : `h${props.level ?? 1}`;
  const size = props.level === 2 ? 'text-2xl' : props.level === 3 ? 'text-xl' : 'text-3xl';
  return <Comp className={`font-bold ${size} ${className}`} {...props} />;
}

// Paragraph
export function Paragraph({
  asChild,
  className = '',
  ...props
}: BaseProps) {
  const Comp = asChild ? Slot : 'p';
  return <Comp className={`text-base leading-relaxed ${className}`} {...props} />;
}

// Muted text
export function Muted({
  asChild,
  className = '',
  ...props
}: BaseProps) {
  const Comp = asChild ? Slot : 'span';
  return <Comp className={`text-sm text-gray-500 ${className}`} {...props} />;
}

// Section container
export function Section({
  asChild,
  className = '',
  ...props
}: BaseProps) {
  const Comp = asChild ? Slot : 'section';
  return <Comp className={`my-6 ${className}`} {...props} />;
}
