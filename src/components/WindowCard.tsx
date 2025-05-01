// components/WindowCard.tsx
'use client'

import { motion } from 'framer-motion'
import '../style/page.css'

type WindowCardProps = {
  title: string
  children: React.ReactNode
}

export default function WindowCard({ title, children }: WindowCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 1000, top: 0, bottom: 1000 }}
      whileDrag={{ scale: 1.02 }}
      style={{
        position: 'absolute',
        top: 100,
        left: 100,
        width: '300px',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        cursor: 'grab',
      }}
        className="floating-window"
    >
      <div className="window-header">
                <div className="window-title">
                    {title}
                </div>
                <div className="window-controls">
                    <button className="window-control control-minimize" title="Minimize">−</button>
                    <button className="window-control control-maximize" title="Maximize">+</button>
                    <button className="window-control control-close" title="Close">×</button>
                </div>
      </div>
      <div className="window-content">{children}</div>
    </motion.div>
  )
}
