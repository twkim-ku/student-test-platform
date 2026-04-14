import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './SplitPanel.module.css';

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function SplitPanel({ left, right }: SplitPanelProps) {
  const [splitPercent, setSplitPercent] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setSplitPercent(Math.min(75, Math.max(25, percent)));
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isDragging ? styles.dragging : ''}`}
    >
      {/* Left panel */}
      <div className={styles.panel} style={{ width: `${splitPercent}%` }}>
        {left}
      </div>

      {/* Drag handle */}
      <div
        className={`${styles.handle} ${isDragging ? styles.handleActive : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.handleBar} />
        <div className={styles.handleDots}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.handleBar} />
      </div>

      {/* Right panel */}
      <div className={styles.panel} style={{ width: `${100 - splitPercent}%` }}>
        {right}
      </div>
    </div>
  );
}
